import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Play, ShieldCheck, Video } from "@/components/animated-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type YouTubeWatchPageProps = {
  params: Promise<{
    videoId: string;
  }>;
  searchParams: Promise<{
    title?: string;
    channel?: string;
    language?: string;
  }>;
};

export default async function YouTubeWatchPage({ params, searchParams }: YouTubeWatchPageProps) {
  const { videoId } = await params;
  const details = await searchParams;
  const title = details.title ?? "YouTube language lesson";
  const channel = details.channel ?? "YouTube";
  const language = details.language ?? "Language";

  return (
    <main className="min-h-screen bg-background">
      <header className="m3-top-app-bar sticky top-0 z-30 border-b">
        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft />
              Search
            </Link>
          </Button>
          <Badge className="bg-primary text-primary-foreground">
            <ShieldCheck className="mr-1 size-3.5" />
            Language search result
          </Badge>
        </div>
      </header>

      <div className="grid w-full gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
        <section className="space-y-5">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-outline-variant bg-surface-lowest shadow-[0_24px_90px_rgba(68,143,255,0.16)]">
            <Image src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-background/20" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Play className="animated-icon ml-0.5 size-5 fill-current" />
              </div>
              <div>
                <p className="m3-type-label-small text-primary">Channel preview</p>
                <p className="text-sm font-semibold text-white">{channel}</p>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary text-primary-foreground">{language}</Badge>
                <Badge variant="secondary">YouTube</Badge>
                <Badge className="bg-secondary text-secondary-foreground">language-learning query</Badge>
              </div>
              <h1 className="m3-type-headline-large">{title}</h1>
              <p className="text-sm font-semibold text-muted-foreground">{channel}</p>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <Card className="text-foreground">
            <CardContent className="space-y-4 p-5">
              <Video className="size-8 text-tertiary" />
              <h2 className="text-xl font-bold">Learning guardrail</h2>
              <p className="text-sm leading-6 text-muted-foreground">
                This view uses YouTube thumbnail metadata only. It does not need a YouTube API key and does not embed an iframe player.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
