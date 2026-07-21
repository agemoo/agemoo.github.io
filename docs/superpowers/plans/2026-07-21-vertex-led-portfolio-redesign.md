# Vertex-Led Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Mukun Sun's English-first bilingual portfolio so Vertex Marketing is the first and strongest evidence-backed case, with a clear attribution boundary and a confidentiality-safe presentation of his self-initiated community-content QA workflow.

**Architecture:** Keep the site static and dependency-free. `index.html` owns semantic page structure, `styles.css` owns the Hallmark-driven visual and responsive system, and `i18n.js` remains the single source of bilingual public copy and language behavior. Node contract tests inspect the real HTML, CSS, and dictionaries before browser QA verifies layout and interaction.

**Tech Stack:** Semantic HTML5, modern CSS, vanilla JavaScript ES modules, Node.js built-in `node:test`, GitHub Pages.

## Global Constraints

- English is the unsaved/default language; `EN / 中文` remains visible and persistent.
- Vertex Marketing is named publicly and is the first featured case.
- The sole quantitative source for Vertex is `D:/knowledge-base/wiki/findings/vertex-internship-reddit-account-portfolio.md`.
- Do not derive or supplement Vertex figures from internship diaries.
- Do not publish account names, client names, internal screenshots, internal SOPs, colleague identities, credentials, or internal links.
- Describe the drafting Skill as self-initiated and used for Mukun's own workflow; do not claim team adoption, measured time savings, automatic posting, or post-hire growth.
- Track & Traction remains an `Independent Academic Project` and `In Progress`; targets are not results.
- Preserve the public GitHub Pages URL, original artwork files, presentation crops, full-image links, and bilingual preference behavior.
- Do not introduce a framework, CMS, backend, analytics dependency, or build step.
- Validate 320, 375, 414, 768, and 1280 × 720 layouts.

---

### Task 1: Lock the Vertex Evidence and Confidentiality Contract

**Files:**
- Create: `tests/portfolio-content.test.mjs`
- Modify: `i18n.js`
- Reference only: `D:/knowledge-base/wiki/findings/vertex-internship-reddit-account-portfolio.md`
- Reference only: `D:/VertexMkt/tmp/reddit-comment-drafter-staged/references/protected-brands.md`

**Interfaces:**
- Consumes: existing `LANGUAGES` export from `i18n.js`.
- Produces: bilingual keys prefixed with `vertex.` and the tested public-copy contract used by `index.html` in Task 2.

- [ ] **Step 1: Write the failing Vertex content tests**

Create `tests/portfolio-content.test.mjs` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { LANGUAGES } from '../i18n.js';

const flattenCopy = (language) => JSON.stringify(LANGUAGES[language].copy);
const publicCopy = `${flattenCopy('en')}\n${flattenCopy('zh')}`;

test('Vertex has matching bilingual case keys', () => {
  const required = [
    'vertex.eyebrow',
    'vertex.title',
    'vertex.role',
    'vertex.scope',
    'vertex.portfolioLabel',
    'vertex.attribution',
    'vertex.metric.accounts',
    'vertex.metric.karma',
    'vertex.metric.contributions',
    'vertex.metric.views',
    'vertex.metric.upvotes',
    'vertex.metric.comments',
    'vertex.metric.peakViews',
    'vertex.metric.usAudience',
    'vertex.workflow.title',
    'vertex.workflow.description',
    'vertex.workflow.boundary',
    'vertex.learning',
  ];
  for (const key of required) {
    assert.ok(LANGUAGES.en.copy[key], `missing English ${key}`);
    assert.ok(LANGUAGES.zh.copy[key], `missing Chinese ${key}`);
  }
});

