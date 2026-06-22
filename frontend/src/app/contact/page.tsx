'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send, MapPin, Phone } from 'lucide-react';
import Section from '@/components/Section';
import MagneticButton from '@/components/MagneticButton';
import { profile } from '@/data/profile';

export default function Contact() {
  const contactMethods = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, iconClass: 'text-neon-cyan', glowClass: 'bg-neon-cyan/25' },
    { icon: Linkedin, label: 'LinkedIn', value: 'akshit-singh-007', href: profile.links.linkedin, iconClass: 'text-neon-violet', glowClass: 'bg-neon-violet/25' },
    { icon: Github, label: 'GitHub', value: 'aks-hit', href: profile.links.github, iconClass: 'text-neon-magenta', glowClass: 'bg-neon-magenta/25' },
  ];

  return (
    <div className="pt-20" data-testid="contact-page">
      <Section
        kicker="contact.channel"
        title="Let's build something real."
        subtitle="Roles, collaborations, or hard AI problems — the fastest channel is email. I usually reply within a day."
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 grid gap-5 md:grid-cols-3">
            {contactMethods.map((m, i) => (
              <motion.a
                key={m.label}
                href={m.href}
                target={m.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="neon-card glass group relative overflow-hidden rounded-3xl p-6"
                data-testid={`contact-method-${m.label.toLowerCase()}`}
              >
                <div className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full ${m.glowClass} blur-2xl`} />
                <m.icon className={`relative mb-5 h-6 w-6 ${m.iconClass}`} />
                <p className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">{m.label}</p>
                <p className="relative mt-2 break-words text-sm font-medium text-white">{m.value}</p>
                <p className="relative mt-3 text-[11px] text-zinc-500 transition group-hover:text-zinc-300">
                  open →
                </p>
              </motion.a>
            ))}
          </div>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="neon-card glass mb-10 rounded-3xl p-6"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-neon-cyan" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Location</p>
                  <p className="mt-1 text-sm text-zinc-200">{profile.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 shrink-0 text-neon-violet" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Phone</p>
                  <p className="mt-1 text-sm text-zinc-200">{profile.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-3 w-3 shrink-0 animate-pulse rounded-full bg-emerald-400" style={{ boxShadow: '0 0 10px #34d399' }} />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Status</p>
                  <p className="mt-1 text-sm text-zinc-200">Open to opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <MagneticButton>
              <a
                href={`mailto:${profile.email}`}
                data-testid="contact-cta-send"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta px-8 py-3.5 text-sm font-semibold text-cosmos-950 shadow-lg shadow-neon-violet/30 transition hover:shadow-neon-magenta/50"
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
