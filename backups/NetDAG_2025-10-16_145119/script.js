/* =========================
   NetDAG — Unified script.js
   - Theme toggle (persists)
   - Drawer menu (root + /menu, desktop docked)
   - Internal i18n (EN/DE/FR) for nav + hero + optional per-page hero
   - Presale countdown (CET, only when elements exist)
   ========================= */

/* ---------- Internal i18n (seed) ---------- */
const I18N = {
  en: {
    nav: {
      bonding_curve: "Bonding Curve",
      guardian: "NetDAG Guardian",
      provenance: "Provenance",
      dvpn: "dVPN"
    },
    pages: {
      'index.html': {
        heroTitle: "NetDAG is the first crypto built with a <strong>mathematical shock absorber</strong>.",
        heroSubtitle: "Our technology is designed to protect your investment from market volatility, reward real-world use, and build a Web3 economy you can finally trust."
      },
      'bonding-curve.html': {
        heroTitle: "Stability by Design: The NetDAG Bonding Curve",
        heroSubtitle: "A mathematical engine that turns hype-driven swings into smooth, predictable pricing."
      },
      'guardian.html': {
        heroTitle: "Intelligence at the Core: The NetDAG Guardian",
        heroSubtitle: "Our AI layer predicts liquidity needs, detects anomalies, and proposes optimizations."
      },
      'provenance.html': {
        heroTitle: "Trust Written in Code: NetDAG Provenance",
        heroSubtitle: "Authenticity as on-chain proof — scannable by anyone, instantly."
      },
      'dvpn.html': {
        heroTitle: "Your Privacy, Powered by the People",
        heroSubtitle: "A decentralized VPN for secure, censorship-resistant internet access."
      },
      // menu pages (optional, many already use static text)
      'menu/vision.html': {
        heroTitle: "Our Vision",
        heroSubtitle: "A crypto economy people can actually trust: resilient by design, useful in daily life, and governed in the open."
      },
      'menu/faq.html': {
        heroTitle: "Frequently Asked Questions",
        heroSubtitle: "Learn how the NetDAG ecosystem works — from bonding curves to AI-powered stability."
      },
      'menu/roadmap.html': {
        heroTitle: "NetDAG Roadmap",
        heroSubtitle: "From presale on 30 Nov 2025 to global-scale adoption — a measured plan that prioritizes stability, utility, and transparency."
      },
      'menu/whitepaper.html': {
        heroTitle: "NetDAG Whitepaper",
        heroSubtitle: "A decentralized framework for trust, stability, and real-world utility."
      }
    }
  },
  de: {
    nav: {
      bonding_curve: "Bonding Curve",
      guardian: "NetDAG Guardian",
      provenance: "Herkunftsnachweis",
      dvpn: "dVPN"
    },
    pages: {
      'index.html': {
        heroTitle: "NetDAG ist die erste Kryptowährung mit einem <strong>mathematischen Stoßdämpfer</strong>.",
        heroSubtitle: "Unsere Technologie schützt vor Volatilität, belohnt echte Nutzung und baut eine vertrauenswürdige Web3-Ökonomie."
      },
      'bonding-curve.html': {
        heroTitle: "Stabilität durch Design: Die NetDAG Bonding Curve",
        heroSubtitle: "Ein mathematischer Motor, der Hype-Schwankungen in vorhersehbare Preisbewegungen verwandelt."
      },
      'guardian.html': {
        heroTitle: "Intelligenz im Kern: Der NetDAG Guardian",
        heroSubtitle: "Unsere KI-Schicht prognostiziert Liquiditätsbedarf, erkennt Anomalien und schlägt Optimierungen vor."
      },
      'provenance.html': {
        heroTitle: "Vertrauen im Code: NetDAG Herkunftsnachweis",
        heroSubtitle: "Echtheit als On-Chain-Beweis — für alle sofort prüfbar."
      },
      'dvpn.html': {
        heroTitle: "Deine Privatsphäre, von Menschen betrieben",
        heroSubtitle: "Ein dezentraler VPN für sichere, zensurresistente Verbindungen."
      }
    }
  },
  fr: {
    nav: {
      bonding_curve: "Courbe de liaison",
      guardian: "NetDAG Guardian",
      provenance: "Traçabilité",
      dvpn: "dVPN"
    },
    pages: {
      'index.html': {
        heroTitle: "NetDAG est la première crypto dotée d’un <strong>amortisseur mathématique</strong>.",
        heroSubtitle: "Notre technologie protège contre la volatilité, récompense l’usage réel et construit une économie Web3 fiable."
      },
      'bonding-curve.html': {
        heroTitle: "Stabilité par conception : la Courbe de liaison NetDAG",
        heroSubtitle: "Un moteur mathématique qui transforme la volatilité en trajectoires de prix prévisibles."
      },
      'guardian.html': {
        heroTitle: "L’intelligence au cœur : le NetDAG Guardian",
        heroSubtitle: "Notre couche IA anticipe la liquidité, détecte les anomalies et propose des optimisations."
      },
      'provenance.html': {
        heroTitle: "La confiance écrite dans le code : Traçabilité NetDAG",
        heroSubtitle: "Authenticité on-chain — vérifiable par tous, instantanément."
      },
      'dvpn.html': {
        heroTitle: "Votre vie privée, portée par le peuple",
        heroSubtitle: "Un VPN décentralisé pour un accès sécurisé et résistant à la censure."
      }
    }
  }
};

