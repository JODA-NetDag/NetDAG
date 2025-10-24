/* =========================
   NetDAG site script
   - i18n stub (EN/DE/FR provided; others fall back to EN)
   - Language dropdown (30 choices; saves to localStorage)
   - Mobile drawer (root + /menu)
   - Presale countdown (CET)
   ========================= */

/* ---------- i18n dictionary (seed) ---------- */
const I18N = {
  en: {
    nav: {
      bonding_curve: "Bonding Curve",
      guardian: "NetDAG Guardian",
      provenance: "Provenance",
      dvpn: "dVPN"
    },
    hero: {
      title: "NetDAG is the first crypto built with a <strong>mathematical shock absorber</strong>.",
      subtitle: "Our technology is designed to protect your investment from market volatility, reward real-world use, and build a Web3 economy you can finally trust."
    },
    buttons: {
      connect_wallet: "Connect Wallet",
      buy_ndg: "Buy NDG",
      menu_open: "Open menu",
      menu_close: "Close menu",
      theme: "Toggle theme",
      language: "Change language"
    },
    timer: {
      title_prefix: "Presale Begins On",
      subtext: "Join the Ecosystem — early birds rewards 10% every 2 weeks.",
      days: "Days",
      hours: "Hours",
      mins: "Mins",
      secs: "Secs",
      live: "Presale is LIVE now!"
    }
  },
  de: {
    nav: {
      bonding_curve: "Bonding Curve",
      guardian: "NetDAG Guardian",
      provenance: "Herkunftsnachweis",
      dvpn: "dVPN"
    },
    hero: {
      title: "NetDAG ist die erste Kryptowährung mit einem <strong>mathematischen Stoßdämpfer</strong>.",
      subtitle: "Unsere Technologie schützt vor Volatilität, belohnt echte Nutzung und baut eine vertrauenswürdige Web3-Ökonomie."
    },
    buttons: {
      connect_wallet: "Wallet verbinden",
      buy_ndg: "NDG kaufen",
      menu_open: "Menü öffnen",
      menu_close: "Menü schließen",
      theme: "Theme umschalten",
      language: "Sprache ändern"
    },
    timer: {
      title_prefix: "Presale beginnt am",
      subtext: "Mach mit — Early Birds erhalten alle 2 Wochen 10 %.",
      days: "Tage",
      hours: "Stunden",
      mins: "Min",
      secs: "Sek",
      live: "Presale ist JETZT live!"
    }
  },
  fr: {
    nav: {
      bonding_curve: "Courbe de liaison",
      guardian: "NetDAG Guardian",
      provenance: "Traçabilité",
      dvpn: "dVPN"
    },
    hero: {
      title: "NetDAG est la première crypto dotée d’un <strong>amortisseur mathématique</strong>.",
      subtitle: "Notre technologie protège contre la volatilité, récompense l’usage réel et construit une économie Web3 fiable."
    },
    buttons: {
      connect_wallet: "Connecter le wallet",
      buy_ndg: "Acheter NDG",
      menu_open: "Ouvrir le menu",
      menu_close: "Fermer le menu",
      theme: "Changer de thème",
      language: "Changer de langue"
    },
    timer: {
      title_prefix: "Le presale commence le",
      subtext: "Rejoignez l’écosystème — 10 % toutes les 2 semaines pour les early birds.",
      days: "Jours",
      hours: "Heures",
      mins: "Mins",
      secs: "Secs",
      live: "Le presale est EN DIRECT !"
    }
  }
};
// fallback uses EN if key missing in selected language

/* ---------- language state + helpers ---------- */
const LANGS_LIST = [
  // EN/DE/FR first (as requested), then 27 more (native names)
  { code:'en', label:'English' },
  { code:'de', label:'Deutsch' },
  { code:'fr', label:'Français' },
  { code:'es', label:'Español' },
  { code:'it', label:'Italiano' },
  { code:'pt', label:'Português' },
  { code:'nl', label:'Nederlands' },
  { code:'pl', label:'Polski' },
  { code:'ru', label:'Русский' },
  { code:'uk', label:'Українська' },
  { code:'tr', label:'Türkçe' },
  { code:'el', label:'Ελληνικά' },
  { code:'sv', label:'Svenska' },
  { code:'da', label:'Dansk' },
  { code:'no', label:'Norsk' },
  { code:'fi', label:'Suomi' },
  { code:'cs', label:'Čeština' },
  { code:'hu', label:'Magyar' },
  { code:'ro', label:'Română' },
  { code:'bg', label:'Български' },
  { code:'sl', label:'Slovenščina' },
  { code:'hr', label:'Hrvatski' },
  { code:'sr', label:'Српски' },
  { code:'ca', label:'Català' },
  { code:'gl', label:'Galego' },
  { code:'ar', label:'العربية' },
  { code:'fa', label:'فارسی' },
  { code:'hi', label:'हिन्दी' },
  { code:'bn', label:'বাংলা' },
  { code:'zh', label:'中文（简体）' }
];

