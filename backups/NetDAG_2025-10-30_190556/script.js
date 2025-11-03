/* =========================
   NetDAG – Global Styles
   ========================= */

/* ---------- CSS Vars ---------- */
:root{
  --accent:#ff9900;
  --accent-2:#ffb84d;
  --border:#2a2a3a;
  --muted:#c0c0c0;
  --bg:#0a0a1a;
  --panel:#0f1724;
  --text:#e0e0e0;
  --glass:rgba(10,10,26,0.98);
  --max-width:1400px;
  --content-w:1100px;
  --font-sans:'Inter',system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --nav-h:64px;
  --header-h:64px;
  --sidebar-w:280px;
}

/* Light (if ever toggled) */
:root[data-theme="light"]{
  --bg:#f3f4f8; --panel:#ffffff; --text:#11121a;
  --muted:#55596b; --accent:#e39d00;
  --border:rgba(0,0,0,.1); --shadow:rgba(0,0,0,.05);
}

/* ---------- Base ---------- */
*{box-sizing:border-box}
html,body{height:100%}
html{scroll-behavior:smooth}
body{
  margin:0; font-family:var(--font-sans);
  background:var(--bg); color:var(--text);
  -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
  line-height:1.45; overflow-x:hidden;
  padding-top:70px; /* navbar space */
}

/* sensible media defaults */
img,svg,video{max-width:100%; height:auto}

/* Accessibility */
.skip-link{position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden}
.skip-link:focus{left:1rem;top:1rem;width:auto;height:auto;padding:.5rem .75rem;background:var(--panel);color:var(--text);border-radius:6px;z-index:10000}

/* ---------- Top Ticker ---------- */
.announcement-ticker{
  background:var(--accent); color:#000; padding:8px 0; white-space:nowrap; overflow:hidden
}
.ticker-text{display:inline-block;padding-left:100%;font-weight:700;animation:ticker 50s linear infinite}
@keyframes ticker{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}

