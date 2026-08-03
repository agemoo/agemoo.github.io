# Outside Work Heroes and Teaching Assistant Detail Design

## Goal

Refine the portfolio into a quieter, more editorial professional-personal site: dark and English by default, image-led Outside Work entries, disciplined Photography presentation, a concise Teaching Assistant detail route, and a less overwhelming homepage identity.

## Visual direction

The approved direction is **image integrated into the existing editorial shell**. Music, Photography, and Travel keep the current navigation, typography, motion, and two-column content structure. Their heroes gain one content-owned image behind the title and deck, controlled by theme-aware scrims rather than a generic opacity filter.

- Music uses an existing performance photograph.
- Photography uses `assets/photography/the_strip.png`.
- Travel uses the dedicated `assets/travel/bryce_canyon.jpg`; no Photography asset is reassigned to Travel.
- Desktop crops preserve the subject and intentional negative space. Mobile crops choose a stable focal point rather than merely centering the source.
- Dark mode keeps image color and detail under a warm-black layered veil. Light mode uses a warm-paper veil without turning the hero into a pale card.
- Text contrast remains at least 4.5:1, and the hero remains readable when images fail to load.

The homepage hero remains text-led. `Mukun Sun` becomes roughly 20% smaller at its upper range, with more deliberate space between the name, role line, and lower rule. No new slogan, decorative badge, or extra metadata is added.

## Default state

- A valid saved theme remains authoritative; a first visit without a saved choice opens in dark mode even when the operating system prefers light.
- A valid saved language remains authoritative; a first visit without a saved choice opens in English.
- Theme and language remain independent and persist only after the visitor explicitly changes them.

## Photography system

Photography becomes a controlled editorial contact sheet instead of a loose sequence.

- Add an optimized WebP derivative of `the_strip.png` and include it in the gallery.
- Landscape thumbnails share one landscape frame and portrait thumbnails share one 3:4 frame.
- The visible grid may crop thumbnails with `object-fit: cover`; click-to-enlarge always opens the complete natural-ratio source.
- Wide and portrait work alternate in an intentional rhythm on desktop, collapse without overflow on mobile, and retain meaningful captions.
- The `Photography` hero title stays on one line at every supported viewport by using a page-specific fluid size, bounded width, and no forced word breaking.

## Music revisions

- Add the supplied March 31, 2026 YouTube link to the SUU Jazz Big Band entry using the existing performance-link treatment.
- The Environmental Fashion Design Competition displays only the stage-wide image. The close-up remains in the asset library but is not rendered.
- Replace every visible English reference to `Sun Xun` with `Xun Sun`, including alternative text and bilingual data.

## Teaching Assistant detail route

Create `projects/suu-teaching-assistant.html` and link the homepage Teaching Assistant row to it. The route uses the same professional hierarchy and navigation behavior as the Vertex internship page without adopting its evidence-report voice.

The initial page stays brief and factual:

- **Role & Context:** English Writing Teaching Assistant, Southern Utah University, May 2026, Wuhan, China; supported courses serving more than 200 students.
- **Classroom Support:** bilingual classroom support and written feedback.
- **Course Operations:** attendance, assignment grading, final-grade organization, and completion reporting in Excel.
- **Media:** two representative supplied images from `assets/internship/SUU_TA/`, presented at natural ratio with enlarge behavior.

The route is English-first with a complete Chinese translation, shared theme control, responsive navigation, correct metadata, and a neutral return to the Internship section.

## Copy and punctuation

- Chinese prose uses full-width Chinese punctuation and `“……”` / `‘……’` quotation marks.
- English prose uses half-width punctuation and straight `"..."` / `'...'` quotation marks.
- Existing mojibake or mixed-language punctuation encountered in visible copy, controls, captions, and alternative text is corrected within the touched routes.
- The copy remains plain, specific, and restrained; do not add proof-oriented labels, inflated slogans, or claims beyond the verified Teaching Assistant facts.

## Responsive, motion, and accessibility

- Preserve the existing gallery motion, reveal choreography, reduced-motion fallback, grain, and pointer behavior.
- Hero images do not introduce parallax or scale-on-hover effects.
- All navigation and theme/language controls retain 44px touch targets and visible keyboard focus.
- Photography frames maintain consistent orientation sizing without causing horizontal scroll.
- Image-dialog behavior, intrinsic source dimensions, lazy loading below the fold, and semantic headings remain intact.

## Verification

- Add failing contracts for dark/English defaults, Outside Work hero ownership, Photography orientation frames and `the_strip`, Music link/image/name changes, the TA route and homepage link, punctuation rules, and the smaller homepage title range.
- Run the complete Node test suite and `git diff --check`.
- Inspect desktop and mobile widths in dark and light modes for the homepage, all three Outside Work pages, and the Teaching Assistant page.
- Confirm no Photography asset path appears in Travel, the removed fashion close-up is not rendered, all public media paths exist, and no right-side overflow is introduced.

## Expected implementation files

- Modify: `DESIGN.md`, `theme.js`, `index.html`, `detail.css`, `music.html`, `photography.html`, `travel.html`, `i18n.js`.
- Create: `projects/suu-teaching-assistant.html`, `assets/photography/the_strip.webp`, `assets/travel/bryce_canyon.webp`.
- Modify tests only where their contract changes: `tests/theme-system.test.mjs`, `tests/detail-pages.test.mjs`, `tests/internship-experience.test.mjs`, `tests/media-contract.test.mjs`, `tests/responsive-contract.test.mjs`, and `tests/i18n.test.mjs`.
- Do not stage or alter unrelated README, handoff, TODO, raw-source, archive-deletion, or asset-library changes already present in the working tree.
