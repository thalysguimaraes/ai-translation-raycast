import { LocalStorage } from "@raycast/api";
import {
  CACHE_KEY_TRANSLATIONS,
  MAX_CACHED_TRANSLATIONS,
  CACHE_KEY_LAST_TARGET,
} from "./constants.js";
import type { TranslationResult } from "./translator.js";

interface CacheEntry {
  key: string;
  result: TranslationResult;
  timestamp: number;
}

function makeCacheKey(text: string, from: string, to: string): string {
  return `${text.trim().substring(0, 200)}|${from}|${to}`;
}

export async function getCachedTranslation(
  text: string,
  from: string,
  to: string,
): Promise<TranslationResult | null> {
  try {
    const raw = await LocalStorage.getItem<string>(CACHE_KEY_TRANSLATIONS);
    if (!raw) return null;

    const entries: CacheEntry[] = JSON.parse(raw);
    const key = makeCacheKey(text, from, to);
    const found = entries.find((e) => e.key === key);
    return found?.result ?? null;
  } catch {
    return null;
  }
}

export async function cacheTranslation(
  result: TranslationResult,
): Promise<void> {
  try {
    const raw = await LocalStorage.getItem<string>(CACHE_KEY_TRANSLATIONS);
    const entries: CacheEntry[] = raw ? JSON.parse(raw) : [];

    const key = makeCacheKey(
      result.originalText,
      result.fromLanguage,
      result.toLanguage,
    );

    const filtered = entries.filter((e) => e.key !== key);
    filtered.unshift({ key, result, timestamp: Date.now() });

    const trimmed = filtered.slice(0, MAX_CACHED_TRANSLATIONS);
    await LocalStorage.setItem(CACHE_KEY_TRANSLATIONS, JSON.stringify(trimmed));
  } catch {
    // Cache write failure is non-critical
  }
}

export async function getLastTargetLanguage(): Promise<string | null> {
  return (await LocalStorage.getItem<string>(CACHE_KEY_LAST_TARGET)) ?? null;
}

export async function setLastTargetLanguage(code: string): Promise<void> {
  await LocalStorage.setItem(CACHE_KEY_LAST_TARGET, code);
}
