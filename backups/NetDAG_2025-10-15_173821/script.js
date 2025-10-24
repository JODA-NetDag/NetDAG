/* =========================
   NetDAG site script
   - Mobile drawer menu (works on root and /menu pages)
   - Presale countdown (CET)
   ========================= */

/* ---------- Drawer Menu ---------- */
(function () {
  const menu  = document.getElementById('mobile-menu-container');
  const open  = document.getElementById('open-menu-btn');
  const close = document.getElementById('close-menu-btn');
  const list  = document.querySelector('.mobile-nav-links');

  // If a page is missing the shell, bail out quietly.
  if (!menu || !open || !close || !list) return;

  // Work out relative paths: are we in /menu/ right now?
  const inMenuFolder = location.pathname.replace(/\\/g, '/').includes('/menu/');
  const base = inMenuFolder ? '../' : '';

  // Top navbar pages (also shown in drawer)
  const core = [
    { href: base + 'bonding-curve.html', label: 'Bonding Curve' },
    { href: base + 'guardian.html',      label: 'NetDAG Guardian' },
    { href: base + 'provenance.html',    label: 'Provenance' },
    { href: base + 'dvpn.html',          label: 'dVPN' }
  ];

  // Menu-only pages (you said Presale page was removed)
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

  // Build the drawer once
  if (!list.dataset.built) {
    const items = [...core, ...extras];
    list.innerHTML = items.map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('');
    list.dataset.built = 'true';
  }

  // Open/close helpers
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

  // Events
  open.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);

  // Close when clicking outside the panel
  menu.addEventListener('click', (e) => {
    const content = e.target.closest('.mobile-menu-content');
    if (!content) closeMenu();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when navigating from a menu link
  list.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) closeMenu();
  });
})();

/* ---------- Presale Countdown (CET) ---------- */
(function () {
  const elD = document.getElementById('d');
  const elH = document.getElementById('h');
  const elM = document.getElementById('m');
  const elS = document.getElementById('s');
  const title = document.getElementById('presale-title');

  // If this page has no timer, stop here.
  if (!elD || !elH || !elM || !elS || !title) return;

  // CET in December is UTC+1
  const targetMs = new Date('2025-12-14T00:00:00+01:00').getTime();
  const pad = (n) => String(n).padStart(2, '0');

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, targetMs - now);

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24)); diff -= days  * 86400000;
    const hours = Math.floor(diff / (1000 * 60 * 60));      diff -= hours * 3600000;
    const mins  = Math.floor(diff / (1000 * 60));           diff -= mins  * 60000;
    const secs  = Math.floor(diff / 1000);

    elD.textContent = pad(days);
    elH.textContent = pad(hours);
    elM.textContent = pad(mins);
    elS.textContent = pad(secs);

    if (targetMs - now <= 0) {
      title.textContent = 'Presale is LIVE now!';
      clearInterval(timer);
    }
  }

  tick();
  const timer = setInterval(tick, 1000);
})();