const getLang = () => localStorage.getItem('ndg_lang') || 'en';
const setLang = (c) => localStorage.setItem('ndg_lang', c);

/* Translate navbar link text */
function translateNavbarLinks() {
  const map = new Map([
    ['bonding-curve.html', 'nav.bonding_curve'],
    ['guardian.html',      'nav.guardian'],
    ['provenance.html',    'nav.provenance'],
    ['dvpn.html',          'nav.dvpn']
  ]);
  const dict = I18N[getLang()] || I18N.en;
  document.querySelectorAll('.nav-links a[href]').forEach(a => {
    const href = a.getAttribute('href');
    const key = map.get(href);
    if (key) {
      const [ns, prop] = key.split('.');
      a.textContent = dict[ns] && dict[ns][prop] ? dict[ns][prop] : I18N.en[ns][prop];
    }
  });
}

/* Auto-translate hero title/subtitle (no HTML edits needed) */
function translateAutoHero() {
  const lang = getLang();
  const dict = I18N[lang] || I18N.en;

  // normalize path, try exact then fallback to last segment
  const pathRaw = location.pathname.replace(/\\/g,'/').replace(/^\//,'');
  const key = dict.pages?.[pathRaw]
      ? pathRaw
      : dict.pages?.[pathRaw.split('/').slice(-1)[0]]
        ? pathRaw.split('/').slice(-1)[0]
        : null;

  if (!key) return;

  const pageStrings = dict.pages[key];
  const hTitle = document.querySelector('.hero-title');
  const hSub   = document.querySelector('.hero-subtitle');
  if (hTitle && pageStrings.heroTitle) hTitle.innerHTML = pageStrings.heroTitle;
  if (hSub   && pageStrings.heroSubtitle) hSub.innerHTML = pageStrings.heroSubtitle;
}

/* Run both translations */
function runTranslations() {
  translateNavbarLinks();
  translateAutoHero();
}

/* ---------- Language button (toggles our internal i18n panel if present) ---------- */
(function () {
  const btn = document.getElementById('lang-btn');
  if (!btn) return;

  // simple small popup panel
  let panel = document.getElementById('lang-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'lang-panel';
    panel.className = 'lang-panel';
    panel.hidden = true;
    panel.innerHTML = `
      <ul class="lang-list">
        <li class="lang-item" data-code="en">English</li>
        <li class="lang-item" data-code="de">Deutsch</li>
        <li class="lang-item" data-code="fr">Français</li>
      </ul>`;
    document.body.appendChild(panel);
  }

  function open()  { panel.hidden = false; document.addEventListener('click', onDoc, {capture:true}); }
  function close() { panel.hidden = true;  document.removeEventListener('click', onDoc, {capture:true}); }
  function onDoc(e){
    const insideBtn = e.target === btn || btn.contains(e.target);
    const insidePanel = e.target === panel || panel.contains(e.target);
    if (!insideBtn && !insidePanel) close();
  }

  btn.addEventListener('click', () => panel.hidden ? open() : close());
  panel.addEventListener('click', (e) => {
    const li = e.target.closest('.lang-item');
    if (!li) return;
    setLang(li.dataset.code);
    runTranslations();
    buildDrawer(true);  // rebuild menu labels
    close();
  });

  // set active language on load
  runTranslations();
})();

/* ---------- Drawer menu (mobile overlay, desktop docked open) ---------- */
let drawerBuilt = false;
function buildDrawer(forceRebuild = false) {
  const menu  = document.getElementById('mobile-menu-container');
  const open  = document.getElementById('open-menu-btn') || document.getElementById('mobile-menu-icon');
  const close = document.getElementById('close-menu-btn');
  const list  = document.querySelector('.mobile-nav-links');
  if (!menu || !open || !close || !list) return;
  if (drawerBuilt && !forceRebuild) return;

  const lang = getLang();
  const dict = I18N[lang] || I18N.en;

  const inMenuFolder = location.pathname.replace(/\\/g, '/').includes('/menu/');
  const base = inMenuFolder ? '../' : '';

  const core = [
    { href: base + 'bonding-curve.html', label: dict.nav.bonding_curve },
    { href: base + 'guardian.html',      label: dict.nav.guardian },
    { href: base + 'provenance.html',    label: dict.nav.provenance },
    { href: base + 'dvpn.html',          label: dict.nav.dvpn }
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

  const items = [...core, ...extras];
  list.innerHTML = items.map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('');

  const openMenu = () => {
    menu.hidden = false;
    menu.setAttribute('aria-hidden', 'false');
    // on desktop we leave body scroll alone (sidebar)
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      document.body.style.overflow = 'hidden';
    }
  };
  const closeMenu = () => {
    // on desktop keep it open (sidebar)
    if (window.matchMedia('(min-width: 1024px)').matches) return;
    menu.hidden = true;
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  open.onclick = openMenu;
  close.onclick = closeMenu;

  // click outside content closes (mobile only)
  menu.addEventListener('click', (e) => {
    const content = e.target.closest('.mobile-menu-content');
    if (!content) closeMenu();
  });

  // close after clicking a link (mobile only)
  list.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) closeMenu();
  });

  drawerBuilt = true;
}
document.addEventListener('DOMContentLoaded', () => buildDrawer(false));

