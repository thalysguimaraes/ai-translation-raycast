import { Clipboard, Detail } from "@raycast/api";
import { useState, useEffect } from "react";
import TranslateForm from "./components/TranslateForm.js";

export default function TranslateClipboardCommand() {
  const [clipboardText, setClipboardText] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    Clipboard.readText().then((text) => {
      setClipboardText(text ?? "");
    });
  }, []);

  if (clipboardText === undefined) {
    return <Detail isLoading />;
  }

  return <TranslateForm initialText={clipboardText} />;
}
