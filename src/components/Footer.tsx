import { Mail, Instagram, Linkedin, Github, Heart } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Mail, href: 'mailto:akshitsinghak@yahoo.com', label: 'Email' },
    { icon: Instagram, href: 'https://www.instagram.com/akshit.singh.7/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/in/akshit-singh-007', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/aks-hit', label: 'GitHub' },
  ];

  return (
    <footer className="glass-effect border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Akshit Singh</h3>
            <p className="text-slate-400">
              AI Developer & Machine Learning Engineer passionate about building intelligent systems.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="/projects" className="text-slate-400 hover:text-cyan-400 transition-colors">Projects</a></li>
              <li><a href="/experience" className="text-slate-400 hover:text-cyan-400 transition-colors">Experience</a></li>
              <li><a href="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-400">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2 glass-effect rounded-lg hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all group"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-slate-400">
          <p className="flex items-center justify-center gap-2">
            © 2025 Akshit Singh. Built with <Heart className="w-4 h-4 text-red-500" /> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}