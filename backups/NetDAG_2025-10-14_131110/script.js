// script.js — updated version for stable mobile menu across pages

document.addEventListener('DOMContentLoaded', () => {
  const menuIcon   = document.getElementById('mobile-menu-icon');
  const closeBtn   = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu-container');
  const linkClicks = document.querySelectorAll('.mobile-nav-links a');

  if (!mobileMenu) return;

  const openMenu = () => {
    mobileMenu.hidden = false;
    mobileMenu.classList.add('show');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('show');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { mobileMenu.hidden = true; }, 300);
  };

  menuIcon  && menuIcon.addEventListener('click', openMenu);
  closeBtn  && closeBtn.addEventListener('click', closeMenu);
  linkClicks.forEach(a => a.addEventListener('click', closeMenu));
});
.mobile-menu[hidden]{ display:none !important; }