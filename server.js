import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSystemPrompt, KNOWN_LANGS, KNOWN_MODES } from './src/prompt.js';
import { aiEnabled, complete } from './src/provider.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const DAILY_LIMIT = Number(process.env.DAILY_LIMIT || 20);
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

app.set('trust proxy', 1);
app.use(express.json({ limit: '50kb' }));

// Simple in-memory daily limiter per IP (resets on restart). Caps AI cost.
const usage = new Map();
function allowed(ip) {
  const day = new Date().toISOString().slice(0, 10);
  const entry = usage.get(ip);
  if (!entry || entry.day !== day) {
    usage.set(ip, { day, count: 1 });
    return true;
  }
  if (entry.count >= DAILY_LIMIT) return false;
  entry.count += 1;
  return true;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ai: aiEnabled() });
});

app.post('/api/chat', async (req, res) => {
  if (!aiEnabled()) return res.status(503).json({ error: 'ai_disabled' });
  const { mode = 'chat', lang = 'en', messages } = req.body || {};
  if (!KNOWN_MODES.includes(mode) || !KNOWN_LANGS.includes(lang)) {
    return res.status(400).json({ error: 'bad_request' });
  }
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: 'bad_request' });
  }
  const clean = [];
  for (const m of messages) {
    if (!m || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string') {
      return res.status(400).json({ error: 'bad_request' });
    }
    clean.push({ role: m.role, content: m.content.slice(0, MAX_CHARS) });
  }
  if (clean[0].role !== 'user' || clean[clean.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'bad_request' });
  }
  if (!allowed(req.ip)) return res.status(429).json({ error: 'daily_limit' });

  try {
    const reply = await complete(buildSystemPrompt(mode, lang), clean);
    res.json({ reply });
  } catch {
    res.status(502).json({ error: 'provider_error' });
  }
});

app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`guia-visto-b1b2 listening on ${port} (ai: ${aiEnabled()})`));
