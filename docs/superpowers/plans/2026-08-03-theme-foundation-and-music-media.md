# Theme Foundation and Music Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add persistent dark/light theming across the public portfolio and connect the newly supplied Music photographs to their correct timeline and study entries.

**Architecture:** `tokens.css` owns both semantic palettes and theme-dependent effects. A small synchronous shared `theme.js` resolves saved preference → system preference → dark fallback before render, exposes a testable `window.PortfolioTheme` API, then mounts accessible toggle buttons on each public route. Music continues using the shared detail shell and natural-ratio media; large source images receive WebP delivery copies.

**Tech Stack:** Static HTML, CSS custom properties, vanilla ES modules, Node.js built-in test runner, WebP asset conversion.

## Global Constraints

- Preserve the existing English-first bilingual behavior and dark-gallery motion.
- Keep dark as the authored baseline; light must be coherent and usable without final per-page art direction.
- Do not move any supplied Music or Photography assets to Travel.
- Keep natural image ratios, intrinsic dimensions, lazy loading, and click-to-enlarge behavior.
- Do not overwrite or commit unrelated user changes already present in the working tree.

---

### Task 1: Theme behavior contract

**Files:**
- Create: `tests/theme-system.test.mjs`
- Create: `theme.js`

**Interfaces:**
- Produces: `window.PortfolioTheme` with `storageKey`, `resolveTheme(storedTheme, systemPrefersLight)`, `applyTheme(theme, options)`, and `mountControls(document)`.

- [ ] **Step 1: Write the failing behavior test**

Assert that `resolveTheme` accepts only `dark` and `light`, prefers stored choice, follows a light system preference when no choice exists, and falls back to dark. Assert `applyTheme` updates `data-theme`, `colorScheme`, theme-color metadata, and persistence only for explicit changes.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/theme-system.test.mjs`

Expected: FAIL because `theme.js` does not exist.

- [ ] **Step 3: Implement the minimal shared theme module**

Use the fixed storage key `portfolio-theme`; set `html.dataset.theme` to `dark` or `light`; expose the API from a synchronous browser-safe IIFE; update every `[data-theme-toggle]` with `aria-pressed`, localized `aria-label`, and a visible sun/moon mark. Listen to system preference changes only while the user has no saved choice.

- [ ] **Step 4: Run the behavior test**

Run: `node --test tests/theme-system.test.mjs`

Expected: PASS.

### Task 2: Palette and public route integration

**Files:**
- Modify: `tokens.css`
- Modify: `detail.css`
- Modify: `index.html`
- Modify: `music.html`
- Modify: `photography.html`
- Modify: `travel.html`
- Modify: `projects/campus-campaign.html`
- Modify: `projects/hotel-jazz.html`
- Modify: `projects/vertex-reddit.html`
- Modify: `projects/visual-work.html`
- Modify: `i18n.js`
- Test: `tests/theme-system.test.mjs`

**Interfaces:**
- Consumes: the `theme.js` API from Task 1 and semantic tokens from `tokens.css`.
- Produces: the shared `[data-theme-toggle]` control and light palette for all primary public routes.

- [ ] **Step 1: Extend the failing route contract**

Assert every primary route loads `theme.js` before its stylesheet, contains a `[data-theme-toggle]` button beside `.lang-switch`, exposes a page-specific `theme-color` meta element, and contains no route-local light palette. Assert `tokens.css` defines `html[data-theme="light"]`, `color-scheme`, and semantic media/effect tokens.

- [ ] **Step 2: Run the test to verify the new assertions fail**

Run: `node --test tests/theme-system.test.mjs`

Expected: FAIL for missing controls, tokens, and script references.

- [ ] **Step 3: Implement the shared palette and route controls**

Add semantic tokens for media brightness/saturation, overlay blending, grain visibility, translucent navigation, and dialog backdrop. Replace existing theme-specific constants in `index.html` and `detail.css` with those tokens. Add a 44px theme button next to each language switch, and localized labels through `i18n.js`.

- [ ] **Step 4: Run theme and existing design tests**

Run: `node --test tests/theme-system.test.mjs tests/design-contract.test.mjs tests/detail-pages.test.mjs tests/i18n.test.mjs`

Expected: PASS.

### Task 3: Music image mapping and optimized delivery

**Files:**
- Modify: `music.html`
- Modify: `i18n.js`
- Modify: `tests/media-contract.test.mjs`
- Modify: `tests/detail-pages.test.mjs`
- Create: `assets/music/jam_session/jam.webp`
- Create: `assets/music/jazz_concert/jazz_concert.webp`
- Create: `assets/music/mentors/daren_burns.webp`
- Create: `assets/music/mentors/xun_sun.webp`
- Create: `assets/music/tbird_marching_band/TMB.webp`

**Interfaces:**
- Consumes: supplied PNG/JPG originals in the matching Music directories and the existing `.music-event--media` / `.music-study-row--media` layout contracts.
- Produces: five optimized, naturally proportioned, enlargeable Music images.

- [ ] **Step 1: Update tests first with the approved mappings**

Require `jam.webp` in `#music-ni-jazz-bar`, `TMB.webp` in `#music-tbird`, `jazz_concert.webp` in `#music-campus-concert`, `daren_burns.webp` in `#music-study-burns`, and `xun_sun.webp` in `#music-study-sun`. Require intrinsic dimensions and real-file links; remove the two deleted JPG expectations.

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/media-contract.test.mjs tests/detail-pages.test.mjs`

Expected: FAIL because the WebP files and mappings do not yet exist.

- [ ] **Step 3: Create optimized WebP derivatives**

Convert each source with visually high-quality WebP settings, retaining the original dimensions and originals. Keep each delivery file substantially smaller than its source where possible.

- [ ] **Step 4: Add the figures and bilingual media attributes**

Apply `music-event--media` to the Jam Session and T-Bird entries, add the two figures, replace the removed concert and Daren paths, and expand the Sun Xun study row with its figure. Update English and Chinese alternative text and captions in `i18n.js`.

- [ ] **Step 5: Run Music media tests**

Run: `node --test tests/media-contract.test.mjs tests/detail-pages.test.mjs tests/i18n.test.mjs`

Expected: PASS.

### Task 4: Full verification and visual QA

**Files:**
- Modify only if verification reveals an in-scope defect.

**Interfaces:**
- Consumes: completed theme and Music changes.
- Produces: verified public-site behavior in both themes and responsive layouts.

- [ ] **Step 1: Run the complete automated suite**

Run: `node --test tests/*.test.mjs`

Expected: all tests PASS with zero failures.

- [ ] **Step 2: Check source integrity**

Run file-reference checks for all public HTML images, `git diff --check`, and a search confirming Photography assets remain absent from Travel.

- [ ] **Step 3: Inspect representative pages visually**

Serve the repository locally and inspect desktop plus mobile widths for `index.html`, `music.html`, and one project page in both themes. Confirm navigation, theme persistence, contrast, image dialogs, natural image ratios, no right-side overflow, and unchanged reduced-motion fallbacks.

- [ ] **Step 4: Review the final diff**

Confirm only intentional source, test, and selected Music asset files are included; leave `.gitignore`, `README.md`, handoff/TODO files, Photography sources, and unrelated untracked files untouched.
