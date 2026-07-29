# Professional Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebalance the English-first portfolio into a 60% professional / 40% personal website with a concise homepage, five evidence-led second-layer routes, approved original images, persistent bilingual navigation, and the existing dark-gallery motion quality.

**Architecture:** Keep the dependency-free static site and the locked `Gallery in the Dark` token system. Refactor the homepage in place, extend the existing selector-based `i18n.js` to five page keys, and add one shared detail-page stylesheet and script for the four new routes while leaving the Vertex evidence page intact except for shared navigation and language-cache consistency. Complex evidence and galleries move to detail pages; the homepage remains a fast index.

**Tech Stack:** Static HTML, CSS custom properties, vanilla JavaScript ES modules, native `<dialog>`, Node.js built-in test runner (`node --test`)

## Global Constraints

- English is the default on a fresh visit; an explicit `EN / 中文` selection persists across route navigation.
- Homepage order is Hero → About → Internship Experience → Selected Projects → Education → Outside Work → Contact.
- Hero copy is exactly `Communication, community, and music.` / `传播、社群与音乐。` and contains no image, badges, metrics, CTA cluster, or second description paragraph.
- About uses the two approved English and Chinese paragraphs from the design spec and flows directly into Internship Experience.
- Remove the Community / Content / Visual / Workflow capability ledger and every translation/test expectation that depends on it.
- Vertex homepage evidence remains `5`, `793K`, and `91.7%`, uses the user-approved attribution, and does not repeat the full detail-table figures.
- Use `assets/internship/SUU_TA/me_classroom.jpg` as the only public teaching-assistant image in this pass.
- Projects are three compact links: Campus Integrated Campaign, Hotel × Jazz, and Selected Visual Work.
- Outside Work is one homepage entry and one unified page containing Music, Photography, and Places; do not create three thin pages.
- Do not publish `assets/music/grand_ball_with_friends.jpg`, `assets/internship/SUU_TA/professor_classroom.jpg`, or other identifiable group/classroom images without later approval.
- Preserve `Gallery in the Dark`, film grain, vignette, pointer spotlight, scroll progress, hero choreography, reveal motion, portrait parallax, fixed-nav transition, and reduced-motion behavior.
- Preserve natural image ratios. Full images must use `height:auto`; preview crops may use `object-fit:cover` only in explicitly bounded preview wrappers.
- Wide layouts must not strand content on the left with accidental empty space on the right. Use `minmax(0,1fr)`-safe tracks, shared outer edges, and content-balanced columns.
- Verify 320, 375, 414, and 768px widths plus a wide desktop viewport. No horizontal scrolling is allowed.
- Do not add a framework, package dependency, generated stock image, fabricated metric, or unapproved workplace screenshot.
- Do not stage `.superpowers/`, `PROJECT_HANDOFF.md`, or unselected private/group images.

---

## File Map

- `index.html`: homepage structure, homepage-only CSS, motion hooks, selected image previews, and default-English content.
- `i18n.js`: route metadata, English/Chinese copy, alt text, accessible names, language persistence, and one shared cache key.
- `tokens.css`: locked design tokens; add only shared dialog/media tokens if a required token does not already exist.
- `DESIGN.md`: update the locked Index-First contract to the approved professional-personal two-layer structure without changing the visual theme.
- `detail.css`: shared shell, editorial content layout, natural-ratio media, dialog, responsive behavior, and reduced-motion rules for the four new pages.
- `detail.js`: shared scroll-nav, reveal, progress, and accessible image-dialog behavior for the four new pages.
- `projects/campus-campaign.html`: Campus Integrated Campaign detail.
- `projects/hotel-jazz.html`: Hotel × Jazz detail.
- `projects/visual-work.html`: curated visual work and archive.
- `outside-work.html`: unified Music, Photography, and Places page.
- `projects/vertex-reddit.html`: existing Vertex evidence route; only shared cache/navigation consistency changes are allowed.
- `tests/professional-personal-site.test.mjs`: homepage order, copy, section-removal, navigation, project links, and contact contract.
- `tests/detail-pages.test.mjs`: new route, metadata, shared shell, image, bilingual, and return-path contract.
- `tests/media-contract.test.mjs`: approved-image allowlist, privacy exclusions, intrinsic dimensions, and natural-ratio CSS contract.
- `tests/i18n.test.mjs`: five-page route selection, metadata, selector ownership, fresh-English behavior, and persisted explicit language.
- Existing tests: update only assertions made obsolete by the approved design; preserve Vertex evidence, responsive, Hallmark, and accessibility protections.

### Task 1: Define the new homepage and media contracts

**Files:**
- Create: `tests/professional-personal-site.test.mjs`
- Create: `tests/media-contract.test.mjs`
- Modify: `tests/capability-copy.test.mjs`
- Modify: `tests/content-revision.test.mjs`
- Modify: `tests/homepage-content.test.mjs`
- Modify: `tests/portfolio-structure.test.mjs`
- Test: the five files above

**Interfaces:**
- Consumes: current `index.html` and `i18n.js`.
- Produces: a failing contract for the approved homepage order, concise hero/About, removed capability ledger, three linked projects, unified Outside Work entry, selected image allowlist, and natural-ratio behavior.

