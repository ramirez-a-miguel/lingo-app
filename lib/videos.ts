export type LanguageLevel = "Beginner" | "Elementary" | "Intermediate" | "Advanced";

export type LanguageVideo = {
  id: string;
  title: string;
  channel: string;
  language: string;
  level: LanguageLevel;
  duration: string;
  views: string;
  published: string;
  accent: string;
  goal: string;
  youtubeId: string;
  tags: string[];
};

export const languageFilters = ["All", "Spanish", "French", "German", "Japanese", "Italian", "English"] as const;

export const videos: LanguageVideo[] = [
  {
    id: "spanish-a1-food",
    title: "Spanish for Food Orders: A1 Listening Practice",
    channel: "Lingo Tube Studio",
    language: "Spanish",
    level: "Beginner",
    duration: "12:44",
    views: "84K",
    published: "2 days ago",
    accent: "Mexico City",
    goal: "Order coffee, ask prices, and answer short questions.",
    youtubeId: "dQw4w9WgXcQ",
    tags: ["listening", "phrases", "travel"],
  },
  {
    id: "french-b1-market",
    title: "French Market Conversations with Slow Subtitles",
    channel: "Lingo Tube Studio",
    language: "French",
    level: "Intermediate",
    duration: "18:09",
    views: "61K",
    published: "1 week ago",
    accent: "Paris",
    goal: "Follow prices, preferences, and polite disagreement.",
    youtubeId: "ysz5S6PUM-U",
    tags: ["listening", "subtitles", "culture"],
  },
  {
    id: "german-a2-routine",
    title: "German Daily Routine: Separable Verbs in Context",
    channel: "Lingo Tube Studio",
    language: "German",
    level: "Elementary",
    duration: "15:20",
    views: "39K",
    published: "3 weeks ago",
    accent: "Berlin",
    goal: "Talk about morning routines and time expressions.",
    youtubeId: "jNQXAC9IVRw",
    tags: ["grammar", "verbs", "routine"],
  },
  {
    id: "japanese-n5-train",
    title: "Japanese N5 Train Station Dialogues",
    channel: "Lingo Tube Studio",
    language: "Japanese",
    level: "Beginner",
    duration: "10:31",
    views: "112K",
    published: "4 days ago",
    accent: "Tokyo",
    goal: "Ask for platforms, arrival times, and destinations.",
    youtubeId: "M7lc1UVf-VE",
    tags: ["n5", "travel", "dialogue"],
  },
  {
    id: "italian-a2-family",
    title: "Italian Family Stories for A2 Learners",
    channel: "Lingo Tube Studio",
    language: "Italian",
    level: "Elementary",
    duration: "16:03",
    views: "27K",
    published: "5 days ago",
    accent: "Florence",
    goal: "Describe family members, ages, jobs, and habits.",
    youtubeId: "aqz-KE-bpKQ",
    tags: ["story", "vocabulary", "speaking"],
  },
  {
    id: "english-b2-work",
    title: "English B2 Workplace Small Talk and Meetings",
    channel: "Lingo Tube Studio",
    language: "English",
    level: "Advanced",
    duration: "22:16",
    views: "143K",
    published: "Yesterday",
    accent: "US",
    goal: "Sound natural in updates, blockers, and team decisions.",
    youtubeId: "ScMzIvxBSi4",
    tags: ["business", "speaking", "listening"],
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
