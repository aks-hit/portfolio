'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/5 bg-cosmos-900/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="group flex items-center gap-3" data-testid="logo-link">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon-violet/30 to-neon-cyan/30 ring-1 ring-white/10">
              <Sparkles className="h-4 w-4 text-neon-cyan" />
              <span className="absolute inset-0 rounded-xl bg-neon-violet/0 blur-md transition group-hover:bg-neon-violet/40" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              akshit<span className="gradient-text">.ai</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  data-testid={`nav-link-${item.name.toLowerCase()}`}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    active ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}

            <div className="mx-3 h-5 w-px bg-white/10" />

            <button
              onClick={toggleTheme}
              data-testid="theme-toggle-btn"
              className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-zinc-400 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full border border-white/10 p-2 text-zinc-400"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              data-testid="mobile-menu-toggle"
              className="rounded-full border border-white/10 p-2 text-zinc-300"
              aria-label="Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-cosmos-900/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm transition-colors ${
                    pathname === item.path
                      ? 'bg-white/[0.06] text-neon-cyan'
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
