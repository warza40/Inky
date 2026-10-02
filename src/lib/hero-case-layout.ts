/** Default collage slots from the sparkle-trail homepage hero reference. */

export interface HeroCardLayout {
  left: number;
  top: number;
  width: number;
  zIndex: number;
}

export const HERO_CARD_LAYOUT_STORAGE_KEY = "inky-hero-case-card-layout-v3";

/**
 * Live container widths at 1440 / 1280 content rail:
 *   nav 1280 · console 628 (49.06%) · heading content 559
 *   Omantel 628 · warehouse 691 · disaster 794
 *
 * Reference (nav as rail) wants ~6.25% between console and the right cluster,
 * not the previous 24px grid gutter. Card left/width % are of the 1280 stage.
 * Omantel left = console column + gap = 55.31%, matching the heading start.
 */
export const HERO_CONSOLE_COL_PCT = 49.06;
export const HERO_INTRO_GAP_PCT = 6.25;
export const HERO_HEADING_COL_PCT = 44.69;
export const HERO_OMANTEL_LEFT_PCT = HERO_CONSOLE_COL_PCT + HERO_INTRO_GAP_PCT;

export const HERO_CARD_LAYOUT: Record<string, HeroCardLayout> = {
  "omantel-bulk-activation": {
    left: HERO_OMANTEL_LEFT_PCT,
    top: 5.4,
    width: 49.06,
    zIndex: 2,
  },
  "warehouse-operations": {
    left: 7.5,
    top: 39,
    width: 54,
    zIndex: 3,
  },
  "disaster-recovery": {
    left: 42.4,
    top: 54.5,
    width: 62,
    zIndex: 4,
  },
};

export const HERO_CARD_ORDER = [
  "omantel-bulk-activation",
  "warehouse-operations",
  "disaster-recovery",
] as const;

export function layoutForSlug(slug: string): HeroCardLayout {
  return (
    HERO_CARD_LAYOUT[slug] ?? {
      left: 8,
      top: 40,
      width: 52,
      zIndex: 2,
    }
  );
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isHeroCardLayout(value: unknown): value is HeroCardLayout {
  if (!value || typeof value !== "object") return false;
  const layout = value as Partial<HeroCardLayout>;
  return (
    isFiniteNumber(layout.left) &&
    isFiniteNumber(layout.top) &&
    isFiniteNumber(layout.width) &&
    isFiniteNumber(layout.zIndex)
  );
}

export function readStoredHeroCardLayouts(): Record<
  string,
  HeroCardLayout
> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(HERO_CARD_LAYOUT_STORAGE_KEY);
    if (!raw || raw.trim() === "") return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      window.localStorage.removeItem(HERO_CARD_LAYOUT_STORAGE_KEY);
      return null;
    }
    const next: Record<string, HeroCardLayout> = {};
    for (const [slug, value] of Object.entries(
      parsed as Record<string, unknown>,
    )) {
      if (isHeroCardLayout(value)) next[slug] = value;
    }
    return Object.keys(next).length > 0 ? next : null;
  } catch {
    try {
      window.localStorage.removeItem(HERO_CARD_LAYOUT_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    return null;
  }
}

export function writeStoredHeroCardLayouts(
  layouts: Record<string, HeroCardLayout>,
) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      HERO_CARD_LAYOUT_STORAGE_KEY,
      JSON.stringify(layouts),
    );
  } catch {
    /* private mode / quota */
  }
}
