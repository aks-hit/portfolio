'use client';

import { motion } from 'framer-motion';
import { Award, GraduationCap, Trophy, Users } from 'lucide-react';
import Section from '@/components/Section';
import { profile } from '@/data/profile';

export default function About() {
  return (
    <div className="pt-20">
      <Section title="About Akshit">
        <div className="mb-20 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-slate-800 bg-slate-950/70 p-7"
          >
            <p className="text-lg leading-8 text-slate-300">{profile.summary}</p>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              My work lives across voice AI, LLM orchestration, computer vision,
              healthcare ML, and MLOps. I care about the practical layer: latency,
              reliability, clear interfaces, and systems that feel useful the first time
              someone touches them.
            </p>
          </motion.div>

          <div className="grid gap-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-6"
            >
              <GraduationCap className="mb-4 h-10 w-10 text-cyan-300" />
              <h3 className="mb-2 text-2xl font-bold">Education</h3>
              <p className="text-lg text-slate-300">{profile.education.degree}</p>
              <p className="text-slate-400">{profile.education.school}</p>
              <p className="mt-2 text-xl font-bold text-emerald-300">{profile.education.score}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-6"
            >
              <Award className="mb-4 h-10 w-10 text-amber-300" />
              <h3 className="mb-2 text-2xl font-bold">Top Signal</h3>
              <p className="text-lg text-slate-300">GATE 2025 Qualified in Data Science & AI</p>
              <p className="mt-2 text-xl font-bold text-amber-300">AIR 5246 - Top 9%</p>
            </motion.div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="mb-8 text-center text-4xl font-bold gradient-text">Technical Stack</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(profile.skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-xl border border-slate-800 bg-slate-950/70 p-6"
              >
                <h3 className="mb-4 text-xl font-bold text-cyan-300">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="achievements" className="scroll-mt-28">
          <h2 className="mb-8 text-center text-4xl font-bold gradient-text">
            Achievements & Recognition
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {profile.achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-xl border border-slate-800 bg-slate-950/70 p-6"
              >
                {index < 2 ? (
                  <Trophy className="mb-3 h-8 w-8 text-amber-300" />
                ) : (
                  <Users className="mb-3 h-8 w-8 text-emerald-300" />
                )}
                <p className="text-slate-300">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
