export const MODEL_ID = "claude-haiku-4-5-20251001";

export const MAX_TOKENS = 4096;

export const SYSTEM_PROMPT =
  "You are a professional translator. Translate the given text accurately and naturally. Preserve the original tone, style, and formatting. Only return the translated text without any explanation, preamble, or commentary.";

export function buildUserPrompt(
  text: string,
  fromLang: string,
  toLang: string,
): string {
  const fromClause =
    fromLang === "auto" || fromLang === "Auto-detect"
      ? "Detect the source language automatically"
      : `The source language is ${fromLang}`;

  return `${fromClause}. Translate the following text to ${toLang}:\n\n${text}`;
}

export const CACHE_KEY_LAST_TARGET = "lastTargetLanguage";
export const CACHE_KEY_TRANSLATIONS = "recentTranslations";
export const MAX_CACHED_TRANSLATIONS = 20;
