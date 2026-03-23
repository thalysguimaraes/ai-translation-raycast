<p align="center">
  <img src="assets/extension-icon.png" width="128" alt="AI Translate Icon" />
</p>
<h1 align="center">AI Translate for Raycast</h1>
<p align="center">Translate text between languages using Claude AI, right from Raycast.</p>

## Features

- **Translate Text** — Type or paste text, pick source and target languages, get an instant translation
- **Translate Clipboard** — Automatically grabs your clipboard content and pre-fills the form
- **Auto-detect** source language by default
- **10 languages** supported: English, Portuguese (BR), Spanish, French, German, Italian, Japanese, Korean, Chinese, Russian
- **Smart caching** — repeated translations are instant
- **Remembers** your last target language across sessions

## Setup

### Prerequisites

- [Raycast](https://raycast.com) installed
- [Node.js](https://nodejs.org) (v18+)
- An [Anthropic API key](https://console.anthropic.com/settings/keys)

### Install

```bash
git clone https://github.com/thalysguimaraes/ai-translation-raycast.git
cd ai-translation-raycast
npm install
npm run build
```

### Import into Raycast

1. Open Raycast
2. Go to **Preferences** → **Extensions**
3. Click `+` → **Import Extension**
4. Select the `ai-translation-raycast` folder
5. On first run, Raycast will prompt you for your **Anthropic API key**

### Development

```bash
npm run dev    # Hot-reload dev server
npm run lint   # Check for issues
```

## Commands

| Command | Description | Suggested Hotkey |
|---------|-------------|-----------------|
| Translate Text | Manual text input with language selection | `⌥ T` |
| Translate Clipboard | Pre-fills with clipboard content | `⌥ ⇧ T` |

## How it works

Translations are powered by **Claude Haiku** (`claude-haiku-4-5`), which provides fast, high-quality translations at low cost. The extension sends your text to the Anthropic API and displays the result in a detail view with copy/paste actions.

All translations are cached locally so repeated requests are instant. Your last-used target language is remembered across sessions.

## Configuration

| Preference | Description | Default |
|------------|-------------|---------|
| Anthropic API Key | Required. Your API key from [console.anthropic.com](https://console.anthropic.com) | — |
| Default Target Language | The language to translate into by default | English |

## License

MIT
