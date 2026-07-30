# Personal Site Content, Photography, and Deep-Link Revision

Date: 2026-07-30

## Goal

Make the current professional personal website more direct and less defensive, strengthen the Business Analytics minor, replace the vague “Places” label with “Travel,” and turn each Outside Work card into a useful deep link. Add a curated set of the user's new photography without changing the established dark editorial system.

## Scope

The revision stays inside the existing homepage, Vertex evidence route, Outside Work route, shared detail behavior, bilingual dictionary, and tests. It does not replace the theme, route tree, page hierarchy, or motion language. No original asset is deleted.

## Vertex Internship

- Remove the homepage attribution paragraph and its styling when no longer used.
- Remove the Vertex detail page attribution navigation entries and the complete attribution section.
- Remove defensive “representative” qualifiers that existed only to support the attribution boundary.
- Keep the supplied figures and describe them directly as the internship's account/content scope.
- Do not introduce sole-ownership claims or invented causal claims.
- Update both English and Chinese copy and remove obsolete translation selectors.

## Teaching Assistant Experience

- Change the visible employer/institution line from `Southern Utah University × Wuhan Polytechnic University` to `Southern Utah University` in both languages.
- Keep Wuhan as the location/context in the responsibility copy; the work itself is not relocated or recharacterized.

## Education

- Remove `Degree awarded upon completion at SUU` and its Chinese equivalent from the Wuhan Polytechnic University entry.
- Keep `Minor · Business Analytics` as the SUU secondary line.
- Increase the minor line's visual prominence through the existing type and color tokens, without turning it into a badge, pill, card, or oversized slogan.

## Outside Work Navigation

- Rename `Places` to `Travel` and `地方` to `旅行` across homepage, detail page, navigation, metadata-adjacent copy, and tests.
- Rename the detail anchor from `#outside-places` to `#outside-travel`.
- Replace the single wrapper link around all three homepage cards with three real links:
  - Music → `outside-work.html#outside-music`
  - Photography → `outside-work.html#outside-photography`
  - Travel → `outside-work.html#outside-travel`
- Retain a separate restrained “Explore outside work” link to the top of the detail route.
- Preserve keyboard focus states, at least 44px interactive targets on compact layouts, and valid no-JavaScript fragment navigation.

## Cross-Page Motion

- Standard fragment navigation remains the fallback.
- With JavaScript and motion allowed, a detail-route enhancement captures an initial `#outside-*` fragment before the browser's default jump, loads the page at the top, then smoothly scrolls to the requested section.
- With reduced motion, narrow/coarse capability, missing target, or unavailable APIs, positioning is immediate rather than animated.
- After positioning, the requested fragment remains in the URL so refresh, copy, and back/forward behavior stay understandable.
- Existing reveal, progress, dialog, language, and focus behavior must remain intact.

## Photography Selection

Use five user-supplied photographs:

- `building.png`
- `chongqing.png`
- `santa_monica_beach.JPG`
- `tongren.png`
- `walter_disney.png`

Do not publish `已生成图像 1 (4).png`; it is not suitable evidence for a personal photography portfolio.

- Create web-optimized WebP derivatives and preserve the original source files unchanged.
- Use `walter_disney` as the homepage Photography preview.
- Present all five photographs at natural aspect ratios in the Photography detail section.
- Use concise factual captions and accurate bilingual alt text; do not invent dates, equipment, or locations beyond what the filenames and visible subject safely establish.
- Keep Travel as a separate text-led chapter for now rather than duplicating Photography images.

## Responsive and Visual Constraints

- Retain the current dark gallery, typography, tokens, grain, progress, navigation, and reveal system.
- The three homepage Outside Work links must still read as one asymmetric composition, not three generic cards.
- Avoid a large accidental right-side void at wide widths.
- Verify 1440, 768, 414, 375, and 320 CSS-pixel layouts.
- Preserve natural image ratios and prevent horizontal overflow.
- Chinese line height and wrapping must remain comfortable.

## Files

Expected production changes:

- `index.html`
- `i18n.js`
- `outside-work.html`
- `detail.js`
- `projects/vertex-reddit.html`
- optimized derivatives under `assets/photography/`

Expected test changes:

- Vertex evidence/shell tests
- internship and education content tests
- Outside Work/detail route tests
- i18n tests
- responsive/interaction tests where the new deep-link behavior is owned

No production file, route, or source photograph will be deleted.

## Acceptance Criteria

- No visible attribution section, attribution note, attribution navigation item, or defensive representative qualifier remains in the Vertex experience.
- TA institution and education copy match the approved wording in both languages.
- Business Analytics is visually more prominent than generic supporting coursework while remaining subordinate to the degree.
- Every homepage Outside Work item has the correct real fragment link.
- Enhanced cross-page navigation scrolls to the intended section and respects reduced motion.
- Five approved photographs appear at natural ratios; the generated-image file is not referenced.
- English and Chinese have selector and metadata parity.
- Full automated tests pass and live responsive checks show no horizontal overflow or composition regression.

## Hallmark Self-Critique

Philosophy 5 · Hierarchy 5 · Execution 4 · Specificity 5 · Restraint 5 · Variety 4

The revision strengthens clarity without adding a new visual system. The main risk is turning the three Outside Work links into generic cards; implementation must preserve the existing asymmetric composition and shared visual rhythm.
