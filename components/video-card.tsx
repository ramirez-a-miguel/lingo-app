import Link from "next/link";
import Image from "next/image";
import type { KeyboardEvent } from "react";
import { Captions, Clock, Play, ShieldCheck } from "@/components/animated-icons";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageVideo } from "@/lib/videos";

type VideoCardProps = {
  video: LanguageVideo;
  onSelect?: (video: LanguageVideo) => void;
};

export function VideoCard({ video, onSelect }: VideoCardProps) {
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const card = (
    <Card className="lesson-card overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-surface-lowest">
        <Image
          src={thumbnailUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-background/20" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge className="border-white/20 bg-primary text-primary-foreground">{video.language}</Badge>
          <Badge className="border-white/20 bg-surface-high/90 text-foreground">
            <ShieldCheck className="animated-icon mr-1 size-3" />
            Language
          </Badge>
        </div>
        <div className="absolute right-3 top-3 rounded-sm bg-background/80 px-2 py-1 text-xs font-semibold text-white">
          {video.duration}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--md-sys-elevation-level1)]">
            <Play className="animated-icon ml-0.5 size-5 fill-current" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-primary">{video.level}</p>
            <p className="line-clamp-1 text-sm font-semibold">{video.channel}</p>
          </div>
        </div>
      </div>
      <CardContent className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">{video.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="animated-icon size-3.5" />
            {video.views} • {video.published}
          </p>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{video.goal}</p>
        <div className="flex flex-wrap gap-2">
          {video.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-tertiary/20 bg-tertiary/10 px-2 py-1 text-xs font-medium text-tertiary">
              <Captions className="animated-icon size-3" />
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (onSelect) {
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect?.(video);
      }
    }

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(video)}
        onKeyDown={handleKeyDown}
        className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {card}
      </div>
    );
  }

  return (
    <Link
      href={`/watch/${video.id}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {card}
    </Link>
  );
}
