import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  DEFAULT_LANGUAGE,
  I18N_CACHE_KEY,
  LANGUAGES,
  PAGE_KEYS,
  normalizeLanguage,
  getInitialLanguage,
  applyLanguage,
} from '../i18n.js';
import { createStaticSelectorDocument } from './helpers/static-selector.mjs';

test('English is fresh default and an explicit valid choice persists', () => {
  assert.equal(DEFAULT_LANGUAGE, 'en');
  assert.equal(getInitialLanguage({ getItem: () => null }), 'en');
  assert.equal(getInitialLanguage({ getItem: () => 'zh' }), 'zh');
  assert.equal(getInitialLanguage({ getItem: () => 'fr' }), 'en');
});

test('both languages cover the same selector set and corrected facts', () => {
  assert.deepEqual(Object.keys(LANGUAGES.en.copy), Object.keys(LANGUAGES.zh.copy));
  assert.deepEqual(Object.keys(LANGUAGES.en.attributes), Object.keys(LANGUAGES.zh.attributes));
  assert.equal(LANGUAGES.en.copy['.hero .role'], 'I make social content feel native to the community it enters.');
  assert.match(LANGUAGES.en.copy['.hero .roleen'], /for U\.S\. audiences\./);
  assert.equal(LANGUAGES.zh.copy['.hero .role'], '让内容真正融入它所面对的社区。');
  assert.ok(!Object.hasOwn(LANGUAGES.en.copy, '.hero .ghost'));
  const allCopy = JSON.stringify(LANGUAGES);
  assert.doesNotMatch(allCopy, /19,000[\s\S]*impressions/);
  assert.doesNotMatch(allCopy, /525[\s\S]*\+/);
  assert.doesNotMatch(allCopy, /5,250|\+17%|~200|随时到岗|Single-post reads/);
});

test('each translation selector is rooted in its intended route', async () => {
  const [home, detail] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8'),
  ]);
  const selectors = new Set([
    ...Object.keys(LANGUAGES.en.copy),
    ...Object.keys(LANGUAGES.en.attributes),
  ]);
  const routes = {
    home: createStaticSelectorDocument(home),
    detail: createStaticSelectorDocument(detail),
  };
  for (const selector of selectors) {
    const target = selector.startsWith('#vertex') ? routes.detail : routes.home;
    assert.equal(target.has(selector), true, selector);
  }
});

test('selector validation rejects broken ancestry and nth-child combinations', async () => {
  const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const document = createStaticSelectorDocument(home);
  assert.equal(document.has('#about .capability-row:nth-child(99) h3'), false);
  assert.equal(document.has('#about .capability-row:nth-child(1) .contact-label'), false);
});

test('footer, language, proof, and compact-navigation labels are bilingual', () => {
  assert.equal(Object.hasOwn(LANGUAGES.en.copy, '#site-footer span:last-child'), false);
  assert.equal(Object.hasOwn(LANGUAGES.zh.copy, '#site-footer span:last-child'), false);
  assert.equal(LANGUAGES.en.attributes['#nav .lang-switch']['aria-label'], 'Language');
  assert.equal(LANGUAGES.zh.attributes['#nav .lang-switch']['aria-label'], '语言');
  assert.match(LANGUAGES.en.attributes['#experience .experience-proof']['aria-label'], /representative account evidence/i);
  assert.match(LANGUAGES.zh.attributes['#experience .experience-proof']['aria-label'], /代表账号证据/);
  assert.equal(LANGUAGES.en.copy['#nav .compact-nav summary'], 'Sections');
  assert.equal(LANGUAGES.zh.copy['#nav .compact-nav summary'], '章节');
});

test('language module declares all public page keys and the shared cache key', () => {
  assert.deepEqual(PAGE_KEYS, ['home', 'vertex', 'campus', 'hotel', 'visual', 'outside']);
  assert.equal(I18N_CACHE_KEY, '20260729-personal-site');
});

test('capability ledger has matching delivered-work rows in both languages', () => {
  const rows = [
    'Community',
    'Content',
    'Visual',
    'Workflow',
  ];
  for (const [index, label] of rows.entries()) {
    const selector = `#about .capability-row:nth-child(${index + 1}) h3`;
    assert.equal(LANGUAGES.en.copy[selector], label);
    assert.ok(LANGUAGES.zh.copy[selector]);
  }
  assert.match(LANGUAGES.en.copy['#about .capability-row:nth-child(4) p'], /Excel cleaning, Excel reporting/);
  assert.match(LANGUAGES.zh.copy['#about .capability-row:nth-child(4) p'], /Excel 数据清洗与报表/);
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

test('applyLanguage uses page-specific metadata in both languages', () => {
  function createDocument(page) {
    const meta = { content: '' };
    return {
      meta,
      documentElement: { lang: '', dataset: { page } },
      title: '',
      querySelector(selector) { return selector === 'meta[name="description"]' ? meta : null; },
      querySelectorAll() { return []; },
    };
  }

  for (const language of ['en', 'zh']) {
    for (const page of PAGE_KEYS) {
      const doc = createDocument(page);
      applyLanguage(language, doc);
      assert.equal(doc.title, LANGUAGES[language].metadata[page].title, `${language}:${page}`);
      assert.equal(doc.meta.content, LANGUAGES[language].metadata[page].description, `${language}:${page}`);
    }
  }
  assert.equal(LANGUAGES.en.metadata.home.title, 'Mukun Sun | Communication, Community, and Music');
  assert.equal(LANGUAGES.en.metadata.home.description, 'A professional and personal portfolio of communication, community work, visual projects, education, music, and photography by Mukun Sun.');
  assert.equal(LANGUAGES.zh.metadata.home.title, '孙慕坤｜传播、社群与音乐');
  assert.equal(LANGUAGES.zh.metadata.home.description, '孙慕坤的个人网站：社交媒体与社群运营、传播项目、视觉作品、教育经历，以及音乐与摄影。');
  for (const language of ['en', 'zh']) {
    for (const page of PAGE_KEYS) {
      const metadata = LANGUAGES[language].metadata[page];
      assert.equal(typeof metadata.title, 'string', `${language}:${page} title`);
      assert.ok(metadata.title.length > 0, `${language}:${page} title`);
      assert.equal(typeof metadata.description, 'string', `${language}:${page} description`);
      assert.ok(metadata.description.length > 0, `${language}:${page} description`);
    }
  }
});

test('homepage navigation labels the internship section in both languages', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /href="#experience">Internships<\/a>/);
  assert.match(LANGUAGES.en.copy['#nav .links'], /href="#experience">Internships<\/a>/);
  assert.match(LANGUAGES.en.copy['#nav .compact-links'], /href="#experience">Internships<\/a>/);
  assert.match(LANGUAGES.zh.copy['#nav .links'], /href="#experience">实习经历<\/a>/);
  assert.match(LANGUAGES.zh.copy['#nav .compact-links'], /href="#experience">实习经历<\/a>/);
});

test('page exposes a bilingual control and curated visual archive', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /class="lang-switch"/);
  assert.match(html, /data-lang="en"/);
  assert.match(html, /data-lang="zh"/);
  assert.match(html, /class="visual-item"[^>]+href="build\/assets\/hotone_guitar\.jpg"/);
  assert.match(html, /class="visual-item"[^>]+href="build\/assets\/hotone_pedal\.jpg"/);
  assert.match(html, /<details class="visual-archive"/);
  assert.match(html, /href="build\/assets\/jazz_coast_a\.jpg"/);
  assert.match(html, /src="i18n\.js\?v=20260729-personal-site"/);
});
