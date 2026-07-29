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

function mountPageMotion() {
  const progress = document.querySelector('.progress');
  const nav = document.querySelector('.detail-nav, .nav');
  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let reducedMotion = Boolean(mediaQuery?.matches);
  let frame = null;

  const revealAll = () => revealItems.forEach((item) => item.classList.add('is-visible'));
  const updateScroll = () => {
    frame = null;
    nav?.classList.toggle('solid', window.scrollY > 8);
    if (!progress || reducedMotion) return;
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
  };
  const onScroll = () => {
    if (frame === null) frame = window.requestAnimationFrame(updateScroll);
  };
  const mountRevealObserver = () => {
    if (reducedMotion || !revealItems.length) return revealAll();
    if (!('IntersectionObserver' in window)) return revealAll();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => observer.observe(item));
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  mediaQuery?.addEventListener('change', (event) => {
    reducedMotion = event.matches;
    if (reducedMotion) revealAll();
    updateScroll();
  });
  updateScroll();
  mountRevealObserver();
}

function boot() {
  mountImageDialog(document.querySelector('.image-dialog'));
  mountPageMotion();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
