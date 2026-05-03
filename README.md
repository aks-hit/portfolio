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

LinkedIn does not provide a simple public API for automatic profile scraping. The reliable workflow is to mirror LinkedIn changes into `content/linkedin.json`, or replace that file from a LinkedIn data export before CI runs. The GitHub Action is scheduled daily and also runs on every push.

## CI/CD

The workflow at `.github/workflows/portfolio-sync-deploy.yml`:

1. Installs dependencies with `npm ci`.
2. Runs `npm run sync:profile`.
3. Builds the static Next.js export.
4. Uploads `out/` to GitHub Pages.

It runs on:

- Pushes to `main` that affect content, source, config, or workflow files.
- Manual `workflow_dispatch`.
- A daily schedule at `03:30 UTC`.

Enable GitHub Pages in the repository settings and select GitHub Actions as the Pages source.

## Interactive Agents

The homepage agents run in local static mode with curated responses based on the resume content. This avoids exposing a Gemini/OpenAI key in browser JavaScript, which would be unsafe for a static GitHub Pages deployment.

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
- GitHub Actions and GitHub Pages
