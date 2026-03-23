import {
  Form,
  ActionPanel,
  Action,
  showToast,
  Toast,
  getPreferenceValues,
  useNavigation,
} from "@raycast/api";
import { useState, useEffect } from "react";
import { LANGUAGES, AUTO_DETECT, getLanguageByCode } from "../lib/languages.js";
import { translate } from "../lib/translator.js";
import {
  getCachedTranslation,
  cacheTranslation,
  getLastTargetLanguage,
  setLastTargetLanguage,
} from "../lib/cache.js";
import TranslationResultView from "./TranslationResult.js";

interface Preferences {
  apiKey: string;
  defaultTargetLanguage?: string;
}

interface TranslateFormProps {
  initialText?: string;
}

export default function TranslateForm({
  initialText = "",
}: TranslateFormProps) {
  const { push } = useNavigation();
  const preferences = getPreferenceValues<Preferences>();

  const [text, setText] = useState(initialText);
  const [fromLang, setFromLang] = useState("auto");
  const [toLang, setToLang] = useState(
    preferences.defaultTargetLanguage ?? "en",
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getLastTargetLanguage().then((lastLang) => {
      if (lastLang) setToLang(lastLang);
    });
  }, []);

  async function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Please enter text to translate",
      });
      return;
    }

    setIsLoading(true);
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Translating...",
    });

    const fromName =
      fromLang === "auto" ? "Auto-detect" : getLanguageByCode(fromLang)!.name;
    const toName = getLanguageByCode(toLang)!.name;

    try {
      const cached = await getCachedTranslation(trimmed, fromName, toName);
      if (cached) {
        toast.style = Toast.Style.Success;
        toast.title = "Translation ready";
        await setLastTargetLanguage(toLang);
        push(<TranslationResultView result={cached} />);
        setIsLoading(false);
        return;
      }

      const result = await translate(preferences.apiKey, {
        text: trimmed,
        fromLanguage: fromName,
        toLanguage: toName,
      });

      await cacheTranslation(result);
      await setLastTargetLanguage(toLang);

      toast.style = Toast.Style.Success;
      toast.title = "Translation complete";

      push(<TranslationResultView result={result} />);
    } catch (error) {
      toast.style = Toast.Style.Failure;
      toast.title = "Translation failed";
      toast.message = error instanceof Error ? error.message : "Unknown error";
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Translate" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="text"
        title="Text"
        placeholder="Enter text to translate..."
        value={text}
        onChange={setText}
      />
      <Form.Dropdown
        id="fromLang"
        title="From"
        value={fromLang}
        onChange={setFromLang}
      >
        <Form.Dropdown.Item
          key={AUTO_DETECT.code}
          value={AUTO_DETECT.code}
          title={`${AUTO_DETECT.flag}  ${AUTO_DETECT.name}`}
        />
        {LANGUAGES.map((lang) => (
          <Form.Dropdown.Item
            key={lang.code}
            value={lang.code}
            title={`${lang.flag}  ${lang.name}`}
          />
        ))}
      </Form.Dropdown>
      <Form.Dropdown id="toLang" title="To" value={toLang} onChange={setToLang}>
        {LANGUAGES.map((lang) => (
          <Form.Dropdown.Item
            key={lang.code}
            value={lang.code}
            title={`${lang.flag}  ${lang.name}`}
          />
        ))}
      </Form.Dropdown>
    </Form>
  );
}