/* ---------- Header + Navbar ---------- */
.main-header{
  width:100%; padding:12px 5%; min-height:var(--nav-h);
  border-bottom:1px solid var(--border);
  background:linear-gradient(180deg,rgba(255,255,255,.02),transparent);
  margin-bottom:14px;
}
.announcement-ticker + .main-header{margin-bottom:18px}
.navbar{display:flex;justify-content:space-between;align-items:center;max-width:var(--max-width);margin:0 auto;gap:1rem;position:relative}
.nav-left{display:flex;align-items:center;gap:.75rem}
.logo{height:40px;width:auto;display:block}
.nav-brand{font-size:1.5rem;font-weight:700;color:#fff;text-decoration:none;letter-spacing:.2px;display:flex;align-items:center;gap:.5rem}
.nav-right{display:flex;align-items:center;gap:1rem}
.nav-links{list-style:none;display:flex;gap:2rem;margin:0;padding:0;align-items:center}
.nav-links a{text-decoration:none;color:var(--muted);font-weight:600;transition:color .18s,transform .12s;font-size:1.02rem}
.nav-links a:hover{color:var(--accent);transform:translateY(-1px)}
@media(min-width:1024px){.nav-links a{font-size:1.4rem;font-weight:700}.nav-links{gap:36px}}

.buy-button{
  background:var(--accent);color:var(--bg);border:0;padding:10px 18px;border-radius:6px;
  font-weight:800;cursor:pointer;transition:background-color .2s,transform .12s;font-size:.95rem
}
.buy-button:hover{background:var(--accent-2);transform:translateY(-2px)}

/* ---------- Icons (generic) ---------- */
.icon{font-size:28px;cursor:pointer;color:var(--muted);transition:color .15s;background:transparent;border:1px solid var(--border);border-radius:8px;padding:6px;width:40px;height:40px;display:inline-flex;align-items:center;justify-content:center}
.icon:hover{color:var(--accent);background:rgba(255,255,255,.08)}

/* ---------- Mobile Drawer ---------- */
.mobile-menu[hidden]{display:none!important}
.mobile-menu{
  position:fixed;inset:0;z-index:2000;background:rgba(3,5,26,.65);
  display:flex;justify-content:center;align-items:center;visibility:hidden;opacity:0;
  transition:opacity .28s,visibility .28s
}
.mobile-menu:not([hidden]){visibility:visible;opacity:1}
.mobile-menu-content{
  text-align:left;position:relative;padding:28px 24px;width:min(420px,92vw);
  background:#0b0f22;border:1px solid #1f2440;border-radius:14px;color:#fff;
  max-height:calc(100vh - 96px);overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.55)
}
.close-btn{position:absolute;top:10px;right:14px;background:none;border:0;color:#cfd6ff;font-size:26px;cursor:pointer}
.mobile-nav-links{list-style:none;margin:0;padding:36px 0 0 0;display:flex;flex-direction:column;gap:8px}
.mobile-nav-links a{display:block;padding:10px 14px;border-radius:8px;color:#e9ecff;text-decoration:none;font-weight:700;transition:background .15s,transform .05s}
.mobile-nav-links a:hover{background:rgba(255,255,255,.08);transform:translateX(2px)}

/* Keep sidebar open on desktop */
@media(min-width:1024px){
  body.has-sidebar{padding-left:var(--sidebar-w)}
  #mobile-menu-container.mobile-menu{
    position:fixed;top:var(--header-h);left:0;width:var(--sidebar-w);
    height:calc(100vh - var(--header-h));background:#0b0f2a;border-right:1px solid var(--border);
    opacity:1!important;visibility:visible!important;padding:8px 0
  }
  #mobile-menu-container .mobile-menu-content{height:100%;overflow:auto}
  #mobile-menu-container .close-btn{display:none}
}

/* Hide ONLY the hamburger icons (we fill links via JS) */
#open-menu-btn,.mobile-menu-icon,.menu-toggle{display:none!important}

/* ---------- Hero (Full-bleed) ---------- */
.hero-banner{
  position:relative;min-height:78vh;padding:calc(var(--header-h) + 40px) 5% 90px;
  background-size:cover;background-repeat:no-repeat;background-position:center;
  display:flex;align-items:center;justify-content:center;text-align:center;margin-bottom:60px
}
/* Soft readable overlay */
.hero-overlay{
  width:100%;max-width:1000px;padding:28px 20px;
  background:linear-gradient(180deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,.25) 40%,rgba(0,0,0,.10) 100%);
  border-radius:12px
}
.hero-content{max-width:980px;margin:0 auto;padding:0 24px;text-align:center}
.hero-title{color:#fff;font-size:3rem;line-height:1.15;margin:0 0 14px}
.hero-title strong{color:var(--accent)}
.hero-subtitle{color:#cfd1d6;max-width:820px;margin:0 auto 20px}
.hero-ctas{display:flex;justify-content:center;gap:12px;margin-bottom:14px;flex-wrap:wrap}
.hero-cta{background:var(--accent);color:var(--bg);border:0;padding:12px 26px;font-size:1.02rem;border-radius:10px;font-weight:800;cursor:pointer;transition:transform .16s,background-color .2s}
.hero-cta.secondary{background:transparent;border:1px solid var(--border);color:var(--muted)}
.hero-cta:hover{transform:translateY(-3px);background-color:var(--accent-2)}
@media(min-width:1024px){.hero-banner{min-height:85vh}.hero-title{font-size:3.4rem}}
@media(max-width:1024px){.hero-title{font-size:2.7rem}}
@media(max-width:768px){.hero-title{font-size:2.3rem}.hero-subtitle{font-size:1rem}.nav-links{display:none}}

/* ---------- Presale Timer ---------- */
.presale-timer{margin-top:32px}
.presale-timer h2{font-size:1.15rem;color:#fff;margin-bottom:14px}
.timer-display{display:flex;justify-content:center;gap:16px;flex-wrap:wrap}
.timer-display>div{
  background:#141427;padding:12px 18px;border:1px solid #2a2a3a;border-radius:10px;min-width:84px;text-align:center
}
.timer-display span{display:block;font-size:2.1rem;font-weight:800;color:var(--accent);line-height:1}
.timer-display .unit{color:var(--muted);font-size:.9rem;margin-top:6px;font-weight:600}
.timer-subtext{margin-top:12px;color:#a0a0a0;font-size:.95rem}

/* ---------- Sections (centered content) ---------- */
.curve-section{padding:60px 5%;border-top:1px solid var(--border);scroll-margin-top:80px}
.curve-container{max-width:var(--content-w);margin:0 auto;padding:0 24px}
.curve-section h2{color:#fff;margin:0 0 14px;font-size:1.7rem;text-align:center}
.curve-section p{line-height:1.7;letter-spacing:.1px;color:var(--muted)}
/* ensure any hero inside content is centered */
.section-hero{display:flex;align-items:center;justify-content:center;text-align:center}

/* ---------- Cards ---------- */
.info-card{
  background:#0f1120;border:1px solid var(--border);border-radius:12px;
  padding:14px 16px;color:#cfd1d6;box-shadow:0 2px 10px rgba(0,0,0,.18);
  transition:transform .18s,box-shadow .18s
}
.info-card:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.24)}

/* ---------- Blog Embed ---------- */
.blog-embed-wrap{border:1px solid var(--border);border-radius:12px;background:#0b0f22;overflow:hidden;margin-top:24px}
.blog-embed-wrap iframe{width:100%;height:78vh;border:0;display:block}
@media(max-width:768px){.blog-embed-wrap iframe{height:72vh}}

/* ---------- Footer ---------- */
footer.site-footer{
  padding:30px 5%; color:var(--muted); border-top:1px solid var(--border);
  text-align:center
}

/* Social row */
footer.site-footer .social{
  display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;
  margin:18px 0
}
footer.site-footer .social a{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:6px 10px;border:1px solid var(--border);border-radius:8px;
  background:rgba(255,255,255,.06);color:#e9ecff;text-decoration:none;font-weight:600;
  transition:transform .15s, background .2s, border-color .2s
}
footer.site-footer .social a:hover{transform:translateY(-1px);background:rgba(255,153,0,.12);border-color:var(--accent)}
/* keep icons small and safe */
footer.site-footer .social svg{width:20px;height:20px;display:inline-block;flex:0 0 auto;fill:currentColor;vertical-align:middle}
footer.site-footer .social svg path{fill:currentColor}
/* never allow svg to capture the page as giant link */
footer.site-footer .social svg{pointer-events:none}

/* ---------- Back to Top ---------- */
.back-to-top{
  position:fixed;bottom:24px;right:24px;width:44px;height:44px;border:0;border-radius:50%;
  background:var(--accent);color:#000;font-size:20px;font-weight:bold;cursor:pointer;
  opacity:0;pointer-events:none;transition:opacity .3s,transform .3s;z-index:999;box-shadow:0 0 12px rgba(0,0,0,.3)
}
.back-to-top.show{opacity:1;pointer-events:auto}

/* ---------- Page Navigation ---------- */
.page-nav{
  display:flex;gap:12px;justify-content:center;align-items:center;
  margin:48px auto 24px;padding:16px;max-width:var(--max-width);
  border:1px solid var(--border);background:rgba(10,10,26,.6);border-radius:12px;backdrop-filter:blur(4px)
}
.page-nav a{
  display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:10px;text-decoration:none;font-weight:700;
  border:1px solid var(--border);color:#fff;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03));
  transition:transform .15s, background .2s, border-color .2s
}
.page-nav a:hover{transform:translateY(-1px);border-color:var(--accent);background:rgba(255,153,0,.12)}

/* ---------- Embed Mode (for blog iframes etc.) ---------- */
.embed-mode .main-header,
.embed-mode #mobile-menu-container,
.embed-mode footer.site-footer,
.embed-mode .page-nav,
.embed-mode .back-to-top{display:none!important}
.embed-mode .curve-section{padding-top:24px}

/* ---------- Responsive tweaks ---------- */
@media(max-width:1024px){.nav-links{gap:1rem}}
@media(max-width:768px){
  .curve-container{padding:0 18px}
}

/* ---------- Safety: any hero/image inside content stays centered ---------- */
.hero-banner,.hero-content,.curve-container,.section-hero{margin-left:auto;margin-right:auto}

/* ---------- Final: keep Google widget hidden (if used) ---------- */
#google_translate_element,
.goog-te-banner-frame.skiptranslate,
.goog-te-gadget,.goog-te-combo{display:none!important}
body{top:0!important}
/* Tokenomics preview styles */
.section-hero {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}
.section-hero img {
  display: block;
  width: 100%;
  height: 340px;
  object-fit: cover;
}
.section-hero-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 18px;
  background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.15));
}
/* compact list of % */
.tokenomics-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 10px;
  column-gap: 16px;
  align-items: center;
}
.tokenomics-list li {
  display: contents;
}
.tokenomics-list li span {
  color: var(--muted);
  font-weight: 700;
}
.tokenomics-list li strong {
  color: var(--accent);
  font-weight: 800;
  text-align: right;
}
.stat-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(0,255,255,0.1);
  border-radius: 12px;
  padding: 1rem;
  transition: all .3s ease;
}
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 10px rgba(0,255,255,0.15);
}
/* ===== Expand HOME hero (top section) ===== */
#main-content.hero-banner{
  position: relative;
  background-size: cover;
  background-position: center;
  min-height: 130vh;          /* was shorter; now taller */
  padding: 80px 6vw;          /* breathing room */
  display: flex;
  align-items: center;        /* vertically center content */
}
@media (min-width:1024px){
  #main-content.hero-banner{
    min-height: 150vh;        /* extra tall on desktop */
    padding: 120px 6vw;
  }
}
/* optional: keep inner text nicely sized */
#main-content.hero-banner .hero-title{ font-size: clamp(28px, 5.2vw, 56px); }
#main-content.hero-banner .hero-subtitle{ font-size: clamp(15px, 2vw, 18px); }

