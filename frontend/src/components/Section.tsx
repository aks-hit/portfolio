'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  children: React.ReactNode;
}

export default function Section({ title, subtitle, kicker, children }: SectionProps) {
  return (
    <section className="px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {kicker && (
            <p className="terminal-prefix font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
              {kicker}
            </p>
          )}
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
