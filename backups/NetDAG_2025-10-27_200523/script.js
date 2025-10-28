/* ============== NetDAG Unified Script (CLEAN) ============== */
/* === 1. Sidebar / Drawer === */
let drawerBuilt = false;
function buildDrawer(force = false) {
  const menu  = document.getElementById("mobile-menu-container");
  const open  = document.getElementById("open-menu-btn") || document.getElementById("mobile-menu-icon");
  const close = document.getElementById("close-menu-btn");
  const list  = document.querySelector(".mobile-nav-links");
  if (!menu || !open || !close || !list) return;
  if (drawerBuilt && !force) return;

   const inMenu = location.pathname.replace(/\\/g, "/").includes("/menu/");
  const base   = inMenu ? "../" : "";

  // Core (navbar) links — static English
  const core = [
    { href: base + "bonding-curve.html", label: "Bonding Curve" },
    { href: base + "guardian.html",      label: "NetDAG Guardian" },
    { href: base + "provenance.html",    label: "Provenance" },
    { href: base + "dvpn.html",          label: "dVPN" }
  ];

  // Extras (menu) — static English
  const extras = [
    { href: base + "menu/whitepaper.html", label: "Whitepaper" },
    { href: base + "menu/vision.html",     label: "Vision" },
    { href: base + "menu/faq.html",        label: "FAQ" },
    { href: base + "menu/roadmap.html",    label: "Roadmap" },
    { href: base + "menu/tokenomics.html", label: "Tokenomics" },
    { href: base + "menu/ambassador.html", label: "Ambassador" },
    { href: base + "menu/charity.html",    label: "Charity" },
    { href: base + "menu/blog.html",       label: "Blog" },
    { href: base + "menu/partners.html",   label: "Partners" },
    { href: base + "menu/contact.html",    label: "Contact" }
  ];

  list.innerHTML = [...core, ...extras]
    .map(i => `<li><a href="${i.href}">${i.label}</a></li>`)
    .join("");

  const mq = window.matchMedia("(min-width:1024px)");
  const openMenu = () => {
    menu.hidden = false;
    menu.setAttribute("aria-hidden", "false");
    if (!mq.matches) document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    if (mq.matches) return;
    menu.hidden = true;
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  open.onclick = openMenu;
  close.onclick = closeMenu;

  menu.addEventListener("click", (e) => {
    if (!e.target.closest(".mobile-menu-content")) closeMenu();
  });
  list.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });

  drawerBuilt = true;
}
document.addEventListener("DOMContentLoaded", () => buildDrawer(false));

/* === 2. Keep sidebar open on desktop === */
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("mobile-menu-container");
  if (!menu) return;
  const mq = window.matchMedia("(min-width:1024px)");

  function apply() {
    const header = document.querySelector(".navbar");
    if (header) {
      document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
    }
    if (mq.matches) {
      menu.hidden = false;
      menu.setAttribute("aria-hidden", "false");
      document.body.classList.add("has-sidebar");
    } else {
      menu.hidden = true;
      menu.setAttribute("aria-hidden", "true");
      document.body.classList.remove("has-sidebar");
      document.body.style.overflow = "";
    }
  }
  apply();
  mq.addEventListener("change", apply);
});

/* === 3. Presale Countdown === */
(function () {
  const d = document.getElementById("d"),
        h = document.getElementById("h"),
        m = document.getElementById("m"),
        s = document.getElementById("s"),
        title = document.getElementById("presale-title");
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

    d.textContent = pad(dd);
    h.textContent = pad(hh);
    m.textContent = pad(mm);
    s.textContent = pad(ss);

    if (target - now <= 0) {
      title.textContent = "Presale is LIVE now!";
      clearInterval(t);
    }
  }
  tick();
  const t = setInterval(tick, 1000);
})();

/* === 4. Page Navigation (Prev / Home / Next) === */
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

  const full   = location.pathname.replace(/\\/g, "/");
  const file   = full.split("/").pop() || "index.html";
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

/* === 5. Back-to-top === */
(function () {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  const onScroll = () => {
    if (window.scrollY > 400) btn.classList.add("show");
    else btn.classList.remove("show");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
 })();
