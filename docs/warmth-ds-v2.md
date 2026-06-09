# Warmth DS V2

### A design system that proves warmth and rigor are the same thing.

> _Poetic intent, technical execution. AAA contrast isn't a nice-to-have — it's the proof that the system actually cares about the people encountering it._

Built as the foundation for a senior UX designer's portfolio (rachanamandal.space), extensible to Inky Lily Studios. Named for the quality it embodies — warmth without sentimentality, precision without coldness. V2 rebuilds the token architecture for WCAG AAA compliance, introduces a register-based theming system, and removes all-caps from default treatments.

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Registers](#2-registers)
3. [Colour Tokens](#3-colour-tokens)
4. [Typography](#4-typography)
5. [Spacing](#5-spacing)
6. [Layout & Grid](#6-layout--grid)
7. [Borders & Radius](#7-borders--radius)
8. [Shadows & Elevation](#8-shadows--elevation)
9. [Motion & Easing](#9-motion--easing)
10. [Z-Index](#10-z-index)
11. [Icons](#11-icons)
12. [Buttons](#12-buttons)
13. [Badges](#13-badges)
14. [Cards](#14-cards)
15. [Tabs](#15-tabs)
16. [Header & Navigation](#16-header--navigation)
17. [Links & CTAs](#17-links--ctas)
18. [Form Inputs](#18-form-inputs)
19. [Journal Layer](#19-journal-layer)
20. [The Garden](#20-the-garden)
21. [Easter Egg System — Inky Lily's Studio](#21-easter-egg-system--inky-lilys-studio)
22. [Accessibility](#22-accessibility)
23. [Dark Mode](#23-dark-mode)
24. [V1 → V2 Changelog](#24-v1--v2-changelog)
25. [File Map](#25-file-map)

---

## 1. Philosophy

### The Miyazaki Journal principle

Warmth DS is not a UI kit — it is a working notebook made visible. Like Miyazaki's production journals, the value isn't in the final frame. It's in the trail of decisions behind it: the color rejected for failing contrast, the spacing token renamed for clarity, the component state added because edge cases matter.

The system is both a functional toolkit and a case study artifact. Someone reviewing the token structure should understand the thinking without explanation.

### The Arrietty principle (preserved from V1)

The portfolio is not a document. It is a place. Like Arrietty's house — a world that reveals more the longer you look. Every surface has been chosen with intention. Nothing is decorative that isn't also structural.

### Three pillars

| Pillar                 | What it means                                                                   | How it shows                                                                  |
| ---------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Grounded warmth**    | The palette, typography, and spacing evoke tactility and calm                   | Paper tones, organic type pairings, generous spacing                          |
| **Structural clarity** | Every token exists for a reason. Contrast ratios meet AAA. Naming is consistent | Token taxonomy, computed contrast tables, semantic layering                   |
| **Intentional craft**  | The gap between "looks beautiful" and "works beautifully" is closed             | Complete component states, stress-tested type hierarchy, documented rationale |

### What Warmth DS is not

- It is not cozy. Cozy is accidental warmth. This is deliberate.
- It is not minimal. It is considered. There is a difference.
- It is not decorative. Every element has a structural reason.
- It is not a template. Every element must be functional.

---

## 2. Registers

V2 replaces the V1 philosophical registers (Rigorous / Human / Quiet) with a mechanical register system — three Figma variable modes that switch token values.

### Register 1 — Technical (Portfolio: rachanamandal.space)

Warmth is ambient, not overt. It lives in the background tone, the type pairings, the spacing generosity — not in color saturation or decorative elements.

- Lora Medium headlines (not Bold — quieter, editorial)
- Lora Regular body text in ink.900 (maximum contrast, upright, authoritative)
- Two accent colors only (madder + moss). Ochre, slate unavailable.
- Madder.900 for accent text (AAA compliant, not madder.700)
- Phosphor Light icons
- Radius 4px elements, 6px cards
- The overall impression: a well-made tool

### Register 2 — Balanced (Default / DS documentation)

Full warmth, full system. This is where the DS documentation itself lives.

- Lora Bold headlines
- Lora Italic body text in ink.500 (atmospheric, narrative — the original V1 feel)
- Full accent palette (madder, moss, ochre, slate)
- Phosphor Regular icons
- Radius 4px elements, 8px panels

### Register 3 — Expressive (Inky Lily Studios)

Warmth is foregrounded. Personality is welcomed.

- Lora Bold headlines
- Lora Italic body in ink.500
- Full accent palette plus peach and expanded washes
- Madder-led interactive elements (buttons lead with madder, not ink)
- Phosphor Bold icons
- Radius 6px elements, 8px panels
- More Instrument Serif usage, more Fraunces-scale Cabinet Grotesk moments

### How registers work in Figma

Primitives (Collection 1) are static — raw values that never change.

Semantic Tokens (Collection 2) have three modes: Technical, Balanced, Expressive. A component built with semantic tokens automatically adapts to whichever mode is applied to its parent frame.

```
surface.page  →  Technical: ground.warm-white
              →  Balanced:  ground.warm-white
              →  Expressive: ground.parchment
```

No per-register component variants are needed.

---

## 3. Colour Tokens

### Layer 1 — Primitives

#### Ground palette — the parchment system

Layered like paper on a desk.

```css
--ground-warm-white: #faf7f2; /* Page background — outermost layer */
--ground-parchment: #f5efe4; /* Primary ground — most sections */
--ground-paper: #ede6d8; /* Secondary ground — cards, panels */
--ground-linen: #e4dccf; /* Raised surface — hover states, dividers */
--ground-fog: #ede8e0; /* Sunken surface — input backgrounds */
```

#### Ink system — the text range

```css
--ink-900: #1c1812; /* Primary text — headings, body */
--ink-700: #3d3428; /* Strong secondary — subheadings */
--ink-500: #6b5e4e; /* Body text on parchment — secondary */
--ink-300: #a89880; /* Recessive — labels, metadata. FAILS AA for body text. */
--ink-100: #d4c8b8; /* Ghost — dividers, decorative lines only */
```

#### Madder — primary accent

The red-earth colour. Active states, accent text, CTAs, section markers.

```css
--madder-900: #7a2c1e; /* Deep — V2 primary accent on light (AAA: 8.3:1) */
--madder-700: #b84c3a; /* Mid — AA large text only on parchment (4.4:1) */
--madder-500: #d4705e; /* Soft — dark grounds only (5.5:1 on void) */
--madder-200: #f0dbd6; /* Wash — badge backgrounds, decision blocks */
--madder-100: #f8eeeb; /* Near-white tint */
```

#### Moss — secondary accent

Green-grey of growing things.

```css
--moss-700: #5a6b4a; /* Primary moss (5.0:1 on parchment — AA) */
--moss-500: #8a9e78; /* Soft — status dots, dark ground text */
--moss-200: #dde6d4; /* Wash — badge backgrounds */
```

#### Ochre — tertiary accent

Warm amber-gold. **V2 note:** ochre.700 fails contrast on parchment (2.4:1). Restricted to wash backgrounds and decorative/non-text use only.

```css
--ochre-700: #c8903a; /* NON-TEXT USE ONLY on light grounds (2.4:1 — fails) */
--ochre-500: #dba85a; /* Dark grounds only (8.6:1 on void) */
--ochre-200: #f0e0c4; /* Wash */
```

#### Slate — informational

Blue-grey.

```css
--slate-700: #3a4a5c; /* Primary slate (7.9:1 on parchment — AAA) */
--slate-500: #7a9aaa; /* Soft */
--slate-200: #d0dce8; /* Wash */
```

#### Dark grounds

```css
--dark-void: #141412; /* Deepest — main dark background */
--dark-charcoal: #1e1e1a; /* Dark cards, panels */
--dark-carbon: #2a2a24; /* Raised dark surface */
--dark-bone: #f0ece0; /* Text on dark — warm white */
```

#### Visual library palette (illustrations only)

```css
--vis-slate: #3a4a5c;
--vis-terra: #b8583a;
--vis-sage: #5a6854;
```

#### Feedback colours

Dual-value system: dark for light backgrounds (AAA), light for dark backgrounds (AA+). Earthy tones matching the system palette.

```css
/* Error */
--feedback-error-dark: #8b1a1a; /* 8.1:1 on parchment — AAA */
--feedback-error-light: #e57373; /* 6.2:1 on void — AA */
--feedback-error-wash: #f8ecec;

/* Success */
--feedback-success-dark: #155724; /* 7.6:1 on parchment — AAA */
--feedback-success-light: #81c784; /* 9.2:1 on void — AAA */
--feedback-success-wash: #eaf2e8;

/* Warning */
--feedback-warning-dark: #634a0c; /* 7.3:1 on parchment — AAA */
--feedback-warning-light: #dba85a; /* 8.6:1 on void — AAA (= ochre.500) */
--feedback-warning-wash: #f5efe0;
```

### Layer 2 — Semantic tokens

Contextual tokens referencing primitives. Switch values based on active register.

#### Surface

```
Token                        Technical         Balanced          Expressive
─────────────────────────────────────────────────────────────────────────────
surface.page                 ground.warm-white ground.warm-white ground.parchment
surface.primary              ground.parchment  ground.parchment  ground.paper
surface.secondary            ground.paper      ground.paper      ground.linen
surface.raised               ground.linen      ground.linen      ground.linen
surface.sunken               ground.fog        ground.fog        ground.fog
surface.inverse              dark.void         dark.void         dark.charcoal
surface.inverse.raised       dark.charcoal     dark.charcoal     dark.carbon
```

#### Text

```
Token                        Technical         Balanced          Expressive
─────────────────────────────────────────────────────────────────────────────
text.primary                 ink.900           ink.900           ink.900
text.secondary               ink.500           ink.500           ink.700
text.tertiary                ink.300           ink.300           ink.300
text.disabled                ink.100           ink.100           ink.100
text.accent                  madder.900        madder.700        madder.700
text.on-dark                 dark.bone         dark.bone         dark.bone
text.link                    madder.900        madder.700        madder.700
text.link.hover              madder.700        madder.500        madder.500
```

#### Border

```
Token                        Technical         Balanced          Expressive
─────────────────────────────────────────────────────────────────────────────
border.default               ground.linen      ground.linen      ground.linen
border.strong                ink.100           ink.100           ink.300
border.accent                madder.900        madder.700        madder.700
border.subtle                ground.paper      ground.paper      ground.linen
```

#### Accent

```
Token                        Technical         Balanced          Expressive
─────────────────────────────────────────────────────────────────────────────
accent.primary               madder.900        madder.700        madder.700
accent.primary.wash          madder.100        madder.200        madder.200
accent.secondary             moss.700          moss.700          moss.500
accent.secondary.wash        —                 moss.200          moss.200
accent.tertiary              —                 ochre.700         ochre.500
accent.tertiary.wash         —                 ochre.200         ochre.200
accent.info                  slate.700         slate.700         slate.500
accent.info.wash             —                 slate.200         slate.200
```

#### Interactive

```
Token                        Technical         Balanced          Expressive
─────────────────────────────────────────────────────────────────────────────
interactive.default          ink.900           ink.900           madder.700
interactive.hover            ink.700           ink.700           madder.500
interactive.active           ink.900           ink.900           madder.900
interactive.focus-ring       madder.900        madder.700        madder.700
interactive.disabled         ink.100           ink.100           ink.100
```

#### Feedback (static — no register switching)

```
Token                        Light mode            Dark mode
─────────────────────────────────────────────────────────────
feedback.error               feedback.error.dark   feedback.error.light
feedback.success             feedback.success.dark  feedback.success.light
feedback.warning             feedback.warning.dark  feedback.warning.light
feedback.error.surface       feedback.error.wash   rgba(139,26,26,0.15)
feedback.success.surface     feedback.success.wash  rgba(21,87,36,0.15)
feedback.warning.surface     feedback.warning.wash  rgba(99,74,12,0.15)
```

---

## 4. Typography

### Font stack

Five typefaces. Each has a specific role. None are interchangeable.

```css
--font-serif: "Lora", Georgia, serif;
--font-display: "Cabinet Grotesk", sans-serif;
--font-accent: "Instrument Serif", serif;
--font-mono: "DM Mono", monospace;
--font-jp: "Noto Serif JP", serif;
```

**License status:**

- Lora: Google Fonts, SIL OFL — free for all use
- Cabinet Grotesk: Fontshare, ITF FFL — free for personal and commercial use. Self-host recommended. Only Black (900) weight needed.
- Instrument Serif: Google Fonts, SIL OFL — free for all use
- DM Mono: Google Fonts, SIL OFL — free for all use
- Noto Serif JP: Google Fonts, SIL OFL — free for all use

### Role of each typeface

| Typeface             | Weights                              | Use                                                                                                |
| -------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Lora**             | 400/500/600/700 + italic 300/400/500 | Narrative headlines, body text, case study copy, hero sentence                                     |
| **Cabinet Grotesk**  | 900 (Black)                          | Display numbers only — stats, counts, metrics                                                      |
| **Instrument Serif** | Regular italic                       | Accent text, pull quotes, secondary headlines. Always italic. Max 1 per section. Never below 20px. |
| **DM Mono**          | 300/400                              | UI labels, metadata, nav links, badges, code                                                       |
| **Noto Serif JP**    | 200/300                              | Japanese bridge text, ghost opacity atmosphere                                                     |

### Type scale

Major third ratio (1.25). Preserved from V1.

```css
--text-xs: 0.64rem; /* 10.24px — metadata, timestamps */
--text-sm: 0.8rem; /* 12.8px  — captions, small labels */
--text-base: 1rem; /* 16px    — body text baseline */
--text-md: 1.25rem; /* 20px    — large body, lead text */
--text-lg: 1.563rem; /* 25px    — small headlines */
--text-xl: 1.953rem; /* 31px    — section headlines */
--text-2xl: 2.441rem; /* 39px    — hero sub-headline */
--text-3xl: 3.052rem; /* 49px    — hero headline */
--text-4xl: 3.815rem; /* 61px    — display / oversized */
```

### Letter spacing — V2 adjusted

V1 values were calibrated for uppercase text. V2 reduces tracking for sentence case.

```css
--tracking-tight: -0.025em; /* Display headlines */
--tracking-normal: -0.015em; /* Body headings */
--tracking-wide: 0.06em; /* Labels, metadata (V1: 0.12em) */
--tracking-wider: 0.1em; /* Mono UI elements (V1: 0.18em) */
```

> **V2 change:** V1 used .12em, .18em, .26em — designed for uppercase DM Mono. At sentence case, those values spread letters too far apart. V2 values (.06em, .10em) keep the spaced-mono character without the air. The .26em "widest" tier is removed entirely.

### Semantic type tokens — per register

```
Token                        Technical         Balanced          Expressive
─────────────────────────────────────────────────────────────────────────────

HEADLINE — Lora
type.headline.family         font-serif        font-serif        font-serif
type.headline.weight         500 (Medium)      700 (Bold)        700 (Bold)
type.headline.tracking       tracking-normal   tracking-normal   tracking-normal
type.headline.color          ink.900           ink.900           ink.900

BODY — Lora
type.body.family             font-serif        font-serif        font-serif
type.body.weight             400 (Regular)     300 (Light)       300 (Light)
type.body.style              normal            italic            italic
type.body.color              ink.900           ink.500           ink.500
type.body.line-height        1.75              1.85              1.85

SUBHEAD — Instrument Serif
type.subhead.family          font-accent       font-accent       font-accent
type.subhead.style           italic            italic            italic
type.subhead.min-size        text-md (20px)    text-md (20px)    text-md (20px)
type.subhead.color           ink.700           ink.700           ink.700
type.subhead.line-height     1.3               1.3               1.3

DISPLAY — Cabinet Grotesk
type.display.family          font-display      font-display      font-display
type.display.weight          900 (Black)       900 (Black)       900 (Black)
type.display.tracking        tracking-tight    tracking-tight    tracking-tight

LABEL — DM Mono
type.label.family            font-mono         font-mono         font-mono
type.label.weight            400 (Regular)     300 (Light)       300 (Light)
type.label.size              text-sm           text-sm           text-sm
type.label.tracking          tracking-wider    tracking-wider    tracking-wider
type.label.transform         none              none              none
type.label.color             ink.500           ink.300           madder.700

UI — DM Mono (buttons, inputs, interactive)
type.ui.family               font-mono         font-mono         font-mono
type.ui.weight               400 (Regular)     300 (Light)       300 (Light)
type.ui.size                 text-xs           text-xs           text-sm
type.ui.tracking             tracking-wide     tracking-wide     tracking-wide
type.ui.transform            none              none              none

ATMOSPHERE — Noto Serif JP
type.atmos.family            font-jp           font-jp           font-jp
type.atmos.weight            200               200               200
type.atmos.opacity           0.03              0.04              0.06
```

### V2 typographic patterns

**Hero sentence** — Lora, register-dependent weight

```css
/* Technical */
font-family: var(--font-serif);
font-weight: 500;
font-size: clamp(26px, 3.5vw, 48px);
letter-spacing: -0.02em;
line-height: 1.15;
color: var(--ink-900);

/* Balanced / Expressive: weight 700 */
```

**Body text** — register-dependent style and color

```css
/* Technical — upright, high contrast */
font-family: var(--font-serif);
font-weight: 400;
font-size: 16px;
line-height: 1.75;
color: var(--ink-900);

/* Balanced / Expressive — italic, atmospheric */
font-family: var(--font-serif);
font-style: italic;
font-weight: 300;
font-size: 15px;
line-height: 1.85;
color: var(--ink-500);
```

**Label / metadata** — V2: sentence case, no text-transform

```css
font-family: var(--font-mono);
font-weight: 300; /* 400 in Technical */
font-size: var(--text-sm);
letter-spacing: 0.1em;
/* NO text-transform: uppercase */
color: var(--ink-300); /* ink.500 in Technical, madder.700 in Expressive */
```

**Section tag** — V2: sentence case replaces uppercase

```css
/* V1 was: 8px, uppercase, 0.26em tracking, madder */
/* V2: */
font-family: var(--font-mono);
font-weight: 400;
font-size: var(--text-sm);
letter-spacing: 0.1em;
/* text-transform: none — monospace signals "metadata" without shouting */
color: var(--text-accent); /* madder.900 Technical, madder.700 Balanced */
```

**Cabinet Grotesk stat** — unchanged from V1

```css
font-family: var(--font-display);
font-weight: 900;
font-size: clamp(32px, 4vw, 56px);
letter-spacing: -0.05em;
line-height: 1;
```

**Japanese bridge text** — unchanged from V1, opacity varies by register

```css
font-family: var(--font-jp);
font-weight: 200;
letter-spacing: 0.18em;
color: var(--ink-900);
opacity: var(--type-atmos-opacity); /* 0.03 / 0.04 / 0.06 */
```

---

## 5. Spacing

Eight-point base system. Numbered scale preserved from V1.

```css
--space-1: 0.25rem; /* 4px  */
--space-2: 0.5rem; /* 8px  */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
```

### Semantic spacing

```
Token                        Technical    Balanced    Expressive
─────────────────────────────────────────────────────────────────
space.section                space-24     space-24    space-24
space.block                  space-12     space-12    space-16
space.element                space-6      space-6     space-6
space.inline                 space-3      space-3     space-3
space.tight                  space-2      space-2     space-2
```

---

## 6. Layout & Grid

Preserved from V1.

```css
--layout-max: 1200px;
--layout-max-narrow: 720px;
--layout-gutter: 64px;
--layout-gutter-sm: 24px;
--layout-col: 80px;
--layout-gap: 16px;
```

### Breakpoints

```css
--bp-sm: 480px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
```

### Common grid patterns

```css
grid-template-columns: 1fr 1fr; /* Two column — card, hero split */
grid-template-columns: repeat(3, 1fr); /* Three column — process, footer */
grid-template-columns: 1fr 1.2fr; /* Content + aside */
grid-template-columns: 1.2fr 1fr; /* Asymmetric — full solo card */
```

---

## 7. Borders & Radius

### Borders — preserved from V1

```css
--border-thin: 1px;
--border-medium: 2px;
--border-thick: 3px;

--border-default: 1px solid var(--border-default);
--border-strong: 1px solid var(--border-strong);
--border-accent: 1px solid var(--border-accent);
--border-dark: 1px solid rgba(240, 236, 224, 0.08);
```

### Radius — V2 addition

V1 used no radius on structural elements. V2 introduces subtle radius.

```css
--radius-none: 0px; /* Structural elements that need edge */
--radius-sm: 4px; /* Inputs, badges, small elements */
--radius-md: 6px; /* Buttons, cards */
--radius-lg: 8px; /* Panels, modals */
--radius-full: 9999px; /* Pills, availability badge */
```

Semantic radius per register:

```
Token                   Technical    Balanced    Expressive
──────────────────────────────────────────────────────────
radius.element          radius-sm    radius-sm   radius-md
radius.card             radius-md    radius-md   radius-lg
radius.panel            radius-md    radius-lg   radius-lg
radius.pill             radius-full  radius-full radius-full
```

> **V2 rationale:** Sharp corners in V1 signalled precision, but at the cost of approachability. Subtle radius (4–8px) preserves the structured feel while supporting the "warmth" philosophy. The corners are felt, not seen.

---

## 8. Shadows & Elevation

V2 addition. Warm-toned, subtle. Shadow base uses ink.900 rgba for warm tone.

```css
--shadow-sm: 0 1px 4px rgba(28, 24, 18, 0.06);
--shadow-md: 0 4px 16px rgba(28, 24, 18, 0.08);
--shadow-lg: 0 8px 32px rgba(28, 24, 18, 0.1), 0 2px 8px rgba(28, 24, 18, 0.04);
```

Semantic shadow per register:

```
Token                   Technical    Balanced    Expressive
──────────────────────────────────────────────────────────
shadow.card             shadow-sm    shadow-sm   shadow-md
shadow.card.hover       shadow-md    shadow-md   shadow-lg
shadow.elevated         shadow-md    shadow-md   shadow-lg
```

---

## 9. Motion & Easing

Preserved from V1.

```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
--duration-enter: 600ms;

--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Key animations — preserved from V1

```css
@keyframes grow-in {
  0% {
    transform: scaleY(0) scaleX(0.6);
    opacity: 0;
  }
  45% {
    transform: scaleY(1.08) scaleX(0.95);
    opacity: 1;
  }
  100% {
    transform: scaleY(1) scaleX(1);
    opacity: 1;
  }
}

@keyframes sway {
  0%,
  100% {
    transform: rotate(var(--sway-base, 0deg));
  }
  25% {
    transform: rotate(calc(var(--sway-base) + var(--sway-amt, 1.5deg)));
  }
  75% {
    transform: rotate(calc(var(--sway-base) - var(--sway-amt, 1.5deg)));
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.75);
  }
}
```

### Card hover — V2 updated with shadow tokens

```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--border-accent);
  transition: all var(--duration-normal) var(--ease-spring);
}
```

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
  .plant {
    animation: none !important;
  }
  .cursor-blink {
    animation: none;
    opacity: 1;
  }
  .status-dot {
    animation: none;
  }
}
```

---

## 10. Z-Index

Preserved from V1.

```css
--z-base: 0;
--z-raised: 10;
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-overlay: 400;
--z-modal: 500;
--z-toast: 600;
--z-cursor: 9999;
```

---

## 11. Icons

V2 addition. Phosphor icons, weight mapped to register.

### Semantic tokens

```
Token                   Technical    Balanced    Expressive
──────────────────────────────────────────────────────────
icon.weight             Light        Regular     Bold
icon.size.sm            16px         16px        16px
icon.size.md            20px         20px        20px
icon.size.lg            24px         24px        24px
icon.color              ink.700      ink.500     madder.700
```

### Icon subset (26 icons)

**Navigation:** ArrowRight, ArrowLeft, ArrowUpRight, CaretDown, CaretUp, X, List, MagnifyingGlass

**Status:** Check, CheckCircle, Warning, WarningCircle, Info

**Interaction:** Copy, Eye, EyeSlash, Funnel, SortAscending

**Content:** FileText, Code, Palette, Link

**Social:** Envelope, LinkedinLogo, GithubLogo, PaperPlaneTilt

---

## 12. Buttons

Three variants. V2: sentence case, subtle radius, shadow on hover.

### Primary

```css
.btn-primary {
  background: var(--interactive-default);
  color: var(--surface-page);
  border: none;
  padding: 10px 22px;
  border-radius: var(--radius-element);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  /* NO text-transform — sentence case */
  cursor: pointer;
  transition:
    background var(--duration-normal) var(--ease-default),
    box-shadow var(--duration-normal) var(--ease-default);
}
.btn-primary:hover {
  background: var(--interactive-hover);
  box-shadow: var(--shadow-sm);
}
.btn-primary:active {
  background: var(--interactive-active);
}
.btn-primary:focus-visible {
  box-shadow: 0 0 0 2px var(--interactive-focus-ring);
}
.btn-primary:disabled {
  background: var(--interactive-disabled);
  color: var(--text-disabled);
  cursor: not-allowed;
}
```

### Secondary

```css
.btn-secondary {
  background: transparent;
  color: var(--interactive-default);
  border: 1px solid var(--border-strong);
  padding: 10px 22px;
  border-radius: var(--radius-element);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-default);
}
.btn-secondary:hover {
  border-color: var(--border-accent);
  color: var(--text-accent);
}
.btn-secondary:focus-visible {
  box-shadow: 0 0 0 2px var(--interactive-focus-ring);
}
```

### Ghost / link button

```css
.btn-ghost {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 10px 22px;
  border-radius: var(--radius-element);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  cursor: pointer;
  transition:
    color var(--duration-fast),
    background var(--duration-fast);
}
.btn-ghost:hover {
  color: var(--text-accent);
  background: var(--surface-raised);
}
```

---

## 13. Badges

V2: sentence case. All other V1 patterns preserved.

### Standard badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-wide);
  /* NO text-transform */
  padding: 3px 10px;
  border-radius: var(--radius-sm);
}

.badge-madder {
  background: var(--madder-200);
  color: var(--madder-900);
}
.badge-moss {
  background: var(--moss-200);
  color: var(--moss-700);
}
.badge-ochre {
  background: var(--ochre-200);
  color: var(--feedback-warning-dark);
}
.badge-slate {
  background: var(--slate-200);
  color: var(--slate-700);
}
.badge-ink {
  background: var(--ink-900);
  color: var(--ground-parchment);
}
.badge-default {
  background: var(--surface-raised);
  color: var(--ink-500);
}
```

> **V2 note:** badge-ochre uses feedback.warning.dark (#634A0C) for text instead of ochre.700, because ochre.700 fails contrast on the wash background.

### Emphasis badges

```css
.badge-em {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  /* NO text-transform */
  padding: 5px 14px;
  border-radius: var(--radius-sm);
}

.badge-em-madder {
  background: var(--madder-900);
  color: var(--ground-parchment);
}
.badge-em-moss {
  background: var(--moss-700);
  color: #fff;
}
.badge-em-ink {
  background: var(--ink-900);
  color: var(--dark-bone);
}
```

### Availability badge — preserved from V1

```css
.badge-em-live {
  background: var(--surface-secondary);
  color: var(--moss-700);
  border: 1px solid var(--moss-200);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  gap: 7px;
}
.badge-em-live .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--moss-700);
  animation: pulse 2.5s ease-in-out infinite;
}
```

---

## 14. Cards

V2: subtle radius, warm shadows, sentence-case metadata.

### Canonical card — the featured project card

```css
.card-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-card);
  background: var(--surface-primary);
  overflow: hidden;
  cursor: pointer;
  transition:
    border-color var(--duration-normal) var(--ease-default),
    box-shadow var(--duration-normal) var(--ease-default),
    transform var(--duration-normal) var(--ease-spring);
}
.card-featured:hover {
  border-color: var(--border-accent);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-4px);
}
.card-featured:active {
  transform: translateY(-1px);
}
.card-featured:focus-visible {
  outline: 2px solid var(--interactive-focus-ring);
  outline-offset: 3px;
}
```

Card sizes, left panel treatment, and typography hierarchy preserved from V1 — with sentence-case metadata replacing uppercase eyebrows.

### Card states

| State    | Treatment                                          |
| -------- | -------------------------------------------------- |
| Default  | border-default, shadow-card, no transform          |
| Hover    | border-accent, shadow-card-hover, translateY(-4px) |
| Active   | border-accent, translateY(-1px), shadow-sm         |
| Focus    | outline: 2px interactive-focus-ring, offset 3px    |
| Disabled | opacity: 0.4, cursor: not-allowed                  |
| Loading  | shimmer sweep, skeleton backgrounds                |

---

## 15. Tabs

V2: sentence case, subtle radius on pill tabs. Weight contrast preserved as primary mechanism.

### Underline tabs — primary

```css
.tab-u {
  font-family: var(--font-mono);
  font-weight: 300;
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wider);
  /* NO text-transform */
  padding: 11px 20px;
  color: var(--ink-300);
  background: transparent;
  border: none;
  position: relative;
  transition: color var(--duration-fast);
}
.tab-u:hover {
  color: var(--ink-700);
}
.tab-u.active {
  font-weight: 400;
  color: var(--ink-900);
  letter-spacing: var(--tracking-wide);
}

/* Indicator — ink, not madder */
.tab-u::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--ink-900);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-normal) var(--ease-default);
}
.tab-u.active::after {
  transform: scaleX(1);
}
```

### Pill tabs — secondary

```css
.tab-p {
  font-family: var(--font-mono);
  font-weight: 300;
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  /* NO text-transform */
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  color: var(--ink-300);
  transition: all var(--duration-fast);
}
.tab-p:hover {
  border-color: var(--ink-500);
  color: var(--ink-500);
}
.tab-p.active {
  background: var(--ink-900);
  color: var(--surface-primary);
  border-color: var(--ink-900);
  font-weight: 400;
}
```

### Segment tabs — compact

```css
.tabs-segment {
  display: inline-flex;
  background: var(--surface-raised);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  padding: 3px;
  gap: 2px;
}
.tab-s {
  font-family: var(--font-mono);
  font-weight: 300;
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  /* NO text-transform */
  padding: 6px 14px;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--ink-300);
  transition: all var(--duration-fast);
}
.tab-s:hover {
  color: var(--ink-500);
}
.tab-s.active {
  background: var(--surface-primary);
  color: var(--ink-900);
  font-weight: 400;
  box-shadow: var(--shadow-sm);
}
```

---

## 16. Header & Navigation

V2: sentence-case nav links.

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  height: 60px;
  background: rgba(250, 247, 242, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-default);
  padding-inline: var(--layout-gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### Anatomy

| Element      | V1                                          | V2                                                  |
| ------------ | ------------------------------------------- | --------------------------------------------------- |
| Logo         | Lora 500, 16px, name + italic madder period | Unchanged                                           |
| Nav links    | DM Mono 300→400, 9px, **uppercase**, 0.20em | DM Mono 300→400, text-sm, **sentence case**, 0.10em |
| Inactive     | ink.300                                     | ink.300                                             |
| Hover        | ink.700                                     | ink.700                                             |
| Active       | ink.900 + 1px madder underline              | ink.900 + 2px accent underline                      |
| Status badge | 6px moss dot + DM Mono label                | Unchanged                                           |

---

## 17. Links & CTAs

V2: sentence case, consistent treatment.

### Inline arrow CTA — the most common

```css
.cta-arrow-link {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wider);
  /* NO text-transform */
  color: var(--text-secondary);
  cursor: pointer;
}
.cta-arrow-link:hover {
  color: var(--text-accent);
}
.cta-arrow-link .arrow {
  width: 18px;
  height: 1px;
  background: currentColor;
  transition: width var(--duration-fast) var(--ease-default);
}
.cta-arrow-link:hover .arrow {
  width: 28px;
}
```

### Section label CTA

```css
/* Structure: — Section title ——————————— View all → */
/* V2: "Section title" and "View all" in sentence case */
```

---

## 18. Form Inputs

V2 addition. Not in V1 spec.

```css
.input {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  color: var(--text-primary);
  background: var(--surface-sunken);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-element);
  padding: 10px 14px;
  transition: border-color var(--duration-fast);
}
.input:hover {
  border-color: var(--border-strong);
}
.input:focus {
  border-color: var(--border-accent);
  outline: none;
  box-shadow: 0 0 0 2px var(--interactive-focus-ring);
}
.input.error {
  border-color: var(--feedback-error);
}
.input:disabled {
  background: var(--surface-raised);
  color: var(--text-disabled);
  cursor: not-allowed;
}
```

---

## 19. Journal Layer

Preserved from V1. Pure CSS overlay system, three modes.

### Implementation

```html
<div class="journal-layer ruled" id="journal-layer"></div>
```

```css
.journal-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  transition: opacity var(--duration-slow) var(--ease-default);
}
```

### Tokens

```css
--jl-rule-color: rgba(28, 24, 18, 0.055);
--jl-rule-heavy: rgba(28, 24, 18, 0.1);
--jl-margin-color: rgba(184, 76, 58, 0.12);
--jl-dot-color: rgba(28, 24, 18, 0.07);
--jl-rule-spacing: 28px;
--jl-margin-offset: 64px;
--jl-dot-spacing: 20px;
```

Three modes: Ruled (horizontal lines + madder margin), Grid (+ vertical columns), Dots (bullet-journal register).

---

## 20. The Garden

Preserved from V1. Shared real-time garden via Supabase.

Architecture, plant vocabulary, sway settings, SQL schema, and configuration unchanged. See V1 spec for full details.

---

## 21. Easter Egg System — Inky Lily's Studio

Preserved from V1. Ink walkers, three discovery paths, door, candle cursor, studio page.

All V1 details unchanged. The studio page operates in the Expressive register.

---

## 22. Accessibility

V2 target: **WCAG AAA** (upgraded from V1's AA).

### Contrast — verified pairs (computed, not estimated)

#### Light mode — on parchment (#F5EFE4)

| Pair                       | Ratio  | Status               |
| -------------------------- | ------ | -------------------- |
| ink.900 (#1C1812)          | 15.4:1 | ✓ AAA                |
| ink.700 (#3D3428)          | 10.7:1 | ✓ AAA                |
| ink.500 (#6B5E4E)          | 5.5:1  | ✓ AA                 |
| ink.300 (#A89880)          | 2.5:1  | ✗ Labels only        |
| ink.100 (#D4C8B8)          | 1.5:1  | ✗ Dividers only      |
| madder.900 (#7A2C1E)       | 8.3:1  | ✓ AAA                |
| madder.700 (#B84C3A)       | 4.4:1  | ✓ AA large text only |
| moss.700 (#5A6B4A)         | 5.0:1  | ✓ AA                 |
| ochre.700 (#C8903A)        | 2.4:1  | ✗ Non-text only      |
| slate.700 (#3A4A5C)        | 7.9:1  | ✓ AAA                |
| feedback.error (#8B1A1A)   | 8.1:1  | ✓ AAA                |
| feedback.success (#155724) | 7.6:1  | ✓ AAA                |
| feedback.warning (#634A0C) | 7.3:1  | ✓ AAA                |

#### Dark mode — on void (#141412)

| Pair                       | Ratio  | Status |
| -------------------------- | ------ | ------ |
| bone (#F0ECE0)             | 15.6:1 | ✓ AAA  |
| madder.500 (#D4705E)       | 5.5:1  | ✓ AA   |
| moss.500 (#8A9E78)         | 6.4:1  | ✓ AA   |
| feedback.error (#E57373)   | 6.2:1  | ✓ AA   |
| feedback.success (#81C784) | 9.2:1  | ✓ AAA  |
| feedback.warning (#DBA85A) | 8.6:1  | ✓ AAA  |

### Hard rules

- ink.300 never for body text. Labels and metadata at small sizes only.
- ink.100 never for text. Dividers and decorative lines only.
- ochre.700 never for text on light grounds. Wash backgrounds or non-text use only.
- madder.700 never for body-sized text on light grounds (only AA at large text). Use madder.900 in Technical register.
- madder.500 only on dark grounds.

### ARIA requirements — preserved from V1

```html
<div class="featured-card" tabindex="0" role="article">
  <div role="tablist" aria-label="Case study sections">
    <div class="garden-canvas" role="img" aria-label="Shared garden">
      <span lang="ja">設計の哲学</span>
      <svg aria-hidden="true" focusable="false"></svg>
    </div>
  </div>
</div>
```

### Focus management

```css
:focus-visible {
  outline: 2px solid var(--interactive-focus-ring);
  outline-offset: 3px;
}
```

### Touch targets

```css
@media (max-width: 768px) {
  .nav-link {
    padding: 10px 0;
    min-height: 44px;
  }
  .btn {
    padding: 10px 18px;
    min-height: 44px;
  }
}
```

---

## 23. Dark Mode

Applied via `[data-theme="dark"]` on `<html>`.

### Token overrides

```css
[data-theme="dark"] {
  /* Surfaces */
  --surface-page: var(--dark-void);
  --surface-primary: var(--dark-charcoal);
  --surface-secondary: var(--dark-carbon);
  --surface-raised: #343430;
  --surface-sunken: #0e0e0c;

  /* Text */
  --text-primary: var(--dark-bone);
  --text-secondary: #a89880;
  --text-tertiary: #6b5e4e;
  --text-accent: var(--madder-500);
  --text-link: var(--madder-500);

  /* Borders */
  --border-default: rgba(240, 236, 224, 0.08);
  --border-strong: rgba(240, 236, 224, 0.15);
  --border-accent: var(--madder-500);

  /* Interactive */
  --interactive-default: var(--dark-bone);
  --interactive-hover: #d4c8b0;
  --interactive-focus-ring: var(--madder-500);

  /* Feedback */
  --feedback-error: var(--feedback-error-light);
  --feedback-success: var(--feedback-success-light);
  --feedback-warning: var(--feedback-warning-light);

  /* Shadows — inverted, more subtle */
  --shadow-sm: 0 1px 4px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### Journal layer dark variant

```css
.journal-layer.journal-dark {
  --jl-rule-color: rgba(240, 236, 224, 0.055);
  --jl-margin-color: rgba(184, 76, 58, 0.18);
  --jl-dot-color: rgba(240, 236, 224, 0.06);
}
```

---

## 24. V1 → V2 Changelog

| Area                       | V1                                   | V2                                  | Rationale                                                     |
| -------------------------- | ------------------------------------ | ----------------------------------- | ------------------------------------------------------------- |
| Accessibility target       | AA                                   | AAA (7:1 normal, 4.5:1 large)       | Portfolio is a case study of rigor                            |
| Text transform             | Uppercase on all DM Mono             | Sentence case everywhere            | All-caps at 5+ instances/page = visual noise                  |
| Letter spacing             | .12/.18/.26em                        | .06/.10em                           | V1 values were for uppercase; sentence case needs less air    |
| Accent (Technical)         | madder.700 (4.4:1)                   | madder.900 (8.3:1)                  | 4.4:1 fails AAA                                               |
| Border radius              | 0px everywhere                       | 4–8px subtle radius                 | Sharp felt cold; subtle radius supports warmth                |
| Elevation                  | Flat + border only                   | Warm shadows (ink.900 rgba base)    | Adds depth and polish                                         |
| Icons                      | None                                 | Phosphor, weight mapped to register | Multi-weight mirrors register architecture                    |
| Body text (Technical)      | Lora Italic 300, ink.500             | Lora Regular 400, ink.900           | Portfolio needs editorial authority, not atmospheric softness |
| Headline (Technical)       | Lora 700                             | Lora 500                            | Quieter, more editorial confidence                            |
| Accent palette (Technical) | All colors available                 | Madder + moss only                  | Portfolio restraint, two accents max                          |
| Registers                  | Philosophical (Rigorous/Human/Quiet) | Mechanical (Figma variable modes)   | Philosophy becomes architecture                               |
| Feedback colors            | Not specified                        | Dual-value system, AAA verified     | Error #8B1A1A, Success #155724, Warning #634A0C               |
| Form inputs                | Not specified                        | Full input system with states       | Needed for contact/interactive elements                       |
| Ochre.700 contrast         | Documented as 3.4:1                  | Verified at 2.4:1 — non-text only   | Worse than V1 stated; hard-restricted                         |

---

## 25. File Map

```
warmth-ds-v2/
│
├── warmth-ds-v2.md                    # This file — complete V2 specification
│
├── warmth-ds-v2-tokens.css            # Full CSS custom property token file (V2)
│
├── warmth-ds-v2-research-and-audit.md # Cognitive bias research + V1 visual audit
│                                       # Philosophy, purpose, tonal architecture
│
├── warmth-ds-v2-token-architecture.md # Detailed token taxonomy (primitives → semantic)
│                                       # Register mapping tables, architecture diagram
│
├── warmth-ds-v2-open-items-resolved.md # Feedback colors, icon subset, dark mode,
│                                       # Cabinet Grotesk license, Instrument Serif rules
│
├── [Figma] Warmth DS V2               # Figma file with variable collections:
│   ├── Primitives (Collection 1)      #   Color, Type, Space, Radius, Shadow
│   └── Semantic (Collection 2)        #   3 modes: Technical, Balanced, Expressive
│
├── [Figma Sites] Warmth DS Reference  # Living documentation (Output A)
│   ├── 01 Overview                    #   Philosophy, registers, how to use
│   ├── 02 Foundations                 #   Color, type, spacing, borders
│   ├── 03 Atoms                       #   Buttons, badges, tags, links, inputs
│   ├── 04 Molecules                   #   [Step 5 — to be brainstormed]
│   ├── 05 Patterns                    #   [Future — page compositions]
│   └── 06 Changelog                   #   Version history
│
├── [Portfolio] Warmth DS Case Study    # Narrative documentation (Output B)
│   └── Lives in Experiments section   #   of rachanamandal.space
│
└── V1 files (preserved)
    ├── warmth-ds.md                   # V1 specification (archived)
    ├── warmth-ds-tokens.css           # V1 CSS tokens
    ├── warmth-ds-system.html          # V1 reference
    ├── warmth-ds-garden.html          # Garden (carried forward)
    ├── warmth-ds-journal-layer.html   # Journal layer (carried forward)
    ├── warmth-ds-walkers.html         # Easter egg system (carried forward)
    └── warmth-ds-studio.html          # Inky Lily's Studio (carried forward)
```

---

## Production checklist

Before launch, verify:

- [ ] All text using madder on light grounds uses madder.900, not madder.700
- [ ] Ochre.700 not used for text on any light background
- [ ] ink.300 not used for body text anywhere
- [ ] All DM Mono instances converted to sentence case (no text-transform: uppercase)
- [ ] Letter spacing values updated (.06em / .10em replacing .12em / .18em / .26em)
- [ ] Border-radius applied to all cards, buttons, inputs, badges
- [ ] Shadow tokens applied to card hover states
- [ ] Phosphor icons loaded at correct weight per register
- [ ] Focus rings use interactive.focus-ring token (madder.900 Technical, madder.700 Balanced)
- [ ] `SUPABASE_URL` and `SUPABASE_KEY` replaced in garden files
- [ ] Cron job active at cron-job.org — every 5 days
- [ ] `HIDDEN_URL` in walkers file set to actual studio path
- [ ] Walker timing at production values: T_MIN: 45000, T_MAX: 180000
- [ ] `lang="ja"` on all Japanese text spans
- [ ] `aria-hidden="true"` on all decorative SVGs
- [ ] `prefers-reduced-motion` tested
- [ ] All cards have `tabindex="0"` and `role="article"`
- [ ] Tab system has `role="tablist"` / `role="tab"` / `aria-selected`
- [ ] Garden has `aria-live` region for count updates
- [ ] Touch targets ≥ 44px on mobile
- [ ] Cabinet Grotesk self-hosted (not Fontshare API)
- [ ] Contrast ratios verified against computed values in Section 22

---

_Warmth DS V2 · Built 2025–2026 · For a portfolio that is a place, not a document._

_Poetic intent, technical execution. The tokens are the evidence._
