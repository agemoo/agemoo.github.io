# Bilingual Portfolio and Artwork Cropping Design

## Goal

Convert the existing single-page portfolio into an English-first bilingual site with an accessible `EN / 中文` switch, correct unsupported or inconsistent claims, and improve poster presentation by removing visible side whitespace through controlled display cropping.

## Scope

- Keep the public URL and existing dark-gallery visual system.
- Default to English for first-time visitors.
- Provide a persistent `EN / 中文` control in the fixed navigation on desktop and mobile.
- Translate all user-facing strings: metadata, navigation, hero, profile, education, capabilities, metrics, marquee, three case studies, gallery labels, image alternative text, contact section, buttons, and footer.
- Preserve scroll position and URL hash when changing language.
- Store an explicit visitor choice in `localStorage`; without a saved choice, use English.
- Update `<html lang>`, document title, and meta description whenever the language changes.

## Architecture

The site remains dependency-free and static. `index.html` carries stable `data-i18n` keys on translatable elements. A separate `i18n.js` file owns the English and Chinese dictionaries plus language-selection and DOM-application logic. Text is applied with `textContent`; a small reviewed set of headings requiring intentional line breaks may use trusted dictionary HTML through `data-i18n-html`.

The language control uses two visible buttons labeled `EN` and `中文`. The active button exposes `aria-pressed="true"`; the inactive button exposes `aria-pressed="false"`. Keyboard focus follows the existing amber focus style.

## Copy and Evidence Corrections

The bilingual rewrite uses the current Social Media Manager application as the source of truth.

- Change hotel promotion performance from `5,250+` to `525+` reads.
- Describe `19,000` as impressions, not single-post reads.
- Keep `122 likes` and `90 shares`.
- Remove the unsupported `+17%` event-engagement claim.
- Remove the unsupported Instagram average of approximately 200 likes.
- Retain the public Reddit examples only with their observed figures: 276 upvotes / 8.7K views and 99 upvotes / 17 comments.
- Replace “available immediately” with “Available in Cedar City for Fall 2026” and its Chinese equivalent.
- Replace absolute claims such as “built accounts from zero” or broad algorithm mastery with evidence-based language about content creation, community context, platform adaptation, and analytics awareness.
- Do not describe the current Vertex internship as ownership of an official brand account or full social strategy.

## Artwork Cropping

Original image files remain unchanged. Cropping is presentation-only so clicking an artwork still opens the complete source image.

- Inspect every artwork at desktop and mobile breakpoints.
- Add per-artwork crop variables or modifier classes only where white side bars are visibly baked into the displayed composition.
- Crop inside the existing overflow-hidden artwork frame using controlled scale and `object-position`.
- Preserve titles, dates, QR codes, logos, and other meaningful poster content.
- Avoid one global crop amount because artwork proportions differ.
- Compose hover and parallax transforms with the crop transform instead of overwriting it.
- Reduced-motion mode preserves the same crop without animation.
- Full images remain available through the existing click-through links.

## Responsive and Presentation Behavior

- Desktop target: 1280 × 720, matching a typical Zoom screen-share viewport.
- Mobile target: 390 × 844.
- The language control stays visible when the existing navigation links collapse.
- English headings wrap naturally without overflow.
- The site remains usable at 80–100% browser zoom.
- No content remains hidden after the existing reveal safety net completes.
- Lazy-loaded images appear when their section is reached.

## Testing

Use Node's built-in test runner with no external dependencies. Automated checks verify:

1. English is the unsaved/default language.
2. Both dictionaries expose exactly the same keys.
3. Every `data-i18n` and `data-i18n-html` key in `index.html` exists in both dictionaries.
4. Switching language updates `lang`, title, metadata, active-button state, and representative body copy.
5. Corrected evidence strings are present.
6. Banned strings and figures (`5,250`, `+17%`, `~200`, and “随时到岗”) are absent from rendered copy.
7. Crop modifiers apply only to named artwork elements and preserve full-image links.

Manual browser QA covers English default and language persistence, keyboard operation, 1280 × 720 and 390 × 844 layouts, artwork cropping, reduced motion, lazy loading, and a clean console.

## Non-Goals

- No redesign of the dark-gallery theme.
- No framework, package manager, analytics service, or CMS.
- No translation of Chinese text embedded in artwork images.
- No destructive editing or replacement of original artwork assets.
- No unrelated portfolio restructuring.
