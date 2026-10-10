// Educational content. Available in en, pt, es; other languages fall back to English here
// (the AI specialists still answer in the selected language). Add a language by adding keys.
export const STEPS = {
  en: [
    'Understand your case: country, interview city, purpose (B1 business / B2 tourism or visit), who travels, when, prior visas or refusals.',
    'Confirm the category and the local instructions on your embassy or consulate website.',
    'Fill in the DS-160 yourself on the official site, with true information, and review every answer before submitting.',
    'Pay the fee and schedule the required appointments using only the portal indicated by your embassy or consulate.',
    'Prepare to explain your trip clearly and truthfully: purpose, route, duration, who pays, your current job or studies.',
    'Attend the interview. The consular officer decides, and may or may not ask for documents.',
    'Follow the instructions about your passport. A visa does not guarantee entry; admission is decided at the border.'
  ],
  pt: [
    'Entenda seu caso: país, cidade da entrevista, propósito (B1 negócios / B2 turismo ou visita), quem viaja, quando, vistos ou recusas anteriores.',
    'Confirme a categoria e as instruções locais no site da embaixada ou consulado.',
    'Preencha a DS-160 você mesmo no site oficial, com informações verdadeiras, e revise cada resposta antes de enviar.',
    'Pague a taxa e agende as etapas exigidas usando apenas o portal indicado pela embaixada ou consulado.',
    'Prepare-se para explicar sua viagem com clareza e verdade: propósito, roteiro, duração, quem paga, seu trabalho ou estudos atuais.',
    'Compareça à entrevista. O oficial consular decide e pode ou não pedir documentos.',
    'Siga as instruções sobre o passaporte. O visto não garante a entrada; a admissão é decidida na fronteira.'
  ],
  es: [
    'Entiende tu caso: país, ciudad de la entrevista, propósito (B1 negocios / B2 turismo o visita), quién viaja, cuándo, visas o rechazos previos.',
    'Confirma la categoría y las instrucciones locales en el sitio de tu embajada o consulado.',
    'Completa tú mismo la DS-160 en el sitio oficial, con información verdadera, y revisa cada respuesta antes de enviar.',
    'Paga la tarifa y agenda las citas exigidas usando solo el portal indicado por tu embajada o consulado.',
    'Prepárate para explicar tu viaje con claridad y verdad: propósito, ruta, duración, quién paga, tu trabajo o estudios actuales.',
    'Asiste a la entrevista. El oficial consular decide y puede o no pedir documentos.',
    'Sigue las instrucciones sobre el pasaporte. La visa no garantiza la entrada; la admisión se decide en la frontera.'
  ]
};

