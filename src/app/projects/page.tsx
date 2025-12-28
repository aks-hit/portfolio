// ============================================
// FILE: src/app/projects/page.tsx
// ============================================
'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import Section from '@/components/Section';

export default function Projects() {
  return (
    <div className="pt-20">
      <Section title="Featured Projects">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Section>
    </div>
  );
}
