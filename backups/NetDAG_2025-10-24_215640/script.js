/* ============== NetDAG Unified Script ============== */
/* === 1. Translation dictionary === */
const I18N = {
  en: {
    nav: { bonding_curve: "Bonding Curve", guardian: "NetDAG Guardian", provenance: "Provenance", dvpn: "dVPN" },
    menu: {
      whitepaper: "Whitepaper", vision: "Vision", faq: "FAQ", roadmap: "Roadmap",
      tokenomics: "Tokenomics", ambassador: "Ambassador", charity: "Charity",
      blog: "Blog", partners: "Partners", contact: "Contact"
    },
    pages: {
      "index.html": {
        heroTitle: "NetDAG is the first crypto built with a <strong>mathematical shock absorber</strong>.",
        heroSubtitle: "Our technology protects your investment from volatility, rewards real-world use, and builds a Web3 economy you can trust."
      },
      "bonding-curve.html": {
        heroTitle: "Stability by Design: The NetDAG Bonding Curve",
        heroSubtitle: "A mathematical engine that turns hype-driven swings into smooth, predictable pricing."
      },
      "guardian.html": {
        heroTitle: "Intelligence at the Core: The NetDAG Guardian",
        heroSubtitle: "Our AI layer predicts liquidity needs, detects anomalies, and proposes optimizations."
      },
      "provenance.html": {
        heroTitle: "Trust Written in Code: NetDAG Provenance",
        heroSubtitle: "Authenticity as on-chain proof — scannable by anyone, instantly."
      },
      "dvpn.html": {
        heroTitle: "Your Privacy, Powered by the People",
        heroSubtitle: "A decentralized VPN for secure, censorship-resistant internet access."
      }
    }
  },
  de: {
    nav: { bonding_curve: "Bonding Curve", guardian: "NetDAG Guardian", provenance: "Herkunftsnachweis", dvpn: "dVPN" },
    menu: {
      whitepaper: "Whitepaper", vision: "Vision", faq: "FAQ", roadmap: "Fahrplan",
      tokenomics: "Tokenomics", ambassador: "Botschafter", charity: "Wohltätigkeit",
      blog: "Blog", partners: "Partner", contact: "Kontakt"
    },
    pages: {
      "index.html": {
        heroTitle: "NetDAG ist die erste Kryptowährung mit einem <strong>mathematischen Stoßdämpfer</strong>.",
        heroSubtitle: "Unsere Technologie schützt vor Volatilität, belohnt echte Nutzung und baut eine vertrauenswürdige Web3-Ökonomie."
      },
      "bonding-curve.html": {
        heroTitle: "Stabilität durch Design: Die NetDAG Bonding Curve",
        heroSubtitle: "Ein mathematischer Motor, der Hype-Schwankungen in vorhersehbare Preisbewegungen verwandelt."
      },
      "guardian.html": {
        heroTitle: "Intelligenz im Kern: Der NetDAG Guardian",
        heroSubtitle: "Unsere KI-Schicht prognostiziert Liquiditätsbedarf, erkennt Anomalien und schlägt Optimierungen vor."
      },
      "provenance.html": {
        heroTitle: "Vertrauen im Code: NetDAG Herkunftsnachweis",
        heroSubtitle: "Echtheit als On-Chain-Beweis — für alle sofort prüfbar."
      },
      "dvpn.html": {
        heroTitle: "Deine Privatsphäre, von Menschen betrieben",
        heroSubtitle: "Ein dezentraler VPN für sichere, zensurresistente Verbindungen."
      }
    }
  },
  fr: {
    nav: { bonding_curve: "Courbe de liaison", guardian: "NetDAG Guardian", provenance: "Traçabilité", dvpn: "dVPN" },
    menu: {
      whitepaper: "Livre blanc", vision: "Vision", faq: "FAQ", roadmap: "Feuille de route",
      tokenomics: "Tokénomique", ambassador: "Ambassadeur", charity: "Charité",
      blog: "Blog", partners: "Partenaires", contact: "Contact"
    },
    pages: {
      "index.html": {
        heroTitle: "NetDAG est la première crypto dotée d’un <strong>amortisseur mathématique</strong>.",
        heroSubtitle: "Notre technologie protège contre la volatilité, récompense l’usage réel et construit une économie Web3 fiable."
      },
      "bonding-curve.html": {
        heroTitle: "Stabilité par conception : la Courbe de liaison NetDAG",
        heroSubtitle: "Un moteur mathématique qui transforme la volatilité en trajectoires de prix prévisibles."
      },
      "guardian.html": {
        heroTitle: "L’intelligence au cœur : le NetDAG Guardian",
        heroSubtitle: "Notre couche IA anticipe la liquidité, détecte les anomalies et propose des optimisations."
      },
      "provenance.html": {
        heroTitle: "La confiance écrite dans le code : Traçabilité NetDAG",
        heroSubtitle: "Authenticité on-chain — vérifiable par tous, instantanément."
      },
      "dvpn.html": {
        heroTitle: "Votre vie privée, portée par le peuple",
        heroSubtitle: "Un VPN décentralisé pour un accès sécurisé et résistant à la censure."
      }
    }
  }
};

