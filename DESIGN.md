# Design

## Locked Professional Personal Contract (2026-07-29)

This is an **English-first** professional and personal website. English owns the default document language, metadata, and navigation; Chinese is a complete user-selected translation that never competes with the default entry path.

The approved homepage order is **about → experience → projects → education → outside work → contact**. The first layer is designed for fast scanning, with a deliberate **60/40 positioning** between professional evidence and personal context. The homepage stays concise while the second layer carries depth.

### Information architecture

- Experience gives role, responsibility, a compact evidence line, careful attribution, and a link to the complete Vertex record.
- Projects are three editorial links, not disclosures. The **second-layer routes** are `projects/campus-campaign.html`, `projects/hotel-jazz.html`, and `projects/visual-work.html`.
- Education remains a directly readable chronological ledger with verified facts.
- The **asymmetric Outside Work** gateway uses one large Music track and a filled supporting column for Photography and Places, with one route to `outside-work.html`.
- Contact is neutral and limited to email and LinkedIn.

## Theme and tokens

The authored visual baseline remains **Gallery in the Dark**: warm black surfaces, bone-white text, restrained ember accents, film grain, fine rules, and a subtle pointer spotlight. A complementary light system uses warm paper, dark ink, quieter grain, and the same restrained ember register. A valid saved user choice takes priority, then the site falls back to dark regardless of operating-system preference; the shared synchronous theme boot applies that choice before the first render and persists only explicit selections. English remains the first-visit language fallback.

Shared color, effect, type, spacing, motion, and width values come from `tokens.css`; render CSS does not introduce route-local palettes or raw color values. Layout, content, language, and motion contracts stay identical between themes, while navigation translucency, media treatment, overlays, dialog backdrops, and ambient effects consume theme-aware semantic tokens.

The accent is reserved for focus, evidence numbers, and a small number of interaction cues. Contrast remains functional at small sizes. Fragment Mono is limited to the navigation wordmark register and the compact evidence-number register.

## Layout

The main content width is approximately 1240px, with fluid gutters and section spacing. Wide screens use intentionally uneven tracks for About, Experience, teaching media, project links, and Outside Work. The **wide-screen balance rule** is that every track uses `minmax(0, …)` plus a bounded media/supporting column so no accidental right-side void appears at large widths.

At `60rem` and below, all asymmetric homepage tracks collapse to one column. Compact navigation replaces the full navigation at the same breakpoint and remains available for coarse pointers. Primary touch targets are at least 44px, and headings and grid children are protected from horizontal overflow.

All full-image previews are **natural-ratio media** with intrinsic width and height attributes and `height:auto`; project and outside-work images are not forced into equal-card crops. The portrait keeps its authored framing and subtle parallax treatment.

The three Outside Work routes use image-integrated editorial heroes. Music owns a performance photograph, Photography owns `the_strip`, and Travel owns the dedicated Bryce Canyon image. Theme-aware layered scrims protect the type without flattening the image; mobile views use intentional focal positions. Photography thumbnails use consistent 4:3 landscape and 3:4 portrait frames, while the enlarge dialog always presents the full natural-ratio source. The `Photography` hero title remains on one line at supported widths.

Navigation uses one restrained frosted material across the homepage and detail routes: a 76% soft page-color surface, 18px localized blur, modest backdrop saturation, and a fine lower rule. The scrolled state switches to the denser theme surface without adding a shadow or another visual layer.

Outside Work exposure follows the photograph rather than a uniform preset. Photography remains dark and atmospheric. Music uses a moderately brighter performance treatment. Travel preserves the Bryce Canyon highlights with higher brightness and saturation plus a directional text-protection scrim. The same Bryce Canyon asset supplies the temporary Travel homepage cover.

The Photography gallery is a route-specific full-width composition. Its title and short introduction share one horizontal ruled band; the image sequence begins below at the full content width. Landscapes span the row, portraits use two equal columns, and all media collapses to one column on small screens.

## Motion

The original **dark-gallery motion** is preserved: hero entrance choreography, observer-driven section reveals, linear marquee movement, portrait parallax, pointer spotlight, film grain, and transform-based progress. Project links use a restrained underline reveal; media remains legible without hover.

The document starts with `no-js`, so content is visible without JavaScript. When IntersectionObserver is unavailable, all reveal content is exposed immediately. `prefers-reduced-motion: reduce`, narrow screens, and coarse pointers suppress spatial transforms, parallax, spotlight, grain animation, marquee motion, and nonessential transitions while keeping all content visible.

## Component contracts

- **Experience summary:** two rows, one outer rule, one separator, a single representative-evidence line, explicit Vertex attribution, and natural-ratio teaching media.
- **Teaching Assistant detail:** a concise bilingual internship route with role and context, classroom support, course operations, and two supplied classroom images. It uses verified facts only and avoids an evidence-report voice.
- **Project index:** three linked editorial rows with copy, an approved preview, and a route action.
- **Education ledger:** two verified entries shown in full on the homepage.
- **Outside Work gateway:** three unequal entries in one link, with Music dominant, Photography supportive, and Places text-led.
- **Compact navigation:** four first-layer destinations—About, Work, Outside Work, and Contact—with separate language controls.
- **Contact:** “Get in touch.”, one neutral availability sentence, and direct email/LinkedIn actions.

- **Bilingual repeated copy:** one translation selector may own multiple matching nodes; language application updates every match, so repeated actions such as both internship links remain synchronized.

Avoid decorative side rails, gradient text, generic glass cards, equal-size icon-card grids, repeated navigation labels inside every section, fabricated imagery, and text overflow.

English prose uses half-width punctuation and straight quotation marks. Chinese prose uses full-width punctuation with `“……”` and `‘……’` where quotation marks are required.
