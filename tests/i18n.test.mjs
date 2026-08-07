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

const i18nSource = await readFile(new URL('../i18n.js', import.meta.url), 'utf8');

test('English is fresh default and an explicit valid choice persists', () => {
  assert.equal(DEFAULT_LANGUAGE, 'en');
  assert.equal(getInitialLanguage({ getItem: () => null }), 'en');
  assert.equal(getInitialLanguage({ getItem: () => 'zh' }), 'zh');
  assert.equal(getInitialLanguage({ getItem: () => 'fr' }), 'en');
});

test('English uses straight quotes while Chinese uses full-width punctuation', () => {
  const englishSource = i18nSource.split('const zh =')[0];
  assert.doesNotMatch(englishSource, /[‘’“”]/);
  assert.equal(LANGUAGES.en.copy['#music-fashion-show p'], 'Rearranged "Just the Two of Us" for the warm-up performance, organized rehearsals, and designed the promotional poster.');
  assert.match(LANGUAGES.zh.copy['#hotel-context p'], /“酒店与艺术”/);
  assert.match(LANGUAGES.zh.copy['#music-fashion-show p'], /《Just the Two of Us》/);
});

test('both languages cover the same selector set and corrected facts', () => {
  assert.deepEqual(Object.keys(LANGUAGES.en.copy), Object.keys(LANGUAGES.zh.copy));
  assert.deepEqual(Object.keys(LANGUAGES.en.attributes), Object.keys(LANGUAGES.zh.attributes));
  assert.equal(LANGUAGES.en.copy['.hero .role'], 'Communication, community, and music.');
  assert.equal(LANGUAGES.zh.copy['.hero .role'], '传播、社群与音乐。');
  assert.equal(Object.hasOwn(LANGUAGES.en.copy, '.hero .roleen'), false);
  assert.equal(Object.hasOwn(LANGUAGES.zh.copy, '.hero .roleen'), false);
  assert.ok(!Object.hasOwn(LANGUAGES.en.copy, '.hero .ghost'));
  const allCopy = JSON.stringify(LANGUAGES);
  assert.doesNotMatch(allCopy, /19,000[\s\S]*impressions/);
  assert.doesNotMatch(allCopy, /525[\s\S]*\+/);
  assert.doesNotMatch(allCopy, /5,250|\+17%|~200|随时到岗|Single-post reads/);
  assert.doesNotMatch(allCopy, /representative|Attribution boundary|归因边界|归因说明/i);
  assert.equal(Object.hasOwn(LANGUAGES.en.copy, '#experience .experience-attribution'), false);
  assert.equal(Object.hasOwn(LANGUAGES.zh.copy, '#experience .experience-attribution'), false);
});

test('each translation selector is rooted in its intended route', async () => {
  const [home, vertex, teaching, campus, hotel, visual, music, photography, travel] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/suu-teaching-assistant.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/campus-campaign.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/hotel-jazz.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/visual-work.html', import.meta.url), 'utf8'),
    readFile(new URL('../music.html', import.meta.url), 'utf8'),
    readFile(new URL('../photography.html', import.meta.url), 'utf8'),
    readFile(new URL('../travel.html', import.meta.url), 'utf8'),
  ]);
  const selectors = new Set([
    ...Object.keys(LANGUAGES.en.copy),
    ...Object.keys(LANGUAGES.en.attributes),
  ]);
  const routes = {
    home: createStaticSelectorDocument(home),
    vertex: createStaticSelectorDocument(vertex),
    teaching: createStaticSelectorDocument(teaching),
    campus: createStaticSelectorDocument(campus),
    hotel: createStaticSelectorDocument(hotel),
    visual: createStaticSelectorDocument(visual),
    music: createStaticSelectorDocument(music),
    photography: createStaticSelectorDocument(photography),
    travel: createStaticSelectorDocument(travel),
  };
  for (const selector of selectors) {
    const route = selector.startsWith('#vertex-') ? 'vertex'
      : selector.startsWith('#teaching-') ? 'teaching'
      : selector.startsWith('#campus-') ? 'campus'
        : selector.startsWith('#hotel-') ? 'hotel'
          : selector.startsWith('#visual-') ? 'visual'
            : selector.startsWith('#music-') ? 'music'
              : selector.startsWith('#photography-') ? 'photography'
                : selector.startsWith('#travel-') ? 'travel'
                  : 'home';
    assert.equal(routes[route].has(selector), true, `${route}: ${selector}`);
  }
});

