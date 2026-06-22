'use client';

import { useEffect, useRef } from 'react';

/**
 * NeuralBackground — Canvas-based particle/edge neural network.
 * Lightweight, no WebGL needed. Sits behind page content.
 */
export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * DPR);
    let height = (canvas.height = window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    const PARTICLE_COUNT = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    const MAX_DIST = 160 * DPR;

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    const particles: P[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25 * DPR,
      vy: (Math.random() - 0.5) * 0.25 * DPR,
      r: (Math.random() * 1.4 + 0.4) * DPR,
      hue: [192, 280, 320][Math.floor(Math.random() * 3)], // cyan / violet / magenta hues
    }));

    let mouse = { x: width / 2, y: height / 2, active: false };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * DPR;
      mouse.y = e.clientY * DPR;
      mouse.active = true;
    };
    const onLeave = () => (mouse.active = false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    const onResize = () => {
      width = canvas.width = window.innerWidth * DPR;
      height = canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    window.addEventListener('resize', onResize);

    let rafId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // soft gradient wash
      const grad = ctx.createRadialGradient(width * 0.8, 0, 0, width * 0.8, 0, width);
      grad.addColorStop(0, 'rgba(157,78,221,0.06)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // gentle pull toward mouse when active
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 240 * DPR) {
            p.vx += (dx / d) * 0.008 * DPR;
            p.vy += (dy / d) * 0.008 * DPR;
          }
        }
        // damp
        p.vx *= 0.985;
        p.vy *= 0.985;
      }

      // draw edges
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.35;
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 90%, 65%, ${alpha})`;
            ctx.lineWidth = 0.6 * DPR;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw nodes
      for (const p of particles) {
        ctx.fillStyle = `hsla(${p.hue}, 95%, 70%, 0.9)`;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 70%, 0.8)`;
        ctx.shadowBlur = 8 * DPR;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-testid="neural-bg-canvas"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
}
