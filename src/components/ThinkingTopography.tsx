"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const COLORS = ["#966EA0", "#CBADDE", "#223057"];

type ClusterSize = "small" | "medium" | "large";

type RippleCore = {
  x: number;
  y: number;
  word: string;
  startTime: number;
  size: ClusterSize;
  isSecondary: boolean;
  numRings: number;
  maxRadius: number;
  spacingFactor: number;
  interactionRadius: number;
  strength: number;
};

export default function ThinkingTopography({
  enabled = true,
  opacity = 1,
}: {
  enabled?: boolean;
  opacity?: number;
}) {
  if (typeof window === "undefined") return null;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Initialize mouse position
    mouseRef.current = { x: width / 2, y: height / 2 };

    const CLUSTERS = [
      { word: "patterns",  start: 0.0,    size: "large" },
      { word: "biases",    start: 3.625,  size: "medium" },
      { word: "evolution", start: 7.25,   size: "large" },
      { word: "synthesis", start: 10.875, size: "medium" },
      { word: "data",      start: 14.5,   size: "small" },
    ] as const;

    const SECONDARY_WORDS = ["trade-offs", "systems", "second-order"];

    function pickRandom<T>(arr: T[], count: number) {
      return [...arr]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
    }

    const secondaryCount = Math.random() < 0.5 ? 1 : 2;

    const CLUSTER_PROFILES = {
      small: {
        rings: 10,
        maxRadius: [120, 180],
        spacingFactor: 0.7,
        interactionRadius: 160,
      },
      medium: {
        rings: 14,
        maxRadius: [200, 300],
        spacingFactor: 0.9,
        interactionRadius: 220,
      },
      large: {
        rings: 18,
        maxRadius: [320, 480],
        spacingFactor: 1.0,
        interactionRadius: 300,
      },
    };

    const MIN_SEPARATION = {
      small: 180,
      medium: 260,
      large: 340,
    };

    const REVEAL_DURATION = 1.5; // seconds

    const secondaryClusters = pickRandom(SECONDARY_WORDS, secondaryCount).map(
      (word, idx) => ({
        word,
        start: 4 + Math.random() * 10,
        size: Math.random() < 0.6 ? "small" : "medium",
        isSecondary: true,
      })
    );

    const primaryClusters = CLUSTERS.map((c) => ({
      ...c,
      isSecondary: false,
    }));

    const allClusters = [...primaryClusters, ...secondaryClusters];

    const cores: RippleCore[] = [];
    
    allClusters.forEach((c) => {
      const profile =
        CLUSTER_PROFILES[
          c.size === "large" ? "large" :
          c.size === "medium" ? "medium" : "small"
        ];

      const [minR, maxR] = profile.maxRadius;

      let attempts = 0;
      let newCore: RippleCore | null = null;

      while (!newCore && attempts < 100) {
        const x = 150 + Math.random() * (width - 300);
        const y = 150 + Math.random() * (height - 300);
        
        // Check distance from existing cores
        let tooClose = false;
        for (const other of cores) {
          const dx = x - other.x;
          const dy = y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const minDist =
            (c.isSecondary || other.isSecondary)
              ? 200
              : MIN_SEPARATION[c.size] + MIN_SEPARATION[other.size] * 0.5;
          
          if (dist < minDist) {
            tooClose = true;
            break;
          }
        }

        if (!tooClose) {
          newCore = {
            x,
            y,
            word: c.word,
            startTime: c.start,
            size: c.size,
            isSecondary: c.isSecondary ?? false,
            numRings: profile.rings,
            maxRadius: minR + Math.random() * (maxR - minR),
            spacingFactor: profile.spacingFactor,
            interactionRadius: profile.interactionRadius,
            strength: c.isSecondary ? 0.45 : 0.7,
          };
          cores.push(newCore);
        }

        attempts++;
      }
    });

    const startTimestamp = performance.now();
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const loop = () => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // Calculate elapsed time and which clusters should be visible
      const now = performance.now();
      const elapsed = (now - startTimestamp) / 1000; // seconds

      // Draw concentric ripples for each core using core.startTime
      cores.forEach((core) => {
        const t = elapsed - core.startTime;
        if (t <= 0) return;

        const revealProgress = Math.min(t / REVEAL_DURATION, 1);

        // Draw multiple rings for each core to create the topographic look
        const opacityScale = core.isSecondary ? 0.6 : 1.0;

        const visibleRings = Math.floor(core.numRings * revealProgress);

        for (let i = 1; i <= visibleRings; i++) {
          const baseRadius =
            (i / core.numRings) *
            core.maxRadius *
            core.spacingFactor;

          ctx.beginPath();
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = COLORS[i % COLORS.length];

          // Calculate opacity based on build progress and distance from center
          const fadeOut = 1 - (i / core.numRings);
          ctx.globalAlpha = 0.25 * revealProgress * fadeOut * opacityScale;

          // Draw ring with "organic" distortion
          const segments = 80;

          for (let s = 0; s <= segments; s++) {
            const angle = (s / segments) * Math.PI * 2;

            // Interaction with mouse
            const px = core.x + Math.cos(angle) * baseRadius;
            const py = core.y + Math.sin(angle) * baseRadius;

            const mouseDx = px - mouseRef.current.x;
            const mouseDy = py - mouseRef.current.y;
            const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            const mouseShift =
              mouseDist < core.interactionRadius
                ? (1 - mouseDist / core.interactionRadius) * 12
                : 0;

            // Per-point distortion
            const distortion = Math.sin(angle * 4 + i) * 8 * core.strength;
            const r = baseRadius + distortion;

            const finalX = core.x + Math.cos(angle) * r + (mouseDx / mouseDist || 0) * mouseShift;
            const finalY = core.y + Math.sin(angle) * r + (mouseDy / mouseDist || 0) * mouseShift;

            if (s === 0) ctx.moveTo(finalX, finalY);
            else ctx.lineTo(finalX, finalY);
          }

          ctx.stroke();
        }

        // Draw word at core
        if ((!core.isSecondary && revealProgress > 0.4) || (core.isSecondary && revealProgress > 0.85)) {
          ctx.font = "11px 'Geist Mono', monospace";
          ctx.textAlign = "center";
          ctx.fillStyle = COLORS[2];
          ctx.globalAlpha = (revealProgress - 0.4) * 2 * 0.7;
          ctx.globalAlpha *= core.isSecondary ? 0.6 : 1;
          ctx.fillText(core.word, core.x, core.y);
        }
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) return null;

  if (!enabled) return null;

  const canvas = (
    <canvas
      id="thinking-topography"
      ref={canvasRef}
      className="pointer-events-none"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity,
      }}
    />
  );

  return typeof document !== "undefined"
    ? createPortal(canvas, document.body)
    : null;
}
