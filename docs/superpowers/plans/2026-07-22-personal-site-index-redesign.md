# English-First Personal Site Index Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing dark-gallery homepage into an English-first personal index for U.S. schools and employers, with compact project discovery and an evidence-scoped Vertex Marketing detail page.

**Architecture:** Keep the dependency-free static site and selector-based bilingual module. `index.html` becomes an Index-First homepage; `projects/vertex-reddit.html` reuses the same tokens and language module for deeper evidence. `tokens.css` owns shared visual tokens, while page-specific structure remains inline to avoid a framework migration.

**Tech Stack:** HTML5, CSS custom properties, vanilla JavaScript ES modules, Node.js built-in test runner, GitHub Pages.

## Global Constraints

- English initializes on every new visit and every refresh; Chinese is an in-page secondary view.
- Primary audience: U.S. employers, campus hiring teams, faculty, and graduate-school reviewers.
- Preserve the existing warm-black gallery palette, Noto Serif SC / Noto Sans SC / Fragment Mono pairing, and meaningful motion.
- Remove the giant `营` background character and do not replace it with another decorative glyph.
- Use only the Vertex figures in `D:/knowledge-base/wiki/findings/vertex-internship-reddit-account-portfolio.md`.
- Describe Vertex figures as representative account assets and content Mukun participated in operating, not wholly net-new personal results.
- Keep experience, projects, education, campus/music, visual work, and contact as distinct homepage sections.
- Do not delete article pages, production routes, or original artwork.
- Do not stage or commit the untracked `.superpowers/` visual-companion directory.
- Hallmark system: Index-First macrostructure, locked dark-gallery theme, N10 scroll-morph navigation, Ft5 statement footer, typography-only hero enrichment.

---

### Task 1: Lock the Design Contract and Shared Tokens

**Files:**
- Modify: `DESIGN.md`
- Create: `tokens.css`
- Create: `.hallmark/preflight.json`
- Create: `.hallmark/log.json`
- Create: `tests/design-contract.test.mjs`

**Interfaces:**
- Consumes: the existing `--bg`, `--ink`, `--ember`, `--amber`, serif, sans, mono, easing, and width values from `index.html`.
- Produces: canonical CSS tokens imported by both HTML pages and a documented English-first Index-First design contract.

- [ ] **Step 1: Write the failing design-contract test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('the site uses the locked Index-First design system', async () => {
  const [design, tokens, homepage] = await Promise.all([
    readFile(new URL('../DESIGN.md', import.meta.url), 'utf8'),
    readFile(new URL('../tokens.css', import.meta.url), 'utf8'),
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
  ]);
  assert.match(design, /English-first/);
  assert.match(design, /Index-First/);
  assert.match(tokens, /--color-paper:\s*oklch\(0\.152 0\.006 60\)/);
  assert.match(tokens, /--font-display:/);
  assert.match(homepage, /href="tokens\.css"/);
});
```

- [ ] **Step 2: Run the test and verify the missing token file causes failure**

Run: `node --test tests/design-contract.test.mjs`

Expected: FAIL with `ENOENT` for `tokens.css`.

- [ ] **Step 3: Create the shared token file**

Start `tokens.css` with the required stamp and token aliases:

```css
/* Hallmark · macrostructure: Index-First · genre: atmospheric · theme: dark gallery
 * nav: N10 scroll-morph · footer: Ft5 statement · enrichment: none
 * critique: P5 H5 E4 S5 R5 V4
 */
