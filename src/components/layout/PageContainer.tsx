import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  surfaceGrid?: boolean;
}

export function PageContainer({
  children,
  className,
  as: Tag = "div",
  surfaceGrid = false,
}: PageContainerProps) {
  return (
    <Tag
      className={cn(
        "page-container",
        surfaceGrid && "page-container--grid",
        className,
      )}
    >
      <div className="page-container__inner">{children}</div>
    </Tag>
  );
}
