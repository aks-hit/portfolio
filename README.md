# Akshit Singh — AI Engineer Portfolio

A modern, interactive portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. The homepage features an **Agent Mission Hub** — a live console where visitors can chat with four AI-themed agents (Builder, RAG, MLOps, Recruiter) to explore skills, projects, and career highlights.

> **Live site**: Deployed automatically via Vercel from `main`.

---

## ✨ Features

- **Agent Mission Hub** — interactive chat console on the homepage with four role-specific agents that answer questions about skills, projects, impact, and hiring signal
- **Data-driven content** — all profile data (skills, experience, projects, achievements, stats) lives in a single typed module (`src/data/profile.ts`)
- **Five pages** — Home, About, Experience, Projects, Contact
- **Framer Motion animations** — smooth page transitions, scroll-triggered reveals, and micro-interactions
- **Magnetic buttons & custom cursor** — polished UI with hover-aware interactive elements
- **Dark theme** — sleek dark-mode design with cyan/emerald/amber/rose accent palette
- **Static export** — `next build` outputs a fully static site (`output: 'export'`), deployable anywhere
- **Responsive** — mobile-first layout across all pages

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Font | Inter (Google Fonts) |
| CI/CD | GitHub Actions + Vercel |

## 📂 Project Structure

```
├── .github/workflows/      # CI build validation
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home (Agent Mission Hub)
│   │   ├── about/           # About, skills, achievements
│   │   ├── experience/      # Work experience timeline
│   │   ├── projects/        # Project cards with overlay details
│   │   ├── contact/         # Contact methods
│   │   ├── layout.tsx       # Root layout with theme provider
│   │   └── globals.css      # Global styles & design tokens
│   ├── components/          # Reusable UI components
│   │   ├── AgentMissionHub  # Interactive agent chat console
│   │   ├── Navbar           # Navigation bar
│   │   ├── Footer           # Site footer
│   │   ├── ProjectCard      # Project display card
│   │   ├── ProjectOverlay   # Hover-triggered project detail
│   │   ├── ExperienceCard   # Experience timeline card
│   │   ├── MagneticButton   # Hover-aware magnetic button
│   │   ├── CursorFollower   # Custom cursor component
│   │   ├── FloatingCard     # Animated floating card
│   │   ├── Section          # Reusable section wrapper
│   │   └── ClientLayout     # Client-side layout wrapper
│   ├── contexts/            # React context providers
│   │   └── ThemeContext      # Theme management
│   ├── data/                # Typed data modules
│   │   ├── profile.ts       # All profile data (generated)
│   │   ├── experience.ts    # Experience re-exports
│   │   └── projects.ts      # Projects re-exports
│   └── lib/
│       └── utils.ts         # Utility functions (cn helper)
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js           # Next.js config (static export)
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies & scripts
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Deploy

```bash
# Production build (static export to /out)
npm run build

# Preview the production build
npm run start
```

The site is configured for static export (`output: 'export'` in `next.config.js`), making it compatible with Vercel, Netlify, GitHub Pages, or any static host.

## 🔄 CI/CD

The GitHub Actions workflow (`.github/workflows/portfolio-sync-deploy.yml`) runs on:

- Pushes to `main` affecting source, config, or workflow files
- Pull requests targeting `main`
- Manual `workflow_dispatch`

It validates the build before Vercel deploys the connected `main` branch.

## 🤖 Interactive Agents

The homepage agents run in **local static mode** with curated, keyword-matched responses derived from the profile data. No API keys are exposed in browser JavaScript.

To upgrade to a fully LLM-backed experience later, add a serverless backend route that stores the API key server-side, then call that endpoint from `AgentMissionHub.tsx`.

## 📝 Updating Content

All portfolio content is driven by `src/data/profile.ts`. To update:

1. Edit the profile data in `src/data/profile.ts`
2. Run `npm run dev` to preview changes
3. Push to `main` — Vercel auto-deploys

## 📄 License

ISC