:root {
  --color-paper: oklch(0.152 0.006 60);
  --color-paper-raised: oklch(0.185 0.008 58);
  --color-surface: oklch(0.205 0.009 56);
  --color-ink: oklch(0.94 0.013 78);
  --color-ink-soft: oklch(0.815 0.014 74);
  --color-muted: oklch(0.64 0.013 66);
  --color-faint: oklch(0.47 0.011 60);
  --color-accent: oklch(0.66 0.155 47);
  --color-accent-bright: oklch(0.815 0.115 72);
  --color-focus: oklch(0.815 0.115 72);
  --color-rule: oklch(0.94 0.013 78 / 0.12);
  --font-display: 'GSerifSC', 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif;
  --font-body: 'GSansSC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --font-mono: 'Fragment Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
  --space-3xs: 0.25rem;
  --space-2xs: 0.5rem;
  --space-xs: 0.75rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4.5rem;
  --space-3xl: 7rem;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-md: 1.125rem;
  --text-lg: 1.375rem;
  --text-xl: 1.75rem;
  --text-display: clamp(3.25rem, 9vw, 8.5rem);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-short: 180ms;
  --dur-medium: 420ms;
  --rule-thin: 1px;
  --radius-card: 2px;
  --radius-pill: 999px;
}
```

Import it immediately after the Google Fonts link in `index.html` with `<link rel="stylesheet" href="tokens.css">`, then map the legacy custom properties to the canonical tokens so the existing CSS remains stable during the redesign.

- [ ] **Step 4: Amend `DESIGN.md` and create Hallmark metadata**

Record English-first priority, Index-First homepage architecture, distinct section ownership, natural artwork ratios, N10 navigation, and Ft5 footer. Create `.hallmark/preflight.json` with the vanilla stack, existing fonts, OKLCH palette, and native-motion findings. Create `.hallmark/log.json` with one entry dated `2026-07-22`, macrostructure `Index-First`, theme `dark gallery`, enrichment `none`, and brief `English-first personal site index`.

- [ ] **Step 5: Run the contract test**

Run: `node --test tests/design-contract.test.mjs`

Expected: PASS, 1 test and 0 failures.

- [ ] **Step 6: Commit the design contract**

```bash
git add DESIGN.md tokens.css .hallmark/preflight.json .hallmark/log.json tests/design-contract.test.mjs index.html
git commit -m "refactor: lock personal site design system"
```

### Task 2: Replace the Hero, About Copy, and Sharing Metadata

**Files:**
- Modify: `index.html`
- Modify: `i18n.js`
- Modify: `tests/i18n.test.mjs`
- Create: `assets/favicon.svg`
- Create: `tests/homepage-content.test.mjs`

**Interfaces:**
- Consumes: shared tokens from Task 1 and the existing `applyLanguage()` selector dictionary.
- Produces: English-first hero/about copy, clean hero background, favicon, and social-sharing metadata.

- [ ] **Step 1: Write failing homepage-content tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('hero leads with the U.S.-audience value proposition', async () => {
  const [html, i18n] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../i18n.js', import.meta.url), 'utf8'),
  ]);
  assert.match(i18n, /I make social content feel native to the community it enters\./);
  assert.match(i18n, /for U\.S\. audiences/);
  assert.doesNotMatch(html, /class="ghost"/);
  assert.doesNotMatch(i18n, /\.hero \.ghost/);
});

test('homepage exposes complete sharing metadata', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /rel="icon" href="assets\/favicon\.svg"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /property="og:description"/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
});
```

- [ ] **Step 2: Run the new tests and verify they fail**

Run: `node --test tests/homepage-content.test.mjs`

Expected: FAIL because the old Portfolio hero, ghost element, and missing metadata are still present.

- [ ] **Step 3: Replace the hero and about content**

Use this canonical English copy in `i18n.js`:

```js
'.hero .role': 'I make social content feel native to the community it enters.',
'.hero .roleen': 'Bilingual social media marketer with hands-on experience in community strategy, content production, and visual communication for U.S. audiences.',
'#about .lede': 'I work on social content where audience context matters: learning how a community speaks, choosing the right format, and carrying the idea through copy, design, video, or reporting. My recent work includes Reddit community operations at Vertex Marketing and campus-facing content at Southern Utah University. I study Strategic Communication at SUU with a minor in Business Analytics.',
```

Use this Chinese counterpart:

```js
'.hero .role': '让内容真正融入它所面对的社区。',
'.hero .roleen': '具备美国受众内容、社区策略与视觉传播实践的双语社交媒体营销人。',
'#about .lede': '我关注内容与社区语境之间的关系：理解社群如何交流，选择合适的形式，再把想法落实为文案、设计、视频或数据报告。近期实践包括 Vertex Marketing 的 Reddit 社区运营，以及 Southern Utah University 的校园内容工作；目前主修战略传播，辅修商业分析。',
```

