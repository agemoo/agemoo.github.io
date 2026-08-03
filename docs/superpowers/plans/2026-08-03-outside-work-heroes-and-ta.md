# Outside Work Heroes and Teaching Assistant Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add restrained image-led Outside Work heroes, a disciplined Photography grid, a Teaching Assistant detail route, and the approved copy/default-state refinements without weakening the existing bilingual two-theme site.

**Architecture:** `detail.css` supplies one shared Outside Work hero and orientation-aware Photography system; each page owns only its image, focal position, and copy. `theme.js` and `i18n.js` continue to own persistent presentation state, while the new Teaching Assistant route reuses the existing detail shell and shared controls instead of introducing another design system.

**Tech Stack:** Static HTML, CSS custom properties, vanilla JavaScript/ES modules, Node.js built-in test runner, WebP delivery assets.

## Global Constraints

- First visit defaults to dark and English; valid explicit saved choices remain authoritative.
- Preserve the original gallery motion and complete reduced-motion fallback.
- Do not move or reference Photography assets in Travel.
- Keep text contrast at least 4.5:1 and all primary controls at least 44px.
- English copy uses half-width punctuation and straight quotes; Chinese uses full-width punctuation and Chinese quotation marks.
- Do not stage or overwrite unrelated user changes in the dirty working tree.

---

### Task 1: Default state contracts

**Files:**
- Modify: `tests/theme-system.test.mjs`
- Modify: `tests/responsive-contract.test.mjs`
- Modify: `theme.js`

**Interfaces:**
- Produces: `PortfolioTheme.resolveTheme(storedTheme)` returning a valid saved theme or `dark`.
- Preserves: `getInitialLanguage()` in `i18n.js`, with English fallback and saved-language support.

- [ ] **Step 1: Write failing default-state tests**

Require an unsaved visitor with a light operating-system preference to receive `dark`; require a saved `light` or `dark` choice to win. Retain the existing `DEFAULT_LANGUAGE === 'en'` and stored-language assertions.

- [ ] **Step 2: Run the focused tests**

Run: `node --test tests/theme-system.test.mjs tests/responsive-contract.test.mjs`

Expected: FAIL because theme resolution still follows the operating-system preference.

- [ ] **Step 3: Implement the fixed dark fallback**

Remove automatic system-preference resolution and its unsaved-choice change listener. Keep synchronous pre-render application, persistence on explicit toggle, metadata updates, and the public `PortfolioTheme` API.

- [ ] **Step 4: Re-run the focused tests**

Run: `node --test tests/theme-system.test.mjs tests/responsive-contract.test.mjs`

Expected: PASS.

### Task 2: Shared Outside Work hero system

**Files:**
- Modify: `tests/detail-pages.test.mjs`
- Modify: `tests/responsive-contract.test.mjs`
- Modify: `tests/media-contract.test.mjs`
- Modify: `detail.css`
- Modify: `music.html`
- Modify: `photography.html`
- Modify: `travel.html`
- Create: `assets/travel/bryce_canyon.webp`

**Interfaces:**
- Produces: `.outside-detail-hero`, `.outside-hero-media`, and route-scoped `--hero-position` / theme overlay tokens.
- Consumes: Music performance media, `assets/photography/the_strip.webp`, and `assets/travel/bryce_canyon.webp`.

- [ ] **Step 1: Add failing hero ownership and responsive tests**

Require each Outside Work hero to contain one semantic media layer; require Travel to use only `assets/travel/bryce_canyon.webp`; require no `assets/photography/` path in Travel; require Photography title no-wrap sizing and a mobile focal-position override.

- [ ] **Step 2: Run the focused tests**

Run: `node --test tests/detail-pages.test.mjs tests/responsive-contract.test.mjs tests/media-contract.test.mjs`

Expected: FAIL for missing hero media and shared CSS contracts.

- [ ] **Step 3: Add the optimized Travel delivery asset**

Create `assets/travel/bryce_canyon.webp` from the supplied JPG at its natural dimensions with visually high-quality compression. Preserve the original JPG.

- [ ] **Step 4: Implement the shared hero shell**

