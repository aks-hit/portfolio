'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/data/projects';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectOverlay({ project, onClose }: Props) {
  // Close on Escape + lock body scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="project-overlay"
    >
      <button
        aria-label="Close"
        className="absolute inset-0 bg-cosmos-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="relative z-10 max-h-[86vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/10 bg-cosmos-900/90 p-7 shadow-2xl backdrop-blur-xl sm:p-9"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon-violet/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-neon-cyan/20 blur-3xl" />

        <div className="relative">
          <div className="absolute right-0 top-0 flex gap-2">
            {project.link !== '#' && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 p-2.5 text-zinc-400 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
                aria-label="Open project"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
            <button
              onClick={onClose}
              className="rounded-full border border-white/10 p-2.5 text-zinc-400 transition hover:border-neon-magenta/40 hover:text-neon-magenta"
              aria-label="Close"
              data-testid="overlay-close-btn"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-6 flex items-center gap-4 pr-24">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${project.gradient} text-white`}>
              <Code2 className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{project.title}</h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="mb-5 text-base leading-7 text-zinc-200"
          >
            {project.description}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-zinc-300"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan/80">// outcome</span>
            <br />
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
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
