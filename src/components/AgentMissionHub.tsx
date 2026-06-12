'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  Code2,
  Cpu,
  GitBranch,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Search,
  Send,
  Sparkles,
  Terminal,
  X,
  Zap,
} from 'lucide-react';
import { profile } from '@/data/profile';
import MagneticButton from '@/components/MagneticButton';

/* ── Typewriter placeholder suggestions ── */
const placeholders = [
  'What has Akshit shipped?',
  'Tell me about his RAG experience',
  'What is his tech stack?',
  'Explain the voice agent project',
  'Why should I hire Akshit?',
  'What Azure services does he use?',
  'What are his top skills?',
];

/* ── Knowledge base for answering questions ── */
function getAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('skill') || q.includes('ats') || q.includes('keyword') || q.includes('tech stack') || q.includes('stack')) {
    return 'Core stack: Agentic AI, RAG, LLMOps, Azure AI Foundry, PromptFlow, MCP, LangChain, LangGraph, FastAPI, OpenAI, Gemini, Docker, GitHub Actions. Strong across the full AI product lifecycle — from retrieval to deployment.';
  }
  if (q.includes('rag') || q.includes('retrieval') || q.includes('vector')) {
    return 'Akshit has production RAG experience: document ETL with Azure Document Intelligence, vector retrieval, MCP-backed agent architectures, PromptFlow orchestration, structured extraction, and LLM-as-a-Judge validation. End-to-end, not just prompts.';
  }
  if (q.includes('mcp') || q.includes('model context')) {
    return 'MCP gives agents a clean interface to tools and context providers. Akshit has instrumented RAG pipelines with MCP servers/clients across 4+ integrated services — a strong signal for agentic AI roles.';
  }
  if (q.includes('voice') || q.includes('speech') || q.includes('twilio') || q.includes('deepgram')) {
    return 'Built a bilingual voice agent with Twilio, Deepgram, OpenAI, SQLite & FastAPI. Sub-2s latency, concurrent call handling, sentiment-aware responses. Also built ASR-to-evaluation workflows with Azure STT/TTS.';
  }
  if (q.includes('azure') || q.includes('cloud') || q.includes('promptflow')) {
    return `Current role at ${profile.experiences[0].company}: ${profile.experiences[0].points[0]}`;
  }
  if (q.includes('outreach') || q.includes('cold email') || q.includes('pipeline')) {
    return 'Built an autonomous cold outreach agent powered by Google Gemini — scores leads, drafts personalized emails, auto-applies to LinkedIn jobs via Playwright, and syncs with Google Sheets CRM. Features waterfall contact discovery across Apollo, Snov, and Hunter APIs.';
  }
  if (q.includes('project') || q.includes('shipped') || q.includes('built') || q.includes('impact')) {
    return `Top projects: ${profile.projects.slice(0, 3).map(p => p.title).join(', ')}. Each has measurable outcomes — latency reduction, automation gains, and deployment-ready architectures.`;
  }
  if (q.includes('hire') || q.includes('why') || q.includes('pitch') || q.includes('summary')) {
    return 'AI Engineer who ships production systems, not demos. Azure AI Foundry + PromptFlow + RAG + MCP + FastAPI + real-time speech, backed by quantified impact and GATE/OCI validation. Builds things that work at scale.';
  }
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('role')) {
    return `Currently an AI Engineer at ${profile.experiences[0].company}. Previously interned at ${profile.experiences[1].company} building AI interview platforms. Research intern at ${profile.experiences[2].company} working on sleep stage classification with deep learning.`;
  }
  if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('gate')) {
    return `${profile.education.degree} from ${profile.education.school} (${profile.education.score}). GATE 2025 Data Science & AI — AIR 5246, top 9% nationwide.`;
  }

  return profile.summary;
}