Remove the `.ghost` element, its translation selectors, and its CSS. Delete hero inline font-size overrides and express the size through `.hero .role` using `clamp()` and `var(--text-xl)` boundaries.

- [ ] **Step 4: Add metadata and the favicon asset**

Add canonical URL, Open Graph title/description/type/url/image, Twitter card/title/description/image, and favicon markup. Build `assets/favicon.svg` from a simple warm-black square, amber hairline, and roman `M`; do not use the removed Chinese glyph.

- [ ] **Step 5: Run the focused and existing tests**

Run: `node --test tests/homepage-content.test.mjs tests/i18n.test.mjs`

Expected: PASS, all tests and 0 failures.

- [ ] **Step 6: Commit hero and metadata changes**

```bash
git add index.html i18n.js assets/favicon.svg tests/homepage-content.test.mjs tests/i18n.test.mjs
git commit -m "feat: lead with English social media positioning"
```

### Task 3: Add the Compact Vertex Experience and Evidence Page

**Files:**
- Modify: `index.html`
- Modify: `i18n.js`
- Create: `projects/vertex-reddit.html`
- Create: `tests/vertex-evidence.test.mjs`

**Interfaces:**
- Consumes: `tokens.css`, the shared `i18n.js` language boot logic, and the approved Vertex evidence source.
- Produces: homepage `#experience` summary and `/projects/vertex-reddit.html` evidence page.

- [ ] **Step 1: Write the failing Vertex evidence test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Vertex evidence uses the approved representative-account scope', async () => {
  const [home, detail, i18n] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8'),
    readFile(new URL('../i18n.js', import.meta.url), 'utf8'),
  ]);
  const copy = `${home}\n${detail}\n${i18n}`;
  for (const value of ['793K', '3,548', '482', '406K', '891', '90', '91.7%']) {
    assert.match(copy, new RegExp(value.replace('.', '\\.')));
  }
  assert.match(copy, /representative/i);
  assert.match(copy, /participated in operating/i);
  assert.doesNotMatch(copy, /personally generated all|owned all results/i);
});

test('Vertex appears as experience rather than a repeated project', async () => {
  const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(home, /id="experience"/);
  assert.equal((home.match(/Vertex Marketing/g) ?? []).length, 1);
  assert.match(home, /href="projects\/vertex-reddit\.html"/);
});
```

- [ ] **Step 2: Run the test and verify the missing route causes failure**

Run: `node --test tests/vertex-evidence.test.mjs`

Expected: FAIL with `ENOENT` for `projects/vertex-reddit.html`.

- [ ] **Step 3: Add the homepage experience row**

Replace the global metric strip with one compact `<section id="experience">`. Include company, role `Reddit Community Operations Intern`, dates already verified in the repository, one responsibility paragraph, three proof values (`5 representative accounts`, `793K representative views`, `91.7% highest U.S. audience share`), the attribution note, and a `View internship evidence` link.

The Chinese copy must use `参与运营`, `代表账号`, and `代表内容`; it must not use `独立运营全部账号`.

- [ ] **Step 4: Create the Vertex detail page**

Build an English-first static page with these exact sections:

```html
<main>
  <header id="vertex-hero"></header>
  <section id="vertex-scope" aria-labelledby="vertex-scope-title"></section>
  <section id="vertex-evidence" aria-labelledby="vertex-evidence-title"></section>
  <section id="vertex-community" aria-labelledby="vertex-community-title"></section>
  <section id="vertex-attribution" aria-labelledby="vertex-attribution-title"></section>
</main>
```

The evidence table contains: 5 accounts; 15,433 cumulative Karma; 472 contributions; 793K views across 15 view-visible representative posts; 3,548 upvotes and 482 comments across 16 representative posts; 406K / 891 / 90 / 100% single-post peak; 91.7% highest U.S. audience share; at least 15 communities. The attribution section explicitly separates historical account assets from net-new internship outcomes and states that the page does not claim sole ownership of the aggregate performance.

Reuse `tokens.css` with `../tokens.css` and `i18n.js` with `../i18n.js?v=20260722-index-redesign`.

- [ ] **Step 5: Add equal English and Chinese detail-page selectors**

Add selector keys for `#vertex-hero`, `#vertex-scope`, `#vertex-evidence`, `#vertex-community`, and `#vertex-attribution` to both dictionaries. Missing elements on the homepage remain harmless because `applyLanguage()` already checks each selector before writing.