/* === 2. Helpers === */
const getLang = () => localStorage.getItem("ndg_lang") || "en";
const setLang = (c) => localStorage.setItem("ndg_lang", c);

/* === 3. Navbar + Hero translation === */
function translateNavbarLinks() {
  const map = new Map([
    ["bonding-curve.html", "nav.bonding_curve"],
    ["guardian.html", "nav.guardian"],
    ["provenance.html", "nav.provenance"],
    ["dvpn.html", "nav.dvpn"]
  ]);
  const dict = I18N[getLang()] || I18N.en;
  document.querySelectorAll(".nav-links a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    const key = map.get(href);
    if (!key) return;
    const [ns, prop] = key.split(".");
    a.textContent = (dict[ns] && dict[ns][prop]) ? dict[ns][prop] : I18N.en[ns][prop];
  });
}
function translateAutoHero() {
  const dict = I18N[getLang()] || I18N.en;
  const p = location.pathname.replace(/\\/g, "/").split("/").pop() || "index.html";
  const s = dict.pages && dict.pages[p];
  if (!s) return;
  const h1 = document.querySelector(".hero-title");
  if (h1 && s.heroTitle) h1.innerHTML = s.heroTitle;
  const p1 = document.querySelector(".hero-subtitle");
  if (p1 && s.heroSubtitle) p1.innerHTML = s.heroSubtitle;
}
function runTranslations() { translateNavbarLinks(); translateAutoHero(); }

/* === 4. Language dropdown (custom UI) === */
(function () {
  const btn = document.getElementById("lang-btn");
  if (!btn) return;

  let panel = document.getElementById("lang-panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "lang-panel";
    panel.className = "lang-panel";
    panel.hidden = true;
    panel.innerHTML = `<ul class="lang-list">
      <li class="lang-item" data-code="en">English <span class="lang-code">EN</span></li>
      <li class="lang-item" data-code="de">Deutsch <span class="lang-code">DE</span></li>
      <li class="lang-item" data-code="fr">Français <span class="lang-code">FR</span></li>
    </ul>`;
    document.body.appendChild(panel);
  }

  const open = () => { panel.hidden = false; document.addEventListener("click", onDoc, { capture: true }); };
  const close = () => { panel.hidden = true; document.removeEventListener("click", onDoc, { capture: true }); };
  const onDoc = (e) => {
    const insideBtn = btn.contains(e.target), insidePanel = panel.contains(e.target);
    if (!insideBtn && !insidePanel) close();
  };

  btn.addEventListener("click", () => (panel.hidden ? open() : close()));
  panel.addEventListener("click", (e) => {
    const li = e.target.closest(".lang-item"); if (!li) return;
    setLang(li.dataset.code);
    runTranslations();
    buildDrawer(true);
    try { setGoogleLang(getLang()); } catch {}
    close();
  });

  runTranslations();
})();

