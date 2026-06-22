'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * SkullOutline — a faint wireframe head/skull around the brain
 * to help users orient themselves (front/back/sides). Includes:
 *   • Skull dome wireframe
 *   • Eye sockets (rings)
 *   • Nose triangle indicator
 *   • Mouth arc
 *   • Ear loops
 *   • Front-facing arrow + "FRONT" label
 */
export default function SkullOutline({ visible = true }: { visible?: boolean }) {
  const skullRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (skullRef.current) {
      // subtle breathing scale
      const s = 1 + Math.sin(clock.getElapsedTime() * 0.6) * 0.005;
      skullRef.current.scale.setScalar(s);
    }
  });

  if (!visible) return null;

  // nose triangle vertices (front-pointing)
  const noseVerts = new Float32Array([
    0, 0.15, 1.75,   // top
    -0.1, -0.25, 1.7, // bottom left
    0.1, -0.25, 1.7,  // bottom right
    0, 0.15, 1.75,   // close
  ]);

  // mouth arc
  const mouthCurve = new THREE.EllipseCurve(0, 0, 0.25, 0.08, Math.PI, 2 * Math.PI, false, 0);
  const mouthPts = mouthCurve.getPoints(40);
  const mouthGeom = new THREE.BufferGeometry().setFromPoints(
    mouthPts.map((p) => new THREE.Vector3(p.x, p.y - 0.7, 1.55))
  );

  return (
    <group ref={skullRef}>
      {/* ── Skull dome — large faint wireframe sphere ── */}
      <mesh scale={[1.72, 1.90, 1.62]}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial color="#22e4ff" wireframe transparent opacity={0.05} />
      </mesh>

      {/* ── Edge outline (great-circle lines) ── */}
      <lineSegments scale={[1.72, 1.90, 1.62]}>
        <edgesGeometry args={[new THREE.SphereGeometry(1, 28, 18)]} />
        <lineBasicMaterial color="#22e4ff" transparent opacity={0.12} />
      </lineSegments>

      {/* ── Equator ring (helps orient front/back) ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.68, 1.70, 64]} />
        <meshBasicMaterial color="#22e4ff" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Coronal plane ring (top of head) ── */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[1.68, 1.70, 64]} />
        <meshBasicMaterial color="#22e4ff" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Eye sockets (rings on the face plane) ── */}
      <mesh position={[-0.5, 0.08, 1.55]}>
        <ringGeometry args={[0.13, 0.155, 32]} />
        <meshBasicMaterial color="#22e4ff" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.5, 0.08, 1.55]}>
        <ringGeometry args={[0.13, 0.155, 32]} />
        <meshBasicMaterial color="#22e4ff" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>

      {/* Eye pupils (small glowing dots) */}
      <mesh position={[-0.5, 0.08, 1.6]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#22e4ff" toneMapped={false} />
      </mesh>
      <mesh position={[0.5, 0.08, 1.6]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#22e4ff" toneMapped={false} />
      </mesh>

      {/* ── Nose triangle ── */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={4} array={noseVerts} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#22e4ff" transparent opacity={0.45} />
      </line>

      {/* ── Mouth arc ── */}
      <line>
        <primitive object={mouthGeom} attach="geometry" />
        <lineBasicMaterial color="#22e4ff" transparent opacity={0.4} />
      </line>

      {/* ── Ear loops (vertical rings on each side) ── */}
      <mesh position={[-1.62, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.18, 0.21, 32]} />
        <meshBasicMaterial color="#22e4ff" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[1.62, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.18, 0.21, 32]} />
        <meshBasicMaterial color="#22e4ff" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Jaw line — half torus at chin ── */}
      <mesh position={[0, -1.25, 0.25]} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.9, 0.012, 8, 48, Math.PI]} />
        <meshBasicMaterial color="#22e4ff" transparent opacity={0.4} />
      </mesh>

      {/* ── FRONT-direction marker — small chevron at front ── */}
      <group position={[0, 1.05, 1.9]}>
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-neon-cyan/70">
            ◢ front
          </div>
        </Html>
      </group>

      {/* Direction markers — back/left/right */}
      <group position={[0, 1.05, -1.9]}>
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-neon-cyan/40">
            ◣ back
          </div>
        </Html>
      </group>
      <group position={[-1.95, 1.0, 0]}>
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-neon-cyan/40">
            L
          </div>
        </Html>
      </group>
      <group position={[1.95, 1.0, 0]}>
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-neon-cyan/40">
            R
          </div>
        </Html>
      </group>
    </group>
  );
}
