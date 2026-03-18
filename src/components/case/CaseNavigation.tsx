"use client";

import { useEffect, useRef, useState } from "react";
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

export function CaseNavigation({ sections, className, variant = "default" }: CaseNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "");
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sections.some((s) => s.id === hash)) {
      setActiveSection(hash);
    }
  }, [sections]);

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

    const observer = new IntersectionObserver(observerCallback, observerOptions);

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

  useEffect(() => {
    if (variant !== "cs") return;
    activeTabRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
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
  const content = sections.map(({ id, label }, index) => {
    const active = activeSection === id;
    return (
      <button
        key={id}
        type="button"
        ref={isCs && active ? activeTabRef : undefined}
        data-section={id}
        onClick={() => handleClick(id)}
        className={cn(
          isCs ? "cs-tab" : isVg ? "vg-nav-item" : "case-nav-item text-left",
          active && "active"
        )}
      >
        {isCs || isVg ? label : `${pad(index + 1)} ${label.toUpperCase()}`}
      </button>
    );
  });

  if (isVg || isCs) {
    return <>{content}</>;
  }
  return (
    <nav className={cn("flex flex-col min-h-0", className)}>
      {content}
    </nav>
  );
}
