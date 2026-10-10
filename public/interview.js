// Interview practice: quiz-style rounds, optional voice-to-text, saved history, result review
// and a post-interview debrief. Everything is stored only on this device.
// It is a preparation aid: it never predicts or explains an actual consular decision.
import { QUESTIONS, SELFCHECK } from './content.js';

const TXT = {
  en: {
    hero_title: 'Interview practice', hero_sub: 'Practice out loud or in writing, review your answers and know what to work on next.',
    disclaimer: 'Practice tool only. It does not predict or guarantee a visa decision, and it cannot know why an officer decides what they decide. The decision belongs to the consular officer.',
    start_quick: 'Quick round (5)', start_full: 'Full round (10)', history: 'Your rounds', no_history: 'No rounds yet. Start one above.', clear: 'Clear history',
    debrief_btn: 'I already had my interview', q_of: 'Question {n} of {t}', hint: 'Orientation',
    mic: 'Speak your answer', mic_stop: 'Stop', mic_listening: 'Listening… speak now', mic_unsupported: 'Voice input is not available in this browser. Type your answer instead.',
    mic_privacy: 'Voice input uses your browser’s speech service, which may send audio to its provider. We never receive or store your audio, only the text you keep.',
    mic_denied: 'Microphone access was blocked. Allow it in your browser settings or type your answer.', mic_err: 'Could not capture your voice. Try again or type.',
    answer_ph: 'Your answer (edit the transcription if needed)…', words: 'words', check_title: 'Self-check this answer',
    next: 'Next', finish: 'Finish round', skip: 'Skip', ai_feedback: 'AI feedback', thinking: 'Thinking…',
    result_title: 'Round review', self_score: 'Self-check', self_note: 'Based on your own ticks. It is not a prediction.',
    answered: 'answered', weak_title: 'What to work on', weak_none: 'You ticked every item. Re-check against your real DS-160 and documents.',
    flagged_title: 'Answers to review', flag_long: 'Long answer: try 1 to 3 sentences.', flag_short: 'Very short: add the key fact if it is true.',
    flag_uncertain: 'Hesitation words found: check the facts so you can answer with confidence.', flag_unchecked: 'Unchecked items', no_flags: 'No automatic flags. Still compare with your DS-160.',
    your_answer: 'Your answer', copy: 'Copy report', copied: 'Copied!', again: 'New round', back: 'Back', view: 'View',
    consistency: 'Always compare with your DS-160 and your documents: contradictions matter more than wording.',
    debrief_title: 'After the real interview', debrief_intro: 'Write down what happened while you remember it. Use it to prepare, or to talk to an immigration attorney.',
    outcome: 'Outcome', o_pending: 'Still waiting', o_approved: 'Approved', o_admin: 'Needs more processing', o_refused: 'Not approved',
    asked: 'Questions the officer asked', mine: 'What I answered', unclear: 'What I was unsure about', save: 'Save notes', saved: 'Saved on this device',
    guide_title: 'What to do now',
    guide_pending: 'Follow the instructions you were given by the consulate. Timelines vary, so confirm them on your embassy or consulate website.',
    guide_approved: 'When you get your passport, check that every printed detail is correct. A visa does not guarantee entry; admission is decided at the border.',
    guide_admin: 'Follow exactly the consulate’s instructions about documents and your passport. Waiting times vary and cannot be predicted here.',
    guide_refused: 'Read the document the consulate gave you: it states the legal basis for the decision. Confirm what it means on travel.state.gov. We cannot tell which answer, if any, led to it. If you apply again, answer truthfully and disclose the previous refusal on the DS-160. For complex cases, talk to a qualified immigration attorney.',
    compare_title: 'Your latest practice, for comparison', attorney: 'Bring this summary to your attorney or use it to prepare, if you decide to reapply.',
    nothing: 'Nothing to compare yet. Do a practice round first.'
  },
  pt: {
    hero_title: 'Treino de entrevista', hero_sub: 'Pratique falando ou escrevendo, revise suas respostas e saiba o que trabalhar a seguir.',
    disclaimer: 'Apenas ferramenta de treino. Não prevê nem garante decisão de visto e não sabe por que um oficial decide o que decide. A decisão é do oficial consular.',
    start_quick: 'Rodada rápida (5)', start_full: 'Rodada completa (10)', history: 'Suas rodadas', no_history: 'Nenhuma rodada ainda. Comece uma acima.', clear: 'Limpar histórico',
    debrief_btn: 'Já fiz minha entrevista', q_of: 'Pergunta {n} de {t}', hint: 'Orientação',
    mic: 'Falar a resposta', mic_stop: 'Parar', mic_listening: 'Ouvindo… pode falar', mic_unsupported: 'A entrada por voz não está disponível neste navegador. Digite sua resposta.',
    mic_privacy: 'A voz usa o serviço de fala do seu navegador, que pode enviar o áudio ao provedor dele. Nós nunca recebemos nem guardamos seu áudio, só o texto que você mantiver.',
    mic_denied: 'O acesso ao microfone foi bloqueado. Libere nas configurações do navegador ou digite a resposta.', mic_err: 'Não consegui captar sua voz. Tente de novo ou digite.',
    answer_ph: 'Sua resposta (edite a transcrição se precisar)…', words: 'palavras', check_title: 'Autoavalie esta resposta',
    next: 'Próxima', finish: 'Finalizar rodada', skip: 'Pular', ai_feedback: 'Feedback da IA', thinking: 'Pensando…',
    result_title: 'Revisão da rodada', self_score: 'Autoavaliação', self_note: 'Baseada nos seus próprios checks. Não é previsão.',
    answered: 'respondidas', weak_title: 'O que trabalhar', weak_none: 'Você marcou todos os itens. Confira de novo com a DS-160 e os documentos reais.',
    flagged_title: 'Respostas para revisar', flag_long: 'Resposta longa: tente 1 a 3 frases.', flag_short: 'Muito curta: acrescente o fato principal, se for verdadeiro.',
    flag_uncertain: 'Palavras de hesitação: confira os fatos para responder com segurança.', flag_unchecked: 'Itens não marcados', no_flags: 'Nenhum alerta automático. Compare mesmo assim com a DS-160.',
    your_answer: 'Sua resposta', copy: 'Copiar relatório', copied: 'Copiado!', again: 'Nova rodada', back: 'Voltar', view: 'Ver',
    consistency: 'Compare sempre com a DS-160 e seus documentos: contradições pesam mais do que a escolha de palavras.',
    debrief_title: 'Depois da entrevista real', debrief_intro: 'Anote o que aconteceu enquanto lembra. Use para se preparar ou para conversar com um advogado de imigração.',
    outcome: 'Resultado', o_pending: 'Ainda aguardando', o_approved: 'Aprovado', o_admin: 'Precisa de mais processamento', o_refused: 'Não aprovado',
    asked: 'Perguntas que o oficial fez', mine: 'O que eu respondi', unclear: 'O que eu não tinha certeza', save: 'Salvar anotações', saved: 'Salvo neste aparelho',
    guide_title: 'O que fazer agora',
    guide_pending: 'Siga as instruções recebidas do consulado. Os prazos variam; confirme no site da sua embaixada ou consulado.',
    guide_approved: 'Ao receber o passaporte, confira se todos os dados impressos estão corretos. O visto não garante a entrada; a admissão é decidida na fronteira.',
    guide_admin: 'Siga exatamente as instruções do consulado sobre documentos e passaporte. Os prazos variam e não podem ser previstos aqui.',
    guide_refused: 'Leia o documento que o consulado entregou: ele indica a base legal da decisão. Confirme o que significa em travel.state.gov. Não temos como saber qual resposta, se alguma, levou a ela. Se pedir de novo, responda com verdade e informe a recusa anterior na DS-160. Em casos complexos, procure um advogado de imigração qualificado.',
    compare_title: 'Seu último treino, para comparar', attorney: 'Leve este resumo ao seu advogado ou use-o para se preparar, se decidir pedir de novo.',
    nothing: 'Nada para comparar ainda. Faça uma rodada de treino antes.'
  },
  es: {
    hero_title: 'Práctica de entrevista', hero_sub: 'Practica hablando o escribiendo, revisa tus respuestas y sabe qué trabajar después.',
    disclaimer: 'Solo herramienta de práctica. No predice ni garantiza una decisión de visa ni sabe por qué un oficial decide lo que decide. La decisión es del oficial consular.',
    start_quick: 'Ronda rápida (5)', start_full: 'Ronda completa (10)', history: 'Tus rondas', no_history: 'Aún no hay rondas. Empieza una arriba.', clear: 'Borrar historial',
    debrief_btn: 'Ya tuve mi entrevista', q_of: 'Pregunta {n} de {t}', hint: 'Orientación',
    mic: 'Decir la respuesta', mic_stop: 'Detener', mic_listening: 'Escuchando… habla ahora', mic_unsupported: 'La voz no está disponible en este navegador. Escribe tu respuesta.',
    mic_privacy: 'La voz usa el servicio de voz de tu navegador, que puede enviar el audio a su proveedor. Nosotros nunca recibimos ni guardamos tu audio, solo el texto que conserves.',
    mic_denied: 'Se bloqueó el acceso al micrófono. Permítelo en la configuración del navegador o escribe la respuesta.', mic_err: 'No pude captar tu voz. Inténtalo de nuevo o escribe.',
    answer_ph: 'Tu respuesta (edita la transcripción si hace falta)…', words: 'palabras', check_title: 'Autoevalúa esta respuesta',
    next: 'Siguiente', finish: 'Terminar ronda', skip: 'Omitir', ai_feedback: 'Comentarios de IA', thinking: 'Pensando…',
    result_title: 'Revisión de la ronda', self_score: 'Autoevaluación', self_note: 'Basada en tus propias marcas. No es una predicción.',
    answered: 'respondidas', weak_title: 'Qué trabajar', weak_none: 'Marcaste todos los puntos. Verifica de nuevo con tu DS-160 y documentos reales.',
    flagged_title: 'Respuestas para revisar', flag_long: 'Respuesta larga: intenta 1 a 3 frases.', flag_short: 'Muy corta: añade el dato clave si es verdadero.',
    flag_uncertain: 'Palabras de duda: verifica los datos para responder con seguridad.', flag_unchecked: 'Puntos sin marcar', no_flags: 'Sin alertas automáticas. Compara igualmente con tu DS-160.',
    your_answer: 'Tu respuesta', copy: 'Copiar informe', copied: '¡Copiado!', again: 'Nueva ronda', back: 'Volver', view: 'Ver',
    consistency: 'Compara siempre con tu DS-160 y tus documentos: las contradicciones pesan más que las palabras.',
    debrief_title: 'Después de la entrevista real', debrief_intro: 'Anota lo que pasó mientras lo recuerdas. Úsalo para prepararte o para hablar con un abogado de inmigración.',
    outcome: 'Resultado', o_pending: 'Aún esperando', o_approved: 'Aprobada', o_admin: 'Necesita más procesamiento', o_refused: 'No aprobada',
    asked: 'Preguntas que hizo el oficial', mine: 'Lo que respondí', unclear: 'De qué no estaba seguro', save: 'Guardar notas', saved: 'Guardado en este dispositivo',
    guide_title: 'Qué hacer ahora',
    guide_pending: 'Sigue las instrucciones del consulado. Los plazos varían; confírmalos en el sitio de tu embajada o consulado.',
    guide_approved: 'Al recibir tu pasaporte, verifica que todos los datos impresos sean correctos. La visa no garantiza la entrada; la admisión se decide en la frontera.',
    guide_admin: 'Sigue exactamente las instrucciones del consulado sobre documentos y pasaporte. Los plazos varían y no pueden predecirse aquí.',
    guide_refused: 'Lee el documento que te entregó el consulado: indica la base legal de la decisión. Confirma qué significa en travel.state.gov. No podemos saber qué respuesta, si alguna, la causó. Si solicitas de nuevo, responde con la verdad e informa el rechazo previo en la DS-160. En casos complejos, consulta a un abogado de inmigración calificado.',
    compare_title: 'Tu última práctica, para comparar', attorney: 'Lleva este resumen a tu abogado o úsalo para prepararte, si decides solicitar de nuevo.',
    nothing: 'Aún no hay nada que comparar. Haz primero una ronda de práctica.'
  }
};