/* ── Typewriter hook ── */
function useTypewriter(words: string[], typingSpeed = 60, deletingSpeed = 35, pauseTime = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentWord.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

const projectIcons = [Zap, Bot, Cpu, GitBranch, Code2, Sparkles];

type ChatMessage = { role: 'user' | 'bot'; text: string };

export default function Hero() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: "Hey! 👋 I'm Akshit's AI assistant. Ask me about his skills, projects, experience, or why you should hire him!" }
  ]);
  const [isAnswering, setIsAnswering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const typedPlaceholder = useTypewriter(placeholders);

  const featuredProjects = profile.projects.slice(0, 3);
  const latestExperience = profile.experiences[0];

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isAnswering]);

  async function handleAsk(promptText: string) {
    const trimmed = promptText.trim();
    if (!trimmed || isAnswering) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setIsAnswering(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.answer || data.error || 'Something went wrong.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsAnswering(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleAsk(question);
    setQuestion('');
  }

  function handleClear() {
    setQuestion('');
    inputRef.current?.focus();
  }

  return (
    <div className="relative">
      {/* ── Hero Section ── */}
      <section className="px-4 pt-28 pb-16">
        <div className="mx-auto max-w-6xl">
          {/* Terminal badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs font-mono text-zinc-400"
          >
            <Terminal className="h-3 w-3 text-amber-400/70" />
            {profile.badge}
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left — Content */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Heading */}
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-3 text-lg text-amber-300/80 font-medium sm:text-xl">
                {latestExperience.role} @ {latestExperience.company}
              </p>
              <p className="mt-1 text-sm text-zinc-500 font-mono">{latestExperience.period}</p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
                {profile.summary}
              </p>

              {/* Current role highlights */}
              <ul className="mt-5 space-y-2.5">
                {latestExperience.points.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-2.5 text-sm leading-6 text-zinc-400"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/50" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticButton>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-white"
                  >
                    <Mail className="h-4 w-4" />
                    Get in touch
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
                  >
                    <Code2 className="h-4 w-4" />
                    View work
                  </Link>
                </MagneticButton>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Right — Akshit Bot (sticky, compact) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden lg:block"
            >
              <div className="sticky top-28 flex flex-col rounded-2xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm p-5">
                {/* Bot header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-800/40 shrink-0">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-amber-400/30">
                      <Image
                        src="/images/profile.png"
                        alt="Akshit Bot"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-zinc-900" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">Akshit Bot</p>
                    <p className="text-xs text-emerald-400/80">Online • Ask me anything</p>
                  </div>
                  <Bot className="ml-auto h-5 w-5 text-amber-400/40" />
                </div>

                {/* Chat area — compact, scrollable */}
                <div ref={chatRef} className="space-y-4 overflow-y-auto mb-4 pr-1 max-h-[340px]">
                  {messages.map((msg, i) => (
                    msg.role === 'bot' ? (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="shrink-0 h-7 w-7 rounded-full overflow-hidden border border-zinc-700">
                          <Image src="/images/profile.png" alt="Akshit" width={28} height={28} className="object-cover" />
                        </div>
                        <div className="relative max-w-[85%]">
                          <div className="absolute -left-2 top-3 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-zinc-800/80" />
                          <div className="rounded-2xl rounded-tl-sm bg-zinc-800/80 border border-zinc-700/40 px-4 py-3">
                            <p className="text-sm leading-6 text-zinc-300">{msg.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-end"
                      >
                        <div className="relative max-w-[80%]">
                          <div className="absolute -right-2 top-3 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-amber-400/20" />
                          <div className="rounded-2xl rounded-tr-sm bg-amber-400/10 border border-amber-400/20 px-4 py-3">
                            <p className="text-sm text-zinc-200">{msg.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}

                  {/* Typing indicator */}
                  {isAnswering && (
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 h-7 w-7 rounded-full overflow-hidden border border-zinc-700">
                        <Image src="/images/profile.png" alt="Akshit" width={28} height={28} className="object-cover" />
                      </div>
                      <div className="rounded-2xl rounded-tl-sm bg-zinc-800/80 border border-zinc-700/40 px-4 py-3">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/40 px-4 py-2.5 transition focus-within:border-amber-400/30">
                    <input
                      ref={inputRef}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder={typedPlaceholder + '|'}
                      className="min-w-0 flex-1 bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
                    />
                    {question && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="shrink-0 text-zinc-600 hover:text-zinc-400 transition"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="shrink-0 rounded-lg bg-amber-400/15 p-2 text-amber-300 transition hover:bg-amber-400/25"
                      aria-label="Ask"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>

                {/* Suggested questions */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Skills?', 'Experience?', 'Projects?', 'Why hire?'].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => { setQuestion(''); handleAsk(q); }}
                      className="rounded-full border border-zinc-700/50 bg-zinc-800/30 px-3 py-1 text-xs text-zinc-500 transition hover:border-amber-400/30 hover:text-zinc-300"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile-only AMA bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 lg:hidden"
          >
            <form onSubmit={handleSubmit} className="agent-search-bar flex items-center gap-3 px-5 py-3">
              <Search className="h-4 w-4 shrink-0 text-zinc-500" />
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={typedPlaceholder + '|'}
                className="min-w-0 flex-1 bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-amber-400/10 p-2 text-amber-300 transition hover:bg-amber-400/20"
                aria-label="Ask"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            {(messages.length > 1 || isAnswering) && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm px-5 py-4"
              >
                {isAnswering ? (
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-400/60" />
                    Thinking...
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/50" />
                    <p className="text-sm leading-6 text-zinc-300">{messages[messages.length - 1]?.text}</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-5"
            >
              <p className="text-3xl font-bold text-zinc-100">{stat.value}</p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-zinc-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Experience Highlights ── */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="mb-2 text-xs font-mono font-medium uppercase tracking-widest text-zinc-500">
              <span className="text-amber-400/60">$</span> cat experience.log
            </p>
            <h2 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
              Experience
            </h2>
            <p className="mt-3 text-base text-zinc-400">
              Shipped 10+ enterprise workflows across agentic AI, RAG, LLM orchestration, and real-time speech systems.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {profile.experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-amber-400/50" />
                  <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">{exp.role}</h3>
                <p className="mt-1 text-sm text-zinc-400">{exp.company}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{exp.points[0]}</p>
              </motion.div>
            ))}
          </div>

          <Link
            href="/experience"
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-zinc-200"
          >
            View full experience
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-mono font-medium uppercase tracking-widest text-zinc-500">
                <span className="text-amber-400/60">$</span> ls projects/
              </p>
              <h2 className="text-3xl font-bold text-zinc-100 sm:text-4xl">
                Featured work
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-zinc-200"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {featuredProjects.map((project, index) => {
              const Icon = projectIcons[index] || Code2;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 transition hover:border-zinc-700"
                >
                  <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${project.gradient} text-white shadow-lg shadow-black/20`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{project.highlights}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded-md border border-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>

          <Link
            href="/projects"
            className="mt-6 sm:hidden inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-zinc-200"
          >
            View all projects
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
