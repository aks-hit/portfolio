'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import ProjectOverlay from '@/components/ProjectOverlay';
import Section from '@/components/Section';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div className="pt-20" data-testid="projects-page">
      <Section
        kicker="projects.shipped"
        title="Things I've built & deployed."
        subtitle="Click any card to view the problem, stack, and outcome. Press Esc or click outside to close. External links open the live repo or app when available."
      >
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onOpen={() => setActiveProject(index)}
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
      </Section>
    </div>
  );
}