/* ---------- Desktop sidebar: keep open on >=1024px ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('mobile-menu-container');
  const mqDesktop = window.matchMedia('(min-width: 1024px)');

  function applySidebarMode() {
    if (!menu) return;
    // set CSS var for header height if needed
    const header = document.querySelector('.navbar');
    if (header) document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');

    if (mqDesktop.matches) {
      menu.hidden = false;
      menu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('has-sidebar');
    } else {
      menu.hidden = true;
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('has-sidebar');
      document.body.style.overflow = '';
    }
  }

  applySidebarMode();
  mqDesktop.addEventListener('change', applySidebarMode);
});

/* ---------- Theme toggle (Dark/Light) ---------- */
(function () {
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // prefer saved; fallback to dark
  const saved = localStorage.getItem('theme');
  const initial = saved || 'dark';
  applyTheme(initial, false);

  if (btn) {
    btn.addEventListener('click', () => {
      const next = (root.getAttribute('data-theme') === 'light') ? 'dark' : 'light';
      applyTheme(next, true);
      localStorage.setItem('theme', next);
    });
  }

  function applyTheme(mode, animate) {
    root.setAttribute('data-theme', mode);
    if (btn) btn.textContent = (mode === 'light') ? '🌙' : '☀️';
    if (!animate) return;
    root.classList.add('theme-transition');
    setTimeout(() => root.classList.remove('theme-transition'), 220);
  }
})();

