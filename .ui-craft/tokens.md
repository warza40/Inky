# Design Tokens

## Colors

- **Canvas:** `#f7f7f4` (`--paper-bg`)
- **Surface base:** `#f2f1ed` (`--paper-base`)
- **Content sheet:** `#fafaf7` (`--paper-sheet`)
- **Elevated sheet:** `#ffffff` (`--paper-elevated`)
- **Ink:** `#26251e` (`--ink`)
- **Ink soft:** `rgba(38, 37, 30, 0.68)` (`--ink-soft`)
- **Accent:** `#f54e00` (`--accent`) — links, nav hover, writing card footer
- **Accent hover:** `#cf2d56` (`--accent-hover`)
- **Hairline:** `rgba(38, 37, 30, 0.055)` (`--paper-line`)

## Typography

- **Display / UI:** Instrument Sans, weight 400 (headings), 500 (nav labels)
- **Editorial body:** Source Serif 4, weight 400, line-height 1.65
- **Metadata:** IBM Plex Mono, uppercase labels at 0.04em tracking
- **Hero:** clamp(3.5rem → 4.25rem), tracking -0.03em, weight 400

## Spacing

4px base scale via `--space-*` tokens. Section rhythm: `--space-section` (112–128px). Hero top includes nav offset.

## Radius

- **Cards / sheets:** 4px (`--radius-card`, `--sheet-radius`)
- **Nav items:** 6px
- **Modals:** 12px (when used)

## Shadows

Soft warm shadows only — `--shadow-sm`, `--shadow-md`, `--shadow-lg`. Elevation on sheets via inset highlight + ambient shadow, not glow.
