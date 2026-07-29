# Internship Experience Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename the homepage experience area as internship experience and add the missing SUU–Wuhan Polytechnic University English-writing teaching-assistant internship in both languages.

**Architecture:** Keep the existing static, dependency-free homepage and its index-first content model. Add a second semantically scoped experience row, give each row a stable modifier class for precise translation targeting, and retain Vertex as the only experience with metrics and a detail route. Update the shared language cache key across both HTML routes so the new bilingual copy is not hidden by browser or GitHub Pages caching.

**Tech Stack:** Static HTML/CSS, vanilla JavaScript ES modules, Node.js built-in test runner (`node --test`)

## Global Constraints

- English remains the default language on every fresh page load.
- Use `Internships` in English navigation, `Internship Experience` as the English section heading, and `实习经历` for both Chinese labels.
- Display the teaching-assistant date as exactly `May 2026` / `2026 年 5 月`.
- Use only these verified facts: 200+ students, bilingual classroom support, attendance, assignment grading, written feedback, Excel final-grade organization, and course completion reporting.
- Do not publish the instructor's name, compensation, travel arrangements, internal academic information, or unverified efficiency/accuracy improvements.
- Preserve the existing Vertex evidence, attribution language, and `projects/vertex-reddit.html` detail link.
- Do not add a teaching-assistant detail page, new dependency, framework, media asset, or metric-card grid.
- Preserve existing reveal motion, reduced-motion behavior, Chinese readability, and artwork proportions.

---

## File Map

- `tests/internship-experience.test.mjs`: owns the new bilingual content, evidence-boundary, ordering, count, and row-layout contracts.
- `tests/i18n.test.mjs`: updates the expected navigation labels and shared language cache key.
- `index.html`: owns the default-English internship markup and the shared CSS row/list layout.
- `i18n.js`: owns the English and Chinese translations and the new cache key.
- `projects/vertex-reddit.html`: consumes the shared language module and must reference the same cache key.

### Task 1: Add a failing internship content and layout contract

**Files:**
- Create: `tests/internship-experience.test.mjs`
- Modify: `tests/i18n.test.mjs:70-75,148-153`
- Test: `tests/internship-experience.test.mjs`
- Test: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: static homepage markup from `index.html` and `LANGUAGES` / `I18N_CACHE_KEY` exports from `i18n.js`.
- Produces: a contract requiring `.experience-list`, `.experience-row--vertex`, `.experience-row--teaching`, exact bilingual labels, two rows, approved TA evidence, scoped translation selectors, and cache key `20260729-internships`.

- [ ] **Step 1: Write the failing internship test**

Create `tests/internship-experience.test.mjs` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { LANGUAGES } from '../i18n.js';

async function readHomepage() {
  return readFile(new URL('../index.html', import.meta.url), 'utf8');
}

