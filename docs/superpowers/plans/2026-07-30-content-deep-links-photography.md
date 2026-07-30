# Content, Photography, and Deep Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify the Vertex internship presentation, correct TA and education content, add five optimized photographs, rename Places to Travel, and make every Outside Work card open its exact detail section with motion-aware cross-page scrolling.

**Architecture:** Preserve the current static HTML/CSS/ES-module structure. Content remains bilingual through route-scoped selectors in `i18n.js`; homepage cards become independent real fragment links; `detail.js` adds a small exported initial-fragment enhancement that never replaces the no-JavaScript fallback. Optimized WebP derivatives are additive and originals remain unchanged.

**Tech Stack:** Static HTML5, CSS custom properties, ES modules, Node `node:test`, bundled Python + Pillow for deterministic WebP conversion, GitHub Pages.

## Global Constraints

- English remains the default language; English and Chinese selector coverage must stay equal.
- Use `Travel` / `旅行`; replace the `#outside-places` anchor with `#outside-travel`.
- Remove Vertex attribution material and defensive `representative` qualifiers without inventing sole-ownership or causal claims.
- Use only `building`, `chongqing`, `santa_monica_beach`, `tongren`, and `walter_disney`; never reference `已生成图像 1 (4).png`.
- Preserve the original image files; publish optimized WebP derivatives at natural aspect ratios.
- Preserve the dark editorial system, asymmetric Outside Work composition, no-JavaScript navigation, reduced-motion behavior, 44px compact targets, and root `overflow-x:clip`.
- Do not add dependencies to the repository.

---

### Task 1: Simplify Internship and Education Content

**Files:**
- Modify: `index.html`
- Modify: `projects/vertex-reddit.html`
- Modify: `i18n.js`
- Test: `tests/content-revision.test.mjs`
- Test: `tests/internship-experience.test.mjs`
- Test: `tests/vertex-evidence.test.mjs`
- Test: `tests/vertex-shell.test.mjs`
- Test: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: existing route-scoped `LANGUAGES.en.copy` and `LANGUAGES.zh.copy` selector dictionaries.
- Produces: Vertex markup with `#vertex-scope`, `#vertex-evidence`, and `#vertex-community` only; TA institution text `Southern Utah University`; a single SUU `.edu-secondary` line for the Business Analytics minor.

- [ ] **Step 1: Write failing content tests**

Add assertions equivalent to:

```js
assert.doesNotMatch(home, /experience-attribution|Attribution:/i);
assert.doesNotMatch(vertex, /vertex-attribution|Attribution boundary|representative/i);
assert.match(home, /<p class="experience-company">Southern Utah University<\/p>/);
assert.doesNotMatch(home, /Southern Utah University × Wuhan Polytechnic University/);
assert.match(home, /<p class="edu-secondary">Minor · Business Analytics<\/p>/);
assert.doesNotMatch(home, /Degree awarded upon completion at SUU/);
assert.doesNotMatch(JSON.stringify(LANGUAGES), /归因边界|归因说明|代表账号|完成 SUU 学位后同步授予/);
```

Also assert that `.edu-secondary` uses a larger/stronger token-based declaration than the old `10.5px` muted register, while remaining smaller than `.edu-degree`.

- [ ] **Step 2: Run focused tests and confirm RED**

Run:

```powershell
node --test tests/content-revision.test.mjs tests/internship-experience.test.mjs tests/vertex-evidence.test.mjs tests/vertex-shell.test.mjs tests/i18n.test.mjs
```

Expected: failures identify the existing attribution section/note, representative qualifiers, old TA institution, old degree note, and weak minor styling.

- [ ] **Step 3: Implement the minimal content and hierarchy changes**

In `index.html`:

- remove `.experience-attribution` CSS and markup;
- rewrite the proof line as `5 accounts · 793K views · up to 91.7% U.S. audience share`;
- change the TA company line to `Southern Utah University`;
- remove the second Wuhan `.edu-secondary` paragraph;
- strengthen `.edu-secondary` using existing font/color tokens, for example `font-size:clamp(12px,1.2vw,14px)`, `font-weight:600`, and `color:var(--amber)` without a badge background.

In `projects/vertex-reddit.html`:

- remove attribution navigation links and the full `#vertex-attribution` section;
- remove `representative` from the hero, scope, evidence table, and community copy;
- retain the supplied counts and accurate participation wording.

Mirror every copy/selector removal in `i18n.js`, including Chinese `社群` terminology.

- [ ] **Step 4: Run focused tests and confirm GREEN**

Run the Step 2 command.

Expected: all focused tests pass with zero failures.

