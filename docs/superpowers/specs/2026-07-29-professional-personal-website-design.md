# Professional Personal Website Redesign

Date: 2026-07-29
Status: Approved design
Primary language: English
Secondary language: Chinese

## 1. Purpose

The site will evolve from a job-oriented portfolio into a professional personal website. It must still allow a U.S. employer, campus hiring manager, or school reviewer to understand Mukun Sun's background and strongest evidence within about three minutes, while giving interested visitors a second layer through which they can understand his music, photography, places, and working process.

The intended balance is:

- 60% professional evidence
- 40% personal narrative

This is not a résumé replacement, a lifestyle blog, or a freelance-services landing page. It is an English-first personal website that demonstrates professional credibility and makes the person behind the work memorable.

## 2. Design principles

1. **Sparse before decorative.** The hero remains visually restrained. It contains no résumé labels, statistics, badges, portrait, or CTA cluster.
2. **Evidence before claims.** Internships and projects use verified responsibilities, approved figures, real images, and clear attribution.
3. **Progressive depth.** The homepage supports a fast scan. Complex evidence, process material, and image sets live on detail pages.
4. **Personality through specifics.** Music, photography, and places create personality through real experiences and images, not abstract brand slogans.
5. **Editorial hierarchy, not equal cards.** Content receives different visual weight according to its importance. Repeated equal-sized card grids are prohibited.
6. **Natural media treatment.** Posters and photographs retain their natural aspect ratios. A single forced crop ratio must not be applied across the site.
7. **Deliberate whitespace.** Empty space must strengthen a composition. It must not result from narrow fixed columns, undersized content blocks, broken grid spans, or content stranded on the left with a large unused area on the right.
8. **Preserve the existing character.** The redesign changes information architecture and content density without flattening the existing dark-gallery visual system or reducing its motion quality.

## 3. Information architecture

### 3.1 First layer: homepage

The homepage presents the following order:

1. Hero
2. About
3. Internship Experience
4. Selected Projects
5. Education
6. Outside Work
7. Contact

The homepage must be understandable without opening any detail page.

### 3.2 Second layer: detail pages

The initial second layer consists of:

- Existing Vertex Marketing internship evidence
- Campus Integrated Campaign
- Hotel × Jazz
- Selected Visual Work
- Outside Work

`Outside Work` is initially one unified page with Music, Photography, and Places as internal chapters. These chapters may become separate pages only when each has enough original material to justify one.

`Behind the Work` is not a top-level navigation item. Process notes, drafts, decisions, and reflections belong inside the relevant internship or project detail page.

`Writing / Notes` is deferred until at least three worthwhile pieces exist. It must not ship as an empty or placeholder section.

### 3.3 Navigation

The primary navigation is simplified to:

- About
- Work
- Outside Work
- Contact
- EN / 中文

Internships, Projects, and Education remain distinct homepage sections even though they are grouped under the `Work` navigation path. The compact navigation remains available on narrow screens.

## 4. Homepage design

### 4.1 Hero

The hero contains:

- `Mukun Sun`
- `Communication, community, and music.`
- `Scroll to explore`

Chinese:

- `孙慕坤`
- `传播、社群与音乐。`
- `向下探索`

The current long role description is removed from the hero and absorbed into About. The hero remains typography-led and keeps the existing staged entrance, grain, vignette, spotlight, and scroll cue.

### 4.2 About

About uses the existing portrait and two short paragraphs.

Approved English copy:

> I study Strategic Communication at Southern Utah University, with a minor in Business Analytics. My work spans social media, community operations, visual communication, and event promotion. I like learning how an audience actually behaves before deciding what to make.
>
> Outside work, I play upright and electric bass in SUU ensembles. Music has also taken me into concert planning, photography, and the small details that make an event feel memorable.

Approved Chinese copy:

> 我在南犹他大学学习战略传播，辅修商业分析。我的实践涉及社交媒体、社群运营、视觉传播和活动推广。我习惯先理解受众实际如何参与，再决定要做什么内容。
>
> 工作之外，我在 SUU 的乐团中演奏低音提琴和电贝斯。音乐也让我参与音乐会策划、摄影，以及那些真正影响一场活动体验的细节。

The existing Community / Content / Visual / Workflow capability ledger is removed completely, including its markup, CSS, translations, and test expectations. About flows directly into Internship Experience.

### 4.3 Internship Experience

The section remains explicitly labelled `Internship Experience`.

#### Vertex Marketing

The homepage includes:

- Company
- Role
- Dates
- A responsibility summary of no more than two sentences
- One compact evidence line using only the user-approved Vertex figures
- A concise attribution statement
- A link to the existing evidence page

The existing three oversized statistic blocks become a quieter evidence line. Vertex remains the strongest current professional experience but must not dominate the entire homepage.

