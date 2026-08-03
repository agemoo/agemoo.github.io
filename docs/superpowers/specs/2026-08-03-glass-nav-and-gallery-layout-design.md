# Glass Navigation and Gallery Layout Design

## Objective

Refine the existing personal website without changing its information architecture. The update should make the navigation feel more tactile, let each Outside Work hero follow the character of its photograph, use the full content width on the Photography gallery, and repair the internship-link translation bug.

## Approved Direction

Use a material-specific treatment rather than forcing every route into one exposure. Photography remains dark and atmospheric. Travel becomes bright and expansive. Music becomes moderately brighter while retaining its stage atmosphere. The navigation uses one restrained frosted-glass language across the public routes.

## Navigation

- Apply the frosted treatment to the homepage navigation and the shared detail navigation.
- Define a soft navigation surface token mixing 76% page color with transparency; retain the existing denser surface at 86% for the scrolled state.
- Use an 18px localized blur, `1.12` backdrop saturation, and the existing one-pixel rule color as the lower boundary. Do not add a drop shadow.
- The initial state remains visibly glassy; the scrolled state becomes slightly denser for readability.
- Limit blur to the navigation strip. Do not add full-screen glass layers or continuous effects.
- Preserve existing fixed positioning, responsive controls, keyboard states, and reduced-motion behavior.

## Outside Work Imagery

### Travel homepage card

- Reuse `assets/travel/bryce_canyon.webp` as the temporary Travel cover.
- Add intrinsic dimensions, localized bilingual alt text, and a deliberate landscape crop.
- Keep the card structure consistent with Music and Photography while allowing its brighter palette to remain visible.

### Travel detail hero

- Increase the Bryce Canyon image brightness and saturation relative to the shared Outside Work defaults.
- Reduce the global dark scrim substantially.
- Retain a directional contrast layer only behind the lower-left text and a small top protection layer behind navigation.
- Preserve the visual scale and open highlights of the canyon rather than forcing the image into the Photography treatment.

### Music detail hero

- Raise brightness moderately and reduce the dark overlay slightly.
- Retain sufficient contrast for the title, deck, and navigation.
- Do not change Photography hero exposure or crop.

## Photography Gallery

- Convert the `Selected photographs` section from the generic two-column detail-section shell into a route-specific full-width gallery composition.
- Place the title inside a long horizontal framed band spanning the content width, with the title left-aligned and the short introduction aligned to the right within the same band.
- Collapse the band into a compact vertical stack on mobile without recreating the former large empty left column.
- Put the image sequence below the band at full available width.
- Landscape photographs span one full row. Portrait photographs use two equal columns on desktop.
- At 40rem and below, all photographs become one column.
- Preserve enlargeable source links, intrinsic image dimensions, captions, focus states, and natural orientation classes.
- Change the boats caption to `San Francisco · Boats on blue water` in English and `旧金山 · 蓝色水面上的船只` in Chinese.

## Translation Repair

- The current language application updates only the first element matching a copy selector. This leaves the second internship action in English.
- Apply copy entries to every matching element, while preserving selector scoping and the existing per-route dictionaries.
- Both internship actions should render `进一步了解` in Chinese and `Learn more about this` in English.
- Add a regression test covering multiple elements matched by one translation selector.

## Project Expansion Sequence

Do not add the four new projects during this visual update.

1. Bring the current project detail pages to a consistent minimum depth first.
2. Add the WeChat “小饭桌” mini-program and Track & Traction next, once screenshots, scope, contribution, and outcomes can support concise detail pages.
3. Present the Personal Digest and Stuttering Doctor skills later under a lighter `Tools / Experiments` grouping or one combined workflow case study, rather than giving every skill equal weight on the homepage.

This sequence keeps the site useful to US schools and employers while preventing the homepage from becoming a dense project inventory.

## Files and Scope

Expected production edits:

- `index.html`
- `detail.css`
- `tokens.css`
- `i18n.js`
- `DESIGN.md`
- relevant files under `tests/`

No production page or image file will be created or deleted. The existing Bryce Canyon WebP is reused.

## Verification

- Regression tests for all matching translation nodes.
- Contract tests for Travel cover media and the new Photography structure.
- CSS tests for route-specific hero exposure and glass navigation tokens.
- Visual review at 1440×900 and 1280×800.
- Responsive review at 320, 375, 414, and 768 CSS pixels.
- Confirm no horizontal overflow, wrapped primary navigation labels, missing images, or illegible hero text in either theme.
- Run the complete test suite from a clean committed snapshot because unrelated asset moves remain unstaged in the working directory.
