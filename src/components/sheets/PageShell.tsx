import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PageSparkleMarks } from "@/components/ui/PageSparkleMarks";
import type { PageSparkleVariant } from "@/components/ui/page-sparkle-marks";

interface PageShellProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "main";
  hideTopography?: boolean;
  /** Figma 52:406 background sparkle marks. */
  sparkleMarks?: PageSparkleVariant | false;
}

export function PageShell({
  children,
  className,
  as: Tag = "div",
  hideTopography = true,
  sparkleMarks = false,
}: PageShellProps) {
  return (
    <Tag
      className={cn(
        "paper-canvas page-shell",
        hideTopography && "page-shell--no-topography",
        sparkleMarks && "page-shell--sparkles",
        className,
      )}
    >
      {sparkleMarks ? <PageSparkleMarks variant={sparkleMarks} /> : null}
      <div className="paper-canvas-content page-shell-inner">{children}</div>
    </Tag>
  );
}
