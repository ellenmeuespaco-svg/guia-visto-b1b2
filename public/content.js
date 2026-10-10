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

// General orientation only. Never present fees, wait times or local procedures as current.
export const FAQ = {
  en: [
    ['B1 or B2: what is the difference?', 'B1 covers certain temporary business activities (for example meetings or conferences). B2 covers tourism, leisure, visiting family or friends and some medical treatment. The right category depends on your real purpose. Neither allows you to work in the US.'],
    ['Does the visa guarantee entry to the US?', 'No. The visa lets you ask for admission at a port of entry. The border officer decides whether you are admitted and for how long.'],
    ['Which documents should I bring?', 'It varies by embassy or consulate. Follow the instructions on your embassy or consulate website. Supporting documents can help explain your situation but never guarantee approval, and the officer may or may not ask for them.'],
    ['Should I buy tickets and hotels before the visa?', 'It is not required to answer the DS-160. Avoid non-refundable tickets and expensive bookings until the visa is issued, unless you knowingly accept that risk.'],
    ['I was refused a visa before. What now?', 'Answer the DS-160 truthfully about any previous refusal. A previous refusal does not automatically bar a new application, but if you are unsure of the consequences, consult a qualified immigration attorney.'],
    ['Who fills in the DS-160?', 'You do, on the official site, with true information. Review every answer before submitting. This app only helps you organize and understand; it never fills in or submits anything for you.'],
    ['How much does it cost and how long does it take?', 'Fees, appointment availability and wait times change and vary by country. Confirm them only on the official site and the portal indicated by your embassy or consulate.'],
    ['Any tips for the interview?', 'Answer what was asked, briefly and truthfully. Stay consistent with your DS-160. If you do not understand a question, ask for it to be repeated. Be calm and respectful. Do not memorize a script or invent anything.'],
    ['What happens after the interview?', 'Follow exactly the instructions you receive from the consulate and the official delivery service about your passport. Timelines vary. When you receive the visa, check that all printed data is correct and seek official guidance if there is an error.'],
    ['I have a complex situation (overstay, arrest, fraud, deportation).', 'This app cannot give legal advice. Consult a qualified immigration attorney before applying.'],
    ['How do I avoid scams?', 'No one can guarantee a visa. Use only the official sites and the portal indicated by your embassy or consulate for payment and appointments. Never share passwords or your DS-160 confirmation code.']
  ],
  pt: [
    ['B1 ou B2: qual a diferença?', 'O B1 cobre certas atividades temporárias de negócios (por exemplo reuniões ou conferências). O B2 cobre turismo, lazer, visita a familiares ou amigos e alguns tratamentos médicos. A categoria certa depende do seu propósito real. Nenhum dos dois permite trabalhar nos EUA.'],
    ['O visto garante a entrada nos EUA?', 'Não. O visto permite solicitar admissão em um ponto de entrada. O oficial de fronteira decide se você será admitido e por quanto tempo.'],
    ['Quais documentos devo levar?', 'Varia conforme a embaixada ou consulado. Siga as instruções no site da sua embaixada ou consulado. Documentos de apoio podem ajudar a explicar sua situação, mas não garantem aprovação, e o oficial pode ou não pedi-los.'],
    ['Devo comprar passagens e hotéis antes do visto?', 'Não é necessário para responder a DS-160. Evite passagens não reembolsáveis e reservas caras até o visto ser emitido, a menos que aceite esse risco.'],
    ['Já tive um visto recusado. E agora?', 'Responda a DS-160 com verdade sobre qualquer recusa anterior. Uma recusa anterior não impede automaticamente um novo pedido, mas se tiver dúvida sobre as consequências, consulte um advogado de imigração qualificado.'],
    ['Quem preenche a DS-160?', 'Você, no site oficial, com informações verdadeiras. Revise cada resposta antes de enviar. Este app só ajuda a organizar e entender; ele nunca preenche nem envia nada por você.'],
    ['Quanto custa e quanto tempo demora?', 'Taxas, vagas de agendamento e prazos mudam e variam por país. Confirme somente no site oficial e no portal indicado pela sua embaixada ou consulado.'],
    ['Dicas para a entrevista?', 'Responda o que foi perguntado, de forma breve e verdadeira. Seja coerente com a DS-160. Se não entender uma pergunta, peça que seja repetida. Mantenha calma e respeito. Não decore roteiro nem invente nada.'],
    ['O que acontece depois da entrevista?', 'Siga exatamente as instruções recebidas do consulado e do serviço oficial de entrega sobre o passaporte. Os prazos variam. Ao receber o visto, confira se todos os dados impressos estão corretos e busque orientação oficial se houver erro.'],
    ['Tenho uma situação complexa (permanência irregular, prisão, fraude, deportação).', 'Este app não dá orientação jurídica. Consulte um advogado de imigração qualificado antes de solicitar.'],
    ['Como evitar golpes?', 'Ninguém pode garantir um visto. Use apenas os sites oficiais e o portal indicado pela sua embaixada ou consulado para pagamento e agendamento. Nunca compartilhe senhas nem o código de confirmação da DS-160.']
  ],
  es: [
    ['B1 o B2: ¿cuál es la diferencia?', 'El B1 cubre ciertas actividades temporales de negocios (por ejemplo reuniones o conferencias). El B2 cubre turismo, ocio, visita a familiares o amigos y algunos tratamientos médicos. La categoría correcta depende de tu propósito real. Ninguno permite trabajar en EE. UU.'],
    ['¿La visa garantiza la entrada a EE. UU.?', 'No. La visa permite solicitar admisión en un punto de entrada. El oficial de frontera decide si te admite y por cuánto tiempo.'],
    ['¿Qué documentos debo llevar?', 'Varía según la embajada o consulado. Sigue las instrucciones del sitio de tu embajada o consulado. Los documentos de apoyo pueden ayudar a explicar tu situación, pero no garantizan la aprobación, y el oficial puede o no pedirlos.'],
    ['¿Debo comprar boletos y hoteles antes de la visa?', 'No es necesario para responder la DS-160. Evita boletos no reembolsables y reservas caras hasta que se emita la visa, salvo que aceptes ese riesgo.'],
    ['Me negaron una visa antes. ¿Qué hago?', 'Responde la DS-160 con la verdad sobre cualquier rechazo previo. Un rechazo previo no impide automáticamente una nueva solicitud, pero si dudas de las consecuencias, consulta a un abogado de inmigración calificado.'],
    ['¿Quién completa la DS-160?', 'Tú, en el sitio oficial, con información verdadera. Revisa cada respuesta antes de enviar. Esta app solo ayuda a organizar y entender; nunca completa ni envía nada por ti.'],
    ['¿Cuánto cuesta y cuánto tarda?', 'Las tarifas, la disponibilidad de citas y los plazos cambian y varían por país. Confírmalos solo en el sitio oficial y en el portal indicado por tu embajada o consulado.'],
    ['¿Consejos para la entrevista?', 'Responde lo que se pregunta, de forma breve y verdadera. Sé coherente con tu DS-160. Si no entiendes una pregunta, pide que la repitan. Mantén la calma y el respeto. No memorices un guion ni inventes nada.'],
    ['¿Qué pasa después de la entrevista?', 'Sigue exactamente las instrucciones del consulado y del servicio oficial de entrega sobre tu pasaporte. Los plazos varían. Al recibir la visa, verifica que todos los datos impresos sean correctos y busca orientación oficial si hay un error.'],
    ['Tengo una situación compleja (permanencia irregular, arresto, fraude, deportación).', 'Esta app no da asesoría legal. Consulta a un abogado de inmigración calificado antes de solicitar.'],
    ['¿Cómo evitar estafas?', 'Nadie puede garantizar una visa. Usa solo los sitios oficiales y el portal indicado por tu embajada o consulado para pagos y citas. Nunca compartas contraseñas ni el código de confirmación de la DS-160.']
  ]
};