/* ---------- Presale Countdown (runs only if elements exist) ---------- */
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
      title.textContent = "Presale is LIVE now!";
      clearInterval(timer);
    }
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

/* ---------- Initial run (ensures nav/hero text localizes on first load) ---------- */
document.addEventListener('DOMContentLoaded', runTranslations);

/* ---------- Site-wide Google Translate (EN/DE/FR) ---------- */
(function () {
  // create a fixed container if it doesn't exist
  function ensureContainer() {
    if (!document.getElementById('google_translate_element')) {
      const el = document.createElement('div');
      el.id = 'google_translate_element';
      document.body.appendChild(el);
    }
  }

  // init callback required by Google
  window.googleTranslateElementInit = function () {
    // Only show EN/DE/FR in the dropdown
    new google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,de,fr',
        autoDisplay: false,
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      'google_translate_element'
    );
  };

  function loadGoogleScript() {
    if (document.getElementById('gt-script')) return; // already loaded
    const s = document.createElement('script');
    s.id = 'gt-script';
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(s);
  }

  document.addEventListener('DOMContentLoaded', () => {
    ensureContainer();
    loadGoogleScript();

    // (optional) toggle the widget when the globe button is clicked
    const btn = document.getElementById('lang-btn');
    const box = document.getElementById('google_translate_element');
    if (btn && box) {
      btn.addEventListener('click', () => {
        const hidden = box.getAttribute('data-hide') === '1';
        box.setAttribute('data-hide', hidden ? '0' : '1');
      });
    }
  });
})();
/* ---------- Sync our i18n with Google Translate ---------- */
function setGoogleLang(lang) {
  // Map to Google codes
  const target = ({ en: 'en', de: 'de', fr: 'fr' })[lang] || 'en';

  // Wait until the Google dropdown exists, then set it and fire change
  function apply() {
    const sel = document.querySelector('select.goog-te-combo');
    if (!sel) { setTimeout(apply, 300); return; }
    if (sel.value !== target) {
      sel.value = target;
      sel.dispatchEvent(new Event('change'));
    }
  }
  apply();
}

// 1) When the page loads, sync to saved language
document.addEventListener('DOMContentLoaded', () => {
  try { setGoogleLang(getLang()); } catch (e) {}
});

// 2) When the user picks a language via our list, also flip Google
//    (Hook into our existing language change if not already)
(function attachLangSync(){
  const panel = document.getElementById('lang-panel');
  if (!panel) return;
  panel.addEventListener('click', (e) => {
    const item = e.target.closest('.lang-item');
    if (!item) return;
    const code = item.dataset.code;
    try { setGoogleLang(code); } catch (e) {}
  });
})();
/* ----- keep Google in sync with our language & hide its UI ----- */
function setGoogleLang(lang) {
  const target = ({ en: 'en', de: 'de', fr: 'fr' })[lang] || 'en';

  // set the hidden Google dropdown value when it appears
  function apply() {
    const sel = document.querySelector('select.goog-te-combo');
    if (!sel) { setTimeout(apply, 250); return; }
    if (sel.value !== target) {
      sel.value = target;
      sel.dispatchEvent(new Event('change'));
    }
  }
  apply();
}

// on first load & back/forward cache restore
document.addEventListener('DOMContentLoaded', () => {
  try { setGoogleLang(getLang()); } catch {}
});
window.addEventListener('pageshow', () => {
  try { setGoogleLang(getLang()); } catch {}
});

// when a language is picked in our globe panel, also flip Google
document.addEventListener('click', (e) => {
  const item = e.target.closest('.lang-item');          // your language list items
  if (!item || !item.dataset.code) return;
  try { setGoogleLang(item.dataset.code); } catch {}
});