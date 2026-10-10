// Swappable AI provider. Configure with environment variables (see .env.example).
const PROVIDER = (process.env.AI_PROVIDER || 'none').toLowerCase();
const API_KEY = process.env.AI_API_KEY || '';
const MODEL = process.env.AI_MODEL || 'claude-haiku-5-5';
const BASE_URL = (process.env.AI_BASE_URL || '').replace(/\/$/, '');

export function aiEnabled() {
  if (!API_KEY) return false;
  if (PROVIDER === 'anthropic') return true;
  if (PROVIDER === 'openai') return Boolean(BASE_URL);
  return false;
}

async function postJson(url, headers, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60000)
  });
  if (!res.ok) {
    const detail = (await res.text()).slice(0, 300);
    console.error(`AI provider error ${res.status}: ${detail}`);
    throw new Error('provider_error');
  }
  return res.json();
}

export async function complete(system, messages) {
  if (PROVIDER === 'anthropic') {
    const data = await postJson(
      'https://api.anthropic.com/v1/messages',
      { 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01' },
      { model: MODEL, max_tokens: 900, system, messages }
    );
    return (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n');
  }
  if (PROVIDER === 'openai') {
    const data = await postJson(
      `${BASE_URL}/chat/completions`,
      { authorization: `Bearer ${API_KEY}` },
      { model: MODEL, max_tokens: 900, messages: [{ role: 'system', content: system }, ...messages] }
    );
    return data.choices?.[0]?.message?.content || '';
  }
  throw new Error('ai_disabled');
}
