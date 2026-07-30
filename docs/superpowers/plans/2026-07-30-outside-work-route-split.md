# Outside Work Route Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the visible Outside Work intermediary page with direct Music, Photography, and Travel routes, while widening the Music timeline and preserving old links.

**Architecture:** The homepage remains the only visible index for the three personal subjects. Three focused HTML routes reuse the existing detail shell, shared tokens, motion, image dialog, and selector-scoped bilingual system. A small testable redirect module keeps old `outside-work.html` fragment links working without showing a second menu.

**Tech Stack:** Static HTML, CSS custom properties, native ES modules, `i18n.js`, `detail.js`, Node.js built-in test runner, GitHub Pages.

## Global Constraints

- English is the default language; every visible string and image alt text requires Chinese parity.
- Reuse the existing dark-gallery design system, tokens, reveal motion, progress behavior, and image dialog.
- Preserve natural media ratios; do not apply one forced crop to all photographs.
- Music uses a full-width timeline; it must not remain confined to a narrow right-hand column.
- Each image has one primary editorial home; do not duplicate full images across Photography and Travel without a specific narrative reason.
- Do not fabricate personal claims, dates, metrics, recommendations, or travel reflections.
- Do not publish unrelated untracked assets or user files.
- Verify 320, 375, 414, and 768 pixel widths with no horizontal overflow.

---

## File Structure

**Create**

- `music.html` — Music introduction, full-width event timeline, study history, event media, and Jazz Fest link.
- `photography.html` — Photography-led image sequence and enlargement dialog.
- `travel.html` — Concise place-led image notes using only factual supplied material.
- `outside-redirect.js` — Pure old-fragment resolver plus browser redirect mount.
- `tests/outside-route-split.test.mjs` — Direct-route, redirect, content ownership, and homepage-link contracts.

**Modify**

- `outside-work.html` — Replace the visible content page with a minimal compatibility document.
- `index.html` — Point the three Outside Work cards directly to the three pages and remove the redundant aggregate action.
- `detail.css` — Add route-specific Music timeline tracks and independent Photography/Travel compositions while retaining shared shell contracts.
- `i18n.js` — Replace the `outside` page dictionary with `music`, `photography`, and `travel` page metadata, copy, and image attributes.
- `tests/detail-pages.test.mjs` — Register the three routes and remove assertions tied to the former aggregate page.
- `tests/i18n.test.mjs` — Validate the expanded page keys and selector ownership.
- `tests/media-contract.test.mjs` — Enforce one primary page per Photography/Travel image.
- `tests/professional-personal-site.test.mjs` — Expect direct homepage destinations.
- `tests/responsive-contract.test.mjs` — Validate cache imports and narrow-screen contracts across all three routes.

**Retain unchanged unless a failing shared contract proves otherwise**

- `detail.js` — Existing reveal, fragment, progress, and image-dialog behavior.
- `tokens.css` — Existing colors, typography, spacing, durations, and radii.

---

### Task 1: Compatibility redirect route

**Files:**

- Create: `outside-redirect.js`
- Modify: `outside-work.html`
- Create: `tests/outside-route-split.test.mjs`

**Interfaces:**

- Produces: `resolveOutsideRoute(hash: string): string`
- Produces: `mountOutsideRedirect(locationLike: { hash: string, replace(target: string): void }): string`
- Consumes: the published legacy fragments `#outside-music`, `#outside-photography`, and `#outside-travel`.

- [ ] **Step 1: Write the failing redirect tests**

