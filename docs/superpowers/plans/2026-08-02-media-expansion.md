# Media Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the supplied internship and music photographs, restore Photography ownership of all photography assets, make Travel text-only, and replace the homepage evidence-oriented action wording.

**Architecture:** Keep the existing static bilingual route architecture and shared dark-gallery shell. Extend existing HTML/CSS/i18n selectors rather than adding routes or JavaScript. Use source images as immutable inputs; create WebP derivatives only for large PNG assets that will be published.

**Tech Stack:** Static HTML, shared CSS tokens, native ES modules, `i18n.js`, FFmpeg image conversion, Node.js built-in test runner, GitHub Pages.

## Global Constraints

- English remains the default language; every visible string and image alt has Chinese parity.
- `photography.html` is the only page allowed to display files from `assets/photography`; `travel.html` must not reference that directory.
- Preserve the existing Gallery in the Dark tokens, typography, motion, image dialog, and route structure.
- Preserve intrinsic dimensions and natural aspect ratios; do not crop every image to one ratio.
- Do not fabricate locations, dates, identities, recommendations, or reflections.
- Do not stage the user's unrelated `.gitignore`, `README.md`, `.superpowers/`, `PROJECT_HANDOFF.md`, or unused source files.

---

### Task 1: Photography ownership and text-only Travel

**Files:**
- Create: `assets/photography/boats.webp`
- Modify: `photography.html`
- Modify: `travel.html`
- Modify: `detail.css`
- Modify: `i18n.js`
- Modify: `tests/outside-route-split.test.mjs`
- Modify: `tests/detail-pages.test.mjs`
- Modify: `tests/media-contract.test.mjs`
- Modify: `tests/i18n.test.mjs`

**Interfaces:**
- Produces: a six-image Photography sequence and a text-only `#travel-notes` geographic ledger.
- Consumes: `travel-list.md` and the six user-supplied Photography source images.

- [ ] **Step 1: Write failing ownership and bilingual tests**

Add assertions that `photography.html` owns `building.webp`, `chongqing.webp`, `santa_monica_beach.webp`, `tongren.webp`, `walter_disney.webp`, and `boats.webp`; that `travel.html` contains no `assets/photography/`, `<figure>`, or `data-enlarge`; and that both language dictionaries contain the same Travel place-ledger selectors.

```js
assert.doesNotMatch(travel, /assets\/photography\/|<figure|data-enlarge/);
for (const file of ['building.webp','chongqing.webp','santa_monica_beach.webp','tongren.webp','walter_disney.webp','boats.webp']) {
  assert.equal((photography.match(new RegExp(`assets/photography/${file}`, 'g')) ?? []).length, 2);
}
```

- [ ] **Step 2: Run focused tests and confirm RED**

Run:

```powershell
node --test tests/outside-route-split.test.mjs tests/detail-pages.test.mjs tests/media-contract.test.mjs tests/i18n.test.mjs
```

Expected: failures because Travel still owns two Photography images, Photography lacks three entries, and the text ledger selectors do not exist.

- [ ] **Step 3: Create the optimized boats derivative**

Run FFmpeg against the supplied source without changing it:

```powershell
ffmpeg -y -i "assets/photography/已生成图像 1 (4).png" -c:v libwebp -quality 82 -compression_level 6 -pix_fmt yuv420p assets/photography/boats.webp
```

Expected intrinsic size: `1448 × 1086`.

- [ ] **Step 4: Implement the two route compositions**

Move the Santa Monica and Tongren linked figures into `.photography-sequence`, add the boats linked figure with factual visual alt text, and preserve all six natural dimensions. Replace the Travel image articles with a grouped ledger sourced exactly from `travel-list.md`:

```html
<div class="travel-ledger">
  <section class="travel-region"><h2>United States</h2><p>California · Nevada · Utah</p></section>
  <section class="travel-region"><h2>China</h2><p>Beijing · Shanghai · Hong Kong · Chongqing · Guangdong · Hubei · Henan · Jiangsu · Guizhou · Sichuan</p></section>
</div>
```

Each region receives subordinate city/place lines containing every supplied place. Add token-only `.travel-ledger` and `.travel-region` rules and update English/Chinese metadata, headings, place names, alt text, and captions in `i18n.js`.

- [ ] **Step 5: Run focused tests and confirm GREEN**

Run the Step 2 command. Expected: all focused tests pass.

- [ ] **Step 6: Commit the route ownership change**

```powershell
git add -- assets/photography/boats.webp photography.html travel.html detail.css i18n.js tests/outside-route-split.test.mjs tests/detail-pages.test.mjs tests/media-contract.test.mjs tests/i18n.test.mjs
git commit -m "restore photography media ownership"
```

---

### Task 2: Homepage internship media and neutral detail action

**Files:**
- Modify: `index.html`
- Modify: `i18n.js`
- Modify: `tests/internship-experience.test.mjs`
- Modify: `tests/i18n.test.mjs`
- Modify: `tests/media-contract.test.mjs`

**Interfaces:**
- Produces: one natural-ratio image per internship and the link label `Learn more about this` / `进一步了解`.
- Consumes: `assets/internship/VertexMkt/1.jpg` and `assets/internship/SUU_TA/classroom.jpg`.

- [ ] **Step 1: Write failing homepage tests**

Require the exact English and Chinese action copy; reject `View internship evidence` and `查看实习证据`; require one Vertex contextual image (`1279 × 1706`) and the Teaching Assistant classroom image (`1921 × 1279`) inside their corresponding rows.

```js
assert.match(vertexRow, /assets\/internship\/VertexMkt\/1\.jpg[^>]+width="1279" height="1706"/);
assert.match(teachingRow, /assets\/internship\/SUU_TA\/classroom\.jpg[^>]+width="1921" height="1279"/);
assert.equal(LANGUAGES.en.copy['#experience .experience-link'], 'Learn more about this <span aria-hidden="true">→</span>');
```

