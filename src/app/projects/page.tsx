'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import ProjectOverlay from '@/components/ProjectOverlay';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const handleHover = (index: number) => {
    setActiveProject(index);
  };

  return (
    <section className="py-28 px-4 relative">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">
          Mission archive
        </p>
        <h1 className="text-5xl font-black gradient-text">Featured Projects</h1>
        <p className="mt-5 text-lg leading-8 text-slate-400">
          Hover a mission card to open the field report. Each project is treated as
          a playable quest: problem, stack, outcome, and link when available.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onHover={() => handleHover(index)}
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