- [ ] **Step 6: Run Vertex and bilingual tests**

Run: `node --test tests/vertex-evidence.test.mjs tests/i18n.test.mjs`

Expected: PASS with 0 failures.

- [ ] **Step 7: Commit the experience and evidence page**

```bash
git add index.html i18n.js projects/vertex-reddit.html tests/vertex-evidence.test.mjs tests/i18n.test.mjs
git commit -m "feat: add scoped Vertex internship evidence"
```

### Task 4: Convert Full Cases into a Compact Personal Index

**Files:**
- Modify: `index.html`
- Modify: `i18n.js`
- Create: `tests/portfolio-structure.test.mjs`

**Interfaces:**
- Consumes: homepage sections from Tasks 2–3 and the existing education, campaign, hotel-jazz, and artwork content.
- Produces: distinct compact sections for projects, education, campus/music, visual work, and contact.

- [ ] **Step 1: Write the failing structure test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('homepage separates personal-site content into compact sections', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  for (const id of ['about', 'experience', 'projects', 'edu', 'campus-music', 'visual-work', 'contact']) {
    assert.match(html, new RegExp(`<section[^>]+id="${id}"`));
  }
  assert.equal((html.match(/class="project-row"/g) ?? []).length, 2);
  assert.equal((html.match(/class="case"/g) ?? []).length, 0);
  assert.doesNotMatch(html, /Selected Impact|19,000|8,000\+|Team leAd/);
});

test('artwork previews keep natural proportions', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /\.visual-preview img\s*\{[^}]*height:\s*auto/s);
  assert.doesNotMatch(html, /\.visual-preview img\s*\{[^}]*object-fit:\s*cover/s);
});
```

- [ ] **Step 2: Run the test and verify the old long-form cases fail it**

Run: `node --test tests/portfolio-structure.test.mjs`

Expected: FAIL because `#projects`, `#campus-music`, and `#visual-work` do not exist and `.case` blocks remain.

- [ ] **Step 3: Build the compact project index**

Use two `.project-row` disclosures:

1. `Campus Integrated Campaign` — promotion coordination for campus welcome and New Year events; role `Promotion Team Lead`; year `2024–2025`.
2. `Hotel × Jazz Brand Event` — event concept, partner coordination, WeChat promotion, and visual identity; role `Campaign & Visual Communication`; year `2024`.

Each closed row shows title, one sentence, role/year, and `View summary`. The open state reveals no more than one context paragraph, one contribution paragraph, and one restrained evidence line. Keep 19,000 impressions, 8,000 reach, and 525 reads inside their matching disclosure only; do not display them as global prestige metrics.

- [ ] **Step 4: Simplify education and add campus/music**

Keep SUU and Wuhan Polytechnic University as separate education entries. Retain school, degree, major/minor, dates, and one relevant focus line. Remove coursework tag piles.

Add two campus/music rows using supported facts only:

```html
<article class="life-row" data-reveal>
  <h3>Jazz Performance</h3>
  <p>Electric bassist in Southern Utah University big band and combo settings.</p>
</article>
<article class="life-row" data-reveal>
  <h3>Campus Communication</h3>
  <p>Student-facing event promotion and performance content across campus settings.</p>
</article>
```

Do not include an award title until the user confirms the exact name.

- [ ] **Step 5: Curate visual work and simplify contact**

Show four representative images initially: one HOTONE product poster, one jazz poster, one trifold spread, and one photograph. Put remaining artwork inside one `details.visual-archive`. Use `width`, `height`, `loading="lazy"`, descriptive alt text, and `height:auto`. Preserve links to the full source images.

Replace the visible Gmail address with two actions labelled `Email` and `LinkedIn`; retain the existing `mailto:` destination and LinkedIn URL.

- [ ] **Step 6: Update both language dictionaries and remove stale selectors**