/* === 5. Sidebar / Drawer === */
let drawerBuilt = false;
function buildDrawer(force = false) {
  const menu = document.getElementById("mobile-menu-container");
  const open = document.getElementById("open-menu-btn") || document.getElementById("mobile-menu-icon");
  const close = document.getElementById("close-menu-btn");
  const list = document.querySelector(".mobile-nav-links");
  if (!menu || !open || !close || !list) return;
  if (drawerBuilt && !force) return;

  const dict = I18N[getLang()] || I18N.en;
  const inMenu = location.pathname.replace(/\\/g, "/").includes("/menu/");
  const base = inMenu ? "../" : "";

  const core = [
    { href: base + "bonding-curve.html", label: dict.nav.bonding_curve },
    { href: base + "guardian.html", label: dict.nav.guardian },
    { href: base + "provenance.html", label: dict.nav.provenance },
    { href: base + "dvpn.html", label: dict.nav.dvpn }
  ];
  const extras = [
    { href: base + "menu/whitepaper.html", label: dict.menu.whitepaper },
    { href: base + "menu/vision.html", label: dict.menu.vision },
    { href: base + "menu/faq.html", label: dict.menu.faq },
    { href: base + "menu/roadmap.html", label: dict.menu.roadmap },
    { href: base + "menu/tokenomics.html", label: dict.menu.tokenomics },
    { href: base + "menu/ambassador.html", label: dict.menu.ambassador },
    { href: base + "menu/charity.html", label: dict.menu.charity },
    { href: base + "menu/blog.html", label: dict.menu.blog },
    { href: base + "menu/partners.html", label: dict.menu.partners },
    { href: base + "menu/contact.html", label: dict.menu.contact }
  ];
  list.innerHTML = [...core, ...extras].map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('');

  const mq = window.matchMedia("(min-width:1024px)");
  const openMenu = () => { menu.hidden = false; menu.setAttribute("aria-hidden", "false"); if (!mq.matches) document.body.style.overflow = "hidden"; };
  const closeMenu = () => { if (mq.matches) return; menu.hidden = true; menu.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; };

  open.onclick = openMenu;
  close.onclick = closeMenu;
  menu.addEventListener("click", (e) => { if (!e.target.closest(".mobile-menu-content")) closeMenu(); });
  list.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });

  drawerBuilt = true;
}
document.addEventListener("DOMContentLoaded", () => buildDrawer(false));

/* === 6. Keep sidebar open on desktop === */
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("mobile-menu-container"); if (!menu) return;
  const mq = window.matchMedia("(min-width:1024px)");
  function apply() {
    const header = document.querySelector(".navbar");
    if (header) document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
    if (mq.matches) {
      menu.hidden = false; menu.setAttribute("aria-hidden", "false"); document.body.classList.add("has-sidebar");
    } else {
      menu.hidden = true; menu.setAttribute("aria-hidden", "true"); document.body.classList.remove("has-sidebar"); document.body.style.overflow = "";
    }
  }
  apply(); mq.addEventListener("change", apply);
});

/* === 7. Theme toggle === */
(function () {
  const btn = document.getElementById("theme-toggle"), root = document.documentElement;
  const saved = localStorage.getItem("theme") || "dark";
  apply(saved, false);
  function apply(mode, animate) {
    root.setAttribute("data-theme", mode);
    if (btn) btn.textContent = mode === "light" ? "🌙" : "☀️";
    if (!animate) return;
    root.classList.add("theme-transition");
    setTimeout(() => root.classList.remove("theme-transition"), 220);
  }
  if (btn) btn.addEventListener("click", () => {
    const next = (root.getAttribute("data-theme") === "light") ? "dark" : "light";
    apply(next, true); localStorage.setItem("theme", next);
  });
})();

/* === 8. Presale Countdown === */
(function () {
  const d = document.getElementById("d"), h = document.getElementById("h"), m = document.getElementById("m"), s = document.getElementById("s"), title = document.getElementById("presale-title");
  if (!d || !h || !m || !s || !title) return;
  const target = new Date("2025-12-14T00:00:00+01:00").getTime();
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const dd = Math.floor(diff / 86400000); diff -= dd * 86400000;
    const hh = Math.floor(diff / 3600000);  diff -= hh * 3600000;
    const mm = Math.floor(diff / 60000);    diff -= mm * 60000;
    const ss = Math.floor(diff / 1000);
    d.textContent = pad(dd); h.textContent = pad(hh); m.textContent = pad(mm); s.textContent = pad(ss);
    if (target - now <= 0) { title.textContent = "Presale is LIVE now!"; clearInterval(t); }
  }
  tick(); const t = setInterval(tick, 1000);
})();