test('second-layer dictionaries use the approved bilingual claims', () => {
  const matrix = [
    ['#campus-context p', 'Campus welcome and New Year events needed coordinated promotion across online and offline channels.', '校园迎新与新年活动需要在线上线下渠道之间保持协调一致的宣传。'],
    ['#campus-contribution p', 'I led the promotion work, adapted content for each platform, and connected on-site activity with online publishing.', '我负责宣传工作的组织协调，根据不同平台调整内容，并衔接现场活动与线上发布。'],
    ['#hotel-context p', 'A balcony performance connected Ni Jazz Bar with Fengmao Andi Hotel around a hotel-and-art event concept.', '一场阳台演出以“酒店与艺术”为概念，连接了 Ni Jazz Bar 与风貌安坻酒店。'],
    ['#hotel-contribution p', 'I developed the event concept, coordinated the partners and performance, planned WeChat promotion, and designed a consistent visual identity.', '我构思活动概念，协调合作方与演出，策划微信推广，并设计统一的视觉识别。'],
    ['#visual-hero .detail-deck', 'Event, product, print, and photographic work.', '活动、产品、印刷与摄影作品。'],
    ['#music-intro .music-intro-copy', 'I play upright and electric bass, but much of my music work also happens before the stage: arranging, organizing rehearsals, coordinating venues, and building an event around a band.', '我演奏低音提琴和电贝斯，但很多音乐工作发生在登台之前：编曲、组织排练、协调场地，以及围绕一支乐队完成整场活动。'],
  ];
  for (const [selector, english, chinese] of matrix) {
    assert.equal(LANGUAGES.en.copy[selector], english, selector);
    assert.equal(LANGUAGES.zh.copy[selector], chinese, selector);
  }
  assert.doesNotMatch(JSON.stringify(matrix), /19,000|525|5,250|\+17%|~200/);
});

test('Chinese professional labels use 社群 while subreddit contexts retain 社区', () => {
  assert.equal(LANGUAGES.zh.copy['.hero .role'], '传播、社群与音乐。');
  assert.equal(LANGUAGES.zh.copy['#experience .experience-row--vertex .experience-role'], 'Reddit 社群运营实习生');
  assert.equal(LANGUAGES.zh.copy['#experience .experience-row--teaching .experience-company'], '南犹他大学');
  assert.equal(LANGUAGES.zh.copy['#edu .edu-entry:nth-child(1) .edu-school'], '南犹他大学');
  assert.match(LANGUAGES.zh.copy['#vertex-hero'], /Reddit 社群运营/);
  assert.doesNotMatch(LANGUAGES.zh.copy['#vertex-hero'], /Reddit 社区运营/);
  assert.match(LANGUAGES.zh.metadata.vertex.description, /Reddit 社群运营实习/);
  assert.match(LANGUAGES.zh.copy['#vertex-community'], /社区语境/);
});

