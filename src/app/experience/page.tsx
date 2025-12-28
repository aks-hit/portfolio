
// ============================================
// FILE: src/app/experience/page.tsx
// ============================================
'use client';

import { experiences } from '@/data/experience';
import ExperienceCard from '@/components/ExperienceCard';
import Section from '@/components/Section';

export default function Experience() {
  return (
    <div className="pt-20">
      <Section title="Work Experience">
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </Section>
    </div>
  );
}
