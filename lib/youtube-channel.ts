import type { LanguageChannel, LanguageVideo } from "@/lib/videos";

type ChannelFeedResult = {
  videos: LanguageVideo[];
  error?: string;
};

const rssUrlPattern = /<link[^>]+type="application\/rss\+xml"[^>]+href="([^"]+)"/;
const channelIdPattern = /"channelId":"(UC[a-zA-Z0-9_-]+)"/;
const entryPattern = /<entry>([\s\S]*?)<\/entry>/g;

function decodeXml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getXmlValue(entry: string, tag: string) {
  const match = entry.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return match ? decodeXml(match[1].trim()) : "";
}

function getVideoId(entry: string) {
  const id = getXmlValue(entry, "yt:videoId");
  if (id) {
    return id;
  }

  const linkMatch = entry.match(/<link[^>]+href="https:\/\/www\.youtube\.com\/watch\?v=([^"&]+)"/);
  return linkMatch?.[1] ?? "";
}

function getPublishedLabel(value: string) {
  if (!value) {
    return "YouTube";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

async function resolveChannelFeedUrl(channelUrl: string) {
  const response = await fetch(channelUrl, {
    headers: {
      "user-agent": "Mozilla/5.0 LingoStream Channel Resolver",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load the YouTube channel page.");
  }

  const html = await response.text();
  const rssUrl = html.match(rssUrlPattern)?.[1];
  if (rssUrl) {
    return decodeXml(rssUrl);
  }

  const channelId = html.match(channelIdPattern)?.[1];
  if (channelId) {
    return `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  }

  throw new Error("Could not find a public YouTube feed for this channel.");
}

export async function getYouTubeChannelVideos(channel: LanguageChannel): Promise<ChannelFeedResult> {
  try {
    const feedUrl = await resolveChannelFeedUrl(channel.url);
    const response = await fetch(feedUrl, {
      next: {
        revalidate: 900,
      },
    });

    if (!response.ok) {
      throw new Error("Could not load the YouTube channel feed.");
    }

    const xml = await response.text();
    const videos: LanguageVideo[] = [];

    for (const match of xml.matchAll(entryPattern)) {
      const entry = match[1];
      const youtubeId = getVideoId(entry);
      const title = getXmlValue(entry, "title");
      const published = getXmlValue(entry, "published");

      if (!youtubeId || !title) {
        continue;
      }

      videos.push({
        id: `${channel.language.toLowerCase()}-${youtubeId}`,
        title,
        channel: channel.channel,
        channelUrl: channel.url,
        language: channel.language,
        level: "Beginner",
        duration: "YouTube",
        views: "Channel",
        published: getPublishedLabel(published),
        accent: channel.language,
        goal: `Latest ${channel.language} lesson from ${channel.channel}.`,
        youtubeId,
        sourceUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
        tags: ["channel", "listening", channel.language.toLowerCase()],
      });
    }

    return { videos };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Could not load YouTube channel videos.",
      videos: [],
    };
  }
}