- [ ] **Step 1: Write the failing homepage contract**

Create `tests/professional-personal-site.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { LANGUAGES } from '../i18n.js';

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('homepage follows the approved two-layer index order', () => {
  const ids = ['about', 'experience', 'projects', 'edu', 'outside-work', 'contact'];
  let cursor = home.indexOf('id="top"');
  for (const id of ids) {
    const next = home.indexOf(`id="${id}"`);
    assert.ok(next > cursor, `${id} is out of order`);
    cursor = next;
  }
  assert.doesNotMatch(home, /id="campus-music"|id="visual-work"/);
});

test('hero and About use the approved concise identity copy', () => {
  assert.match(home, /<div class="role[^>]*>Communication, community, and music\.<\/div>/);
  assert.doesNotMatch(home, /class="roleen"/);
  assert.match(home, /I study Strategic Communication at Southern Utah University/);
  assert.match(home, /Outside work, I play upright and electric bass/);
  assert.doesNotMatch(home, /capability-ledger|capability-row|<h3>Workflow<\/h3>/);
  assert.equal(LANGUAGES.zh.copy['.hero .role'], '传播、社群与音乐。');
  assert.doesNotMatch(JSON.stringify(LANGUAGES.zh.copy), /社区运营/);
});

test('homepage exposes three second-layer work routes', () => {
  for (const href of [
    'projects/campus-campaign.html',
    'projects/hotel-jazz.html',
    'projects/visual-work.html',
  ]) assert.match(home, new RegExp(`href="${href}"`));
  assert.equal((home.match(/class="project-row/g) ?? []).length, 3);
  assert.doesNotMatch(home, /<details class="project-row/);
});

test('Outside Work is one asymmetric homepage gateway', () => {
  assert.match(home, /<section[^>]+id="outside-work"/);
  assert.match(home, /href="outside-work\.html"/);
  for (const label of ['Music', 'Photography', 'Places']) assert.match(home, new RegExp(label));
  assert.doesNotMatch(home, /href="(?:music|photography|places)\.html"/);
});

test('contact is neutral rather than a campaign sales pitch', () => {
  assert.match(home, /Get in touch\./);
  assert.match(home, /You can reach me by email or LinkedIn\./);
  assert.doesNotMatch(home, /Let.{0,3}s make the next campaign/);
});
```

- [ ] **Step 2: Write the failing media/privacy contract**

Create `tests/media-contract.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const home = await readFile(new URL('index.html', root), 'utf8');

const approved = [
  'assets/internship/SUU_TA/me_classroom.jpg',
  'assets/project/CampusGala/freshmen_welcome_gala.jpg',
  'assets/project/Andi/andi_fest_2.png',
  'assets/project/Andi/andi_fest.jpg',
  'assets/music/performance.jpg',
];

test('every newly selected public image exists', async () => {
  for (const path of approved) await access(new URL(path, root));
});

test('homepage uses approved lead images and excludes privacy-risk images', () => {
  for (const path of [approved[0], approved[1], approved[2], approved[4]]) {
    assert.match(home, new RegExp(path.replaceAll('/', '\\/')));
  }
  for (const banned of ['professor_classroom.jpg', 'grand_ball_with_friends.jpg', 'with_professor.jpg']) {
    assert.doesNotMatch(home, new RegExp(banned));
  }
});

test('new media includes intrinsic dimensions and full images retain natural ratios', () => {
  assert.doesNotMatch(home, /<img(?![^>]*width=)(?=[^>]*assets\/(?:internship|project|music)\/)/);
  assert.doesNotMatch(home, /<img(?![^>]*height=)(?=[^>]*assets\/(?:internship|project|music)\/)/);
  assert.match(home, /\.experience-media img[^}]*height:auto/);
});
```

- [ ] **Step 3: Replace obsolete expectations without weakening unrelated coverage**

Make these exact test-direction changes:

- In `tests/capability-copy.test.mjs`, replace the delivered-capability row assertions with assertions that the old four labels and selectors are absent from both `index.html` and `i18n.js`.
- In `tests/content-revision.test.mjs`, remove assertions for `#campus-music`, `Workflow`, and the old in-home music rows; assert the approved About copy and `outside-work.html` link instead.
- In `tests/homepage-content.test.mjs`, replace the old U.S.-audience hero assertion with the exact approved hero line and retain metadata/font/favicon assertions.
- In `tests/portfolio-structure.test.mjs`, require `outside-work`, three project links, no homepage `visual-work` section, and no expanded project `<details>`.

Use this assertion shape when removing the capability contract:

```js
for (const source of [html, i18n]) {
  assert.doesNotMatch(source, /capability-ledger|capability-row/);
  assert.doesNotMatch(source, /<h3>(?:Community|Content|Visual|Workflow)<\/h3>/);
}
```

- [ ] **Step 4: Run the focused tests and confirm failure**

Run:

```powershell
node --test tests/professional-personal-site.test.mjs tests/media-contract.test.mjs tests/capability-copy.test.mjs tests/content-revision.test.mjs tests/homepage-content.test.mjs tests/portfolio-structure.test.mjs
```