Add the following foundation to `tests/outside-route-split.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolveOutsideRoute, mountOutsideRedirect } from '../outside-redirect.js';

test('legacy Outside Work fragments resolve to direct subject routes', () => {
  assert.equal(resolveOutsideRoute('#outside-music'), 'music.html');
  assert.equal(resolveOutsideRoute('#outside-photography'), 'photography.html');
  assert.equal(resolveOutsideRoute('#outside-travel'), 'travel.html');
  assert.equal(resolveOutsideRoute(''), 'index.html#outside-work');
  assert.equal(resolveOutsideRoute('#unknown'), 'index.html#outside-work');
});

test('redirect mount replaces history instead of adding an intermediate page', () => {
  const calls = [];
  const target = mountOutsideRedirect({
    hash: '#outside-photography',
    replace: (value) => calls.push(value),
  });
  assert.equal(target, 'photography.html');
  assert.deepEqual(calls, ['photography.html']);
});

test('outside-work is a compatibility document rather than a visible chooser', async () => {
  const html = await readFile(new URL('../outside-work.html', import.meta.url), 'utf8');
  assert.match(html, /src="outside-redirect\.js"/);
  assert.match(html, /http-equiv="refresh" content="0; url=index\.html#outside-work"/);
  assert.doesNotMatch(html, /<main|id="outside-music"|id="outside-photography"|id="outside-travel"/);
});
```

- [ ] **Step 2: Run the redirect tests and verify failure**

Run:

```powershell
node --test tests/outside-route-split.test.mjs
```

Expected: FAIL because `outside-redirect.js` does not exist and `outside-work.html` still contains the visible aggregate page.

- [ ] **Step 3: Implement the pure resolver and redirect mount**

Create `outside-redirect.js`:

```js
export const OUTSIDE_ROUTES = Object.freeze({
  '#outside-music': 'music.html',
  '#outside-photography': 'photography.html',
  '#outside-travel': 'travel.html',
});

export function resolveOutsideRoute(hash = '') {
  return OUTSIDE_ROUTES[hash] ?? 'index.html#outside-work';
}

export function mountOutsideRedirect(locationLike = globalThis.location) {
  if (!locationLike?.replace) return '';
  const target = resolveOutsideRoute(locationLike.hash);
  locationLike.replace(target);
  return target;
}

if (typeof window !== 'undefined') mountOutsideRedirect(window.location);
```

Replace `outside-work.html` with a minimal semantic compatibility document containing the existing favicon, `noindex`, the module script, the no-JavaScript homepage refresh, and a single fallback link inside `<noscript>`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Outside Work | Mukun Sun</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <noscript><meta http-equiv="refresh" content="0; url=index.html#outside-work"></noscript>
  <script type="module" src="outside-redirect.js"></script>
</head>
<body><noscript><a href="index.html#outside-work">Return to Outside Work</a></noscript></body>
</html>
```

- [ ] **Step 4: Run the redirect tests and verify pass**

Run:

```powershell
node --test tests/outside-route-split.test.mjs
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit the compatibility route**

```powershell
git add -- outside-redirect.js outside-work.html tests/outside-route-split.test.mjs
git commit -m "add outside work route compatibility"
```

---

### Task 2: Independent Music page with a full-width timeline

**Files:**

- Create: `music.html`
- Modify: `detail.css`
- Modify: `i18n.js`
- Modify: `tests/outside-route-split.test.mjs`
- Modify: `tests/detail-pages.test.mjs`
- Modify: `tests/i18n.test.mjs`

**Interfaces:**

- Consumes: the approved Music content and media previously in `outside-work.html` at commit `a6094d1`.
- Produces: route key `music` in `PAGE_KEYS`, `LANGUAGES.en.metadata.music`, and `LANGUAGES.zh.metadata.music`.
- Produces: `music.html` section IDs `music-intro`, `music-timeline`, and `music-study`.
- Produces: CSS layout hooks `.music-page-intro`, `.music-timeline`, `.music-event`, `.music-event--media`, `.music-event-meta`, `.music-event-copy`, and `.music-event-media`.

- [ ] **Step 1: Add failing Music route and width-contract tests**

Extend `tests/outside-route-split.test.mjs`:

```js
test('Music is a standalone bilingual route with a full-width timeline', async () => {
  const html = await readFile(new URL('../music.html', import.meta.url), 'utf8');
  const css = await readFile(new URL('../detail.css', import.meta.url), 'utf8');
  assert.match(html, /data-page="music"/);
  assert.match(html, /<section[^>]+id="music-intro"/);
  assert.match(html, /<section[^>]+id="music-timeline"/);
  assert.match(html, /<section[^>]+id="music-study"/);
  assert.equal((html.match(/class="music-event(?:\s|\")/g) ?? []).length, 9);
  assert.match(html, /https:\/\/www\.youtube\.com\/live\/OFijT_vkp8c\?si=OqEdKbXtynljWJtd/);
  assert.match(css, /\.music-page-content\{[^}]*grid-column:1\/-1/);
  assert.match(css, /\.music-event--media\{[^}]*grid-template-columns:minmax\(132px,[^)]+\) minmax\(0,1fr\) minmax\(240px,[^)]+\)/);
  assert.match(css, /\.music-event:not\(\.music-event--media\) \.music-event-copy\{[^}]*grid-column:2\/-1/);
});
```

Update the route arrays in `tests/detail-pages.test.mjs` and `tests/i18n.test.mjs` to require `music.html` with `data-page="music"`. Update `PAGE_KEYS` expectations to include `music`, `photography`, and `travel` and remove `outside`.

- [ ] **Step 2: Run focused tests and verify failure**

Run:

```powershell
node --test tests/outside-route-split.test.mjs tests/detail-pages.test.mjs tests/i18n.test.mjs
```

Expected: FAIL because `music.html`, the `music` dictionaries, and the full-width layout hooks do not exist.

- [ ] **Step 3: Create the Music route from approved content**

Create `music.html` using the shared `detail.css`, `detail.js`, and cache-busted `i18n.js`. Use this complete navigation block:

```html
<nav class="detail-nav" id="music-nav" aria-label="Music navigation">
  <a class="brand" href="index.html">Mukun Sun · Music</a>
  <div class="nav-actions">
    <div class="links">
      <a href="music.html" aria-current="page">Music</a>
      <a href="photography.html">Photography</a>
      <a href="travel.html">Travel</a>
    </div>
    <details class="compact-nav">
      <summary aria-label="Open music navigation">Sections</summary>
      <div class="compact-links" role="navigation" aria-label="Music sections">
        <a href="music.html" aria-current="page">Music</a>
        <a href="photography.html">Photography</a>
        <a href="travel.html">Travel</a>
        <a href="index.html#outside-work">Return home</a>
      </div>
    </details>
    <a class="back-link" href="index.html#outside-work">← Return home</a>
    <div class="lang-switch" role="group" aria-label="Language">
      <button type="button" class="active" data-lang="en" aria-pressed="true">EN</button>
      <button type="button" data-lang="zh" aria-pressed="false">中文</button>
    </div>
  </div>
</nav>
```

The `<main class="detail-wrap">` hierarchy is, in order: `header#music-hero`, `section#music-intro`, `section#music-timeline`, and `section#music-study`. Move all nine approved events and both study entries without altering their facts. Mark `music-artist-finalist`, `music-grand-ball`, `music-campus-concert`, and `music-welcome-gala` with `class="music-event music-event--media"`; use `class="music-event"` for the five text-only events. Keep the Jazz Fest lead image in `music-intro` rather than duplicating it inside `music-jazz-fest`.

Use this exact event structure for the first media event and apply the named hooks to the remaining approved entries:

```html
<article class="music-event music-event--media" id="music-artist-finalist">
  <div class="music-event-meta"><time datetime="2026-04-14">Apr 14, 2026</time><span>Cedar City, Utah</span></div>
  <div class="music-event-copy">
    <h2>Finalist · SUU International Student Artist</h2>
    <p>Named a finalist, then organized rehearsals and coordinated the band for a performance at the SUU Alumni Center. Upright bass.</p>
  </div>
  <figure class="detail-media music-event-media" data-reveal="media">
    <a class="media-button" href="assets/music/nomination/with_friends.jpg" data-enlarge><img src="assets/music/nomination/with_friends.jpg" width="1279" height="1706" alt="Mukun Sun with the band for the SUU International Student Artist performance" loading="lazy" decoding="async"></a>
    <figcaption>After the Alumni Center performance</figcaption>
  </figure>
</article>
```

