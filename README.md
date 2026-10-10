# guia-visto-b1b2

Multilingual web app (installable on phones as a PWA) that helps people prepare for the **US B1/B2 visitor visa**:

- Process overview, step by step
- DS-160 companion: tracks each section (the user fills the form on the official site, never here)
- Interview practice with AI feedback
- Trip planner with deep links to flight, hotel and tour searches
- Official sources page
- Specialist team chat (simulated perspectives: consular, documents, DS-160, travel, immigration awareness)

13 languages in the UI: pt, en, es, fr, de, it, ar (RTL), hi, zh, ja, ko, ru, tr. The AI answers in the selected language.

> Educational tool. It is not the US government, a consulate or a law firm, and never guarantees approval.
> It never asks for passwords, full passport/ID numbers, card data or the DS-160 confirmation code, and stores nothing on the server (the checklist lives in the browser).

## Run locally

```bash
npm install
npm start        # http://localhost:3000
```

Without any key the app works (checklists, questions, links). AI features turn on when configured.

## AI configuration (cost control)

Set variables (see `.env.example`). Never commit keys.

| Variable | Purpose |
|---|---|
| `AI_PROVIDER` | `anthropic`, `openai` (any OpenAI-compatible API such as Groq/OpenRouter) or `none` |
| `AI_API_KEY` | provider key |
| `AI_MODEL` | model name; use a small, cheap one |
| `AI_BASE_URL` | only for `openai`, e.g. `https://api.groq.com/openai/v1` |
| `DAILY_LIMIT` | AI requests per visitor per day (default 20) |

## Deploy on Railway

1. Railway > New Project > Deploy from GitHub repo > `guia-visto-b1b2` (choose the branch to deploy).
2. Add the variables above in Service > Variables.
3. Settings > Networking > Generate Domain. Open it on your phone and use "Add to Home Screen".

Railway detects Node and runs `npm start`.

## Roadmap

- Live web research through the AI provider's search tool, with source links and verification date
- Price alerts for flights, hotels and tours (scheduled job + email/push) through partner APIs
- Real itinerary search through partner/affiliate APIs (no scraping)
- More languages and translated educational content (non-pt/en/es content falls back to English today)
- Per-consulate guidance built only from official embassy pages

## Not in scope, by design

- Automating the official DS-160 site or any consular portal
- Promising approval or probabilities
- Scraping sites that forbid it
