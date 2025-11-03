/* ===========================================
   NetDAG – Unified Client Script
   - Loads includes (sidebar/ticker/footer)
   - Fixes /menu/ relative links via data-rel
   - Mobile drawer
   - Back-to-top
   - Page prev/next
   - Simple ticker scroll
   =========================================== */

(function () {
  const IS_MENU = location.pathname.replace(/\\/g,'/').includes('/menu/');
  const PREFIX  = IS_MENU ? '../' : './';

  /** ---------------- Includes Loader ---------------- */
  const includes = [
    { id: 'sidebar-placeholder', file: 'includes/sidebar.html' },
    { id: 'ticker-placeholder',  file: 'includes/ticker.html'  },
    { id: 'footer-placeholder',  file: 'includes/footer.html'  },
  ];

  Promise.all(includes.map(({id,file}) => {
    const el = document.getElementById(id);
    if (!el) return Promise.resolve();
    // adjust path root-aware
    const url = PREFIX + file;
    return fetch(url).then(r => r.ok ? r.text() : '').then(html => { if (html) el.innerHTML = html; });
  })).then(() => {
    // After includes are in, normalize any <a data-rel> inside them.
    fixDataRelLinks(document.body);
    initMobileMenu();
  });

  /** --------------- Normalize data-rel links --------------- */
  function fixDataRelLinks(scope) {
    scope.querySelectorAll('a[data-rel]').forEach(a => {
      const rel = a.getAttribute('data-rel');
      if (!rel) return;
      a.setAttribute('href', PREFIX + rel);
    });
  }
  // Also fix any data-rel links already present in the page HTML.
  fixDataRelLinks(document);

  /** ---------------- Mobile Drawer ---------------- */
  function initMobileMenu(){
    const drawer = document.getElementById('mobile-menu-container');
    const openBtn = document.getElementById('open-menu-btn');
    const closeBtn = drawer ? drawer.querySelector('#close-menu-btn') : null;
    const list = drawer ? drawer.querySelector('.mobile-nav-links') : null;

    // If the drawer exists (from include or inline), populate links from any visible navs/sidebars
    if (drawer && list && list.childElementCount === 0) {
      const links = [];
      // From header nav
      document.querySelectorAll('.nav-links a').forEach(a => links.push(a));
      // From side-menu include
      document.querySelectorAll('.side-menu a').forEach(a => links.push(a));
      const current = stripIndex(location.pathname);

      links.forEach(a => {
        const li = document.createElement('li');
        const c = document.createElement('a');
        c.href = a.href;
        c.textContent = a.textContent.trim();
        if (stripIndex(a.pathname) === current) c.setAttribute('aria-current','page');
        li.appendChild(c); list.appendChild(li);
      });
    }

    const open = () => { if (drawer) { drawer.hidden = false; drawer.setAttribute('aria-hidden','false'); } };
    const close = () => { if (drawer) { drawer.hidden = true;  drawer.setAttribute('aria-hidden','true'); } };

    openBtn && openBtn.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    drawer && drawer.addEventListener('click', (e)=>{ if(e.target===drawer) close(); });
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') close(); });

    function stripIndex(p){ return (p||'').replace(/\\/g,'/').replace(/index\.html$/,'').replace(/\/$/,''); }
  }

  /** ---------------- Back to Top ---------------- */
  (function backToTop(){
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    const toggle = () => {
      const show = window.scrollY > 400;
      btn.classList.toggle('show', show);
    };
    window.addEventListener('scroll', toggle, {passive:true});
    toggle();
    btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
  })();

  /** ---------------- Page Prev/Next ----------------
   * Map known pages so #page-nav can be auto-filled.
   * Add/rename freely; unknown pages simply won’t render controls.
   */
  (function pageNav(){
    const nav = document.getElementById('page-nav');
    if (!nav) return;

    const pages = [
      { href: 'index.html',          label: 'Home' },
      { href: 'bonding-curve.html',  label: 'Bonding Curve' },
      { href: 'guardian.html',       label: 'Guardian' },
      { href: 'provenance.html',     label: 'Provenance' },
      { href: 'dvpn.html',           label: 'dVPN' },

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
      { href: 'menu/contact.html',    label: 'Contact' },
    ];

    // Normalize current path relative to project root
    const here = location.pathname.replace(/\\/g,'/').split('/').filter(Boolean).slice(-2).join('/');
    const hereShort = here.includes('/') ? here : (IS_MENU ? 'menu/'+here : here);

    const idx = pages.findIndex(p => (IS_MENU ? p.href : p.href.replace(/^menu\//,'menu/') ) === hereShort);
    if (idx === -1) return;

    const prev = pages[idx-1], next = pages[idx+1];
    nav.innerHTML = '';
    if (prev){
      const a = document.createElement('a'); a.href = PREFIX + prev.href;
      a.innerHTML = '← ' + prev.label; nav.appendChild(a);
    } else {
      const s = document.createElement('span'); s.style.opacity = .6; nav.appendChild(s);
    }
    if (next){
      const b = document.createElement('a'); b.href = PREFIX + next.href;
      b.innerHTML = next.label + ' →'; nav.appendChild(b);
    }
  })();

  /** ---------------- Simple Marquee Ticker ----------------
   * If #ticker-track exists, it will scroll its text horizontally.
   * Put any text inside #ticker-track in /includes/ticker.html.
   */
  (function ticker(){
    const host = document.querySelector('.announcement-ticker');
    const track = document.getElementById('ticker-track');
    const clone = document.getElementById('ticker-track-clone');
    if (!host || !track || !clone) return;

    // If empty, provide a tiny default (safe to replace later in HTML)
    if (!track.textContent.trim()){
      track.textContent = 'Welcome to NetDAG — Stability by design • dVPN • Provenance • Guardian';
    }
    clone.textContent = track.textContent;

    // CSS-driven animation: we just set a class with custom property speed
    host.style.setProperty('--ticker-speed','28s');

    // Inject minimal keyframes once
    if (!document.getElementById('ndg-ticker-style')){
      const style = document.createElement('style');
      style.id = 'ndg-ticker-style';
      style.textContent = `
        .announcement-ticker .ticker-text{animation:ndg-marquee var(--ticker-speed,28s) linear infinite}
        @keyframes ndg-marquee{
          0%{ transform:translateX(0) }
          100%{ transform:translateX(-50%) }
        }
      `;
      document.head.appendChild(style);
    }
  })();

})();