/* ===== Expand BONDING CURVE hero ===== */
#bonding-curve-preview.hero-banner{
  position: relative;
  background-size: cover;
  background-position: center;
  min-height: 130vh;
  padding: 80px 6vw;
  display: flex;
  align-items: center;
}
@media (min-width:1024px){
  #bonding-curve-preview.hero-banner{
    min-height: 150vh;
    padding: 110px 6vw;
  }
}
/* optional: roomier text block on this section */
#bonding-curve-preview .hero-content{
  max-width: 1100px;
  padding: 48px 40px;
}
#bonding-curve-preview .hero-title{ font-size: clamp(30px, 5.5vw, 60px); }
#bonding-curve-preview .hero-subtitle{ font-size: clamp(15px, 2vw, 19px); line-height: 1.7; }

/* === FORCE Provenance to be taller and roomier === */
section#provenance.hero-ovr {
  min-height: 130vh !important;   /* make it much taller */
  padding-top: 80px !important;
  padding-bottom: 80px !important;
}

section#provenance .hero-content {
  max-width: 1100px !important;
  padding: 60px 50px !important;
}
section#provenance .hero-title {
  font-size: clamp(36px, 6vw, 68px) !important;
  margin-bottom: 1rem !important;
}
section#provenance .hero-lead {
  font-size: clamp(17px, 2vw, 21px) !important;
  line-height: 1.75 !important;
  margin-bottom: 1.5rem !important;
}
/* add some gap before the next section just in case */
.section-gap { height: 80px; }

