'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Briefcase,
  CalendarClock,
  ChevronDown,
  Code2,
  Cpu,
  GitBranch,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  Terminal,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import { profile } from '@/data/profile';

const InteractiveBrain = dynamic(() => import('@/components/AIBrain'), { ssr: false });

/* ── Typewriter placeholder ── */
const placeholders = [
  'What has Akshit shipped?',
  'Tell me about the lease pipeline',
  'What is his tech stack?',
  'Explain the voice agent project',
  'Why should I hire Akshit?',
];

function useTypewriter(words: string[], typing = 60, deleting = 35, pause = 2000) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[idx];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(cur.slice(0, text.length + 1));
          if (text.length + 1 === cur.length) setTimeout(() => setDel(true), pause);
        } else {
          setText(cur.slice(0, text.length - 1));
          if (text.length === 0) {
            setDel(false);
            setIdx((p) => (p + 1) % words.length);
          }
        }
      },
      del ? deleting : typing
    );
    return () => clearTimeout(t);
  }, [text, del, idx, words, typing, deleting, pause]);
  return text;
}

const projectIcons = [Zap, Bot, Cpu, GitBranch, Code2, Sparkles];

type ChatMessage = { role: 'user' | 'bot'; text: string };

export default function Hero() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: "Hey 👋 I'm Akshit's neural assistant. Ask anything — projects, stack, hiring fit." },
  ]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [lockedRegionId, setLockedRegionId] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const typedPlaceholder = useTypewriter(placeholders);

  const featured = profile.projects.slice(0, 3);
  const latest = profile.experiences[0];

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isAnswering]);

  async function handleAsk(prompt: string) {
    const q = prompt.trim();
    if (!q || isAnswering) return;
    setMessages((p) => [...p, { role: 'user', text: q }]);
    setIsAnswering(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: 'bot', text: data.answer || data.error || 'Something went wrong.' }]);
    } catch {
      setMessages((p) => [...p, { role: 'bot', text: "Sorry, I'm having trouble connecting. Try again later." }]);
    } finally {
      setIsAnswering(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleAsk(question);
    setQuestion('');
  }

  return (
    <div className="relative">
      {/* ══════════════════════════════════════════════════════════════
            HERO — the brain IS the hero
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100svh] overflow-hidden px-4 pt-24 pb-12"
        data-testid="hero-section"
      >
        {/* Top-left identity strip */}
        <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-start gap-2 pt-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur"
          >
            <span className="glow-dot" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-300">
              {profile.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display mt-3 text-[clamp(2.6rem,7vw,5.6rem)] font-bold leading-[0.95] tracking-tight"
          >
            <span className="block text-white/95">{profile.name.split(' ')[0]}</span>
            <span className="block gradient-text">{profile.name.split(' ').slice(1).join(' ')}</span>
          </motion.h1>
        </div>

        {/* Brain — the hero element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="relative z-10 -mt-6 sm:-mt-12"
          data-testid="hero-brain-wrapper"
        >
          <InteractiveBrain
            activeId={lockedRegionId}
            onSelect={setLockedRegionId}
            voiceEnabled={voiceEnabled}
          />

          {/* Voice toggle — floats in top-right of brain */}
          <button
            onClick={() => {
              if (voiceEnabled && typeof window !== 'undefined') window.speechSynthesis?.cancel();
              setVoiceEnabled((v) => !v);
            }}
            data-testid="voice-toggle-btn"
            className={`absolute right-5 top-16 z-20 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur transition ${
              voiceEnabled
                ? 'border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan'
                : 'border-white/15 bg-white/[0.04] text-zinc-400 hover:text-zinc-200'
            }`}
            aria-label="Toggle voice narration"
          >
            {voiceEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
            <span>{voiceEnabled ? 'voice on' : 'voice'}</span>
          </button>
        </motion.div>

        {/* Bottom overlay — tagline + ticker + CTAs (sits below brain) */}
        <div className="relative z-20 mx-auto -mt-6 max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display max-w-2xl text-2xl font-medium leading-snug text-zinc-200 sm:text-3xl"
          >
            ships <span className="gradient-amber font-semibold">production AI</span>, 0→1.
            <span className="block text-base font-normal leading-7 text-zinc-400 sm:text-lg">
              {profile.summary}
            </span>
          </motion.p>

          {/* Live metrics ticker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4"
            data-testid="hero-ticker"
          >
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur"
              >
                <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{s.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={`mailto:${profile.email}`}
              data-testid="hero-cta-contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta px-6 py-3 text-sm font-semibold text-cosmos-950 shadow-lg shadow-neon-violet/30 transition hover:shadow-neon-magenta/50"
            >
              <Mail className="h-4 w-4" />
              Hire me
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://cal.com/akshit-singh"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-cta-book"
              className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/[0.05] px-6 py-3 text-sm font-semibold text-neon-cyan backdrop-blur transition hover:bg-neon-cyan/10"
            >
              <CalendarClock className="h-4 w-4" />
              Book a 15-min call
            </a>
            <Link
              href="/projects"
              data-testid="hero-cta-work"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-200 backdrop-blur transition hover:border-neon-cyan/40 hover:text-neon-cyan"
            >
              <Code2 className="h-4 w-4" />
              View work
            </Link>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-linkedin"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-github"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-neon-magenta/40 hover:text-neon-magenta"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>

            <div className="ml-auto hidden items-center gap-3 font-mono text-xs text-zinc-500 sm:flex">
              <Terminal className="h-3.5 w-3.5 text-neon-cyan/70" />
              <span className="text-neon-cyan/80">~/role</span>
              <span className="text-zinc-600">→</span>
              <span className="text-zinc-300">
                {latest.role} <span className="text-zinc-500">@</span> {latest.company}
              </span>
            </div>
          </motion.div>

          {/* Lobe pill index — pick a lobe to scan */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              pick a lobe to scan ↓
            </span>
            {profile.brainRegions.map((r) => (
              <button
                key={r.id}
                onClick={() => setLockedRegionId(r.id === lockedRegionId ? null : r.id)}
                data-testid={`brain-region-tab-${r.id}`}
                className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
                  r.id === lockedRegionId
                    ? 'border-white/30 text-white'
                    : 'border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                }`}
                style={
                  r.id === lockedRegionId
                    ? { color: r.color, borderColor: `${r.color}66` }
                    : undefined
                }
              >
                {r.label}
              </button>
            ))}
          </motion.div>

          {/* Mobile region card */}
          <AnimatePresence mode="wait">
            {lockedRegionId &&
              (() => {
                const r = profile.brainRegions.find((x) => x.id === lockedRegionId);
                if (!r) return null;
                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-cosmos-900/70 p-5 backdrop-blur-md lg:hidden"
                    style={{
                      boxShadow: `0 0 0 1px ${r.color}33, 0 18px 50px -25px ${r.color}66`,
                    }}
                    data-testid={`brain-region-panel-${r.id}`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: r.color, boxShadow: `0 0 12px ${r.color}` }} />
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: r.color }}>
                        {r.label}
                      </p>
                      {(r as any).isBasketball && <span className="ml-auto">🏀</span>}
                      <button
                        onClick={() => setLockedRegionId(null)}
                        className="ml-auto rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase text-zinc-400"
                      >
                        close
                      </button>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">{r.subtitle}</h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-zinc-300">
                      {r.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: r.color }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })()}
          </AnimatePresence>

          <div className="mt-10 hidden items-center justify-center font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600 sm:flex">
            <ChevronDown className="mr-2 h-3 w-3 animate-bounce" />
            scroll · missions · projects · signals
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
            EXPERIENCE PREVIEW
         ══════════════════════════════════════════════════════════════ */}
      <section className="px-4 pb-24 pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="terminal-prefix font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                experience.timeline
              </p>
              <h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">
                <span className="text-white">Recent </span>
                <span className="gradient-text">missions</span>
              </h2>
            </div>
            <Link
              href="/experience"
              className="hidden items-center gap-1.5 font-mono text-xs text-zinc-400 transition hover:text-neon-cyan sm:inline-flex"
              data-testid="link-view-experience"
            >
              view all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {profile.experiences.map((exp, i) => {
              const glow = ['from-neon-cyan/20', 'from-neon-violet/20', 'from-neon-amber/20'][i] || 'from-neon-cyan/20';
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="neon-card glass relative rounded-3xl p-6"
                >
                  <div className={`pointer-events-none absolute -top-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-b ${glow} to-transparent blur-2xl`} />
                  <div className="relative flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-neon-cyan/80" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="relative mt-3 font-display text-xl font-semibold text-white">{exp.role}</h3>
                  <p className="relative mt-1 text-sm text-neon-cyan/80">{exp.company}</p>
                  <p className="relative mt-4 text-sm leading-6 text-zinc-400">{exp.points[0]}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
            FEATURED PROJECTS
         ══════════════════════════════════════════════════════════════ */}
      <section className="px-4 pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="terminal-prefix font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                projects.featured
              </p>
              <h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">
                <span className="text-white">Shipped & </span>
                <span className="gradient-amber">measurable</span>
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden items-center gap-1.5 font-mono text-xs text-zinc-400 transition hover:text-neon-magenta sm:inline-flex"
              data-testid="link-view-projects"
            >
              all projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featured.map((project, index) => {
              const Icon = projectIcons[index] || Code2;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="neon-card glass group relative rounded-3xl p-6"
                  data-testid={`featured-project-${index}`}
                >
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${project.gradient} text-white shadow-lg shadow-black/30`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{project.highlights}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
            BASKETBALL STRIP — court line aesthetic + championship badge
         ══════════════════════════════════════════════════════════════ */}
      <section className="px-4 pb-24" data-testid="basketball-strip">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-neon-amber/25 bg-gradient-to-br from-orange-950/40 via-cosmos-900/40 to-cosmos-900/80 px-8 py-10 backdrop-blur md:px-12 md:py-14"
        >
          {/* basketball court key lines */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-amber/15" />
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-amber/12" />
            <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-neon-amber/20 to-transparent" />
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-neon-amber/20 to-transparent" />
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-neon-amber/15 blur-3xl" />
          </div>

          <div className="relative grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neon-amber/30 bg-neon-amber/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-amber">
                <span>🏀</span>
                <span>cerebellum.signal</span>
              </div>
              <h3 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                The cerebellum runs<br />
                <span className="bg-gradient-to-r from-neon-amber via-orange-400 to-neon-magenta bg-clip-text text-transparent">
                  the same playbook
                </span>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-zinc-300">
                Captained college basketball to <strong className="text-neon-amber">3 consecutive inter-college championships</strong>.
                The instincts that read a defensive press also read an ambiguous problem statement — call the play, ship the win.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-neon-amber/20 bg-cosmos-950/40 p-5 backdrop-blur">
                <p className="font-display text-3xl font-bold text-neon-amber">3</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">championships</p>
              </div>
              <div className="rounded-2xl border border-neon-amber/20 bg-cosmos-950/40 p-5 backdrop-blur">
                <p className="font-display text-3xl font-bold text-neon-amber">PG</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">captain / lead</p>
              </div>
              <div className="rounded-2xl border border-neon-amber/20 bg-cosmos-950/40 p-5 backdrop-blur">
                <p className="font-display text-3xl font-bold text-neon-amber">∞</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">team flow</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
            GITHUB STATS — free github-readme-stats widget (no auth needed)
         ══════════════════════════════════════════════════════════════ */}
      <section className="px-4 pb-24" data-testid="github-stats-section">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="terminal-prefix font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
              github.signal
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">
              <span className="text-white">Code </span>
              <span className="gradient-text">in motion</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-5 lg:grid-cols-[1fr_1.3fr]"
          >
            <div className="neon-card glass overflow-hidden rounded-3xl p-3">
              {/* GitHub stats card */}
              <img
                src="https://github-readme-stats.vercel.app/api?username=aks-hit&theme=transparent&hide_border=true&bg_color=00000000&title_color=22e4ff&icon_color=ff2bd6&text_color=cfd6ff&include_all_commits=true&count_private=true"
                alt="GitHub stats for aks-hit"
                loading="lazy"
                className="w-full"
                data-testid="github-stats-card"
              />
            </div>
            <div className="neon-card glass overflow-hidden rounded-3xl p-3">
              {/* Top languages */}
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=aks-hit&layout=compact&theme=transparent&hide_border=true&bg_color=00000000&title_color=9d4edd&text_color=cfd6ff&langs_count=8"
                alt="Top languages used by aks-hit"
                loading="lazy"
                className="w-full"
                data-testid="github-langs-card"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-5 neon-card glass overflow-hidden rounded-3xl p-3"
          >
            {/* Contribution streak */}
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=aks-hit&theme=transparent&hide_border=true&background=00000000&stroke=22e4ff&ring=ff2bd6&fire=ffb547&currStreakNum=cfd6ff&sideNums=cfd6ff&currStreakLabel=22e4ff&sideLabels=9d4edd&dates=cfd6ff"
              alt="GitHub streak"
              loading="lazy"
              className="w-full"
              data-testid="github-streak-card"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
            CTA STRIP
         ══════════════════════════════════════════════════════════════ */}
      <section className="px-4 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cosmos-800/60 via-cosmos-900/40 to-cosmos-900/80 px-8 py-12 backdrop-blur md:px-14 md:py-16"
          data-testid="cta-strip"
        >
          <div className="mesh-grid absolute inset-0 opacity-40" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-neon-violet/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-neon-cyan/20 blur-3xl" />

          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neon-cyan/80">// initiate transmission</p>
              <h3 className="font-display mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Got a hard AI problem? <br />
                <span className="gradient-text">Let's ship it together.</span>
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
                Open to AI Engineer roles, agentic systems consulting, and high-leverage
                RAG / LLMOps engagements. Fast replies, clean code, measurable outcomes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <a
                href={`mailto:${profile.email}`}
                data-testid="cta-strip-email"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-cosmos-950 transition hover:bg-zinc-100"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
              <a
                href="https://cal.com/akshit-singh"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-strip-book"
                className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/[0.06] px-5 py-3 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/10"
              >
                <CalendarClock className="h-4 w-4" />
                Book 15-min
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
                data-testid="cta-strip-contact"
              >
                Contact
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
            FLOATING CHAT
         ══════════════════════════════════════════════════════════════ */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-24 right-6 z-50 flex max-h-[540px] w-[380px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-cosmos-900/95 shadow-2xl backdrop-blur-xl"
          data-testid="chat-panel"
        >
          <div className="flex items-center gap-3 border-b border-white/5 p-4">
            <div className="relative">
              <div className="h-9 w-9 overflow-hidden rounded-full border border-neon-cyan/40">
                <Image src="/images/profile.png" alt="Akshit Bot" width={36} height={36} className="object-cover" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-cosmos-900" />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold text-white">Akshit · Neural Bot</p>
              <p className="font-mono text-[10px] text-emerald-400/80">online · ask anything</p>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-white/[0.06] hover:text-zinc-200"
              data-testid="chat-close-btn"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={chatRef} className="max-h-[340px] flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((m, i) =>
              m.role === 'bot' ? (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-start gap-2.5">
                  <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full border border-white/10">
                    <Image src="/images/profile.png" alt="Akshit" width={24} height={24} className="object-cover" />
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
                    <p className="text-sm leading-6 text-zinc-200">{m.text}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm border border-neon-cyan/30 bg-gradient-to-br from-neon-cyan/10 to-neon-violet/10 px-3.5 py-2.5">
                    <p className="text-sm text-white">{m.text}</p>
                  </div>
                </motion.div>
              )
            )}
            {isAnswering && (
              <div className="flex items-start gap-2.5">
                <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full border border-white/10">
                  <Image src="/images/profile.png" alt="Akshit" width={24} height={24} className="object-cover" />
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-neon-violet" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-neon-magenta" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {['Lease pipeline?', 'RAG metrics?', 'Voice agent?', 'Basketball?', 'Why hire?'].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => { setQuestion(''); handleAsk(q); }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
                  data-testid={`chat-suggested-${q}`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="border-t border-white/5 p-4 pt-2">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 transition focus-within:border-neon-cyan/50">
              <input
                ref={inputRef}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={typedPlaceholder + '|'}
                className="min-w-0 flex-1 bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
                data-testid="chat-input"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-violet p-2 text-cosmos-950 transition hover:shadow-lg hover:shadow-neon-violet/40"
                aria-label="Ask"
                data-testid="chat-submit-btn"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        data-testid="chat-toggle-btn"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-magenta text-cosmos-950 shadow-lg shadow-neon-violet/40 transition hover:scale-110"
        aria-label="Chat with Akshit Bot"
      >
        {isChatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
