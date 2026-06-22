# Akshit Singh — AI Engineer Portfolio (3D Anatomical Brain Hero)

## Original problem statement
Iter 1: "Make this portfolio modern 3D AI Engineer types."
Iter 2: "Revamp with my resume. Make brain interactive like Iron Man 3 AIM lab."
Iter 3: "Brain should be SHAPED like a real human brain, 3D rotatable, hover to detect parts and pop up info. Brain should BE the hero. Basketball player — weave it in. Use resume content liberally."

Source repo: https://github.com/aks-hit/portfolio
Resume: https://customer-assets.emergentagent.com/job_tech-engineer-3d-1/artifacts/hwdbkbdq_Akshit_singh.pdf

## Stack
- Next.js 14 App Router + TypeScript
- three.js + @react-three/fiber + @react-three/drei (OrbitControls, Trail, shaderMaterial)
- Custom GLSL shader (simplex FBM noise + gyri/sulci folds + sagittal fissure + active-region glow)
- Tailwind CSS · Framer Motion
- Fonts: Syne (display) · Outfit (sans) · JetBrains Mono (mono)
- Chatbot: Next.js `/api/chat` (Gemini-backed when key set, else local fallback)

## Iron-Man-3 Anatomical Brain (Hero)
The brain IS the hero — fills 78vh of the home page.
- **Cerebrum**: high-poly icosahedron scaled to brain ovoid (1.05 × 0.90 × 1.30 axes), shader-displaced with FBM noise + sine layers to simulate gyri/sulci folds, with a 0.32-deep sagittal fissure groove along the central x=0 plane (top hemispheres only). Living-tissue pink + cyan synapse pulses + emissive heartbeat + fresnel rim.
- **Cerebellum**: separate sphere mesh at (0, -0.75, -0.85), 55% × 42% × 55% scale, finer fold pattern (different shader branch).
- **Brainstem**: small tapered cylinder at (0, -1.15, -0.4) with emissive lime breathing.
- **6 anatomically-positioned region markers** (glowing sphere + rotating ring + halo):
  - Frontal Lobe — Strategy & 0→1 Execution (cyan)
  - Parietal Lobe — Cloud & MLOps (violet)
  - Temporal Lobe — Voice & Real-Time AI (magenta)
  - Occipital Lobe — Agentic AI & RAG (amber)
  - Cerebellum — Basketball Brain · Coordination & Discipline (basketball orange)
  - Brainstem — Signals & How to Reach Me (lime)
- **OrbitControls** (drei): drag-to-rotate, zoom (3.5-7 distance), auto-rotate when idle (0.9 speed), damping 0.06. Auto-rotate stops on first user interaction.
- **Hover detection**: onPointerMove on cerebrum/cerebellum meshes → worldToLocal → nearest-marker distance → sets hoveredId.
- **Click to lock**: clicking a region toggles it locked; floating top-right info card stays open.
- **Lobe pill selector** below brain (mobile fallback + accessibility).
- **Floating info card** (desktop lg+): label · subtitle · tagline · 3 bullets · 3 metric chips · unlock button. Card uses region's color for glow + accents.
- **Synapse cloud** of 380 additive-blended points around the brain.
- **3 pulse electron orbits** (cyan/magenta/orange) with trails.

## Basketball Integration
- **Cerebellum lobe = basketball lobe** (anatomically the cerebellum IS the motor coordination center, so this maps cleanly to athletics)
- New **basketball strip section** between featured projects and CTA — court-line concentric rings, amber accents, "The cerebellum runs the same playbook" headline, 3 stat cards (3 championships, PG captain/lead, ∞ team flow)
- Chat fallback handles `basketball|sport|athlete|captain|team` → championship cerebellum response
- Suggested chat chip: "Basketball?"

## Resume content surfaced
- Hero stats: **70x · <$1/mo · 191x · Top 9%**
- Frontal Lobe metrics: Speedup 70x · Cost <$1/mo · Time-to-prod 5 weeks
- Parietal metrics: 9 phases · 0 re-billed calls · 3.9x throughput
- Temporal metrics: <2s latency · 5+ concurrent · 70% workload cut
- Occipital metrics: RAGAS +62% · Faithfulness +135% · Latency 191x
- Cerebellum metrics: 3 in a row · Captain · Lead PG
- Brainstem metrics: AIR 5246 · Top 9% · 2× OCI Certs

## Test results
- iter_1: 31/32 PASS, 1 HIGH bug FIXED (project overlay close)
- iter_2: 63/63 PASS, 0 bugs
- iter_3: **42/42 PASS, 0 bugs**. Theme defaulted to dark to match cosmos aesthetic.

## Backlog
- **P1**: Resume PDF download button (asset linked, needs wiring)
- **P1**: Live Gemini 2.5 Flash chat (add GEMINI_API_KEY to .env.local)
- **P2**: Calendly/Cal.com booking embed on "Hire me"
- **P2**: GitHub Stats live widget
- **P2**: MDX research notes / blog
- **P2**: Custom GLB human brain model from CC0 source for more anatomical fidelity (current procedural shader is already strong)

## Deployment
Frontend: `next dev -p 3000` via supervisor. For production: `next build && next start`.
