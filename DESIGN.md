---
name: Heaven of Dice
description: Night-purple, gold-lit showcase for the HOD board-game club.
colors:
  night-ink: "#0D0B1A"
  felt-plum: "#1A1730"
  felt-plum-raised: "#211D3A"
  royal-violet: "#534AB7"
  deep-violet: "#3C3489"
  lavender-mist: "#AEA9EC"
  lamplight-gold: "#F3B562"
  parchment-white: "#F0EEF8"
  dusk-gray: "#9E9BB8"
  soft-lilac-text: "#C9C6DD"
  meeple-violet: "#7C6FE0"
  tournament-rose: "#E8617D"
  table-teal: "#4FB5A5"
typography:
  display:
    fontFamily: "Lexend, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Lexend, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
  title:
    fontFamily: "Lexend, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "Lexend, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: "Lexend, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
rounded:
  sm: "4px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "24px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.lamplight-gold}"
    textColor: "{colors.felt-plum}"
    rounded: "{rounded.full}"
    padding: "8px 20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.parchment-white}"
    rounded: "{rounded.full}"
    padding: "8px 20px"
  card:
    backgroundColor: "{colors.felt-plum}"
    textColor: "{colors.dusk-gray}"
    rounded: "{rounded.xl}"
    padding: "20px"
  card-hover:
    backgroundColor: "{colors.felt-plum-raised}"
  chip-type:
    backgroundColor: "{colors.deep-violet}"
    textColor: "{colors.lavender-mist}"
    rounded: "{rounded.full}"
    padding: "4px 8px"
  nav:
    backgroundColor: "{colors.night-ink}"
    textColor: "{colors.parchment-white}"
    padding: "12px 24px"
---

# Design System: Heaven of Dice

## Overview

**Creative North Star: "The Midnight Game Table"**

The site is a game table late at night. The background is near-black ink with a faint neon pattern of dice, cards and chess pieces drifting behind everything. Content sits on plum "felt" panels edged in royal violet, the way the pieces sit on the board. Gold is the lamp over the table: rare and warm, and it marks where you're invited to sit down.

The density is relaxed and roomy: one column of sections, generous gaps between them, and short French copy. The mood is welcoming more than technical. Shapes are soft, glows are diffuse, and nothing is sharp-edged or corporate. Motion has one featured moment: on load, the hero logo lands like a thrown die and its violet halo lights up. Everything else is supporting motion: XP rows and the mobile menu expand smoothly, modals rise in, buttons press down when clicked, and on desktop the sections rise as you scroll. Every animation has a reduced-motion fallback.

**Key Characteristics:**

- Dark-only theme: night ink background, plum felt surfaces.
- Violet sets the structure (borders, chips, outlines). Gold is reserved for calls to action.
- A fixed game-symbol pattern at 20% opacity behind every page.
- Soft forms: pill buttons, 12px card corners, glows instead of drop shadows.

## Colors

A low-light violet palette, a single warm gold, and three muted category hues that appear only to encode data.

### Primary

- **Royal Violet** (`royal-violet`): the structural colour of the system. Card and navbar borders (usually at 50% opacity), secondary button outlines, dividers. It is the most-used colour in the codebase.
- **Deep Violet** (`deep-violet`): filled chips and badges, such as event-type tags.
- **Lavender Mist** (`lavender-mist`): text on violet chips, the hero tagline, and link hover colour in the navbar.

### Secondary

- **Lamplight Gold** (`lamplight-gold`): primary buttons (registration), "Voir tout" links and the CTA panel border. The only warm colour in the system.

### Tertiary (data only)

- **Meeple Violet** (`meeple-violet`), **Tournament Rose** (`tournament-rose`), **Table Teal** (`table-teal`): event-category colours in the calendar (dots, plus 15%-tinted chips with 40% borders) and XP breakdown colours (organisation, management). They always encode a category and are never decorative.

### Neutral

- **Night Ink** (`night-ink`): the page background and the navbar at 95% opacity with backdrop blur.
- **Felt Plum** (`felt-plum`): card, panel and hero surfaces; also the text colour on gold buttons.
- **Felt Plum Raised** (`felt-plum-raised`): hover surface for clickable cards.
- **Parchment White** (`parchment-white`): headings and primary text.
- **Dusk Gray** (`dusk-gray`): body and secondary text, descriptions and metadata.
- **Soft Lilac Text** (`soft-lilac-text`): dense reading text inside modals and tables.

### Named Rules

**The Lamplight Rule.** Gold marks an invitation to act (join, register, see more), and nothing else. If an element isn't asking the visitor to do something, it isn't gold.

**The Category-Colour Rule.** Rose, teal and meeple violet each mean one category. Never use them for decoration or brand emphasis.

## Typography

**Body Font:** Lexend (with ui-sans-serif, system-ui fallback)

**Character:** A single rounded, very readable geometric sans used across every role. The hierarchy comes from weight and size, never from a second family.

Lexend is self-hosted via `next/font/google` in `app/layout.tsx` and exposed as `--font-lexend`.

### Hierarchy

