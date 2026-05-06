# LingoTube

LingoTube is a first POC for a YouTube-style language learning app. It uses Next.js, Tailwind CSS, shadcn/ui-style local components, and an optional Ollama container for AI coaching enhancements.

## What is Included

- Curated language-only video catalog with language, level, accent, duration, tags, and learning goals.
- YouTube-inspired home feed with search, horizontal language filters, cards, and a featured lesson area.
- Watch page with a player-style lesson surface, related lessons, practice queue, and AI coach panel.
- Local shadcn/ui-inspired primitives in `components/ui`.
- Ollama API integration at `app/api/ai/coach/route.ts`.
- Docker Compose service for running Ollama locally.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Ollama AI Features

Start Ollama in Docker:

```bash
npm run ollama:up
```

Pull the default model:

```bash
npm run ollama:pull
```

Copy `.env.example` to `.env.local` if you want to change the model or base URL.

```bash
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

The watch page calls `/api/ai/coach` to generate a short practice plan for the selected lesson.

## Project Structure

- `app/page.tsx` renders the browse experience.
- `app/watch/[id]/page.tsx` renders the lesson watch experience.
- `app/api/ai/coach/route.ts` connects the app to Ollama.
- `components/language-video-app.tsx` contains the feed filtering UI.
- `components/video-card.tsx` renders reusable language lesson cards.
- `lib/videos.ts` is the curated POC catalog.
- `docs/roadmap.md` documents the build steps and next milestones.

## Notes

This POC intentionally keeps videos curated in code so the first version only displays language-learning content. A production version should use the YouTube Data API or an ingestion pipeline with language-topic validation, moderation rules, and durable storage.