- [ ] **Step 4: Implement the full-width timeline layout**

Add token-based rules to `detail.css`:

```css
.music-page-section{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(32px,6vw,88px);padding-block:clamp(72px,10vw,144px);border-bottom:1px solid var(--color-rule);}
.music-page-content{grid-column:1/-1;padding-block:clamp(56px,8vw,104px);border-bottom:1px solid var(--color-rule);}
.music-event{display:grid;grid-template-columns:minmax(132px,.34fr) minmax(0,1fr);gap:clamp(24px,4vw,56px);padding-block:clamp(28px,4vw,48px);border-top:1px solid var(--color-rule);}
.music-event--media{grid-template-columns:minmax(132px,.28fr) minmax(0,1fr) minmax(240px,.72fr);}
.music-event:not(.music-event--media) .music-event-copy{grid-column:2/-1;max-width:68ch;}
.music-event-media{min-width:0;align-self:start;}
@media(max-width:60rem){.music-page-section{grid-template-columns:minmax(0,1fr)}.music-event--media{grid-template-columns:minmax(132px,.32fr) minmax(0,1fr)}.music-event-media{grid-column:2;}}
@media(max-width:40rem){.music-event,.music-event--media{grid-template-columns:minmax(0,1fr)}.music-event-copy,.music-event:not(.music-event--media) .music-event-copy,.music-event-media{grid-column:auto;}}
```

Keep `html` and `body` on `overflow-x:clip`. Do not introduce raw colors, a new font, or new motion behavior.

- [ ] **Step 5: Move Music copy and attributes into page-scoped dictionaries**

In `i18n.js`:

```js
export const PAGE_KEYS = ['home', 'vertex', 'campus', 'hotel', 'visual', 'music', 'photography', 'travel'];
```

Add `metadata.music` in both languages and rename the aggregate Music selectors to `#music-nav`, `#music-hero`, `#music-intro`, `#music-timeline`, `#music-study`, `#music-dialog`, and `#music-footer`, while retaining the stable event IDs. Add page-scoped nav, hero, footer, dialog, caption, event, and image-alt entries. Do not translate proper venue or ensemble names beyond the already approved Chinese wording.

- [ ] **Step 6: Run the Music and bilingual tests**

Run:

```powershell
node --test tests/outside-route-split.test.mjs tests/detail-pages.test.mjs tests/i18n.test.mjs
```

Expected: all focused tests pass; no selector is assigned to the wrong route.

- [ ] **Step 7: Commit the Music route**

```powershell
git add -- music.html detail.css i18n.js tests/outside-route-split.test.mjs tests/detail-pages.test.mjs tests/i18n.test.mjs
git commit -m "split music into a full width route"
```

---

### Task 3: Independent Photography and Travel pages

**Files:**

- Create: `photography.html`
- Create: `travel.html`
- Modify: `detail.css`
- Modify: `i18n.js`
- Modify: `tests/outside-route-split.test.mjs`
- Modify: `tests/detail-pages.test.mjs`
- Modify: `tests/i18n.test.mjs`
- Modify: `tests/media-contract.test.mjs`

**Interfaces:**

- Produces: route keys `photography` and `travel` with complete English/Chinese metadata and selector dictionaries.
- Produces: `photography-gallery` and `travel-notes` content regions.
- Consumes: only the five approved `.webp` photographs already in the public site.

- [ ] **Step 1: Add failing route and single-owner media tests**

Extend `tests/outside-route-split.test.mjs`:

