'use client';

import { motion } from 'framer-motion';
import { Code2, ExternalLink, Sparkles } from 'lucide-react';
import { Project } from '@/data/projects';

interface Props {
  project: Project;
  index: number;
  onHover: () => void;
}

export default function ProjectCard({ project, index, onHover }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onMouseEnter={onHover}
      className="group flex min-h-[280px] cursor-pointer flex-col rounded-xl border border-slate-800 bg-slate-950/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-950/30"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${project.gradient} text-white`}>
          <Code2 className="h-6 w-6" />
        </div>
        {project.link !== '#' ? (
          <ExternalLink className="h-5 w-5 text-slate-500 transition group-hover:text-cyan-300" />
        ) : (
          <Sparkles className="h-5 w-5 text-slate-500 transition group-hover:text-amber-300" />
        )}
      </div>

      <h3 className="text-xl font-bold text-white">{project.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
        {project.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
