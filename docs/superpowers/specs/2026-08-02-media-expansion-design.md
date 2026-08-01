# Media Expansion Design

## Goal

Add the newly supplied internship and music photographs to the personal site, restore Photography as the sole editorial home of every file supplied under `assets/photography`, and turn Travel into a concise text-only record until dedicated travel media is supplied.

## Locked design system

This is an incremental content update inside the existing `DESIGN.md` system. Preserve the Gallery in the Dark palette, typography, Index-First homepage, N10 scroll-morph navigation, Ft5 statement footer, reveal motion, image dialog, natural media ratios, English-first behavior, and complete Chinese translation. Do not introduce a new theme, card system, font, raw color, forced crop, or extra route.

## Content ownership

- Photography owns all displayed images sourced from `assets/photography`. Travel must not reference that directory.
- Photography displays the five existing optimized photographs plus an optimized derivative of `已生成图像 1 (4).png`. The source files remain untouched.
- Travel uses the factual place list in `travel-list.md` as grouped text. It contains no images, itinerary advice, or invented reflections.
- Vertex receives the supplied workplace photograph as quiet contextual media.
- The Teaching Assistant entry uses `classroom.jpg` as its stronger primary image because it directly shows Mukun teaching. Existing source photographs remain available but are not all forced onto the homepage.
- Music uses the supplied images where their folder and known event match: `playing.png` for the Jazz Fest lead, the existing Jazz Fest image for its timeline event, `jazz_in_the_room.jpg` for the SUU Student Center performance, `headshot.png` for Grand Ball, the two `environment` images for the 2023 environmental fashion event, and the Daren Burns photograph in Study.
- The already removed `grand_ball.jpg` reference is replaced by `headshot.png`; this design does not delete any additional source asset.

## Layout

- Homepage internship rows keep their current hierarchy. Add one natural-ratio contextual image per internship without turning the section into a gallery.
- Music keeps the full-width timeline. Media events may use one image; the environmental fashion event may use a restrained two-image pair because the images show both the full stage and the bassist detail.
- Photography becomes a six-image editorial sequence with mixed wide and portrait spans. Every image retains intrinsic dimensions and `height:auto`.
- Travel keeps the current hero and shared shell, replacing image-led notes with a grouped geographic ledger derived from `travel-list.md`. The ledger fills the content width and collapses cleanly on narrow screens.

## Copy

- Homepage Vertex link: `Learn more about this` in English and `进一步了解` in Chinese.
- Remove “evidence” language only from this homepage action; do not rename the factual Vertex detail sections in this scope.
- Captions and alt text describe only visible, supplied facts. Unknown locations or identities are not inferred.
- Travel names places only; it does not claim recommendations, dates, preferences, or stories the user did not provide.

## Verification

- Tests enforce that no Travel production markup or Travel translation references `assets/photography`.
- Tests enforce that each displayed Photography image has one primary home on `photography.html`.
- Tests cover the new homepage link wording in both languages, new media paths and intrinsic dimensions, image-dialog links, and route cache keys.
- Run `git diff --check` and the complete Node test suite.
- Verify that user-owned edits to `.gitignore`, `README.md`, and unrelated untracked files are not staged.

## Hallmark self-review

- No placeholders, fabricated facts, new design system, or contradictory route ownership.
- Image selection is selective on the homepage and fuller on detail pages, preserving hierarchy.
- Natural ratios, responsive collapse, bilingual parity, reduced-motion behavior, and existing interaction patterns remain explicit requirements.
