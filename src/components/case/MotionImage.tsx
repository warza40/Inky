"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MotionImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function MotionImage({
  src,
  alt,
  caption,
  className,
  fill = false,
  width,
  height,
}: MotionImageProps) {
  return (
    <figure className={cn("rounded-xl overflow-hidden border border-neutral-200/50", className)}>
      <motion.div
        className="relative w-full aspect-video bg-neutral-100"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 600}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>
      {caption && (
        <figcaption className="p-4 bg-neutral-50 text-sm text-neutral-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
