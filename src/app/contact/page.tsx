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
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'akshit-singh-007',
      href: profile.links.linkedin,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'aks-hit',
      href: profile.links.github,
    },
  ];

  return (
    <div className="pt-20">
      <Section title="Contact">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-base text-zinc-400"
          >
            Have a project, collaboration idea, or AI role in mind? 
            The fastest way to reach me is email.
          </motion.p>

          <div className="mb-10 grid gap-4 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 transition hover:border-zinc-700"
              >
                <method.icon className="mb-4 h-5 w-5 text-zinc-500" />
                <p className="mb-1 text-xs text-zinc-500">{method.label}</p>
                <p className="break-words text-sm font-medium text-zinc-300">{method.value}</p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
          >
            <MagneticButton>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-white"
              >
                <Send className="h-4 w-4" />
                Send a message
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