// Trip plan template (fill-in by hand, no AI). Generic criteria only: no invented places, prices or deals.
export const PLAN = {
  en: {
    title: 'Trip plan template', day: 'Day', morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening',
    notes: 'Where / what / notes', tips: 'Tips for this focus', budget: 'Budget (your currency)', total: 'Total', copy: 'Copy plan as text', copied: 'Copied!',
    nodates: 'Pick the dates above to size the plan. Showing 3 days for now.',
    visa: 'Visa coherence check',
    budgetItems: { flights: 'Flights', lodging: 'Lodging', transport: 'Local transport', food: 'Food', tickets: 'Tours and tickets', insurance: 'Insurance', other: 'Other / buffer' },
    visaItems: ['The plan matches the purpose I will state on the DS-160 and in the interview.', 'Dates and length fit my real leave and commitments.', 'I know who pays for each item.', 'Flights and lodging are refundable, or I accept the risk until the visa is issued.', 'Nothing in the plan involves working or studying in the US.'],
    tipsByProfile: {
      value: ['Compare total cost, not just the nightly price (taxes, fees, transport to the center).', 'Look for free or low-cost attractions; buy city passes only if you will use them.', 'Prefer lodging near public transport.', 'Compare options and prefer refundable rates before paying.', 'Keep a buffer of about 10% of the budget.'],
      luxury: ['Define your priorities: location, service, dining, privacy, spa.', 'Read cancellation terms carefully on high-value reservations.', 'Reserve special dinners or private tours in advance, with refundable terms when possible.', 'Leave rest time between activities.', 'Confirm transfers between airport, hotel and sights.'],
      family: ['Check lodging has room for everyone and food nearby.', 'Plan fewer activities per day and a midday rest for children.', 'Look for family tickets and age discounts on official sites.', 'Keep documents and contacts of every traveler together.', 'Prefer central locations to cut transit time.'],
      adventure: ['Check season, weather and safety for each activity on official sources.', 'Confirm age, fitness and equipment requirements.', 'Verify operators are licensed and read cancellation terms.', 'Consider insurance that covers the activities.', 'Leave spare days for weather changes.']
    }
  },
  pt: {
    title: 'Modelo de roteiro de viagem', day: 'Dia', morning: 'Manhã', afternoon: 'Tarde', evening: 'Noite',
    notes: 'Onde / o quê / anotações', tips: 'Dicas para este foco', budget: 'Orçamento (sua moeda)', total: 'Total', copy: 'Copiar roteiro como texto', copied: 'Copiado!',
    nodates: 'Escolha as datas acima para dimensionar o roteiro. Mostrando 3 dias por enquanto.',
    visa: 'Checagem de coerência com o visto',
    budgetItems: { flights: 'Voos', lodging: 'Hospedagem', transport: 'Transporte local', food: 'Alimentação', tickets: 'Passeios e ingressos', insurance: 'Seguro', other: 'Outros / reserva' },
    visaItems: ['O roteiro condiz com o propósito que vou declarar na DS-160 e na entrevista.', 'As datas e a duração cabem nas minhas férias e compromissos reais.', 'Sei quem paga cada item.', 'Voos e hospedagem são reembolsáveis, ou aceito o risco até o visto ser emitido.', 'Nada no roteiro envolve trabalhar ou estudar nos EUA.'],
    tipsByProfile: {
      value: ['Compare o custo total, não só a diária (taxas, impostos, transporte até o centro).', 'Procure atrações gratuitas ou baratas; compre passes de cidade só se for usar.', 'Prefira hospedagem perto do transporte público.', 'Compare opções e prefira tarifas reembolsáveis antes de pagar.', 'Guarde cerca de 10% do orçamento como reserva.'],
      luxury: ['Defina suas prioridades: localização, serviço, gastronomia, privacidade, spa.', 'Leia com atenção as regras de cancelamento das reservas de maior valor.', 'Reserve jantares especiais ou passeios privativos com antecedência, com condições reembolsáveis quando possível.', 'Deixe tempo de descanso entre as atividades.', 'Confirme traslados entre aeroporto, hotel e atrações.'],
      family: ['Veja se a hospedagem acomoda todos e se há comida por perto.', 'Planeje menos atividades por dia e descanso no meio do dia para as crianças.', 'Procure ingressos família e descontos por idade nos sites oficiais.', 'Mantenha juntos os documentos e contatos de todos os viajantes.', 'Prefira locais centrais para reduzir deslocamentos.'],
      adventure: ['Confira estação, clima e segurança de cada atividade em fontes oficiais.', 'Confirme exigências de idade, condicionamento e equipamento.', 'Verifique se os operadores são licenciados e leia as regras de cancelamento.', 'Considere um seguro que cubra as atividades.', 'Deixe dias de folga para mudanças de clima.']
    }
  },
  es: {
    title: 'Plantilla de plan de viaje', day: 'Día', morning: 'Mañana', afternoon: 'Tarde', evening: 'Noche',
    notes: 'Dónde / qué / notas', tips: 'Consejos para este enfoque', budget: 'Presupuesto (tu moneda)', total: 'Total', copy: 'Copiar plan como texto', copied: '¡Copiado!',
    nodates: 'Elige las fechas arriba para dimensionar el plan. Mostrando 3 días por ahora.',
    visa: 'Revisión de coherencia con la visa',
    budgetItems: { flights: 'Vuelos', lodging: 'Alojamiento', transport: 'Transporte local', food: 'Comida', tickets: 'Tours y entradas', insurance: 'Seguro', other: 'Otros / reserva' },
    visaItems: ['El plan coincide con el propósito que declararé en la DS-160 y en la entrevista.', 'Las fechas y la duración encajan con mis vacaciones y compromisos reales.', 'Sé quién paga cada rubro.', 'Vuelos y alojamiento son reembolsables, o acepto el riesgo hasta que se emita la visa.', 'Nada en el plan implica trabajar o estudiar en EE. UU.'],
    tipsByProfile: {
      value: ['Compara el costo total, no solo el precio por noche (impuestos, tarifas, transporte al centro).', 'Busca atracciones gratuitas o económicas; compra pases de ciudad solo si los usarás.', 'Prefiere alojamiento cerca del transporte público.', 'Compara opciones y prefiere tarifas reembolsables antes de pagar.', 'Reserva cerca del 10% del presupuesto como colchón.'],
      luxury: ['Define tus prioridades: ubicación, servicio, gastronomía, privacidad, spa.', 'Lee con atención las políticas de cancelación de las reservas de mayor valor.', 'Reserva cenas especiales o tours privados con anticipación, con condiciones reembolsables si es posible.', 'Deja tiempo de descanso entre actividades.', 'Confirma traslados entre aeropuerto, hotel y atracciones.'],
      family: ['Verifica que el alojamiento tenga espacio para todos y comida cerca.', 'Planea menos actividades por día y descanso al mediodía para los niños.', 'Busca entradas familiares y descuentos por edad en sitios oficiales.', 'Mantén juntos los documentos y contactos de todos los viajeros.', 'Prefiere zonas céntricas para reducir traslados.'],
      adventure: ['Revisa temporada, clima y seguridad de cada actividad en fuentes oficiales.', 'Confirma requisitos de edad, condición física y equipo.', 'Verifica que los operadores tengan licencia y lee las políticas de cancelación.', 'Considera un seguro que cubra las actividades.', 'Deja días libres por cambios de clima.']
    }
  }
};

export const SELFCHECK = {
  en: ['I answered only what was asked.', 'My answer was clear and brief.', 'Everything I said is true.', 'It is consistent with my DS-160 and documents.', 'It was not a memorized script.'],
  pt: ['Respondi apenas o que foi perguntado.', 'Minha resposta foi clara e breve.', 'Tudo o que disse é verdade.', 'Está coerente com minha DS-160 e documentos.', 'Não foi um roteiro decorado.'],
  es: ['Respondí solo lo que se preguntó.', 'Mi respuesta fue clara y breve.', 'Todo lo que dije es verdad.', 'Es coherente con mi DS-160 y documentos.', 'No fue un guion memorizado.']
};
