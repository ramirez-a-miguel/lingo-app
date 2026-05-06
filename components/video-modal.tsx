"use client";

import { useEffect } from "react";

import { AiCoach } from "@/components/ai-coach";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Captions, CheckCircle2, Clock, Play, ShieldCheck, Video, X } from "@/components/animated-icons";
import type { LanguageVideo } from "@/lib/videos";

export type VideoModalSelection =
  | {
      kind: "curated";
      video: LanguageVideo;
    }
  | {
      kind: "youtube";
      video: LanguageVideo;
    };

type VideoModalProps = {
  selection: VideoModalSelection | null;
  onClose: () => void;
};

function getModalDetails(selection: VideoModalSelection) {
  if (selection.kind === "curated") {
    const { video } = selection;
    return {
      title: video.title,
      channel: video.channel,
      language: video.language,
      level: video.level,
      duration: video.duration,
      published: video.published,
      description: video.goal,
      embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1&cc_load_policy=1&autoplay=1`,
      tags: video.tags,
    };
  }

  const { video } = selection;
  return {
    title: video.title,
    channel: video.channel,
    language: video.language,
    level: video.level,
    duration: video.duration,
    published: video.published,
    description: video.goal,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1&cc_load_policy=1&autoplay=1`,
    tags: video.tags,
  };
}

export function VideoModal({ selection, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!selection) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, selection]);

  if (!selection) {
    return null;
  }

  const details = getModalDetails(selection);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 p-2 backdrop-blur-xl sm:p-4" role="dialog" aria-modal="true" aria-label={details.title}>
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close lesson modal" onClick={onClose} />
      <div className="m3-modal-surface relative flex h-full w-full flex-col overflow-hidden">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-outline-variant px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary ring-1 ring-primary/25">
              <Video className="animated-icon size-5" />
            </div>
            <div className="min-w-0">
              <p className="m3-type-label-small text-primary">In-app lesson modal</p>
              <h2 className="truncate text-base font-semibold text-foreground sm:text-lg">{details.title}</h2>
            </div>
          </div>
          <Button type="button" variant="ghost" size="icon" aria-label="Close" onClick={onClose}>
            <X className="animated-icon size-5" />
          </Button>
        </div>

        <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-4 lg:grid-cols-[minmax(0,1fr)_390px] lg:p-6">
          <section className="min-w-0 space-y-4">
            <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-lowest shadow-[0_24px_90px_rgba(68,143,255,0.16)]">
              <iframe
                className="aspect-video w-full"
                src={details.embedUrl}
                title={details.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div className="m3-elevated-card p-5">
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge className="bg-primary text-primary-foreground">{details.language}</Badge>
                <Badge variant="secondary">{details.level}</Badge>
                <Badge variant="outline">{details.duration}</Badge>
                <Badge className="bg-secondary text-secondary-foreground">
                  <ShieldCheck className="animated-icon mr-1 size-3.5" />
                  Contained app view
                </Badge>
              </div>
              <h1 className="m3-type-headline-large">{details.title}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{details.channel}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="animated-icon size-3.5" />
                  {details.published}
                </span>
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{details.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {details.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    <Captions className="animated-icon mr-1 size-3.5" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-4 lg:sticky lg:top-0 lg:self-start">
            {selection.kind === "curated" ? (
              <AiCoach video={selection.video} />
            ) : (
              <div className="m3-elevated-card p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Play className="animated-icon size-5 text-primary" />
                  <h3 className="text-base font-semibold">Search result lesson</h3>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">Playable in-app lesson using YouTube privacy-enhanced playback.</p>
              </div>
            )}

            <div className="m3-elevated-card p-5">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle2 className="animated-icon size-5 text-primary" />
                <h3 className="text-base font-semibold">Practice queue</h3>
              </div>
              <div className="space-y-3 text-sm">
                {["Save phrase list", "Generate cloze exercise", "Compare native translation"].map((item) => (
                  <div key={item} className="rounded-sm bg-surface-high p-3 text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
