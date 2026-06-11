'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl"
        >
          {title}
        </motion.h1>
        {children}
      </div>
    </section>
  );
}