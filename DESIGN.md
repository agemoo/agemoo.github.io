# Design

## Direction

The site uses a restrained studio-editorial system: bone-white paper, charcoal typography, rust accents, strong rules, and deliberately uneven content proportions. The visual hierarchy comes from evidence and typography rather than decorative effects.

## Structure

- A roughly 70vh hero pairs a large positioning statement with the current Vertex role and two actions.
- Selected work begins immediately after the hero.
- Each case has its own rhythm, while sharing project headings, evidence notes, and honest status labels.
- The Vertex case expands into a metric ledger and an eight-step workflow.
- Experiments are text-led. The creative archive is image-led with captions that never depend on hover.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--ink` | `#171713` | Primary type and strong rules |
| `--paper` | `#f2efe7` | Page background |
| `--paper-deep` | `#e6e0d4` | Image placeholders and quiet contrast |
| `--muted` | `#656258` | Supporting copy |
| `--accent` | `#b9572b` | Evidence labels, step numbers, and focal detail |
| `--line` | `rgba(23, 23, 19, 0.18)` | Secondary rules |

There are no glow effects, glass panels, grain animation, gradient text, or ornamental marquees.

## Typography

- `Newsreader` carries display headings and evidence statements.
- `DM Sans` carries navigation, labels, and body copy.
- System serif and sans-serif fallbacks keep the page deployable if web fonts are unavailable.
- Fluid type uses `clamp()` and controlled line lengths; mobile sizes must not create horizontal overflow.

## Components

- `project-heading`: project identity, status, role, and date.
- `evidence-note`: visible qualification or attribution boundary.
- `metric-list`: ledger-like definitions, not floating KPI cards.
- `evidence-key`: two high-signal observations tied to the account portfolio.
- `workflow-step`: numbered stages with human review made explicit.
- `art-caption`: permanent dark caption strip; full-image links remain available.

## Images and crops

Gallery previews use fixed aspect-ratio containers with `object-fit: cover` so embedded side bars or mismatched source ratios do not appear in the layout. Specific `object-position` values preserve the focal subject. Clicking a preview opens the unmodified full image.

## Responsive behavior

- Desktop uses split layouts and asymmetrical columns.
- At 760px, project and hero grids become one column, while navigation wraps into a horizontally scrollable link row.
- At 520px, evidence and gallery grids become one column.
- The page uses `overflow-x: clip`; content must remain readable at 320, 375, 414, 768, and 1280px widths.

## Motion and accessibility

Motion is limited to a slight image scale on hover and smooth anchor scrolling. `prefers-reduced-motion` removes both. The site includes a skip link, visible focus state, semantic headings, image alternatives, and persistent keyboard-operable language controls.
