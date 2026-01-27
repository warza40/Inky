"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function AnimatedBlinkybot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const loopCountRef = useRef(0);

  useEffect(() => {
    // Calculate the width based on the grid container
    const updateWidth = () => {
      if (containerRef.current) {
        // Find the bento-grid element
        const section = containerRef.current.closest('section');
        const gridContainer = section?.querySelector('.bento-grid') as HTMLElement;
        
        if (gridContainer) {
          // Get the width of the grid container
          const gridWidth = gridContainer.offsetWidth;
          const blinkybotWidth = 84;
          // Calculate how far to move (from start to end of grid minus blinkybot width)
          setMaxWidth(Math.max(0, gridWidth - blinkybotWidth));
        } else {
          // Fallback: use a reasonable default based on max-w-7xl
          // max-w-7xl is approximately 1280px, minus padding (64px), minus blinkybot
          setMaxWidth(1280 - 64 - 84);
        }
      }
    };

    // Wait for DOM to be ready
    const timeoutId = setTimeout(updateWidth, 100);
    updateWidth();
    
    window.addEventListener('resize', updateWidth);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    if (maxWidth === 0) return;

    let isCancelled = false;

    const animate = async () => {
      while (!isCancelled) {
        if (loopCountRef.current >= 2 && !isPaused) {
          // Pause for 5 minutes (300000ms) after 2 loops
          setIsPaused(true);
          await new Promise(resolve => setTimeout(resolve, 300000)); // 5 minutes
          if (isCancelled) return;
          setIsPaused(false);
          loopCountRef.current = 0; // Reset counter after pause
        }

        if (!isPaused && !isCancelled) {
          // Move to the right
          await controls.start({
            x: maxWidth,
            transition: {
              duration: 20, // Slower movement (increased from 12 to 20 seconds)
              ease: "linear",
            },
          });

          if (isCancelled) return;

          // Move back to the left
          await controls.start({
            x: 0,
            transition: {
              duration: 20, // Slower movement
              ease: "linear",
            },
          });

          loopCountRef.current += 1;
        }
      }
    };

    animate();

    return () => {
      isCancelled = true;
    };
  }, [maxWidth, controls, isPaused]);

  return (
    <div ref={containerRef} className="mb-6 relative h-[84px] overflow-visible">
      <motion.div
        initial={{ x: 0 }}
        animate={controls}
        className="absolute left-0"
      >
        <Link href="/" className="block">
          <Image
            src="/blinkybot.gif"
            alt="Rachana Mandal"
            width={84}
            height={84}
            priority
            className="w-[84px] h-[84px] object-contain"
          />
        </Link>
      </motion.div>
    </div>
  );
}
