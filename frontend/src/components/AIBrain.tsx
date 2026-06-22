'use client';

import { Suspense, useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree, extend, ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls, Trail, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { profile } from '@/data/profile';
import SkullOutline from '@/components/SkullOutline';

type Region = (typeof profile.brainRegions)[number];

/* ═════════════════════════════════════════════════════════════════════
   BrainMaterial — vertex shader displaces an icosahedron into a real
   brain ovoid with sagittal fissure + gyri/sulci folds + active glow.
   ═════════════════════════════════════════════════════════════════════ */

const BrainMaterial = shaderMaterial(
  {
    uTime: 0,
    uIsCerebellum: 0,
    uActiveColor: new THREE.Color('#22e4ff'),
    uBaseColor: new THREE.Color('#ff8db5'),
    uDeepColor: new THREE.Color('#2a0838'),
    uActivePos: new THREE.Vector3(0, 0, 0),
    uActiveStrength: 0,
  },
  /* vertex */ `
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec3 vPos;
    varying float vFissure;
    uniform float uTime;
    uniform float uIsCerebellum;

    // ── Simplex noise (iq)
    vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
    vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_*ns.x + ns.yyyy;
      vec4 y = y_*ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m*m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    float fbm(vec3 p){
      float v=0.0; float a=0.5;
      for(int i=0; i<4; i++){ v += a*snoise(p); p *= 2.05; a *= 0.5; }
      return v;
    }

    void main(){
      vec3 pos = position;

      // ── Shape into brain ovoid (wider front-back than side-side)
      pos.x *= 1.05;   // L-R
      pos.y *= 0.90;   // top-bottom
      pos.z *= 1.30;   // front-back

      // ── Heavy gyri/sulci folds via FBM + sine layers
      vec3 fp = pos * 2.8;
      float n  = fbm(fp);
      float n2 = fbm(fp * 1.7 + 4.0);
      float folds = sin(pos.x * 11.0 + n * 4.0) * 0.045
                  + sin(pos.y * 13.0 + n2 * 3.0) * 0.045
                  + sin(pos.z * 10.0 + n  * 5.0) * 0.055;

      // ── Sagittal fissure: deep central groove along x=0, only on top hemispheres
      float fissureMask = exp(-abs(pos.x) * 9.0);
      float topMask = smoothstep(-0.10, 0.65, pos.y);
      float frontBackMask = smoothstep(-1.0, -0.7, pos.z) * (1.0 - smoothstep(0.8, 1.2, pos.z));
      float fissure = fissureMask * topMask * frontBackMask * 0.32;

      // cerebellum override: very fine fold pattern, no fissure, flattened top
      if (uIsCerebellum > 0.5) {
        folds = sin(pos.x * 26.0) * 0.025
              + sin(pos.y * 28.0) * 0.025
              + sin(pos.z * 24.0) * 0.025
              + n * 0.05;
        fissure = 0.0;
      }

      pos += normal * (folds + n * 0.13 - fissure);
      vFissure = fissure;
      vPos = pos;
      vNormal = normalize(normalMatrix * normal);
      vec4 wp = modelMatrix * vec4(pos, 1.0);
      vWorldPos = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  /* fragment */ `
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec3 vPos;
    varying float vFissure;
    uniform float uTime;
    uniform vec3 uBaseColor;
    uniform vec3 uDeepColor;
    uniform vec3 uActiveColor;
    uniform vec3 uActivePos;
    uniform float uActiveStrength;

    void main(){
      vec3 viewDir = normalize(cameraPosition - vWorldPos);
      float fres = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.6);

      // base brain tone (living tissue) with subtle darkening in valleys
      vec3 col = mix(uDeepColor, uBaseColor, 0.55 + 0.4 * vNormal.y);
      col *= 1.0 - vFissure * 1.8;

      // electric synapse veins along folds
      float vein = sin(vPos.x * 24.0 + uTime * 1.3) * sin(vPos.y * 20.0 - uTime * 1.1) * sin(vPos.z * 22.0);
      vein = smoothstep(0.55, 1.0, vein);
      col += uActiveColor * vein * (0.35 + 0.25 * sin(uTime * 4.0));

      // breathing heartbeat
      col += uActiveColor * 0.15 * (0.5 + 0.5 * sin(uTime * 1.8));

      // selected region — strong directed glow, tightly localized
      float d = distance(vPos, uActivePos);
      float regionGlow = exp(-d * d * 3.2) * uActiveStrength;
      col += uActiveColor * regionGlow * 1.6;

      // fresnel rim
      col += uActiveColor * fres * 0.55;

      gl_FragColor = vec4(col, 1.0);
    }
  `
);

extend({ BrainMaterial });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      brainMaterial: { ref?: React.Ref<THREE.ShaderMaterial>; attach?: string };
    }
  }
}

/* ═════════════════════════════════════════════════════════════════════
   Cerebrum — main brain mass (icosahedron, shader-displaced ovoid)
   ═════════════════════════════════════════════════════════════════════ */

function Cerebrum({
  activeRegion,
  onPointerMove,
  onClick,
}: {
  activeRegion: Region | null;
  onPointerMove: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const tmpPos = useMemo(() => new THREE.Vector3(), []);
  const tmpColor = useMemo(() => new THREE.Color('#22e4ff'), []);
  const target = useRef(0);

  useFrame(({ clock }, dt) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    if (activeRegion && activeRegion.id !== 'cerebellum' && activeRegion.id !== 'brainstem') {
      tmpPos.set(activeRegion.position.x, activeRegion.position.y, activeRegion.position.z);
      tmpColor.set(activeRegion.color);
      target.current = 0.85;
    } else {
      // when cerebellum/brainstem (or no) region active, keep cerebrum baseline cyan tint
      tmpColor.set('#22e4ff');
      target.current = 0.0;
    }
    const u = matRef.current.uniforms;
    (u.uActivePos.value as THREE.Vector3).lerp(tmpPos, dt * 5);
    (u.uActiveColor.value as THREE.Color).lerp(tmpColor, dt * 5);
    u.uActiveStrength.value += (target.current - u.uActiveStrength.value) * dt * 6;
  });

  return (
    <mesh
      onPointerMove={onPointerMove}
      onClick={onClick}
      onPointerOut={(e) => {
        e.stopPropagation();
        onPointerMove({ ...e, point: new THREE.Vector3(99, 99, 99) } as ThreeEvent<PointerEvent>);
      }}
    >
      <icosahedronGeometry args={[1.15, 96]} />
      <brainMaterial ref={matRef} attach="material" />
    </mesh>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Cerebellum — smaller bumpy lobe at posterior-inferior position
   ═════════════════════════════════════════════════════════════════════ */

function Cerebellum({
  activeRegion,
  onPointerMove,
  onClick,
}: {
  activeRegion: Region | null;
  onPointerMove: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const tmpPos = useMemo(() => new THREE.Vector3(), []);
  const tmpColor = useMemo(() => new THREE.Color('#ff7a00'), []);
  const target = useRef(0);

  useFrame(({ clock }, dt) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    matRef.current.uniforms.uIsCerebellum.value = 1.0;
    if (activeRegion) {
      tmpPos.set(0, 0, 0);
      tmpColor.set(activeRegion.color);
      target.current = activeRegion.id === 'cerebellum' || activeRegion.id === 'brainstem' ? 0.85 : 0.0;
    } else {
      target.current = 0.0;
    }
    const u = matRef.current.uniforms;
    (u.uActivePos.value as THREE.Vector3).lerp(tmpPos, dt * 5);
    (u.uActiveColor.value as THREE.Color).lerp(tmpColor, dt * 5);
    u.uActiveStrength.value += (target.current - u.uActiveStrength.value) * dt * 6;
  });

  return (
    <group position={[0, -0.75, -0.85]} scale={[0.55, 0.42, 0.55]}>
      <mesh onPointerMove={onPointerMove} onClick={onClick}>
        <sphereGeometry args={[1, 48, 48]} />
        <brainMaterial ref={matRef} attach="material" />
      </mesh>
    </group>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Brainstem — small cylinder extending down
   ═════════════════════════════════════════════════════════════════════ */

function Brainstem() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + 0.25 * Math.sin(clock.getElapsedTime() * 2);
    }
  });
  return (
    <mesh ref={ref} position={[0, -1.15, -0.4]} rotation={[0.25, 0, 0]}>
      <cylinderGeometry args={[0.13, 0.18, 0.55, 24]} />
      <meshStandardMaterial
        color="#ff7a99"
        emissive="#b6ff3c"
        emissiveIntensity={0.5}
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Region markers — anatomically anchored, no labels (info via hover panel)
   ═════════════════════════════════════════════════════════════════════ */

function RegionMarker({ region, isActive }: { region: Region; isActive: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 3.2 + region.position.x * 1.5) * 0.18;
    if (ref.current) ref.current.scale.setScalar((isActive ? 1.55 : 1) * pulse);
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 1.2;
      ringRef.current.scale.setScalar(isActive ? 1.55 : 1.1);
    }
  });

  return (
    <group position={[region.position.x, region.position.y, region.position.z]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.075, 20, 20]} />
        <meshBasicMaterial color={region.color} toneMapped={false} />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.12, 0.15, 32]} />
        <meshBasicMaterial
          color={region.color}
          transparent
          opacity={isActive ? 0.9 : 0.3}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.17, 16, 16]} />
        <meshBasicMaterial color={region.color} transparent opacity={isActive ? 0.22 : 0.08} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Floating synapse particles inside / around the brain
   ═════════════════════════════════════════════════════════════════════ */

function Synapses() {
  const points = useRef<THREE.Points>(null);
  const { positions, count } = useMemo(() => {
    const count = 380;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.5 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta) * 1.25;
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = r * Math.cos(phi) * 1.4;
    }
    return { positions, count };
  }, []);

  useFrame(({ clock }) => {
    if (points.current) points.current.rotation.y = clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#22e4ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function PulseOrbit({ radius, speed, color, phase, tilt }: { radius: number; speed: number; color: string; phase: number; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + phase;
    ref.current.position.set(Math.cos(t) * radius * 1.2, Math.sin(t * tilt) * 0.7, Math.sin(t) * radius);
  });
  return (
    <Trail width={1.8} length={6} color={color} attenuation={(x) => x * x}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </Trail>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Scene wrapper — handles hover-region detection via nearest-marker.
   ═════════════════════════════════════════════════════════════════════ */

function BrainScene({
  hoveredId,
  lockedId,
  setHovered,
  setLocked,
  setUserInteracted,
}: {
  hoveredId: string | null;
  lockedId: string | null;
  setHovered: (id: string | null) => void;
  setLocked: (id: string | null) => void;
  setUserInteracted: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const activeId = lockedId || hoveredId;
  const active = profile.brainRegions.find((r) => r.id === activeId) || null;

  // Find nearest region to a 3D point (in brain-local space)
  const detectRegion = useCallback((p: THREE.Vector3) => {
    let best: Region | null = null;
    let bestD = 1.4; // max snap distance (in brain units)
    for (const r of profile.brainRegions) {
      const dx = p.x - r.position.x;
      const dy = p.y - r.position.y;
      const dz = p.z - r.position.z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (d < bestD) {
        bestD = d;
        best = r;
      }
    }
    return best;
  }, []);

  const handlePointer = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation?.();
      // event.point is in world space; convert to brain-local
      const local = groupRef.current
        ? groupRef.current.worldToLocal(e.point.clone())
        : e.point.clone();
      const r = detectRegion(local);
      setHovered(r ? r.id : null);
    },
    [detectRegion, setHovered]
  );

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation?.();
      setUserInteracted();
      const local = groupRef.current
        ? groupRef.current.worldToLocal(e.point.clone())
        : e.point.clone();
      const r = detectRegion(local);
      if (!r) return;
      setLocked(lockedId === r.id ? null : r.id);
    },
    [detectRegion, lockedId, setLocked, setUserInteracted]
  );

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#22e4ff" />
      <pointLight position={[-5, -3, -2]} intensity={1.0} color="#ff2bd6" />
      <pointLight position={[0, 3, -4]} intensity={0.7} color="#9d4edd" />
      <pointLight position={[0, -3, 3]} intensity={0.5} color="#ff7a00" />

      <Cerebrum activeRegion={active} onPointerMove={handlePointer} onClick={handleClick} />
      <Cerebellum activeRegion={active} onPointerMove={handlePointer} onClick={handleClick} />
      <Brainstem />
      <SkullOutline />
      <Synapses />

      {profile.brainRegions.map((r) => (
        <RegionMarker key={r.id} region={r} isActive={activeId === r.id} />
      ))}

      <PulseOrbit radius={2.4} speed={0.55} color="#22e4ff" phase={0}   tilt={1.4} />
      <PulseOrbit radius={2.7} speed={0.42} color="#ff2bd6" phase={2.1} tilt={1.1} />
      <PulseOrbit radius={2.1} speed={0.78} color="#ff7a00" phase={4.2} tilt={1.7} />
    </group>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Default export — InteractiveBrain
   ═════════════════════════════════════════════════════════════════════ */

export default function InteractiveBrain({
  activeId,
  onSelect,
  voiceEnabled = false,
}: {
  activeId: string | null;
  onSelect: (id: string | null) => void;
  voiceEnabled?: boolean;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const controlsRef = useRef<any>(null);
  const lastSpokenId = useRef<string | null>(null);

  // ── Voice-over via free Web Speech Synthesis API
  useEffect(() => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const target = activeId || hoveredId;
    if (!target || target === lastSpokenId.current) return;
    const region = profile.brainRegions.find((r) => r.id === target);
    if (!region) return;
    lastSpokenId.current = target;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(region.subtitle);
    u.rate = 1.05;
    u.pitch = 0.95;
    u.volume = 0.85;
    // prefer a female voice when available for the "JARVIS" vibe
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => /samantha|google.*us.*female|microsoft zira|karen|female/i.test(v.name)) ||
      voices.find((v) => /en[-_]US|en[-_]GB/i.test(v.lang));
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
  }, [activeId, hoveredId, voiceEnabled]);

  // dismiss hint after first interaction
  useEffect(() => {
    if (activeId || hoveredId) setShowHint(false);
  }, [activeId, hoveredId]);

  // sync external (locked) selection
  const effective = activeId || hoveredId;
  const active = profile.brainRegions.find((r) => r.id === effective) || null;

  return (
    <div className="relative h-[78vh] min-h-[600px] w-full" data-testid="interactive-brain">
      {/* big background halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(157,78,221,0.35), rgba(255,43,214,0.22) 35%, rgba(34,228,255,0.12) 60%, transparent 80%)',
        }}
      />

      {/* basketball court line — subtle nod to cerebellum/basketball */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-12 mx-auto h-[180px] w-[480px] rounded-[100%] border border-neon-amber/15"
        style={{ filter: 'blur(2px)' }}
      />

      <Canvas
        camera={{ position: [0, 0.3, 4.6], fov: 50 }}
        dpr={[1, 2]}
        onPointerMissed={() => {
          setHoveredId(null);
          // do not clear locked selection on miss — user might be reading panel
        }}
      >
        <Suspense fallback={null}>
          <BrainScene
            hoveredId={hoveredId}
            lockedId={activeId}
            setHovered={setHoveredId}
            setLocked={onSelect}
            setUserInteracted={() => setUserInteracted(true)}
          />

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={3.5}
            maxDistance={7}
            autoRotate={!userInteracted && !activeId && !hoveredId}
            autoRotateSpeed={0.9}
            rotateSpeed={0.6}
            enableDamping
            dampingFactor={0.06}
            onStart={() => setUserInteracted(true)}
          />
        </Suspense>
      </Canvas>

      {/* HUD overlays removed */}

      {/* Animated CTA — invites exploration */}
      {showHint && !active && (
        <div
          className="pointer-events-none absolute left-5 top-1/2 z-30 hidden -translate-y-1/2 sm:block"
          data-testid="brain-hint-cta"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan/60" />
            <div
              className="rounded-2xl border border-neon-cyan/50 bg-cosmos-900/85 px-4 py-3 backdrop-blur-md"
              style={{ boxShadow: '0 0 0 1px rgba(34,228,255,0.15), 0 18px 50px -20px rgba(34,228,255,0.5)' }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">
                <span className="cursor-blink">◢ scan my mind</span>
              </p>
              <p className="mt-1 max-w-[200px] text-xs leading-snug text-zinc-100">
                Hover a lobe.{' '}
                <span className="font-semibold text-neon-cyan">Click</span> to lock.{' '}
                <span className="font-semibold text-neon-magenta">Drag</span> to rotate.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile hint banner */}
      {showHint && !active && (
        <div
          className="pointer-events-none absolute inset-x-5 top-14 z-10 sm:hidden"
          data-testid="brain-hint-cta-mobile"
        >
          <div className="rounded-full border border-neon-cyan/40 bg-cosmos-900/75 px-3 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-neon-cyan backdrop-blur">
            ◢ tap a lobe pill below to scan
          </div>
        </div>
      )}

      {/* Floating info card — anchored bottom-right of brain canvas */}
      {active && (
        <div
          className="pointer-events-none absolute right-5 top-1/2 z-20 hidden w-[320px] -translate-y-1/2 lg:block"
          data-testid={`brain-info-${active.id}`}
        >
          <div
            className="pointer-events-auto overflow-hidden rounded-2xl border border-white/10 bg-cosmos-900/85 p-5 backdrop-blur-md"
            style={{
              boxShadow: `0 0 0 1px ${active.color}33, 0 20px 60px -25px ${active.color}66`,
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: active.color, boxShadow: `0 0 12px ${active.color}` }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: active.color }}
              >
                {active.label}
              </span>
              {(active as any).isBasketball && (
                <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-neon-amber/20 text-[10px]">
                  🏀
                </span>
              )}
            </div>

            <h3 className="font-display text-lg font-semibold leading-tight text-white">
              {active.subtitle}
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {(active as any).tagline}
            </p>

            <ul className="mt-3 space-y-1.5">
              {active.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs leading-5 text-zinc-300">
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                    style={{ background: active.color }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {(active as any).metrics && (
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/5 pt-3">
                {(active as any).metrics.map((m: { label: string; value: string }) => (
                  <div key={m.label}>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500">
                      {m.label}
                    </p>
                    <p
                      className="font-display text-sm font-semibold"
                      style={{ color: active.color }}
                    >
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeId && (
              <button
                onClick={() => onSelect(null)}
                data-testid="brain-info-close"
                className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 transition hover:border-white/30 hover:text-zinc-200"
              >
                unlock
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
