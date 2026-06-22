/* Profile data — synced from Akshit Singh's latest resume (Jan 2026). */

export const profile = {
  "name": "Akshit Singh",
  "title": "AI Engineer | Agentic AI · RAG · LLMOps · Multi-Agent Pipelines · Voice AI",
  "badge": "GATE 2025 · Top 9% · Oracle Data Science & GenAI Certified",
  "summary": "AI Engineer who takes ambiguous problems from 0→1 and ships production systems fast — delivered a lease abstraction pipeline in 5 weeks that cut processing time 70x at under $1/month, because cost and scale are design constraints, not afterthoughts. Drawn to building things that solve real problems: autonomous outreach agents, real-time voice systems, multi-agent document pipelines that run on autopilot. Fluent across the full stack — cloud infrastructure, LLM evaluation, real-time communication, and enterprise workflow automation.",
  "email": "akshitsinghak@yahoo.com",
  "phone": "+91-8787232180",
  "location": "India",
  "links": {
    "linkedin": "https://linkedin.com/in/akshit-singh-007",
    "github": "https://github.com/aks-hit",
    "instagram": "https://www.instagram.com/akshit.singh.7/"
  },
  "stats": [
    { "label": "Lease Processing Speedup",  "value": "70x",   "tone": "cyan"    },
    { "label": "Monthly Pipeline Cost",     "value": "<$1",   "tone": "lime"    },
    { "label": "Query Latency Cut",         "value": "191x",  "tone": "violet"  },
    { "label": "GATE 2025 DS&AI",           "value": "Top 9%", "tone": "magenta" }
  ],
  "education": {
    "degree": "B.Tech in Computer Science Engineering",
    "school": "Heritage Institute of Technology, Kolkata",
    "score": "CGPA: 8.68/10",
    "year": "2025"
  },
  "educationSecondary": {
    "degree": "Higher Secondary (XII) — CBSE",
    "school": "Green Valley English School, Varanasi",
    "score": "94.8%",
    "year": "2021"
  },
  "achievements": [
    "Shipped a production lease-abstraction pipeline in 5 weeks — 70x faster review, 200+ lease portfolio, <$1/month cost. Cost and scale treated as design constraints, not afterthoughts.",
    "Improved RAG quality on lease intelligence chatbot: RAGAS 0.47 → 0.76 (+62%) and faithfulness 0.40 → 0.94 (+135%); cut query latency 191x via caching.",
    "AIR 5246 among 57,054 candidates in GATE 2025 — Data Science & AI (DA). Top 9% nationwide. Validates mastery in ML, statistics, and AI fundamentals.",
    "Captained college basketball team to 3 consecutive inter-college championships — sustained leadership under competitive pressure.",
    "Oracle Cloud Infrastructure (OCI) — Data Science Professional and Generative AI Professional certifications.",
    "Architected fault-tolerant pipelines surviving crashes across 9 phases with zero re-billed API calls — production-grade reliability discipline."
  ],
  "skills": {
    "Languages & Backend": [
      "Python", "SQL", "C/C++", "FastAPI", "REST APIs", "WebSockets",
      "Microservices", "Event-Driven Architecture", "Async Job Queues",
      "Fault-Tolerant Pipelines"
    ],
    "Generative AI": [
      "GPT", "Gemini", "Claude", "RAG", "Agentic AI", "Multi-Agent Systems",
      "MCP", "LangChain", "LlamaIndex", "Prompt Engineering", "RAGAS",
      "LLM-as-a-Judge", "Token Optimization", "LLMOps",
      "Function Calling", "Cross-Encoder Reranking", "RRF Fusion", "BM25 + Vector Hybrid"
    ],
    "Cloud": [
      "Azure AI Foundry", "Azure ML Studio", "Azure PromptFlow",
      "Azure Document Intelligence", "Azure Speech Services (STT/TTS)",
      "Azure Blob Storage", "GCP", "AWS", "Oracle Cloud"
    ],
    "ML & Deep Learning": [
      "PyTorch", "TensorFlow", "Scikit-learn", "CNNs",
      "Pinecone", "ChromaDB", "FAISS", "Embeddings", "Reranking"
    ],
    "Voice & Real-Time": [
      "Deepgram ASR", "Twilio", "Pipecat", "Bilingual STT/TTS",
      "Sub-2s Voice Latency", "Concurrent Call Handling", "Session Persistence"
    ],
    "DevOps & MLOps": [
      "Docker", "GitHub Actions", "CI/CD", "MLOps",
      "Git", "Linux", "Hugging Face", "Streamlit",
      "Observability", "Cost Architecture", "Per-Chunk Checkpointing"
    ],
    "Certifications": [
      "OCI Data Science Professional",
      "OCI Generative AI Professional",
      "Machine Learning Specialization",
      "Google Cybersecurity Professional"
    ]
  },
  "experiences": [
    {
      "id": "relay-human-cloud-ai-engineer",
      "role": "AI Engineer",
      "company": "Relay Human Cloud",
      "period": "January 2026 — Present",
      "points": [
        "Delivered an end-to-end multi-agent lease abstraction pipeline (Python, Gemini 2.5-flash-lite) from 0 to production in 5 weeks — reduced per-lease review from 4–8 hours to under 5 minutes (~70x) across a 200+ lease portfolio, extracting 54 structured fields across multiple lease formats at under $1/month; runs monthly without manual intervention.",
        "Architected a 3-tier OCR cascade (pdfplumber → EasyOCR → Gemini Vision): pdfplumber handles clean PDFs at zero API cost, EasyOCR processes degraded scans, Gemini Vision resolves ambiguous pages — 3.9x throughput improvement (204 → 52 min) across 882 pages via parallel execution.",
        "Implemented multi-agent conflict resolution with source-quote grounding to eliminate hallucination, plus a fault-tolerant job queue with per-chunk checkpointing that survives crashes across 9 pipeline phases with zero re-billed API calls.",
        "Developed an agentic RAG chatbot for lease intelligence (Gemini function-calling, hybrid BM25 + vector retrieval, cross-encoder rerank, RRF fusion) with dynamic outputs (text, Excel/CSV, dashboards); improved RAGAS 0.47 → 0.76 (+62%), faithfulness 0.40 → 0.94 (+135%), cut query latency 191x via caching.",
        "Defined cost architecture end-to-end: pdfplumber-first cascade to eliminate Gemini Vision costs on clean PDFs, token budgets per phase, and linear cost scaling validated at 10x lease volume."
      ],
      "color": "cyan"
    },
    {
      "id": "your-ally-stack-ai-engineer-intern",
      "role": "AI Engineer Intern",
      "company": "Your Ally Stack",
      "period": "September 2025 — January 2026",
      "points": [
        "Designed and launched an AI interview orchestration platform (FastAPI, Gemini, GPT-4o-mini) — eliminated 90% of manual setup effort and reduced LLM inference latency by 70–80% through prompt compression, token-budget accounting, and multi-model routing.",
        "Introduced deterministic LLM pipelines with schema-constrained parsing and LLM-as-a-Judge validation, cutting hallucination rate by ~40%; integrated a speech-to-evaluation system fusing ASR with rubric-based scoring that reduced evaluation time by ~65%.",
        "Decoupled generation, evaluation, and validation into independent modular APIs — zero-downtime deployments and independent service scaling."
      ],
      "color": "violet"
    },
    {
      "id": "iitram-deep-learning-research",
      "role": "Deep Learning Research Intern",
      "company": "Institute of Infrastructure, Technology, Research & Management",
      "period": "June 2024 — July 2024",
      "points": [
        "Researched ML/DL-based sleep stage classification using non-invasive PPG signals — achieved up to 86% accuracy.",
        "Implemented residual convolutional blocks and temporal convolutional networks, improving predictive accuracy by 10–15% over traditional methods.",
        "Orchestrated data cleaning and preprocessing with Pandas and Scikit-learn, reducing model error by 15%."
      ],
      "color": "amber"
    }
  ],
  "projects": [
    {
      "id": "lease-abstraction-pipeline",
      "title": "Multi-Agent Lease Abstraction Pipeline",
      "description": "End-to-end production system that abstracts 54 structured fields from 200+ commercial leases per month at under $1/month total Gemini cost. Multi-agent conflict resolution with source-quote grounding eliminates hallucination; fault-tolerant job queue with per-chunk checkpointing survives crashes across 9 pipeline phases.",
      "highlights": "Cut per-lease review from 4–8 hours to <5 minutes (~70x). 3-tier OCR cascade (pdfplumber → EasyOCR → Gemini Vision) delivers 3.9x throughput across 882 pages. Linear cost scaling validated at 10x volume.",
      "tech": ["Python", "Gemini 2.5 Flash-Lite", "pdfplumber", "EasyOCR", "Multi-Agent", "Job Queues", "Cost Architecture"],
      "link": "#",
      "gradient": "from-cyan-500 to-violet-600"
    },
    {
      "id": "agentic-rag-lease-chatbot",
      "title": "Agentic RAG Lease Intelligence Chatbot",
      "description": "Conversational lease intelligence — natural-language queries with dynamic outputs (text, Excel/CSV, dashboards). Gemini function-calling, hybrid BM25 + vector retrieval, cross-encoder reranking, and RRF fusion.",
      "highlights": "RAGAS 0.47 → 0.76 (+62%), faithfulness 0.40 → 0.94 (+135%), query latency cut 191x via tiered caching.",
      "tech": ["Gemini Function Calling", "BM25", "Vector Retrieval", "Cross-Encoder Rerank", "RRF Fusion", "RAGAS"],
      "link": "#",
      "gradient": "from-violet-500 to-fuchsia-600"
    },
    {
      "id": "customer-support-voice-agent",
      "title": "AI Customer Support Voice Agent",
      "description": "Production telephony system handling real customer-support workload — bilingual (EN + HI), sub-2s latency, 5+ concurrent calls via Twilio, Deepgram, OpenAI, and SQLite. Session-aware call handling with persistent storage for complaint booking, escalation routing, and sentiment-aware responses.",
      "highlights": "Cut manual workload by 70%. Concurrent session handling with persistent context across complaint booking and escalation flows.",
      "tech": ["Twilio", "Deepgram", "OpenAI", "SQLite", "FastAPI", "Voice AI", "Bilingual"],
      "link": "https://github.com/aks-hit/Customer_Support_Voice_agent",
      "gradient": "from-fuchsia-500 to-rose-600"
    },
    {
      "id": "multimodal-assessment-platform",
      "title": "AI Multimodal Assessment Platform",
      "description": "Multi-modal evaluation platform for writing, speaking, and interview assessment. Azure STT/TTS with WebSocket real-time communication across 3 evaluation modalities — owned infra through LLM scoring.",
      "highlights": "3 evaluation modalities served from a single platform. Real-time WebSocket transport with deterministic rubric-based scoring.",
      "tech": ["Azure STT/TTS", "WebSocket", "FastAPI", "LLM Scoring", "Real-Time"],
      "link": "#",
      "gradient": "from-emerald-500 to-cyan-600"
    },
    {
      "id": "deep-search-ai-agent",
      "title": "Deep Search AI Agent",
      "description": "Research retrieval agent integrating Bing Search APIs with Azure AI Foundry and PromptFlow orchestration. Instrumented MCP servers/clients across 4+ integrated services for a modular agent architecture.",
      "highlights": "Reduced average research retrieval time by ~60%. Modular agent architecture across 4+ MCP-integrated services.",
      "tech": ["Bing Search API", "Azure AI Foundry", "PromptFlow", "MCP", "Agentic AI"],
      "link": "#",
      "gradient": "from-amber-500 to-orange-600"
    },
    {
      "id": "autonomous-outreach-agent",
      "title": "Autonomous Outreach Agent",
      "description": "24/7 cold outreach pipeline powered by Google Gemini — scores leads, drafts hyper-personalized emails, sends follow-ups, auto-applies to LinkedIn jobs via Playwright, and syncs to Google Sheets CRM. Waterfall API contact discovery (Apollo → Snov → Hunter), Gmail API with bounce detection, Windows Task Scheduler deployment.",
      "highlights": "Fully autonomous lead-to-application loop with hardened security and zero-maintenance scheduling.",
      "tech": ["Google Gemini", "Playwright", "Gmail API", "Google Sheets API", "Python", "Agentic AI"],
      "link": "https://github.com/aks-hit/outreach_agent",
      "gradient": "from-indigo-500 to-sky-600"
    }
  ],
  /* ── Anatomical brain regions: positions reflect actual human brain anatomy.
        Cerebellum carries the basketball/athletic discipline thread — the cerebellum
        literally controls motor coordination, so it's the right lobe for that story. ── */
  "brainRegions": [
    {
      "id": "frontal",
      "label": "Frontal Lobe",
      "subtitle": "Strategy & 0→1 Execution",
      "tagline": "Decision-making · Planning · Execution",
      "color": "#22e4ff",
      "position": { "x": 0,    "y": 0.45, "z": 1.35 },
      "bullets": [
        "0→1 builder: I take ambiguous problems and ship production systems in weeks, not quarters.",
        "Lease abstraction pipeline · 5 weeks · 0 → production · 70x faster review · <$1/month.",
        "Cost and scale are treated as first-class design constraints from day one."
      ],
      "metrics": [
        { "label": "Speedup", "value": "70x" },
        { "label": "Cost", "value": "<$1/mo" },
        { "label": "Time-to-prod", "value": "5 weeks" }
      ]
    },
    {
      "id": "parietal",
      "label": "Parietal Lobe",
      "subtitle": "Cloud & MLOps",
      "tagline": "Integration · Spatial reasoning · Systems",
      "color": "#9d4edd",
      "position": { "x": 0,    "y": 0.80, "z": 0.10 },
      "bullets": [
        "Azure AI Foundry · PromptFlow · ML Studio · Document Intelligence — production-grade.",
        "Fault-tolerant job queues with per-chunk checkpointing across 9 pipeline phases — zero re-billed API calls on crashes.",
        "CI/CD via GitHub Actions, observability and cost guardrails baked into every deploy."
      ],
      "metrics": [
        { "label": "Pipeline phases", "value": "9" },
        { "label": "Re-billed calls", "value": "0" },
        { "label": "Throughput", "value": "3.9x" }
      ]
    },
    {
      "id": "temporal",
      "label": "Temporal Lobe",
      "subtitle": "Voice & Real-Time AI",
      "tagline": "Language · Audio · Memory",
      "color": "#ff2bd6",
      "position": { "x": -1.30, "y": -0.15, "z": 0.20 },
      "bullets": [
        "Bilingual EN/HI voice agents on Twilio + Deepgram + OpenAI — sub-2s latency.",
        "Production telephony handling 5+ concurrent call workflows with session-aware memory.",
        "Speech-to-evaluation fusing ASR with rubric-based LLM scoring — eval time cut 65%."
      ],
      "metrics": [
        { "label": "Latency", "value": "<2s" },
        { "label": "Concurrent", "value": "5+" },
        { "label": "Workload cut", "value": "70%" }
      ]
    },
    {
      "id": "occipital",
      "label": "Occipital Lobe",
      "subtitle": "Agentic AI & RAG",
      "tagline": "Vision · Pattern · Retrieval",
      "color": "#ffb547",
      "position": { "x": 0,    "y": 0.10, "z": -1.40 },
      "bullets": [
        "Multi-agent conflict resolution with source-quote grounding — eliminates hallucination.",
        "Hybrid BM25 + vector retrieval, cross-encoder rerank, RRF fusion.",
        "MCP servers/clients orchestrating modular agent architectures across 4+ services."
      ],
      "metrics": [
        { "label": "RAGAS", "value": "+62%" },
        { "label": "Faithfulness", "value": "+135%" },
        { "label": "Latency", "value": "191x" }
      ]
    },
    {
      "id": "cerebellum",
      "label": "Cerebellum",
      "subtitle": "Basketball Brain · Coordination & Discipline",
      "tagline": "Motor control · Timing · Team flow",
      "color": "#ff7a00",
      "position": { "x": 0,    "y": -0.80, "z": -0.95 },
      "bullets": [
        "Captained college basketball to 3 consecutive inter-college championships.",
        "Sustained leadership under competitive pressure — same muscle I use leading agentic AI builds.",
        "Court instincts transfer cleanly: read the floor, call the play, ship the win."
      ],
      "metrics": [
        { "label": "Championships", "value": "3 in a row" },
        { "label": "Role", "value": "Captain" },
        { "label": "Team flow", "value": "Lead PG" }
      ],
      "isBasketball": true
    },
    {
      "id": "brainstem",
      "label": "Brainstem",
      "subtitle": "Signals & How to Reach Me",
      "tagline": "Vitals · Always on · Open channel",
      "color": "#b6ff3c",
      "position": { "x": 0,    "y": -1.30, "z": -0.30 },
      "bullets": [
        "GATE 2025 DS&AI · AIR 5246 · Top 9% nationwide (57,054 candidates).",
        "Oracle Cloud Infrastructure · Data Science Professional + Generative AI Professional.",
        "Open to AI Engineer roles, agentic systems consulting, RAG/LLMOps engagements."
      ],
      "metrics": [
        { "label": "GATE Rank", "value": "AIR 5246" },
        { "label": "Percentile", "value": "Top 9%" },
        { "label": "OCI Certs", "value": "2x" }
      ]
    }
  ]
} as const;

export type Profile = typeof profile;
export type Project = Profile['projects'][number];
export type Experience = Profile['experiences'][number];
export type BrainRegion = Profile['brainRegions'][number];
