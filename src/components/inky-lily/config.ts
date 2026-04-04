/**
 * Inky Lily studio easter egg — set `hiddenURL` to your illustration/studio site before launch.
 * Optional: NEXT_PUBLIC_INKY_LILY_STUDIO_URL overrides `hiddenURL` at build time.
 */
export const CONFIG = {
  hiddenURL: process.env.NEXT_PUBLIC_INKY_LILY_STUDIO_URL ?? "https://your-inky-lily-studio.example.com",
  /** First wave after load — keep short so visitors actually see them */
  firstSpawnDelayMin: 2800,
  firstSpawnDelayMax: 6500,
  /** Between later waves (after one crosses the screen or after closing the door) */
  minInterval: 45000,
  maxInterval: 180000,
} as const;
