"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SHORT = "RM";
const FULL = "Rachana Mandal";

const TYPE_INTERVAL = 60;
const START_DELAY = 300;
const LOOP_DELAY = 20_000;

export function TypewriterName() {
  const [text, setText] = useState(SHORT);
  const [isTyping, setIsTyping] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startCycle();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startCycle = () => {
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
      setText("");

      let index = 0;

      intervalRef.current = setInterval(() => {
        index += 1;
        setText(FULL.slice(0, index));

        if (index === FULL.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);

          timeoutRef.current = setTimeout(() => {
            setText(SHORT);
            setIsTyping(false);
            startCycle();
          }, LOOP_DELAY);
        }
      }, TYPE_INTERVAL);
    }, START_DELAY);
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="typewriter-name inline-block text-xl md:text-2xl font-semibold tracking-tight text-white"
    >
      {text}
    </motion.span>
  );
}
