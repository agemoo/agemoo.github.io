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
  assert.deepEqual(Object.keys(LANGUAGES.en.attributes), Object.keys(LANGUAGES.zh.attributes));
  assert.equal(LANGUAGES.en.copy['.hero .role'], 'I make social content feel native to the community it enters.');
  assert.match(LANGUAGES.en.copy['.hero .roleen'], /for U\.S\. audiences\./);
  assert.equal(LANGUAGES.zh.copy['.hero .role'], '让内容真正融入它所面对的社区。');
  assert.ok(!Object.hasOwn(LANGUAGES.en.copy, '.hero .ghost'));
  const allCopy = JSON.stringify(LANGUAGES);
  assert.match(allCopy, /19,000[\s\S]*impressions/);
  assert.match(allCopy, /525[\s\S]*\+/);
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
  for (const selector of selectors) {
    const target = selector.startsWith('#vertex') ? detail : home;
    const id = selector.match(/#([\w-]+)/)?.[1];
    const classes = [...selector.matchAll(/\.([\w-]+)/g)].map((match) => match[1]);
    if (id) assert.match(target, new RegExp(`id="${id}"`), selector);
    for (const className of classes) {
      assert.match(target, new RegExp(`class="[^"]*\\b${className}\\b`), selector);
    }
  }
});

test('footer, language, proof, and compact-navigation labels are bilingual', () => {
  assert.equal(LANGUAGES.en.copy['#site-footer span:last-child'], 'Mukun Sun · Integrated Marketing Portfolio');
  assert.equal(LANGUAGES.zh.copy['#site-footer span:last-child'], '孙慕坤 · 整合营销作品集');
  assert.equal(LANGUAGES.en.attributes['#nav .lang-switch']['aria-label'], 'Language');
  assert.equal(LANGUAGES.zh.attributes['#nav .lang-switch']['aria-label'], '语言');
  assert.match(LANGUAGES.en.attributes['#experience .experience-proof']['aria-label'], /representative account evidence/i);
  assert.match(LANGUAGES.zh.attributes['#experience .experience-proof']['aria-label'], /代表账号证据/);
  assert.equal(LANGUAGES.en.copy['#nav .compact-nav summary'], 'Sections');
  assert.equal(LANGUAGES.zh.copy['#nav .compact-nav summary'], '章节');
});

test('language module declares the shared cache key', async () => {
  const module = await import('../i18n.js');
  assert.equal(module.I18N_CACHE_KEY, '20260722-index-redesign');
});

test('capability ledger has matching delivered-work rows in both languages', () => {
  const rows = [
    'Community',
    'Content',
    'Visual',
    'Reporting &amp; Workflow',
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
      location: { pathname: page === 'vertex' ? '/projects/vertex-reddit.html' : '/' },
      title: '',
      querySelector(selector) { return selector === 'meta[name="description"]' ? meta : null; },
      querySelectorAll() { return []; },
    };
  }

  const homeEn = createDocument('home');
  const vertexEn = createDocument('vertex');
  const homeZh = createDocument('home');
  const vertexZh = createDocument('vertex');

  applyLanguage('en', homeEn);
  applyLanguage('en', vertexEn);
  applyLanguage('zh', homeZh);
  applyLanguage('zh', vertexZh);

  assert.equal(homeEn.title, 'Mukun Sun | Bilingual Social Media Marketer');
  assert.equal(homeEn.meta.content, 'Bilingual social media marketer with hands-on experience in community strategy, content production, and visual communication for U.S. audiences.');
  assert.equal(vertexEn.title, 'Vertex Reddit Internship Evidence | Mukun Sun');
  assert.equal(vertexEn.meta.content, "A scoped, bilingual evidence record for Mukun Sun's Reddit community operations internship at Vertex Marketing.");
  assert.equal(homeZh.title, '孙慕坤｜社交媒体与营销作品集');
  assert.equal(homeZh.meta.content, '孙慕坤中英双语作品集：社交媒体、活动策划、数据分析、平面设计、摄影与活动营销。');
  assert.equal(vertexZh.title, 'Vertex Reddit 实习证据 | 孙慕坤');
  assert.equal(vertexZh.meta.content, '孙慕坤在 Vertex Marketing 参与 Reddit 社区运营实习的双语证据记录，明确区分代表账号历史资产与实习期间新增成果。');
});

test('homepage navigation links directly to Experience in both languages', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /href="#experience">Experience<\/a>/);
  assert.match(LANGUAGES.en.copy['#nav .links'], /href="#experience">Experience<\/a>/);
  assert.match(LANGUAGES.zh.copy['#nav .links'], /href="#experience">工作经历<\/a>/);
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
  assert.match(html, /src="i18n\.js\?v=20260722-index-redesign"/);
});
