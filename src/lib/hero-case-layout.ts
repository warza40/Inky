/** Default collage slots from the sparkle-trail homepage hero reference. */

export interface HeroCardLayout {
  left: number;
  top: number;
  width: number;
  zIndex: number;
}

export const HERO_CARD_LAYOUT_STORAGE_KEY = "inky-hero-case-card-layout-v1";

/** Positions are % of the desktop hero stage (content rail). */
export const HERO_CARD_LAYOUT: Record<string, HeroCardLayout> = {
  "omantel-bulk-activation": {
    left: 54.9,
    top: 18.6,
    width: 51.8,
    zIndex: 2,
  },
  "warehouse-operations": {
    left: 3.9,
    top: 35.1,
    width: 55.8,
    zIndex: 3,
  },
  "disaster-recovery": {
    left: 38,
    top: 61.1,
    width: 67.5,
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