// One orientation line per question (same order as QUESTIONS).
const HINTS = {
  en: ['State the real purpose in one or two sentences.', 'Give cities and the length of stay you actually plan.', 'Say who pays, as it truly is.', 'Describe your current occupation plainly.', 'Name who travels with you.', 'Be open about relatives or friends in the US, if any.', 'Answer truthfully about earlier trips and any refusal.', 'Explain why these dates, using your real reasons.', 'Say where you plan to stay; a paid booking is not required.', 'Describe your real plans briefly.'],
  pt: ['Diga o propósito real em uma ou duas frases.', 'Informe as cidades e a duração que você realmente planeja.', 'Diga quem paga, exatamente como é.', 'Descreva sua ocupação atual de forma simples.', 'Diga quem viaja com você.', 'Seja aberto sobre parentes ou amigos nos EUA, se houver.', 'Responda com verdade sobre viagens anteriores e qualquer recusa.', 'Explique por que essas datas, com seus motivos reais.', 'Diga onde pretende ficar; reserva paga não é exigida.', 'Descreva seus planos reais de forma breve.'],
  es: ['Di el propósito real en una o dos frases.', 'Indica las ciudades y la duración que realmente planeas.', 'Di quién paga, tal como es.', 'Describe tu ocupación actual de forma simple.', 'Di quién viaja contigo.', 'Sé abierto sobre familiares o amigos en EE. UU., si los hay.', 'Responde con la verdad sobre viajes anteriores y cualquier rechazo.', 'Explica por qué esas fechas, con tus motivos reales.', 'Di dónde planeas alojarte; no se exige reserva pagada.', 'Describe tus planes reales brevemente.']
};