/* === FORCE Guardian to be taller and roomier === */
section#guardian.hero-ovr {
  min-height: 130vh !important;
  padding-top: 80px !important;
  padding-bottom: 80px !important;
}
section#guardian .hero-content {
  max-width: 1100px !important;
  padding: 60px 50px !important;
}
section#guardian .hero-title {
  font-size: clamp(36px, 6vw, 68px) !important;
  margin-bottom: 1rem !important;
}
section#guardian .hero-lead {
  font-size: clamp(17px, 2vw, 21px) !important;
  line-height: 1.75 !important;
  margin-bottom: 1.5rem !important;
}

/* === FORCE Tokenomics to be taller and roomier === */
section#tokenomics.hero-ovr {
  min-height: 130vh !important;
  padding-top: 80px !important;
  padding-bottom: 80px !important;
}
section#tokenomics .hero-content {
  max-width: 1100px !important;
  padding: 60px 50px !important;
}
section#tokenomics .hero-title {
  font-size: clamp(36px, 6vw, 68px) !important;
  margin-bottom: 1rem !important;
}
section#tokenomics .hero-lead {
  font-size: clamp(17px, 2vw, 21px) !important;
  line-height: 1.75 !important;
  margin-bottom: 1.5rem !important;
}
/* Optional gap helper if any section still feels tight below it */
.section-gap { height: 80px; }