```js
test('Photography and Travel are independent bilingual routes', async () => {
  const [photography, travel] = await Promise.all([
    readFile(new URL('../photography.html', import.meta.url), 'utf8'),
    readFile(new URL('../travel.html', import.meta.url), 'utf8'),
  ]);
  assert.match(photography, /data-page="photography"/);
  assert.match(photography, /id="photography-gallery"/);
  assert.match(travel, /data-page="travel"/);
  assert.match(travel, /id="travel-notes"/);
  assert.doesNotMatch(`${photography}\n${travel}`, /coming soon|待更新|敬请期待/i);
});

test('Photography and Travel images each have one primary route', async () => {
  const [photography, travel] = await Promise.all([
    readFile(new URL('../photography.html', import.meta.url), 'utf8'),
    readFile(new URL('../travel.html', import.meta.url), 'utf8'),
  ]);
  const files = [
    'building.webp', 'chongqing.webp', 'santa_monica_beach.webp',
    'tongren.webp', 'walter_disney.webp',
  ];
  for (const file of files) {
    const count = (photography.match(new RegExp(file, 'g')) ?? []).length
      + (travel.match(new RegExp(file, 'g')) ?? []).length;
    assert.equal(count, 2, `${file}: one href and one img on one route`);
  }
});
```

The exact editorial allocation is:

- Photography: `building.webp`, `chongqing.webp`, `walter_disney.webp`
- Travel: `santa_monica_beach.webp`, `tongren.webp`

Each route uses each assigned file once as a link and once as its nested image, which explains the expected count of 2.

- [ ] **Step 2: Run focused tests and verify failure**

Run:

```powershell
node --test tests/outside-route-split.test.mjs tests/detail-pages.test.mjs tests/i18n.test.mjs tests/media-contract.test.mjs
```

Expected: FAIL because the two route files and their dictionaries do not exist.

- [ ] **Step 3: Create Photography as a varied image sequence**

Create `photography.html` with the shared detail shell, `data-page="photography"`, sibling navigation, a concise introduction, and `id="photography-gallery"`. Preserve the approved intrinsic dimensions:

```html
<figure class="detail-media photography-frame photography-frame--wide" data-reveal="media">
  <a class="media-button" href="assets/photography/building.webp" data-enlarge>
    <img src="assets/photography/building.webp" width="1448" height="1086" alt="White residential buildings against a clear blue sky" loading="lazy" decoding="async">
  </a>
  <figcaption>Blue and concrete</figcaption>
</figure>
```

Add these two linked figures beside the Building figure. Vary visual scale through classes, not image cropping:

```html
<figure class="detail-media photography-frame" data-reveal="media"><a class="media-button" href="assets/photography/chongqing.webp" data-enlarge><img src="assets/photography/chongqing.webp" width="1086" height="1448" alt="Illuminated bridge structure at night in Chongqing" loading="lazy" decoding="async"></a><figcaption>Chongqing · Night structure</figcaption></figure>
<figure class="detail-media photography-frame" data-reveal="media"><a class="media-button" href="assets/photography/walter_disney.webp" data-enlarge><img src="assets/photography/walter_disney.webp" width="1086" height="1448" alt="Curved metal architecture at Walt Disney Concert Hall" loading="lazy" decoding="async"></a><figcaption>Walt Disney Concert Hall · Curves</figcaption></figure>
```

- [ ] **Step 4: Create Travel as concise place notes**

Create `travel.html` with `data-page="travel"`, sibling navigation, `id="travel-notes"`, and two factual place entries:

```html
<article class="travel-note">
  <div class="travel-note-copy">
    <p class="detail-meta">Santa Monica, California</p>
    <h2>Sunset by the Pacific</h2>
  </div>
  <figure class="detail-media" data-reveal="media">
    <a class="media-button" href="assets/photography/santa_monica_beach.webp" data-enlarge>
      <img src="assets/photography/santa_monica_beach.webp" width="1350" height="1800" alt="A seabird crossing the sunset at Santa Monica Beach" loading="lazy" decoding="async">
    </a>
    <figcaption>Santa Monica · Sunset</figcaption>
  </figure>
</article>
```

Add Tongren with `tongren.webp` (`1086 × 1448`), heading `Water and paths`, and the existing factual caption. Do not add a date, recommendation, itinerary, or personal reflection not supplied by the user.

- [ ] **Step 5: Add route-specific compositions and bilingual entries**

In `detail.css`, add token-based layouts:

