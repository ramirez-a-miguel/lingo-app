# LingoTube Roadmap

## Completed POC Steps

1. Created a fresh Next.js app structure with the App Router.
2. Added Tailwind CSS configuration through the modern PostCSS setup.
3. Added shadcn/ui-style local primitives for buttons, badges, inputs, and cards.
4. Built a curated language-only video catalog in `lib/videos.ts`.
5. Built the home feed with search, language filters, featured content, and responsive video cards.
6. Built the watch page with lesson metadata, related language lessons, and a practice queue.
7. Added an AI coach client component that requests a practice plan for the selected video.
8. Added a Next.js route handler that calls Ollama through `OLLAMA_BASE_URL`.
9. Added Docker Compose support for running Ollama locally.
10. Documented setup, structure, and AI usage in the README.

## Current POC Scope

The first version is intentionally local and curated. It proves the product direction without needing accounts, a database, or the YouTube Data API.

The app currently supports:

- Language-only catalog browsing.
- Search by language, level, tags, title, channel, and learning goal.
- Per-language filters.
- Lesson watch page.
- AI practice plan generation through Ollama.

## Next Milestones

### 1. Real Video Ingestion

- Add YouTube Data API integration.
- Store videos in a database instead of `lib/videos.ts`.
- Add allow-list and deny-list rules to keep the catalog language-learning only.
- Add metadata enrichment for target language, CEFR level, accent, transcript availability, and skill type.

### 2. Learning Experience

- Add transcript display and clickable timestamp navigation.
- Add vocabulary extraction.
- Add shadowing mode with repeat segments.
- Add saved playlists by target language and level.
- Add progress tracking per lesson.

### 3. AI Enhancements

- Generate quizzes from transcripts.
- Create cloze deletion exercises.
- Provide pronunciation and speaking prompts.
- Add model settings for local Ollama models.
- Cache AI outputs per video to avoid repeated generation.

### 4. Product Foundation

- Add authentication.
- Add user preferences for target language, native language, and level.
- Add database-backed saved lessons and watch history.
- Add moderation workflow for imported videos.
- Add tests for filtering, API validation, and AI fallback states.

### 5. Deployment

- Add production Dockerfile if self-hosting.
- Add deployment environment documentation.
- Add observability for API failures and model latency.
- Decide whether AI runs locally through Ollama or through a hosted provider.

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run ollama:up
npm run ollama:pull
```
