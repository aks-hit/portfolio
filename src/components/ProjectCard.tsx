'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-effect p-6 rounded-xl card-hover group relative overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <Code className="w-8 h-8 text-cyan-400" />
          <a
            href={project.link}
            className="text-slate-400 hover:text-cyan-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-300 mb-3 text-sm leading-relaxed">
          {project.description}
        </p>

        {project.highlights && (
          <p className="text-slate-400 mb-4 text-sm leading-relaxed">
            {project.highlights}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}