export type LanguageLevel = "Beginner" | "Elementary" | "Intermediate" | "Advanced";

export type LanguageVideo = {
  id: string;
  title: string;
  channel: string;
  channelUrl: string;
  language: string;
  level: LanguageLevel;
  duration: string;
  views: string;
  published: string;
  accent: string;
  goal: string;
  youtubeId: string;
  sourceUrl: string;
  tags: string[];
};

export const languageFilters = ["All", "Spanish", "Dutch", "Japanese", "Italian", "English"] as const;
export type LanguageFilter = (typeof languageFilters)[number];
export type LanguageChannel = {
  language: Exclude<LanguageFilter, "All">;
  channel: string;
  handle: string;
  url: string;
};

export const languageChannels: Record<Exclude<LanguageFilter, "All">, LanguageChannel> = {
  Spanish: {
    language: "Spanish",
    channel: "EspaTalks",
    handle: "@EspaTalks",
    url: "https://www.youtube.com/@EspaTalks/videos",
  },
  Dutch: {
    language: "Dutch",
    channel: "lingrama",
    handle: "@lingrama",
    url: "https://www.youtube.com/@lingrama/videos",
  },
  Japanese: {
    language: "Japanese",
    channel: "StoryTalks Japanese",
    handle: "@StoryTalksJapanese",
    url: "https://www.youtube.com/@StoryTalksJapanese/videos",
  },
  Italian: {
    language: "Italian",
    channel: "Epic Italian Journey",
    handle: "@EpicItalianJourney",
    url: "https://www.youtube.com/@EpicItalianJourney/videos",
  },
  English: {
    language: "English",
    channel: "BBC Learning English",
    handle: "@bbclearningenglish",
    url: "https://www.youtube.com/@bbclearningenglish/videos",
  },
};

export function getChannelForLanguage(language: LanguageFilter) {
  return language === "All" ? null : languageChannels[language];
}

export const videos: LanguageVideo[] = [
  {
    id: "spanish-a1-food",
    title: "Spanish for Food Orders: A1 Listening Practice",
    channel: "EspaTalks",
    channelUrl: languageChannels.Spanish.url,
    language: "Spanish",
    level: "Beginner",
    duration: "12:44",
    views: "19K",
    published: "3 months ago",
    accent: "Latin America",
    goal: "Order coffee, ask prices, and answer short questions.",
    youtubeId: "RdVkYS4WcwE",
    sourceUrl: "https://www.youtube.com/@EspaTalks/videos",
    tags: ["listening", "dialogues", "travel"],
  },
  {
    id: "dutch-a1-story",
    title: "Slow Dutch Story for Beginners: A1/A2 Listening Practice",
    channel: "lingrama",
    channelUrl: languageChannels.Dutch.url,
    language: "Dutch",
    level: "Beginner",
    duration: "A1-A2",
    views: "2K",
    published: "5 months ago",
    accent: "Netherlands",
    goal: "Build Dutch listening comprehension with a clear slow story.",
    youtubeId: "NLrrPkxCqKY",
    sourceUrl: "https://www.youtube.com/@lingrama/videos",
    tags: ["listening", "story", "subtitles"],
  },
  {
    id: "dutch-a2-dialogues",
    title: "50 Easy Dutch Conversations for Beginners",
    channel: "Easy Dutch Conversations",
    channelUrl: "https://www.youtube.com/@EasyDutchConversations/videos",
    language: "Dutch",
    level: "Elementary",
    duration: "70:00",
    views: "15K",
    published: "2 months ago",
    accent: "Netherlands",
    goal: "Practice practical Dutch conversations for travel, shops, restaurants, and daily life.",
    youtubeId: "JrmCu54sYOE",
    sourceUrl: "https://www.youtube.com/watch?v=JrmCu54sYOE",
    tags: ["dialogues", "travel", "speaking"],
  },
  {
    id: "japanese-n5-train",
    title: "Japanese N5 Train Station Dialogues",
    channel: "StoryTalks Japanese",
    channelUrl: languageChannels.Japanese.url,
    language: "Japanese",
    level: "Beginner",
    duration: "20:00",
    views: "244",
    published: "Last month",
    accent: "Tokyo",
    goal: "Ask for platforms, arrival times, and destinations.",
    youtubeId: "SX27RZqKOxk",
    sourceUrl: "https://www.youtube.com/@StoryTalksJapanese/videos",
    tags: ["n5", "travel", "dialogues"],
  },
  {
    id: "italian-a2-family",
    title: "Easy Italian Story: A1 Listening Practice",
    channel: "Epic Italian Journey",
    channelUrl: languageChannels.Italian.url,
    language: "Italian",
    level: "Beginner",
    duration: "15:40",
    views: "13K",
    published: "2 months ago",
    accent: "Florence",
    goal: "Build simple Italian listening comprehension through a story.",
    youtubeId: "8GGqGbI0ChM",
    sourceUrl: "https://www.youtube.com/watch?v=8GGqGbI0ChM",
    tags: ["story", "listening", "subtitles"],
  },
  {
    id: "english-b2-work",
    title: "Master Small Talk in English Conversations",
    channel: "BBC Learning English",
    channelUrl: languageChannels.English.url,
    language: "English",
    level: "Intermediate",
    duration: "32:00",
    views: "B2",
    published: "Curated",
    accent: "US",
    goal: "Sound natural in updates, blockers, and team decisions.",
    youtubeId: "U1M7XpL72LU",
    sourceUrl: "https://www.youtube.com/watch?v=U1M7XpL72LU",
    tags: ["small talk", "speaking", "listening"],
  },
];

export function getVideoById(id: string) {
  return videos.find((video) => video.id === id) ?? videos[0];
}

export function getRelatedVideos(video: LanguageVideo) {
  return videos.filter((candidate) => candidate.id !== video.id && candidate.language === video.language).concat(
    videos.filter((candidate) => candidate.id !== video.id && candidate.language !== video.language).slice(0, 3),
  );
}
