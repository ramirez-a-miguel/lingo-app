import type { LanguageFilter } from "@/lib/videos";

export type LanguageInsight = {
  language: Exclude<LanguageFilter, "All">;
  flag: string;
  region: string;
  wikipediaTopic: string;
  resources: Array<{
    label: string;
    url: string;
  }>;
  languageSummary: string;
  cultureSummary: string;
  historySummary: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
};

export const languageInsights: LanguageInsight[] = [
  {
    language: "Spanish",
    flag: "🇪🇸",
    region: "Spain, Hispanic America, Equatorial Guinea",
    wikipediaTopic: "Spanish language / Culture of Spain",
    resources: [
      { label: "Spanish language", url: "https://en.wikipedia.org/wiki/Spanish_language" },
      { label: "Culture of Spain", url: "https://en.wikipedia.org/wiki/Culture_of_Spain" },
      { label: "History of Spain", url: "https://en.wikipedia.org/wiki/History_of_Spain" },
    ],
    languageSummary:
      "Spanish is a Romance language that evolved from Vulgar Latin on the Iberian Peninsula and originated around the Kingdom of Castile.",
    cultureSummary:
      "Spanish culture is multilingual and regional, with Catalan, Basque, and Galician coexisting alongside Castilian Spanish in several autonomous communities.",
    historySummary:
      "Castilian expanded from north-central Spain and became a global language through Spain's imperial and literary history.",
    stats: [
      { label: "Family", value: "Romance" },
      { label: "Native speakers", value: "519M+" },
      { label: "Official reach", value: "20 countries" },
    ],
  },
  {
    language: "Dutch",
    flag: "🇳🇱",
    region: "Netherlands, Belgium, Suriname, Caribbean Netherlands",
    wikipediaTopic: "Dutch language / Culture of the Netherlands",
    resources: [
      { label: "Dutch language", url: "https://en.wikipedia.org/wiki/Dutch_language" },
      { label: "Culture of the Netherlands", url: "https://en.wikipedia.org/wiki/Culture_of_the_Netherlands" },
      { label: "History of the Netherlands", url: "https://en.wikipedia.org/wiki/History_of_the_Netherlands" },
    ],
    languageSummary:
      "Dutch is a West Germanic, Low Franconian language that originated in the Early Middle Ages and was standardized in the 16th century.",
    cultureSummary:
      "Dutch culture reflects strong regional identities and centuries of mercantile, exploratory, liberal, and tolerant traditions.",
    historySummary:
      "The Dutch Golden Age is widely treated as a high point of Dutch cultural, maritime, artistic, and commercial influence.",
    stats: [
      { label: "Family", value: "West Germanic" },
      { label: "Standardized", value: "16th c." },
      { label: "Culture peak", value: "Golden Age" },
    ],
  },
  {
    language: "Japanese",
    flag: "🇯🇵",
    region: "Japan and Japanese diaspora",
    wikipediaTopic: "Japanese language / Culture of Japan",
    resources: [
      { label: "Japanese language", url: "https://en.wikipedia.org/wiki/Japanese_language" },
      { label: "Culture of Japan", url: "https://en.wikipedia.org/wiki/Culture_of_Japan" },
      { label: "History of Japan", url: "https://en.wikipedia.org/wiki/History_of_Japan" },
    ],
    languageSummary:
      "Japanese is the principal Japonic language, with topic-comment structure, particles, honorifics, and a pitch-accent system.",
    cultureSummary:
      "Japanese culture has long blended local traditions with influences from China, Buddhism, literature, visual arts, and modern popular culture.",
    historySummary:
      "Old Japanese is known mainly from 8th-century texts, while modern writing combines kanji with hiragana and katakana.",
    stats: [
      { label: "Family", value: "Japonic" },
      { label: "Speakers", value: "123M+" },
      { label: "Scripts", value: "3 systems" },
    ],
  },
  {
    language: "Italian",
    flag: "🇮🇹",
    region: "Italy, San Marino, Vatican City, Switzerland",
    wikipediaTopic: "Italian language / Culture of Italy",
    resources: [
      { label: "Italian language", url: "https://en.wikipedia.org/wiki/Italian_language" },
      { label: "Culture of Italy", url: "https://en.wikipedia.org/wiki/Culture_of_Italy" },
      { label: "History of Italy", url: "https://en.wikipedia.org/wiki/History_of_Italy" },
    ],
    languageSummary:
      "Italian is a Romance language descended from Vulgar Latin and strongly shaped by Tuscan and Florentine literary prestige.",
    cultureSummary:
      "Italian culture is central to Western civilization, with major influence through Rome, Catholicism, the Renaissance, opera, art, fashion, and cuisine.",
    historySummary:
      "The Tuscan literary tradition associated with Dante, Petrarch, and Boccaccio became a foundation for standard Italian after unification.",
    stats: [
      { label: "Family", value: "Romance" },
      { label: "Speakers", value: "68-85M" },
      { label: "Literary base", value: "Tuscan" },
    ],
  },
  {
    language: "English",
    flag: "🇬🇧",
    region: "United Kingdom, Anglosphere, global second language",
    wikipediaTopic: "English language / Culture of England",
    resources: [
      { label: "English language", url: "https://en.wikipedia.org/wiki/English_language" },
      { label: "Culture of England", url: "https://en.wikipedia.org/wiki/Culture_of_England" },
      { label: "History of England", url: "https://en.wikipedia.org/wiki/History_of_England" },
    ],
    languageSummary:
      "English is a West Germanic language that developed from Old English, Middle English, and Early Modern English.",
    cultureSummary:
      "English culture has been shaped by Anglo-Saxon origins, the Norman conquest, Christianity, immigration, and its position in the Anglosphere.",
    historySummary:
      "English spread globally through the British Empire, print, broadcasting, the internet, and later the worldwide influence of the United States.",
    stats: [
      { label: "Family", value: "West Germanic" },
      { label: "Global role", value: "Lingua franca" },
      { label: "Major shift", value: "Great Vowel Shift" },
    ],
  },
];
