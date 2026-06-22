'use client';

import { motion } from 'framer-motion';
import { Code2, ExternalLink, Sparkles } from 'lucide-react';
import { Project } from '@/data/projects';

interface Props {
  project: Project;
  index: number;
  onOpen: () => void;
}

export default function ProjectCard({ project, index, onOpen }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      className="neon-card glass group flex min-h-[280px] cursor-pointer flex-col rounded-3xl p-6"
      data-testid={`project-card-${index}`}
    >
      <div className="mb-5 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${project.gradient} text-white shadow-lg shadow-black/30`}>
          <Code2 className="h-5 w-5" />
        </div>
        {project.link !== '#' ? (
          <ExternalLink className="h-4 w-4 text-zinc-600 transition group-hover:text-neon-cyan" />
        ) : (
          <Sparkles className="h-4 w-4 text-zinc-600 transition group-hover:text-neon-magenta" />
        )}
      </div>

      <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{project.description}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