function getLang() {
  return localStorage.getItem('ndg_lang') || 'en';
}
function setLang(code) {
  localStorage.setItem('ndg_lang', code);
}

/* translate function with fallback chain */
function t(key, lang = getLang()) {
  const path = key.split('.');
  let src = (I18N[lang] || I18N.en);
  let val = path.reduce((o,k)=> (o && o[k] != null) ? o[k] : undefined, src);
  if (val == null) {
    // fallback to EN
    val = path.reduce((o,k)=> (o && o[k] != null) ? o[k] : undefined, I18N.en);
  }
  return val != null ? val : key;
}

/* apply translations to any element with data-i18n (optional, page-by-page) */
function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const targetAttr = el.getAttribute('data-i18n-attr'); // e.g., "aria-label" or "placeholder"
    const value = t(key);
    if (targetAttr) {
      el.setAttribute(targetAttr, value.replace(/<[^>]+>/g,'')); // attributes: strip HTML
    } else {
      el.innerHTML = value; // allow simple HTML like <strong> in hero.title
    }
  });
}

/* update static navbar link text (no HTML edits needed) */
function translateNavbarLinks() {
  const map = new Map([
    ['bonding-curve.html', 'nav.bonding_curve'],
    ['guardian.html',      'nav.guardian'],
    ['provenance.html',    'nav.provenance'],
    ['dvpn.html',          'nav.dvpn']
  ]);
  document.querySelectorAll('.nav-links a[href]').forEach(a => {
    const href = a.getAttribute('href');
    const key = map.get(href);
    if (key) a.textContent = t(key);
  });
}

/* ---------- Language Dropdown UI ---------- */
(function () {
  const btn = document.getElementById('lang-btn');
  if (!btn) return;

  let panel = document.getElementById('lang-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'lang-panel';
    panel.className = 'lang-panel';
    panel.hidden = true;
    panel.innerHTML = `<ul class="lang-list" id="lang-list"></ul>`;
    document.body.appendChild(panel);
  }
  const list = panel.querySelector('#lang-list');

  function renderLangList() {
    const cur = getLang();
    list.innerHTML = LANGS_LIST.map(({code,label}) => `
      <li class="lang-item ${code===cur?'is-active':''}" data-code="${code}">
        <span>${label}</span>
        <span class="lang-code">${code.toUpperCase()}</span>
      </li>
    `).join('');
  }
  renderLangList();

  function open()  { panel.hidden = false; document.addEventListener('keydown', onEsc); document.addEventListener('click', onDoc, {capture:true}); }
  function close() { panel.hidden = true;  document.removeEventListener('keydown', onEsc); document.removeEventListener('click', onDoc, {capture:true}); }
  function onEsc(e){ if (e.key === 'Escape') close(); }
  function onDoc(e){
    const insideBtn   = e.target === btn || btn.contains(e.target);
    const insidePanel = e.target === panel || panel.contains(e.target);
    if (!insideBtn && !insidePanel) close();
  }

  btn.addEventListener('click', () => panel.hidden ? open() : close());

  list.addEventListener('click', (e) => {
    const item = e.target.closest('.lang-item');
    if (!item) return;
    setLang(item.dataset.code);
    renderLangList();
    // update UI
    translateNavbarLinks();
    translatePage();
    // rebuild drawer items in new language
    buildDrawer(true);
    close();
  });

  // initial translate on load
  translateNavbarLinks();
  translatePage();
})();

