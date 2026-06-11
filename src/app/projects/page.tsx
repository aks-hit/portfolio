'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import ProjectOverlay from '@/components/ProjectOverlay';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section className="py-28 px-4 relative">
      <div className="mx-auto mb-12 max-w-6xl">
        <p className="mb-2 text-xs font-mono font-medium uppercase tracking-widest text-zinc-500">
          <span className="text-amber-400/60">$</span> ls -la projects/
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">Projects</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
          Hover a card to see details. Each project includes the problem, stack,
          outcome, and link when available.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onHover={() => setActiveProject(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeProject !== null && (
          <ProjectOverlay
            project={projects[activeProject]}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
