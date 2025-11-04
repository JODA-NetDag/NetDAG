/* ===========================================
   NetDAG – Unified Client Script
   - Loads includes (ticker/nav/sidebar/PHN/footer)
   - Fixes relative links via data-rel / data-href
   - Mobile drawer
   - Back-to-top
   - Page Prev • Home • Next (PHN)
   - Simple marquee ticker
   =========================================== */

(function () {
  /* ---------- context & helpers ---------- */
  const IS_MENU = location.pathname.replace(/\\/g, '/').includes('/menu/');
  const PREFIX  = IS_MENU ? '../' : './';      // for page links
  const INC     = '/includes';                  // root-absolute includes

  function stripIndex(p) {
    return (p || '')
      .replace(/\\/g, '/')
      .replace(/index\.html$/i, '')
      .replace(/\/$/, '');
  }

  /* ---------- LINK FIX (data-rel / data-href) ---------- */
  function fixDataRelLinks(scope) {
    (scope || document).querySelectorAll('a[data-rel], a[data-href]').forEach(a => {
      const rel = a.getAttribute('data-rel') || a.getAttribute('data-href');
      if (!rel) return;
      a.setAttribute('href', PREFIX + rel.replace(/^\.?\//, ''));
    });
  }

  /* ---------- INCLUDES LOADER ---------- */
  const INCLUDES = [
    { id: 'ticker-placeholder',  file: `${INC}/ticker.html`  },
    { id: 'nav-placeholder',     file: `${INC}/topnav.html`  },
    { id: 'sidebar-placeholder', file: `${INC}/sidebar.html` },
    { id: 'phn-placeholder',     file: `${INC}/phn.html`     },
    { id: 'footer-placeholder',  file: `${INC}/footer.html`  }
  ];

  function loadIncludes() {
    return Promise.all(
      INCLUDES.map(({ id, file }) => {
        const el = document.getElementById(id);
        if (!el) return Promise.resolve();
        return fetch(file, { cache: 'no-store' })
          .then(r => (r.ok ? r.text() : ''))
          .then(html => { if (html) el.innerHTML = html; });
      })
    );
  }

  /* ---------- PHN (Prev • Home • Next) ---------- */
  function buildPHN(){
  let nav = document.getElementById('page-nav');
  if (!nav) {
    const holder = document.getElementById('phn-placeholder');
    if (!holder) return;
    nav = document.createElement('nav');
    nav.id = 'page-nav';
    nav.className = 'page-nav';
    nav.setAttribute('aria-label','Page navigation');
    holder.appendChild(nav);
  }
  
  const IS_MENU = location.pathname.replace(/\\/g,'/').includes('/menu/');
  const PREFIX  = IS_MENU ? '../' : './';

  // List pages as slugs (no .html)
  const pages = [
    { slug: 'index',            label: 'Home' },
    { slug: 'bonding-curve',    label: 'Bonding Curve' },
    { slug: 'guardian',         label: 'Guardian' },
    { slug: 'provenance',       label: 'Provenance' },
    { slug: 'dvpn',             label: 'dVPN' },
    { slug: 'menu/whitepaper',  label: 'Whitepaper' },
    { slug: 'menu/vision',      label: 'Vision' },
    { slug: 'menu/faq',         label: 'FAQ' },
    { slug: 'menu/tokenomics',  label: 'Tokenomics' },
    { slug: 'menu/roadmap',     label: 'Roadmap' },
    { slug: 'menu/ambassador',  label: 'Ambassador' },
    { slug: 'menu/charity',     label: 'Charity' },
    { slug: 'menu/blog',        label: 'Blog' },
    { slug: 'menu/partners',    label: 'Partners' },
    { slug: 'menu/legal',       label: 'Legal' },
    { slug: 'menu/contact',     label: 'Contact' },
  ];

  // Normalize current path to a slug (no .html, no trailing slash)
  function toSlug(pathname){
    const parts = pathname.replace(/\\/g,'/').split('/').filter(Boolean);
    // keep possible 'menu' + file
    let take = parts.slice(-2).join('/');
    if (take.endsWith('/')) take = take.slice(0, -1);
    take = take.replace(/\.html?$/i,'');      // strip .html if present
    if (take === '') return 'index';
    // if not in /menu/ but link record is menu/* we’ll handle via IS_MENU/PREFIX below
    return take;
  }

  const hereSlug = toSlug(location.pathname);
  const idx = pages.findIndex(p => p.slug === hereSlug || ('menu/'+hereSlug) === p.slug);
  if (idx === -1) return;

  const prev = pages[idx - 1], next = pages[idx + 1];

  // Rebuild PHN
  nav.innerHTML = '';

  if (prev){
    const a = document.createElement('a');
    a.href = PREFIX + prev.slug + (prev.slug.endsWith('index') ? '.html' : '.html');
    a.innerHTML = '← ' + prev.label;
    if (prev.slug === 'index') a.href = PREFIX + 'index.html';
    nav.appendChild(a);
  }

  const home = document.createElement('a');
  home.href = PREFIX + 'index.html';
  home.textContent = 'Home';
  nav.appendChild(home);

  if (next){
    const b = document.createElement('a');
    b.href = PREFIX + next.slug + (next.slug.endsWith('index') ? '.html' : '.html');
    if (next.slug === 'index') b.href = PREFIX + 'index.html';
    b.innerHTML = next.label + ' →';
    nav.appendChild(b);
  }
}
  /* ---------- MOBILE DRAWER ---------- */
  function initMobileMenu() {
    const drawer  = document.getElementById('mobile-menu-container');
    const openBtn = document.getElementById('open-menu-btn');
    const closeBtn = drawer ? drawer.querySelector('#close-menu-btn') : null;
    const list    = drawer ? drawer.querySelector('.mobile-nav-links') : null;

    // Populate once from header+sidebar links if empty
    if (drawer && list && list.childElementCount === 0) {
      const links = [];
      document.querySelectorAll('#nav-placeholder .nav-links a').forEach(a => links.push(a));
      document.querySelectorAll('#sidebar-placeholder .sidenav a, #sidebar-placeholder .sidenav-links a')
        .forEach(a => links.push(a));

      const current = stripIndex(location.pathname);
      links.forEach(a => {
        const li = document.createElement('li');
        const c  = document.createElement('a');
        c.href = a.href;
        c.textContent = a.textContent.trim();
        if (stripIndex(a.pathname) === current) c.setAttribute('aria-current', 'page');
        li.appendChild(c);
        list.appendChild(li);
      });
    }

    const open  = () => { if (drawer) { drawer.hidden = false; drawer.setAttribute('aria-hidden', 'false'); } };
    const close = () => { if (drawer) { drawer.hidden = true;  drawer.setAttribute('aria-hidden', 'true');  } };

    openBtn && openBtn.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    drawer && drawer.addEventListener('click', (e) => { if (e.target === drawer) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ---------- BACK TO TOP ---------- */
  (function backToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    const toggle = () => btn.classList.toggle('show', window.scrollY > 400);
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  })();

  /* ---------- PRESALE COUNTDOWN ---------- */
  (function initPresaleTimer() {
    const root = document.getElementById('presale-timer');
    if (!root) return;

    const targetISO = root.getAttribute('data-target') || '2025-12-14T00:00:00+01:00';
    const liveText  = root.getAttribute('data-live-text') || 'Presale is LIVE';

    const $d = document.getElementById('t-days');
    const $h = document.getElementById('t-hours');
    const $m = document.getElementById('t-mins');
    const $s = document.getElementById('t-secs');

    const target = new Date(targetISO).getTime();
    if (isNaN(target)) return console.warn('[NDG] Invalid presale target:', targetISO);

    let handle = null;
    const pad = n => (n < 10 ? '0' : '') + n;

    function tick() {
      const now = Date.now();
      let diff = target - now;

      if (diff <= 0) {
        clearInterval(handle);
        if ($d) $d.textContent = '00';
        if ($h) $h.textContent = '00';
        if ($m) $m.textContent = '00';
        if ($s) $s.textContent = '00';
        const h2 = root.querySelector('h2');
        if (h2) h2.textContent = liveText;
        root.classList.add('live');
        return;
      }

      const days  = Math.floor(diff / (1000 * 60 * 60 * 24)); diff -= days  * (1000 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1000 * 60 * 60));      diff -= hours * (1000 * 60 * 60);
      const mins  = Math.floor(diff / (1000 * 60));           diff -= mins  * (1000 * 60);
      const secs  = Math.floor(diff / 1000);

      if ($d) $d.textContent = pad(days);
      if ($h) $h.textContent = pad(hours);
      if ($m) $m.textContent = pad(mins);
      if ($s) $s.textContent = pad(secs);
    }

    tick();
    handle = setInterval(tick, 1000);
  })();

  /* ---------- SIMPLE MARQUEE TICKER ---------- */
  (function ticker() {
    const host  = document.querySelector('.announcement-ticker');
    const track = document.getElementById('ticker-track');
    const clone = document.getElementById('ticker-track-clone');
    if (!host || !track || !clone) return;

    if (!track.textContent.trim()) {
      track.textContent = 'Welcome to NetDAG — Stability by design • dVPN • Provenance • Guardian';
    }
    clone.textContent = track.textContent;

    host.style.setProperty('--ticker-speed', '28s');

     if (!document.getElementById('ndg-ticker-style')) {
      const style = document.createElement('style');
      style.id = 'ndg-ticker-style';
      style.textContent = `
        .announcement-ticker .ticker-text {
          animation: ndg-marquee var(--ticker-speed,28s) linear infinite;
        }
        @keyframes ndg-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `;
      document.head.appendChild(style);
    }
  })();

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    loadIncludes().then(() => {
      // After includes are in place:
      fixDataRelLinks(document);
      buildPHN();
      initMobileMenu();
    });
  });
})(); 