export const DS160 = [
  { id: 'personal', t: { en: 'Personal data and previous names', pt: 'Dados pessoais e nomes anteriores', es: 'Datos personales y nombres anteriores' },
    d: { en: 'Full name as in the passport, birth data, marital status, other names used.', pt: 'Nome completo como no passaporte, dados de nascimento, estado civil, outros nomes usados.', es: 'Nombre completo como en el pasaporte, datos de nacimiento, estado civil, otros nombres usados.' } },
  { id: 'contact', t: { en: 'Address, phone, email, social media', pt: 'Endereço, telefone, e-mail e redes sociais', es: 'Dirección, teléfono, correo y redes sociales' },
    d: { en: 'Current home address, phone numbers, email addresses and social media identifiers used in recent years.', pt: 'Endereço atual, telefones, e-mails e identificadores de redes sociais usados nos últimos anos.', es: 'Dirección actual, teléfonos, correos e identificadores de redes sociales usados en los últimos años.' } },
  { id: 'passport', t: { en: 'Passport and travel document', pt: 'Passaporte e documento de viagem', es: 'Pasaporte y documento de viaje' },
    d: { en: 'Must be copied exactly from the passport. Check against the physical document.', pt: 'Deve ser copiado exatamente do passaporte. Confira com o documento físico.', es: 'Debe copiarse exactamente del pasaporte. Verifica con el documento físico.' } },
  { id: 'trip', t: { en: 'Purpose, dates and places of the trip', pt: 'Propósito, datas e locais da viagem', es: 'Propósito, fechas y lugares del viaje' },
    d: { en: 'Why you travel, intended arrival date and length of stay, where you will stay and who pays.', pt: 'Por que viaja, data prevista de chegada e duração, onde ficará e quem paga.', es: 'Por qué viajas, fecha prevista de llegada y duración, dónde te alojarás y quién paga.' } },
  { id: 'uscontact', t: { en: 'Contact or address in the United States', pt: 'Contato ou endereço nos Estados Unidos', es: 'Contacto o dirección en Estados Unidos' },
    d: { en: 'Hotel or person you will stay with or visit. A paid reservation is not required to answer.', pt: 'Hotel ou pessoa com quem ficará ou que visitará. Reserva paga não é necessária para responder.', es: 'Hotel o persona con quien te quedarás o visitarás. No se requiere reserva pagada para responder.' } },
  { id: 'companions', t: { en: 'Travel companions and relatives in the US', pt: 'Acompanhantes e parentes nos EUA', es: 'Acompañantes y familiares en EE. UU.' },
    d: { en: 'Who travels with you and relatives living in the US, with their status if known.', pt: 'Quem viaja com você e parentes que moram nos EUA, com o status se souber.', es: 'Quién viaja contigo y familiares que viven en EE. UU., con su estatus si lo sabes.' } },
  { id: 'history', t: { en: 'Previous US trips and visa history', pt: 'Viagens anteriores aos EUA e histórico de vistos', es: 'Viajes anteriores a EE. UU. e historial de visas' },
    d: { en: 'Past visits, previous visas, and any refusal. Answer truthfully; ask a lawyer if you are unsure of consequences.', pt: 'Visitas passadas, vistos anteriores e qualquer recusa. Responda com verdade; consulte um advogado se tiver dúvida sobre consequências.', es: 'Visitas pasadas, visas anteriores y cualquier rechazo. Responde con la verdad; consulta a un abogado si dudas de las consecuencias.' } },
  { id: 'work', t: { en: 'Work, studies and background', pt: 'Trabalho, estudos e formação', es: 'Trabajo, estudios y formación' },
    d: { en: 'Current occupation, employer or school, and previous jobs and education as requested.', pt: 'Ocupação atual, empregador ou escola, e empregos e estudos anteriores conforme solicitado.', es: 'Ocupación actual, empleador o escuela, y empleos y estudios previos según se solicite.' } },
  { id: 'security', t: { en: 'Security and eligibility questions', pt: 'Perguntas de segurança e elegibilidade', es: 'Preguntas de seguridad y elegibilidad' },
    d: { en: 'Answer each one truthfully. We never suggest answers here. If anything is unclear or complex, consult a qualified immigration attorney.', pt: 'Responda cada uma com verdade. Nunca sugerimos respostas aqui. Se algo for confuso ou complexo, consulte um advogado de imigração qualificado.', es: 'Responde cada una con la verdad. Aquí nunca sugerimos respuestas. Si algo es confuso o complejo, consulta a un abogado de inmigración calificado.' } }
];

export const QUESTIONS = {
  en: ['What is the purpose of your trip?', 'Where will you go and how long will you stay?', 'Who is paying for the trip?', 'What do you do for a living?', 'Who is traveling with you?', 'Do you have relatives or friends in the United States?', 'Have you been to the United States before? Have you ever been refused a visa?', 'Why are you traveling at this time of year?', 'Where will you stay?', 'What will you do in each city?'],
  pt: ['Qual é o motivo da sua viagem?', 'Para onde pretende ir e por quanto tempo?', 'Quem vai pagar a viagem?', 'O que você faz atualmente?', 'Com quem vai viajar?', 'Tem parentes ou conhecidos nos Estados Unidos?', 'Já esteve nos EUA? Já teve algum visto recusado?', 'Por que pretende viajar nesta época do ano?', 'Onde vai ficar hospedado?', 'O que pretende fazer em cada cidade?'],
  es: ['¿Cuál es el motivo de tu viaje?', '¿A dónde irás y por cuánto tiempo?', '¿Quién pagará el viaje?', '¿A qué te dedicas actualmente?', '¿Con quién viajarás?', '¿Tienes familiares o conocidos en Estados Unidos?', '¿Has estado en EE. UU.? ¿Alguna vez te negaron una visa?', '¿Por qué viajas en esta época del año?', '¿Dónde te hospedarás?', '¿Qué harás en cada ciudad?']
};

// Official, authoritative sources only. Embassy/consulate sites are located via usembassy.gov.
export const OFFICIAL_LINKS = [
  { label: 'travel.state.gov: US Visas', url: 'https://travel.state.gov/content/travel/en/us-visas.html' },
  { label: 'travel.state.gov: Visitor visa (B1/B2)', url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html' },
  { label: 'DS-160 (CEAC)', url: 'https://ceac.state.gov/GenNIV/' },
  { label: 'US embassies and consulates worldwide', url: 'https://www.usembassy.gov/' }
];

export const DS160_URL = 'https://ceac.state.gov/GenNIV/';
