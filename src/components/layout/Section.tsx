import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/PageContainer";

type SectionPadding = "none" | "standard" | "chapter" | "contact";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  ariaLabel?: string;
  padding?: SectionPadding;
  surfaceGrid?: boolean;
}

const paddingClass: Record<SectionPadding, string | undefined> = {
  none: undefined,
  standard: "site-section--standard",
  chapter: "site-section--chapter",
  contact: "site-section--contact",
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  ariaLabel,
  padding = "standard",
  surfaceGrid = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("site-section", paddingClass[padding], className)}
      aria-label={ariaLabel}
    >
      <PageContainer className={containerClassName} surfaceGrid={surfaceGrid}>
        {children}
      </PageContainer>
    </section>
  );
}