Expected: FAIL because the homepage still has the long hero, capability ledger, expandable projects, separate Music/Visual Work sections, old contact copy, and no new image references.

- [ ] **Step 5: Commit the failing contracts**

```powershell
git add -- tests/professional-personal-site.test.mjs tests/media-contract.test.mjs tests/capability-copy.test.mjs tests/content-revision.test.mjs tests/homepage-content.test.mjs tests/portfolio-structure.test.mjs
git commit -m "test: define professional personal site contract"
```

### Task 2: Extend bilingual routing and persist explicit language choices

**Files:**
- Modify: `tests/i18n.test.mjs`
- Modify: `i18n.js`
- Modify: `index.html` at the `i18n.js?v=` script reference
- Modify: `projects/vertex-reddit.html` at the `i18n.js?v=` script reference
- Test: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: existing exports `DEFAULT_LANGUAGE`, `STORAGE_KEY`, `LANGUAGES`, `normalizeLanguage`, `getInitialLanguage`, and `applyLanguage`.
- Produces: `PAGE_KEYS`, route-aware metadata for `home`, `vertex`, `campus`, `hotel`, `visual`, and `outside`; `getInitialLanguage(storage)` returning a valid stored explicit choice or English; cache key `20260729-personal-site`.

- [ ] **Step 1: Update i18n tests first**

Replace the fresh-language test and add page-key coverage:

```js
test('English is fresh default and an explicit valid choice persists', () => {
  assert.equal(DEFAULT_LANGUAGE, 'en');
  assert.equal(getInitialLanguage({ getItem: () => null }), 'en');
  assert.equal(getInitialLanguage({ getItem: () => 'zh' }), 'zh');
  assert.equal(getInitialLanguage({ getItem: () => 'fr' }), 'en');
});

test('language module declares all public page keys and the shared cache key', async () => {
  const module = await import('../i18n.js');
  assert.deepEqual(module.PAGE_KEYS, ['home', 'vertex', 'campus', 'hotel', 'visual', 'outside']);
  assert.equal(module.I18N_CACHE_KEY, '20260729-personal-site');
});
```

Extend the metadata test document factory so `data-page` accepts all six page keys, and assert every `LANGUAGES[language].metadata[key]` has a non-empty `title` and `description`.

- [ ] **Step 2: Implement route keys and persisted boot behavior**

At the top of `i18n.js`, use:

```js
export const DEFAULT_LANGUAGE = 'en';
export const STORAGE_KEY = 'portfolio-language';
export const I18N_CACHE_KEY = '20260729-personal-site';
export const PAGE_KEYS = ['home', 'vertex', 'campus', 'hotel', 'visual', 'outside'];
```

Replace `getPageKey` and `getInitialLanguage` with:

```js
function getPageKey(doc) {
  const key = doc?.documentElement?.dataset?.page;
  return PAGE_KEYS.includes(key) ? key : 'home';
}

export function getInitialLanguage(storage = globalThis.localStorage) {
  try { return normalizeLanguage(storage?.getItem(STORAGE_KEY)); }
  catch { return DEFAULT_LANGUAGE; }
}
```

Keep `normalizeLanguage` strict so only `zh` changes the default. Update `boot()` to call `getInitialLanguage(localStorage)`.

- [ ] **Step 3: Add exact route metadata**

Add these English titles to `en.metadata`:

```js
campus: { title: 'Campus Integrated Campaign | Mukun Sun', description: 'Promotion coordination for campus welcome and New Year events across online and offline channels.' },
hotel: { title: 'Hotel × Jazz | Mukun Sun', description: 'Event concept, partner coordination, WeChat promotion, and visual identity for a hotel and jazz collaboration.' },
visual: { title: 'Selected Visual Work | Mukun Sun', description: 'A selected archive of posters, print design, event visuals, and photography by Mukun Sun.' },
outside: { title: 'Outside Work | Mukun Sun', description: 'Music, photography, and places that shape how Mukun Sun pays attention to people and atmosphere.' },
```

Add natural Chinese equivalents to `zh.metadata`. Change the homepage title to `Mukun Sun | Communication, Community, and Music` and its description to the approved professional-personal positioning rather than `Bilingual Social Media Marketer`.

Use these Chinese metadata values:

```js
home: { title: '孙慕坤｜传播、社群与音乐', description: '孙慕坤的个人网站：社交媒体与社群运营、传播项目、视觉作品、教育经历，以及音乐与摄影。' },
campus: { title: '校园整合传播｜孙慕坤', description: '面向校园迎新与新年活动的线上线下宣传协调项目。' },
hotel: { title: '酒店 × 爵士｜孙慕坤', description: '一场酒店与爵士合作活动的概念策划、合作方协调、微信推广与视觉识别。' },
visual: { title: '视觉作品精选｜孙慕坤', description: '孙慕坤的海报、印刷设计、活动视觉与摄影作品精选。' },
outside: { title: '工作之外｜孙慕坤', description: '音乐、摄影与地方经验，以及它们如何影响孙慕坤对人和氛围的观察。' },
```

