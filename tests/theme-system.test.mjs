import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const sourceUrl = new URL('../theme.js', import.meta.url);
const rootUrl = new URL('../', import.meta.url);
const publicRoutes = [
  'index.html',
  'music.html',
  'photography.html',
  'travel.html',
  'projects/campus-campaign.html',
  'projects/hotel-jazz.html',
  'projects/vertex-reddit.html',
  'projects/suu-teaching-assistant.html',
  'projects/visual-work.html',
];

async function loadTheme({ storedTheme = null, systemPrefersLight = false, language = 'en' } = {}) {
  const source = await readFile(sourceUrl, 'utf8');
  const writes = [];
  const listeners = new Map();
  const mediaListeners = [];
  const button = {
    attributes: new Map(),
    textContent: '',
    setAttribute(name, value) { this.attributes.set(name, String(value)); },
    addEventListener(type, listener) { listeners.set(type, listener); },
  };
  const root = { dataset: {}, style: {}, lang: language };
  const themeColor = { content: '' };
  const storage = {
    getItem(key) { return key === 'portfolio-theme' ? storedTheme : null; },
    setItem(key, value) { writes.push([key, value]); storedTheme = value; },
    removeItem() {},
  };
  const media = {
    matches: systemPrefersLight,
    addEventListener(type, listener) { if (type === 'change') mediaListeners.push(listener); },
  };
  const document = {
    documentElement: root,
    readyState: 'complete',
    querySelector(selector) { return selector === 'meta[name="theme-color"]' ? themeColor : null; },
    querySelectorAll(selector) { return selector === '[data-theme-toggle]' ? [button] : []; },
    addEventListener() {},
  };
  const window = { document, localStorage: storage, matchMedia: () => media };
  vm.runInNewContext(source, { window, document }, { filename: 'theme.js' });
  return { api: window.PortfolioTheme, root, themeColor, storage, writes, button, listeners, mediaListeners };
}

test('public theme resolution stays dark while the light system is paused', async () => {
  const { api } = await loadTheme();
  assert.equal(api.storageKey, 'portfolio-theme');
  assert.equal(api.resolveTheme('light', false), 'dark');
  assert.equal(api.resolveTheme('dark', true), 'dark');
  assert.equal(api.resolveTheme('sepia', true), 'dark');
  assert.equal(api.resolveTheme(null, true), 'dark');
  assert.equal(api.resolveTheme(null, false), 'dark');
});

test('initial theme applies before controls mount without persisting an inferred choice', async () => {
  const { root, themeColor, writes } = await loadTheme({ systemPrefersLight: true });
  assert.equal(root.dataset.theme, 'dark');
  assert.equal(root.style.colorScheme, 'dark');
  assert.equal(themeColor.content, '#171411');
  assert.deepEqual(writes, []);
});

test('operating-system changes do not override the authored dark default', async () => {
  const { mediaListeners, root } = await loadTheme({ systemPrefersLight: false });
  assert.deepEqual(mediaListeners, []);
  assert.equal(root.dataset.theme, 'dark');
});

test('paused public theming ignores light requests without erasing the stored preference', async () => {
  const state = await loadTheme({ storedTheme: 'dark', language: 'zh-CN' });
  assert.equal(state.api.applyTheme('light', { persist: true }), 'dark');
  assert.equal(state.root.dataset.theme, 'dark');
  assert.equal(state.button.attributes.size, 0);
  assert.equal(state.listeners.size, 0);
  assert.deepEqual(state.writes, []);
});

test('semantic tokens define both palettes and theme-dependent effects', async () => {
  const tokens = await readFile(new URL('tokens.css', rootUrl), 'utf8');
  for (const token of [
    '--color-paper', '--color-ink', '--color-rule', '--color-shadow',
    '--effect-nav-surface', '--effect-nav-surface-soft', '--effect-nav-blur', '--effect-nav-saturation',
    '--effect-dialog-backdrop', '--effect-media-brightness',
    '--effect-media-saturation', '--effect-grain-opacity', '--effect-spotlight-blend',
  ]) assert.match(tokens, new RegExp(`${token.replaceAll('-', '\\-')}:`), token);
  assert.match(tokens, /:root\s*\{[^}]*color-scheme:\s*dark;/s);
  assert.match(tokens, /html\[data-theme="light"\]\s*\{[^}]*color-scheme:\s*light;/s);
});

test('every primary public route initializes dark mode before styles without exposing a theme control', async () => {
  for (const path of publicRoutes) {
    const html = await readFile(new URL(path, rootUrl), 'utf8');
    const source = path.startsWith('projects/') ? '../theme.js' : 'theme.js';
    const scriptIndex = html.indexOf(`<script src="${source}"></script>`);
    const styleIndex = html.indexOf('<link rel="stylesheet"');
    assert.ok(scriptIndex > -1, `${path}: theme script`);
    assert.ok(styleIndex > scriptIndex, `${path}: theme initializes before stylesheet`);
    assert.match(html, /<meta name="theme-color" content="#171411">/, `${path}: browser theme color`);
    assert.equal((html.match(/data-theme-toggle/g) ?? []).length, 0, `${path}: no public theme control`);
    assert.doesNotMatch(html, /<button[^>]+data-theme-toggle[^>]*><\/button>/, `${path}: theme control hidden`);
    assert.doesNotMatch(html, /html\[data-theme="light"\]/, `${path}: palette remains centralized`);
  }
});

test('small-screen navigation prioritizes section and language controls over the repeated brand', async () => {
  const [home, detail, vertex] = await Promise.all([
    readFile(new URL('index.html', rootUrl), 'utf8'),
    readFile(new URL('detail.css', rootUrl), 'utf8'),
    readFile(new URL('projects/vertex-reddit.html', rootUrl), 'utf8'),
  ]);
  assert.match(home, /@media \(max-width:30rem\)\{\.nav \.brand\{display:none;\}/);
  assert.match(detail, /@media\(max-width:30rem\)\{\.detail-nav \.brand\{display:none;\}/);
  assert.match(vertex, /@media \(max-width:30rem\)\{\.nav \.brand\{display:none;\}/);
});
