import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "eyebrow" | "badge" | "tag";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
  children: ReactNode;
}

const variantClass: Record<BadgeVariant, string> = {
  eyebrow: "site-badge--eyebrow",
  badge: "site-badge--badge",
  tag: "site-badge--tag",
};

export function Badge({ variant, children, className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn("site-badge", variantClass[variant], className)}
      {...rest}
    >
      {children}
    </span>
  );
}
