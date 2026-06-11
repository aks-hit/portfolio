'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { Experience } from '@/data/experience';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6"
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-zinc-100">{experience.role}</h3>
          <div className="mt-1 flex items-center gap-2 text-zinc-400">
            <Briefcase className="h-4 w-4 text-zinc-600" />
            <span className="text-sm">{experience.company}</span>
          </div>
        </div>
        <span className="rounded-md border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-500">
          {experience.period}
        </span>
      </div>

      <ul className="space-y-3">
        {experience.points.map((point, itemIndex) => (
          <motion.li
            key={point}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 + itemIndex * 0.04 }}
            className="flex items-start gap-3 text-sm leading-6 text-zinc-400"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/40" />
            <span>{point}</span>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}
