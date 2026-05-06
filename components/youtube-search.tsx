"use client";

import { Play, Video } from "@/components/animated-icons";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { videos } from "@/lib/videos";
import type { LanguageChannel, LanguageFilter, LanguageVideo } from "@/lib/videos";

type YouTubeSearchProps = {
  externalLanguage?: LanguageFilter;
  channel?: LanguageChannel | null;
  onSelectVideo?: (video: LanguageVideo) => void;
};

type ChannelResponse = {
  videos: LanguageVideo[];
  error?: string;
};

function selectVideoFromKeyboard(event: KeyboardEvent<HTMLDivElement>, video: LanguageVideo, onSelectVideo?: (video: LanguageVideo) => void) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onSelectVideo?.(video);
  }
}

export function YouTubeSearch({ externalLanguage = "All", channel, onSelectVideo }: YouTubeSearchProps) {
  const [remoteVideos, setRemoteVideos] = useState<LanguageVideo[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "fallback">("idle");

  const savedVideos = useMemo(() => videos.filter((video) => {
    if (channel) {
      return video.channelUrl === channel.url;
    }

    return externalLanguage === "All" || video.language === externalLanguage;
  }), [channel, externalLanguage]);

  useEffect(() => {
    if (!channel) {
      setRemoteVideos([]);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();
    const activeChannel = channel;

    async function loadChannelVideos() {
      setStatus("loading");

      try {
        const response = await fetch(`/api/youtube/channel?language=${encodeURIComponent(activeChannel.language)}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as ChannelResponse;

        if (!response.ok || data.error || !data.videos.length) {
          setRemoteVideos([]);
          setStatus("fallback");
          return;
        }

        setRemoteVideos(data.videos);
        setStatus("ready");
      } catch {
        if (!controller.signal.aborted) {
          setRemoteVideos([]);
          setStatus("fallback");
        }
      }
    }

    loadChannelVideos();

    return () => controller.abort();
  }, [channel]);

  const channelVideos = channel && remoteVideos.length ? remoteVideos : savedVideos;
  const channelCount = new Set(channelVideos.map((video) => video.channel)).size;
  const title = channel ? channel.channel : "YouTube channels";
  const subtitle = channel
    ? `${channel.handle} • ${status === "loading" ? "loading channel videos" : `${channelVideos.length} channel videos`} • modal playback`
    : `${channelCount} channels • no API key • modal playback`;

  return (
    <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-sm bg-primary/10 text-primary ring-1 ring-primary/25">
          <Video className="animated-icon size-6" />
        </div>
        <div>
          <h2 className="m3-type-headline-large">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {status === "fallback" ? (
        <div className="mb-4 rounded-lg border border-outline-variant bg-surface-low p-3 text-sm text-muted-foreground">
          Showing saved channel videos while the live YouTube feed is unavailable.
        </div>
      ) : null}

      <div className="grid min-h-[360px] gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {channelVideos.map((video, index) => (
          <div
            key={video.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectVideo?.(video)}
            onKeyDown={(event) => selectVideoFromKeyboard(event, video, onSelectVideo)}
            className={`group text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              index === 0 ? "sm:col-span-2 xl:col-span-1 xl:row-span-2" : ""
            }`}
          >
            <Card className="lesson-card h-full overflow-hidden">
              <div className="relative aspect-video bg-surface-lowest">
                <Image
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 25vw, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-background/10" />
                <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">{video.language}</Badge>
                <div className="absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--md-sys-elevation-level1)]">
                  <Play className="animated-icon ml-0.5 size-5 fill-current" />
                </div>
              </div>
              <CardContent className="space-y-3 p-4">
                <div>
                  <h3 className="line-clamp-2 text-base font-bold leading-snug">{video.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {video.channel} • {video.published}
                  </p>
                </div>
                <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{video.goal}</p>
                <Badge variant="outline" aria-label="Open modal lesson" title="Open modal lesson">
                  <Play className="animated-icon size-3.5" />
                </Badge>
              </CardContent>
            </Card>
          </div>
        ))}

        {!channelVideos.length ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed border-outline-variant bg-surface-low p-8 text-center sm:col-span-2 xl:col-span-3 2xl:col-span-4">
            <div className="max-w-md">
              <Video className="animated-icon mx-auto mb-4 size-10 text-primary" />
              <h3 className="text-xl font-bold">{channel ? "No videos saved for this channel" : "No channels for this filter"}</h3>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
