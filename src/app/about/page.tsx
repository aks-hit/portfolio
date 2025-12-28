'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Trophy, Users } from 'lucide-react';
import Section from '@/components/Section';

export default function About() {
  const achievements = [
    "Qualified GATE 2025 – Data Science & AI (DA) with AIR 5246 out of 57,054 candidates (Top 9% nationwide)",
    "Qualified GATE 2025 – Computer Science (CS) with AIR 20150 out of 1,70,825 candidates (Top 12% nationwide)",
    "Led a team to a top 10 finish in the HackHeritage '23 hackathon",
    "Led the basketball team to win three championships at the annual college fest",
    "Contributed to community service as a Public Relations team member in the Rotaract Club"
  ];

  const skills = {
    "Programming Languages": ["Python", "SQL", "C/C++"],
    "Libraries & Frameworks": ["Pipecat", "FastAPI", "NumPy", "Pandas", "TensorFlow", "PyTorch", "OpenAI", "Matplotlib", "Scikit-learn"],
    "Tools & Platforms": ["Oracle Cloud", "AWS", "Docker", "Deepgram", "Twilio", "Linux", "Gradio", "Streamlit", "Git/GitHub"],
    "Certifications": ["OCI Data Science Professional", "OCI Generative AI Professional", "Machine Learning Specialization", "Google CyberSecurity Professional"]
  };

  return (
    <div className="pt-20">
      <Section title="About Me">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-slate-300 leading-relaxed">
              I'm a passionate AI Developer and Machine Learning Engineer with a strong foundation in computer science and a proven track record of building intelligent systems. Completed my B.Tech in Computer Science Engineering at Heritage Institute of Technology, Kolkata with a CGPA of 8.68/10.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              My expertise lies in developing AI-powered solutions, from real-time voice agents to deep learning models for healthcare applications. I've successfully reduced manual workloads by up to 90% through innovative automation and optimized system performance by 70-80% through strategic improvements.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              I'm passionate about leveraging cutting-edge AI technologies to solve real-world problems and create meaningful impact. My work spans across natural language processing, computer vision, and MLOps, with a focus on building scalable and efficient solutions.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-effect p-6 rounded-xl card-hover"
            >
              <GraduationCap className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Education</h3>
              <p className="text-slate-300 text-lg mb-1">B.Tech in Computer Science Engineering</p>
              <p className="text-slate-400">Heritage Institute of Technology, Kolkata</p>
              <p className="text-cyan-400 font-bold text-xl mt-2">CGPA: 8.68/10</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-effect p-6 rounded-xl card-hover"
            >
              <Award className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Top Achievement</h3>
              <p className="text-slate-300 text-lg">GATE 2025 Qualified (DA)</p>
              <p className="text-purple-400 font-bold text-xl mt-2">AIR 5246 - Top 9%</p>
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect p-6 rounded-xl card-hover"
              >
                <h3 className="text-xl font-bold mb-4 text-cyan-400">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-slate-800/50 rounded-lg text-sm hover:bg-cyan-500/20 hover:text-cyan-400 transition-all cursor-default border border-slate-700 hover:border-cyan-500/50"
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
            <h2 className="text-4xl font-bold mb-8 text-center gradient-text">
                Achievements & Recognition
            </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect p-6 rounded-xl card-hover"
              >
                {index < 2 ? (
                  <Trophy className="w-8 h-8 text-yellow-400 mb-3" />
                ) : (
                  <Users className="w-8 h-8 text-cyan-400 mb-3" />
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