- **Display** (800, 2.25rem → 3rem at `sm`, tight tracking): the hero "Heaven of Dice" title only.
- **Headline** (700, 1.5rem): section titles (`À propos`, `Événements à venir`). Page titles go up to 1.875rem.
- **Title** (600, 1rem): card titles and member names.
- **Body** (400, 0.875rem in components, 1rem / 1.125rem in prose and taglines): descriptions in Dusk Gray. Prose is capped at `max-w-4xl`.
- **Label** (400–600, 0.75rem): chips, badges, calendar metadata.

### Named Rules

**The One Family Rule.** One typeface, five steps. Build emphasis with weight (600 to 800), not with a new font.

## Layout

One centred column, 1152px max (`max-w-6xl`), with 16px gutters on mobile and 24px from `sm`. Page sections stack with 48px gaps (`space-y-12`). Inside a section, the heading and content sit 12px apart. Card grids collapse to one column on mobile. The navbar switches to a toggled vertical menu below `md` (768px). The hero is centred and holds a 192–224px logo over a blurred violet halo.

## Elevation & Depth

Depth comes from tonal layering plus glows, not from drop shadows. Surfaces step from Night Ink up to Felt Plum, and to Felt Plum Raised on hover. The background pattern is a fixed layer at 20% opacity that stays behind everything. Glows are violet and diffuse and appear only on featured elements.

### Shadow Vocabulary

- **Violet halo** (`box-shadow: 0 0 40px rgba(83,74,183,0.3)`): highlighted panels and modals.
- **Faint aura** (`box-shadow: 0 0 16px rgba(83,74,183,0.15)`): subtle emphasis on cards.
- **Logo glow** (`drop-shadow: 0 0 25px rgba(157,92,255,0.45)`): hero logo only.

### Named Rules

**The Glow-Not-Shadow Rule.** Things here light up, they don't cast shadows. Never use a dark offset drop shadow.

## Shapes

Soft and friendly. Buttons, chips and badges are fully rounded pills. Cards and panels use 12px corners, and the hero uses 16px. Small utility controls (the mobile menu toggle, menu items) use 4px. Borders are 1px in Royal Violet, usually at 50% opacity, rising to full opacity on hover.

## Components

### Buttons

- **Shape:** pill (`rounded.full`).
- **Primary:** Lamplight Gold fill with Felt Plum text, semibold, 8px × 20px padding. Used for the registration CTA.
- **Secondary:** transparent with a 1px Royal Violet border and Parchment White text. Used next to the primary, for example "Rejoindre Discord".
- **Hover:** the primary button brightens (`brightness-110`), and the secondary button fills with Felt Plum Raised.
- **Focus:** a global 2px Lavender Mist outline with a 2px offset on every interactive element (`globals.css`). Don't override it per component.

### Chips

- **Type chip:** Deep Violet fill, Lavender Mist text, 0.75rem, pill shape.
- **Category chip:** the category hue at 15% for the fill, a lighter tint of it for the text, and a 1px border at 40% opacity.

### Cards / Containers

- **Corner Style:** 12px.
- **Background:** Felt Plum, or Felt Plum Raised on hover when the card is clickable.
- **Border:** 1px Royal Violet at 50% opacity, full opacity on hover.
- **Internal Padding:** 20px (24px for CTA panels).
- **CTA panel:** same card, but with a gold border at 50% opacity and centred content.

### Inputs / Fields

- Search fields on the Ludobible and XP pages: Felt Plum surface, Royal Violet border, rounded corners.

### Navigation

- A sticky top bar: Night Ink at 95% opacity with backdrop blur and a Royal Violet bottom border. The small logo and the wordmark are on the left, and 0.875rem links on the right, which turn Lavender Mist on hover. On mobile, a bordered "Menu" toggle opens a stacked list.

### Brand logo

- `components/BrandLogo.tsx`: `BrandLogo` (`sm` 32px in the navbar, `lg` for feature spots) and `BrandLoader`, a pulsing logo with a label that replaces skeletons while a whole page's Sheet data loads. Skeletons stay for partial sections such as upcoming events on the home page.
- Every icon (favicons, Apple touch icon, PWA and maskable icons, iOS launch screens) comes from `public/logo.png` via `scripts/generate-icons.py`, on a Night Ink fill.
- The 404 page (`app/not-found.tsx`) is the one place the logo's own magenta → violet gradient appears as a colour, on the "404" digits.

### Hero

- A 16px-radius Felt Plum panel with a violet border. It carries the `hero-grain` treatment: two radial glows (lavender and gold) pulsing over 8s, plus a fine dotted grain. The logo sits centred over a blurred violet halo.

## Do's and Don'ts

### Do:

- **Do** use Felt Plum cards with a 1px Royal Violet border at 50% opacity as the default container.
- **Do** keep gold for actions such as registering, Discord and "see more" links.
- **Do** use pill shapes for buttons and chips, and 12px corners for cards.
- **Do** show depth with violet glows and tonal steps.
- **Do** keep the logo and the purple/gold identity as they are (a brand commitment).

### Don't:

- **Don't** use gold for decoration, headings or non-interactive highlights.
- **Don't** use the category hues (rose, teal, meeple violet) outside data encoding.
- **Don't** add dark drop shadows or a light theme.
- **Don't** introduce a second typeface.