test('second-layer route copy and attributes are selector-scoped and complete', () => {
  const copyRoots = {
    teaching: [
      '#teaching-nav .brand', '#teaching-nav .links', '#teaching-nav .compact-nav summary', '#teaching-nav .compact-links', '#teaching-nav .back-link',
      '#teaching-hero h1', '#teaching-hero .detail-eyebrow', '#teaching-hero .detail-deck', '#teaching-hero .detail-meta',
      '#teaching-context h2', '#teaching-context p', '#teaching-classroom h2', '#teaching-classroom p',
      '#teaching-operations h2', '#teaching-operations p', '#teaching-bridge h2', '#teaching-bridge p', '#teaching-media h2',
      '#teaching-media .detail-media:nth-child(1) figcaption', '#teaching-media .detail-media:nth-child(2) figcaption',
      '#teaching-footer span', '#teaching-footer a',
    ],
    campus: [
      '#campus-nav .brand', '#campus-nav .links', '#campus-nav .compact-nav summary', '#campus-nav .compact-links', '#campus-nav .back-link',
      '#campus-hero h1', '#campus-hero .detail-eyebrow', '#campus-hero .detail-deck', '#campus-hero .detail-meta',
      '#campus-context h2', '#campus-context p', '#campus-contribution h2', '#campus-contribution p',
      '#campus-media h2', '#campus-media figcaption', '#campus-footer span', '#campus-footer a',
    ],
    hotel: [
      '#hotel-nav .brand', '#hotel-nav .links', '#hotel-nav .compact-nav summary', '#hotel-nav .compact-links', '#hotel-nav .back-link',
      '#hotel-hero h1', '#hotel-hero .detail-eyebrow', '#hotel-hero .detail-deck', '#hotel-hero .detail-meta',
      '#hotel-context h2', '#hotel-context p', '#hotel-contribution h2', '#hotel-contribution p', '#hotel-media h2',
      '#hotel-media .detail-media:nth-child(1) figcaption', '#hotel-media .detail-media:nth-child(2) figcaption', '#hotel-footer span', '#hotel-footer a',
    ],
    visual: [
      '#visual-nav .brand', '#visual-nav .links', '#visual-nav .compact-nav summary', '#visual-nav .compact-links', '#visual-nav .back-link',
      '#visual-hero h1', '#visual-hero .detail-eyebrow', '#visual-hero .detail-deck', '#visual-gallery h2',
      ...Array.from({ length: 7 }, (_, index) => `#visual-gallery .detail-media:nth-child(${index + 1}) figcaption`),
      '#visual-footer span', '#visual-footer a',
    ],
    music: [
      '#music-nav .brand', '#music-nav .links', '#music-nav .compact-nav summary', '#music-nav .compact-links', '#music-nav .back-link',
      '#music-hero h1', '#music-hero .detail-eyebrow', '#music-hero .detail-deck',
      '#music-intro h2', '#music-intro .music-intro-copy', '#music-intro .music-lead figcaption', '#music-timeline-title',
      '#music-artist-finalist .music-event-meta', '#music-artist-finalist h2', '#music-artist-finalist .music-event-copy p', '#music-artist-finalist figcaption',
      '#music-student-center .music-event-meta', '#music-student-center h2', '#music-student-center p', '#music-student-center .music-watch',
      '#music-grand-ball .music-event-meta', '#music-grand-ball h2', '#music-grand-ball .music-event-copy p', '#music-grand-ball figcaption',
      '#music-tbird .music-event-meta', '#music-tbird h2', '#music-tbird p',
      '#music-jazz-fest .music-event-meta', '#music-jazz-fest h2', '#music-jazz-fest p', '#music-jazz-fest .music-watch',
      '#music-campus-concert .music-event-meta', '#music-campus-concert h2', '#music-campus-concert .music-event-copy p', '#music-campus-concert figcaption',
      '#music-welcome-gala .music-event-meta', '#music-welcome-gala h2', '#music-welcome-gala .music-event-copy p', '#music-welcome-gala figcaption',
      '#music-ni-jazz-bar .music-event-meta', '#music-ni-jazz-bar h2', '#music-ni-jazz-bar p',
      '#music-fashion-show .music-event-meta', '#music-fashion-show h2', '#music-fashion-show p',
      '#music-study h2', '#music-study-sun time', '#music-study-sun p', '#music-study-burns time', '#music-study-burns p',
      '#music-footer span', '#music-footer a',
    ],
    photography: [
      '#photography-nav .brand', '#photography-nav .links', '#photography-nav .compact-nav summary', '#photography-nav .compact-links', '#photography-nav .back-link',
      '#photography-hero h1', '#photography-hero .detail-eyebrow', '#photography-hero .detail-deck',
      '#photography-gallery h2', '#photography-gallery .photography-intro',
      ...Array.from({ length: 7 }, (_, index) => `#photography-gallery .detail-media:nth-child(${index + 1}) figcaption`),
      '#photography-footer span', '#photography-footer a',
    ],
    travel: [
      '#travel-nav .brand', '#travel-nav .links', '#travel-nav .compact-nav summary', '#travel-nav .compact-links', '#travel-nav .back-link',
      '#travel-hero h1', '#travel-hero .detail-eyebrow', '#travel-hero .detail-deck',
      '#travel-notes h2', '#travel-notes .travel-intro',
      '#travel-us h2', '#travel-us .travel-region-copy',
      '#travel-china h2', '#travel-china .travel-region-copy',
      '#travel-footer span', '#travel-footer a',
    ],
  };
  for (const [route, selectors] of Object.entries(copyRoots)) {
    for (const selector of selectors) {
      assert.ok(LANGUAGES.en.copy[selector], `${route}:en:${selector}`);
      assert.ok(LANGUAGES.zh.copy[selector], `${route}:zh:${selector}`);
    }
  }

  const attributeSelectors = [
    '#teaching-nav .lang-switch', '#teaching-nav .compact-nav summary', '#teaching-nav .compact-links',
    '#teaching-media .detail-media:nth-child(1) img', '#teaching-media .detail-media:nth-child(2) img', '#teaching-dialog', '#teaching-dialog .dialog-close',
    '#campus-nav .lang-switch', '#campus-nav .compact-nav summary', '#campus-nav .compact-links', '#campus-media img', '#campus-dialog', '#campus-dialog .dialog-close',
    '#hotel-nav .lang-switch', '#hotel-nav .compact-nav summary', '#hotel-nav .compact-links', '#hotel-media .detail-media:nth-child(1) img', '#hotel-media .detail-media:nth-child(2) img', '#hotel-dialog', '#hotel-dialog .dialog-close',
    '#visual-nav .lang-switch', '#visual-nav .compact-nav summary', '#visual-nav .compact-links',
    ...Array.from({ length: 7 }, (_, index) => `#visual-gallery .detail-media:nth-child(${index + 1}) img`),
    '#visual-dialog', '#visual-dialog .dialog-close',
    '#music-nav .lang-switch', '#music-nav .compact-nav summary', '#music-nav .compact-links',
    '#music-intro .music-lead img', '#music-artist-finalist img', '#music-grand-ball img', '#music-campus-concert img', '#music-welcome-gala img',
    '#music-dialog', '#music-dialog .dialog-close',
    '#photography-nav .lang-switch', '#photography-nav .compact-nav summary', '#photography-nav .compact-links',
    ...Array.from({ length: 7 }, (_, index) => `#photography-gallery .detail-media:nth-child(${index + 1}) img`),
    '#photography-dialog', '#photography-dialog .dialog-close',
    '#travel-nav .lang-switch', '#travel-nav .compact-nav summary', '#travel-nav .compact-links',
    '#travel-dialog', '#travel-dialog .dialog-close',
  ];
  for (const selector of attributeSelectors) {
    assert.ok(LANGUAGES.en.attributes[selector], `en:${selector}`);
    assert.ok(LANGUAGES.zh.attributes[selector], `zh:${selector}`);
  }
  assert.equal(LANGUAGES.en.attributes['#hotel-media .detail-media:nth-child(1) img'].alt, 'Wide Hotel × Jazz event composition showing the performance and instruments');
  assert.equal(LANGUAGES.zh.attributes['#hotel-media .detail-media:nth-child(1) img'].alt, '酒店 × 爵士活动全景，画面包含演出与乐器');
  assert.equal(LANGUAGES.en.attributes['#visual-dialog .dialog-close']['aria-label'], 'Close image');
  assert.equal(LANGUAGES.zh.attributes['#visual-dialog .dialog-close']['aria-label'], '关闭图片');
});

