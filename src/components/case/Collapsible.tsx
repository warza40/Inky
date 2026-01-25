"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CollapsibleProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Collapsible({ children, title, className }: CollapsibleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("collapsible", className)}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left rounded-xl border border-neutral-200/50 mb-2"
      >
        {title && <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>}
        <span className="text-sm font-medium text-neutral-600 ml-auto">
          {open ? "Hide details ↑" : "Reveal details ↓"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="collapsible-content overflow-hidden"
          >
            <div className="p-4 bg-white rounded-xl border border-neutral-200/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
