import { Github, Instagram, Linkedin, Mail, Workflow } from 'lucide-react';
import { profile } from '@/data/profile';

export default function Footer() {
  const socialLinks = [
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
    { icon: Instagram, href: profile.links.instagram, label: 'Instagram' },
    { icon: Linkedin, href: profile.links.linkedin, label: 'LinkedIn' },
    { icon: Github, href: profile.links.github, label: 'GitHub' },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-2xl font-black gradient-text">{profile.name}</h3>
            <p className="text-slate-400">{profile.title}</p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-cyan-300">Navigate</h4>
            <ul className="space-y-2">
              {[
                ['About', '/about'],
                ['Projects', '/projects'],
                ['Experience', '/experience'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-slate-400 transition hover:text-cyan-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-cyan-300">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="rounded-lg border border-slate-800 p-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-200"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-400 md:flex-row">
          <p>Copyright 2026 {profile.name}. Built with Next.js and Tailwind CSS.</p>
          <p className="flex items-center gap-2">
            <Workflow className="h-4 w-4 text-emerald-300" />
            Resume and LinkedIn content sync through CI/CD.
          </p>
        </div>
      </div>
    </footer>
  );
}
