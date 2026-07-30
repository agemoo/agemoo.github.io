import './i18n.js';

export function mountImageDialog(dialog) {
  if (!dialog) return;
  const image = dialog.querySelector('img');
  const close = dialog.querySelector('[data-dialog-close]');
  if (!image || !close) return;
  let previousFocus = null;

  document.querySelectorAll('[data-enlarge]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      previousFocus = trigger;
      const source = trigger.querySelector('img') || trigger;
      image.src = trigger.dataset.fullSrc || trigger.href || source.currentSrc || source.src;
      image.alt = source.alt || '';
      dialog.showModal();
      close.focus();
    });
  });

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', (event) => { if (event.key === 'Escape') dialog.close(); });
  dialog.addEventListener('close', () => previousFocus?.focus());
}

const INITIAL_OUTSIDE_FRAGMENTS = new Set([
  '#outside-music',
  '#outside-photography',
  '#outside-travel',
]);

export function mountInitialFragmentNavigation(options = {}) {
  const view = options.window ?? globalThis.window;
  const doc = options.document ?? globalThis.document;
  const schedule = options.requestAnimationFrame ?? view?.requestAnimationFrame?.bind(view);
  const hash = view?.__initialOutsideHash;
  if (!view || !doc || !INITIAL_OUTSIDE_FRAGMENTS.has(hash)) return false;

  const target = doc.querySelector(hash);
  if (!target) return false;

  const motionAllowed = Boolean(view.matchMedia?.('(min-width: 40.001rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches);
  const move = () => {
    target.classList?.add('is-visible');
    target.scrollIntoView({ behavior: motionAllowed ? 'smooth' : 'auto', block: 'start' });
    view.history?.replaceState(null, '', `${view.location.pathname}${view.location.search}${hash}`);
  };

  if (schedule) schedule(() => schedule(move));
  else move();
  return true;
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
  mountInitialFragmentNavigation();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
