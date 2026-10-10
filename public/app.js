import { LANGS, RTL, UI } from './i18n.js';
import { STEPS, DS160, QUESTIONS, OFFICIAL_LINKS, DS160_URL } from './content.js';

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

const noAiBanner = () => (aiOn ? null : h('p', { class: 'notice' }, t('noai')));

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
      h('button', { class: 'link', onclick: () => {
        pendingChatPrefill = `DS-160: ${pick(sec.t)}`;
        location.hash = '#/chat';
      } }, t('ds_ask'))
    ))
  );
}

function viewInterview() {
  const qs = pick(QUESTIONS) || QUESTIONS.en;
  let current = null;
  const qEl = h('p', { class: 'question' });
  const ans = h('textarea', { rows: 4, placeholder: t('int_answer_ph'), maxlength: 1500 });
  const out = h('div', { class: 'reply' });
  const next = () => {
    current = qs[Math.floor(Math.random() * qs.length)];
    qEl.textContent = current; ans.value = ''; out.textContent = '';
  };
  next();
  const fb = h('button', { class: 'btn', onclick: async () => {
    if (!ans.value.trim()) return;
    out.textContent = t('thinking');
    try {
      out.textContent = await ask('interview', [{ role: 'user', content: `Question: ${current}\nMy answer: ${ans.value}` }]);
    } catch (e) { out.textContent = e.message; }
  } }, t('int_feedback'));
  if (!aiOn) fb.disabled = true;
  return h('section', {},
    h('p', {}, t('int_intro')), noAiBanner(), qEl, ans,
    h('div', { class: 'row' }, fb, h('button', { class: 'btn secondary', onclick: next }, t('int_start'))),
    out, h('p', { class: 'notice' }, t('int_tips'))
  );
}

function viewTravel() {
  const f = store.get('trip', { dest: '', from: '', to: '', n: 1, profile: 'value', budget: '' });
  const field = (key, type, label, extra = {}) => h('label', {}, label,
    h('input', { type, value: f[key], ...extra, oninput: (e) => { f[key] = e.target.value; store.set('trip', f); refreshLinks(); } }));
  const profile = h('select', { onchange: (e) => { f.profile = e.target.value; store.set('trip', f); } },
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
    gen, h('h3', {}, t('tr_links')), links, out
  );
}

function viewConsulate() {
  return h('section', {},
    h('p', {}, t('con_intro')),
    h('ul', { class: 'links' }, OFFICIAL_LINKS.map((l) => h('li', {}, h('a', { href: l.url, target: '_blank', rel: 'noopener noreferrer' }, l.label)))),
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
const ROUTES = { '': viewHome, home: viewHome, ds160: viewDs160, interview: viewInterview, travel: viewTravel, consulate: viewConsulate, chat: viewChat };
const NAV = [['home', 'nav_home'], ['ds160', 'nav_ds'], ['interview', 'nav_interview'], ['travel', 'nav_travel'], ['consulate', 'nav_consulate'], ['chat', 'nav_chat']];

function render() {
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL.includes(lang) ? 'rtl' : 'ltr';
  document.title = t('title');
  const route = location.hash.replace(/^#\/?/, '');
  const view = (ROUTES[route] || viewHome)();
  const select = h('select', { 'aria-label': t('lang'), onchange: (e) => { lang = e.target.value; store.set('lang', lang); render(); } },
    Object.entries(LANGS).map(([code, name]) => h('option', { value: code, selected: code === lang }, name)));
  const nav = h('nav', {}, NAV.map(([r, k]) => h('a', { href: '#/' + r, class: (route || 'home') === r ? 'active' : '' }, t(k))));
  document.getElementById('app').replaceChildren(
    h('header', {}, h('h1', {}, t('title')), select), nav, h('main', {}, view));
}

window.addEventListener('hashchange', render);
fetch('/api/health').then((r) => r.json()).then((j) => { aiOn = Boolean(j.ai); }).catch(() => {}).finally(render);
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
