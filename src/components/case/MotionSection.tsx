"use client";

import type { ReactNode } from "react";
import { SheetSection } from "@/components/sheets/SheetSection";
import { cn } from "@/lib/utils";

interface MotionSectionProps {
  children: ReactNode;
  id?: string;
  title?: ReactNode;
  number?: string | number;
  className?: string;
}

export function MotionSection({
  children,
  id,
  title,
  number,
  className,
}: MotionSectionProps) {
  if (!id || title == null) {
    return (
      <section className={cn("cs-section", className)}>
        <div className="cs-section-body">{children}</div>
      </section>
    );
  }

  return (
    <SheetSection
      id={id}
      title={title}
      number={number}
      className={cn("cs-section cs-section--sheet", className)}
      bodyClassName="cs-section-body"
    >
      {children}
    </SheetSection>
  );
}
