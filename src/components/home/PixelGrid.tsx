"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const SIZE = 32;
const GLYPH_STEP_MS = 140;
const GLYPH_CYCLE_MS = 4000;

const COLORS = [
  "#EF6A5F",
  "#7FA6E3",
  "#5B53B3",
  "#081D47",
];

const DEFAULT_PIXEL_COLOR = "#0E1C3D";

/* V shape: left leg top→bottom, then right leg top→bottom */
const GLYPH: [number, number][] = [
  [15, 10], [14, 11], [13, 12], [12, 13], [11, 14], /* left leg */
  [16, 10], [17, 11], [18, 12], [19, 13], [20, 14], /* right leg */
];

export type PixelGridHandle = {
  setPixel: (x: number, y: number, color: string) => void;
  clearGrid: () => void;
};

export const PixelGrid = forwardRef<PixelGridHandle, object>(function PixelGrid(_, ref) {
  const pixelsRef = useRef<HTMLDivElement[]>([]);
  const stepRef = useRef(0);

  useEffect(() => {
    const grid = document.getElementById("pixelGrid");
    if (!grid) return;

    grid.innerHTML = "";
    pixelsRef.current = [];

    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        grid.appendChild(pixel);
        pixelsRef.current.push(pixel);
      }
    }

    return () => {
      grid.innerHTML = "";
      pixelsRef.current = [];
    };
  }, []);

  useEffect(() => {
    function setPixel(x: number, y: number, color: string) {
      const index = y * SIZE + x;
      if (pixelsRef.current[index]) {
        pixelsRef.current[index].style.background = color;
      }
    }

    function clearGrid() {
      pixelsRef.current.forEach((p) => {
        p.style.background = DEFAULT_PIXEL_COLOR;
      });
    }

    function drawGlyph() {
      if (stepRef.current < GLYPH.length) {
        const [x, y] = GLYPH[stepRef.current];
        setPixel(x, y, COLORS[0]);
        stepRef.current++;
      }
    }

    function cycleGlyph() {
      clearGrid();
      stepRef.current = 0;
    }

    const drawId = setInterval(drawGlyph, GLYPH_STEP_MS);
    const cycleId = setInterval(cycleGlyph, GLYPH_CYCLE_MS);
    return () => {
      clearInterval(drawId);
      clearInterval(cycleId);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    setPixel(x: number, y: number, color: string) {
      const index = y * SIZE + x;
      if (pixelsRef.current[index]) {
        pixelsRef.current[index].style.background = color;
      }
    },
    clearGrid() {
      pixelsRef.current.forEach((p) => {
        p.style.background = DEFAULT_PIXEL_COLOR;
      });
    },
  }), []);

  return (
    <div className="pixel-frame">
      <div id="pixelGrid" className="pixel-grid" />
    </div>
  );
});
