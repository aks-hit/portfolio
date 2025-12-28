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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="glass-effect p-8 rounded-xl card-hover relative overflow-hidden"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-${experience.color}-400 to-${experience.color}-600`} />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-cyan-400 mb-1">
            {experience.role}
          </h3>
          <div className="flex items-center gap-2 text-xl text-slate-300">
            <Briefcase className="w-5 h-5" />
            {experience.company}
          </div>
        </div>
        <span className="text-slate-400 mt-2 md:mt-0 font-medium">
          {experience.period}
        </span>
      </div>

      <ul className="space-y-4">
        {experience.points.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + i * 0.1 }}
            className="text-slate-300 flex items-start group"
          >
            <span className="text-cyan-400 mr-3 mt-1 group-hover:scale-125 transition-transform">▹</span>
            <span className="leading-relaxed">{point}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}