```css
.photography-sequence{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:clamp(24px,5vw,72px);align-items:start;}
.photography-frame--wide{grid-column:1/-1;max-width:920px;}
.travel-notes{display:grid;gap:clamp(56px,8vw,112px);}
.travel-note{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(32px,6vw,88px);align-items:start;}
@media(max-width:40rem){.photography-sequence,.travel-note{grid-template-columns:minmax(0,1fr)}.photography-frame--wide{grid-column:auto;}}
```

Add complete `photography` and `travel` metadata, nav, hero, captions, headings, footer, dialog, and image-alt selectors in both language dictionaries.

- [ ] **Step 6: Run route, media, and bilingual tests**

Run:

```powershell
node --test tests/outside-route-split.test.mjs tests/detail-pages.test.mjs tests/i18n.test.mjs tests/media-contract.test.mjs
```

Expected: all focused tests pass and each approved photograph is owned by one route.

- [ ] **Step 7: Commit the Photography and Travel routes**

```powershell
git add -- photography.html travel.html detail.css i18n.js tests/outside-route-split.test.mjs tests/detail-pages.test.mjs tests/i18n.test.mjs tests/media-contract.test.mjs
git commit -m "split photography and travel routes"
```

---

### Task 4: Homepage direct entry and cache migration

**Files:**

- Modify: `index.html`
- Modify: `i18n.js`
- Modify: `tests/outside-route-split.test.mjs`
- Modify: `tests/professional-personal-site.test.mjs`
- Modify: `tests/content-revision.test.mjs`
- Modify: `tests/responsive-contract.test.mjs`

**Interfaces:**

- Consumes: the three production routes from Tasks 2 and 3.
- Produces: direct card hrefs `music.html`, `photography.html`, and `travel.html`.
- Produces: one shared cache key used by all public HTML routes and asserted by tests.

- [ ] **Step 1: Add failing homepage direct-link tests**

Add to `tests/outside-route-split.test.mjs`:

```js
test('homepage is the only visible Outside Work index', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /class="outside-card outside-card--music" href="music\.html"/);
  assert.match(html, /class="outside-card outside-card--photography" href="photography\.html"/);
  assert.match(html, /class="outside-card outside-card--travel" href="travel\.html"/);
  assert.doesNotMatch(html, /outside-work\.html#outside-|class="outside-action"/);
});
```

Update `tests/professional-personal-site.test.mjs` to expect the same three direct destinations. Update cache assertions in `tests/responsive-contract.test.mjs` only after choosing the new cache key.

- [ ] **Step 2: Run homepage tests and verify failure**

Run:

```powershell
node --test tests/outside-route-split.test.mjs tests/professional-personal-site.test.mjs tests/content-revision.test.mjs tests/responsive-contract.test.mjs
```

Expected: FAIL because homepage cards still point to fragment URLs and the aggregate action remains.

- [ ] **Step 3: Change the three card destinations and remove the redundant action**

In `index.html`, replace the three current fragment destinations with these exact start tags while preserving each card's existing children and closing tag:

```html
<a class="outside-card outside-card--music" href="music.html">
<a class="outside-card outside-card--photography" href="photography.html">
<a class="outside-card outside-card--travel" href="travel.html">
```

Delete the complete `<a class="outside-action" href="outside-work.html">Explore outside work <span aria-hidden="true">→</span></a>` element. Remove its English and Chinese selector entries from `i18n.js` rather than leaving dead copy.

- [ ] **Step 4: Refresh the shared i18n cache key**

Set:

```js
export const I18N_CACHE_KEY = '20260730-outside-routes';
```

Update the `?v=20260730-outside-routes` import in `index.html`, all project detail routes, `music.html`, `photography.html`, `travel.html`, and their exact test expectations. `outside-work.html` does not import `i18n.js`.

- [ ] **Step 5: Run homepage and cache tests**

Run:

```powershell
node --test tests/outside-route-split.test.mjs tests/professional-personal-site.test.mjs tests/content-revision.test.mjs tests/responsive-contract.test.mjs tests/i18n.test.mjs
```

Expected: all focused tests pass and no production link uses `outside-work.html#...`.

- [ ] **Step 6: Commit direct entry changes**

