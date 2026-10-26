import { cn } from "@/lib/utils";

interface CaseMainProps {
  children: React.ReactNode;
  className?: string;
}

export function CaseMain({ children, className }: CaseMainProps) {
  return <div className={cn("case-main", className)}>{children}</div>;
}
