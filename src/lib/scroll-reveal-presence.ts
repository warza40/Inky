/**
 * Presence props for Framer Motion scroll-reveal sections.
 *
 * `useReducedMotion()` is `null` during SSR and until the media query hydrates.
 * Treating `null` like "motion is OK" hides content (`initial="hidden"`) and then
 * drops `whileInView` when the preference becomes `true` — `initial` does not
 * re-apply after mount, so later sections can stay at opacity 0.
 *
 * Force the visible variant whenever motion is reduced or still unknown.
 */
export function scrollRevealPresence(reduceMotion: boolean | null): {
  initial: "hidden" | "visible";
  whileInView: "visible" | undefined;
  animate: "visible" | undefined;
} {
  if (reduceMotion === false) {
    return {
      initial: "hidden",
      whileInView: "visible",
      animate: undefined,
    };
  }

  return {
    initial: "visible",
    whileInView: undefined,
    animate: "visible",
  };
}
