"use client";

import { useEffect, useRef } from "react";
import BlinkyBot from "./CursorBot_Blinky";

export function BlinkyBotCanvas({ scale = 3 }: { scale?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bot = new BlinkyBot(canvas, scale);
    bot.start();
    return () => bot.stop();
  }, [scale]);

  return <canvas ref={canvasRef} className="hero-blinky-bot" aria-hidden />;
}