- [ ] **Step 4: Bump every current consumer to the exact shared cache key**

Use:

```html
<script type="module" src="i18n.js?v=20260729-personal-site"></script>
```

and in the Vertex route:

```html
<script type="module" src="../i18n.js?v=20260729-personal-site"></script>
```

- [ ] **Step 5: Run the focused i18n suite**

```powershell
node --test tests/i18n.test.mjs tests/responsive-contract.test.mjs tests/vertex-shell.test.mjs
```

Expected: PASS after updating exact cache-key assertions, page metadata expectations, and selector-routing logic without removing navigation or accessibility checks.

- [ ] **Step 6: Commit the i18n foundation**

```powershell
git add -- i18n.js index.html projects/vertex-reddit.html tests/i18n.test.mjs tests/responsive-contract.test.mjs
git commit -m "feat: extend bilingual page routing"
```

### Task 3: Rebuild the homepage as the approved first layer

**Files:**
- Modify: `index.html`
- Modify: `i18n.js`
- Modify: `tests/hallmark-qa.test.mjs`
- Modify: `tests/responsive-contract.test.mjs`
- Modify: `tests/internship-experience.test.mjs`
- Modify: `tests/vertex-evidence.test.mjs`
- Modify: `tests/design-contract.test.mjs`
- Modify: `DESIGN.md`
- Test: all homepage and existing regression tests

**Interfaces:**
- Consumes: Task 1 homepage contract, Task 2 page-aware i18n, selected source images, existing tokens and motion hooks.
- Produces: the complete fast-scan homepage and stable selectors consumed by the four detail-page links.

- [ ] **Step 1: Replace navigation and hero copy**

Use this default-English navigation in both full and compact variants:

```html
<a href="#about">About</a><a href="#experience">Work</a><a href="#outside-work">Outside Work</a><a href="#contact">Contact</a>
```

Keep the language switch separate. Replace the hero contents with:

```html
<h1 class="reveal-up" style="--d:300">Mukun Sun</h1>
<div class="role reveal-up" style="--d:520">Communication, community, and music.</div>
<div class="hero-foot reveal-up" style="--d:720">
  <div class="scrollcue">Scroll to explore<span class="bar" aria-hidden="true"></span></div>
</div>
```

Delete `.roleen` markup and its unused CSS. Do not add a hero image or CTA.

- [ ] **Step 2: Replace About and remove the capability ledger**

Render the approved copy as two paragraphs inside `.about-copy`:

```html
<div class="about-copy">
  <p class="lede" data-reveal>I study Strategic Communication at Southern Utah University, with a minor in Business Analytics. My work spans social media, community operations, visual communication, and event promotion. I like learning how an audience actually behaves before deciding what to make.</p>
  <p data-reveal>Outside work, I play upright and electric bass in SUU ensembles. Music has also taken me into concert planning, photography, and the small details that make an event feel memorable.</p>
</div>
```

Delete the complete `.capability-ledger` block and its `.capability-*` CSS. Preserve the portrait, parallax data attribute, and natural portrait framing.

Add the exact Chinese About translations to `i18n.js`:

```js
'#about .about-copy p:nth-child(1)': '我在南犹他大学学习战略传播，辅修商业分析。我的实践涉及社交媒体、社群运营、视觉传播和活动推广。我习惯先理解受众实际如何参与，再决定要做什么内容。',
'#about .about-copy p:nth-child(2)': '工作之外，我在 SUU 的乐团中演奏低音提琴和电贝斯。音乐也让我参与音乐会策划、摄影，以及那些真正影响一场活动体验的细节。',
```

- [ ] **Step 3: Rebalance Internship Experience and add the approved TA image**

Keep two `.experience-row` entries. Replace the three `.proof` cards with one compact line:

```html
<p class="experience-proofline"><strong>5</strong> representative accounts · <strong>793K</strong> representative views · up to <strong>91.7%</strong> U.S. audience share</p>
```

Keep the approved attribution paragraph and Vertex link. Add to the teaching row:

```html
<figure class="experience-media" data-reveal="img">
  <img src="assets/internship/SUU_TA/me_classroom.jpg" width="1435" height="1279" alt="Mukun Sun supporting an English writing class in Wuhan" loading="lazy" decoding="async">
</figure>
```

Use a balanced wide-screen grid with `minmax(0,.72fr) minmax(0,1.28fr)` and `height:auto`; collapse it at `60rem`.

Use these wide-screen track contracts to prevent accidental right-side voids:

```css
.about-top{grid-template-columns:minmax(0,1.35fr) minmax(240px,.65fr);}
.experience-row{grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);}
.experience-row--teaching>div:last-child{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(240px,.95fr);gap:clamp(24px,4vw,56px);align-items:center;}
.project-row{grid-template-columns:minmax(0,1.2fr) minmax(220px,.55fr) auto;}
.outside-grid{grid-template-columns:minmax(0,1.6fr) minmax(240px,1fr);align-items:stretch;}
@media(max-width:60rem){.about-top,.experience-row,.experience-row--teaching>div:last-child,.project-row,.outside-grid{grid-template-columns:minmax(0,1fr);}}
```

