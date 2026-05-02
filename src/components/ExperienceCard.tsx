'use client';

import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { Experience } from '@/data/experience';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const colorClasses: Record<string, string> = {
  cyan: 'from-cyan-300 to-blue-500 text-cyan-300',
  violet: 'from-violet-300 to-fuchsia-500 text-violet-300',
  emerald: 'from-emerald-300 to-teal-500 text-emerald-300',
  amber: 'from-amber-300 to-orange-500 text-amber-300',
};

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const colorClass = colorClasses[experience.color] ?? colorClasses.cyan;

  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.14 }}
      className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70 p-7"
    >
      <div className={`absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b ${colorClass}`} />

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="mb-2 text-2xl font-bold text-cyan-300">{experience.role}</h3>
          <div className="flex items-center gap-2 text-xl text-slate-300">
            <Briefcase className="h-5 w-5" />
            {experience.company}
          </div>
        </div>
        <span className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300">
          {experience.period}
        </span>
      </div>

      <ul className="space-y-4">
        {experience.points.map((point, itemIndex) => (
          <motion.li
            key={point}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 + itemIndex * 0.06 }}
            className="flex items-start gap-3 text-slate-300"
          >
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
            <span className="leading-relaxed">{point}</span>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}
