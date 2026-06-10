"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface CaseNavigationProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
  className?: string;
  variant?: "default" | "voice-garden" | "cs";
}

function pad(i: number): string {
  return String(i).padStart(2, "0");
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Keep the active tab visible in the horizontal tab strip without scrolling the page. */
function scrollTabIntoTabsContainer(row: HTMLElement, btn: HTMLElement): void {
  const tabsContainer = row.closest(".cs-tabs") as HTMLElement | null;
  if (
    !tabsContainer ||
    tabsContainer.scrollWidth <= tabsContainer.clientWidth
  ) {
    return;
  }

  const containerScrollLeft = tabsContainer.scrollLeft;
  const containerWidth = tabsContainer.clientWidth;
  const btnLeft = btn.offsetLeft;
  const btnRight = btnLeft + btn.offsetWidth;
  const padding = 8;

  let targetScroll = containerScrollLeft;
  if (btnLeft < containerScrollLeft + padding) {
    targetScroll = btnLeft - padding;
  } else if (btnRight > containerScrollLeft + containerWidth - padding) {
    targetScroll = btnRight - containerWidth + padding;
  } else {
    return;
  }

  tabsContainer.scrollTo({
    left: Math.max(0, targetScroll),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

function getInitialActiveSection(
  sections: CaseNavigationProps["sections"],
): string {
  if (typeof window === "undefined") {
    return sections[0]?.id ?? "";
  }
  const hash = window.location.hash.slice(1);
  if (hash && sections.some((s) => s.id === hash)) {
    return hash;
  }
  return sections[0]?.id ?? "";
}

export function CaseNavigation({
  sections,
  className,
  variant = "default",
}: CaseNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>(() =>
    getInitialActiveSection(sections),
  );
  const rowRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  const syncIndicator = useCallback(() => {
    const row = rowRef.current;
    const indicator = indicatorRef.current;
    if (!row || !indicator) return;
    const btn = row.querySelector<HTMLButtonElement>(
      `button.cs-tab[data-section="${activeSection}"]`,
    );
    if (!btn) {
      indicator.style.width = "0px";
      indicator.style.transform = "translateX(0px)";
      return;
    }
    indicator.style.width = `${btn.offsetWidth}px`;
    indicator.style.transform = `translateX(${btn.offsetLeft}px)`;
  }, [activeSection]);

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-140px 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  useLayoutEffect(() => {
    syncIndicator();
  }, [syncIndicator, sections]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => syncIndicator());
    ro.observe(row);
    return () => ro.disconnect();
  }, [syncIndicator]);

  useEffect(() => {
    if (variant !== "cs") return;
    const row = rowRef.current;
    const btn = row?.querySelector<HTMLButtonElement>(
      `button.cs-tab[data-section="${activeSection}"]`,
    );
    if (!btn) return;
    scrollTabIntoTabsContainer(row, btn);
  }, [activeSection, variant]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  const isVg = variant === "voice-garden";
  const isCs = variant === "cs";

  const tabButtons = sections.map(({ id, label }, index) => {
    const active = activeSection === id;
    return (
      <button
        key={id}
        type="button"
        data-section={id}
        onClick={() => handleClick(id)}
        className={cn(
          isCs ? "cs-tab" : isVg ? "vg-nav-item" : "case-nav-item text-left",
          active && "active",
        )}
      >
        {isCs || isVg ? label : `${pad(index + 1)} ${label.toUpperCase()}`}
      </button>
    );
  });

  if (isCs) {
    return (
      <div className="cs-tabs-row" ref={rowRef}>
        <span className="cs-tab-indicator" ref={indicatorRef} aria-hidden />
        {tabButtons}
      </div>
    );
  }

  if (isVg) {
    return <>{tabButtons}</>;
  }

  return (
    <nav className={cn("flex flex-col min-h-0", className)}>{tabButtons}</nav>
  );
}
