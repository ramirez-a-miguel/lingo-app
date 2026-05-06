import Link from "next/link";
import { Clock, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageVideo } from "@/lib/videos";

type VideoCardProps = {
  video: LanguageVideo;
};

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/watch/${video.id}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <Card className="overflow-hidden border-0 bg-white shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
        <div className="relative aspect-video bg-[linear-gradient(135deg,#12615a_0%,#2c7a71_42%,#f2b84b_100%)] p-4 text-white">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <Badge className="border-white/20 bg-white/15 text-white">{video.language}</Badge>
              <span className="rounded-md bg-black/55 px-2 py-1 text-xs font-semibold">{video.duration}</span>
            </div>
            <div>
              <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                <Play className="ml-0.5 size-5 fill-current" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/80">{video.level}</p>
              <h3 className="line-clamp-2 text-xl font-bold leading-tight">{video.title}</h3>
            </div>
          </div>
        </div>
        <CardContent className="space-y-3 p-4">
          <div>
            <p className="text-sm font-semibold text-foreground">{video.channel}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              {video.views} views • {video.published}
            </p>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{video.goal}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