const TIPS = {
  en: ['Answer the question first, then stop. Add detail only if asked.', 'Aim for one to three sentences.', 'If you are unsure of a fact, check it instead of guessing.', 'Re-read your DS-160 answers and compare them with what you said.', 'Use your own words. Practice the facts, not the sentences.'],
  pt: ['Responda primeiro a pergunta e pare. Só dê detalhes se pedirem.', 'Mire em uma a três frases.', 'Se não tem certeza de um fato, confira em vez de chutar.', 'Releia as respostas da DS-160 e compare com o que você disse.', 'Use suas palavras. Treine os fatos, não as frases.'],
  es: ['Responde primero la pregunta y para. Da detalles solo si los piden.', 'Apunta a una a tres frases.', 'Si dudas de un dato, verifícalo en vez de adivinar.', 'Relee tus respuestas de la DS-160 y compáralas con lo que dijiste.', 'Usa tus palabras. Practica los hechos, no las frases.']
};

const UNCERTAIN = {
  en: /\b(maybe|i guess|i think|not sure|kind of|sort of|um+|uh+)\b/gi,
  pt: /\b(acho que|talvez|n[ãa]o sei|tipo|n[ée]|hum+|ahn+|mais ou menos)\b/gi,
  es: /\b(creo que|quiz[aá]s?|tal vez|no s[eé]|o sea|mm+|eh+)\b/gi
};