#### Southern Utah University teaching assistantship

The homepage includes:

- Institution
- Role
- `May 2026`
- A concise responsibility summary
- `assets/internship/SUU_TA/me_classroom.jpg` as the primary image

The visual balance of the two internship entries should be approximately 55% Vertex and 45% teaching assistantship.

No classroom photograph containing identifiable students or professors is published beyond the approved primary image unless the user confirms public-use permission.

### 4.4 Moving interlude

The current marquee motion is retained because it gives the page rhythm. Its job-keyword copy is replaced with concrete experience lines:

- Community Operations
- Teaching
- Campaigns
- Jazz Performance
- Visual Communication

The movement remains linear, slow, and low-interference. It is disabled or simplified under reduced-motion and coarse-pointer conditions.

### 4.5 Selected Projects

The homepage no longer expands project descriptions in place. It provides three compact, fully clickable entries:

1. Campus Integrated Campaign
2. Hotel × Jazz
3. Selected Visual Work

Each entry includes a title, one sentence, and a restrained image preview. Complete process and evidence move to the corresponding detail page.

Image allocation:

- Campus Integrated Campaign: `assets/project/CampusGala/freshmen_welcome_gala.jpg`
- Hotel × Jazz: `assets/project/Andi/andi_fest_2.png`
- Hotel × Jazz secondary detail image: `assets/project/Andi/andi_fest.jpg`
- Selected Visual Work: two or three existing works as an editorial preview rather than a full grid

### 4.6 Education

Education stays expanded on the homepage and remains separate from projects and internships. It uses a chronological ledger rather than cards.

The section contains no decorative image. Its visual role is clarity and grounding.

### 4.7 Outside Work

The homepage combines personal interests into one asymmetric section:

- Music receives the largest visual area.
- Photography receives a smaller supporting entry.
- Places combines travel, museums, and observation of cities or environments.

The primary Music image is `assets/music/performance.jpg`.

Photography may initially use an existing authored photograph, but its final selection will be replaced or expanded after the user supplies additional original work.

Places may launch as a restrained text-led entry until the user provides one representative travel or museum image. No stock or generated image is used as a substitute.

The section links to one unified `outside-work.html` page. It must not use three equal interest cards.

### 4.8 Contact

The service-oriented campaign slogan is removed.

Approved English:

> Get in touch.
>
> You can reach me by email or LinkedIn.

Approved Chinese:

> 保持联系。
>
> 你可以通过电子邮件或 LinkedIn 联系我。

Existing contact destinations remain unchanged.

## 5. Detail-page structure

### 5.1 Shared structure

Each detail page includes:

1. Compact global navigation
2. Project or chapter title
3. Plain context statement
4. Mukun's role and contribution
5. Selected evidence, process, or images
6. Short reflection when supported by real information
7. Link back to the homepage or next related page

Detail pages reuse the locked dark-gallery tokens, typography, spacing, and motion language. They must not introduce a second visual brand.

### 5.2 Visual Work

The existing HOTONE, jazz, piano, museum, brochure, and bass works are preserved on a dedicated page.

The page uses:

- A small curated lead selection
- A quieter archive below
- Natural image ratios
- No uniform poster crop
- No endless homepage-sized gallery

### 5.3 Outside Work

The first version contains:

- Music: performance, ensembles, and music-event coordination
- Photography: original authored photographs
- Places: travel and museum observations when supported by real content

Music is the strongest and most complete chapter. Photography and Places must not be padded with generic copy to make the chapters appear equal.

## 6. Layout and spacing requirements

The existing approximate `1240px` content width and fluid page gutters remain the foundation.

### 6.1 Wide-screen balance

- Section containers use the available width rather than placing all copy in a narrow left column.
- Two-column layouts use `minmax(0, ...)` tracks and explicit proportions based on content, not fixed pixel columns.
- About should read as a balanced text-and-portrait composition.
- Internship entries must distribute text, evidence, and imagery across the grid so the right half is not accidentally empty.
- Project entries may alternate emphasis, but their outer edges align with the shared page grid.
- Outside Work deliberately uses one large Music area and two smaller entries; the smaller column must still fill its vertical relationship to the lead image.
- Long-form text keeps a readable measure, but the surrounding layout uses rules, media, metadata, or aligned negative space to complete the composition.
- Intentional negative space must have a visible anchor such as a heading, rule, portrait, image edge, metadata column, or next-section relationship.

### 6.2 Chinese typography

- Chinese body copy receives a more generous line height than English.
- Chinese columns widen when necessary to avoid dense short lines and awkward ragging.
- Section titles, dates, and supporting copy must not create isolated narrow fragments.
- Manual line breaks are avoided unless the break remains valid in both languages and across responsive widths.

