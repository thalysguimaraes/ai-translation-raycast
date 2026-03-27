<p align="center">
  <img src="assets/extension-icon.png" width="128" alt="AI Translate Icon" />
</p>

# AI Translate for Raycast

Translate text between languages using Claude AI, right from Raycast.

## Features

- **Translate Text** — type or paste text, pick source and target languages
- **Translate Clipboard** — auto-grabs clipboard content
- **Auto-detect** source language
- **10 languages** — English, Portuguese (BR), Spanish, French, German, Italian, Japanese, Korean, Chinese, Russian
- **Smart caching** — repeated translations are instant
- **Remembers** your last target language across sessions

## Install

```bash
git clone https://github.com/thalysguimaraes/ai-translation-raycast.git
cd ai-translation-raycast
npm install && npm run build
```

Then import into Raycast: Preferences > Extensions > `+` > Import Extension > select the folder. On first run, Raycast will prompt for your Anthropic API key.

## Commands

| Command | Description | Hotkey |
|---------|-------------|--------|
| Translate Text | Manual text input with language selection | `Alt T` |
| Translate Clipboard | Pre-fills with clipboard content | `Alt Shift T` |

Powered by Claude Haiku (`claude-haiku-4-5`).

## License

MIT
