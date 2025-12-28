'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import ProjectOverlay from '@/components/ProjectOverlay';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const handleHover = (index: number) => {
    // Bring user focus to top / home position
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setActiveProject(index);
  };

  return (
    <section className="py-28 px-4 relative">
      <h1 className="text-5xl font-bold text-center gradient-text mb-16">
        Featured Projects
      </h1>

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