- [ ] **Step 4: Preserve and retune the marquee**

Use two identical loops containing:

```html
<span>Community Operations<span class="mut">·</span>Teaching<span class="mut">·</span>Campaigns<span class="mut">·</span>Jazz Performance<span class="mut">·</span>Visual Communication<span class="mut">·</span></span>
```

Retain the existing linear animation and reduced-motion suppression. Remove italic tags from the marquee.

- [ ] **Step 5: Replace project disclosures with three linked editorial rows**

Each row is an `<a class="project-row">`, not `<details>`:

```html
<a class="project-row project-row--campus" href="projects/campus-campaign.html" data-reveal>
  <span class="project-copy"><strong>Campus Integrated Campaign</strong><span>Promotion coordination for campus welcome and New Year events across online and offline channels.</span></span>
  <span class="project-preview"><img src="assets/project/CampusGala/freshmen_welcome_gala.jpg" width="1600" height="1067" alt="A large campus gala audience facing a lit stage" loading="lazy" decoding="async"></span>
  <span class="project-action">View project <span aria-hidden="true">→</span></span>
</a>
```

Repeat with exact routes and copy for Hotel × Jazz and Selected Visual Work. Hotel uses `andi_fest_2.png` at `1039 × 462`. Selected Visual Work uses an existing approved poster preview and links to `projects/visual-work.html`.

- [ ] **Step 6: Keep Education and replace Music/Visual Work with Outside Work**

Do not alter the verified Education facts. Replace the old `#campus-music` and `#visual-work` sections with one `#outside-work` section containing one link to `outside-work.html` and three unequal entries. Music uses:

```html
<img src="assets/music/performance.jpg" width="896" height="1193" alt="Mukun Sun performing upright bass on stage" loading="lazy" decoding="async">
```

Photography uses the existing authored `assets/bass1.jpg` preview. Places is text-led and contains no fabricated or stock image. The CSS uses a larger Music track and a filled supporting column; it must not be a three-equal-card grid.

- [ ] **Step 7: Replace Contact copy and complete translations**

Use:

```html
<h2 data-reveal>Get in touch.</h2>
<p class="contact-intro" data-reveal>You can reach me by email or LinkedIn.</p>
```

In `i18n.js`, remove every obsolete selector for `.roleen`, capability rows, in-home Music rows, the old visual archive, and project disclosures. Add selectors for the two About paragraphs, proof line, three linked projects, Outside Work labels, image alt text, and neutral Contact copy. Keep English and Chinese selector sets identical.

- [ ] **Step 8: Run all homepage-focused tests**

Before running the suite, update `DESIGN.md` from `Locked Index-First Contract (2026-07-22)` to `Locked Professional Personal Contract (2026-07-29)`. Record the approved homepage order, 60/40 positioning, second-layer routes, asymmetric Outside Work section, natural-ratio media, preserved dark-gallery motion, and wide-screen balance rule. Update `tests/design-contract.test.mjs` to require these terms while retaining its token, English-first, and theme assertions.

```powershell
node --test tests/professional-personal-site.test.mjs tests/media-contract.test.mjs tests/internship-experience.test.mjs tests/vertex-evidence.test.mjs tests/i18n.test.mjs tests/responsive-contract.test.mjs tests/hallmark-qa.test.mjs tests/design-contract.test.mjs tests/portfolio-structure.test.mjs tests/homepage-content.test.mjs tests/content-revision.test.mjs tests/capability-copy.test.mjs
```

Expected: PASS. Update exact structural assertions to the approved selectors; do not remove motion, contrast, natural-ratio, English-default, or Vertex-attribution coverage.

- [ ] **Step 9: Commit homepage and selected homepage assets**

```powershell
git add -- index.html i18n.js DESIGN.md tests assets/internship/SUU_TA/me_classroom.jpg assets/project/CampusGala/freshmen_welcome_gala.jpg assets/project/Andi/andi_fest_2.png assets/music/performance.jpg
git commit -m "feat: rebalance personal site homepage"
```

Before committing, verify `git diff --cached --name-only` does not include the unapproved group/classroom images.

### Task 4: Build the shared detail-page shell and accessible image viewer

**Files:**
- Create: `detail.css`
- Create: `detail.js`
- Create: `tests/detail-pages.test.mjs`
- Modify: `tokens.css` only if the shell needs a missing named token
- Test: `tests/detail-pages.test.mjs`
- Test: `tests/hallmark-qa.test.mjs`

**Interfaces:**
- Produces CSS classes `.detail-nav`, `.detail-hero`, `.detail-section`, `.detail-media`, `.detail-grid`, `.image-dialog`; JavaScript function `mountImageDialog(dialog)`; `[data-enlarge]` triggers; `[data-reveal]` and `.progress` behavior.
- Consumed by: all four pages in Task 5.

- [ ] **Step 1: Write the shared-shell test before the files exist**

Create `tests/detail-pages.test.mjs` with an initial shared-assets test:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../detail.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../detail.js', import.meta.url), 'utf8');

