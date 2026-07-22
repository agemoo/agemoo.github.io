# English-First Personal Site Index Redesign

## Goal

Turn the current long-form portfolio into an English-first personal website that can grow beyond job applications while still helping a U.S. school or employer understand Mukun Sun's professional value within a few seconds.

The redesign keeps the July 13 dark-gallery identity and motion language. It changes the content hierarchy: work, projects, education, campus life, music, and visual work become distinct parts of one personal site instead of one continuous portfolio presentation.

## Audience and Primary Job

The primary audience is U.S. employers, campus hiring teams, faculty, and graduate-school reviewers. The homepage should let them quickly determine:

- what Mukun does;
- what evidence supports it;
- where to find deeper work;
- what else defines him beyond one internship.

The English version is the canonical experience. Chinese remains available through the `EN / 中文` control, but every new visit or refresh starts in English.

## Design Direction

Preserve the existing warm-black gallery palette, serif/sans/mono pairing, fine rules, subtle grain, scroll reveals, and amber accent. Remove the giant background character `营`. The hero background remains deliberately simple: warm near-black, restrained texture, and a low-contrast light field only.

The site follows an index-first structure. The homepage introduces the person and provides compact routes into evidence. It does not display full case studies end to end.

### Hero

English headline:

> I make social content feel native to the community it enters.

English support line:

> Bilingual social media marketer with hands-on experience in community strategy, content production, and visual communication for U.S. audiences.

Chinese headline:

> 让内容真正融入它所面对的社区。

Chinese support line:

> 具备美国受众内容、社区策略与视觉传播实践的双语社交媒体营销人。

The hero retains Mukun's name and a restrained entrance sequence. It removes `Portfolio` as the dominant value proposition and does not use China–U.S. bridge language.

## Homepage Information Architecture

### 1. About

Lead with practical identity rather than student status. Describe bilingual communication, direct experience with U.S. audiences and communities, content production, and visual execution. Education appears as context later in the paragraph, not as the first credential.

### 2. Experience

Internship and work experience are separate from projects. Vertex Marketing appears as the current featured experience, but does not dominate the homepage.

The compact Vertex entry includes:

- company name and role;
- Reddit community operations scope;
- a short responsibility statement;
- three selected evidence points;
- a link to a dedicated detail page.

Approved Vertex evidence comes only from `D:/knowledge-base/wiki/findings/vertex-internship-reddit-account-portfolio.md`:

- 5 representative Reddit accounts;
- 793K cumulative views across 15 view-visible representative posts;
- 3,548 upvotes and 482 comments across 16 representative posts;
- single-post peak of 406K views, 891 upvotes, 90 comments, and 100% upvote ratio;
- highest observed U.S. audience share of 91.7%;
- participation in early setup and moderation of one official brand community.

Attribution language must remain explicit: these are representative account assets and content Mukun participated in operating, not all net-new results personally created during the internship.

The homepage shows no more than three of these figures. The detail page can explain the complete evidence scope and methodology.

### 3. Selected Projects

Replace the three fully expanded case studies with a compact project index. Each row contains only:

- project title;
- one-sentence description;
- role and year;
- one action such as `View project`.

Vertex is not repeated as a project. Campus integrated promotion and the hotel × jazz event remain projects. SUU jazz social content belongs under campus experience or music rather than being forced into a marketing case study.

Complex projects link to detail pages. Projects without enough evidence remain compact entries until suitable detail content is provided. No placeholder metrics or invented case-study material are allowed.

### 4. Education

Education remains readable on the homepage and is not hidden behind a separate route. Southern Utah University and Wuhan Polytechnic University remain distinct. Major, minor, dates, and a short relevant focus are retained; excessive coursework lists and decorative tags are removed.

### 5. Campus and Music

Create a clearly separate section that can later hold campus roles, SUU Jazz Ensemble participation, performance history, awards after title verification, and other personal material. The first implementation may use only facts already supported by the repository or user memory. It must not invent missing dates, award names, or responsibilities.

### 6. Visual Work

The homepage shows a small curated selection instead of the entire gallery. Artwork keeps its natural aspect ratio; no forced landscape crop is used for posters or brochures. A compact archive action exposes the remaining work without making the homepage excessively long.

### 7. Contact

Use concise `Email` and `LinkedIn` actions rather than displaying the current Gmail address as a large visual element. Preserve the working mail link until a professional address is supplied.

## Capability Copy

Remove knowledge-only claims such as familiarity with ad concepts. Retain only things that have been delivered or directly practiced: Reddit community operations, localized English social copy, content calendars, graphic design, short-form video, photography, Excel reporting, and practical AI-assisted workflow development where evidence exists.

Weak homepage metrics such as 19,000 impressions, 8,000 reach, 525 reads, and 200 records are removed from the global impact strip. Relevant figures may remain inside the corresponding project detail when they explain context rather than functioning as prestige statistics.

## Metadata and Quality Corrections

- Add favicon markup and a small project-owned favicon asset.
- Add Open Graph and Twitter sharing metadata for the English-first site.
- Correct `Team leAd` and remove inline `!important` overrides.
- Validate every local image path and alternative description.
- Keep the bilingual selector visible and functional at desktop and mobile sizes.
- Version the language script whenever its behavior changes so GitHub Pages and browser caches do not revive stale language logic.

## Implementation Boundaries

The site remains static and dependency-free. Existing article files and original creative assets are preserved. No production route or asset is deleted.

Expected changes:

- amend `DESIGN.md` so English-first language priority and index architecture become part of the locked system;
- modify `index.html` for the new homepage structure, metadata, and visual behavior;
- modify `i18n.js` for equal English and Chinese coverage;
- expand `tests/i18n.test.mjs` and add structure/content tests where useful;
- add `tokens.css` as the shared token source without changing the established palette;
- add a dedicated Vertex detail page;
- add a simple favicon asset;
- add Hallmark preflight and design-history metadata.

## Interaction and Motion

Preserve the page's existing cinematic entrance, scroll progress, varied reveal patterns, and reduced-motion handling. Motion is reduced only where sections are removed. Compact project rows receive a restrained hover/focus treatment, not floating cards or generic scale effects.

All interactive elements require visible keyboard focus. Motion uses opacity and transform only. Reduced-motion mode removes parallax, counters, grain animation, and spatial reveals.

## Testing and Verification

Automated tests must verify:

1. English initializes on every page load even after a previous Chinese selection.
2. English and Chinese dictionaries cover the same selectors.
3. The approved Vertex values and attribution language are present.
4. Old weak global metrics and `Team leAd` are absent from the homepage.
5. The `营` ghost element is absent.
6. Experience, projects, education, campus/music, visual work, and contact are distinct sections.
7. Project summaries are compact and do not reproduce full case studies on the homepage.
8. Open Graph, Twitter, favicon, and versioned language-script references exist.
9. Artwork links retain full source files and displayed images preserve natural proportions.

Manual browser verification covers desktop and 320, 375, 414, and 768 px widths; English/Chinese switching; keyboard navigation; cache-safe English initialization; image loading; reduced motion; console errors; and the Vertex detail route.

## Non-Goals

- No redesign into a light editorial or SaaS-card template.
- No claim that Mukun independently generated all historical Vertex account performance.
- No attempt to complete campus or music history before the user supplies more material.
- No domain or professional-email purchase.
- No deletion or destructive editing of original artwork.
- No full CMS, framework migration, analytics platform, or contact form.
