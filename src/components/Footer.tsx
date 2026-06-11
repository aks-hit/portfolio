import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/profile';

export default function Footer() {
  const socialLinks = [
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
    { icon: Linkedin, href: profile.links.linkedin, label: 'LinkedIn' },
    { icon: Github, href: profile.links.github, label: 'GitHub' },
    { icon: Instagram, href: profile.links.instagram, label: 'Instagram' },
  ];

  return (
    <footer className="border-t border-zinc-800/60">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="font-medium text-zinc-300">{profile.name}</p>
            <p className="mt-1 text-sm text-zinc-500">{profile.title}</p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="rounded-md border border-zinc-800 p-2 text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-zinc-800/40 pt-6 text-xs text-zinc-600 md:flex-row">
          <p>© 2026 {profile.name}. Built with Next.js & Tailwind CSS.</p>
          <p className="font-mono text-zinc-700">
            <span className="text-amber-400/50">$</span> auto-deployed via Vercel from main
          </p>
        </div>
      </div>
    </footer>
  );
}
