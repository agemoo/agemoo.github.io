# Glass Navigation and Gallery Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add restrained frosted navigation, route-specific Outside Work exposure, a full-width Photography gallery, a Travel homepage cover, and reliable bilingual internship actions.

**Architecture:** Preserve the static HTML and shared-token architecture. New visual values live in `tokens.css`; homepage-only structure stays in `index.html`; shared detail-route composition stays in `detail.css`; bilingual content and the multi-node update behavior stay in `i18n.js`.

**Tech Stack:** Static HTML, CSS custom properties, vanilla JavaScript ES modules, Node.js built-in test runner, Playwright with installed Chrome for visual verification.

## Global Constraints

- Reuse `assets/travel/bryce_canyon.webp`; create or delete no production image or page.
- Navigation uses a 76% soft surface, an 86%–91% existing dense surface, 18px blur, `1.12` saturation, and no drop shadow.
- Photography remains dark; Travel is bright and expansive; Music is moderately brighter.
- English remains the default language and dark remains the default theme.
- Preserve bilingual parity, keyboard focus, reduced-motion behavior, intrinsic image dimensions, and enlargeable Photography sources.
- Do not stage unrelated user asset moves, README changes, scratch folders, or raw source images.

---

### Task 1: Translate Every Matching Internship Action

**Files:**
- Modify: `i18n.js:858-888`
- Modify: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: `LANGUAGES[language].copy`, where each key is a CSS selector and each value is translated HTML.
- Produces: `applyLanguage(value, doc, storage, persist)`, updating every element matched by each copy selector while retaining a single-element fallback for test doubles.

- [ ] **Step 1: Write the failing regression test**

Add a test that supplies two `.experience-link` elements through `querySelectorAll`, calls `applyLanguage('zh', doc, null)`, and asserts both `innerHTML` values equal `LANGUAGES.zh.copy['#experience .experience-link']`.

```js
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
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="every node matched" tests/i18n.test.mjs`

Expected: FAIL because only `doc.querySelector(selector)` is used for copy.

- [ ] **Step 3: Implement multi-node copy application**

Replace the single-element copy loop with an all-match path plus fallback:

```js
for (const [selector, html] of Object.entries(config.copy)) {
  const elements = doc.querySelectorAll?.(selector) ?? [];
  if (elements.length) {
    elements.forEach((element) => { element.innerHTML = html; });
    continue;
  }
  const element = doc.querySelector(selector);
  if (element) element.innerHTML = html;
}
```

- [ ] **Step 4: Run the focused i18n suite**

Run: `node --test tests/i18n.test.mjs tests/internship-experience.test.mjs`

Expected: all tests PASS.

- [ ] **Step 5: Commit the translation repair**

```powershell
git add -- i18n.js tests/i18n.test.mjs
git commit -m "fix bilingual internship actions"
```

### Task 2: Introduce the Frosted Navigation Material

**Files:**
- Modify: `tokens.css`
- Modify: `index.html:94-104`
- Modify: `detail.css:15-19`
- Modify: `tests/theme-system.test.mjs`
- Modify: `tests/detail-pages.test.mjs`

**Interfaces:**
- Consumes: existing `--effect-nav-surface` and `--color-rule` tokens.
- Produces: `--effect-nav-surface-soft`, `--effect-nav-blur`, and `--effect-nav-saturation` tokens used by `.nav` and `.detail-nav`.

- [ ] **Step 1: Write failing token and CSS contract tests**

Assert that both palettes define the soft surface and that both navigation shells consume all three new tokens:

```js
for (const token of ['--effect-nav-surface-soft', '--effect-nav-blur', '--effect-nav-saturation']) {
  assert.match(tokens, new RegExp(`${token.replaceAll('-', '\\-')}:`), token);
}
assert.match(home, /\.nav\{[^}]*background:var\(--effect-nav-surface-soft\);[^}]*backdrop-filter:blur\(var\(--effect-nav-blur\)\) saturate\(var\(--effect-nav-saturation\)\);/);
assert.match(css, /\.detail-nav\{[^}]*background:var\(--effect-nav-surface-soft\);[^}]*backdrop-filter:blur\(var\(--effect-nav-blur\)\) saturate\(var\(--effect-nav-saturation\)\);/);
```

