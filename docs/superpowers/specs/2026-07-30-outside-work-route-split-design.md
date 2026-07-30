# Outside Work Route Split

Date: 2026-07-30  
Status: Approved architecture; pending written-spec review  
Primary language: English  
Secondary language: Chinese

## 1. Decision

Music, Photography, and Travel will become three independent detail pages reached directly from the homepage. The visitor will not pass through a visible `Outside Work` index page.

The homepage already presents the three subjects as distinct visual entries. Repeating that choice on a second page would add a click without adding information. The split also prevents the now-substantial Music history from overwhelming the shorter Photography and Travel material.

## 2. Route architecture

The public routes will be:

- `/music.html`
- `/photography.html`
- `/travel.html`

Homepage cards will link directly to those routes. The existing `Explore outside work` link will be removed because it no longer has a unique destination or purpose.

`/outside-work.html` will cease to be a visible content page. It will remain only as a compatibility route so previously shared links do not break:

- `/outside-work.html#outside-music` redirects to `/music.html`
- `/outside-work.html#outside-photography` redirects to `/photography.html`
- `/outside-work.html#outside-travel` redirects to `/travel.html`
- `/outside-work.html` without a recognized fragment redirects to `/#outside-work`

The redirect route must not introduce a visible intermediate choice or require user interaction.

## 3. Shared navigation

Each new page will use the existing dark-gallery detail shell and contain:

- the Mukun Sun wordmark linking to the homepage;
- direct links to Music, Photography, and Travel;
- a return-to-home link;
- the existing EN / 中文 switch;
- compact navigation on narrow and coarse-pointer devices.

The active subject may be indicated through restrained text color or an accessible current-page state. It must not become a tab bar, pill cluster, or new card navigation system.

## 4. Content ownership

### 4.1 Music

`music.html` owns the complete music narrative currently located in `outside-work.html`:

- the upright/electric bass introduction;
- the selected performances and projects timeline;
- the verified SUU and Wuhan experiences;
- the Jazz Fest video link;
- music study with Sun Xun and Daren Burns;
- the five event photographs already wired to specific entries.

Music remains a chronological editorial record, not a résumé table or a generic gallery.

The timeline must use the available page width. It must not remain nested inside the narrow right-hand column of the current shared section layout. After the Music title and introduction, the timeline spans the main content width.

On wide screens, each event uses a coordinated three-part track:

- date and location in a compact left column;
- title and description in a flexible central column;
- related media in a right column when that event has an approved image.

Events without media allow the text track to expand rather than reserving an empty image column. The arrangement must not strand a large unused field on the left. At narrower widths, the tracks collapse progressively and become one column on mobile.

### 4.2 Photography

`photography.html` owns photography as visual work. It prioritizes image sequence, scale, light, structure, and atmosphere. Copy remains limited to a short introduction and factual captions.

The page must retain natural image proportions and the existing enlargement dialog. It must not become a uniform thumbnail grid or force every photograph into one crop ratio.

### 4.3 Travel

`travel.html` owns place-led material: locations, museums, architecture, and short observations. It is not a travel guide, itinerary archive, or duplicate photography gallery.

The initial page may be deliberately concise. It may use only existing original material that clearly supports a place-based narrative. It must not fabricate diary entries, recommendations, dates, or reflections merely to make the page look complete. Future travel material can be added as compact field notes.

### 4.4 Duplication rule

Each image has one primary editorial home. Photography-led images belong to Photography; place-led images belong to Travel. The same full image should not be repeated on both pages unless a future story has a specific reason to reuse it.

## 5. Visual and interaction constraints

The route split is an information-architecture change, not a redesign. All three pages inherit:

- the existing color and typography tokens;
- the dark editorial atmosphere;
- the restrained reveal and scroll-progress behavior;
- natural-ratio media treatment;
- focus styles, keyboard-accessible image dialogs, and reduced-motion fallbacks;
- English-first rendering with complete Chinese parity.

The three pages may vary in composition according to content:

- Music uses a full-width editorial timeline rather than confining all events to the right side of the page.
- Photography uses an image-led sequence with varied scale.
- Travel uses compact place notes with supporting images.

They must still read as one website. No page may introduce a new theme, decorative slogan, fake metric, empty placeholder card, or generic “coming soon” block.

## 6. Technical boundaries

The implementation will:

- create `music.html`, `photography.html`, and `travel.html`;
- convert `outside-work.html` into the compatibility redirect route;
- update homepage links and bilingual copy;
- extend the shared page-key and metadata dictionaries in `i18n.js`;
- reuse `detail.css` and `detail.js`, adding only route-specific selectors where required;
- update route, bilingual, media, responsive, accessibility, and redirect tests;
- preserve all unrelated local assets and user files.

No existing project or internship detail route will change beyond the shared i18n cache key if required for deployment.

## 7. Acceptance criteria

1. Each homepage Outside Work card reaches its matching page in one click.
2. No visible page asks the visitor to choose Music, Photography, or Travel a second time.
3. Previously published `outside-work.html` fragment URLs resolve to the correct new page.
4. Music retains all currently approved experiences, images, bilingual copy, and the Jazz Fest link.
5. The desktop Music timeline spans the main content width and does not leave a large empty title rail beside all events.
6. Events with images coordinate date, copy, and media; events without images expand their copy instead of preserving a blank media column.
7. Photography and Travel have distinct editorial purposes and do not repeat the same image without justification.
8. English remains the default and every visible string and image alt text has Chinese parity.
9. The pages have no horizontal overflow at 320, 375, 414, or 768 pixels.
10. Existing focus, reduced-motion, natural-ratio image, and dialog behavior remains intact.
11. No invented personal claims, dates, metrics, recommendations, or travel reflections are introduced.
12. The full automated test suite and `git diff --check` pass before publication.

## 8. Out of scope

- Redesigning the homepage Outside Work composition.
- Adding a blog, CMS, tagging system, map, or travel-guide functionality.
- Generating new photography or travel writing without source material.
- Changing the main professional sections, project pages, or internship evidence.
- Publishing unused local images merely because they exist in `assets`.
