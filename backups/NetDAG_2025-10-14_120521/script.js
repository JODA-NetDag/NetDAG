// script.js - NetDAG (improved + modal)
// - Accessible mobile menu with focus trap & Escape handling
// - Presale countdown to 2025-12-14T00:00:00+01:00 (CET)
// - Dynamic Buy NDG modal (accessible, focus-trap) and Connect Wallet placeholder

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- Mobile menu / accessibility ---------------- */
  const menuIcon = document.getElementById('mobile-menu-icon');
  const closeBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu-container');

  const FOCUSABLE_SELECTORS = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  let lastFocusedBeforeMenu = null;
  let trapped = false;

  function getFocusableWithin(container) {
    if (!container) return [];
    return Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS)).filter(el => {
      return el.offsetWidth || el.offsetHeight || el.getClientRects().length;
    });
  }

  function openMenu() {
    if (!mobileMenu || !menuIcon) return;
    lastFocusedBeforeMenu = document.activeElement;
    mobileMenu.classList.add('show');
    mobileMenu.removeAttribute('hidden');
    mobileMenu.setAttribute('aria-hidden', 'false');

    const focusables = getFocusableWithin(mobileMenu);
    if (focusables.length) focusables[0].focus();
    else (closeBtn || mobileMenu).focus();

    document.addEventListener('keydown', handleKeyDown);
    mobileMenu.addEventListener('click', handleOverlayClick);
    trapped = true;
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('show');
    mobileMenu.setAttribute('hidden', '');
    mobileMenu.setAttribute('aria-hidden', 'true');

    document.removeEventListener('keydown', handleKeyDown);
    mobileMenu.removeEventListener('click', handleOverlayClick);
    trapped = false;

    if (lastFocusedBeforeMenu && typeof lastFocusedBeforeMenu.focus === 'function') {
      lastFocusedBeforeMenu.focus();
    } else if (menuIcon) {
      menuIcon.focus();
    }
  }

  function handleOverlayClick(e) {
    if (e.target === mobileMenu) closeMenu();
  }

  function handleKeyDown(e) {
    if (!trapped) return;
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      closeMenu();
      return;
    }
    if (e.key === 'Tab') {
      const focusables = getFocusableWithin(mobileMenu);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (menuIcon) menuIcon.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  if (mobileMenu) {
    const isHidden = mobileMenu.hasAttribute('hidden') || !mobileMenu.classList.contains('show');
    mobileMenu.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
  }

  /* ---------------- Presale Countdown ---------------- */
  const presaleISO = '2025-12-14T00:00:00+01:00';
  const targetTime = new Date(presaleISO).getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const fallbackSpans = Array.from(document.querySelectorAll('.timer-display span'));
  const elDays = daysEl || fallbackSpans[0] || null;
  const elHours = hoursEl || fallbackSpans[1] || null;
  const elMinutes = minutesEl || fallbackSpans[2] || null;
  const elSeconds = secondsEl || fallbackSpans[3] || null;

  function pad(n) { return String(n).padStart(2, '0'); }
  let countdownInterval = null;

  function updateCountdown() {
    const now = Date.now();
    let diff = targetTime - now;

    if (isNaN(targetTime)) {
      clearInterval(countdownInterval);
      console.warn('Presale target time invalid:', presaleISO);
      return;
    }
    if (diff <= 0) {
      diff = 0;
      clearInterval(countdownInterval);
    }
    const secsTotal = Math.floor(diff / 1000);
    const days = Math.floor(secsTotal / (24 * 3600));
    const hours = Math.floor((secsTotal % (24 * 3600)) / 3600);
    const minutes = Math.floor((secsTotal % 3600) / 60);
    const seconds = Math.floor(secsTotal % 60);

    if (elDays) elDays.textContent = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMinutes) elMinutes.textContent = pad(minutes);
    if (elSeconds) elSeconds.textContent = pad(seconds);
  }

  if (elDays || elHours || elMinutes || elSeconds) {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  window.addEventListener('beforeunload', () => {
    if (countdownInterval) clearInterval(countdownInterval);
  });

  /* ---------------- Connect Wallet / Buy NDG placeholders + Modal ---------------- */
  const connectButton =
    document.getElementById('connect-wallet') ||
    document.querySelector('.hero-cta.connect') ||
    document.querySelector('.hero-cta');

  const buyButton =
    document.getElementById('buy-ndg') ||
    document.getElementById('buy-ndg-hero') ||
    document.querySelector('.buy-button') ||
    document.querySelector('.hero-cta.buy') ||
    document.querySelector('.mobile-buy-button');

  let walletConnected = false;

  if (connectButton) {
    connectButton.addEventListener('click', async (e) => {
      e.preventDefault();
      connectButton.disabled = true;
      const prev = connectButton.textContent;
      connectButton.textContent = 'Connecting...';
      setTimeout(() => {
        walletConnected = true;
        connectButton.disabled = false;
        connectButton.textContent = 'Wallet Connected';
      }, 900);
    });
  }

  function createBuyModal() {
    let existing = document.querySelector('.modal-backdrop');
    if (existing) return existing;

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.innerHTML = `
      <div class="modal" role="document">
        <div class="modal-header">
          <h3>Buy NDG — Presale</h3>
          <button class="close-modal" aria-label="Close modal">&times;</button>
        </div>
        <p>Early bird rewards increase every two weeks. Enter your details and the amount you want to participate with. This is a placeholder flow — integrate your payment/presale backend here.</p>

        <div class="form-row">
          <div style="flex:1;">
            <label for="modal-email">Email (for receipt)</label>
            <input id="modal-email" type="email" placeholder="you@example.com" />
          </div>
          <div style="width:160px;">
            <label for="modal-amount">Amount (USD)</label>
            <input id="modal-amount" type="number" min="1" step="any" placeholder="100" />
          </div>
        </div>

        <div class="actions">
          <button class="btn ghost" id="modal-cancel">Cancel</button>
          <button class="btn primary" id="modal-confirm">Proceed to Payment</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
    return backdrop;
  }

  function openBuyModal() {
    const modal = createBuyModal();
    modal.classList.add('show');
    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');

    const firstFocusable = modal.querySelector(FOCUSABLE_SELECTORS);
    if (firstFocusable) firstFocusable.focus();

    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeBuyModal();
      } else if (e.key === 'Tab') {
        const focusables = getFocusableWithin(modal);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    function backdropClick(ev) {
      if (ev.target === modal) closeBuyModal();
    }

    modal._closeHandlers = { onKey, backdropClick };
    document.addEventListener('keydown', onKey);
    modal.addEventListener('click', backdropClick);

    const closeBtnModal = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('#modal-cancel');
    const confirmBtn = modal.querySelector('#modal-confirm');

    closeBtnModal && closeBtnModal.addEventListener('click', closeBuyModal);
    cancelBtn && cancelBtn.addEventListener('click', closeBuyModal);

    confirmBtn && confirmBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      if (!walletConnected) {
        alert('Please connect your wallet first (placeholder). Click Connect Wallet on the page.');
        if (connectButton) connectButton.focus();
        return;
      }
      const email = document.getElementById('modal-email') ? document.getElementById('modal-email').value : '';
      const amount = document.getElementById('modal-amount') ? document.getElementById('modal-amount').value : '';
      closeBuyModal();
      setTimeout(() => {
        alert(`Thank you! Purchase simulated.\nEmail: ${email || '(none)'}\nAmount: ${amount || '(none)'}\n(Replace this with real presale checkout integration.)`);
      }, 300);
    });
  }

  function closeBuyModal() {
    const modal = document.querySelector('.modal-backdrop');
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('hidden', '');
    modal.setAttribute('aria-hidden', 'true');

    if (modal._closeHandlers) {
      document.removeEventListener('keydown', modal._closeHandlers.onKey);
      modal.removeEventListener('click', modal._closeHandlers.backdropClick);
      modal._closeHandlers = null;
    }
    if (buyButton) buyButton.focus();
  }

  if (buyButton) {
    buyButton.addEventListener('click', (e) => {
      e.preventDefault();
      openBuyModal();
    });
  }

  const mobileBuyLink = document.querySelector('.mobile-buy-button');
  if (mobileBuyLink) {
    mobileBuyLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
      openBuyModal();
    });
  }

  window.addEventListener('beforeunload', () => {
    closeBuyModal();
  });
});