test('homepage presents exactly two internships in reverse chronological order', async () => {
  const home = await readHomepage();
  const section = home.match(/<section[^>]+id="experience"[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.equal((section.match(/class="experience-row(?:\s|\")/g) ?? []).length, 2);
  assert.ok(section.indexOf('experience-row--vertex') < section.indexOf('experience-row--teaching'));
  assert.match(section, /Internship Experience/);
  assert.match(section, /Southern Utah University × Wuhan Polytechnic University/);
  assert.match(section, /English Writing Teaching Assistant/);
  assert.match(section, /May 2026/);
  assert.match(section, /200\+/);
});

test('teaching-assistant copy stays within the approved evidence boundary', async () => {
  const home = await readHomepage();
  const section = home.match(/<section[^>]+id="experience"[\s\S]*?<\/section>/)?.[0] ?? '';
  const bilingualCopy = JSON.stringify(LANGUAGES);
  for (const phrase of [
    /bilingual classroom support/i,
    /attendance and assignment grading/i,
    /written feedback/i,
    /final-grade data/i,
    /course completion reporting/i,
  ]) assert.match(`${section}\n${bilingualCopy}`, phrase);
  assert.match(LANGUAGES.zh.copy['#experience .experience-row--teaching .experience-responsibility'], /200 多名学生/);
  assert.match(LANGUAGES.zh.copy['#experience .experience-row--teaching .experience-responsibility'], /Excel/);
  assert.doesNotMatch(`${section}\n${bilingualCopy}`, /Sharon Lyman|\$450|airfare|82%|96%|30%/i);
});

test('each internship has stable scoped translation selectors', () => {
  for (const modifier of ['vertex', 'teaching']) {
    for (const field of ['experience-company', 'experience-role', 'experience-dates', 'experience-responsibility']) {
      const selector = `#experience .experience-row--${modifier} .${field}`;
      assert.ok(Object.hasOwn(LANGUAGES.en.copy, selector), selector);
      assert.ok(Object.hasOwn(LANGUAGES.zh.copy, selector), selector);
    }
  }
  assert.equal(LANGUAGES.en.copy['#experience .placard'], 'Internship Experience');
  assert.equal(LANGUAGES.zh.copy['#experience .placard'], '实习经历');
});

test('internship list uses one outer rule and one separator per following row', async () => {
  const home = await readHomepage();
  assert.match(home, /\.experience-list\{[^}]*border-block:1px solid var\(--line-2\);/);
  assert.match(home, /\.experience-row\+\.experience-row\{[^}]*border-top:1px solid var\(--line-2\);/);
});
```

- [ ] **Step 2: Update the i18n expectations before implementation**

In `tests/i18n.test.mjs`, change the cache-key expectation and navigation test to:

```js
test('language module declares the shared cache key', async () => {
  const module = await import('../i18n.js');
  assert.equal(module.I18N_CACHE_KEY, '20260729-internships');
});

test('homepage navigation labels the internship section in both languages', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /href="#experience">Internships<\/a>/);
  assert.match(LANGUAGES.en.copy['#nav .links'], /href="#experience">Internships<\/a>/);
  assert.match(LANGUAGES.en.copy['#nav .compact-links'], /href="#experience">Internships<\/a>/);
  assert.match(LANGUAGES.zh.copy['#nav .links'], /href="#experience">实习经历<\/a>/);
  assert.match(LANGUAGES.zh.copy['#nav .compact-links'], /href="#experience">实习经历<\/a>/);
});
```

- [ ] **Step 3: Run the focused tests and confirm the expected failures**

Run:

```powershell
node --test tests/internship-experience.test.mjs tests/i18n.test.mjs
```

Expected: FAIL because the homepage still has one experience row, the old `Experience` / `工作经历` labels, unscoped experience selectors, no teaching-assistant copy, and cache key `20260722-index-redesign`.

- [ ] **Step 4: Commit the failing contract**

```powershell
git add -- tests/internship-experience.test.mjs tests/i18n.test.mjs
git commit -m "test: define internship experience contract"
```

### Task 2: Implement the two-entry bilingual internship section

**Files:**
- Modify: `index.html:219-232,371-375,425-448,816`
- Modify: `i18n.js:1-3,48-50,70-80,220-222,242-252`
- Modify: `projects/vertex-reddit.html` at its `i18n.js?v=` script reference
- Test: `tests/internship-experience.test.mjs`
- Test: `tests/i18n.test.mjs`
- Test: `tests/vertex-evidence.test.mjs`
- Test: `tests/responsive-contract.test.mjs`

**Interfaces:**
- Consumes: the selectors and cache key fixed by Task 1.
- Produces: two `.experience-row` articles inside `.experience-list`; route-safe bilingual copy keyed by modifier class; unchanged Vertex evidence/detail behavior; cache-safe language-module imports on both pages.

- [ ] **Step 1: Add the list layout without changing the responsive grid contract**

In `index.html`, move the outer rules from each row to the containing list and add only an internal separator:

```css
.experience-list{border-block:1px solid var(--line-2);}
.experience-row{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(36px,6vw,88px);padding-block:clamp(36px,5vw,60px);}
.experience-row+.experience-row{border-top:1px solid var(--line-2);}
```

Keep the existing `@media (max-width:60rem)` rule so every `.experience-row` still collapses to one column and the Vertex proof grid still collapses to one column.

- [ ] **Step 2: Rename both default-English navigation variants**

In `index.html`, change only the two `#experience` link labels:

```html
<a href="#experience">Internships</a>
```

Keep the link target `#experience` unchanged so existing deep links and the Vertex back link continue to work.

- [ ] **Step 3: Add the scoped two-row markup**

In `index.html`, change the section heading, wrap the articles, scope the existing Vertex article, and append the teaching row:

```html
<div class="placard" data-reveal="">Internship Experience</div>
<div class="experience-list">
  <article class="experience-row experience-row--vertex" data-reveal="">
    <header>
      <p class="experience-company">Vertex Marketing</p>
      <h2 class="experience-role">Reddit Community Operations Intern</h2>
      <p class="experience-dates">2026 · Current</p>
    </header>
    <div>
      <p class="experience-responsibility">I participate in Reddit community operations across consumer technology, smart-home, lifestyle, finance, and family-oriented communities, adapting content and interaction to subreddit rules, audience context, and visible performance.</p>
      <div class="experience-proof" aria-label="Selected representative account evidence">
        <div class="proof"><strong>5</strong><span>representative accounts</span></div>
        <div class="proof"><strong>793K</strong><span>representative views</span></div>
        <div class="proof"><strong>91.7%</strong><span>highest U.S. audience share</span></div>
      </div>
      <p class="experience-attribution"><strong>Attribution:</strong> These figures describe representative account assets and representative content I participated in operating; they are not all net-new results created during my internship.</p>
      <a class="experience-link" href="projects/vertex-reddit.html">View internship evidence <span aria-hidden="true">→</span></a>
    </div>
  </article>
  <article class="experience-row experience-row--teaching" data-reveal="">
    <header>
      <p class="experience-company">Southern Utah University × Wuhan Polytechnic University</p>
      <h2 class="experience-role">English Writing Teaching Assistant</h2>
      <p class="experience-dates">May 2026</p>
    </header>
    <div>
      <p class="experience-responsibility">Supported an SUU instructor in English writing courses serving 200+ students in Wuhan. Provided bilingual classroom support, managed attendance and assignment grading, delivered written feedback, and organized final-grade data and course completion reporting in Excel.</p>
    </div>
  </article>
</div>
```

- [ ] **Step 4: Scope and extend the English translations**

In `i18n.js`, replace the generic experience-field keys with modifier-scoped keys and add the teaching entry:

```js
'#experience .placard': 'Internship Experience',
'#experience .experience-row--vertex .experience-company': 'Vertex Marketing',
'#experience .experience-row--vertex .experience-role': 'Reddit Community Operations Intern',
'#experience .experience-row--vertex .experience-dates': '2026 · Current',
'#experience .experience-row--vertex .experience-responsibility': 'I participate in Reddit community operations across consumer technology, smart-home, lifestyle, finance, and family-oriented communities, adapting content and interaction to subreddit rules, audience context, and visible performance.',
'#experience .experience-row--teaching .experience-company': 'Southern Utah University × Wuhan Polytechnic University',
'#experience .experience-row--teaching .experience-role': 'English Writing Teaching Assistant',
'#experience .experience-row--teaching .experience-dates': 'May 2026',
'#experience .experience-row--teaching .experience-responsibility': 'Supported an SUU instructor in English writing courses serving 200+ students in Wuhan. Provided bilingual classroom support, managed attendance and assignment grading, delivered written feedback, and organized final-grade data and course completion reporting in Excel.',
```

Also change `Experience` to `Internships` in both English `#nav .links` and `#nav .compact-links` strings. Keep the existing proof, attribution, and detail-link selectors because those elements occur only inside the Vertex row.

- [ ] **Step 5: Add matching Chinese translations**

Add the same scoped keys to the Chinese dictionary:

```js
'#experience .placard': '实习经历',
'#experience .experience-row--vertex .experience-company': 'Vertex Marketing',
'#experience .experience-row--vertex .experience-role': 'Reddit 社区运营实习生',
'#experience .experience-row--vertex .experience-dates': '2026 · 至今',
'#experience .experience-row--vertex .experience-responsibility': '我参与运营消费科技、智能家居、生活方式、金融与家庭等方向的 Reddit 社区内容，并根据 Subreddit 规则、受众语境与可见表现调整内容和互动方式。',
'#experience .experience-row--teaching .experience-company': '南犹他大学 × 武汉轻工大学',
'#experience .experience-row--teaching .experience-role': '英语写作课程助教',
'#experience .experience-row--teaching .experience-dates': '2026 年 5 月',
'#experience .experience-row--teaching .experience-responsibility': '在武汉协助 SUU 教师为 200 多名学生开展英语写作课程，提供中英双语课堂支持；负责考勤、作业评分与书面反馈，并使用 Excel 整理期末成绩和课程完成情况。',
```

Change `工作经历` to `实习经历` in both Chinese navigation strings. Preserve all existing Vertex proof, attribution, and link translations.

- [ ] **Step 6: Bump the language cache key on every consumer**

Use one exact value in all three places:

```js
export const I18N_CACHE_KEY = '20260729-internships';
```

```html
<script type="module" src="i18n.js?v=20260729-internships"></script>
```

```html
<script type="module" src="../i18n.js?v=20260729-internships"></script>
```

The first script tag belongs in `index.html`; the second belongs in `projects/vertex-reddit.html`.

- [ ] **Step 7: Run focused tests and confirm they pass**

Run:

```powershell
node --test tests/internship-experience.test.mjs tests/i18n.test.mjs tests/vertex-evidence.test.mjs tests/responsive-contract.test.mjs
```

Expected: PASS. If `responsive-contract.test.mjs` fails only because the exact cache string changed, update its two expected script URLs from `20260722-index-redesign` to `20260729-internships` without weakening any other assertion.

- [ ] **Step 8: Commit the implementation**

```powershell
git add -- index.html i18n.js projects/vertex-reddit.html tests/responsive-contract.test.mjs
git commit -m "feat: add teaching assistant internship"
```

Do not stage `.superpowers/` or `PROJECT_HANDOFF.md`.

### Task 3: Verify the complete site and visual behavior

**Files:**
- Verify: `index.html`
- Verify: `i18n.js`
- Verify: `projects/vertex-reddit.html`
- Verify: all files under `tests/`

**Interfaces:**
- Consumes: the completed static site from Task 2.
- Produces: evidence that the new section works in both languages without regressions to Vertex, navigation, motion, responsiveness, or visual-work proportions.

- [ ] **Step 1: Run the complete automated suite**

```powershell
node --test tests/*.test.mjs
```

Expected: all tests PASS with zero failures.

- [ ] **Step 2: Run repository hygiene checks**

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors. The only unrelated untracked paths remain `.superpowers/` and `PROJECT_HANDOFF.md`; no implementation file is left unstaged.

- [ ] **Step 3: Verify the homepage in a local browser**

Run:

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173/` and verify at 1440 px, 768 px, 414 px, 375 px, and 320 px widths:

- English is displayed on a fresh load.
- Both navigation modes say `Internships` and reach the correct section.
- The section says `Internship Experience` and shows Vertex before the teaching role.
- Each row has one clean divider; no doubled rule appears between rows.
- The teaching organization, role, date, and paragraph wrap without overlap.
- The Chinese switch changes both navigation modes, the section heading, and every field in both rows.
- Chinese line spacing remains readable on 320–414 px widths.
- Vertex still shows three evidence figures, its attribution note, and a working detail link.
- Reduced-motion mode exposes all content and removes spatial movement.
- Poster and visual-work image proportions are unchanged.

Stop the local server after verification.

- [ ] **Step 4: Record any test-only correction, if needed**

If manual verification exposes a defect, add a focused regression assertion to `tests/internship-experience.test.mjs`, confirm it fails, make the smallest HTML/CSS/i18n correction, rerun the complete suite, and commit only those intentional files:

```powershell
git add -- tests/internship-experience.test.mjs index.html i18n.js projects/vertex-reddit.html tests/responsive-contract.test.mjs
git commit -m "fix: refine internship section presentation"
```

If no correction is required, do not create an empty commit.
