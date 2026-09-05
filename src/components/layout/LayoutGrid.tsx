import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LayoutGridProps {
  children: ReactNode;
  className?: string;
  subGrid?: boolean;
  as?: "div" | "section" | "ul" | "header";
  style?: CSSProperties;
}

export function LayoutGrid({
  children,
  className,
  subGrid = false,
  as: Tag = "div",
  style,
}: LayoutGridProps) {
  return (
    <Tag
      className={cn("layout-grid", subGrid && "layout-grid--sub", className)}
      style={style}
    >
      {children}
    </Tag>
  );
}

interface GridCellProps {
  children: ReactNode;
  className?: string;
  col?: { start: number; end: number };
  as?: "div" | "li" | "article" | "header";
}

export function GridCell({
  children,
  className,
  col,
  as: Tag = "div",
}: GridCellProps) {
  const style: CSSProperties | undefined =
    col !== undefined ? { gridColumn: `${col.start} / ${col.end}` } : undefined;

  return (
    <Tag className={cn("layout-grid__cell", className)} style={style}>
      {children}
    </Tag>
  );
}
