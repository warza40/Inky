"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CaseNavigationProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
  className?: string;
}

export function CaseNavigation({ sections, className }: CaseNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-80px 0px -80% 0px",
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

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <nav className={cn("case-navigation", className)}>
      <ul className="flex flex-col gap-2">
        {sections.map(({ id, label }) => {
          const active = activeSection === id;
          return (
            <motion.li
              key={id}
              animate={{ opacity: active ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
              onClick={() => handleClick(id)}
            >
              <button
                className={cn(
                  "text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors text-left relative pl-3",
                  active && "font-semibold"
                )}
              >
                {active && (
                  <span
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                    style={{ backgroundColor: "#FF8D28" }}
                  />
                )}
                {label}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}