test('Vertex public figures match the approved account portfolio', () => {
  for (const expected of [
    '5', '15,433', '472', '226', '246', '16', '793K', '3,548', '482',
    '406K', '891', '90', '100%', '91.7%', '15',
  ]) {
    assert.match(publicCopy, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('Vertex copy states attribution and human-review boundaries', () => {
  assert.match(flattenCopy('en'), /historical assets/i);
  assert.match(flattenCopy('en'), /participated in operating and analyzing/i);
  assert.match(flattenCopy('en'), /human review/i);
  assert.match(flattenCopy('en'), /does not post, vote, or manage accounts/i);
  assert.match(flattenCopy('zh'), /历史资产/);
  assert.match(flattenCopy('zh'), /参与运营和分析/);
  assert.match(flattenCopy('zh'), /人工审核/);
});

test('public copy makes no unsupported Vertex claims', () => {
  assert.doesNotMatch(publicCopy, /team adopted|团队采用|saved \d+|节省\d+|automatically posts|自动发帖|created 793K|创造了?79/iu);
});

test('protected client names are absent from public copy', async () => {
  const source = await readFile('D:/VertexMkt/tmp/reddit-comment-drafter-staged/references/protected-brands.md', 'utf8');
  const rows = source.split('\n').filter((line) => line.startsWith('|') && !line.includes('---'));
  const names = rows.flatMap((line) => line.split('|').map((cell) => cell.trim()).filter(Boolean));
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const standaloneName = new RegExp(`(^|[^A-Za-z0-9])${escaped}([^A-Za-z0-9]|$)`, 'i');
    assert.doesNotMatch(publicCopy, standaloneName, `public copy exposes ${name}`);
  }
});
```

- [ ] **Step 2: Run the new test to verify RED**

Run:

```powershell
node --test tests/portfolio-content.test.mjs
```

Expected: FAIL because the `vertex.*` bilingual keys do not exist.

- [ ] **Step 3: Add the approved bilingual Vertex copy**

Add the required `vertex.*` keys to both existing `en.copy` and `zh.copy` objects in `i18n.js`. Use these exact claims and boundaries:

```js
'vertex.eyebrow': '01 / Current Internship',
'vertex.title': 'Building a more evidence-aware community operations workflow',
'vertex.role': 'Vertex Marketing · Social Media Operations Internship · 2026',
'vertex.scope': 'I participate in overseas community operations across consumer technology, smart-home, lifestyle, finance, and family-oriented communities, adapting work to subreddit rules, audience context, and visible content performance.',
'vertex.portfolioLabel': 'Representative account portfolio',
'vertex.attribution': 'Portfolio context—not solely post-hire growth. These figures describe representative historical assets from accounts I participated in operating and analyzing.',
'vertex.metric.accounts': '5 representative accounts',
'vertex.metric.karma': '15,433 cumulative Karma',
'vertex.metric.contributions': '472 historical contributions · 226 posts + 246 comments',
'vertex.metric.views': '793K cumulative views across 15 visible-view posts',
'vertex.metric.upvotes': '3,548 upvotes across 16 representative pieces',
'vertex.metric.comments': '482 comments across 16 representative pieces',
'vertex.metric.peakViews': '406K peak views · 891 peak upvotes · 90 peak comments · 100% peak upvote ratio',
'vertex.metric.usAudience': '91.7% highest observed U.S. audience share · at least 15 communities represented',
'vertex.workflow.title': 'Community-Aware Comment Drafting & QA Workflow',
'vertex.workflow.description': 'I developed a reusable editorial QA workflow for my own work: context extraction, fact inventory, community and brand-safety gates, a post-specific hook, candidate generation, factual and anti-AI rejection passes, and 25–35 word validation.',
'vertex.workflow.boundary': 'The workflow supports human review. It does not post, vote, or manage accounts, and I do not claim team adoption or measured efficiency gains.',
'vertex.learning': 'The work taught me to separate historical account assets from personally attributable outcomes—and to treat AI as a review aid, not a substitute for community judgment.',
```

Use natural Chinese equivalents that preserve every number and qualification. Do not insert brand names from the protected list.

- [ ] **Step 4: Run the content and existing i18n tests to verify GREEN**

Run:

```powershell
node --test tests/portfolio-content.test.mjs tests/i18n.test.mjs
```

Expected: PASS with zero failures.

- [ ] **Step 5: Commit the evidence contract**

```powershell
git add -- i18n.js tests/portfolio-content.test.mjs
git commit -m "test: lock vertex portfolio evidence"
```

---

### Task 2: Reorder the Portfolio Around Featured Work

**Files:**
- Create: `tests/portfolio-structure.test.mjs`
- Modify: `index.html`
- Create: `styles.css`
- Modify: `i18n.js`
- Copy: `D:/University Stuff/Job/Social Media Manager/MukunSun_Resume.pdf` to `assets/Mukun-Sun-Resume.pdf`

**Interfaces:**
- Consumes: `vertex.*` dictionary keys from Task 1 and existing `applyLanguage()` behavior.
- Produces: stable section IDs `top`, `work`, `vertex`, `track-traction`, `jazz-events`, `experiments`, `creative`, `about`, and `contact` for navigation and browser QA.

- [ ] **Step 1: Write the failing structure test**

Create `tests/portfolio-structure.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const cssPath = new URL('../styles.css', import.meta.url);

test('featured work precedes about and education', () => {
  const work = html.indexOf('id="work"');
  const vertex = html.indexOf('id="vertex"');
  const track = html.indexOf('id="track-traction"');
  const jazz = html.indexOf('id="jazz-events"');
  const about = html.indexOf('id="about"');
  assert.ok(work > -1 && vertex > work && track > vertex && jazz > track && about > jazz);
});

test('Vertex is named in the hero and owns the first featured case', () => {
  const hero = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';
  const firstCase = html.match(/<article class="project[\s\S]*?<\/article>/)?.[0] ?? '';
  assert.match(hero, /Vertex Marketing/);
  assert.match(firstCase, /id="vertex"/);
});

test('the page uses an external portfolio stylesheet', async () => {
  assert.match(html, /<link rel="stylesheet" href="styles\.css">/);
  const css = await readFile(cssPath, 'utf8');
  assert.match(css, /\.portfolio-shell/);
});

test('the published résumé target exists', async () => {
  const resume = await readFile(new URL('../assets/Mukun-Sun-Resume.pdf', import.meta.url));
  assert.ok(resume.length > 10_000);
  assert.match(html, /href="assets\/Mukun-Sun-Resume\.pdf"/);
});

test('audited structural fingerprints are absent', async () => {
  const css = await readFile(cssPath, 'utf8');
  assert.doesNotMatch(html, /class="marquee"|class="metrics-grid"|class="pillars"|Team leAd/);
  assert.doesNotMatch(html, /style="[^"]*!important/);
  assert.doesNotMatch(css, /100svh|box-shadow:[^;]*(ember|amber)|overflow-x:\s*hidden/);
  assert.doesNotMatch(html, /C:\/Windows\/Fonts/);
});
```

- [ ] **Step 2: Run the structure test to verify RED**

Run:

```powershell
node --test tests/portfolio-structure.test.mjs
```

Expected: FAIL because `work` follows education, the first case is not Vertex, and `styles.css` does not exist.

- [ ] **Step 3: Replace the top-level document structure**

First copy the existing English social-media résumé into the public asset
directory without changing its contents:

```powershell
Copy-Item -LiteralPath 'D:\University Stuff\Job\Social Media Manager\MukunSun_Resume.pdf' -Destination 'assets\Mukun-Sun-Resume.pdf'
```

Rebuild `index.html` around this exact hierarchy, retaining existing artwork anchors inside `#creative`:

```html
<body>
  <a class="skip-link" href="#work">Skip to selected work</a>
  <nav class="site-nav" aria-label="Primary navigation">
    <a class="wordmark" href="#top">Mukun Sun</a>
    <div class="nav-links" id="nav-links">
      <a href="#work" data-i18n="nav.work">Work</a>
      <a href="#about" data-i18n="nav.about">About</a>
      <a href="assets/Mukun-Sun-Resume.pdf" data-i18n="nav.resume">Résumé</a>
      <a href="#contact" data-i18n="nav.contact">Contact</a>
    </div>
    <div class="lang-switch" role="group" aria-label="Language">
      <button type="button" class="active" data-lang="en" aria-pressed="true">EN</button>
      <button type="button" data-lang="zh" aria-pressed="false">中文</button>
    </div>
  </nav>

  <header class="portfolio-shell hero" id="top">
    <div class="identity-rail">
      <p class="current-role" data-i18n="hero.currentRole"></p>
      <p class="location-line" data-i18n="hero.education"></p>
    </div>
    <div class="hero-copy">
      <p class="project-index">Mukun Sun / 孙慕坤</p>
      <h1 data-i18n="hero.title"></h1>
      <p class="hero-deck" data-i18n="hero.deck"></p>
      <div class="hero-actions">
        <a class="button button-primary" href="#vertex" data-i18n="hero.viewVertex"></a>
        <a class="button button-secondary" href="assets/Mukun-Sun-Resume.pdf" data-i18n="hero.resume"></a>
      </div>
    </div>
  </header>

  <main>
    <section class="portfolio-shell work-index" id="work" aria-labelledby="work-title">
      <header class="section-heading">
        <p class="project-index">01–03</p>
        <h2 id="work-title" data-i18n="work.title"></h2>
      </header>
      <article class="project project-vertex" id="vertex"></article>
      <article class="project project-track" id="track-traction"></article>
      <article class="project project-jazz" id="jazz-events"></article>
    </section>
    <section class="portfolio-shell experiments" id="experiments"></section>
    <section class="portfolio-shell creative-archive" id="creative"></section>
    <section class="portfolio-shell about" id="about"></section>
  </main>

  <footer class="portfolio-shell contact" id="contact"></footer>
  <script type="module" src="i18n.js"></script>
</body>
```

The copied résumé is the current public download target for this redesign. Its
content is not rewritten in this task; any later résumé-content update requires
its own evidence review.

- [ ] **Step 4: Build the Hallmark visual system in `styles.css`**

Create deployable tokens and the split-studio layout:

```css
:root {
  --bg: oklch(0.155 0.006 60);
  --surface: oklch(0.205 0.009 56);
  --ink: oklch(0.94 0.013 78);
  --ink-soft: oklch(0.79 0.014 74);
  --muted: oklch(0.62 0.013 66);
  --accent: oklch(0.76 0.13 60);
  --line: color-mix(in oklab, var(--ink) 14%, transparent);
  --serif: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', Georgia, serif;
  --sans: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  --mono: 'Fragment Mono', 'SFMono-Regular', Menlo, monospace;
  --content: 78rem;
  --gutter: clamp(1.25rem, 4vw, 4.5rem);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; overflow-x: clip; }
body { margin: 0; overflow-x: clip; background: var(--bg); color: var(--ink-soft); font-family: var(--sans); }
.portfolio-shell { width: min(100%, var(--content)); margin-inline: auto; padding-inline: var(--gutter); }
.hero { min-height: 70vh; display: grid; grid-template-columns: minmax(12rem, .6fr) minmax(0, 1.4fr); gap: clamp(2rem, 7vw, 7rem); align-items: end; padding-block: clamp(8rem, 14vh, 11rem) clamp(4rem, 8vh, 7rem); }
.work-index { padding-block: clamp(5rem, 10vw, 9rem); }
.project { display: grid; grid-template-columns: minmax(0, .72fr) minmax(0, 1.28fr); gap: clamp(2rem, 6vw, 6rem); padding-block: clamp(4rem, 9vw, 8rem); border-top: 1px solid var(--line); }
.project-vertex { grid-template-columns: minmax(0, .58fr) minmax(0, 1.42fr); }
.project-meta { font-family: var(--mono); font-size: .75rem; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); }
.evidence-note { border-block: 1px solid var(--line); padding-block: 1.2rem; color: var(--ink); }
.metric-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 1px solid var(--line); }
.metric-list > div { padding: 1.25rem 0; border-bottom: 1px solid var(--line); }
.metric-list > div:nth-child(odd) { padding-right: 1.5rem; }
.workflow { display: grid; gap: .75rem; margin-top: 2rem; }
.workflow-step { display: grid; grid-template-columns: 3rem minmax(0, 1fr); gap: 1rem; padding-block: 1rem; border-top: 1px solid var(--line); }
.art-caption { display: grid; gap: .2rem; margin-top: .8rem; color: var(--ink); }
@media (max-width: 768px) {
  .hero, .project { grid-template-columns: minmax(0, 1fr); }
  .hero { min-height: auto; padding-top: 8rem; }
  .metric-list { grid-template-columns: minmax(0, 1fr); }
  .nav-links { display: flex; max-width: 100%; overflow-x: auto; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

Extend this system for the existing gallery crops without restoring glow,
card-in-card styling, equal three-column feature grids, or universal reveal
animations.

- [ ] **Step 5: Add the new non-Vertex bilingual navigation, hero, and section keys**

Add matching English and Chinese values in `i18n.js` for:

```text
nav.work
nav.about
nav.resume
nav.contact
hero.currentRole
hero.education
hero.title
hero.deck
hero.viewVertex
hero.resume
work.title
experiments.title
creative.title
about.title
contact.title
```

English `hero.title` must be `Social media operations shaped by community context, evidence, and better workflows.` Chinese must convey the same positioning naturally.

- [ ] **Step 6: Run the structure and language tests to verify GREEN**

Run:

```powershell
node --test tests/portfolio-structure.test.mjs tests/portfolio-content.test.mjs tests/i18n.test.mjs
```

Expected: PASS with zero failures.

- [ ] **Step 7: Commit the new portfolio architecture**

```powershell
git add -- index.html styles.css i18n.js assets/Mukun-Sun-Resume.pdf tests/portfolio-structure.test.mjs
git commit -m "feat: lead portfolio with vertex work"
```

---

### Task 3: Build the Complete Vertex Case and Workflow Evidence

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `i18n.js`
- Modify: `tests/portfolio-content.test.mjs`

**Interfaces:**
- Consumes: the `#vertex` project article and `vertex.*` keys from Tasks 1–2.
- Produces: stable `.evidence-note`, `.metric-list`, `.evidence-key`, `.workflow`, and `.workflow-step` components.

- [ ] **Step 1: Extend the failing test for the rendered Vertex case**

Append:

```js
test('the Vertex article renders evidence labels and workflow stages', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const vertex = html.match(/<article[^>]+id="vertex"[\s\S]*?<\/article>/)?.[0] ?? '';
  assert.match(vertex, /data-evidence="historical"/);
  assert.match(vertex, /data-evidence="my-role"/);
  assert.match(vertex, /class="evidence-note"/);
  assert.equal((vertex.match(/class="workflow-step"/g) ?? []).length, 8);
  assert.match(vertex, /human-review/);
});
```

- [ ] **Step 2: Run the focused test to verify RED**

Run:

```powershell
node --test --test-name-pattern="Vertex article" tests/portfolio-content.test.mjs
```

Expected: FAIL because `#vertex` is not yet populated with the complete evidence structure.

- [ ] **Step 3: Populate the Vertex article**

Use semantic HTML with a visible attribution note, eight workflow steps, and no internal screenshots:

```html
<article class="project project-vertex" id="vertex">
  <header class="project-summary">
    <p class="project-meta" data-i18n="vertex.eyebrow"></p>
    <h3 data-i18n="vertex.title"></h3>
    <p data-i18n="vertex.role"></p>
    <p data-i18n="vertex.scope"></p>
    <dl class="evidence-key">
      <div data-evidence="historical"><dt>Evidence</dt><dd data-i18n="evidence.historical"></dd></div>
      <div data-evidence="my-role"><dt>Role</dt><dd data-i18n="evidence.myRole"></dd></div>
    </dl>
  </header>
  <div class="project-proof">
    <p class="evidence-note" data-i18n="vertex.attribution"></p>
    <div class="metric-list" aria-label="Representative account portfolio">
      <div><strong>5</strong><span data-i18n="vertex.metric.accounts"></span></div>
      <div><strong>15,433</strong><span data-i18n="vertex.metric.karma"></span></div>
      <div><strong>472</strong><span data-i18n="vertex.metric.contributions"></span></div>
      <div><strong>793K</strong><span data-i18n="vertex.metric.views"></span></div>
      <div><strong>3,548</strong><span data-i18n="vertex.metric.upvotes"></span></div>
      <div><strong>482</strong><span data-i18n="vertex.metric.comments"></span></div>
      <div><strong>406K</strong><span data-i18n="vertex.metric.peakViews"></span></div>
      <div><strong>91.7%</strong><span data-i18n="vertex.metric.usAudience"></span></div>
    </div>
    <section class="workflow-case" aria-labelledby="workflow-title">
      <h4 id="workflow-title" data-i18n="vertex.workflow.title"></h4>
      <p data-i18n="vertex.workflow.description"></p>
      <div class="workflow">
        <div class="workflow-step"><span>01</span><p data-i18n="workflow.context"></p></div>
        <div class="workflow-step"><span>02</span><p data-i18n="workflow.facts"></p></div>
        <div class="workflow-step"><span>03</span><p data-i18n="workflow.safety"></p></div>
        <div class="workflow-step"><span>04</span><p data-i18n="workflow.hook"></p></div>
        <div class="workflow-step"><span>05</span><p data-i18n="workflow.candidates"></p></div>
        <div class="workflow-step"><span>06</span><p data-i18n="workflow.rejection"></p></div>
        <div class="workflow-step"><span>07</span><p data-i18n="workflow.count"></p></div>
        <div class="workflow-step human-review"><span>08</span><p data-i18n="workflow.review"></p></div>
      </div>
      <p class="workflow-boundary" data-i18n="vertex.workflow.boundary"></p>
    </section>
    <p class="project-learning" data-i18n="vertex.learning"></p>
  </div>
</article>
```

Add matching bilingual `evidence.*` and `workflow.*` keys. Keep `dt` terms bilingual through their own `data-i18n` keys if the visible English words remain in the HTML.

- [ ] **Step 4: Verify the Vertex contract is GREEN**

Run:

```powershell
node --test tests/portfolio-content.test.mjs tests/i18n.test.mjs
```

Expected: PASS with zero failures.

- [ ] **Step 5: Commit the complete Vertex case**

```powershell
git add -- index.html styles.css i18n.js tests/portfolio-content.test.mjs
git commit -m "feat: add vertex evidence case study"
```

---

### Task 4: Reframe Track & Traction, Jazz Work, Experiments, and Creative Archive

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `i18n.js`
- Create: `tests/project-integrity.test.mjs`

**Interfaces:**
- Consumes: stable project layout from Task 2 and existing artwork URLs/crop classes.
- Produces: complete second and third featured cases, experiment index, and always-captioned creative archive.

- [ ] **Step 1: Write the failing project-integrity tests**

Create:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { LANGUAGES } from '../i18n.js';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const copy = JSON.stringify(LANGUAGES);

test('Track & Traction is labeled as academic and in progress', () => {
  assert.match(copy, /Independent Academic Project/);
  assert.match(copy, /In Progress/);
  assert.match(copy, /独立课程项目/);
  assert.match(copy, /进行中/);
  assert.doesNotMatch(copy, /achieved 150|reached 50 followers|获得150名|达到50名粉丝/i);
});

test('featured cases use distinct project identities', () => {
  assert.match(html, /id="track-traction"/);
  assert.match(html, /id="jazz-events"/);
  assert.match(html, /id="experiments"/);
});

test('creative works retain full links and always-visible captions', () => {
  for (const asset of ['hotone_main.jpg', 'jazz_coast_a.jpg', 'piano_a.jpg', 'trifold_out.jpg', 'banner_museum.jpg', 'bass1.jpg']) {
    assert.match(html, new RegExp(`href="build/assets/${asset}"[\\s\\S]{0,500}class="art-caption"`));
  }
  assert.doesNotMatch(html, /class="label"/);
});
```

- [ ] **Step 2: Run the integrity test to verify RED**

Run:

```powershell
node --test tests/project-integrity.test.mjs
```

Expected: FAIL because the new project labels, experiment index, and always-visible captions are incomplete.

- [ ] **Step 3: Populate the second and third featured cases**

Track & Traction must show these exact evidence categories:

```html
<article class="project project-track" id="track-traction">
  <header class="project-summary">
    <p class="project-meta">02 / Independent Academic Project / In Progress</p>
    <h3 data-i18n="track.title"></h3>
    <p data-i18n="track.positioning"></p>
  </header>
  <div class="project-proof">
    <ul class="deliverable-list">
      <li data-i18n="track.audience"></li>
      <li data-i18n="track.ux"></li>
      <li data-i18n="track.seo"></li>
      <li data-i18n="track.system"></li>
      <li data-i18n="track.measurement"></li>
    </ul>
    <p class="evidence-note" data-i18n="track.boundary"></p>
  </div>
</article>
```

Jazz & Event Marketing must state verified role, scope, artifacts, and metrics without unsupported engagement-growth claims. Reuse the corrected 19,000 impressions, 525+ reads, 122 likes, and 90 shares only where their existing source project and role remain clear.

- [ ] **Step 4: Build the experiment index and compact creative archive**

Use text-led rows for the internship dashboard, WeeklyRecipe, and B2B SaaS radar. Label the radar `Product Concept / In Development`. Move the existing strongest artwork anchors into `#creative`, keep their crop classes and full-image `href`, and place this visible caption after each image:

```html
<span class="art-caption">
  <strong data-i18n="creative.hotoneMain.title"></strong>
  <span data-i18n="creative.hotoneMain.meta"></span>
</span>
```

Show six to eight works by default. If additional works remain in the DOM, use an accessible disclosure button with `aria-expanded`; do not make hover the disclosure mechanism.

- [ ] **Step 5: Add complete matching bilingual keys**

Add `track.*`, `jazz.*`, `experiments.*`, and `creative.*` keys in both dictionaries. Keep exactly equal key sets and natural Chinese/English copy.

- [ ] **Step 6: Run all project and i18n tests to verify GREEN**

Run:

```powershell
node --test tests/project-integrity.test.mjs tests/portfolio-content.test.mjs tests/portfolio-structure.test.mjs tests/i18n.test.mjs
```

Expected: PASS with zero failures.

- [ ] **Step 7: Commit the remaining project narrative**

```powershell
git add -- index.html styles.css i18n.js tests/project-integrity.test.mjs
git commit -m "feat: complete evidence-led project archive"
```

---

### Task 5: Complete Navigation, Responsive, and Motion Behavior

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `i18n.js`
- Create: `tests/accessibility-contract.test.mjs`

**Interfaces:**
- Consumes: stable section IDs and content from Tasks 2–4.
- Produces: keyboard-visible navigation, optional archive disclosure behavior, reduced-motion behavior, and responsive CSS contracts.

- [ ] **Step 1: Write the failing accessibility and responsive contract tests**

Create:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

test('navigation remains useful without desktop-only links', () => {
  assert.match(html, /href="#work"/);
  assert.match(html, /href="#about"/);
  assert.match(html, /href="#contact"/);
  assert.match(html, /class="lang-switch"/);
  assert.doesNotMatch(css, /@media[^}]+\.nav-links\s*\{[^}]*display:\s*none/s);
});

test('responsive and reduced-motion safety contracts are present', () => {
  assert.match(css, /overflow-x:\s*clip/);
  assert.match(css, /@media \(max-width:\s*768px\)/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.doesNotMatch(css, /animation:\s*grain|animation:\s*scroll|box-shadow:[^;]*(amber|accent)/);
});

test('semantic and keyboard basics are present', () => {
  assert.match(html, /class="skip-link"/);
  assert.match(css, /:focus-visible/);
  assert.match(html, /<main>/);
  assert.match(html, /aria-label="Language"/);
});
```

- [ ] **Step 2: Run the accessibility test to verify RED**

Run:

```powershell
node --test tests/accessibility-contract.test.mjs
```

Expected: FAIL on any missing navigation, focus, responsive, or reduced-motion contract.

- [ ] **Step 3: Implement the minimal responsive and interaction behavior**

Keep essential mobile navigation visible in a horizontally scrollable, labelled row. Add a visible focus treatment:

```css
:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
.skip-link { position: fixed; left: 1rem; top: 1rem; z-index: 1000; transform: translateY(-200%); }
.skip-link:focus { transform: translateY(0); }
.nav-links { display: flex; gap: clamp(.8rem, 2vw, 1.6rem); white-space: nowrap; }
@media (max-width: 768px) {
  .site-nav { align-items: flex-start; flex-wrap: wrap; }
  .nav-links { order: 3; width: 100%; padding-bottom: .25rem; overflow-x: auto; }
}
```

If the Creative Archive uses an expansion button, implement it with a real button, `aria-expanded`, a `.is-expanded` container state, and dictionary-owned labels. The default experience must still show six to eight complete works with captions.

- [ ] **Step 4: Run the complete automated suite to verify GREEN**

Run:

```powershell
node --test tests/*.test.mjs
```

Expected: PASS with zero failures and no warnings from the tests.

- [ ] **Step 5: Commit responsive and accessibility behavior**

```powershell
git add -- index.html styles.css i18n.js tests/accessibility-contract.test.mjs
git commit -m "fix: complete responsive portfolio navigation"
```

---

### Task 6: Align Product Documentation and Perform Browser QA

**Files:**
- Modify: `PRODUCT.md`
- Modify: `DESIGN.md`
- Modify if browser QA finds a tested defect: `index.html`
- Modify if browser QA finds a tested defect: `styles.css`
- Modify if browser QA finds a tested defect: `i18n.js`
- Modify if needed: `tests/*.test.mjs`

**Interfaces:**
- Consumes: completed static site and automated suite.
- Produces: documentation matching production and browser-verified desktop/mobile behavior.

- [ ] **Step 1: Update product and design documentation**

Rewrite `PRODUCT.md` to define the two recruiter audiences, Vertex-led evidence purpose, English-first language strategy, honest evidence labels, and confidentiality rules. Rewrite `DESIGN.md` to specify the split-studio structure, reduced motion system, always-visible captions, deployable fonts, and warm-charcoal/amber palette without glow.

- [ ] **Step 2: Run documentation and code consistency scans**

Run:

```powershell
rg -n "中文为主|100svh|marquee|metrics-grid|pillars|Team leAd|C:/Windows/Fonts|overflow-x:hidden|team adopted|团队采用" PRODUCT.md DESIGN.md index.html styles.css i18n.js
```

Expected: no matches except explanatory negative rules in Markdown; no banned implementation strings in HTML, CSS, or JavaScript.

- [ ] **Step 3: Run fresh automated verification**

Run:

```powershell
node --test tests/*.test.mjs
git diff --check
```

Expected: all tests pass, zero failures, and `git diff --check` exits 0.

- [ ] **Step 4: Serve and inspect the real site**

Run:

```powershell
python -m http.server 8765
```

Use the in-app browser at `http://127.0.0.1:8765/`. Verify English and Chinese at 1280 × 720, then 320, 375, 414, and 768 pixel widths. At each width confirm:

- Vertex appears as the first case without excessive scrolling;
- no horizontal page scroll;
- Work, About, Résumé or its verified replacement, Contact, and language controls are reachable;
- all project headings, metrics, attribution notes, workflow stages, and creative captions remain visible;
- artwork crops remain intentional and full-image links still open originals;
- reduced motion removes non-essential motion;
- the browser console contains no errors.

- [ ] **Step 5: Handle any browser defect with a regression test**

For each observed defect, add the smallest failing Node contract test that captures the source-level cause, run it to verify RED, implement the fix, and rerun the focused test plus `node --test tests/*.test.mjs` to verify GREEN. Do not make an untested browser-discovered fix.

- [ ] **Step 6: Commit documentation and verified QA fixes**

```powershell
git add -- PRODUCT.md DESIGN.md index.html styles.css i18n.js tests
git commit -m "docs: align portfolio system and verification"
```

- [ ] **Step 7: Final verification before any completion claim**

Run:

```powershell
node --test tests/*.test.mjs
git diff --check
git status --short
git log -6 --oneline
```

Expected: all tests pass, `git diff --check` exits 0, the working tree is clean, and the planned commits are visible. Do not push until the user explicitly requests publication or confirms that the updated site should go live.
