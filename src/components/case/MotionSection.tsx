"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

interface MotionSectionProps {
  children: React.ReactNode;
  id?: string;
  title?: string;
  className?: string;
}

export function MotionSection({ children, id, title, className }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
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