Place the image layer inside each existing hero, behind the current heading/copy grid. Add layered theme-aware scrims, stable minimum height, overflow protection, page-specific focal positions, readable fallback surface, and no new hover/parallax effects.

- [ ] **Step 5: Keep Photography on one line**

Add a Photography-specific bounded fluid title size and `white-space: nowrap`; scale down at narrow breakpoints instead of allowing word breaking.

- [ ] **Step 6: Re-run the focused tests**

Run: `node --test tests/detail-pages.test.mjs tests/responsive-contract.test.mjs tests/media-contract.test.mjs`

Expected: PASS.

### Task 3: Photography contact sheet and new photograph

**Files:**
- Modify: `tests/detail-pages.test.mjs`
- Modify: `tests/media-contract.test.mjs`
- Modify: `tests/i18n.test.mjs`
- Modify: `photography.html`
- Modify: `detail.css`
- Modify: `i18n.js`
- Create: `assets/photography/the_strip.webp`

**Interfaces:**
- Produces: `.photography-frame--landscape` and `.photography-frame--portrait` thumbnail frames, each opening the full natural-ratio asset through the existing dialog.

- [ ] **Step 1: Add failing gallery contracts**

Require seven photographs, `the_strip.webp`, explicit landscape/portrait modifiers, 3:4 portrait frames, consistent landscape frames, intrinsic image dimensions, bilingual alt/caption entries, and one enlargeable source per figure.

- [ ] **Step 2: Run Photography tests**

Run: `node --test tests/detail-pages.test.mjs tests/media-contract.test.mjs tests/i18n.test.mjs`

Expected: FAIL because `the_strip` and orientation contracts are absent.

- [ ] **Step 3: Create the optimized Photography delivery asset**

Create `assets/photography/the_strip.webp` at the source dimensions with high-quality WebP compression; keep `the_strip.png` as the raw original.

- [ ] **Step 4: Implement the editorial sequence**

Classify each existing photograph by orientation, alternate wide and paired portrait rows, apply fixed thumbnail aspect ratios with `object-fit: cover`, and retain full-source links for the dialog. Add `the_strip` with a concise factual caption.

- [ ] **Step 5: Add bilingual attributes and copy**

Extend the Photography image selector map from six to seven items and add English/Chinese alt text and captions without moving any image to Travel.

- [ ] **Step 6: Re-run Photography tests**

Run: `node --test tests/detail-pages.test.mjs tests/media-contract.test.mjs tests/i18n.test.mjs`

Expected: PASS.

### Task 4: Music corrections

**Files:**
- Modify: `tests/detail-pages.test.mjs`
- Modify: `tests/i18n.test.mjs`
- Modify: `music.html`
- Modify: `i18n.js`

**Interfaces:**
- Consumes: the existing `.music-watch` link treatment.
- Produces: one March 31 external performance link, one Fashion Competition figure, and `Xun Sun` copy in both language states.

- [ ] **Step 1: Add failing Music assertions**

Require the exact March 31 YouTube URL with safe external-link attributes; require only `environment.webp` within `#music-fashion-show`; reject rendered `me_playing_bass.webp`; reject `Sun Xun` in public HTML and i18n data; require `Xun Sun`.

- [ ] **Step 2: Run Music tests**

Run: `node --test tests/detail-pages.test.mjs tests/i18n.test.mjs`

Expected: FAIL on the missing link, extra close-up, and name order.

- [ ] **Step 3: Apply the Music content changes**

Add a `Watch the performance` link to the March 31 entry, remove only the close-up figure markup, and change visible copy, alt text, and Chinese translation data to `Xun Sun`.

- [ ] **Step 4: Re-run Music tests**

Run: `node --test tests/detail-pages.test.mjs tests/i18n.test.mjs`

Expected: PASS.

### Task 5: Teaching Assistant detail route

**Files:**
- Modify: `tests/internship-experience.test.mjs`
- Modify: `tests/i18n.test.mjs`
- Modify: `tests/theme-system.test.mjs`
- Create: `projects/suu-teaching-assistant.html`
- Modify: `index.html`
- Modify: `i18n.js`

**Interfaces:**
- Produces: i18n page key `teaching`, route `projects/suu-teaching-assistant.html`, and homepage link from `.experience-row--teaching`.
- Consumes: shared `detail.css`, `detail.js`, `theme.js`, and `i18n.js` using `../` route paths.

