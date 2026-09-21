import type { Transition, Variants } from "framer-motion";

/** Figma 125:1990 — 2.45s choreographed hero console entrance. */
export const HERO_CONSOLE_TIMELINE_S = 2.45;

const springSettle: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
  mass: 0.85,
};

const easeOut: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
};

export const heroConsoleShellVariants: Variants = {
  hidden: {
    rotate: 1.5,
    scaleY: 0.12,
    y: -48,
  },
  visible: {
    rotate: 0,
    scaleY: 1,
    y: 0,
    transition: {
      ...springSettle,
      delay: 0,
    },
  },
};

export const heroConsoleScreenVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleX: 0.02,
    x: -32,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    x: 0,
    transition: {
      ...easeOut,
      delay: 0.64,
    },
  },
};

export const heroConsoleIntroVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...easeOut,
      delay: 0.38,
    },
  },
};

export const heroConsoleControlsVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: 16,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...springSettle,
      delay: 0.92,
    },
  },
};

export const heroConsoleStaticVariants: Variants = {
  hidden: {},
  visible: {},
};
