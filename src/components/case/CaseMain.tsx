import { cn } from "@/lib/utils";

interface CaseMainProps {
  children: React.ReactNode;
  className?: string;
}

export function CaseMain({ children, className }: CaseMainProps) {
  return (
    <div id="main-content" className={cn("case-main", className)}>
      {children}
    </div>
  );
}
