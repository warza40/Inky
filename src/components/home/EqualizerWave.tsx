"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const BAR_COUNT = 96;
const WAVE_DURATION = 38;
const STAGGER = 0.28;
const START_DELAY = 3;

const GENTLE_EASE = [0.55, 0, 0.2, 1] as const;

const HEIGHT_KEYFRAMES = [
  "12%", "14%", "17%", "21%", "26%", "32%", "39%", "48%", "58%", "68%", "78%", "86%", "92%",
  "90%", "48%", "22%", "14%", "12%",
];

export function EqualizerWave() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bars = Array.from({ length: BAR_COUNT }, (_, i) => ({
    id: i,
    delay: START_DELAY + i * STAGGER,
  }));

  const barGradient = isDark
    ? "linear-gradient(to top, rgba(30,60,100,0.95), rgba(100,140,200,0.7), rgba(255,255,255,0.45))"
    : "linear-gradient(to top, #1E4976 0%, #2C5282 25%, #5B9BD5 55%, #93C5E8 80%, #E8F4FC 95%, #FFFFFF 100%)";

  const containerGradient = isDark
    ? "linear-gradient(to top, rgba(22,22,22,0.5) 0%, transparent 55%)"
    : "linear-gradient(to top, rgba(30,73,118,0.18) 0%, rgba(91,155,213,0.12) 35%, transparent 65%)";

  return (
    <div
      className="equalizer-wave"
      aria-hidden
      style={{ background: containerGradient }}
    >
      <div className="equalizer-wave-bars">
        {bars.map((bar) => (
          <motion.div
            key={bar.id}
            className="equalizer-wave-bar"
            style={{ background: barGradient }}
            animate={{ height: HEIGHT_KEYFRAMES }}
            transition={{
              duration: WAVE_DURATION,
              ease: GENTLE_EASE,
              repeat: Infinity,
              delay: bar.delay % WAVE_DURATION,
            }}
          />
        ))}
      </div>
    </div>
  );
}
