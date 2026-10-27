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
    const markerOffset = () => {
      const styles = getComputedStyle(document.documentElement);
      const navTop =
        Number.parseFloat(styles.getPropertyValue("--nav-offset-top")) || 0;
      const navHeight =
        Number.parseFloat(styles.getPropertyValue("--nav-height")) || 0;
      return navTop + navHeight + 32;
    };

    let frame = 0;
    const update = () => {
      const line = markerOffset();
      let current = sections[0]?.id ?? "";
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= line) current = id;
      });
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;
      if (atBottom && sections.length > 0) {
        current = sections[sections.length - 1]?.id ?? current;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    const resizeObserver = new ResizeObserver(onScroll);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
              aria-current={activeSection === id ? "location" : undefined}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