const BCP47 = { pt: 'pt-BR', en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', ar: 'ar-SA', hi: 'hi-IN', zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR', ru: 'ru-RU', tr: 'tr-TR' };

const HERO_SVG = `<svg viewBox="0 0 220 140" aria-hidden="true"><defs><linearGradient id="ivg" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity=".4"/></linearGradient></defs>
<circle cx="170" cy="40" r="26" fill="#fde68a" opacity=".9"/>
<path d="M10 110 Q90 20 200 70" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="5 6" opacity=".8"/>
<g transform="translate(150 52) rotate(18)"><path d="M0 8 L36 0 L36 6 L12 10 L36 14 L36 20 Z" fill="url(#ivg)"/><path d="M14 10 L22 -8 L26 -8 L22 10 Z" fill="#fff" opacity=".9"/></g>
<g opacity=".95"><ellipse cx="60" cy="118" rx="42" ry="9" fill="#fff" opacity=".25"/><rect x="26" y="78" width="28" height="40" rx="4" fill="#1e3a8a"/><rect x="31" y="84" width="18" height="3" rx="1.5" fill="#fff" opacity=".7"/><circle cx="40" cy="100" r="7" fill="none" stroke="#fde68a" stroke-width="2"/></g>
<g transform="translate(112 84) rotate(-12)"><circle r="22" fill="none" stroke="#fff" stroke-width="2.5" opacity=".9"/><circle r="17" fill="none" stroke="#fff" stroke-width="1" opacity=".7"/><text y="4" text-anchor="middle" font-size="10" font-weight="700" fill="#fff" font-family="system-ui,sans-serif">B1/B2</text></g></svg>`;