- [ ] **Step 2: Run focused tests and verify failure**

Run: `node --test tests/theme-system.test.mjs tests/detail-pages.test.mjs`

Expected: FAIL because the soft glass tokens and initial-state glass are absent.

- [ ] **Step 3: Add semantic glass tokens**

In both theme blocks add:

```css
--effect-nav-surface-soft:color-mix(in oklab,var(--color-paper) 76%,transparent);
--effect-nav-blur:18px;
--effect-nav-saturation:1.12;
```

Keep the existing dense `--effect-nav-surface` values unchanged.

- [ ] **Step 4: Apply the material to both navigation shells**

Set the initial `.nav` and `.detail-nav` background to `var(--effect-nav-surface-soft)`, bottom border to `var(--color-rule)`, and both prefixed and unprefixed backdrop filters to the new blur and saturation tokens. Keep `.solid` responsible only for switching to `var(--effect-nav-surface)`.

- [ ] **Step 5: Run focused navigation tests**

Run: `node --test tests/theme-system.test.mjs tests/detail-pages.test.mjs tests/responsive-contract.test.mjs`

Expected: all tests PASS.

- [ ] **Step 6: Commit the navigation material**

```powershell
git add -- tokens.css index.html detail.css tests/theme-system.test.mjs tests/detail-pages.test.mjs
git commit -m "add restrained frosted navigation"
```

### Task 3: Add Travel Cover and Route-Specific Hero Exposure

**Files:**
- Modify: `index.html:522-536`
- Modify: `tokens.css`
- Modify: `detail.css:39-53`
- Modify: `i18n.js:55-61,468-474`
- Modify: `tests/media-contract.test.mjs`
- Modify: `tests/detail-pages.test.mjs`

**Interfaces:**
- Consumes: `assets/travel/bryce_canyon.webp` at `1706×1279`.
- Produces: a third `.outside-media` on the homepage and route-scoped hero tokens for Music and Travel.

- [ ] **Step 1: Write failing media and hero tests**

Add assertions for the Travel card image and bilingual alt entries:

```js
assert.match(home, /outside-card--travel[\s\S]*?<img src="assets\/travel\/bryce_canyon\.webp" width="1706" height="1279"/);
assert.equal(LANGUAGES.en.attributes['#outside-work .outside-card:nth-child(3) img'].alt, 'Bryce Canyon amphitheater in warm afternoon light');
assert.equal(LANGUAGES.zh.attributes['#outside-work .outside-card:nth-child(3) img'].alt, '午后暖光下的布莱斯峡谷露天剧场');
```

Add route-exposure assertions:

```js
assert.match(css, /html\[data-page="music"\][\s\S]*--hero-brightness:var\(--effect-music-hero-brightness\)/);
assert.match(css, /html\[data-page="travel"\][\s\S]*--hero-brightness:var\(--effect-travel-hero-brightness\)/);
assert.match(css, /outside-hero-media img\{[^}]*brightness\(var\(--hero-brightness,var\(--effect-outside-brightness\)\)\)/);
```

- [ ] **Step 2: Run focused tests and verify failure**

Run: `node --test tests/media-contract.test.mjs tests/detail-pages.test.mjs tests/i18n.test.mjs`

Expected: FAIL because Travel has no homepage image and hero exposure is shared.

- [ ] **Step 3: Add the Travel homepage image and translations**

Insert this before the Travel card title:

```html
<span class="outside-media"><img src="assets/travel/bryce_canyon.webp" width="1706" height="1279" alt="Bryce Canyon amphitheater in warm afternoon light" loading="lazy" decoding="async"></span>
```

