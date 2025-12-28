'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FloatingCard({
  children,
  delay = 0,
  className = '',
}: FloatingCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      initial={{ y: 0 }}
      animate={
        shouldReduceMotion
          ? { y: 0 }
          : { y: [0, -16, 0] }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              delay,
            }
      }
      className={`pointer-events-auto will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