Delete selectors for `.case`, `.metrics`, old gallery headings, and removed capability cards. Add matching selectors for `.project-row`, `.life-row`, `.visual-archive`, and the renamed section headings in both `LANGUAGES.en.copy` and `LANGUAGES.zh.copy`.

- [ ] **Step 7: Run structure and language tests**

Run: `node --test tests/portfolio-structure.test.mjs tests/i18n.test.mjs`

Expected: PASS with 0 failures.

- [ ] **Step 8: Commit the homepage index structure**

```bash
git add index.html i18n.js tests/portfolio-structure.test.mjs tests/i18n.test.mjs
git commit -m "feat: organize homepage as a personal index"
```

### Task 5: Replace Knowledge Claims with Delivered Capabilities

**Files:**
- Modify: `index.html`
- Modify: `i18n.js`
- Create: `tests/capability-copy.test.mjs`

**Interfaces:**
- Consumes: current capability section and verified work described in the spec.
- Produces: a concise delivery-led capability list without unsupported paid-media expertise.

- [ ] **Step 1: Write the failing capability-copy test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('capabilities describe delivered work rather than familiarity', async () => {
  const copy = await readFile(new URL('../i18n.js', import.meta.url), 'utf8');
  for (const banned of ['Working knowledge', 'Familiar with Facebook Ads', 'Understand CPM', '了解 Facebook Ads', '掌握 CPM']) {
    assert.doesNotMatch(copy, new RegExp(banned, 'i'));
  }
  for (const delivered of ['Reddit community operations', 'localized English social copy', 'graphic design', 'short-form video', 'Excel reporting']) {
    assert.match(copy, new RegExp(delivered, 'i'));
  }
});
```

- [ ] **Step 2: Run the test and verify old knowledge claims fail it**

Run: `node --test tests/capability-copy.test.mjs`

Expected: FAIL on `Working knowledge` or another old paid-media phrase.

- [ ] **Step 3: Replace capability cards with one compact capability ledger**

Use four rows: `Community`, `Content`, `Visual`, and `Reporting & Workflow`. Each row contains a short list of shipped practices:

- Community: Reddit community operations, subreddit-rule research, moderation support.
- Content: localized English social copy, content calendars, platform-aware adaptation.
- Visual: graphic design, event photography, short-form video.
- Reporting & Workflow: Excel cleaning and reporting, performance review, practical AI-assisted research and production workflows.

Do not list Meta Ads, Google Ads, CPM, CPC, CTR, or ROAS as capabilities without delivered campaign evidence.

- [ ] **Step 4: Run capability and structure tests**

Run: `node --test tests/capability-copy.test.mjs tests/portfolio-structure.test.mjs tests/i18n.test.mjs`

Expected: PASS with 0 failures.

- [ ] **Step 5: Commit capability copy**

```bash
git add index.html i18n.js tests/capability-copy.test.mjs tests/i18n.test.mjs
git commit -m "refactor: describe delivered marketing capabilities"
```

### Task 6: Complete Responsive, Motion, and Cache-Safe Behavior

**Files:**
- Modify: `index.html`
- Modify: `projects/vertex-reddit.html`
- Modify: `i18n.js`
- Modify: `tests/i18n.test.mjs`
- Create: `tests/responsive-contract.test.mjs`

**Interfaces:**
- Consumes: final DOM structure and shared tokens.
- Produces: mobile-safe layouts, preserved motion character, and cache-safe bilingual loading on both routes.

- [ ] **Step 1: Write the failing responsive contract test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('both pages meet responsive and language-loading contracts', async () => {
  const [home, detail] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8'),
  ]);
  for (const html of [home, detail]) {
    assert.match(html, /overflow-x:\s*clip/);
    assert.match(html, /prefers-reduced-motion:\s*reduce/);
    assert.match(html, /i18n\.js\?v=20260722-index-redesign/);
  }
  assert.match(home, /@media\s*\(max-width:\s*40rem\)/);
  assert.match(home, /min-height:\s*44px/);
});
```

- [ ] **Step 2: Run the test and verify it fails on the old cache key and breakpoints**

Run: `node --test tests/responsive-contract.test.mjs`

Expected: FAIL because the homepage still references the previous language-script version and does not use the required mobile contract.

