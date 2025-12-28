'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/data/projects';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectOverlay({ project, onClose }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background blur & dim */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ pointerEvents: 'none' }}

      />

      {/* Expanded Card */}
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        onMouseLeave={onClose}
        className="relative z-10 w-[70vw] max-w-4xl glass-effect rounded-2xl p-10"
      >
        {/* External link */}
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-6 right-6 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ExternalLink />
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Code className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">
            {project.title}
          </h2>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-300 mb-4 leading-relaxed"
        >
          {project.description}
        </motion.p>

        {/* Highlights */}
        {project.highlights && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mb-6 leading-relaxed"
          >
            {project.highlights}
          </motion.p>
        )}

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
