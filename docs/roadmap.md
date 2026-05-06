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
11. Added Docker support for the Next.js app with standalone output.
12. Added a persistent Docker media volume mounted at `/data/media`.
13. Added a filesystem-backed media storage layer with upload, list, read, and delete support.
14. Added a media storage panel to exercise the storage layer from the UI.
15. Replaced mock lesson player surfaces with real YouTube embeds.
16. Updated the curated catalog to use language-learning YouTube videos only.
17. Enhanced the UI with real thumbnails, stronger language-only trust labels, and a more modern browse/watch layout.
18. Added live YouTube search through `/api/youtube/search` using `YOUTUBE_API_KEY`.
19. Added a dynamic YouTube watch route for live search results.
20. Expanded the interface to full browser width with bento-style content areas.
21. Removed French and German from the curated catalog.
22. Added Dutch lessons and Dutch search language support.
23. Restyled the app toward a modern YouTube-like interface with red/neutral colors, a top bar, left rail, and feed chips.
24. Connected the main header search to the live YouTube search panel.
25. Added a direct YouTube fallback link when `YOUTUBE_API_KEY` is not configured.
26. Reworked the YouTube discovery module to be clearer, more compact, and less hero-like.
27. Added pagination support for loading more YouTube search results in-app.

## Current POC Scope

The first version is intentionally local and curated. It proves the product direction without needing accounts, a database, or the YouTube Data API.

The app currently supports:

- Language-only catalog browsing.
- Curated Spanish, Dutch, Japanese, Italian, and English lessons.
- Search by language, level, tags, title, channel, and learning goal.
- Per-language filters.
- Lesson watch page.
- Playable YouTube embeds for curated language-learning lessons.
- Live YouTube search for embeddable language-learning results when a YouTube API key is available.
- AI practice plan generation through Ollama.
- Local media file uploads for lesson assets.
- Persistent media storage in Docker through a named volume.

## Next Milestones

### 1. Real Video Ingestion

- Add YouTube Data API integration.
- Store videos in a database instead of `lib/videos.ts`.
- Add allow-list and deny-list rules to keep the catalog language-learning only.
- Add metadata enrichment for target language, CEFR level, accent, transcript availability, and skill type.

### 2. Media Storage

- Replace JSON index storage with a database table.
- Add checksum-based duplicate detection.
- Add media processing jobs for thumbnails, duration, codecs, and waveform previews.
- Add object storage support for S3-compatible providers.
- Add signed URLs for private media files.

### 3. Learning Experience

- Add transcript display and clickable timestamp navigation.
- Add vocabulary extraction.
- Add shadowing mode with repeat segments.
- Add saved playlists by target language and level.
- Add progress tracking per lesson.

### 4. AI Enhancements

- Generate quizzes from transcripts.
- Create cloze deletion exercises.
- Provide pronunciation and speaking prompts.
- Add model settings for local Ollama models.
- Cache AI outputs per video to avoid repeated generation.

### 5. Product Foundation

- Add authentication.
- Add user preferences for target language, native language, and level.
- Add database-backed saved lessons and watch history.
- Add moderation workflow for imported videos.
- Add tests for filtering, API validation, and AI fallback states.

### 6. Deployment

- Add production Dockerfile if self-hosting.
- Add deployment environment documentation.
- Add observability for API failures and model latency.
- Decide whether AI runs locally through Ollama or through a hosted provider.

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run docker:build
npm run docker:up
npm run docker:down
npm run ollama:up
npm run ollama:pull
```