- [ ] **Step 3: Implement responsive rules**

At 60rem, collapse experience proof columns and project rows to one column. At 40rem, keep EN/中文 visible, give every button/link/disclosure summary a 44px minimum hit area, disable scroll-linked parallax, and ensure display headings use `overflow-wrap:anywhere; min-width:0`. Apply `overflow-x:clip` to both `html` and `body`.

- [ ] **Step 4: Preserve purposeful motion**

Keep the hero entrance, scroll-progress line, project-row underline movement, artwork reveal, and cursor spotlight on pointer-fine desktop only. Remove metric counters that no longer correspond to a global metric strip. Reduced motion exposes all content immediately and disables grain, spotlight, parallax, and spatial transforms.

- [ ] **Step 5: Version both language-script imports**

Set both pages to:

```html
<script type="module" src="i18n.js?v=20260722-index-redesign"></script>
```

Use `../i18n.js?v=20260722-index-redesign` on the Vertex route. Update the HTML contract assertion in `tests/i18n.test.mjs` to match the new cache key.

- [ ] **Step 6: Run the complete automated suite**

Run: `node --test tests/*.test.mjs`

Expected: all tests PASS, 0 failures, 0 skipped.

- [ ] **Step 7: Commit responsive and motion behavior**

```bash
git add index.html projects/vertex-reddit.html i18n.js tests/i18n.test.mjs tests/responsive-contract.test.mjs
git commit -m "fix: complete responsive bilingual site behavior"
```

### Task 7: Browser QA, Slop Test, and Publication

**Files:**
- Modify if verification reveals defects: `index.html`, `tokens.css`, `i18n.js`, `projects/vertex-reddit.html`
- Test: `tests/*.test.mjs`

**Interfaces:**
- Consumes: completed implementation from Tasks 1–6.
- Produces: a verified commit ready for direct push to `origin/main` after the user's publication instruction.

- [ ] **Step 1: Run static verification**

Run:

```powershell
node --test tests/*.test.mjs
git diff --check
git status --short
```

Expected: all tests pass; `git diff --check` prints nothing; `.superpowers/` is the only unrelated untracked path.

- [ ] **Step 2: Serve the repository locally**

Run: `python -m http.server 4173 --bind 127.0.0.1`

Open `http://127.0.0.1:4173/` and `http://127.0.0.1:4173/projects/vertex-reddit.html`.

- [ ] **Step 3: Verify desktop behavior**

At 1440×900, confirm: English hero on load; no `营`; clean dark background; experience before projects; two compact project rows; natural poster proportions; Vertex route opens; Chinese switch updates both routes; refreshing after Chinese returns to English; no console errors or missing assets.

- [ ] **Step 4: Verify Hallmark mobile widths**

Check 320, 375, 414, and 768 px widths. Confirm no horizontal scrolling, no two-line clickable labels, 44px controls, readable Chinese line height, visible EN/中文 control, single-column project/experience rows, and no cropped poster text.

- [ ] **Step 5: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce`. Confirm all content is visible; spotlight, parallax, grain animation, and spatial reveals are off; focus rings remain immediate.

- [ ] **Step 6: Run Hallmark's 58-gate slop test**

Load `C:/Users/aquak/.agents/skills/hallmark/references/slop-test.md`, score the completed output, and fix every failing gate before proceeding. Record the final six-axis critique in the `tokens.css` stamp and require every axis to score at least 3.

- [ ] **Step 7: Re-run the full verification after any QA fix**

Run:

```powershell
node --test tests/*.test.mjs
git diff --check
```

Expected: all tests pass and no whitespace errors.

- [ ] **Step 8: Commit QA corrections if files changed**

```bash
git add index.html tokens.css i18n.js projects/vertex-reddit.html tests
git commit -m "fix: polish personal site presentation"
```

Do not run this commit command when browser QA required no file changes.

- [ ] **Step 9: Publish only after explicit user instruction**

Run `git push origin main` only when the user explicitly asks to publish. After pushing, poll the deployed HTML for the `20260722-index-redesign` cache key and repeat the English → Chinese → refresh → English browser check against `https://agemoo.github.io/`.
