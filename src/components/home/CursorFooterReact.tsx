"use client";

import { useRef, useEffect } from "react";
import CursorFooter from "./CursorFooter";

interface CursorFooterReactProps {
  height?: number;
  speed?: number;
  text?: string;
}

export function CursorFooterReact({
  height = 240,
  speed = 0.32,
  text = "hand-coded with cursor",
}: CursorFooterReactProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const footer = new CursorFooter(canvas, { speed, text });
    footer.start();
    return () => footer.stop();
  }, [height, speed, text]);

  return (
    <div
      className="cursor-footer-react"
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        className="cursor-footer-canvas"
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
