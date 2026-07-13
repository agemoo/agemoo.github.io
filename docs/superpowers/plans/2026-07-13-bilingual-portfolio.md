# Bilingual Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio English-first with a persistent `EN / 中文` switch, correct evidence claims, and crop visible artwork whitespace without altering source images.

**Architecture:** Keep the static single-page site and existing visual system. Add a dependency-free `i18n.js` module containing equal-key English and Chinese dictionaries and DOM application logic; mark translated elements in `index.html` with stable keys. Add named crop modifiers that compose with hover and parallax transforms.

**Tech Stack:** Static HTML/CSS, vanilla JavaScript, Node built-in test runner, GitHub Pages.

## Global Constraints

- English is the default when no explicit language preference is saved.
- The `EN / 中文` control remains visible on desktop and mobile.
- Preserve the dark-gallery design, hashes, scroll position, reduced-motion behavior, and full-image links.
- Use `19,000 impressions`, `122 likes`, `90 shares`, and `525+ reads`; remove `5,250`, `+17%`, `~200`, and `随时到岗`.
- Do not modify original image files.

---

### Task 1: Translation Contract and Failing Tests

**Files:**
- Create: `tests/i18n.test.mjs`
- Create: `i18n.js`
- Modify: `index.html`

**Interfaces:**
- Produces: `COPY.en`, `COPY.zh`, `DEFAULT_LANGUAGE`, `normalizeLanguage(value)`, and `applyLanguage(language, documentRef, storageRef)`.
- Consumes: `data-i18n`, `data-i18n-html`, and `data-i18n-alt` attributes in `index.html`.

- [ ] **Step 1: Write failing Node tests**

Test English default selection, locale key parity, complete markup-key coverage, metadata updates, toggle-state updates, corrected evidence strings, banned-string absence, and crop-link preservation using `node:test`, `node:assert/strict`, and filesystem reads only.

- [ ] **Step 2: Run the tests and verify RED**

Run: `node --test tests/i18n.test.mjs`

Expected: failure because `i18n.js` and required markup contracts do not yet exist.

- [ ] **Step 3: Add the minimal exported i18n module skeleton**

Export the named interfaces above. Keep browser bootstrapping behind a `typeof document !== 'undefined'` guard so Node can import the module.

- [ ] **Step 4: Re-run and confirm only content/coverage assertions remain failing**

Run: `node --test tests/i18n.test.mjs`

Expected: interface tests pass; missing dictionary and markup coverage tests fail.

### Task 2: English-First Complete Copy and Language Control

**Files:**
- Modify: `index.html`
- Modify: `i18n.js`
- Test: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: the Task 1 i18n functions and markup attributes.
- Produces: complete equal-key English/Chinese dictionaries and an accessible persistent language control.

- [ ] **Step 1: Add stable i18n keys to every visible text and image-alt surface**

Cover metadata, navigation, hero, profile, education, skills, metrics, marquee, three case studies, gallery, work principles, contact, buttons, and footer.

- [ ] **Step 2: Populate both dictionaries with finished copy**

Use natural U.S. interview-facing English and the existing Chinese as the Chinese locale. Apply the verified figures and availability wording from the global constraints.

- [ ] **Step 3: Add the fixed-nav `EN / 中文` control**

Use real buttons, `aria-pressed`, a visible active state, keyboard focus, and `localStorage` key `portfolio-language`. Switching must not reload or change the current hash/scroll position.

- [ ] **Step 4: Run the tests and verify GREEN**

Run: `node --test tests/i18n.test.mjs`

Expected: all i18n, evidence, accessibility-contract, and persistence tests pass.

### Task 3: Named Artwork Crops

**Files:**
- Modify: `index.html`
- Test: `tests/i18n.test.mjs`

**Interfaces:**
- Consumes: existing `.art`, image links, hover transforms, and parallax behavior.
- Produces: named `.crop-*` modifiers with `--crop-scale`, `--crop-x`, and `--crop-y` variables.

- [ ] **Step 1: Add failing crop-contract tests**

Assert that named crop modifiers occur only on artwork links, preserve each original `href`, and use variables rather than editing image URLs.

- [ ] **Step 2: Verify crop tests fail before implementation**

Run: `node --test tests/i18n.test.mjs`

Expected: crop-contract assertions fail because modifiers are absent.

- [ ] **Step 3: Implement selective display cropping**

Add per-artwork modifiers only to images with visible white side bars. Compose crop scale/position with default, hover, and parallax transforms. Keep full images available through existing links and protect meaningful poster content.

- [ ] **Step 4: Verify all automated tests pass**

Run: `node --test tests/i18n.test.mjs`

Expected: all tests pass with zero failures.

### Task 4: Browser QA and Delivery

**Files:**
- Modify as needed: `index.html`, `i18n.js`, `tests/i18n.test.mjs`

- [ ] **Step 1: Serve the worktree locally**

Run the static site on localhost using the bundled runtime.

- [ ] **Step 2: Check desktop and mobile**

Inspect 1280 × 720 and 390 × 844 in English and Chinese. Verify scroll preservation, saved preference, keyboard focus, English wrapping, crop safety, lazy images, reduced motion, and console output.

- [ ] **Step 3: Correct any visual or behavioral defects and repeat QA**

Re-run the full test suite after every correction.

- [ ] **Step 4: Commit the verified implementation**

Run: `git add index.html i18n.js tests/i18n.test.mjs && git commit -m "feat: add bilingual portfolio experience"`

- [ ] **Step 5: Integrate to `main` and push**

Fast-forward or merge the verified feature branch into `main`, run the tests once more on `main`, and push to `origin/main`.
