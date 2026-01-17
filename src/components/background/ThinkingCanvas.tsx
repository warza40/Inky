"use client";

import { useEffect, useRef } from "react";

type Branch = {
  x: number;
  y: number;
  angle: number;
  length: number;
  depth: number;
};

export default function ThinkingNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(0); // 0 → 1 loop progress

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const root: Branch = {
      x: canvas.width / 2,
      y: canvas.height * 0.65,
      angle: -Math.PI / 2,
      length: 140,
      depth: 0,
    };

    const maxDepth = 8;

    const drawBranch = (b: Branch, progress: number) => {
      if (b.depth > maxDepth) return;

      const growth = Math.min(progress * 1.35, 1); // ¾ of loop = near full

      const endX = b.x + Math.cos(b.angle) * b.length * growth;
      const endY = b.y + Math.sin(b.angle) * b.length * growth;

      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(endX, endY);

      ctx.strokeStyle = gradientForDepth(b.depth);
      ctx.lineWidth = Math.max(0.8, 3 - b.depth * 0.3);
      ctx.lineCap = "round";
      ctx.stroke();

      if (growth < 1) return;

      const spread = 0.45;
      const nextLength = b.length * 0.75;

      drawBranch(
        {
          x: endX,
          y: endY,
          angle: b.angle - spread,
          length: nextLength,
          depth: b.depth + 1,
        },
        progress
      );

      drawBranch(
        {
          x: endX,
          y: endY,
          angle: b.angle + spread,
          length: nextLength,
          depth: b.depth + 1,
        },
        progress
      );
    };

    const gradientForDepth = (depth: number) => {
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

      if (depth < 3) {
        g.addColorStop(0, "#cfcfcf");
        g.addColorStop(1, "#b9b9b9");
      } else if (depth < 6) {
        g.addColorStop(0, "#c9bddb"); // lavender-grey
        g.addColorStop(1, "#b2c4bb"); // sage
      } else {
        g.addColorStop(0, "#d9d9d9");
        g.addColorStop(1, "#e5e5e5");
      }

      return g;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      progressRef.current += 0.0025; // slow, calm growth

      if (progressRef.current > 1) {
        progressRef.current = 0;
      }

      drawBranch(root, progressRef.current);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      aria-hidden
    />
  );
}
