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
  assert.equal(LANGUAGES.en.copy['.hero .role'], 'Communication, community, and music.');
  assert.equal(LANGUAGES.zh.copy['.hero .role'], '传播、社区与音乐。');
  assert.equal(Object.hasOwn(LANGUAGES.en.copy, '.hero .roleen'), false);
  assert.equal(Object.hasOwn(LANGUAGES.zh.copy, '.hero .roleen'), false);
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
  assert.equal(document.has('#outside-work .outside-card:nth-child(99) strong'), false);
  assert.equal(document.has('#projects .project-row:nth-child(1) .contact-label'), false);
});

test('footer, language, proof, and compact-navigation labels are bilingual', () => {
  assert.equal(Object.hasOwn(LANGUAGES.en.copy, '#site-footer span:last-child'), false);
  assert.equal(Object.hasOwn(LANGUAGES.zh.copy, '#site-footer span:last-child'), false);
  assert.equal(LANGUAGES.en.attributes['#nav .lang-switch']['aria-label'], 'Language');
  assert.equal(LANGUAGES.zh.attributes['#nav .lang-switch']['aria-label'], '语言');
  assert.match(LANGUAGES.en.copy['#experience .experience-proofline'], /representative accounts/i);
  assert.match(LANGUAGES.zh.copy['#experience .experience-proofline'], /代表账号/);
  assert.equal(LANGUAGES.en.copy['#nav .compact-nav summary'], 'Sections');
  assert.equal(LANGUAGES.zh.copy['#nav .compact-nav summary'], '章节');
});

test('language module declares all public page keys and the shared cache key', () => {
  assert.deepEqual(PAGE_KEYS, ['home', 'vertex', 'campus', 'hotel', 'visual', 'outside']);
  assert.equal(I18N_CACHE_KEY, '20260729-personal-site');
});

test('homepage dictionaries own the approved first-layer selectors', () => {
  const selectors = [
    '#about .about-copy p:nth-child(1)',
    '#about .about-copy p:nth-child(2)',
    '#experience .experience-proofline',
    '#projects .project-row:nth-child(1) .project-copy strong',
    '#projects .project-row:nth-child(2) .project-copy strong',
    '#projects .project-row:nth-child(3) .project-copy strong',
    '#outside-work .outside-card:nth-child(1) strong',
    '#outside-work .outside-card:nth-child(2) strong',
    '#outside-work .outside-card:nth-child(3) strong',
    '#contact h2',
    '#contact .contact-intro',
  ];
  for (const selector of selectors) {
    assert.ok(LANGUAGES.en.copy[selector], selector);
    assert.ok(LANGUAGES.zh.copy[selector], selector);
  }
  assert.equal(LANGUAGES.en.copy['#projects .project-row:nth-child(3) .project-copy strong'], 'Selected Visual Work');
  assert.equal(LANGUAGES.en.copy['#contact .contact-intro'], 'You can reach me by email or LinkedIn.');
  assert.doesNotMatch(JSON.stringify(LANGUAGES.en.copy), /capability-row|visual-archive|project-context|project-contribution/);
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
      applyLanguage(language, doc, null);
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

test('homepage navigation presents the four approved first-layer destinations in both languages', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const english = '<a href="#about">About</a><a href="#experience">Work</a><a href="#outside-work">Outside Work</a><a href="#contact">Contact</a>';
  const chinese = '<a href="#about">关于</a><a href="#experience">工作</a><a href="#outside-work">工作之外</a><a href="#contact">联系</a>';
  assert.match(html, new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.equal(LANGUAGES.en.copy['#nav .links'], english);
  assert.equal(LANGUAGES.en.copy['#nav .compact-links'], english);
  assert.equal(LANGUAGES.zh.copy['#nav .links'], chinese);
  assert.equal(LANGUAGES.zh.copy['#nav .compact-links'], chinese);
});

test('page exposes a bilingual control and the approved outside-work gateway media', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /class="lang-switch"/);
  assert.match(html, /data-lang="en"/);
  assert.match(html, /data-lang="zh"/);
  assert.match(html, /href="outside-work\.html"/);
  assert.match(html, /src="assets\/music\/performance\.jpg"/);
  assert.match(html, /src="assets\/bass1\.jpg"/);
  assert.doesNotMatch(html, /src="build\/assets\/bass1\.jpg"/);
  const photographyImage = '#outside-work .outside-card:nth-child(2) img';
  assert.equal(LANGUAGES.en.attributes[photographyImage].alt, 'Night photograph of a white bass guitar against a tree');
  assert.equal(LANGUAGES.zh.attributes[photographyImage].alt, '白色贝斯倚靠树干的夜色摄影');
  assert.doesNotMatch(html, /<details class="visual-archive"/);
  assert.match(html, /src="i18n\.js\?v=20260729-personal-site"/);
});
