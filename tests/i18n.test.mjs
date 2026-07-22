import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  normalizeLanguage,
  getInitialLanguage,
  applyLanguage,
} from '../i18n.js';

test('English is the primary language even when Chinese was previously stored', () => {
  assert.equal(DEFAULT_LANGUAGE, 'en');
  assert.equal(normalizeLanguage('zh'), 'zh');
  assert.equal(normalizeLanguage('fr'), 'en');
  assert.equal(getInitialLanguage({ getItem: () => null }), 'en');
  assert.equal(getInitialLanguage({ getItem: () => 'zh' }), 'en');
});

test('both languages cover the same selector set and corrected facts', () => {
  assert.deepEqual(Object.keys(LANGUAGES.en.copy), Object.keys(LANGUAGES.zh.copy));
  const allCopy = JSON.stringify(LANGUAGES);
  assert.match(allCopy, /19,000[\s\S]*impressions/);
  assert.match(allCopy, /525[\s\S]*\+/);
  assert.doesNotMatch(allCopy, /5,250|\+17%|~200|随时到岗|Single-post reads/);
});

test('applyLanguage updates content, metadata, state, and persistence', () => {
  const node = { innerHTML: '', setAttribute(name, value) { this[name] = value; } };
  const buttons = [
    { dataset: { lang: 'en' }, classList: { toggle() {} }, setAttribute(name, value) { this[name] = value; } },
    { dataset: { lang: 'zh' }, classList: { toggle() {} }, setAttribute(name, value) { this[name] = value; } },
  ];
  const meta = { content: '' };
  const doc = {
    documentElement: { lang: '', dataset: {} },
    title: '',
    querySelector(selector) { return selector === 'meta[name="description"]' ? meta : node; },
    querySelectorAll(selector) { return selector === '[data-lang]' ? buttons : []; },
  };
  const saved = [];
  const storage = { setItem: (...args) => saved.push(args) };
  applyLanguage('zh', doc, storage, true);
  assert.equal(doc.documentElement.lang, 'zh-CN');
  assert.equal(doc.documentElement.dataset.language, 'zh');
  assert.equal(doc.title, LANGUAGES.zh.title);
  assert.equal(meta.content, LANGUAGES.zh.description);
  assert.deepEqual(saved.at(-1), ['portfolio-language', 'zh']);
});

test('page exposes a bilingual control and named presentation crops', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /class="lang-switch"/);
  assert.match(html, /data-lang="en"/);
  assert.match(html, /data-lang="zh"/);
  assert.match(html, /class="art crop-hotone-guitar"[^>]+href="build\/assets\/hotone_guitar\.jpg"/);
  assert.match(html, /class="art crop-hotone-pedal"[^>]+href="build\/assets\/hotone_pedal\.jpg"/);
  assert.match(html, /href="build\/assets\/jazz_coast_a\.jpg"/);
  assert.match(html, /src="i18n\.js"/);
});