test('detail navigation labels are route-aware in both languages', () => {
  const expected = {
    en: { teaching: 'Internship navigation', campus: 'Project navigation', hotel: 'Project navigation', visual: 'Visual work navigation', music: 'Music navigation', photography: 'Photography navigation', travel: 'Travel navigation' },
    zh: { teaching: '实习导航', campus: '项目导航', hotel: '项目导航', visual: '视觉作品导航', music: '音乐导航', photography: '摄影导航', travel: '旅行导航' },
  };
  for (const [language, labels] of Object.entries(expected)) {
    for (const [page, label] of Object.entries(labels)) {
      assert.equal(LANGUAGES[language].navLabels[page], label, `${language}:${page}`);
    }
  }

  const nav = { label: '', setAttribute(name, value) { if (name === 'aria-label') this.label = value; } };
  const meta = { content: '' };
  const doc = {
    documentElement: { lang: '', dataset: { page: 'visual' } },
    title: '',
    querySelector(selector) {
      if (selector === 'meta[name="description"]') return meta;
      if (selector === '.nav, .detail-nav') return nav;
      return null;
    },
    querySelectorAll() { return []; },
  };
  applyLanguage('zh', doc, null);
  assert.equal(nav.label, '视觉作品导航');
});

test('photography captions preserve bilingual location context', () => {
  const selector = '#photography-gallery .detail-media:nth-child(6) figcaption';
  assert.equal(LANGUAGES.en.copy[selector], 'San Francisco · Boats on blue water');
  assert.equal(LANGUAGES.zh.copy[selector], '旧金山 · 蓝色水面上的船只');
});

