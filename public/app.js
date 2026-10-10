import { LANGS, RTL, UI } from './i18n.js';
import { STEPS, DS160, OFFICIAL_LINKS, DS160_URL, FAQ, PLAN } from './content.js';
import { viewInterview as viewInterviewModule } from './interview.js';

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
};

const guess = (navigator.language || 'en').slice(0, 2);
let lang = store.get('lang', LANGS[guess] ? guess : 'en');
let aiOn = false;
let chat = [];
let pendingChatPrefill = '';

const t = (k) => UI[lang]?.[k] ?? UI.en[k] ?? k;
const pick = (obj) => obj[lang] ?? obj.en;

function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) el.setAttribute(k, v);
  }
  for (const kid of kids.flat()) if (kid != null) el.append(kid.nodeType ? kid : document.createTextNode(kid));
  return el;
}

async function ask(mode, messages) {
  const res = await fetch('/api/chat', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ mode, lang, messages })
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 429) throw new Error(t('limit'));
  if (!res.ok) throw new Error(res.status === 503 ? t('noai') : t('err'));
  return data.reply;
}

const noAiBanner = () => null; // AI-only controls are hidden when the AI is off, so no banner is needed

/* ---------- views ---------- */
function viewHome() {
  return h('section', {},
    h('p', { class: 'lead' }, t('tagline')),
    h('p', { class: 'notice' }, t('disclaimer')),
    h('p', { class: 'notice' }, t('privacy')),
    h('h2', {}, t('steps_title')),
    h('ol', { class: 'steps' }, pick(STEPS).map((s) => h('li', {}, s)))
  );
}

function viewDs160() {
  const state = store.get('ds', {});
  const opts = ['pending', 'confirmed', 'doc', 'na'];
  return h('section', {},
    h('p', {}, t('ds_intro')),
    h('a', { class: 'btn', href: DS160_URL, target: '_blank', rel: 'noopener noreferrer' }, t('ds_open')),
    DS160.map((sec) => h('div', { class: 'card' },
      h('h3', {}, pick(sec.t)),
      h('p', {}, pick(sec.d)),
      h('label', {}, h('select', {
        onchange: (e) => { state[sec.id] = e.target.value; store.set('ds', state); }
      }, opts.map((o) => h('option', { value: o, selected: (state[sec.id] || 'pending') === o }, t('st_' + o))))),
      aiOn ? h('button', { class: 'link', onclick: () => {
        pendingChatPrefill = `DS-160: ${pick(sec.t)}`;
        location.hash = '#/chat';
      } }, t('ds_ask')) : null
    ))
  );
}

const viewInterview = () => viewInterviewModule({ h, store, ask, lang: () => lang, aiOn: () => aiOn });

