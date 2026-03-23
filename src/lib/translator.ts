import Anthropic from "@anthropic-ai/sdk";
import {
  MODEL_ID,
  MAX_TOKENS,
  SYSTEM_PROMPT,
  buildUserPrompt,
} from "./constants.js";

export interface TranslationRequest {
  text: string;
  fromLanguage: string;
  toLanguage: string;
}

export interface TranslationResult {
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
  originalText: string;
}

export async function translate(
  apiKey: string,
  request: TranslationRequest,
): Promise<TranslationResult> {
  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: MODEL_ID,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildUserPrompt(
          request.text,
          request.fromLanguage,
          request.toLanguage,
        ),
      },
    ],
  });

  const translatedText = message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  return {
    translatedText,
    fromLanguage: request.fromLanguage,
    toLanguage: request.toLanguage,
    originalText: request.text,
  };
}
