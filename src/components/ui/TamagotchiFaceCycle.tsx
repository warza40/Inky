"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  TamagotchiCharacter,
  type TamagotchiExpression,
  type TamagotchiSize,
} from "./TamagotchiCharacter";

/** Figma 57:178 — expression order for changing-faces loop. */
export const TAMAGOTCHI_FACE_CYCLE: TamagotchiExpression[] = [
  "wink",
  "media",
  "celebrate",
  "write",
  "idle",
];

type TamagotchiFaceCycleProps = {
  size?: TamagotchiSize;
  className?: string;
  intervalMs?: number;
  expressions?: TamagotchiExpression[];
};

export function TamagotchiFaceCycle({
  size = "hero",
  className,
  intervalMs = 1800,
  expressions = TAMAGOTCHI_FACE_CYCLE,
}: TamagotchiFaceCycleProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const expression = expressions[index] ?? "idle";

  useEffect(() => {
    if (reduceMotion || expressions.length <= 1) return;

    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % expressions.length),
      intervalMs,
    );

    return () => window.clearInterval(id);
  }, [expressions.length, intervalMs, reduceMotion]);

  const activeExpression = reduceMotion ? "idle" : expression;

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={activeExpression}
        className={cn("tamagotchi-face-cycle", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      >
        <TamagotchiCharacter
          size={size}
          expression={activeExpression}
          blink={activeExpression === "idle"}
        />
      </motion.span>
    </AnimatePresence>
  );
}
