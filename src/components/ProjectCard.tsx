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
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      onMouseEnter={onHover}
      className="group flex min-h-[260px] cursor-pointer flex-col rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 transition hover:border-zinc-700"
    >
      <div className="mb-5 flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${project.gradient} text-white shadow-lg shadow-black/20`}>
          <Code2 className="h-5 w-5" />
        </div>
        {project.link !== '#' ? (
          <ExternalLink className="h-4 w-4 text-zinc-600 transition group-hover:text-zinc-400" />
        ) : (
          <Sparkles className="h-4 w-4 text-zinc-600 transition group-hover:text-zinc-400" />
        )}
      </div>

      <h3 className="text-lg font-semibold text-zinc-100">{project.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
        {project.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
