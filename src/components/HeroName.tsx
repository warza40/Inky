"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const FULL_NAME = "/Rachana Mandal";

export default function HeroName() {
  const [phase, setPhase] = useState<"initial" | "typing">("initial");
  const [typedText, setTypedText] = useState("");

  // Trigger transition after delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPhase("typing");
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (phase !== "typing") return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTypedText(FULL_NAME.slice(0, index));

      if (index === FULL_NAME.length) {
        clearInterval(interval);
      }
    }, 45); // typing speed (adjust 40–55ms)

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="relative h-[48px] overflow-hidden">
      <AnimatePresence>
        {phase === "initial" && (
          <motion.span
            key="rm"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 top-0 text-3xl font-semibold tracking-tight"
          >
            /RM
          </motion.span>
        )}
      </AnimatePresence>

      {phase === "typing" && (
        <motion.span
          key="full"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-0 top-0 text-3xl font-semibold tracking-tight"
        >
          {typedText}
          <span className="ml-[2px] animate-pulse">|</span>
        </motion.span>
      )}
    </div>
  );
}