### 6.3 Responsive behavior

The site is verified at 320, 375, 414, and 768px, plus a representative wide desktop viewport.

- Multi-column sections collapse to one column without horizontal scrolling.
- Clickable navigation and gallery controls remain at least 44px on touch devices.
- Section titles wrap safely.
- Images retain their natural ratio.
- Horizontal gaps do not survive after the content collapses.
- `html` and `body` use safe overflow handling without hiding layout defects.

## 7. Visual system and motion

The existing `Gallery in the Dark` system remains locked.

Preserved:

- Warm black surfaces
- Bone-white body text
- Restrained amber and teal accents
- Film grain
- Vignette
- Pointer spotlight
- Scroll progress
- Fixed navigation transition
- Hero choreography
- IntersectionObserver reveals
- Portrait parallax
- Existing Chinese font fallback strategy

Added or adapted:

- Restrained image-mask reveals
- Project-entry image focus and arrow response
- Short opacity and translate transitions for additional media
- Accessible enlarged image viewing on detail pages

Motion changes only `transform` and `opacity`. It must not animate layout dimensions or distort natural image ratios.

Under `prefers-reduced-motion`, coarse pointers, or narrow screens:

- Parallax and spotlight motion stop
- Spatial transitions collapse to brief opacity changes
- Content is immediately available

No new animation framework is required.

## 8. Image behavior and privacy

- Every image has a meaningful English and Chinese alternative description where the surrounding language changes.
- Width and height metadata are supplied to reduce layout shift.
- Homepage images use deliberate focal crops only when the preview requires one.
- Detail views reveal the natural full image.
- Enlarged-image behavior supports a visible close control, `Esc`, focus management, and background dismissal where appropriate.
- Sensitive workplace screenshots must be redacted and explicitly approved.
- User-provided Vertex figures override internship logs or inferred figures.
- Images containing identifiable classmates, students, professors, coworkers, or clients are not published without permission or a privacy-safe treatment.

Recommended omissions from the current public selection:

- `assets/music/grand_ball_with_friends.jpg` because of weak clarity
- `assets/internship/SUU_TA/professor_classroom.jpg` because Mukun is not the subject and privacy risk is higher
- Redundant group photographs that add no distinct evidence

## 9. Internationalization

- English is the default document language and metadata language.
- `EN / 中文` remains in the upper-right navigation.
- Language choice persists across navigation and detail pages.
- All new visible UI, page metadata, image labels, and accessible control names have English and Chinese equivalents.
- `community` is translated as `社群` when referring to audience groups or online community operations.
- Missing translations must fall back to English without hiding content or breaking layout.

## 10. Progressive enhancement and failure behavior

- Core content and links remain usable without JavaScript.
- JavaScript enhances reveals, language persistence, navigation state, and enlarged-image behavior.
- If IntersectionObserver is unavailable, content is visible immediately.
- If an image fails to load, surrounding text and navigation remain readable.
- Detail-page navigation always includes a functional return path.
- No page depends on hover alone to expose essential information.

## 11. Expected file scope

Expected production modifications:

- `index.html`
- `tokens.css` only if additional shared tokens are required
- Existing translation and test files associated with homepage selectors
- `projects/vertex-reddit.html` only for shared navigation or language consistency if necessary

Expected additions:

- `projects/campus-campaign.html`
- `projects/hotel-jazz.html`
- `projects/visual-work.html`
- `outside-work.html`
- Shared script or stylesheet files only if extracting repeated detail-page behavior reduces duplication
- Tests for new routes, translations, images, and interaction contracts

Expected production deletions:

- None

The old capability-ledger markup and unused styles are removed from `index.html`; this is an in-file cleanup, not deletion of a production file.

## 12. Verification

Implementation is complete only when:

- English loads by default.
- The language switch works on the homepage and every new detail page.
- The capability ledger is absent.
- About flows directly into Internship Experience.
- The approved homepage section order is present.
- Vertex uses only approved figures with attribution.
- Project entries link to valid pages.
- The Outside Work entry links to a valid unified page.
- No referenced image path is broken.
- Images do not receive a universal forced aspect ratio.
- Wide screens do not contain accidental large empty regions on the right.
- Chinese typography remains readable and balanced.
- Keyboard focus and enlarged-image dismissal work.
- Content remains accessible without JavaScript.
- Reduced-motion behavior is respected.
- Layouts pass visual checks at 320, 375, 414, 768px, and a wide desktop viewport.
- Existing automated tests are updated and passing.

## 13. Deferred work

- Additional original photography supplied by the user
- A stronger Places image and accompanying original story
- A Writing / Notes section after enough material exists
- Splitting Outside Work into separate pages after content grows
- Publishing additional classroom or group images after permission is confirmed
