'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
}

export default function MagneticButton({ children }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="inline-flex items-center justify-center"
    >
      <motion.div
        animate={{ x: position.x * 0.25, y: position.y * 0.25 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