- [ ] **Step 2: Run focused tests and confirm RED**

```powershell
node --test tests/internship-experience.test.mjs tests/i18n.test.mjs tests/media-contract.test.mjs
```

Expected: failures for missing Vertex media, the old TA image, and evidence-oriented action wording.

- [ ] **Step 3: Implement the homepage update**

Add a `.experience-media` linked or plain figure below each internship copy, use descriptive non-sensitive alt text, retain `height:auto`, and update the English/Chinese dictionary values. Do not add a new gallery or additional claims.

- [ ] **Step 4: Run focused tests and confirm GREEN**

Run the Step 2 command. Expected: all pass.

- [ ] **Step 5: Commit the homepage change**

```powershell
git add -- index.html i18n.js tests/internship-experience.test.mjs tests/i18n.test.mjs tests/media-contract.test.mjs assets/internship/VertexMkt/1.jpg assets/internship/SUU_TA/classroom.jpg
git commit -m "add internship context media"
```

---

### Task 3: Music media expansion

**Files:**
- Create: `assets/music/environment/environment.webp`
- Create: `assets/music/environment/me_playing_bass.webp`
- Create: `assets/music/grand_ball/headshot.webp`
- Create: `assets/music/suu_jazz_fest/playing.webp`
- Modify: `music.html`
- Modify: `detail.css`
- Modify: `i18n.js`
- Modify: `tests/detail-pages.test.mjs`
- Modify: `tests/media-contract.test.mjs`
- Modify: `tests/i18n.test.mjs`
- Delete from Git index only because the user already removed it locally: `assets/music/grand_ball/grand_ball.jpg`

**Interfaces:**
- Produces: event-specific natural-ratio media while retaining the existing nine-event reverse chronology.
- Consumes: the supplied Music images and existing image-dialog behavior.

- [ ] **Step 1: Write failing Music media tests**

Require the new lead, Student Center, Grand Ball, fashion-event pair, and Daren Burns study media with their literal intrinsic dimensions. Reject the deleted `grand_ball.jpg` reference and assert every new image has a focusable `data-enlarge` link and bilingual alt/caption selectors.

- [ ] **Step 2: Run focused tests and confirm RED**

```powershell
node --test tests/detail-pages.test.mjs tests/media-contract.test.mjs tests/i18n.test.mjs
```

Expected: failures for missing optimized assets and markup.

- [ ] **Step 3: Create optimized WebP derivatives**

```powershell
ffmpeg -y -i assets/music/environment/environment.png -c:v libwebp -quality 82 -compression_level 6 -pix_fmt yuv420p assets/music/environment/environment.webp
ffmpeg -y -i assets/music/environment/me_playing_bass.png -c:v libwebp -quality 82 -compression_level 6 -pix_fmt yuv420p assets/music/environment/me_playing_bass.webp
ffmpeg -y -i assets/music/grand_ball/headshot.png -c:v libwebp -quality 82 -compression_level 6 -pix_fmt yuv420p assets/music/grand_ball/headshot.webp
ffmpeg -y -i assets/music/suu_jazz_fest/playing.png -c:v libwebp -quality 82 -compression_level 6 -pix_fmt yuv420p assets/music/suu_jazz_fest/playing.webp
```

- [ ] **Step 4: Implement the Music composition**

Use `playing.webp` as the lead; move `performance.jpg` into the Jazz Fest event; add `jazz_in_the_room.jpg` to the Student Center event; replace the removed Grand Ball image with `headshot.webp`; use a two-image `.music-event-gallery` for the environmental fashion event; and add the Daren Burns photograph to his Study row. Captions state only the known event or study context.

- [ ] **Step 5: Run focused and full tests**

```powershell
node --test tests/detail-pages.test.mjs tests/media-contract.test.mjs tests/i18n.test.mjs
node --test tests/*.test.mjs
git diff --check
```

Expected: all tests pass and `git diff --check` exits 0.

- [ ] **Step 6: Commit the Music update**

```powershell
git add -- music.html detail.css i18n.js tests/detail-pages.test.mjs tests/media-contract.test.mjs tests/i18n.test.mjs assets/music/environment/environment.webp assets/music/environment/me_playing_bass.webp assets/music/grand_ball/headshot.webp assets/music/suu_jazz_fest/playing.webp assets/music/jazz_in_the_room/jazz_in_the_room.jpg assets/music/mentors/Daren\ Burns.jpg assets/music/suu_jazz_fest/performance.jpg
git add -u -- assets/music/grand_ball/grand_ball.jpg
git commit -m "expand music event photography"
```

---

### Task 4: Final verification and publication

**Files:**
- Modify only if a verified failure requires it: the files already listed above.

- [ ] **Step 1: Run final automated verification**

```powershell
git diff --check
node --test tests/*.test.mjs
```

- [ ] **Step 2: Run Hallmark handoff checks**

Confirm natural ratios, no Photography media on Travel, no new raw colors/fonts, no horizontal-overflow contract regression, English-first bilingual parity, visible focus, reduced-motion preservation, and no fabricated copy.

- [ ] **Step 3: Confirm commit scope**

```powershell
git status -sb
git diff origin/main...HEAD --stat
```

Do not include `.gitignore`, `README.md`, `.superpowers/`, `PROJECT_HANDOFF.md`, unused source images, or `travel-list.md`.

- [ ] **Step 4: Push and monitor GitHub Pages**

```powershell
git push origin main
gh run list --limit 1 --json databaseId,status,conclusion,headSha,url
```

Watch the matching run with `gh run watch <databaseId> --exit-status`.
