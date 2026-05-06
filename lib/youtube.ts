import type { LanguageLevel } from "@/lib/videos";

export type YouTubeSearchVideo = {
  id: string;
  title: string;
  channel: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  language: string;
  level: LanguageLevel;
  sourceUrl: string;
};

type YouTubeSearchItem = {
  id?: {
    videoId?: string;
  };
  snippet?: {
    title?: string;
    description?: string;
    channelTitle?: string;
    publishedAt?: string;
    thumbnails?: {
      high?: {
        url?: string;
      };
      medium?: {
        url?: string;
      };
      default?: {
        url?: string;
      };
    };
  };
};

type YouTubeSearchResponse = {
  nextPageToken?: string;
  items?: YouTubeSearchItem[];
  error?: {
    message?: string;
  };
};

const languageCodeByName: Record<string, string> = {
  English: "en",
  Spanish: "es",
  Dutch: "nl",
  Italian: "it",
  Japanese: "ja",
};

export function buildLanguageSearchQuery(query: string, language: string) {
  const baseQuery = query.trim() || "beginner conversation";
  const languageTerm = language === "All" ? "language learning" : `learn ${language}`;
  return `${baseQuery} ${languageTerm} lesson listening practice subtitles`;
}

export async function searchYouTubeLanguageVideos({
  query,
  language,
  pageToken,
}: {
  query: string;
  language: string;
  pageToken?: string;
}) {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return {
      error: "Add YOUTUBE_API_KEY to enable live YouTube search.",
      videos: [] as YouTubeSearchVideo[],
    };
  }

  const params = new URLSearchParams({
    part: "snippet",
    type: "video",
    maxResults: "12",
    safeSearch: "strict",
    videoEmbeddable: "true",
    q: buildLanguageSearchQuery(query, language),
    key: apiKey,
  });

  const relevanceLanguage = languageCodeByName[language];
  if (relevanceLanguage) {
    params.set("relevanceLanguage", relevanceLanguage);
  }

  if (pageToken) {
    params.set("pageToken", pageToken);
  }

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`, {
    next: {
      revalidate: 300,
    },
  });
  const data = (await response.json()) as YouTubeSearchResponse;

  if (!response.ok) {
    return {
      error: data.error?.message ?? "YouTube search failed.",
      videos: [] as YouTubeSearchVideo[],
    };
  }

  return {
    nextPageToken: data.nextPageToken,
    videos:
      data.items
        ?.filter((item) => item.id?.videoId && item.snippet)
        .map((item) => {
          const videoId = item.id?.videoId ?? "";
          const snippet = item.snippet;

          return {
            id: videoId,
            title: snippet?.title ?? "Untitled language lesson",
            channel: snippet?.channelTitle ?? "YouTube",
            description: snippet?.description ?? "",
            thumbnailUrl:
              snippet?.thumbnails?.high?.url ??
              snippet?.thumbnails?.medium?.url ??
              snippet?.thumbnails?.default?.url ??
              `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            publishedAt: snippet?.publishedAt ?? "",
            language: language === "All" ? "Language" : language,
            level: "Beginner" as const,
            sourceUrl: `https://www.youtube.com/watch?v=${videoId}`,
          };
        }) ?? [],
  };
}
