import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: ReactNode;
  number?: string | number;
  className?: string;
}

function formatSectionNumber(number: string | number): string {
  if (typeof number === "string") return number;
  return String(number).padStart(2, "0");
}

export function SectionHeader({
  title,
  number,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("sheet-section-header", className)}>
      {number != null ? (
        <span className="sheet-section-number" aria-hidden>
          {formatSectionNumber(number)}
        </span>
      ) : null}
      <h2 className="sheet-section-title">{title}</h2>
    </header>
  );
}