- [ ] **Step 5: Commit Task 1**

```powershell
git add -- index.html projects/vertex-reddit.html i18n.js tests/content-revision.test.mjs tests/internship-experience.test.mjs tests/vertex-evidence.test.mjs tests/vertex-shell.test.mjs tests/i18n.test.mjs
git commit -m "refactor: simplify internship and education copy"
```

---

### Task 2: Add Curated Photography and Travel Structure

**Files:**
- Create: `assets/photography/building.webp`
- Create: `assets/photography/chongqing.webp`
- Create: `assets/photography/santa_monica_beach.webp`
- Create: `assets/photography/tongren.webp`
- Create: `assets/photography/walter_disney.webp`
- Modify: `index.html`
- Modify: `outside-work.html`
- Modify: `i18n.js`
- Test: `tests/detail-pages.test.mjs`
- Test: `tests/media-contract.test.mjs`
- Test: `tests/professional-personal-site.test.mjs`
- Test: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: source photographs under `assets/photography/` and shared detail `.detail-grid`, `.detail-media`, `[data-enlarge]` contracts.
- Produces: five WebP files; homepage real links to `#outside-music`, `#outside-photography`, and `#outside-travel`; detail sections with those exact IDs.

- [ ] **Step 1: Write failing media and structure tests**

Assert:

```js
for (const href of [
  'outside-work.html#outside-music',
  'outside-work.html#outside-photography',
  'outside-work.html#outside-travel',
]) assert.match(home, new RegExp(`href="${href}"`));

assert.doesNotMatch(home, /<a class="outside-gateway"[^>]*>[\s\S]*outside-grid/);
assert.match(outside, /id="outside-travel"/);
assert.doesNotMatch(outside + home + JSON.stringify(LANGUAGES), /outside-places|>Places<|地方/);
```

Assert all five `.webp` paths exist, are referenced with their real intrinsic dimensions, are wrapped in real `data-enlarge` links on the detail page, and `已生成图像 1 (4).png` is absent from production references.

- [ ] **Step 2: Run focused tests and confirm RED**

```powershell
node --test tests/detail-pages.test.mjs tests/media-contract.test.mjs tests/professional-personal-site.test.mjs tests/i18n.test.mjs
```

Expected: failures identify missing WebP files, the single wrapper link, old Places naming/anchor, and old Bass photography set.

- [ ] **Step 3: Generate deterministic WebP derivatives**

Use the bundled Python runtime and Pillow in a one-off formatting command. Preserve source dimensions except resize `santa_monica_beach.JPG` to 1800×1350; save all files as WebP quality 84 with method 6:

```powershell
$python='C:\Users\aquak\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
@'
from pathlib import Path
from PIL import Image

root = Path('assets/photography')
items = {
    'building.png': ('building.webp', None),
    'chongqing.png': ('chongqing.webp', None),
    'santa_monica_beach.JPG': ('santa_monica_beach.webp', (1800, 1350)),
    'tongren.png': ('tongren.webp', None),
    'walter_disney.png': ('walter_disney.webp', None),
}
for source_name, (output_name, size) in items.items():
    with Image.open(root / source_name) as image:
        image = image.convert('RGB')
        if size:
            image = image.resize(size, Image.Resampling.LANCZOS)
        image.save(root / output_name, 'WEBP', quality=84, method=6)
'@ | & $python -
```

Verify pixel dimensions and file sizes after generation.

- [ ] **Step 4: Implement homepage and detail markup**

- Keep `.outside-grid` as the shared asymmetric grid, but make each `.outside-card` a real `<a>` with its own fragment URL.
- Make `.outside-action` a separate link to `outside-work.html`.
- Update hover/focus selectors so each card responds independently without stacked scale effects.
- Use `walter_disney.webp` as the homepage Photography preview.
- Replace the Bass trio in the Photography detail section with the five WebPs at natural ratios and concise captions.
- Rename Places/地方 to Travel/旅行 and `#outside-places` to `#outside-travel` across markup and bilingual selectors.
- Keep Travel text-led and do not duplicate photography images.

- [ ] **Step 5: Run focused tests and confirm GREEN**

Run the Step 2 command.

Expected: all focused tests pass.

- [ ] **Step 6: Commit Task 2**

```powershell
git add -- assets/photography/*.webp index.html outside-work.html i18n.js tests/detail-pages.test.mjs tests/media-contract.test.mjs tests/professional-personal-site.test.mjs tests/i18n.test.mjs
git commit -m "feat: add photography and outside work deep links"
```

---

### Task 3: Enhance Initial Fragment Navigation

