import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/profile';

export default function Footer() {
  const links = [
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
    { icon: Linkedin, href: profile.links.linkedin, label: 'LinkedIn' },
    { icon: Github, href: profile.links.github, label: 'GitHub' },
    { icon: Instagram, href: profile.links.instagram, label: 'Instagram' },
  ];

  return (
    <footer className="relative z-10 mt-20 border-t border-white/5 bg-cosmos-950/60 backdrop-blur-xl" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-display text-xl font-semibold">
              <span className="gradient-text">{profile.name}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{profile.title}</p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neon-cyan/70">// signal</p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Available for AI Engineer roles, agentic systems consulting,
              and high-leverage RAG / LLMOps projects.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neon-magenta/80">// channels</p>
            <div className="mt-3 flex gap-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer noopener"
                  className="rounded-full border border-white/10 bg-white/[0.03] p-2.5 text-zinc-400 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
                  aria-label={l.label}
                  data-testid={`footer-${l.label.toLowerCase()}`}
                >
                  <l.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-[11px] font-mono text-zinc-500 md:flex-row">
          <p>© 2026 {profile.name} · Built with Next.js + R3F + Tailwind</p>
          <p>
            <span className="text-neon-cyan/70">◢</span> system online · neural link stable
          </p>
        </div>
      </div>
    </footer>
  );
}
