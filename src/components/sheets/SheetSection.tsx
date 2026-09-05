"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/sheets/SectionHeader";
import {
  sheetRevealVariants,
  sheetTransition,
} from "@/components/sheets/sheet-motion";
import { cn } from "@/lib/utils";

interface SheetSectionProps {
  id: string;
  title: ReactNode;
  number?: string | number;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  trackActive?: boolean;
}

export function SheetSection({
  id,
  title,
  number,
  children,
  className,
  bodyClassName,
  trackActive = true,
}: SheetSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isActive = useInView(ref, {
    margin: "-35% 0px -50% 0px",
    amount: 0.15,
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn(
        "sheet-section paper-elevated-sheet",
        trackActive && isActive && "paper-elevated-sheet--active",
        className,
      )}
      variants={sheetRevealVariants}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-10% 0px -6% 0px" }}
      transition={sheetTransition}
    >
      <SectionHeader title={title} number={number} />
      <div className={cn("sheet-section-body", bodyClassName)}>{children}</div>
    </motion.section>
  );
}