- [ ] **Step 1: Add failing route and content tests**

Require English-first metadata, shared controls, `data-page="teaching"`, Role & Context, Classroom Support, Course Operations, two natural-ratio SUU TA figures, the verified dates/location/200+ scope, and a homepage `Learn more about this` link. Require a complete Chinese selector map and no unverified claims.

- [ ] **Step 2: Run TA tests**

Run: `node --test tests/internship-experience.test.mjs tests/i18n.test.mjs tests/theme-system.test.mjs`

Expected: FAIL because the route and i18n page key do not exist.

- [ ] **Step 3: Build the concise route**

Create the page with the shared detail hero/section/media/dialog shell. Use only verified homepage facts: SUU, May 2026, Wuhan, 200+ students, bilingual support, attendance, grading, written feedback, Excel final-grade and completion reporting. Add the supplied `professor_classroom.jpg` and `with_professor.jpg` with intrinsic dimensions after measuring them.

- [ ] **Step 4: Connect bilingual state and homepage navigation**

Add `teaching` to `PAGE_KEYS`, metadata, navigation labels, attributes, and copy in both languages. Add the homepage route action with the existing neutral wording.

- [ ] **Step 5: Re-run TA tests**

Run: `node --test tests/internship-experience.test.mjs tests/i18n.test.mjs tests/theme-system.test.mjs`

Expected: PASS.

### Task 6: Homepage hierarchy and punctuation polish

**Files:**
- Modify: `tests/professional-personal-site.test.mjs`
- Modify: `tests/i18n.test.mjs`
- Modify: `index.html`
- Modify: `i18n.js`
- Modify: `DESIGN.md`

**Interfaces:**
- Produces: a smaller bounded homepage display scale and documented punctuation/default/hero contracts.

- [ ] **Step 1: Add failing hierarchy and punctuation tests**

Require the homepage title upper bound to be no greater than `8rem` and its viewport factor below the current `14vw`. Add targeted assertions for Chinese full-width punctuation/quotation marks and English half-width punctuation/straight quotes in touched content.

- [ ] **Step 2: Run the focused tests**

Run: `node --test tests/professional-personal-site.test.mjs tests/i18n.test.mjs`

Expected: FAIL on the current oversized hero and any mixed punctuation.

- [ ] **Step 3: Rebalance the homepage hero**

Reduce the `Mukun Sun` scale by roughly 20%, refine its line height and surrounding spacing, preserve the existing entrance choreography, and add no new text or decoration.

- [ ] **Step 4: Normalize touched bilingual copy and update the design contract**

Correct mojibake or mixed punctuation found in touched visible copy, labels, captions, and alternative text. Record the approved Outside Work hero, dark-first, Photography frame, TA route, and punctuation rules in `DESIGN.md`.

- [ ] **Step 5: Re-run focused tests**

Run: `node --test tests/professional-personal-site.test.mjs tests/i18n.test.mjs`

Expected: PASS.

### Task 7: Full verification and scoped handoff

**Files:**
- Modify only if verification reveals an in-scope defect.

**Interfaces:**
- Consumes: all completed tasks.
- Produces: a verified responsive bilingual two-theme site and an intentional file list for commit.

- [ ] **Step 1: Run the complete automated suite**

Run: `node --test tests/*.test.mjs`

Expected: all tests PASS with zero failures.

- [ ] **Step 2: Verify media and ownership integrity**

Check that every rendered local image exists, `travel.html` contains no `assets/photography/` path, `music.html` does not render the Fashion Competition close-up, and all new images declare intrinsic dimensions.

- [ ] **Step 3: Run source checks**

Run: `git diff --check`

Expected: no whitespace errors. Review the exact changed-file list against the design spec and keep unrelated dirty-tree files unstaged.

- [ ] **Step 4: Perform visual QA**

Inspect the homepage, Music, Photography, Travel, and Teaching Assistant routes at desktop and mobile widths in both themes. Confirm hero legibility, crop focal points, one-line Photography title, consistent orientation frames, dialogs, keyboard focus, no right-side overflow, and reduced-motion behavior.

