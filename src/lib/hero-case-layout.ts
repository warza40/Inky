/** Default collage slots from the sparkle-trail homepage hero reference. */

export interface HeroCardLayout {
  left: number;
  top: number;
  width: number;
  zIndex: number;
}

export const HERO_CARD_LAYOUT_STORAGE_KEY = "inky-hero-case-card-layout-v2";

/**
 * Positions are % of the 1280px content rail.
 * Tuned from live container widths at 1440:
 * console column 628px, 24px gutter, heading/feature column 628px.
 */
export const HERO_CARD_LAYOUT: Record<string, HeroCardLayout> = {
  "omantel-bulk-activation": {
    left: 50.94,
    top: 9,
    width: 49.06,
    zIndex: 2,
  },
  "warehouse-operations": {
    left: 1.1,
    top: 48,
    width: 54,
    zIndex: 3,
  },
  "disaster-recovery": {
    left: 36,
    top: 66,
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

export function readStoredHeroCardLayouts(): Record<
  string,
  HeroCardLayout
> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(HERO_CARD_LAYOUT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, HeroCardLayout>;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
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
