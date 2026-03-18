# Homepage Fixes — Implementation Report

This document summarizes the implementation of **homepage-fixes.css** and **homepage-fixes.js** from your reference files. All behaviour runs in the Next.js/React app without loading the original JS file; CSS is merged into `globals.css` and behaviour lives in `HomepageFixes.tsx` and `HomePageLines.tsx`.

---

## 1. Centred compositional axis

**Reference:** Role → Headline → Stack on one vertical centre line.

**Implemented:**

- **`.hero`** — `text-align: center` added so all inline content is centred.
- **`.hero-text`** — `margin-bottom: 48px` and `gap: 0` so spacing is controlled by the margins below.
- **`.hero-text .hero-subtitle`** — `margin-bottom: 14px` (breathing room before headline).
- **`.hero-text .hero-headline`** — `margin-bottom: 0` (gap comes from `.hero-text`).
- Hero already uses `align-items: center` and `justify-content: center`; no change.

**Files:** `src/app/globals.css` (hero, hero-text, hero-subtitle, hero-headline).

---

## 2. Active tab colour bleed fixed

**Reference:** Solid background on tab bar so the active tab doesn’t look brownish.

**Implemented:**

- **`.fs-tabs`** — `background: #f0eeea`, `padding: 4px 4px 0`, `border-radius: 8px 8px 0 0`, `z-index: 2`.
- **`.fs-tab.fs-active`** — `background: #F5B800 !important`, `color: #1a1a1a !important`, `border-color: #e6ac00 !important`, `border-bottom: 2px solid #F5B800 !important`, `opacity: 1 !important`.

**Files:** `src/app/globals.css`.

---

## 3. Breathing room (role → headline)

**Reference:** Clear spacing between role line and headline.

**Implemented:**

- Handled by the same `.hero-text` and `.hero-subtitle` / `.hero-headline` rules as in §1.
- At `max-width: 768px`, `.hero-text` uses `margin-bottom: 36px` and `.hero-headline` uses a smaller clamp and `margin-bottom: 0`.

**Files:** `src/app/globals.css`.

---

## 4. Arrow buttons (redesigned)

**Reference:** Clear bordered icon buttons flanking the stack; prev/next wired to FolderStack.

**Implemented:**

- **Markup** — In `HomePageLines.tsx`, the stack is wrapped in `.stack-arrow-wrap` with two `<button class="stack-arrow">` elements (prev/next). Each button contains an SVG arrow and calls `document.getElementById('fs-prev')` / `'fs-next'` and `.click()` so the existing FolderStack behaviour is used.
- **CSS** — `.stack-arrow` (44×44px, border, shadow, hover/active states), `.stack-arrow svg` (stroke, size), `.stack-arrow-wrap` (flex, gap). Responsive: 36×36px and smaller gap at 768px; buttons hidden at 480px.
- **Hide built-in arrows** — `.stack-arrow-wrap .fs-carousel-prev` and `.stack-arrow-wrap .fs-carousel-next` are set to `display: none !important` so only the new external arrows are visible.

**Files:** `src/components/home/HomePageLines.tsx`, `src/app/globals.css`.

---

## 5. Scroll cue

**Reference:** Subtle “Scroll” indicator at bottom of viewport; fades out on first scroll.

**Implemented:**

- **Markup** — Inside `.hero`, after the stack: `<div class="scroll-cue" id="scrollCue">` with `.scroll-cue-label` (“Scroll”) and `.scroll-cue-arrow` containing an SVG chevron. SVG uses `stroke="currentColor"` and stroke attributes so it’s visible.
- **CSS** — `.scroll-cue` (position, centring, z-index, transition), `.scroll-cue.hidden` (opacity 0), `.scroll-cue-label`, `.scroll-cue-arrow`, `@keyframes scrollBounce`. Responsive: `bottom: 20px` at 768px.
- **Behaviour** — In `HomepageFixes.tsx`, on mount a single scroll listener (passive, once) adds the class `hidden` to `#scrollCue` when the user scrolls.

**Files:** `src/components/home/HomePageLines.tsx`, `src/components/home/HomepageFixes.tsx`, `src/app/globals.css`.

---

## 6. Bot scroll entry

**Reference:** Bot starts below viewport and eases into frame as the user scrolls (e.g. first 300px).

**Implemented:**

- **Markup** — `<div class="hero-bot" id="heroBot">` in `HomePageLines.tsx` wrapping `<BlinkyBotCanvas />`.
- **CSS** — `.hero-bot` is absolutely positioned at the bottom centre of the hero, `z-index: 2`, `pointer-events: none`.
- **Behaviour** — In `HomepageFixes.tsx`, `#heroBot` is set to `transform: translateY(120%)` and `transition: none` initially. After an 800ms timeout, transition is set and a scroll listener runs: at `scrollY <= 0` the bot stays at 120%; from 0–300px scroll it interpolates (ease-out cubic) to 0%; at ≥300px it stays at 0% and the listener is removed.

**Files:** `src/components/home/HomePageLines.tsx`, `src/components/home/HomepageFixes.tsx`, `src/app/globals.css`.

---

## 7. Responsive (from reference)

**Implemented:**

- **≤768px** — `.hero` padding `60px 20px 40px`; `.hero-headline` smaller clamp and margin; `.hero-text` margin-bottom 36px; `.stack-arrow` 36×36px, smaller border-radius; `.stack-arrow-wrap` gap 12px; `.scroll-cue` bottom 20px.
- **≤480px** — `.stack-arrow` hidden; `.stack-arrow-wrap` gap 0.

**Files:** `src/app/globals.css`.

---

## Summary table

| Fix | Reference | Status | Location |
|-----|-----------|--------|----------|
| Centred axis | homepage-fixes.css §1 | Done | globals.css (.hero, .hero-text) |
| Tab bar solid bg | homepage-fixes.css §2 | Done | globals.css (.fs-tabs, .fs-tab.fs-active) |
| Breathing room | homepage-fixes.css §3 | Done | globals.css (.hero-text, .hero-subtitle, .hero-headline) |
| Arrow buttons | homepage-fixes.css §4, .js §3 | Done | HomePageLines.tsx, globals.css, hide .fs-carousel-prev/next |
| Scroll cue | homepage-fixes.css §5, .js §1 | Done | HomePageLines.tsx, HomepageFixes.tsx, globals.css |
| Bot scroll entry | homepage-fixes.js §2 | Done | HomePageLines.tsx, HomepageFixes.tsx, globals.css |
| Responsive | homepage-fixes.css bottom | Done | globals.css @media 768px, 480px |

---

## Files touched

- **`src/components/home/HomePageLines.tsx`** — HomepageFixes, stack-arrow-wrap with prev/next, scroll-cue markup, hero-bot with BlinkyBotCanvas; scroll-cue SVG given stroke so icon is visible.
- **`src/components/home/HomepageFixes.tsx`** — Scroll-cue hide on first scroll; bot scroll-entry (translateY 120% → 0% over first 300px scroll).
- **`src/app/globals.css`** — All homepage-fixes styles: hero text-align and spacing, fs-tabs/fs-active, hide built-in arrows when using stack-arrow-wrap, stack-arrow and scroll-cue and hero-bot, responsive rules.

No separate `homepage-fixes.js` is loaded; behaviour is fully in React (useEffect + DOM IDs).
