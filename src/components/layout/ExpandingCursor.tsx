"use client";

import { ArrowRight } from "lucide-react";
import { TamagotchiCharacter } from "@/components/ui/TamagotchiCharacter";
import { cn } from "@/lib/utils";

export type ExpandingCursorState = {
  visible: boolean;
  x: number;
  y: number;
  title: string;
  hint: string;
};

export function ExpandingCursor({
  visible,
  x,
  y,
  title,
  hint,
}: ExpandingCursorState) {
  return (
    <div
      className={cn("expanding-cursor", visible && "expanding-cursor--visible")}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      aria-hidden
    >
      <TamagotchiCharacter
        size="sm"
        expression="idle"
        blink
        className="expanding-cursor__mascot"
      />
      <div className="expanding-cursor__copy">
        <p className="expanding-cursor__title">{title}</p>
        <p className="expanding-cursor__hint">{hint}</p>
      </div>
      <span className="expanding-cursor__arrow" aria-hidden>
        <ArrowRight size={28} strokeWidth={2} />
      </span>
    </div>
  );
}
