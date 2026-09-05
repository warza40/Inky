"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface InPageNavSection {
  id: string;
  label: string;
}

interface InPageSectionNavProps {
  sections: InPageNavSection[];
  className?: string;
  ariaLabel?: string;
}

function getInitialActiveSection(sections: InPageNavSection[]): string {
  if (typeof window === "undefined") return sections[0]?.id ?? "";
  const hash = window.location.hash.slice(1);
  if (hash && sections.some((s) => s.id === hash)) return hash;
  return sections[0]?.id ?? "";
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function InPageSectionNav({
  sections,
  className,
  ariaLabel = "Page sections",
}: InPageSectionNavProps) {
  const [activeSection, setActiveSection] = useState(() =>
    getInitialActiveSection(sections),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-140px 0px -50% 0px", threshold: 0 },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [sections]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, "", `#${id}`);
      }
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      setActiveSection(id);
    }
  };

  if (sections.length === 0) return null;

  return (
    <nav className={cn("sheet-nav", className)} aria-label={ariaLabel}>
      <div className="sheet-nav-inner">
        <div className="sheet-nav-row">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              data-section={id}
              onClick={() => handleClick(id)}
              className={cn(
                "sheet-nav-tab",
                activeSection === id && "sheet-nav-tab--active",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
