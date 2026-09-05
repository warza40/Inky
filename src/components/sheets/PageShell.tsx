import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "main";
  hideTopography?: boolean;
}

export function PageShell({
  children,
  className,
  as: Tag = "div",
  hideTopography = true,
}: PageShellProps) {
  return (
    <Tag
      className={cn(
        "paper-canvas page-shell",
        hideTopography && "page-shell--no-topography",
        className,
      )}
    >
      <div className="paper-canvas-content page-shell-inner">{children}</div>
    </Tag>
  );
}
