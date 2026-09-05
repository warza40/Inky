import type { Transition, Variants } from "framer-motion";

export const SHEET_EASE = [0.22, 1, 0.36, 1] as const;

export const SHEET_DURATION = 0.2;

export const SHEET_DURATION_SHEET = 0.24;

export const sheetTransition: Transition = {
  duration: SHEET_DURATION,
  ease: SHEET_EASE,
};

export const sheetRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
