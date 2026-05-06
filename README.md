# LingoTube

LingoTube is a first POC for a YouTube-style language learning app. It uses Next.js, Tailwind CSS, shadcn/ui-style local components, and an optional Ollama container for AI coaching enhancements.

## What is Included

- Curated language-only video catalog with language, level, accent, duration, tags, and learning goals.
- YouTube-like home feed with a top search bar, left navigation rail, language chips, and modern red/neutral colors.
- Watch page with playable YouTube embeds, related lessons, practice queue, and AI coach panel.
- Real YouTube thumbnails and source links for curated language-learning lessons.
- Live YouTube search for embeddable language-learning videos when `YOUTUBE_API_KEY` is configured.
- Full-width bento-style UI for browsing, searching, media storage, and lesson playback.
- Filesystem-backed media storage API with upload, list, open, and delete actions.
- Local shadcn/ui-inspired primitives in `components/ui`.
- Ollama API integration at `app/api/ai/coach/route.ts`.
- Docker support for running the app, persistent media storage, and Ollama locally.

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

## Docker

Build and run the app container:

```bash
npm run docker:build
npm run docker:up
```

The app runs at `http://localhost:3000`.

Stop the stack:

```bash
npm run docker:down
```

The Docker Compose setup includes:

- `app`: Next.js standalone production server.
- `media`: named Docker volume mounted at `/data/media`.
- `ollama`: local Ollama server for AI features.

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
YOUTUBE_API_KEY=
```

The watch page calls `/api/ai/coach` to generate a short practice plan for the selected lesson.

## YouTube Search

The top search bar can run a YouTube search. Press Enter after typing a query, or use the YouTube search panel.

The curated catalog works without external credentials. Full in-app YouTube discovery requires a YouTube Data API key. Once configured, results render inside LingoTube and the Watch buttons open LingoTube player pages, so users do not need to visit YouTube for discovery or playback.

Create a YouTube Data API key and add it to `.env.local`:

```bash
YOUTUBE_API_KEY=your_api_key_here
```

The app uses `/api/youtube/search` to request embeddable YouTube videos, supports loading more pages of results, and enriches searches with language-learning terms such as lessons, listening practice, and subtitles.

If no API key is configured, the UI still provides a button that opens the same language-learning search directly on YouTube.

## Media Storage

The POC includes a local filesystem storage layer in `lib/media-storage.ts`.

By default in local development, files are written to:

```bash
./storage/media
```

In Docker, files are written to:

```bash
/data/media
```

The storage API supports:

- `GET /api/media`: list uploaded media.
- `POST /api/media`: upload a file with multipart field name `file`.
- `GET /api/media/:id`: open or stream a stored file.
- `DELETE /api/media/:id`: delete a stored file.

Supported POC file types are audio, video, images, `.vtt`, and `.srt` subtitles.

## Project Structure

- `app/page.tsx` renders the browse experience.
- `app/watch/[id]/page.tsx` renders the lesson watch experience.
- `app/api/ai/coach/route.ts` connects the app to Ollama.
- `app/api/media/route.ts` exposes media list and upload endpoints.
- `app/api/media/[id]/route.ts` exposes media read and delete endpoints.
- `app/api/youtube/search/route.ts` exposes live YouTube language-video search.
- `lib/media-storage.ts` implements the filesystem storage layer.
- `lib/youtube.ts` implements the YouTube search adapter.
- `components/language-video-app.tsx` contains the feed filtering UI.
- `components/youtube-search.tsx` contains the full-width bento YouTube search UI.
- `components/media-library.tsx` contains the media storage UI.
- `components/video-card.tsx` renders reusable language lesson cards.
- `lib/videos.ts` is the curated POC catalog.
- `docs/roadmap.md` documents the build steps and next milestones.

## Notes

This POC intentionally keeps videos curated in code so the first version only displays language-learning content. A production version should use the YouTube Data API or an ingestion pipeline with language-topic validation, moderation rules, and durable storage.

The current curated language set is Spanish, Dutch, Japanese, Italian, and English.