/* ---------- Drawer Menu ---------- */
let drawerBuilt = false;
function buildDrawer(forceRebuild = false) {
  const menu  = document.getElementById('mobile-menu-container');
  const open  = document.getElementById('open-menu-btn');
  const close = document.getElementById('close-menu-btn');
  const list  = document.querySelector('.mobile-nav-links');
  if (!menu || !open || !close || !list) return;
  if (drawerBuilt && !forceRebuild) return;

  const inMenuFolder = location.pathname.replace(/\\/g, '/').includes('/menu/');
  const base = inMenuFolder ? '../' : '';

  const core = [
    { href: base + 'bonding-curve.html', key: 'nav.bonding_curve' },
    { href: base + 'guardian.html',      key: 'nav.guardian' },
    { href: base + 'provenance.html',    key: 'nav.provenance' },
    { href: base + 'dvpn.html',          key: 'nav.dvpn' }
  ];

  const extras = [
    { href: base + 'menu/whitepaper.html', label: 'Whitepaper' },
    { href: base + 'menu/vision.html',     label: 'Vision' },
    { href: base + 'menu/faq.html',        label: 'FAQ' },
    { href: base + 'menu/roadmap.html',    label: 'Roadmap' },
    { href: base + 'menu/tokenomics.html', label: 'Tokenomics' },
    { href: base + 'menu/ambassador.html', label: 'Ambassador' },
    { href: base + 'menu/charity.html',    label: 'Charity' },
    { href: base + 'menu/blog.html',       label: 'Blog' },
    { href: base + 'menu/partners.html',   label: 'Partners' },
    { href: base + 'menu/contact.html',    label: 'Contact' }
  ];

  const items = [...core.map(i => ({ href: i.href, label: t(i.key) })), ...extras];

  list.innerHTML = items.map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('');

  const openMenu = () => {
    menu.hidden = false;
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    menu.hidden = true;
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  open.onclick = openMenu;
  close.onclick = closeMenu;
  menu.addEventListener('click', (e) => {
    const content = e.target.closest('.mobile-menu-content');
    if (!content) closeMenu();
  });
  list.addEventListener('click', (e) => {
    const a = e.target.closest('a'); if (a) closeMenu();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  drawerBuilt = true;
}
document.addEventListener('DOMContentLoaded', () => buildDrawer(false));

/* ---------- Presale Countdown (CET) ---------- */
(function () {
  const elD = document.getElementById('d');
  const elH = document.getElementById('h');
  const elM = document.getElementById('m');
  const elS = document.getElementById('s');
  const title = document.getElementById('presale-title');

  if (!elD || !elH || !elM || !elS || !title) return;

  // CET in December is UTC+1
  const targetMs = new Date('2025-12-14T00:00:00+01:00').getTime();
  const pad = (n) => String(n).padStart(2, '0');

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, targetMs - now);

    const days  = Math.floor(diff / 86400000); diff -= days  * 86400000;
    const hours = Math.floor(diff / 3600000);  diff -= hours * 3600000;
    const mins  = Math.floor(diff / 60000);    diff -= mins  * 60000;
    const secs  = Math.floor(diff / 1000);

    elD.textContent = pad(days);
    elH.textContent = pad(hours);
    elM.textContent = pad(mins);
    elS.textContent = pad(secs);

    if (targetMs - now <= 0) {
      title.textContent = I18N[getLang()]?.timer?.live || I18N.en.timer.live;
      clearInterval(timer);
    }
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

// (your existing menu + language + theme scripts here)


// ===== Desktop sidebar behaviour =====
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('mobile-menu-container');
  const openBtn = document.getElementById('open-menu-btn') || document.getElementById('mobile-menu-icon');
  const closeBtn = document.getElementById('close-menu-btn');
  const mqDesktop = window.matchMedia('(min-width: 1024px)');

  function openMenu() {
    if (!menu) return;
    menu.hidden = false;
    menu.setAttribute('aria-hidden', 'false');
  }
  function closeMenu() {
    if (!menu) return;
    menu.hidden = true;
    menu.setAttribute('aria-hidden', 'true');
  }

  function applySidebarMode() {
    const header = document.querySelector('.navbar');
    if (header) {
      document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
    }

    if (mqDesktop.matches) {
      document.body.classList.add('has-sidebar');
      openMenu();
    } else {
      document.body.classList.remove('has-sidebar');
      closeMenu();
    }
  }

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      if (!mqDesktop.matches) openMenu();
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (!mqDesktop.matches) closeMenu();
    });
  }

  applySidebarMode();
  mqDesktop.addEventListener('change', applySidebarMode);
});

// ===== Theme toggle (Dark/Light) =====
(function () {
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // pick saved theme or system preference
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved || (prefersLight ? 'light' : 'dark');
  applyTheme(initial, false);

  if (btn) {
    btn.addEventListener('click', () => {
      const next = (root.getAttribute('data-theme') === 'light') ? 'dark' : 'light';
      applyTheme(next, true);
      localStorage.setItem('theme', next);
    });
  }

  // update icon + attribute + quick transition
  function applyTheme(mode, animate) {
    root.setAttribute('data-theme', mode);
    if (btn) btn.textContent = (mode === 'light') ? '🌙' : '☀️'; // icon flips
    if (!animate) return;
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 220);
  }
})();