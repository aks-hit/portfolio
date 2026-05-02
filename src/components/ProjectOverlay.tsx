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
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.94, y: 28 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 28 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="relative z-10 max-h-[86vh] w-full max-w-4xl overflow-auto rounded-2xl border border-slate-700 bg-slate-950/95 p-6 shadow-2xl shadow-cyan-950/30 sm:p-8"
      >
        <div className="absolute right-5 top-5 flex gap-3">
          {project.link !== '#' && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-200"
              aria-label="Open project"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          )}
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-rose-400 hover:text-rose-200"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6 flex items-center gap-3 pr-24">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${project.gradient} text-white`}>
            <Code2 className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black text-white sm:text-3xl">{project.title}</h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mb-4 text-lg leading-8 text-slate-300"
        >
          {project.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mb-6 rounded-xl border border-slate-800 bg-slate-900/70 p-4 leading-7 text-slate-300"
        >
          {project.highlights}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24 }}
          className="flex flex-wrap gap-2"
        >
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-200"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