**Files:**
- Modify: `outside-work.html`
- Modify: `detail.js`
- Test: `tests/detail-pages.test.mjs`
- Test: `tests/responsive-contract.test.mjs`

**Interfaces:**
- Produces: exported `mountInitialFragmentNavigation(options = {})` in `detail.js`.
- Consumes: `window.__initialOutsideHash`, the exact `#outside-music`, `#outside-photography`, or `#outside-travel` target, `matchMedia`, `history.replaceState`, and `Element.scrollIntoView`.

- [ ] **Step 1: Write the failing behavior contract**

Add source-level assertions that:

- the Outside Work head captures only `#outside-music`, `#outside-photography`, or `#outside-travel` into `window.__initialOutsideHash` and removes it before body parsing;
- `detail.js` exports `mountInitialFragmentNavigation`;
- the function validates the hash, restores it with `history.replaceState`, uses `behavior: 'smooth'` only when fine-pointer, wider than 40rem, and no reduced-motion preference all match, otherwise uses `behavior: 'auto'`;
- missing targets return without throwing;
- `boot()` invokes the function after page motion is mounted.

- [ ] **Step 2: Run focused tests and confirm RED**

```powershell
node --test tests/detail-pages.test.mjs tests/responsive-contract.test.mjs
```

Expected: failures identify the missing capture script and missing exported enhancement.

- [ ] **Step 3: Add the progressive enhancement**

Place this bounded capture before the Outside Work stylesheet:

```html
<script>
(function(window){
  const allowed = new Set(['#outside-music','#outside-photography','#outside-travel']);
  if (!allowed.has(window.location.hash)) return;
  window.__initialOutsideHash = window.location.hash;
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
})(window);
</script>
```

Implement `mountInitialFragmentNavigation(options = {})` with injectable `window`, `document`, and `requestAnimationFrame` defaults. On the second animation frame, reveal the target, call `scrollIntoView({ behavior, block: 'start' })`, then restore the hash with `history.replaceState`. Use `auto` under reduced motion, narrow width, or coarse pointer. Keep standard hash behavior when JavaScript is disabled.

- [ ] **Step 4: Run focused tests and confirm GREEN**

Run the Step 2 command.

Expected: all focused tests pass.

- [ ] **Step 5: Commit Task 3**

```powershell
git add -- outside-work.html detail.js tests/detail-pages.test.mjs tests/responsive-contract.test.mjs
git commit -m "feat: animate outside work deep links"
```

---

### Task 4: Full Regression and Live Visual Verification

**Files:**
- Verify: all changed production files and `tests/`
- Modify only if verification finds a reproducible defect; add the owning regression test first.

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: a verified, deployable main branch state.

- [ ] **Step 1: Run the complete automated suite**

```powershell
node --test tests/*.test.mjs
```

Expected: all tests pass with zero failures.

- [ ] **Step 2: Run repository hygiene and privacy checks**

```powershell
git diff --check
rg -n "experience-attribution|vertex-attribution|Attribution boundary|归因边界|representative|outside-places|已生成图像" index.html i18n.js outside-work.html projects/vertex-reddit.html detail.js
git status --short
```

Expected: no production references; status contains only intentional commits plus the user's unrelated untracked files.

- [ ] **Step 3: Serve and inspect live routes**

Serve the repository at `http://127.0.0.1:4173/`. Inspect homepage, Vertex, and Outside Work at 1440, 768, 414, 375, and 320 CSS pixels.

Verify:

- no horizontal overflow;
- the three Outside Work links still form one asymmetric composition;
- the Business Analytics minor is prominent but subordinate to the degree;
- all five photographs retain natural ratios and image-dialog behavior;
- English/Chinese Travel copy and deep links are correct;
- Music, Photography, and Travel deep links reach the intended section;
- motion-capable desktop uses smooth initial scrolling; reduced-motion/narrow/coarse paths position immediately;
- Vertex has no visual gap where attribution was removed.

- [ ] **Step 4: Run Hallmark handoff checks**

Read `C:\Users\aquak\.agents\skills\hallmark\references\slop-test.md` and `references/contract.md` completely. Confirm no new generic card treatment, badge, excessive heading, raw color/font value, image crop, or right-side dead zone was introduced. Update the existing Hallmark critique stamp only if the production files already maintain one and the score materially changes.

- [ ] **Step 5: Run final verification and push**

```powershell
node --test tests/*.test.mjs
git diff --check
git status --short
git push origin main
```

Expected: full suite passes, tracked tree is clean, push succeeds, and GitHub Pages deploys the new main commit.
