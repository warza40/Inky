import { motion } from "motion/react";
import { useState } from "react";
import svgPaths from "./svg-ail8rtbjgi";
import laserSvgPaths from "./svg-yr3xokyu14";

export default function BlinkyBot() {
  const [blinkCount, setBlinkCount] = useState(0);
  const [showLasers, setShowLasers] = useState(false);

  const handleBlinkComplete = () => {
    setBlinkCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 2) {
        setShowLasers(true);
        setTimeout(() => {
          setShowLasers(false);
          setBlinkCount(0);
        }, 2500);
      }
      return newCount;
    });
  };

  return (
    <div className="relative size-full" data-name="blinky bot">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 290 240"
      >
        <g id="blinky bot">
          <rect fill="white" height="240" width="290" />

          {/* Bot body - switch between normal and laser (eyes down) version */}
          <motion.path
            d={
              showLasers
                ? laserSvgPaths.pccb9980
                : svgPaths.p1602f580
            }
            fill="var(--fill-0, #343030)"
            id="Subtract"
          />

          {!showLasers && (
            <>
              {/* Animated eyelids for blinking - normal position */}
              <motion.rect
                x="154"
                y="70"
                width="16"
                height="28"
                rx="2"
                fill="var(--fill-0, #343030)"
                animate={{
                  scaleY: [0, 0.75, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
                onAnimationComplete={handleBlinkComplete}
                style={{ originY: 1, transformBox: "fill-box" }}
              />
              <motion.rect
                x="182"
                y="70"
                width="16"
                height="28"
                rx="2"
                fill="var(--fill-0, #343030)"
                animate={{
                  scaleY: [0, 0.75, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
                style={{ originY: 1, transformBox: "fill-box" }}
              />
            </>
          )}

          {/* Torch light - rendered after bot body so it appears on top */}
          {showLasers && (
            <>
              {/* Conical torch light beam */}
              <motion.path
                d={laserSvgPaths.p267a480}
                fill="var(--fill-0, #FFFBAB)"
                fillOpacity="0.4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {/* Brighter inner glow */}
              <motion.path
                d={laserSvgPaths.p267a480}
                fill="#FFEB3B"
                fillOpacity="0.3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ filter: "blur(10px)" }}
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}