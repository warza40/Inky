import { cn } from "@/lib/utils";

interface SparkleProps {
  className?: string;
  size?: number;
}

/** Figma Sparkle style=fine (6:20) */
export function Sparkle({ className, size = 96 }: SparkleProps) {
  return (
    <img
      src="/sparkle-fine.svg"
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={cn("sparkle-mark", className)}
    />
  );
}