Add the matching English and Chinese attribute selectors to `i18n.js`.

- [ ] **Step 4: Add route-specific exposure tokens**

Define semantic values in both theme blocks for Music and Travel brightness, saturation, and scrims. Dark-theme targets are Music brightness `0.98`, Travel brightness `1.06`, and Travel saturation `1.04`; light-theme targets are Music `1.02`, Travel `1.08`, and Travel saturation `1.03`. Define scrims as named token gradients, with Travel retaining contrast mainly on the left and Music remaining darker than Travel.

- [ ] **Step 5: Route the shared hero through local variables**

Set `--hero-brightness`, `--hero-saturation`, and `--hero-scrim` on the Music and Travel hero rules. Update `.outside-hero-media img` and `::after` to consume those variables with shared-token fallbacks. Leave Photography without route overrides.

- [ ] **Step 6: Run focused Outside Work tests**

Run: `node --test tests/media-contract.test.mjs tests/detail-pages.test.mjs tests/i18n.test.mjs tests/professional-personal-site.test.mjs`

Expected: all tests PASS except the known dirty-tree missing legacy images if the full media existence test is included; this focused set should be interpreted against the scoped assertions and re-run clean at final verification.

- [ ] **Step 7: Commit the Travel and hero work**

```powershell
git add -- index.html tokens.css detail.css i18n.js tests/media-contract.test.mjs tests/detail-pages.test.mjs
git commit -m "differentiate outside work imagery"
```

### Task 4: Recompose the Photography Gallery

**Files:**
- Modify: `photography.html:43-63`
- Modify: `detail.css:103-110,138-140`
- Modify: `i18n.js:314-322,727-735`
- Modify: `tests/detail-pages.test.mjs`
- Modify: `tests/i18n.test.mjs`
- Modify: `tests/responsive-contract.test.mjs`

**Interfaces:**
- Consumes: existing `.photography-frame--portrait` and `.photography-frame--landscape` orientation classes.
- Produces: `.photography-gallery-head` full-width band and `.photography-gallery-body` full-width sequence wrapper.

- [ ] **Step 1: Write failing structure, caption, and responsive tests**

```js
assert.match(photography, /id="photography-gallery"[\s\S]*?class="photography-gallery-head"[\s\S]*?id="photography-gallery-title"[\s\S]*?class="photography-intro"[\s\S]*?class="photography-gallery-body"[\s\S]*?class="photography-sequence"/);
assert.match(css, /#photography-gallery\{[^}]*display:block;/);
assert.match(css, /\.photography-gallery-head\{[^}]*grid-template-columns:minmax\(0,1fr\) minmax\(0,[^)]+\);[^}]*border-top:1px solid var\(--color-rule\);[^}]*border-bottom:1px solid var\(--color-rule\);/);
assert.match(css, /\.photography-frame--landscape\{[^}]*grid-column:1\/-1;[^}]*max-width:none;/);
assert.equal(LANGUAGES.en.copy['#photography-gallery .detail-media:nth-child(6) figcaption'], 'San Francisco · Boats on blue water');
assert.equal(LANGUAGES.zh.copy['#photography-gallery .detail-media:nth-child(6) figcaption'], '旧金山 · 蓝色水面上的船只');
```

Add a mobile assertion that `.photography-gallery-head` and `.photography-sequence` collapse to `minmax(0,1fr)`.

- [ ] **Step 2: Run focused tests and verify failure**

Run: `node --test tests/detail-pages.test.mjs tests/i18n.test.mjs tests/responsive-contract.test.mjs`

Expected: FAIL because the generic detail-section two-column shell is still active.

- [ ] **Step 3: Update Photography markup**

Move the heading and introduction into:

```html
<header class="photography-gallery-head">
  <h2 id="photography-gallery-title">Selected photographs</h2>
  <p class="photography-intro">Photography is another way I study light, objects, and atmosphere.</p>
</header>
<div class="photography-gallery-body">
  <div class="photography-sequence">
  </div>
</div>
```

