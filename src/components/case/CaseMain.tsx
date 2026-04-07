"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

interface CaseMainProps {
  children: React.ReactNode;
  className?: string;
}

export function CaseMain({ children, className }: CaseMainProps) {
  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className={cn("case-main", className)}
    >
      {children}
    </motion.main>
  );
}
