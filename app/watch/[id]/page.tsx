import Link from "next/link";
import {
  ArrowLeft,
  BookMarked,
  Captions,
  CheckCircle2,
  Clock,
  ExternalLink,
  Languages,
  ListVideo,
  ShieldCheck,
} from "@/components/animated-icons";

import { AiCoach } from "@/components/ai-coach";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoCard } from "@/components/video-card";
import { YouTubePlayer } from "@/components/youtube-player";
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
      <header className="m3-top-app-bar sticky top-0 z-30 border-b">
        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft />
              Home
            </Link>
          </Button>
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary ring-1 ring-primary/20">
            <ShieldCheck className="size-4" />
            Language videos only
          </div>
        </div>
      </header>

      <div className="grid w-full gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
        <section className="space-y-5">
          <YouTubePlayer video={video} />

          <div className="m3-elevated-card p-5">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge className="bg-primary text-primary-foreground">{video.language}</Badge>
              <Badge variant="secondary">{video.level}</Badge>
              <Badge variant="outline">{video.accent}</Badge>
              <Badge className="bg-secondary text-secondary-foreground">
                <ShieldCheck className="mr-1 size-3.5" />
                Curated language lesson
              </Badge>
            </div>
            <h1 className="m3-type-headline-large max-w-4xl">{video.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{video.channel}</span>
              <span>{video.views}</span>
              <span>{video.published}</span>
              <Button asChild variant="outline" size="sm">
                <a href={video.sourceUrl} target="_blank" rel="noreferrer">
                  <ExternalLink />
                  YouTube
                </a>
              </Button>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">{video.goal}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Card>
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

        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <AiCoach video={video} />
          <Card>
            <CardContent className="space-y-4 p-4">
              <div className="flex items-center gap-2">
                <BookMarked className="size-5 text-primary" />
                <h2 className="font-semibold">Practice queue</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 rounded-sm bg-surface-high p-3">
                  <ListVideo className="size-4 text-primary" />
                  Save phrase list
                </div>
                <div className="flex items-center gap-2 rounded-sm bg-surface-high p-3">
                  <Captions className="size-4 text-primary" />
                  Generate cloze exercise
                </div>
                <div className="flex items-center gap-2 rounded-sm bg-surface-high p-3">
                  <Languages className="size-4 text-primary" />
                  Compare native translation
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="w-full px-4 pb-10 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-xl font-bold">More language lessons</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {relatedVideos.map((relatedVideo) => (
            <VideoCard key={relatedVideo.id} video={relatedVideo} />
          ))}
        </div>
      </section>
    </main>
  );
}