/* === 9. Google Translate (hidden UI, full page) === */
(function () {
  function ensure() {
    if (!document.getElementById("google_translate_element")) {
      const el = document.createElement("div"); el.id = "google_translate_element"; document.body.appendChild(el);
    }
  }
  function applyGoogleLang(tgt) {
    document.cookie = "googtrans=/auto/" + tgt + ";path=/";
    document.cookie = "googtrans=/auto/" + tgt + ";domain=" + location.hostname + ";path=/";
    (function poke() {
      const sel = document.querySelector("select.goog-te-combo");
      if (!sel) { setTimeout(poke, 250); return; }
      if (sel.value !== tgt) { sel.value = tgt; sel.dispatchEvent(new Event("change")); }
    })();
  }
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: "en",
      includedLanguages: "en,de,fr,es,it,pt,ru,ar,hi,zh-CN,ja,nl,pl,tr",
      autoDisplay: false,
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, "google_translate_element");
    try {
      const map = { en: "en", de: "de", fr: "fr" };
      applyGoogleLang(map[getLang()] || "en");
    } catch {}
  };
  function load() {
    if (document.getElementById("gt-script")) return;
    const s = document.createElement("script"); s.id = "gt-script";
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(s);
  }
  window.setGoogleLang = function (lang) {
    const map = { en: "en", de: "de", fr: "fr" };
    applyGoogleLang(map[lang] || "en");
  };
  document.addEventListener("DOMContentLoaded", () => { ensure(); load(); });
})();

/* === 10. Page Navigation === */
(function () {
  // Skip auto nav on any /blog/ page (blog posts use manual buttons)
  if (location.pathname.replace(/\\/g, "/").includes("/blog/")) return;

  let host = document.getElementById("page-nav");
  if (!host) {
    host = document.createElement("nav");
    host.id = "page-nav";
    host.className = "page-nav";
    const footer = document.querySelector("footer.site-footer");
    footer ? footer.before(host) : document.body.appendChild(host);
  }

  const ORDER = [
    { path: "index.html",            label: "Home" },
    { path: "bonding-curve.html",    label: "Bonding Curve" },
    { path: "guardian.html",         label: "NetDAG Guardian" },
    { path: "provenance.html",       label: "Provenance" },
    { path: "dvpn.html",             label: "dVPN" },
    { path: "menu/whitepaper.html",  label: "Whitepaper" },
    { path: "menu/vision.html",      label: "Vision" },
    { path: "menu/faq.html",         label: "FAQ" },
    { path: "menu/roadmap.html",     label: "Roadmap" },
    { path: "menu/tokenomics.html",  label: "Tokenomics" },
    { path: "menu/ambassador.html",  label: "Ambassador" },
    { path: "menu/charity.html",     label: "Charity" },
    { path: "menu/blog.html",        label: "Blog" },
    { path: "menu/partners.html",    label: "Partners" },
    { path: "menu/contact.html",     label: "Contact" }
  ];

  const full = location.pathname.replace(/\\/g, "/");
  const file = full.split("/").pop() || "index.html";
  const inMenu = /\/menu\//.test(full);

  let idx = ORDER.findIndex(p => full.endsWith(p.path) || file === p.path.split("/").pop());
  if (idx < 0) idx = 0;

  const prev = idx > 0 ? ORDER[idx - 1] : null;
  const next = idx < ORDER.length - 1 ? ORDER[idx + 1] : null;
  const base = inMenu ? "../" : "";

  const href = (p) => !p ? "#" : (inMenu
    ? (p.path.startsWith("menu/") ? p.path.replace("menu/", "") : base + p.path)
    : p.path);

  const aPrev = prev ? `<a class="prev" href="${href(prev)}">← Previous</a>` : "";
  const aHome = `<a class="home" href="${inMenu ? base + "index.html" : "index.html"}">Home</a>`;
  const aNext = next ? `<a class="next" href="${href(next)}">Next →</a>` : "";

  host.innerHTML = `${aPrev}<span class="spacer"></span>${aHome}<span class="spacer"></span>${aNext}`;
})();

/* === 11. Back-to-top === */
(function () {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  const onScroll = () => { if (window.scrollY > 400) btn.classList.add("show"); else btn.classList.remove("show"); };
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

/* === 12. Initial translations on load === */
document.addEventListener("DOMContentLoaded", () => { try { runTranslations(); } catch {} });
document.addEventListener("DOMContentLoaded", () => { try { setGoogleLang(getLang()); } catch {} });
window.addEventListener("pageshow", () => { setTimeout(() => { try { setGoogleLang(getLang()); } catch {} }, 300); });
