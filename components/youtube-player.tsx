import Image from "next/image";

import { Play } from "@/components/animated-icons";
import type { LanguageVideo } from "@/lib/videos";

type YouTubePlayerProps = {
  video: LanguageVideo;
};

export function YouTubePlayer({ video }: YouTubePlayerProps) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border border-outline-variant bg-surface-lowest shadow-[0_24px_90px_rgba(68,143,255,0.16)]">
      <Image src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-background/20" />
      <div className="absolute bottom-5 left-5 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Play className="animated-icon ml-0.5 size-5 fill-current" />
        </div>
        <div>
          <p className="m3-type-label-small text-primary">Channel preview</p>
          <p className="text-sm font-semibold text-white">{video.channel}</p>
        </div>
      </div>
    </div>
  );
}
