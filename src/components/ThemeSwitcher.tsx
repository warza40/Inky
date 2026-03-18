"use client";

import { Sun, Lightbulb } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

type ThemeSwitcherVariant = "default" | "outline";

export function ThemeSwitcher({ variant = "default" }: { variant?: ThemeSwitcherVariant }) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  if (variant === "outline") {
    return (
      <div
        className="inline-flex shrink-0 items-center rounded-[100px] border border-[var(--home-border)] p-0.5 opacity-80 hover:opacity-100 transition-opacity"
        role="group"
        aria-label="Theme switcher"
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={`
            flex shrink-0 items-center justify-center w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] rounded-full border border-transparent transition-colors
            ${theme === "light"
              ? "border-[var(--home-border)] text-[var(--primary-dark)]"
              : "text-foreground/50 hover:text-foreground/80 hover:border-foreground/30"
            }
          `}
          aria-label="Light mode"
          aria-pressed={theme === "light"}
        >
          <Sun size={18} strokeWidth={2} className="shrink-0" />
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={`
            flex shrink-0 items-center justify-center w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] rounded-full border border-transparent transition-colors
            ${theme === "dark"
              ? "border-[var(--home-border)] text-[var(--primary-dark)]"
              : "text-foreground/50 hover:text-foreground/80 hover:border-foreground/30"
            }
          `}
          aria-label="Dark mode"
          aria-pressed={theme === "dark"}
        >
          <Lightbulb size={18} strokeWidth={2} className="shrink-0" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`
        flex flex-col rounded-xl overflow-hidden
        border shadow-sm p-1
        ${isDark ? "bg-neutral-800 border-white/25" : "bg-white border-neutral-200"}
      `}
      role="group"
      aria-label="Theme switcher"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`
          flex flex-col items-center justify-center
          w-12 py-3 rounded-lg
          transition-colors
          ${theme === "light"
            ? isDark ? "bg-neutral-700 text-amber-400" : "bg-neutral-100 text-amber-600"
            : isDark ? "text-neutral-400 hover:text-neutral-300 hover:bg-neutral-700/50" : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
          }
        `}
        aria-label="Light mode"
        aria-pressed={theme === "light"}
      >
        <Sun size={20} strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`
          flex flex-col items-center justify-center
          w-12 py-3 rounded-lg
          transition-colors
          ${theme === "dark"
            ? isDark ? "bg-amber-500/25 text-amber-400" : "bg-amber-500/25 text-amber-600"
            : isDark ? "text-neutral-400 hover:text-neutral-300 hover:bg-neutral-700/50" : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
          }
        `}
        aria-label="Dark mode"
        aria-pressed={theme === "dark"}
      >
        <Lightbulb size={20} strokeWidth={2} />
      </button>
    </div>
  );
}
