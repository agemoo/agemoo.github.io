(function (window, document) {
  'use strict';

  const storageKey = 'portfolio-theme';
  const lightThemeColor = '#f4efe7';
  const darkThemeColor = '#171411';
  const publicThemesEnabled = false;

  function isTheme(value) {
    return value === 'dark' || value === 'light';
  }

  function readStoredTheme() {
    try {
      const value = window.localStorage?.getItem(storageKey);
      return isTheme(value) ? value : null;
    } catch {
      return null;
    }
  }

  function resolveTheme(storedTheme) {
    if (!publicThemesEnabled) return 'dark';
    if (isTheme(storedTheme)) return storedTheme;
    return 'dark';
  }

  function isChinese() {
    return document.documentElement.lang.toLowerCase().startsWith('zh');
  }

  function updateControl(button, theme) {
    const light = theme === 'light';
    button.setAttribute('aria-pressed', String(light));
    button.setAttribute('aria-label', isChinese()
      ? (light ? '切换至深色模式' : '切换至浅色模式')
      : (light ? 'Switch to dark mode' : 'Switch to light mode'));
    button.setAttribute('title', isChinese()
      ? (light ? '深色模式' : '浅色模式')
      : (light ? 'Dark mode' : 'Light mode'));
    button.textContent = light ? '☾' : '☀';
  }

  function updateControls() {
    if (!publicThemesEnabled) return;
    const theme = document.documentElement.dataset.theme || 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => updateControl(button, theme));
  }

  function applyTheme(theme, options) {
    const nextTheme = publicThemesEnabled && isTheme(theme) ? theme : 'dark';
    const root = document.documentElement;
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = nextTheme === 'light' ? lightThemeColor : darkThemeColor;
    if (publicThemesEnabled && options?.persist) {
      try { window.localStorage?.setItem(storageKey, nextTheme); } catch { /* storage may be unavailable */ }
    }
    updateControls();
    return nextTheme;
  }

  function mountControls() {
    if (!publicThemesEnabled) return;
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      if (!button.__portfolioThemeMounted) {
        button.__portfolioThemeMounted = true;
        button.addEventListener('click', () => {
          const current = document.documentElement.dataset.theme;
          applyTheme(current === 'light' ? 'dark' : 'light', { persist: true });
        });
      }
    });
    updateControls();
  }

  const initialTheme = resolveTheme(readStoredTheme());
  applyTheme(initialTheme);

  const api = { storageKey, resolveTheme, applyTheme, mountControls };
  window.PortfolioTheme = api;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountControls, { once: true });
  } else {
    mountControls();
  }

  if ('MutationObserver' in window) {
    new window.MutationObserver(updateControls).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }
})(window, document);