test('detail shell uses locked tokens and balanced safe grids', () => {
  assert.match(css, /@import url\(['"]tokens\.css['"]\)/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|oklch\(/i);
  assert.match(css, /grid-template-columns:[^;}]*minmax\(0,/);
  assert.match(css, /\.detail-media img[^}]*height:auto/);
  assert.match(css, /html[^}]*overflow-x:clip/);
  assert.match(css, /body[^}]*overflow-x:clip/);
});

test('image dialog supports keyboard close and focus restoration', () => {
  assert.match(js, /export function mountImageDialog\(dialog\)/);
  assert.match(js, /event\.key === 'Escape'/);
  assert.match(js, /previousFocus\?\.focus\(\)/);
  assert.match(js, /dialog\.close\(\)/);
});
```

Run `node --test tests/detail-pages.test.mjs`; expect FAIL because the files do not exist.

- [ ] **Step 2: Create the shared stylesheet**

Start `detail.css` with the Hallmark stamp and token import:

```css
/* Hallmark · shared detail shell · inherits Index-First / Gallery in the Dark */
@import url('tokens.css');
html{overflow-x:clip;background:var(--color-paper);}
body{overflow-x:clip;margin:0;background:var(--color-paper);color:var(--color-ink);font-family:var(--font-body);}
.detail-wrap{width:min(100% - 2 * clamp(20px,5vw,80px),1240px);margin-inline:auto;}
.detail-hero,.detail-section{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(32px,6vw,88px);}
.detail-media img{display:block;width:100%;height:auto;}
@media(max-width:60rem){.detail-hero,.detail-section{grid-template-columns:minmax(0,1fr);}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.progress{display:none!important}[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}}
```

Complete the nav, section rules, focus states, dialog backdrop, natural-ratio gallery, Chinese line-height, 44px touch targets, and 320px layout using existing named tokens only.

Use these interaction/layout rules as the minimum implementation:

```css
.detail-nav{position:fixed;inset:0 0 auto;z-index:20;display:flex;align-items:center;justify-content:space-between;min-height:64px;padding-inline:clamp(20px,5vw,80px);border-bottom:1px solid transparent;}
.detail-nav.solid{background:color-mix(in oklab,var(--color-paper) 88%,transparent);border-color:var(--color-rule);backdrop-filter:blur(14px);}
.detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(16px,3vw,40px);align-items:start;}
.media-button{display:block;color:inherit;min-width:0;}
.media-button:focus-visible,.dialog-close:focus-visible{outline:2px solid var(--color-focus);outline-offset:4px;}
.image-dialog{max-width:min(92vw,1200px);max-height:92vh;padding:0;border:1px solid var(--color-rule);background:var(--color-paper-raised);color:var(--color-ink);}
.image-dialog::backdrop{background:color-mix(in oklab,var(--color-paper) 82%,transparent);}
.image-dialog img{display:block;max-width:100%;max-height:84vh;width:auto;height:auto;margin:auto;}
.dialog-close{min-width:44px;min-height:44px;}
html[lang="zh-CN"] .detail-section p{line-height:1.85;}
@media(max-width:40rem){.detail-grid{grid-template-columns:minmax(0,1fr)}a,button,summary{min-height:44px;}}
```

- [ ] **Step 3: Create the shared behavior module**

Implement and export:

```js
export function mountImageDialog(dialog) {
  if (!dialog) return;
  const image = dialog.querySelector('img');
  const close = dialog.querySelector('[data-dialog-close]');
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
```

Add dependency-free initialization for scroll progress, `.nav.solid`, IntersectionObserver reveal with immediate fallback, reduced-motion capability changes, language controls through `i18n.js`, and `mountImageDialog(document.querySelector('.image-dialog'))`.

- [ ] **Step 4: Run shared-shell tests**

```powershell
node --test tests/detail-pages.test.mjs tests/hallmark-qa.test.mjs
```

Expected: the shared-shell tests PASS. Hallmark homepage/Vertex assertions remain green; add shared-shell checks rather than forcing old route-specific selector counts onto the new files.

- [ ] **Step 5: Commit the detail foundation**

```powershell
git add -- detail.css detail.js tokens.css tests/detail-pages.test.mjs tests/hallmark-qa.test.mjs
git commit -m "feat: add shared editorial detail shell"
```

### Task 5: Add the four approved second-layer pages

**Files:**
- Create: `projects/campus-campaign.html`
- Create: `projects/hotel-jazz.html`
- Create: `projects/visual-work.html`
- Create: `outside-work.html`
- Modify: `i18n.js`
- Modify: `tests/detail-pages.test.mjs`
- Modify: `tests/i18n.test.mjs`
- Add: `assets/project/Andi/andi_fest.jpg`
- Test: `tests/detail-pages.test.mjs`
- Test: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: `detail.css`, `detail.js`, `tokens.css`, `i18n.js`, and the selected images committed in Task 3.
- Produces: four valid bilingual routes with `data-page` values `campus`, `hotel`, `visual`, and `outside`; each route has a homepage return path and exact metadata.

- [ ] **Step 1: Extend route tests before page creation**

Add to `tests/detail-pages.test.mjs`:

```js
const routes = [
  ['projects/campus-campaign.html', 'campus'],
  ['projects/hotel-jazz.html', 'hotel'],
  ['projects/visual-work.html', 'visual'],
  ['outside-work.html', 'outside'],
];

test('every second-layer route has the shared bilingual shell', async () => {
  for (const [path, key] of routes) {
    const html = await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
    assert.match(html, new RegExp(`<html[^>]+data-page="${key}"`));
    assert.match(html, /href="(?:\.\.\/)?detail\.css"/);
    assert.match(html, /src="(?:\.\.\/)?detail\.js"/);
    assert.match(html, /src="(?:\.\.\/)?i18n\.js\?v=20260729-personal-site"/);
    assert.match(html, /data-lang="en"/);
    assert.match(html, /data-lang="zh"/);
    assert.match(html, /href="(?:\.\.\/)?index\.html"/);
  }
});
```

Run the focused test and expect missing-file failures.

- [ ] **Step 2: Create Campus Integrated Campaign**

Use `data-page="campus"`, title `Campus Integrated Campaign`, role `Promotion Team Lead`, dates `2024–2025`, the existing approved context/contribution copy, and `../assets/project/CampusGala/freshmen_welcome_gala.jpg` at `1600 × 1067`.

Use `campus-hero` on the `.detail-hero` header and `campus-context`, `campus-contribution`, and `campus-media` on the three `.detail-section` elements, in that order.

Do not add unverified reach, attendance, conversion, or team-size metrics.

- [ ] **Step 3: Create Hotel × Jazz**

Use `data-page="hotel"`, title `Hotel × Jazz`, role `Campaign & Visual Communication`, date `2024`, and the approved facts: event concept, partner coordination, WeChat promotion, performance coordination, and visual identity.

Use:

```html
<img src="../assets/project/Andi/andi_fest_2.png" width="1039" height="462" alt="Wide Hotel × Jazz event composition showing the performance and instruments" data-enlarge>
<img src="../assets/project/Andi/andi_fest.jpg" width="1280" height="960" alt="Audience and performance area at the Hotel × Jazz event" data-enlarge>
```

Page section IDs are `hotel-hero`, `hotel-context`, `hotel-contribution`, and `hotel-media`.

- [ ] **Step 4: Create Selected Visual Work**

Use `data-page="visual"`. Move the current homepage archive into this route without duplicating files. Lead with HOTONE, Coastline Jazz Night, and Laoshan Folk Arts; place the remaining approved posters and bass studies in a quieter archive below.

Every image keeps its current intrinsic width/height and caption. Use `<a class="media-button" href="../assets/hotone_main.jpg" data-enlarge>` as the exact wrapper pattern, changing only the asset path for each work, so opening the native dialog is keyboard accessible while the original image remains reachable without JavaScript. Do not reference `grand_ball_with_friends.jpg`.

- [ ] **Step 5: Create Outside Work**

Use `data-page="outside"` and three `.detail-section` elements with IDs `outside-music`, `outside-photography`, and `outside-places`, in that order.

Music uses `assets/music/performance.jpg` and the verified SUU ensemble and music-event coordination facts. Photography uses the existing authored `assets/bass1.jpg`, `bass2.jpg`, and `bass3.jpg`. Places is text-led with this restrained copy:

> Travel and museums are another way I pay attention to place, design, and atmosphere. This section will grow through original photographs and short notes rather than travel-guide summaries.

Do not include group images in this pass.

- [ ] **Step 6: Add complete route translations and attributes**

For each page, add selector-scoped English and Chinese copy, navigation labels, dialog labels, image alts, metadata, and footer/return labels to `i18n.js`. Prefix selectors with the page-specific root IDs (`#campus-*`, `#hotel-*`, `#visual-*`, `#outside-*`) so tests can assign each selector to one route.

Use this approved bilingual content matrix rather than expanding the claims:

| Route | English | Chinese |
| --- | --- | --- |
| Campus context | Campus welcome and New Year events needed coordinated promotion across online and offline channels. | 校园迎新与新年活动需要在线上线下渠道之间保持协调一致的宣传。 |
| Campus contribution | I led the promotion work, adapted content for each platform, and connected on-site activity with online publishing. | 我负责宣传工作的组织协调，根据不同平台调整内容，并衔接现场活动与线上发布。 |
| Hotel context | A balcony performance connected Ni Jazz Bar with Fengmao Andi Hotel around a hotel-and-art event concept. | 一场阳台演出以“酒店与艺术”为概念，连接了 Ni Jazz Bar 与风貌安坻酒店。 |
| Hotel contribution | I developed the event concept, coordinated the partners and performance, planned WeChat promotion, and designed a consistent visual identity. | 我构思活动概念，协调合作方与演出，策划微信推广，并设计统一的视觉识别。 |
| Visual introduction | A selected archive of event, product, print, and photographic work. | 一组活动、产品、印刷与摄影作品精选。 |
| Outside Music | I play upright bass in the SUU Jazz Big Band and electric bass in the T-Bird Marching Band. Music has also led me into concert planning and event coordination. | 我在 SUU 爵士大乐队演奏低音提琴，并在 T-Bird Marching Band 演奏电贝斯。音乐也让我参与音乐会策划与活动协调。 |
| Outside Photography | Photography is another way I study light, objects, and atmosphere. | 摄影是我观察光线、物体与氛围的另一种方式。 |
| Outside Places | Travel and museums are another way I pay attention to place, design, and atmosphere. This section will grow through original photographs and short notes rather than travel-guide summaries. | 旅行与博物馆让我继续观察地方、设计与氛围。这里会逐步加入原创照片与短记，而不是旅行攻略式的汇总。 |

Keep `Object.keys(LANGUAGES.en.copy)` identical to `Object.keys(LANGUAGES.zh.copy)`, and do the same for `attributes`.

- [ ] **Step 7: Run route, media, and language tests**

```powershell
node --test tests/detail-pages.test.mjs tests/media-contract.test.mjs tests/i18n.test.mjs tests/responsive-contract.test.mjs
```

Expected: PASS with all four routes, all selected images, metadata, selectors, and cache references present.

- [ ] **Step 8: Commit the second layer and final selected asset**

```powershell
git add -- projects/campus-campaign.html projects/hotel-jazz.html projects/visual-work.html outside-work.html i18n.js tests/detail-pages.test.mjs tests/i18n.test.mjs assets/project/Andi/andi_fest.jpg
git commit -m "feat: add personal site detail routes"
```

Confirm the staged asset list contains no professor/classroom or unapproved group photographs.

### Task 6: Verify visual balance, interaction, and complete regressions

**Files:**
- Verify: `index.html`
- Verify: `detail.css`
- Verify: `detail.js`
- Verify: `i18n.js`
- Verify: the homepage, Vertex, all four new routes, and all files under `tests/`
- Modify only if verification reveals a reproducible defect

**Interfaces:**
- Consumes: Tasks 1–5.
- Produces: evidence that the redesign meets the approved content, motion, privacy, language, responsive, and wide-screen composition contracts.

- [ ] **Step 1: Run the complete automated suite**

```powershell
node --test tests/*.test.mjs
```

Expected: all tests PASS with zero failures.

- [ ] **Step 2: Run source and repository hygiene checks**

```powershell
git diff --check
rg -n "capability-ledger|capability-row|roleen|grand_ball_with_friends|professor_classroom|with_professor" index.html i18n.js projects outside-work.html detail.css detail.js
git status --short
```

Expected: `git diff --check` is clean; `rg` returns no production references; only intentionally untracked user files remain.

- [ ] **Step 3: Serve the static site locally**

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173/` and all linked routes. Keep the server running only for the bounded verification session.

- [ ] **Step 4: Verify wide-screen composition at 1440 × 1000**

Check every homepage section and new detail page:

- Hero is sparse and intentionally anchored, not filled with widgets.
- About text and portrait share the width without a dead right half.
- Internship text, evidence line, and TA image form balanced compositions.
- Three project rows use the full shared grid and align outer edges.
- Education stays readable without looking like an undersized left column.
- Outside Work's supporting column fills the vertical relationship beside Music.
- No section has accidental right-side whitespace caused by fixed widths or broken spans.
- Existing grain, vignette, spotlight, progress, reveal, parallax, and nav transition remain visible and restrained.

Capture a screenshot of each full page for comparison before moving to responsive checks.

- [ ] **Step 5: Verify 768, 414, 375, and 320px layouts**

At each width verify:

- No horizontal scrollbar.
- Navigation switches to the compact control and touch targets are at least 44px.
- Chinese and English headings wrap without clipping.
- Chinese body copy has comfortable line height and no narrow orphan column.
- Project and Outside Work layouts collapse without residual desktop gaps.
- Images retain their aspect ratios.
- Dialog fits inside the viewport and its close control remains reachable.

- [ ] **Step 6: Verify language, no-JS, keyboard, and reduced motion**

- Fresh storage loads English.
- Selecting Chinese persists after following a project or Outside Work link.
- Selecting English persists on return.
- Tab reaches navigation, project rows, image buttons, dialog close, email, and LinkedIn in logical order.
- `Esc`, close button, and backdrop close the image dialog and restore focus.
- With JavaScript disabled, all copy, links, and images remain available; enlarged viewing may degrade to the original image link.
- With reduced motion enabled, content is immediately visible and spatial motion, progress, spotlight, and parallax stop.

- [ ] **Step 7: Add one regression test for each discovered defect**

For any defect, add the smallest assertion to the owning test file, run it to confirm failure, make the minimal fix, rerun the focused test, then rerun the full suite. Do not make aesthetic changes outside the approved design.

- [ ] **Step 8: Run final checks and commit only real corrections**

```powershell
node --test tests/*.test.mjs
git diff --check
git status --short
```

If corrections were required:

```powershell
git add -- index.html i18n.js detail.css detail.js projects/campus-campaign.html projects/hotel-jazz.html projects/visual-work.html outside-work.html tests
git commit -m "fix: refine personal site presentation"
```

If no correction was required, do not create an empty commit.
