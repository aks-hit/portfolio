'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setIsPointer(
        window.getComputedStyle(t).cursor === 'pointer' ||
          t.tagName === 'A' ||
          t.tagName === 'BUTTON' ||
          !!t.closest('a,button')
      );
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="cursor-follower-hide pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 rounded-full border border-neon-cyan/50 mix-blend-screen md:block"
        animate={{
          x: pos.x - 16,
          y: pos.y - 16,
          scale: isPointer ? 1.6 : 1,
          borderColor: isPointer ? 'rgba(255,43,214,0.7)' : 'rgba(34,228,255,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        aria-hidden
        className="cursor-follower-hide pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 rounded-full bg-neon-cyan md:block"
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: 'spring', stiffness: 1000, damping: 40 }}
        style={{ boxShadow: '0 0 12px #22e4ff' }}
      />
    </>
  );
}
