import { NextResponse } from "next/server";

import { searchYouTubeLanguageVideos } from "@/lib/youtube";
import { languageFilters } from "@/lib/videos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const requestedLanguage = searchParams.get("language") ?? "All";
  const pageToken = searchParams.get("pageToken") ?? undefined;
  const language = languageFilters.includes(requestedLanguage as (typeof languageFilters)[number])
    ? requestedLanguage
    : "All";

  const result = await searchYouTubeLanguageVideos({
    query,
    language,
    pageToken,
  });

  return NextResponse.json(result, { status: result.error ? 503 : 200 });
}
