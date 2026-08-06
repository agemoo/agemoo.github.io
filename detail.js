export function mountImageDialog(dialog) {
  if (!dialog) return;
  const image = dialog.querySelector('img');
  const close = dialog.querySelector('[data-dialog-close]');
  if (!image || !close) return;
  let previousFocus = null;
  let closing = false;

  const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

  const openDialog = () => {
    if (!dialog.open) {
      dialog.classList.remove('is-closing');
      dialog.showModal();
      dialog.classList.add('is-open');
    }
    close.focus();
  };

  const closeDialog = () => {
    if (closing || !dialog.open) return;
    closing = true;
    const finish = () => {
      closing = false;
      dialog.classList.remove('is-open', 'is-closing');
      dialog.close();
    };
    if (reduceMotion()) { finish(); return; }
    dialog.classList.add('is-closing');
    const onTransitionEnd = (event) => {
      if (event.target !== dialog || event.propertyName !== 'opacity') return;
      dialog.removeEventListener('transitionend', onTransitionEnd);
      finish();
    };
    dialog.addEventListener('transitionend', onTransitionEnd);
    window.setTimeout(finish, 500);
  };

  document.querySelectorAll('[data-enlarge]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      previousFocus = trigger;
      const source = trigger.querySelector('img') || trigger;
      image.src = trigger.dataset.fullSrc || trigger.href || source.currentSrc || source.src;
      image.alt = source.alt || '';
      openDialog();
    });
  });

  close.addEventListener('click', () => closeDialog());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDialog();
    }
  });
  dialog.addEventListener('close', () => {
    closing = false;
    dialog.classList.remove('is-open', 'is-closing');
    previousFocus?.focus();
  });
}

function mountPageMotion() {
  const root = document.documentElement;
  const progress = document.querySelector('.progress');
  const nav = document.querySelector('.detail-nav, .nav');
  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const narrowQuery = window.matchMedia?.('(max-width: 40rem)');
  const reduceQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const pointerQuery = window.matchMedia?.('(pointer: fine)');
  let motionEnabled = false;
  let frame = null;
  let revealObserver = null;

  const revealAll = () => revealItems.forEach((item) => item.classList.add('is-visible'));
  const updateScroll = () => {
    frame = null;
    nav?.classList.toggle('solid', window.scrollY > 8);
    if (!progress) return;
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    progress.style.transform = `scaleX(${motionEnabled ? ratio : 0})`;
  };
  const onScroll = () => {
    if (frame === null) frame = window.requestAnimationFrame(updateScroll);
  };
  const mountRevealObserver = () => {
    if (!motionEnabled || !revealItems.length) return revealAll();
    if (!('IntersectionObserver' in window)) return revealAll();
    const pending = revealItems.filter((item) => !item.classList.contains('is-visible'));
    if (!pending.length) return;
    revealObserver?.disconnect();
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver?.unobserve(entry.target);
      });
    }, { threshold: 0.14 });
    pending.forEach((item) => revealObserver?.observe(item));
  };
  const syncMotionState = () => {
    motionEnabled = Boolean(pointerQuery?.matches) && !narrowQuery?.matches && !reduceQuery?.matches;
    root.classList.toggle('motion-detail', motionEnabled);
    if (motionEnabled) mountRevealObserver();
    else {
      revealObserver?.disconnect();
      revealObserver = null;
      revealAll();
    }
    updateScroll();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  [narrowQuery, reduceQuery, pointerQuery].forEach((query) => query?.addEventListener('change', syncMotionState));
  syncMotionState();
}

function boot() {
  mountImageDialog(document.querySelector('.image-dialog'));
  mountPageMotion();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
