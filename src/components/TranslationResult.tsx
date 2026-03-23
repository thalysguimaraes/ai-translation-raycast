import { Detail, ActionPanel, Action, useNavigation } from "@raycast/api";
import type { TranslationResult } from "../lib/translator.js";

interface Props {
  result: TranslationResult;
}

export default function TranslationResultView({ result }: Props) {
  const { pop } = useNavigation();

  const markdown = [
    result.translatedText,
    "",
    "---",
    "",
    `> ${result.originalText.split("\n").join("\n> ")}`,
  ].join("\n");

  return (
    <Detail
      markdown={markdown}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="From" text={result.fromLanguage} />
          <Detail.Metadata.Label title="To" text={result.toLanguage} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label
            title="Characters"
            text={`${result.originalText.length} → ${result.translatedText.length}`}
          />
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <Action.CopyToClipboard
            title="Copy Translation"
            content={result.translatedText}
          />
          <Action.Paste
            title="Paste to Active App"
            content={result.translatedText}
          />
          <Action
            title="Translate Again"
            shortcut={{ modifiers: ["cmd"], key: "n" }}
            onAction={pop}
          />
        </ActionPanel>
      }
    />
  );
}
