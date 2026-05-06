"use client";

import { useMemo, useState } from "react";
import { BookOpen, Compass, Search, SlidersHorizontal, Sparkles, UserCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VideoCard } from "@/components/video-card";
import { languageFilters, videos } from "@/lib/videos";
import { cn } from "@/lib/utils";

export function LanguageVideoApp() {
  const [query, setQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState<(typeof languageFilters)[number]>("All");

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return videos.filter((video) => {
      const matchesLanguage = activeLanguage === "All" || video.language === activeLanguage;
      const searchable = [video.title, video.channel, video.language, video.level, video.goal, ...video.tags]
        .join(" ")
        .toLowerCase();
      return matchesLanguage && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeLanguage, query]);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BookOpen className="size-5" />
            </div>
            <span className="text-xl font-bold">LingoTube</span>
          </div>
          <div className="relative ml-auto hidden w-full max-w-xl md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search grammar, travel, listening, or a language"
              className="pl-9"
            />
          </div>
          <Button variant="ghost" size="icon" aria-label="Explore">
            <Compass />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Profile">
            <UserCircle />
          </Button>
        </div>
      </header>

      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge variant="secondary" className="mb-4 gap-1">
              <Sparkles className="size-3.5" />
              Curated for language learning only
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-normal sm:text-5xl">
              Watch, filter, and practice with videos built around real language goals.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              A first POC for a YouTube-style learning surface: focused video discovery, level metadata, language filters,
              and an Ollama-ready coach endpoint for AI exercises.
            </p>
          </div>
          <div className="aspect-video overflow-hidden rounded-lg bg-[linear-gradient(135deg,#111827_0%,#12615a_52%,#f2b84b_100%)] p-5 text-white shadow-sm">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-white/15 px-3 py-1 text-sm font-semibold">Now learning</span>
                <span className="rounded-md bg-black/40 px-3 py-1 text-sm">B1 • 18:09</span>
              </div>
              <div>
                <p className="mb-2 text-sm uppercase text-white/70">Featured lesson</p>
                <h2 className="max-w-md text-2xl font-bold">French Market Conversations with Slow Subtitles</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-5 block md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search language videos"
              className="pl-9"
            />
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-1">
          <Button variant="outline" size="sm" className="shrink-0 gap-2">
            <SlidersHorizontal />
            Filters
          </Button>
          {languageFilters.map((language) => (
            <Button
              key={language}
              variant={activeLanguage === language ? "default" : "secondary"}
              size="sm"
              className={cn("shrink-0", activeLanguage === language && "shadow-sm")}
              onClick={() => setActiveLanguage(language)}
            >
              {language}
            </Button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {!filteredVideos.length ? (
          <div className="rounded-lg border bg-white p-8 text-center">
            <h2 className="text-lg font-semibold">No lessons found</h2>
            <p className="mt-2 text-sm text-muted-foreground">Try another language, level, or learning goal.</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
