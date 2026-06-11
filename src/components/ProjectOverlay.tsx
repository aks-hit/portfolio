'use client';

import { motion } from 'framer-motion';
import { Code2, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/data/projects';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectOverlay({ project, onClose }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        aria-label="Close project details"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="relative z-10 max-h-[86vh] w-full max-w-3xl overflow-auto rounded-xl border border-zinc-800/80 bg-[#0f0f12]/95 backdrop-blur-xl p-6 shadow-2xl sm:p-8"
      >
        <div className="absolute right-4 top-4 flex gap-2">
          {project.link !== '#' && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-zinc-800 p-2 text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300"
              aria-label="Open project"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
          <button
            onClick={onClose}
            className="rounded-md border border-zinc-800 p-2 text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-5 flex items-center gap-3 pr-20">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${project.gradient} text-white`}>
            <Code2 className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-zinc-100 sm:text-2xl">{project.title}</h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="mb-4 text-base leading-7 text-zinc-300"
        >
          {project.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mb-5 rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-4 text-sm leading-6 text-zinc-400"
        >
          {project.highlights}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="flex flex-wrap gap-1.5"
        >
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-zinc-700/60 bg-zinc-800/40 px-2.5 py-1 text-xs font-medium text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
