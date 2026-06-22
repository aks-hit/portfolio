'use client';

import { motion } from 'framer-motion';
import { Award, GraduationCap, Trophy, Users } from 'lucide-react';
import Section from '@/components/Section';
import { profile } from '@/data/profile';

export default function About() {
  const skillCategoryGlow = [
    'from-neon-cyan/30',
    'from-neon-violet/30',
    'from-neon-magenta/30',
    'from-neon-amber/30',
    'from-neon-lime/25',
    'from-neon-cyan/25',
    'from-neon-violet/25',
  ];

  return (
    <div className="pt-20" data-testid="about-page">
      <Section
        kicker="profile.about"
        title="Engineering AI that ships."
        subtitle="I design and deploy agentic AI systems end-to-end — retrieval, orchestration, eval, MLOps. Built for production: low-latency, observable, governed."
      >
        {/* Intro + Education */}
        <div className="mb-20 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="neon-card glass rounded-3xl p-7"
          >
            <div className="space-y-4">
              <p className="text-lg leading-8 text-zinc-200">
                I take ambiguous problems from 0→1 and ship production systems fast. Cost and scale are my design constraints, not afterthoughts.
              </p>
              <p className="text-base leading-8 text-zinc-400">
                My work spans voice AI, LLM orchestration, computer vision, healthcare ML,
                and MLOps. I focus on the practical layer — latency, reliability, clear
                interfaces, and systems that feel useful from the first interaction.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="neon-card glass relative overflow-hidden rounded-3xl p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon-cyan/20 blur-3xl" />
              <GraduationCap className="mb-3 h-8 w-8 text-neon-cyan" />
              <h3 className="font-display text-lg font-semibold text-white">Education</h3>
              <p className="mt-1 text-sm text-zinc-300">{profile.education.degree}</p>
              <p className="text-sm text-zinc-500">{profile.education.school}</p>
              <p className="mt-3 font-display text-lg text-neon-amber">{profile.education.score}</p>
              <div className="mt-4 border-t border-white/5 pt-3">
                <p className="text-xs text-zinc-400">{profile.educationSecondary.degree}</p>
                <p className="text-xs text-zinc-500">{profile.educationSecondary.school}</p>
                <p className="mt-1 font-mono text-xs text-neon-cyan/80">{profile.educationSecondary.score}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="neon-card glass relative overflow-hidden rounded-3xl p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon-magenta/20 blur-3xl" />
              <Award className="mb-3 h-8 w-8 text-neon-magenta" />
              <h3 className="font-display text-lg font-semibold text-white">Top Signal</h3>
              <p className="mt-1 text-sm text-zinc-300">GATE 2025 — Data Science & AI</p>
              <p className="mt-3 font-display text-lg gradient-text">AIR 5246 · Top 9%</p>
            </motion.div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20" data-testid="skills-section">
          <h2 className="font-display mb-8 text-3xl font-bold text-white sm:text-4xl">
            <span className="gradient-text">Technical</span> stack
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {Object.entries(profile.skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="neon-card glass relative overflow-hidden rounded-3xl p-6"
              >
                <div className={`pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-b ${skillCategoryGlow[index]} to-transparent blur-2xl`} />
                <h3 className="relative mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-neon-cyan/80">
                  {category}
                </h3>
                <div className="relative flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div id="achievements" className="scroll-mt-28">
          <h2 className="font-display mb-8 text-3xl font-bold text-white sm:text-4xl">
            <span className="gradient-amber">Achievements</span>
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {profile.achievements.map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="neon-card glass rounded-3xl p-6"
              >
                {i < 2 ? (
                  <Trophy className="mb-4 h-6 w-6 text-neon-amber" />
                ) : (
                  <Users className="mb-4 h-6 w-6 text-neon-cyan" />
                )}
                <p className="text-sm leading-6 text-zinc-300">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
