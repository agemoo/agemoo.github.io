# Theme Foundation and Music Media Design

## Goal

Add a maintainable dark/light theme foundation to the existing static bilingual site without weakening the current dark-gallery identity, and connect the newly supplied Music photographs to their correct events.

## Theme architecture

- Keep the current dark palette as the authored baseline.
- Move theme-dependent values behind semantic custom properties in `tokens.css`.
- Add a light token set under `html[data-theme="light"]`; shared layout, type, spacing, and motion remain unchanged.
- Resolve the initial theme before rendering with this priority: saved user choice, operating-system preference, dark fallback.
- Store only an explicit user choice. A compact accessible theme button appears beside the language control on public pages and updates its label/state without interfering with bilingual state.
- Give the browser an appropriate `color-scheme` and `theme-color` for native controls and browser chrome.
- Theme-specific image filters, overlays, grain, spotlight, rules, shadows, translucent navigation, and dialog backdrops consume semantic tokens. The light theme is coherent and usable now; final page-by-page art direction remains a later polishing task.

## Page scope

The theme foundation applies to the homepage, Music, Photography, Travel, project detail pages, and the Vertex internship detail page. Redirect-only pages do not need a visible control. Existing content routes, animations, language behavior, and natural-ratio image contracts remain intact.

## Music media mapping

- `jam_session/jam.png` → NI Jazz Bar Jam Session.
- `tbird_marching_band/TMB.png` → T-Bird Marching Band.
- `jazz_concert/jazz_concert.png` → Independent Jazz Concert, replacing the removed JPG path.
- `mentors/daren_burns.png` → Daren Burns study entry, replacing the removed JPG path.
- `mentors/xun_sun.jpg` → Sun Xun study entry.
- Existing supplied performance images stay in Music and are not reassigned to Photography or Travel.

Large PNG sources receive lightweight WebP derivatives for page delivery while preserving their originals in the asset library. Every rendered image keeps intrinsic dimensions, meaningful alternative text, natural aspect ratio, lazy loading where appropriate, and click-to-enlarge behavior.

## Responsive and accessibility behavior

- The theme control has a 44px touch target and a localized accessible name.
- Keyboard focus remains visible in both themes.
- Theme selection persists across routes and does not flash the wrong theme during navigation.
- Contrast is checked for body text, muted text, rules, links, focus rings, and the active language control.
- Reduced-motion behavior is unchanged; theme switching introduces no new spatial animation.

## Verification

- Add automated contracts for theme tokens, early initialization, persistence/system fallback, controls on public routes, and Music image mappings.
- Run the complete existing test suite.
- Inspect representative desktop and mobile views in both themes, including the homepage, Music, one project page, and the image dialog.
- Confirm that all referenced media files exist and that Photography/Travel ownership is unchanged.

## Out of scope

- Final light-theme art direction and per-image color grading.
- Hero redesign, internship/project rewriting, Selected Work curation, and broader Outside Work restructuring.
- Moving any Photography assets into Travel.
