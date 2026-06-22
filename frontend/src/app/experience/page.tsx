'use client';

import { experiences } from '@/data/experience';
import ExperienceCard from '@/components/ExperienceCard';
import Section from '@/components/Section';

export default function Experience() {
  return (
    <div className="pt-20" data-testid="experience-page">
      <Section
        kicker="career.log"
        title="Production wins, measured."
        subtitle="Shipped agentic AI, RAG, LLM orchestration, and real-time speech systems across enterprise workflows."
      >
        <div className="relative space-y-8">
          <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-neon-cyan/50 via-neon-violet/40 to-transparent md:block" />
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative md:pl-12">
              <span className="pointer-events-none absolute -left-px top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-neon-cyan ring-4 ring-cosmos-900 md:block" style={{ boxShadow: '0 0 12px #22e4ff' }} />
              <ExperienceCard experience={exp} index={index} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