```powershell
git add -- index.html i18n.js music.html photography.html travel.html projects/campus-campaign.html projects/hotel-jazz.html projects/vertex-reddit.html projects/visual-work.html tests/outside-route-split.test.mjs tests/professional-personal-site.test.mjs tests/content-revision.test.mjs tests/responsive-contract.test.mjs tests/i18n.test.mjs
git commit -m "link homepage directly to outside work routes"
```

---

### Task 5: Full responsive, interaction, and publication verification

**Files:**

- Modify if a verified failure requires it: `detail.css`, `detail.js`, `music.html`, `photography.html`, `travel.html`, or their tests.
- Do not modify unrelated files.

**Interfaces:**

- Consumes: all routes and tests from Tasks 1–4.
- Produces: a verified main-branch commit ready for GitHub Pages.

- [ ] **Step 1: Run static and complete automated verification**

Run:

```powershell
git diff --check
node --test tests/*.test.mjs
```

Expected: `git diff --check` exits 0 and the complete Node test suite reports 0 failures.

- [ ] **Step 2: Serve the site locally and verify the redirect behavior**

Start a local static server from the repository root:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Verify in the browser:

- `/outside-work.html#outside-music` lands on `/music.html`.
- `/outside-work.html#outside-photography` lands on `/photography.html`.
- `/outside-work.html#outside-travel` lands on `/travel.html`.
- `/outside-work.html` lands on `/#outside-work`.

Expected: no visible intermediary menu and no extra Back-history entry caused by the redirect.

- [ ] **Step 3: Verify route interaction contracts**

For each of `music.html`, `photography.html`, and `travel.html`:

- switch from English to Chinese and verify the page title, nav, visible copy, captions, and alt text update;
- switch back to English and verify persistence after reload;
- open one image dialog, close it with Escape, and verify focus returns to the source link;
- enable reduced motion and verify content remains visible without spatial reveals;
- inspect console errors and broken image requests.

Expected: all checks pass without adding route-specific JavaScript.

- [ ] **Step 4: Verify responsive layout at the required widths**

At 768, 414, 375, and 320 pixels, collect:

```js
({
  clientWidth: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth,
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
})
```

Expected on every route and width: `overflow === 0`.

Additionally verify:

- Music desktop: timeline spans the main content width; media events show date, copy, and image without a large empty left rail.
- Music 768: media moves below or alongside copy without a stranded column.
- Music 414/375/320: each event is one column and all clickable labels stay on one line.
- Photography: natural ratios remain intact at every width.
- Travel: place copy and media collapse cleanly without duplicate imagery.

- [ ] **Step 5: Run Hallmark handoff checks**

Confirm all answers are “no”:

- Did route splitting introduce a second visible chooser?
- Is any subject page a generic repeated card grid?
- Does Music still leave most of the left side empty beside the full timeline?
- Was any image forced into an incorrect common ratio?
- Was any unsupported personal or travel copy invented?
- Did any page introduce raw colors, a new font, italic display type, fake metrics, or placeholder content?
- Did motion, focus, reduced-motion, or mobile behavior regress?

Expected: seven “no” answers.

- [ ] **Step 6: Commit only verified corrections, if any**

If Steps 1–5 required code corrections:

```powershell
git add -- detail.css detail.js music.html photography.html travel.html tests/outside-route-split.test.mjs tests/detail-pages.test.mjs tests/i18n.test.mjs tests/media-contract.test.mjs tests/responsive-contract.test.mjs
git commit -m "polish outside work route split"
```

If no correction was required, do not create an empty commit.

- [ ] **Step 7: Confirm scope and publish**

Run:

```powershell
git status -sb
git diff origin/main...HEAD --stat
git push origin main
gh run list --limit 1 --json databaseId,status,conclusion,headSha
```

Stage or push only the commits from this plan. Leave unrelated untracked TA photos, source photography files, `.superpowers/`, `PROJECT_HANDOFF.md`, and unused music images untouched.

Expected: `origin/main` reaches the verified commit and the matching GitHub Pages deployment completes successfully.
