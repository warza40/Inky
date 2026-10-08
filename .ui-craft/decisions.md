# Design Decisions

### 2026-09-05 — Adopt warm-humanist/cursor aesthetic

**Status**: accepted

Applied `aesthetics/warm-humanist/cursor` across the paper material system. Chose Cursor-aligned warm neutrals (`#f7f7f4` canvas, `#26251e` ink) over the prior yellower parchment. Added ember orange accent for interactive states only.

Typography shifts:

- Display weight 400 with tight tracking (replacing 600/630 bold hierarchy)
- Source Serif 4 for about/prose; Instrument Sans for UI/display; IBM Plex Mono for metadata

Alternatives considered:

- `aesthetics/minimal-editorial` — rejected as primary; merged editorial serif prose with cursor warm palette instead
- Keeping madder red accent — rejected; orange reads as single voltage for links per cursor reference
