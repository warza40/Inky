"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  title: string;
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export function BentoCard({ title, href, className, children }: BentoCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "bento-card",
        "cursor-pointer",
        "rounded-2xl",
        "bg-white",
        "shadow-sm",
        "p-6",
        "border border-neutral-200/50",
        "transition-all",
        "hover:shadow-md",
        "hover:border-neutral-300",
        className
      )}
      onClick={() => router.push(href)}
    >
      {children || (
        <h3 className="text-lg font-bold text-neutral-900 leading-tight">
          {title}
        </h3>
      )}
    </motion.div>
  );
}
