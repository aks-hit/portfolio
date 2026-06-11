# Akshit Singh Portfolio

An AI-engineer portfolio built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and a small content sync pipeline. The homepage is an interactive agent console where visitors can switch between Builder, Research, MLOps, and Recruiter agents.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Updating Resume, LinkedIn, Projects, or Jobs

The portfolio content now comes from:

- `content/resume.json`: name, summary, stats, skills, experience, projects, achievements, contact links.
- `content/linkedin.json`: LinkedIn profile URL, headline, and featured signals from recent LinkedIn updates.

After editing either file, run:

```bash
npm run sync:profile
npm run build
```

`npm run sync:profile` regenerates `src/data/profile.ts`, and the site imports that generated profile everywhere.

LinkedIn does not provide a simple public API for automatic profile scraping. The reliable workflow is to mirror LinkedIn changes into `content/linkedin.json`, or replace that file from a LinkedIn data export before CI runs. Vercel redeploys when changes are pushed to `main`.

## CI/CD

The workflow at `.github/workflows/portfolio-sync-deploy.yml` validates the portfolio before Vercel deploys from `main`:

1. Installs dependencies with `npm ci`.
2. Runs `npm run sync:profile`.
3. Builds the static Next.js export.

It runs on:

- Pushes to `main` that affect content, source, config, or workflow files.
- Pull requests targeting `main`.
- Manual `workflow_dispatch`.

There is no daily schedule and no GitHub Pages deployment step. That prevents the daily failure email from GitHub Pages while keeping a build check before Vercel deploys the connected `main` branch.

## Interactive Agents

The homepage agents run in local static mode with curated responses based on the resume content. This avoids exposing a Gemini/OpenAI key in browser JavaScript, which would be unsafe for a public static deployment.

To make the agents fully LLM-backed later, add a serverless backend route or edge function that stores the Gemini/OpenAI key server-side, then call that endpoint from `src/components/AgentMissionHub.tsx`.

## Useful Scripts

```bash
npm run dev
npm run sync:profile
npm run build
npm run start
```

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- GitHub Actions and Vercel
