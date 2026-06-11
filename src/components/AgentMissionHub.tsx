'use client';

import { FormEvent, KeyboardEvent, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bot,
  BrainCircuit,
  Briefcase,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  RadioTower,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  Workflow,
  Zap,
} from 'lucide-react';
import { profile } from '@/data/profile';
import MagneticButton from '@/components/MagneticButton';

const agentRoster = [
  {
    id: 'builder',
    name: 'Builder Agent',
    role: 'Turns AI ideas into shipped systems',
    icon: Bot,
    accent: 'cyan',
    prompt: 'Ask about shipped AI products, voice agents, APIs, or latency wins.',
    reply:
      'I would lead with the production work: Azure agentic systems at Relay Human Cloud, the YourAllyStack AI interview platform, and the bilingual support voice agent. The strongest signal is that the systems have measurable outcomes: 70-80% faster inference, 90% less setup effort, sub-2s voice latency, and 75% less document processing effort.',
    stats: ['Sub-2s voice AI', '90% setup reduction', 'FastAPI + Azure'],
    suggestions: ['What has Akshit shipped?', 'Explain the voice agent', 'Show production impact'],
  },
  {
    id: 'rag',
    name: 'RAG Agent',
    role: 'Explains retrieval, MCP, and LLM architecture',
    icon: BrainCircuit,
    accent: 'emerald',
    prompt: 'Ask about RAG, vector search, MCP, LLM evaluation, or agentic workflows.',
    reply:
      'Akshit has worked with vector-based retrieval, MCP servers and clients, PromptFlow document ETL, schema-constrained parsing, and LLM-as-a-Judge validation. That combination is valuable because it covers the full RAG lifecycle: ingestion, extraction, retrieval, orchestration, evaluation, and compliance.',
    stats: ['RAG pipelines', 'MCP servers', 'LLM-as-a-Judge'],
    suggestions: ['Why is MCP useful?', 'How does he evaluate LLMs?', 'What RAG stack fits him?'],
  },
  {
    id: 'mlops',
    name: 'MLOps Agent',
    role: 'Checks deployment and automation readiness',
    icon: Workflow,
    accent: 'amber',
    prompt: 'Ask about CI/CD, static deployment, GitHub Actions, MLOps, or portfolio sync.',
    reply:
      'This portfolio now runs through a content sync pipeline: resume and LinkedIn JSON generate typed profile data, GitHub Actions validates the build, and Vercel deploys the production version from main. For AI projects, the same story appears in GitHub Actions, CML, Docker, Hugging Face, MLOps, and evaluation pipelines.',
    stats: ['GitHub Actions', 'Static export', 'Content sync'],
    suggestions: ['How does portfolio CI/CD work?', 'What should I update first?', 'How is this ATS-friendly?'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter Agent',
    role: 'Summarizes hiring signal fast',
    icon: Briefcase,
    accent: 'rose',
    prompt: 'Ask for recruiter summary, ATS keywords, best projects, or interview pitch.',
    reply:
      'The recruiter pitch is sharp: AI Engineer with production Azure AI Foundry, PromptFlow, RAG, MCP, FastAPI, Gemini, OpenAI, and real-time speech systems. He has quantified impact, current job experience, GATE validation, and projects that map directly to agentic AI roles.',
    stats: ['Azure AI', 'Agentic AI', 'GATE top 9%'],
    suggestions: ['Give me a 30-second pitch', 'Which skills matter most?', 'Why hire Akshit?'],
  },
] as const;

type AgentId = (typeof agentRoster)[number]['id'];
type Message = {
  id: string;
  role: 'agent' | 'visitor';
  text: string;
};

const toneClasses: Record<string, string> = {
  cyan: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200',
  emerald: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
  amber: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  rose: 'border-rose-400/40 bg-rose-400/10 text-rose-200',
};

const statTextClasses: Record<string, string> = {
  cyan: 'text-cyan-300',
  emerald: 'text-emerald-300',
  amber: 'text-amber-300',
  rose: 'text-rose-300',
};

function getAgentAnswer(agentId: AgentId, question: string) {
  const lowerQuestion = question.toLowerCase();
  const latestExperience = profile.experiences[0];

  if (lowerQuestion.includes('skill') || lowerQuestion.includes('ats') || lowerQuestion.includes('keyword')) {
    return 'For ATS, the strongest keywords are Agentic AI, RAG, LLMOps, Azure AI Foundry, PromptFlow, Azure OpenAI, MCP, LangChain, LangGraph, LlamaIndex, vector databases, FastAPI, WebSockets, Docker, GitHub Actions, LLM evaluation, guardrails, and model monitoring. I added these across the skills section while keeping the resume-backed skills prominent.';
  }

  if (lowerQuestion.includes('rag') || lowerQuestion.includes('retrieval') || lowerQuestion.includes('vector')) {
    return 'Akshit is strongest in applied RAG: document ETL with Azure Document Intelligence, vector-based retrieval, MCP-backed agent architecture, PromptFlow orchestration, structured extraction, and LLM-as-a-Judge validation. That reads well for enterprise AI roles because it is not just prompt work; it is ingestion to evaluation.';
  }

  if (lowerQuestion.includes('mcp') || lowerQuestion.includes('model context')) {
    return 'MCP matters because it gives agents a clean way to connect with tools, services, and context providers. Akshit has resume-backed experience instrumenting RAG pipelines with MCP servers and clients across 4+ integrated services, which is a strong current-market signal for agentic AI work.';
  }

  if (lowerQuestion.includes('voice') || lowerQuestion.includes('speech') || lowerQuestion.includes('twilio') || lowerQuestion.includes('deepgram')) {
    return 'The voice AI story is practical: a bilingual support agent with Twilio, Deepgram, OpenAI, SQLite, and FastAPI, plus ASR-to-evaluation workflows with Azure STT/TTS and WebSockets. The portfolio highlights sub-2s voice latency and reduced manual workload.';
  }

  if (lowerQuestion.includes('azure') || lowerQuestion.includes('cloud') || lowerQuestion.includes('promptflow')) {
    return `The current role at ${latestExperience.company} is the anchor: ${latestExperience.points[0]} It also includes Azure Document Intelligence, Azure Speech Services, vector retrieval, and enterprise workflow orchestration.`;
  }

  if (lowerQuestion.includes('project') || lowerQuestion.includes('shipped') || lowerQuestion.includes('impact')) {
    return `Top projects to inspect: ${profile.projects
      .slice(0, 3)
      .map((project) => project.title)
      .join(', ')}. The site now frames them by measurable outcomes: latency, automation, evaluation quality, and deployment readiness.`;
  }

  if (lowerQuestion.includes('ci') || lowerQuestion.includes('deploy') || lowerQuestion.includes('update')) {
    return 'The CI/CD loop is Vercel-friendly now: edit content/resume.json or content/linkedin.json, run the sync script, build the static export, and push main. GitHub Actions validates the build without scheduled Pages deployment, then Vercel redeploys from main.';
  }

  if (lowerQuestion.includes('pitch') || lowerQuestion.includes('hire') || lowerQuestion.includes('summary')) {
    return 'Akshit is an AI Engineer who can build production agentic systems, not just demos. His strongest pitch is Azure AI Foundry + PromptFlow + RAG + MCP + FastAPI + real-time speech, backed by quantified impact and GATE/OCI validation.';
  }

  const fallback = agentRoster.find((agent) => agent.id === agentId)?.reply;
  return fallback ?? agentRoster[0].reply;
}

export default function AgentMissionHub() {
  const [activeAgentId, setActiveAgentId] = useState<AgentId>('builder');
  const questionInputRef = useRef<HTMLInputElement>(null);
  const [question, setQuestion] = useState('');
  const [messagesByAgent, setMessagesByAgent] = useState<Record<AgentId, Message[]>>({
    builder: [{ id: 'builder-intro', role: 'agent', text: agentRoster[0].reply }],
    rag: [{ id: 'rag-intro', role: 'agent', text: agentRoster[1].reply }],
    mlops: [{ id: 'mlops-intro', role: 'agent', text: agentRoster[2].reply }],
    recruiter: [{ id: 'recruiter-intro', role: 'agent', text: agentRoster[3].reply }],
  });

  const activeAgent = useMemo(
    () => agentRoster.find((agent) => agent.id === activeAgentId) ?? agentRoster[0],
    [activeAgentId]
  );
  const featuredProjects = profile.projects.slice(0, 3);
  const latestExperience = profile.experiences[0];
  const ActiveIcon = activeAgent.icon;
  const activeMessages = messagesByAgent[activeAgentId];

  function activateAgent(agentId: AgentId) {
    setActiveAgentId(agentId);
    setQuestion('');
  }

  function askAgent(promptText: string) {
    const trimmedQuestion = promptText.trim();
    if (!trimmedQuestion) return;

    const answer = getAgentAnswer(activeAgentId, trimmedQuestion);
    setMessagesByAgent((current) => ({
      ...current,
      [activeAgentId]: [
        ...current[activeAgentId],
        { id: `${activeAgentId}-${Date.now()}-q`, role: 'visitor', text: trimmedQuestion },
        { id: `${activeAgentId}-${Date.now()}-a`, role: 'agent', text: answer },
      ],
    }));
    setQuestion('');
    if (questionInputRef.current) {
      questionInputRef.current.value = '';
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    askAgent(questionInputRef.current?.value ?? question);
  }

  function handleQuestionKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      askAgent(event.currentTarget.value);
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="site-backdrop fixed inset-0 -z-10">
        <div className="absolute inset-0 neural-grid opacity-70" />
        <div className="theme-wash absolute inset-0" />
      </div>

      <section className="px-4 pt-24 pb-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.94fr_1.06fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              <Sparkles className="h-4 w-4" />
              {profile.badge}
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
                Interactive AI command center
              </p>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-7xl">
                Build with the AI engineer who ships{' '}
                <span className="gradient-text">agents into production</span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                {profile.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-bold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-300"
                >
                  <Mail className="h-5 w-5" />
                  Start a mission
                </a>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/70 px-5 py-3 font-bold text-slate-100 transition hover:border-emerald-300 hover:text-emerald-200"
                >
                  <Code2 className="h-5 w-5" />
                  Inspect builds
                </Link>
              </MagneticButton>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 text-slate-200 transition hover:border-blue-300 hover:text-blue-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 text-slate-200 transition hover:border-amber-300 hover:text-amber-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="agent-console overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/80 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-200">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-white">Live Agent Console</p>
                  <p className="text-sm text-slate-400">Ask role-specific questions</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <RadioTower className="h-4 w-4" />
                local AI mode
              </div>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2">
              {agentRoster.map((agent) => {
                const Icon = agent.icon;
                const isActive = agent.id === activeAgent.id;
                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => activateAgent(agent.id)}
                    onPointerDown={() => activateAgent(agent.id)}
                    onMouseEnter={() => activateAgent(agent.id)}
                    onFocus={() => activateAgent(agent.id)}
                    className={`rounded-xl border p-4 text-left transition ${
                      isActive
                        ? toneClasses[agent.accent]
                        : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="rounded-full border border-current px-2 py-0.5 text-[11px] font-bold uppercase">
                        agent
                      </span>
                    </div>
                    <p className="font-bold">{agent.name}</p>
                    <p className="mt-1 text-sm opacity-80">{agent.role}</p>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-800 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg border ${toneClasses[activeAgent.accent]}`}>
                  <ActiveIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-white">{activeAgent.name}</p>
                  <p className="text-sm text-slate-400">{activeAgent.prompt}</p>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {activeAgent.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onPointerDown={(event) => {
                      event.preventDefault();
                      askAgent(suggestion);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        askAgent(suggestion);
                      }
                    }}
                    className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="max-h-[270px] space-y-3 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                {activeMessages.slice(-6).map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'visitor' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'agent' && (
                      <MessageSquare className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
                    )}
                    <p
                      className={`max-w-[88%] rounded-xl px-4 py-3 text-sm leading-6 ${
                        message.role === 'visitor'
                          ? 'bg-cyan-400 text-slate-950'
                          : 'border border-slate-800 bg-slate-950/70 text-slate-300'
                      }`}
                    >
                      {message.text}
                    </p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                <input
                  ref={questionInputRef}
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={handleQuestionKeyDown}
                  placeholder={`Ask ${activeAgent.name}...`}
                  className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
                <button
                  type="submit"
                  onPointerDown={() => askAgent(questionInputRef.current?.value ?? question)}
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400 text-slate-950 transition hover:bg-cyan-300"
                  aria-label="Ask agent"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {profile.stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 backdrop-blur"
            >
              <p className={`text-4xl font-black ${statTextClasses[stat.tone] ?? 'text-cyan-300'}`}>
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-amber-300">
                <Trophy className="h-4 w-4" />
                Mission board
              </p>
              <h2 className="text-3xl font-black text-white md:text-5xl">
                Pick a quest, inspect the system
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-3 font-bold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              View all projects
              <Rocket className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group rounded-xl border border-slate-800 bg-slate-950/75 p-5 transition hover:-translate-y-1 hover:border-cyan-400/50"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${project.gradient} text-white shadow-lg shadow-slate-950/50`}>
                  {index === 0 ? <Zap className="h-6 w-6" /> : index === 1 ? <Cpu className="h-6 w-6" /> : <GitBranch className="h-6 w-6" />}
                </div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{project.highlights}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-xl border border-slate-800 bg-slate-950/75 p-6">
            <div className="mb-5 flex items-center gap-3 text-emerald-300">
              <ShieldCheck className="h-6 w-6" />
              <h2 className="text-2xl font-black text-white">Career signal</h2>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              Current node
            </p>
            <h3 className="mt-3 text-2xl font-bold text-cyan-200">
              {latestExperience.role}
            </h3>
            <p className="mt-1 text-lg text-slate-300">{latestExperience.company}</p>
            <p className="mt-4 text-slate-400">{latestExperience.points[0]}</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/75 p-6">
            <div className="mb-5 flex items-center gap-3 text-amber-300">
              <Database className="h-6 w-6" />
              <h2 className="text-2xl font-black text-white">Auto-update loop</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ['1', 'Edit resume or LinkedIn JSON'],
                ['2', 'Generator refreshes portfolio data'],
                ['3', 'Vercel deploys from main'],
              ].map(([step, text]) => (
                <div key={step} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                  <p className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-300 text-sm font-black text-slate-950">
                    {step}
                  </p>
                  <p className="text-sm font-semibold leading-6 text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
