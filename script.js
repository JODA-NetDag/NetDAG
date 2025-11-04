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
  function buildPHN() {
    let nav = document.getElementById('page-nav');
    if (!nav) {
      const holder = document.getElementById('phn-placeholder');
      if (!holder) return; // page doesn't want PHN
      nav = document.createElement('nav');
      nav.id = 'page-nav';
      nav.className = 'page-nav';
      nav.setAttribute('aria-label', 'Page navigation');
      holder.appendChild(nav);
    }

    const pages = [
      { href: 'index.html',           label: 'Home' },
      { href: 'bonding-curve.html',   label: 'Bonding Curve' },
      { href: 'guardian.html',        label: 'Guardian' },
      { href: 'provenance.html',      label: 'Provenance' },
      { href: 'dvpn.html',            label: 'dVPN' },
      { href: 'menu/whitepaper.html', label: 'Whitepaper' },
      { href: 'menu/vision.html',     label: 'Vision' },
      { href: 'menu/faq.html',        label: 'FAQ' },
      { href: 'menu/tokenomics.html', label: 'Tokenomics' },
      { href: 'menu/roadmap.html',    label: 'Roadmap' },
      { href: 'menu/ambassador.html', label: 'Ambassador' },
      { href: 'menu/charity.html',    label: 'Charity' },
      { href: 'menu/blog.html',       label: 'Blog' },
      { href: 'menu/partners.html',   label: 'Partners' },
      { href: 'menu/legal.html',      label: 'Legal' },
      { href: 'menu/contact.html',    label: 'Contact' }
    ];

    const parts = location.pathname.replace(/\\/g, '/').split('/').filter(Boolean);
    const here  = parts.slice(-2).join('/');
    const key   = here.includes('/') ? here : (IS_MENU ? 'menu/' + here : here);

    const idx = pages.findIndex(p => p.href === key);
    if (idx === -1) return;

    const prev = pages[idx - 1], next = pages[idx + 1];
    nav.innerHTML = '';

    if (prev) {
      const a = document.createElement('a');
      a.href = PREFIX + prev.href;
      a.innerHTML = '← ' + prev.label;
      nav.appendChild(a);
    }

    const home = document.createElement('a');
    home.href = PREFIX + 'index.html';
    home.textContent = 'Home';
    nav.appendChild(home);

    if (next) {
      const b = document.createElement('a');
      b.href = PREFIX + next.href;
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