.hero-overlay { pointer-events: none; } /* So footer stays clickable */
.site-footer { position: relative; z-index: 10; }

.announcement-ticker{
  background:#0f1120; border-bottom:1px solid #1c2233; color:#e9ecff;
  font:600 14px/36px Inter,system-ui,sans-serif; height:36px; overflow:hidden;
}
.ticker{ position:relative; white-space:nowrap; overflow:hidden; }
.ticker__track{
  display:inline-block; padding-left:100%; /* start off-screen right */
  will-change: transform; animation: ndg-ticker 25s linear infinite;
}
.ticker__track .msg{ padding:0 1.5rem; }
.ticker__track .sep{ opacity:.6; padding:0 .75rem; }
@keyframes ndg-ticker{
  0%   { transform: translateX(0); }
  100% { transform: translateX(-100%); } /* scroll full width */
}

/* optional: reduce speed on small screens */
@media (max-width:600px){
  .ticker__track{ animation-duration: 40s; }
}
#dvpn.hero-ovr {
  position: relative;
  overflow: hidden;
  min-height: 160vh;
}
/* This DIV holds the image background */
#dvpn .dvpn-bg {
  position: absolute;
  inset: 0;
  background-image: url('images/ndg27.png'); /* 👈 use your actual image filename */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: scale(0.8); /* 80% size — shrink */
  transform-origin: center;
  z-index: 0;
}
/* Slight dark overlay for readability */
#dvpn .dvpn-ovr {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.55);
  z-index: 1;
}

/* The hero text on top of both layers */
#dvpn .hero-content {
  position: relative;
  z-index: 2;
  max-width: 760px;
  color: #fff;
}
/* ===== dVPN Hero custom layout ===== */
#dvpn.hero-ovr{
  position: relative;
  overflow: hidden;
  min-height: 155vh;
  display: flex;
  align-items: flex-end;        /* move content to bottom */
  padding: 0 5vw 7vh;           /* bottom + side spacing */
}

/* Background + overlay */
#dvpn .dvpn-bg{
  position:absolute; inset:0;
  background-image:url('images/ndg27.png');  /* use your actual image */
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;
  transform:scale(0.8);
  z-index:0;
}
#dvpn .dvpn-ovr{
  position:absolute; inset:0;
  background:rgba(0,0,0,.55);
  z-index:1;
}

/* Text styling */
#dvpn .hero-content{
  position:relative;
  z-index:2;
  max-width:820px;
  color:#e9ecff;
  text-shadow:0 2px 6px rgba(0,0,0,.45);
}
#dvpn .hero-title{
  font-weight:800;
  line-height:1.15;
  margin:0 0 .4rem;
  color:#fff;
}
#dvpn .hero-title .accent{ color:#ffb31a; }
#dvpn .hero-subtitle{ opacity:.95; }