export function viewInterview(ctx) {
  const { h, store } = ctx;
  const lang = ctx.lang();
  const aiOn = ctx.aiOn();
  const tx = (k) => TXT[lang]?.[k] ?? TXT.en[k];
  const QS = QUESTIONS[lang] ?? QUESTIONS.en;
  const HINT = HINTS[lang] ?? HINTS.en;
  const CHECKS = SELFCHECK[lang] ?? SELFCHECK.en;
  const TIP = TIPS[lang] ?? TIPS.en;
  const uncertainRe = UNCERTAIN[lang] ?? UNCERTAIN.en;

  const root = h('section', { class: 'iv' });
  const show = (...nodes) => root.replaceChildren(...nodes.flat().filter(Boolean));
  const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
  const sessions = () => store.get('iv_sessions', []);
  const fmtDate = (ts) => new Date(ts).toLocaleDateString(lang, { day: 'numeric', month: 'short', year: 'numeric' });
  const copyText = async (btn, text) => {
    try { await navigator.clipboard.writeText(text); btn.textContent = tx('copied'); } catch { /* clipboard unavailable */ }
  };
  const warn = () => h('p', { class: 'iv-warn' }, tx('disclaimer'));

  function analyze(session) {
    const answered = session.answers.filter((a) => a.text.trim());
    const weak = CHECKS.map((label, i) => ({ i, label, miss: answered.filter((a) => !a.checks[i]).length })).filter((x) => x.miss > 0).sort((a, b) => b.miss - a.miss);
    const ticked = answered.reduce((s, a) => s + a.checks.filter(Boolean).length, 0);
    const pct = answered.length ? Math.round((ticked / (answered.length * CHECKS.length)) * 100) : 0;
    const flags = answered.map((a) => {
      const n = words(a.text);
      const list = [];
      if (n > 70) list.push(tx('flag_long'));
      if (n < 4) list.push(tx('flag_short'));
      if ((a.text.match(uncertainRe) || []).length > 1) list.push(tx('flag_uncertain'));
      const missing = CHECKS.filter((_, i) => !a.checks[i]);
      return { a, list, missing };
    }).filter((f) => f.list.length || f.missing.length);
    return { answered, weak, pct, flags };
  }

  function reportText(session) {
    const r = analyze(session);
    const lines = [`${tx('result_title')} · ${fmtDate(session.ts)}`, `${tx('self_score')}: ${r.pct}% (${tx('self_note')})`, ''];
    for (const a of session.answers) lines.push(`Q: ${a.q}`, `${tx('your_answer')}: ${a.text || '-'}`, '');
    lines.push(`${tx('weak_title')}:`);
    for (const w of r.weak) lines.push(`- ${w.label} (${w.miss}x)`);
    return lines.join('\n');
  }

  /* ---------- home ---------- */
  function home() {
    const list = sessions();
    show(
      h('div', { class: 'iv-hero' }, h('div', { class: 'iv-hero-text' }, h('h2', {}, tx('hero_title')), h('p', {}, tx('hero_sub'))), (() => { const d = h('div', { class: 'iv-hero-art' }); d.innerHTML = HERO_SVG; return d; })()),
      warn(),
      h('div', { class: 'iv-actions' },
        h('button', { class: 'iv-btn primary', onclick: () => startRound(5) }, '✈ ' + tx('start_quick')),
        h('button', { class: 'iv-btn', onclick: () => startRound(QS.length) }, tx('start_full'))),
      h('h3', { class: 'iv-h' }, tx('history')),
      list.length ? list.map((s) => {
        const r = analyze(s);
        return h('button', { class: 'iv-row', onclick: () => result(s) },
          h('span', { class: 'iv-stamp' }, r.pct + '%'),
          h('span', { class: 'iv-row-main' }, fmtDate(s.ts), h('small', {}, ` · ${r.answered.length}/${s.answers.length} ${tx('answered')}`)),
          h('span', { class: 'iv-view' }, tx('view') + ' ›'));
      }) : h('p', { class: 'iv-muted' }, tx('no_history')),
      list.length ? h('button', { class: 'link', onclick: () => { store.set('iv_sessions', []); home(); } }, tx('clear')) : null,
      h('button', { class: 'iv-btn ghost', onclick: debrief }, '📝 ' + tx('debrief_btn'))
    );
  }

  /* ---------- quiz ---------- */
  function startRound(count) {
    const order = QS.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, count);
    const answers = [];
    let pos = 0;
    let rec = null;

    function stopRec() { try { rec?.stop(); } catch { /* already stopped */ } rec = null; }

    function question() {
      stopRec();
      const qi = order[pos];
      const startedAt = { t: 0 };
      let secs = 0;
      const ta = h('textarea', { rows: 5, maxlength: 1500, placeholder: tx('answer_ph') });
      const count = h('span', { class: 'iv-muted' }, `0 ${tx('words')}`);
      ta.addEventListener('input', () => { count.textContent = `${words(ta.value)} ${tx('words')}`; });
      const checks = CHECKS.map(() => false);
      const status = h('p', { class: 'iv-muted iv-status' });
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const mic = h('button', { class: 'iv-mic', type: 'button', 'aria-label': tx('mic') }, '🎙');
      let baseText = '';

      if (!SR) { mic.disabled = true; status.textContent = tx('mic_unsupported'); }
      mic.addEventListener('click', () => {
        if (rec) { stopRec(); mic.classList.remove('rec'); status.textContent = ''; return; }
        rec = new SR();
        rec.lang = BCP47[lang] || 'en-US';
        rec.interimResults = true;
        rec.continuous = true;
        baseText = ta.value ? ta.value.trimEnd() + ' ' : '';
        startedAt.t = Date.now();
        rec.onresult = (e) => {
          let text = '';
          for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
          ta.value = baseText + text;
          count.textContent = `${words(ta.value)} ${tx('words')}`;
        };
        rec.onerror = (e) => {
          mic.classList.remove('rec');
          status.textContent = e.error === 'not-allowed' || e.error === 'service-not-allowed' ? tx('mic_denied') : tx('mic_err');
          rec = null;
        };
        rec.onend = () => { if (startedAt.t) secs += Math.round((Date.now() - startedAt.t) / 1000); startedAt.t = 0; mic.classList.remove('rec'); rec = null; };
        try { rec.start(); mic.classList.add('rec'); status.textContent = tx('mic_listening'); } catch { rec = null; status.textContent = tx('mic_err'); }
      });

      const aiOut = h('div', { class: 'reply' });
      const aiBtn = aiOn ? h('button', { class: 'iv-btn ghost', type: 'button', onclick: async () => {
        if (!ta.value.trim()) return;
        aiOut.textContent = tx('thinking');
        try { aiOut.textContent = await ctx.ask('interview', [{ role: 'user', content: `Question: ${QS[qi]}\nMy answer: ${ta.value}` }]); }
        catch (e) { aiOut.textContent = e.message; }
      } }, tx('ai_feedback')) : null;

      const last = pos === order.length - 1;
      const advance = (skip) => {
        stopRec();
        answers.push({ qi, q: QS[qi], text: skip ? '' : ta.value.trim(), checks: skip ? CHECKS.map(() => false) : checks, secs });
        if (last) {
          const session = { id: Date.now(), ts: Date.now(), lang, answers };
          store.set('iv_sessions', [session, ...sessions()].slice(0, 20));
          result(session);
        } else { pos += 1; question(); }
      };

      show(
        h('div', { class: 'iv-progress', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': order.length, 'aria-valuenow': pos + 1 },
          order.map((_, i) => h('span', { class: 'iv-dot' + (i < pos ? ' done' : i === pos ? ' cur' : '') }))),
        h('p', { class: 'iv-muted' }, tx('q_of').replace('{n}', pos + 1).replace('{t}', order.length)),
        h('div', { class: 'iv-qcard' },
          h('p', { class: 'iv-q' }, QS[qi]),
          h('p', { class: 'iv-hint' }, `💡 ${tx('hint')}: ${HINT[qi] ?? ''}`)),
        h('div', { class: 'iv-answer' },
          h('div', { class: 'iv-microw' }, mic, h('div', {}, h('strong', {}, tx('mic')), status)),
          ta, h('div', { class: 'iv-right' }, count),
          SR ? h('p', { class: 'iv-fine' }, tx('mic_privacy')) : null),
        h('div', { class: 'card' }, h('h3', {}, tx('check_title')),
          CHECKS.map((label, i) => h('label', { class: 'check' }, h('input', { type: 'checkbox', onchange: (e) => { checks[i] = e.target.checked; } }), ' ' + label))),
        aiBtn, aiOut,
        h('div', { class: 'iv-actions' },
          h('button', { class: 'iv-btn primary', onclick: () => advance(false) }, last ? tx('finish') : tx('next') + ' ›'),
          h('button', { class: 'iv-btn ghost', onclick: () => advance(true) }, tx('skip'))),
        h('button', { class: 'link', onclick: () => { stopRec(); home(); } }, '‹ ' + tx('back'))
      );
    }
    question();
  }

  /* ---------- result ---------- */
  function result(session) {
    const r = analyze(session);
    const copyBtn = h('button', { class: 'iv-btn', onclick: () => copyText(copyBtn, reportText(session)) }, tx('copy'));
    show(
      h('div', { class: 'iv-hero small' }, h('div', { class: 'iv-hero-text' }, h('h2', {}, tx('result_title')), h('p', {}, fmtDate(session.ts)))),
      warn(),
      h('div', { class: 'iv-score' }, h('div', { class: 'iv-ring', style: `--p:${r.pct}` }, h('span', {}, r.pct + '%')),
        h('div', {}, h('strong', {}, tx('self_score')), h('p', { class: 'iv-muted' }, `${r.answered.length}/${session.answers.length} ${tx('answered')} · ${tx('self_note')}`))),
      h('h3', { class: 'iv-h' }, tx('weak_title')),
      r.weak.length ? r.weak.map((w) => h('div', { class: 'card' }, h('strong', {}, w.label),
        h('div', { class: 'iv-bar' }, h('span', { style: `width:${Math.round((w.miss / r.answered.length) * 100)}%` })),
        h('p', {}, TIP[w.i]))) : h('p', { class: 'iv-muted' }, tx('weak_none')),
      h('h3', { class: 'iv-h' }, tx('flagged_title')),
      r.flags.length ? r.flags.map((f) => h('div', { class: 'card' }, h('strong', {}, f.a.q),
        h('p', { class: 'iv-quote' }, f.a.text),
        f.list.map((x) => h('p', { class: 'iv-flag' }, '⚑ ' + x)),
        f.missing.length ? h('p', { class: 'iv-muted' }, `${tx('flag_unchecked')}: ${f.missing.join(' · ')}`) : null)) : h('p', { class: 'iv-muted' }, tx('no_flags')),
      h('p', { class: 'notice' }, tx('consistency')),
      h('div', { class: 'iv-actions' }, copyBtn, h('button', { class: 'iv-btn primary', onclick: () => startRound(session.answers.length || 5) }, '✈ ' + tx('again')), h('button', { class: 'iv-btn ghost', onclick: debrief }, '📝 ' + tx('debrief_btn'))),
      h('button', { class: 'link', onclick: home }, '‹ ' + tx('back'))
    );
  }

  /* ---------- debrief after the real interview ---------- */
  function debrief() {
    const d = store.get('iv_debrief', { outcome: 'pending', asked: '', mine: '', unclear: '', ts: 0 });
    const guide = h('div', { class: 'card iv-guide' });
    const paintGuide = () => {
      guide.replaceChildren(h('h3', {}, tx('guide_title')), h('p', {}, tx('guide_' + d.outcome)));
      if (d.outcome === 'refused') {
        const last = sessions()[0];
        const r = last ? analyze(last) : null;
        guide.append(...[h('h3', {}, tx('compare_title')),
          r ? [h('p', {}, `${tx('self_score')}: ${r.pct}% · ${r.answered.length}/${last.answers.length} ${tx('answered')}`),
            r.weak.slice(0, 3).map((w) => h('p', {}, '• ' + w.label + ` (${w.miss}x)`))] : h('p', { class: 'iv-muted' }, tx('nothing')),
          h('p', { class: 'iv-muted' }, tx('attorney'))].flat(2));
      }
    };
    const field = (key, label) => h('label', {}, label, h('textarea', { rows: 3, maxlength: 1500, oninput: (e) => { d[key] = e.target.value; } }, d[key]));
    const saved = h('span', { class: 'iv-muted' });
    const sel = h('select', { onchange: (e) => { d.outcome = e.target.value; paintGuide(); } },
      ['pending', 'approved', 'admin', 'refused'].map((o) => h('option', { value: o, selected: d.outcome === o }, tx('o_' + o))));
    paintGuide();
    show(
      h('div', { class: 'iv-hero small' }, h('div', { class: 'iv-hero-text' }, h('h2', {}, tx('debrief_title')), h('p', {}, tx('debrief_intro')))),
      warn(),
      h('label', {}, tx('outcome'), sel), guide,
      field('asked', tx('asked')), field('mine', tx('mine')), field('unclear', tx('unclear')),
      h('div', { class: 'iv-actions' }, h('button', { class: 'iv-btn primary', onclick: () => { d.ts = Date.now(); store.set('iv_debrief', d); saved.textContent = tx('saved'); } }, tx('save')), saved),
      h('button', { class: 'link', onclick: home }, '‹ ' + tx('back'))
    );
  }

  home();
  return root;
}