test('applyLanguage updates every node matched by a shared copy selector', () => {
  const links = [{ innerHTML: '' }, { innerHTML: '' }];
  const doc = {
    documentElement: { lang: '', dataset: { page: 'home' } },
    title: '',
    querySelector(selector) {
      if (selector === 'meta[name="description"]') return { content: '' };
      return null;
    },
    querySelectorAll(selector) {
      if (selector === '#experience .experience-link') return links;
      return [];
    },
  };

  applyLanguage('zh', doc, null);

  assert.deepEqual(links.map((link) => link.innerHTML), [
    LANGUAGES.zh.copy['#experience .experience-link'],
    LANGUAGES.zh.copy['#experience .experience-link'],
  ]);
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
  assert.equal(LANGUAGES.en.copy['#experience .experience-proofline'], '<strong>793K</strong> views · <strong>3,548</strong> upvotes · up to <strong>91.7%</strong> U.S. audience share');
  assert.equal(LANGUAGES.zh.copy['#experience .experience-proofline'], '<strong>793K</strong> 浏览量 · <strong>3,548</strong> 点赞 · 美国受众占比最高 <strong>91.7%</strong>');
  assert.equal(LANGUAGES.en.copy['#experience .experience-link'], 'Learn more about this <span aria-hidden="true">→</span>');
  assert.equal(LANGUAGES.zh.copy['#experience .experience-link'], '进一步了解 <span aria-hidden="true">→</span>');
  assert.equal(LANGUAGES.en.copy['#nav .compact-nav summary'], 'Sections');
  assert.equal(LANGUAGES.zh.copy['#nav .compact-nav summary'], '章节');
});

test('language module declares all public page keys and the shared cache key', () => {
  assert.deepEqual(PAGE_KEYS, ['home', 'vertex', 'teaching', 'campus', 'hotel', 'visual', 'music', 'photography', 'travel']);
  assert.equal(I18N_CACHE_KEY, '20260806-title-update');
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
  const dictionarySelectors = Object.keys(LANGUAGES.en.copy);
  assert.equal(dictionarySelectors.some((selector) => /capability-row|\.visual-archive|project-context|project-contribution/.test(selector)), false);
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
  assert.equal(LANGUAGES.en.metadata.home.title, 'Mukun Sun | Website');
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

test('applyLanguage keeps available Open Graph and Twitter metadata in language parity', () => {
  const metas = new Map([
    ['meta[name="description"]', { content: '' }],
    ['meta[property="og:title"]', { content: '' }],
    ['meta[property="og:description"]', { content: '' }],
    ['meta[name="twitter:title"]', { content: '' }],
    ['meta[name="twitter:description"]', { content: '' }],
  ]);
  const doc = {
    documentElement: { lang: '', dataset: { page: 'home' } },
    title: '',
    querySelector(selector) { return metas.get(selector) ?? null; },
    querySelectorAll() { return []; },
  };

  applyLanguage('zh', doc, null);

  assert.equal(metas.get('meta[property="og:title"]').content, LANGUAGES.zh.metadata.home.title);
  assert.equal(metas.get('meta[name="twitter:title"]').content, LANGUAGES.zh.metadata.home.title);
  assert.equal(metas.get('meta[property="og:description"]').content, LANGUAGES.zh.metadata.home.description);
  assert.equal(metas.get('meta[name="twitter:description"]').content, LANGUAGES.zh.metadata.home.description);
});

test('page exposes a bilingual control and direct outside-work gateway media', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /class="lang-switch"/);
  assert.match(html, /data-lang="en"/);
  assert.match(html, /data-lang="zh"/);
  assert.match(html, /href="music\.html"/);
  assert.match(html, /href="photography\.html"/);
  assert.match(html, /href="travel\.html"/);
  assert.match(html, /src="assets\/music\/suu_jazz_fest\/performance\.webp"/);
  assert.match(html, /src="assets\/photography\/walter_disney\.webp"/);
  assert.doesNotMatch(html, /已生成图像|src="assets\/bass1\.jpg"/);
  const photographyImage = '#outside-work .outside-card:nth-child(2) img';
  assert.equal(LANGUAGES.en.attributes[photographyImage].alt, 'Curved metal architecture at Walt Disney Concert Hall');
  assert.equal(LANGUAGES.zh.attributes[photographyImage].alt, '华特·迪士尼音乐厅的金属曲面建筑');
  const travelImage = '#outside-work .outside-card:nth-child(3) img';
  assert.equal(LANGUAGES.en.attributes[travelImage].alt, 'Bryce Canyon amphitheater in warm afternoon light');
  assert.equal(LANGUAGES.zh.attributes[travelImage].alt, '午后暖光下的布莱斯峡谷露天剧场');
  assert.doesNotMatch(html, /<details class="visual-archive"/);
  assert.match(html, /src="i18n\.js\?v=20260806-title-update"/);
});
