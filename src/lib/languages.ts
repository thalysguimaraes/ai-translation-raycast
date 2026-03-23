export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt-br", name: "Portuguese (BR)", flag: "🇧🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
];

export const AUTO_DETECT: Language = {
  code: "auto",
  name: "Auto-detect",
  flag: "🌐",
};

export function getLanguageByCode(code: string): Language | undefined {
  if (code === "auto") return AUTO_DETECT;
  return LANGUAGES.find((l) => l.code === code);
}