function viewTravel() {
  const f = store.get('trip', { dest: '', from: '', to: '', n: 1, profile: 'value', budget: '' });
  const field = (key, type, label, extra = {}) => h('label', {}, label,
    h('input', { type, value: f[key], ...extra, oninput: (e) => { f[key] = e.target.value; store.set('trip', f); refreshLinks(); renderPlan(); } }));
  const profile = h('select', { onchange: (e) => { f.profile = e.target.value; store.set('trip', f); renderPlan(); } },
    ['value', 'luxury', 'family', 'adventure'].map((p) => h('option', { value: p, selected: f.profile === p }, t('prof_' + p))));
  const links = h('div', { class: 'row wrap' });
  const out = h('div', { class: 'reply' });
  function refreshLinks() {
    const d = encodeURIComponent(f.dest);
    links.replaceChildren();
    if (!f.dest.trim()) return;
    const mk = (label, url) => h('a', { class: 'btn secondary', href: url, target: '_blank', rel: 'noopener noreferrer' }, label);
    links.append(
      mk(t('tr_flights'), `https://www.google.com/travel/flights?q=${encodeURIComponent(`Flights to ${f.dest} ${f.from} ${f.to}`.trim())}`),
      mk(t('tr_hotels'), `https://www.booking.com/searchresults.html?ss=${d}&checkin=${f.from}&checkout=${f.to}&group_adults=${Number(f.n) || 1}`),
      mk(t('tr_tours'), `https://www.viator.com/searchResults/all?text=${d}`)
    );
  }
  refreshLinks();

  // Hand-filled plan template: saved only on this device.
  const L = pick(PLAN);
  const plan = store.get('plan', { days: {}, budget: {} });
  const planBox = h('div', {});
  const MS_DAY = 86400000;
  function tripDays() {
    const a = Date.parse(f.from), b = Date.parse(f.to);
    if (Number.isNaN(a) || Number.isNaN(b) || b < a) return { n: 3, start: null };
    return { n: Math.min(Math.round((b - a) / MS_DAY) + 1, 21), start: a };
  }
  function planText() {
    const { n, start } = tripDays();
    const lines = [`${f.dest || L.title}`];
    for (let i = 0; i < n; i++) {
      const d = plan.days[i] || {};
      const date = start === null ? '' : ` (${new Date(start + i * MS_DAY).toISOString().slice(0, 10)})`;
      lines.push(`\n${L.day} ${i + 1}${date}`);
      for (const s of ['morning', 'afternoon', 'evening']) if (d[s]) lines.push(`- ${L[s]}: ${d[s]}`);
    }
    lines.push(`\n${L.budget}`);
    for (const [k, label] of Object.entries(L.budgetItems)) if (plan.budget[k]) lines.push(`- ${label}: ${plan.budget[k]}`);
    lines.push(`${L.total}: ${budgetTotal()}`);
    return lines.join('\n');
  }
  const budgetTotal = () => Object.values(plan.budget).reduce((s, v) => s + (Number(v) || 0), 0);
  function renderPlan() {
    const { n, start } = tripDays();
    const totalEl = h('strong', {}, String(budgetTotal()));
    const copyBtn = h('button', { class: 'btn secondary', onclick: async () => {
      try { await navigator.clipboard.writeText(planText()); copyBtn.textContent = L.copied; } catch { /* clipboard unavailable */ }
    } }, L.copy);
    const days = Array.from({ length: n }, (_, i) => {
      const date = start === null ? '' : ' · ' + new Date(start + i * MS_DAY).toLocaleDateString(lang, { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short' });
      return h('div', { class: 'card' }, h('h3', {}, `${L.day} ${i + 1}${date}`),
        ['morning', 'afternoon', 'evening'].map((s) => h('label', {}, L[s],
          h('textarea', { rows: 2, maxlength: 400, placeholder: L.notes, oninput: (e) => {
            plan.days[i] = { ...(plan.days[i] || {}), [s]: e.target.value }; store.set('plan', plan);
          } }, plan.days[i]?.[s] || ''))));
    });
    const budget = h('div', { class: 'card' }, h('h3', {}, L.budget),
      Object.entries(L.budgetItems).map(([k, label]) => h('label', {}, label,
        h('input', { type: 'number', min: 0, value: plan.budget[k] ?? '', oninput: (e) => {
          plan.budget[k] = e.target.value; store.set('plan', plan); totalEl.textContent = String(budgetTotal());
        } }))),
      h('p', {}, `${L.total}: `, totalEl));
    planBox.replaceChildren(...[
      h('h2', {}, L.title),
      start === null ? h('p', { class: 'notice' }, L.nodates) : null,
      h('div', { class: 'card' }, h('h3', {}, L.tips), h('ul', {}, L.tipsByProfile[f.profile].map((x) => h('li', {}, x)))),
      days, budget,
      h('div', { class: 'card' }, h('h3', {}, L.visa), L.visaItems.map((x) => h('label', { class: 'check' }, h('input', { type: 'checkbox' }), ' ' + x))),
      copyBtn].flat().filter(Boolean));
  }
  renderPlan();

  const gen = h('button', { class: 'btn', onclick: async () => {
    if (!f.dest.trim()) return;
    out.textContent = t('thinking');
    const msg = `Destination: ${f.dest}\nDates: ${f.from || '?'} to ${f.to || '?'}\nTravelers: ${f.n}\nFocus: ${f.profile}\nBudget: ${f.budget || 'not stated'}`;
    try { out.textContent = await ask('itinerary', [{ role: 'user', content: msg }]); }
    catch (e) { out.textContent = e.message; }
  } }, t('tr_generate'));
  if (!aiOn) gen.disabled = true;
  return h('section', {},
    h('p', { class: 'notice' }, t('tr_warn')), noAiBanner(),
    field('dest', 'text', t('tr_destination'), { maxlength: 80 }),
    h('div', { class: 'row' }, field('from', 'date', t('tr_from')), field('to', 'date', t('tr_to'))),
    h('div', { class: 'row' }, field('n', 'number', t('tr_travelers'), { min: 1, max: 20 }),
      h('label', {}, t('tr_profile'), profile)),
    field('budget', 'text', t('tr_budget'), { maxlength: 60 }),
    aiOn ? gen : null, h('h3', {}, t('tr_links')), links, out, planBox
  );
}

function viewConsulate() {
  return h('section', {},
    h('p', {}, t('con_intro')),
    h('ul', { class: 'links' }, OFFICIAL_LINKS.map((l) => h('li', {}, h('a', { href: l.url, target: '_blank', rel: 'noopener noreferrer' }, l.label)))),
    h('p', { class: 'notice' }, t('disclaimer'))
  );
}

function viewFaq() {
  return h('section', {},
    h('h2', {}, t('faq_title')),
    pick(FAQ).map(([q, a]) => h('details', { class: 'card' }, h('summary', {}, q), h('p', {}, a))),
    h('p', { class: 'notice' }, t('disclaimer'))
  );
}

function viewChat() {
  const log = h('div', { class: 'log' });
  const input = h('textarea', { rows: 3, placeholder: t('chat_ph'), maxlength: 1500 });
  if (pendingChatPrefill) { input.value = pendingChatPrefill; pendingChatPrefill = ''; }
  const paint = () => {
    log.replaceChildren(...chat.map((m) => h('div', { class: 'msg ' + m.role }, m.content)));
    log.scrollTop = log.scrollHeight;
  };
  paint();
  const send = h('button', { class: 'btn', onclick: async () => {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    chat.push({ role: 'user', content: text });
    paint();
    try {
      const reply = await ask('chat', chat.slice(-12));
      chat.push({ role: 'assistant', content: reply });
    } catch (e) { chat.push({ role: 'assistant', content: e.message }); }
    paint();
  } }, t('send'));
  if (!aiOn) send.disabled = true;
  return h('section', {}, noAiBanner(), log, input, send);
}

/* ---------- shell ---------- */
const ROUTES = { '': viewHome, home: viewHome, ds160: viewDs160, interview: viewInterview, travel: viewTravel, consulate: viewConsulate, faq: viewFaq, chat: () => (aiOn ? viewChat() : viewFaq()) };
const navItems = () => [['home', 'nav_home'], ['ds160', 'nav_ds'], ['interview', 'nav_interview'], ['travel', 'nav_travel'], ['faq', 'nav_faq'], ['consulate', 'nav_consulate'], ...(aiOn ? [['chat', 'nav_chat']] : [])];

function render() {
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL.includes(lang) ? 'rtl' : 'ltr';
  document.title = t('title');
  const route = location.hash.replace(/^#\/?/, '');
  const view = (ROUTES[route] || viewHome)();
  const select = h('select', { 'aria-label': t('lang'), onchange: (e) => { lang = e.target.value; store.set('lang', lang); render(); } },
    Object.entries(LANGS).map(([code, name]) => h('option', { value: code, selected: code === lang }, name)));
  const nav = h('nav', {}, navItems().map(([r, k]) => h('a', { href: '#/' + r, class: (route || 'home') === r ? 'active' : '' }, t(k))));
  document.getElementById('app').replaceChildren(
    h('header', {}, h('h1', {}, t('title')), select), nav, h('main', {}, view));
}

window.addEventListener('hashchange', render);
fetch('/api/health').then((r) => r.json()).then((j) => { aiOn = Boolean(j.ai); }).catch(() => {}).finally(render);
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
