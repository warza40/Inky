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
  className?: string;
}

export function MotionSection({ children, id, className }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("section", className)}
    >
      {children}
    </motion.section>
  );
}
