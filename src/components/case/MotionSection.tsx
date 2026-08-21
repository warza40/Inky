"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { scrollRevealPresence } from "@/lib/scroll-reveal-presence";
import { cn } from "@/lib/utils";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

interface MotionSectionProps {
  children: React.ReactNode;
  id?: string;
  /** Section rail label (`h2.cs-section-label`) — string or richer tree (e.g. index + title) */
  title?: ReactNode;
  className?: string;
}

export function MotionSection({
  children,
  id,
  title,
  className,
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion();
  const presence = scrollRevealPresence(reduceMotion ?? null);

  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      initial={presence.initial}
      animate={presence.animate}
      whileInView={presence.whileInView}
      transition={
        reduceMotion !== false
          ? { duration: 0 }
          : { duration: 0.3, ease: "easeOut" }
      }
      viewport={{ once: true, margin: "-80px" }}
      className={cn("cs-section", className)}
    >
      {title != null && (
        <div className="cs-section-head">
          <div className="cs-section-bar amber" aria-hidden />
          <h2 className="cs-section-label">{title}</h2>
        </div>
      )}
      <div className="cs-section-body">{children}</div>
    </motion.section>
  );
}
