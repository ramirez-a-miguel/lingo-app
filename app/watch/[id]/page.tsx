import Link from "next/link";
import { ArrowLeft, BookMarked, Captions, CheckCircle2, Clock, Languages, ListVideo, Play } from "lucide-react";

import { AiCoach } from "@/components/ai-coach";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoCard } from "@/components/video-card";
import { getRelatedVideos, getVideoById, videos } from "@/lib/videos";

type WatchPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return videos.map((video) => ({
    id: video.id,
  }));
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const video = getVideoById(id);
  const relatedVideos = getRelatedVideos(video);

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft />
              Home
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Languages className="size-4 text-primary" />
            Language-only catalog
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="space-y-5">
          <div className="aspect-video overflow-hidden rounded-lg bg-[linear-gradient(135deg,#111827_0%,#12615a_48%,#f2b84b_100%)] p-5 text-white shadow-sm">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <Badge className="border-white/20 bg-white/15 text-white">{video.language}</Badge>
                <span className="rounded-md bg-black/55 px-2 py-1 text-xs font-semibold">{video.duration}</span>
              </div>
              <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-end">
                <div className="flex size-16 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                  <Play className="ml-1 size-8 fill-current" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase text-white/70">{video.level} lesson</p>
                  <h1 className="max-w-3xl text-3xl font-bold leading-tight">{video.title}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{video.accent}</Badge>
              {video.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="text-2xl font-bold">{video.title}</h2>
            <p className="text-sm text-muted-foreground">
              {video.channel} • {video.views} views • {video.published}
            </p>
          </div>

          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="grid gap-4 p-5 sm:grid-cols-3">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">Learning goal</p>
                  <p className="mt-1 text-sm text-muted-foreground">{video.goal}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Captions className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">Study mode</p>
                  <p className="mt-1 text-sm text-muted-foreground">Slow captions, shadowing prompts, and recall drills.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">Session plan</p>
                  <p className="mt-1 text-sm text-muted-foreground">Watch once, repeat out loud, then ask the AI coach.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-5">
          <AiCoach video={video} />
          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="space-y-4 p-4">
              <div className="flex items-center gap-2">
                <BookMarked className="size-5 text-primary" />
                <h2 className="font-semibold">Practice queue</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 rounded-md bg-muted p-3">
                  <ListVideo className="size-4 text-primary" />
                  Save phrase list
                </div>
                <div className="flex items-center gap-2 rounded-md bg-muted p-3">
                  <Captions className="size-4 text-primary" />
                  Generate cloze exercise
                </div>
                <div className="flex items-center gap-2 rounded-md bg-muted p-3">
                  <Languages className="size-4 text-primary" />
                  Compare native translation
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <h2 className="mb-4 text-xl font-bold">More language lessons</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedVideos.map((relatedVideo) => (
            <VideoCard key={relatedVideo.id} video={relatedVideo} />
          ))}
        </div>
      </section>
    </main>
  );
}
