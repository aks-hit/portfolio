'use client';

import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';
import { Project } from '@/data/projects';

interface Props {
  project: Project;
  index: number;
  onHover: () => void;
}

export default function ProjectCard({ project, index, onHover }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={onHover}
      className="glass-effect rounded-xl p-6 cursor-pointer hover:shadow-xl transition"
    >
      <div className="flex justify-between items-start">
        <Code className="w-7 h-7 text-cyan-400" />
        <ExternalLink className="w-5 h-5 text-slate-500" />
      </div>

      <h3 className="mt-6 text-lg font-bold text-white">
        {project.title}
      </h3>
    </motion.div>
  );
}
