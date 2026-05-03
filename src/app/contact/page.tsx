'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import Section from '@/components/Section';
import MagneticButton from '@/components/MagneticButton';
import { profile } from '@/data/profile';

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      accent: 'text-cyan-300',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'akshit-singh-007',
      href: profile.links.linkedin,
      accent: 'text-blue-300',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'aks-hit',
      href: profile.links.github,
      accent: 'text-amber-300',
    },
  ];

  return (
    <div className="pt-20">
      <Section title="Contact">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <p className="text-xl text-slate-300">
              Send a mission brief, collaboration idea, AI role, or project problem.
              The fastest path is email.
            </p>
          </motion.div>

          <div className="mb-12 grid gap-5 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 transition hover:-translate-y-1 hover:border-cyan-400/60"
              >
                <method.icon className={`mb-5 h-7 w-7 ${method.accent}`} />
                <p className="mb-1 text-sm text-slate-400">{method.label}</p>
                <p className="break-words font-semibold text-slate-200">{method.value}</p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="text-center"
          >
            <MagneticButton>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-8 py-4 text-lg font-bold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-300"
              >
                <Send className="h-5 w-5" />
                Send mission brief
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
