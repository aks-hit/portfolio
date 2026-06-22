'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { Experience } from '@/data/experience';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ACCENTS = [
  { icon: 'text-neon-cyan', dot: 'bg-neon-cyan', glow: 'bg-neon-cyan/15', shadow: '0 0 10px #22e4ff' },
  { icon: 'text-neon-violet', dot: 'bg-neon-violet', glow: 'bg-neon-violet/15', shadow: '0 0 10px #9d4edd' },
  { icon: 'text-neon-amber', dot: 'bg-neon-amber', glow: 'bg-neon-amber/15', shadow: '0 0 10px #ffb547' },
];

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const a = ACCENTS[index % ACCENTS.length];
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="neon-card glass relative rounded-3xl p-7"
      data-testid={`experience-card-${index}`}
    >
      <div className={`pointer-events-none absolute -left-10 top-0 h-32 w-32 rounded-full ${a.glow} blur-3xl`} />
      <div className="relative mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-2xl font-semibold text-white">{experience.role}</h3>
          <div className="mt-1 flex items-center gap-2 text-zinc-300">
            <Briefcase className={`h-4 w-4 ${a.icon}`} />
            <span className="text-sm">{experience.company}</span>
          </div>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          {experience.period}
        </span>
      </div>

      <ul className="relative space-y-3">
        {experience.points.map((point, itemIndex) => (
          <motion.li
            key={point}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 + itemIndex * 0.04 }}
            className="flex items-start gap-3 text-sm leading-7 text-zinc-300"
          >
            <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} style={{ boxShadow: a.shadow }} />
            <span>{point}</span>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}
