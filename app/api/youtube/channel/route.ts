import { NextResponse } from "next/server";

import { type LanguageFilter, getChannelForLanguage, languageFilters } from "@/lib/videos";
import { getYouTubeChannelVideos } from "@/lib/youtube-channel";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedLanguage = searchParams.get("language") ?? "All";
  const language = languageFilters.includes(requestedLanguage as LanguageFilter)
    ? (requestedLanguage as LanguageFilter)
    : "All";
  const channel = getChannelForLanguage(language);

  if (!channel) {
    return NextResponse.json({ videos: [] });
  }

  const result = await getYouTubeChannelVideos(channel);
  return NextResponse.json(result, { status: result.error ? 503 : 200 });
}
