"use client";

import { useRef, useEffect } from "react";
import HeroBg from "./HeroBg.js";

export function HeroBgReact() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const bg = new HeroBg(canvas);
    bg.start();
    return () => bg.stop();
  }, []);

  return (
    <canvas
      ref={ref}
      id="hero-canvas"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        cursor: "crosshair",
      }}
      aria-hidden
    />
  );
}
