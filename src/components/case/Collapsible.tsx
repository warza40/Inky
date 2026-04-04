"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CollapsibleProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  /** When true, only show the reveal control (for use under a section header) */
  hideTitle?: boolean;
}

export function Collapsible({ children, title, className, hideTitle }: CollapsibleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("cs-reveal-wrapper", open && "open", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn("cs-reveal", open && "open")}
        aria-expanded={open}
      >
        <span className="cs-reveal-label">{title ?? "Details"}</span>
        <span className="cs-reveal-btn">
          {open ? "Hide" : "Reveal to read more"}
          <span className="cs-reveal-arrow">{open ? "↑" : "↓"}</span>
        </span>
      </button>

      <div className={cn("cs-reveal-content", open && "open")}>
        <div className="cs-reveal-inner pt-4 pb-2">
          {children}
        </div>
      </div>
    </div>
  );
}