/* === Top ticker colors & readability === */
.announcement-ticker{
  background:#0f1120;           /* dark bar */
  color:#080808;                 /* default text color */
  border-bottom:1px solid #1c2233;
  z-index: 50;                   /* stay above hero */
}
.ticker__track .msg{ color:#090909; }
.ticker__track .sep{ color:rgba(233,236,255,.55); }
.ticker__track a{ color:#ffb31a; text-decoration:none; font-weight:800; }
.ticker__track a:hover{ text-decoration:underline; }
.ticker__track .accent{ color:#ffb31a; font-weight:800; } /* orange accent */

.announcement-ticker { background:#0f1120; }
.announcement-ticker .ticker-text { color:#080808; } /* base light text */
.announcement-ticker .hi,
.announcement-ticker .ticker-text a.hi { color:#ffb31a; font-weight:800; } /* yellow */
/* Make the whole top banner text yellow */
.announcement-ticker .ticker__track,
.announcement-ticker .ticker__track a,
.announcement-ticker .ticker__track .msg,
.announcement-ticker .ticker__track .sep {
  color: #ffb31a !important;
  font-weight: 800;
}
/* === NetDAG top banner: yellow bar, bold text === */
.announcement-ticker{
  background:#ffb31a !important;   /* yellow bar */
  border-bottom: none;
  height:40px;                      /* keep it neat */
  line-height:40px;
  overflow:hidden;
}
/* Support either markup: .ticker-text OR .ticker__track */
.announcement-ticker .ticker-text,
.announcement-ticker .ticker__track{
  color:#111 !important;            /* black text */
  font-weight:800;
}

/* Separators (•) slightly dimmed black */
.announcement-ticker .sep{ color:rgba(0,0,0,.6) !important; }

/* Links / highlights in white, bold */
.announcement-ticker a,
.announcement-ticker .hi{
  color:#060606 !important;            /* white accents */
  font-weight:700;
  text-decoration:none;
}
.announcement-ticker a:hover{ text-decoration:underline; }
.announcement-ticker .ticker-text {
  font-size: 20px;
  font-weight: 800;}
/* Slow down the scrolling speed of the top ticker */
.announcement-ticker .ticker__track {
  animation-duration: 80s !important; /* was ~25s; higher = slower */
}
/* Mobile hamburger */
.mobile-menu-btn{
  display:none;
  background:none;
  border:0;
  font-size:28px;
  line-height:1;
  color:#ffb31a;   /* NetDAG yellow */
  cursor:pointer;
}
/* On small screens: show button, hide desktop links */
@media (max-width: 900px){
  .mobile-menu-btn{ display:block; }
  .nav-links{ display:none; }
}
/* Header layout (desktop-safe) */
.navbar{
  display:flex; justify-content:space-between; align-items:center;
  gap:16px; position:relative;
}
.nav-left, .nav-right{ display:flex; align-items:center; gap:16px; }
.logo{ height:28px; width:auto; display:block; }
.nav-brand{ font-weight:800; color:#e9ecff; text-decoration:none; }

/* Desktop links */
.nav-links{ display:flex; gap:18px; list-style:none; margin:0; padding:0; }
.nav-links a{ color:#e9ecff; text-decoration:none; font-weight:600; }

/* Mobile hamburger (hidden by default) */
.mobile-menu-btn{
  display:none; background:none; border:0; font-size:28px; line-height:1;
  color:#ffb31a; cursor:pointer;
}

/* Show hamburger only on small screens, optionally hide links */
@media (max-width:900px){
  .mobile-menu-btn{ display:block; }
  .nav-links{ display:none; } /* remove this line if you want links visible on mobile */
}  /* ← do NOT lose this closing brace */

/* ===== Left Sidebar (desktop only) ===== */
.side-menu{
  position: fixed;
  top: 92px;              /* nudge if it touches the ticker/header */
  left: 12px;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 20;
}
.side-menu a{
  color: #e9ecff;
  text-decoration: none;
  font-weight: 600;
  opacity: .85;
}
.side-menu a:hover{ opacity: 1; }

/* Hide sidebar on smaller screens */
@media (max-width: 1200px){
  .side-menu{ display: none; }
}

/* Give main content room on wide screens */
@media (min-width: 1201px){
  .hero-banner,
  .hero-ovr,
  main,
  .curve-section{
    margin-left: 220px;
  }
}
/* --- Force header + sidebar above hero backgrounds --- */
.main-header { position: relative; z-index: 1000; }     /* top navbar */
#sidebar-placeholder { position: relative; z-index: 900; }
.side-menu { position: fixed; top: 92px; left: 12px; z-index: 901; }

/* Keep hero layers below */
.hero-banner, .hero-ovr { position: relative; z-index: 1; }
.hero-ovr .hero-content { position: relative; z-index: 2; }  /* text */
.hero-ovr::before { z-index: 0; }    /* bg image layer (if used) */
.hero-ovr::after,
.hero-overlay { z-index: 1; pointer-events: none; }  /* dark overlay */

/* TEMP: ensure sidebar is visible while debugging */
@media (max-width: 1200px){ .side-menu { display: flex !important; } }



You said:
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
    .map(i => <li><a href="${i.href}">${i.label}</a></li>)
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

  const aPrev = prev ? <a class="prev" href="${href(prev)}">← Previous</a> : "";
  const aHome = <a class="home" href="${inMenu ? base + "index.html" : "index.html"}">Home</a>;
  const aNext = next ? <a class="next" href="${href(next)}">Next →</a> : "";

  host.innerHTML = ${aPrev}<span class="spacer"></span>${aHome}<span class="spacer"></span>${aNext};
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

  const build = arr =>
    arr.map(s => <span class="msg">${s}</span>).join('<span class="sep">•</span>');

  const track  = document.getElementById('ticker-track');
  const clone  = document.getElementById('ticker-track-clone');
  if (track && clone) {
    const html = build(messages);
    track.innerHTML = html;
    clone.innerHTML = html; // duplicate content for seamless loop
  }
document.addEventListener('DOMContentLoaded', () => {
  const btn   = document.getElementById('mobile-menu-btn');
  const menu  = document.getElementById('mobile-menu-container');
  const close = document.getElementById('close-menu-btn'); // you already have this

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.hidden = false;
      menu.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      menu.classList.add('open');
    });
  }
  if (close && menu) {
    close.addEventListener('click', () => {
      menu.hidden = true;
      menu.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const btn   = document.getElementById('mobile-menu-btn');
  const menu  = document.getElementById('mobile-menu-container');
  const close = document.getElementById('close-menu-btn');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.hidden = false;
      menu.setAttribute('aria-hidden','false');
      btn.setAttribute('aria-expanded','true');
      menu.classList.add('open');
    });
  }
  if (close && menu) {
    close.addEventListener('click', () => {
      menu.hidden = true;
      menu.setAttribute('aria-hidden','true');
      btn.setAttribute('aria-expanded','false');
      menu.classList.remove('open');
    });
  }
});

// === SIDEBAR INCLUDE LOADER ===
document.addEventListener('DOMContentLoaded', function(){
  const el = document.getElementById('sidebar-placeholder');
  if (!el) return;

  const isInMenu = location.pathname.replace(/\\/g,'/').includes('/menu/');
  const base = isInMenu ? '../includes/' : './includes/';

  fetch(base + 'sidebar.html')
    .then(r => r.text())
    .then(html => {
      el.innerHTML = html;

      // Adjust all sidebar link paths automatically
      const prefix = isInMenu ? '../' : './';
      el.querySelectorAll('a[data-rel]').forEach(a => {
        const rel = a.getAttribute('data-rel');
        if (rel) a.href = prefix + rel;
      });
    })
    .catch(console.error);
});

// Your messages:
const TICKER_MESSAGES = [
  "• Presale begins 14 Dec. 2025, 00:00 CET •",
  "Stage 1/10 •",
  "Presale price $0.025 •",
  "22% presale permanently locked as buy-back reserve •",
  "Only 500,000,000 NDG tokens are up for grabs •",
  "2% of ecosystem revenue goes to charity •",
  "Guardian AI monitors market 24/7",
];

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadInto('sidebar-placeholder', 'sidebar.html'),
    loadInto('ticker-placeholder', 'ticker.html'),
    loadInto('footer-placeholder', 'footer.html'),
  ]);

  // Build ticker after it’s loaded
  const track = document.getElementById('ticker-track');
  const clone = document.getElementById('ticker-track-clone');
  if (track && clone) {
    const html = TICKER_MESSAGES
      .map(m => <span class="msg">${m}</span>)
      .join('<span class="dot"> • </span>');
    track.innerHTML = html;
    clone.innerHTML = html;
  }
});