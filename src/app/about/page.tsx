'use client';

import { motion } from 'framer-motion';
import { Award, GraduationCap, Trophy, Users } from 'lucide-react';
import Section from '@/components/Section';
import { profile } from '@/data/profile';

export default function About() {
  return (
    <div className="pt-20">
      <Section title="About">
        {/* Intro + Education */}
        <div className="mb-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-6"
          >
            <p className="text-base leading-7 text-zinc-300">{profile.summary}</p>
            <p className="mt-5 text-base leading-7 text-zinc-400">
              My work spans voice AI, LLM orchestration, computer vision,
              healthcare ML, and MLOps. I focus on the practical layer — latency,
              reliability, clear interfaces, and systems that feel useful from the first interaction.
            </p>
          </motion.div>

          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5"
            >
              <GraduationCap className="mb-3 h-8 w-8 text-zinc-500" />
              <h3 className="mb-1 text-lg font-semibold text-zinc-200">Education</h3>
              <p className="text-sm text-zinc-300">{profile.education.degree}</p>
              <p className="text-sm text-zinc-500">{profile.education.school}</p>
              <p className="mt-2 text-base font-semibold text-amber-300/80">{profile.education.score}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5"
            >
              <Award className="mb-3 h-8 w-8 text-zinc-500" />
              <h3 className="mb-1 text-lg font-semibold text-zinc-200">Top Signal</h3>
              <p className="text-sm text-zinc-300">GATE 2025 — Data Science & AI</p>
              <p className="mt-2 text-base font-semibold text-amber-300/80">AIR 5246 · Top 9%</p>
            </motion.div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-zinc-100">Technical Stack</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(profile.skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5"
              >
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-300/70">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-300"
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
          <h2 className="mb-6 text-2xl font-bold text-zinc-100">Achievements</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {profile.achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5"
              >
                {index < 2 ? (
                  <Trophy className="mb-3 h-6 w-6 text-amber-400/50" />
                ) : (
                  <Users className="mb-3 h-6 w-6 text-zinc-500" />
                )}
                <p className="text-sm leading-6 text-zinc-400">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
