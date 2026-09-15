/* ============================================================
   Toggle de idioma ES / EN
   El español es el idioma por defecto y vive en el HTML: cada elemento
   traducible lleva data-i18n="clave", y su contenido en español se lee
   del propio documento al arrancar. Acá solo se guarda la versión en
   inglés de cada clave. Sin JS, la página se ve completa en español.
   ============================================================ */
(function () {
  var STORAGE_KEY = 'lang';
  var DEFAULT_LANG = 'es';

  var en = {
    'meta.title': 'Jose Quispe — Data Engineer & Data Analyst',
    'meta.description': 'Jose Quispe — Data Engineer building conversational LLM & voice AI systems, Python automation, and data pipelines.',
    'toggle.label': 'Cambiar a español',

    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.work': 'Work',
    'nav.contact': 'Contact',
    'nav.cta': 'Say hi',

    'hero.eyebrow': 'Data Engineer&nbsp;| Data Analyst&nbsp;| Automation&nbsp;| LLM &amp; Voice AI Agents',
    'hero.sub': 'I build <span class="hl">conversational LLM &amp; voice AI systems</span>, automate workflows with Python, and design data pipelines that run on their own.',
    'hero.work': 'See my work',

    'about.title': 'About',
    'about.text': 'I\'m a Data Engineer who has spent the last few years moving from classic data science into building production systems: automation pipelines, large-scale data infrastructure on GCP, and — most recently — conversational AI products that talk to people over text and voice. I like taking a messy, manual process and turning it into something reliable that runs without me watching it.',
    'about.focus': '<span>Focus</span>Data pipelines · LLM &amp; voice AI · Python automation',
    'about.cloud': '<span>Cloud</span>Google Cloud Platform, BigQuery',
    'about.background': '<span>Background</span>Started in data science &amp; ML, moved into engineering',

    'skills.title': 'Skills',

    'work.title': 'Selected Work',
    'work.badgePrivate': 'Private case study',
    'work.badgePublic': 'Public repo',
    'work.viewGithub': 'View on GitHub ↗',
    'work.whatsapp.title': 'Conversational AI Platform for WhatsApp Campaigns',
    'work.whatsapp.text': 'Designed and built the backend that powers automated inbound and outbound WhatsApp conversations for call-center campaigns: a routing engine that manages multiple connected WhatsApp accounts, an LLM-based response generator, and a monitoring/configuration frontend for the operations team.',
    'work.voice.title': 'Voice AI for Call Center Operations',
    'work.voice.text': 'Built an AI assistant embedded in the outbound dialer that gives agents real-time suggestions during live calls, plus a pipeline that improves the accuracy and structure of call transcriptions for downstream analysis.',
    'work.scoring.title': 'Lead Scoring Pipeline',
    'work.scoring.text': 'End-to-end pipeline that periodically scores leads so sales teams always work the best available contacts first — from raw data ingestion to a production scoring model.',
    'work.dashboard.title': 'Call Center Performance Dashboard',
    'work.dashboard.text': 'Desktop application that turns raw call-center activity data into performance statistics and visualizations for supervisors.',

    'contact.title': 'Let\'s build something.',
    'contact.sub': 'Open to collaborating on projects, talking AI/ML trends, or exploring new roles.',

    'footer': 'Jose Quispe — built with plain HTML/CSS, hosted on GitHub Pages.'
  };

  var meta = document.querySelector('meta[name="description"]');
  var toggle = document.querySelector('.lang-toggle');
  var nodes = document.querySelectorAll('[data-i18n]');

  // El español se toma del HTML tal cual está, así hay una sola fuente de
  // verdad para el idioma por defecto y no hace falta duplicarlo acá.
  var es = {
    'meta.title': document.title,
    'meta.description': meta ? meta.getAttribute('content') : '',
    'toggle.label': toggle ? toggle.getAttribute('aria-label') : ''
  };
  for (var i = 0; i < nodes.length; i++) {
    es[nodes[i].getAttribute('data-i18n')] = nodes[i].innerHTML;
  }

  var dicts = { es: es, en: en };

  function apply(lang) {
    var t = dicts[lang] || dicts[DEFAULT_LANG];

    for (var j = 0; j < nodes.length; j++) {
      var key = nodes[j].getAttribute('data-i18n');
      if (key in t) nodes[j].innerHTML = t[key];
    }

    document.documentElement.lang = lang;
    document.title = t['meta.title'];
    if (meta) meta.setAttribute('content', t['meta.description']);
    if (toggle) toggle.setAttribute('aria-label', t['toggle.label']);
  }

  function load() {
    // localStorage puede tirar (modo privado, permisos): si falla, default.
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  var current = load();
  if (!dicts[current]) current = DEFAULT_LANG;
  if (current !== DEFAULT_LANG) apply(current);

  if (toggle) {
    toggle.addEventListener('click', function () {
      current = current === 'es' ? 'en' : 'es';
      apply(current);
      save(current);
    });
  }
})();