Move the existing seven figure elements, unchanged and in their current order, between the shown `.photography-sequence` tags. Change the static English boats caption at the same time.

- [ ] **Step 4: Add full-width gallery CSS**

Override `#photography-gallery` to `display:block`. Give `.photography-gallery-head` a two-track safe grid, top and bottom rules, coordinated vertical padding, centered alignment, and zero empty side column. Set `.photography-gallery-body` below it with full width and a deliberate top gap. Remove the landscape `max-width:920px` cap; keep portrait images in two equal columns and landscape images spanning both.

- [ ] **Step 5: Add mobile collapse and bilingual caption**

At 40rem, collapse the gallery head and sequence to one column. Update both language dictionaries with the approved captions.

- [ ] **Step 6: Run focused Photography tests**

Run: `node --test tests/detail-pages.test.mjs tests/i18n.test.mjs tests/responsive-contract.test.mjs`

Expected: all tests PASS.

- [ ] **Step 7: Commit the Photography composition**

```powershell
git add -- photography.html detail.css i18n.js tests/detail-pages.test.mjs tests/i18n.test.mjs tests/responsive-contract.test.mjs
git commit -m "recompose photography gallery"
```

### Task 5: Document, Audit, and Verify the Integrated Result

**Files:**
- Modify: `DESIGN.md`
- Verify: all production and test files changed in Tasks 1–4

**Interfaces:**
- Consumes: the final HTML/CSS/JS result.
- Produces: current design-system documentation, responsive screenshots, Hallmark gate results, and a clean full-suite result.

- [ ] **Step 1: Update design documentation**

Document the navigation material tokens, content-specific Outside Work exposure, full-width Photography gallery rule, and `querySelectorAll` bilingual-copy behavior in `DESIGN.md`.

- [ ] **Step 2: Run static checks**

Run:

```powershell
git diff --check -- DESIGN.md index.html detail.css tokens.css i18n.js photography.html tests
node --test tests/i18n.test.mjs tests/detail-pages.test.mjs tests/media-contract.test.mjs tests/responsive-contract.test.mjs tests/theme-system.test.mjs tests/internship-experience.test.mjs tests/professional-personal-site.test.mjs
```

Expected: scoped tests PASS apart from any dirty-tree-only missing legacy image; the clean snapshot in Step 5 is authoritative.

- [ ] **Step 3: Perform desktop visual review**

Serve locally and capture `index.html`, `music.html`, `photography.html`, and `travel.html` at 1440×900 and 1280×800. Confirm glass readability, bright Travel highlights, Music legibility, full-width gallery balance, and no clipped essential hero content.

- [ ] **Step 4: Perform mobile visual review**

Capture the same routes at 320×800, 375×812, 414×896, and 768×1024. Confirm no horizontal overflow, single-line navigation affordances, one-column gallery behavior, correct Travel crop, and readable bilingual content.

- [ ] **Step 5: Run Hallmark handoff audit**

Load `references/contract.md` and `references/slop-test.md`, score Philosophy, Hierarchy, Execution, Specificity, Restraint, and Variety, then verify all 58 gates answer no. Update the existing Hallmark stamp only if the score or gate status changes.

- [ ] **Step 6: Commit the integrated documentation**

```powershell
git add -- DESIGN.md
git commit -m "document glass and gallery refinements"
```

- [ ] **Step 7: Verify a clean committed snapshot**

Create a temporary archive from `HEAD`, extract it outside the repository, run `node --test tests/*.test.mjs`, and require `104+` tests with zero failures. Remove the temporary verification files if environment policy permits.

- [ ] **Step 8: Push scoped commits to main**

Run: `git push origin main`

Expected: remote `main` advances through only the plan and implementation commits; unrelated working-tree material remains unstaged.
