// src/app/topography/main.ts

export const WORD_ZONES = {
  intro: ["context"],
  work: ["systems", "patterns"],
  thinking: ["trade-offs", "second-order"],
  values: ["care", "responsibility"],
  contact: ["continuity"]
};

export type ContourConfig = {
  width: number;
  layers?: number;
  spacing?: number;
};

type RippleSource = {
  x: number;
  strength: number;
  wavelength: number;
};

export function generateContours({
  width,
  layers = 28,
  spacing = 18,
}: ContourConfig): string[] {
  const contours: string[] = [];

  // --- 1. Define ripple sources (this is the terrain) ---
  const ripples: RippleSource[] = [
    { x: width * 0.25, strength: 120, wavelength: 420 },
    { x: width * 0.55, strength: 90, wavelength: 320 },
    { x: width * 0.8, strength: 60, wavelength: 260 },
  ];

  function heightField(x: number): number {
    let h = 0;

    for (const r of ripples) {
      const d = Math.abs(x - r.x);
      h +=
        Math.cos(d / r.wavelength) *
        Math.exp(-d / (r.wavelength * 1.8)) *
        r.strength;
    }

    return h;
  }

  // --- 2. Generate contour slices ---
  for (let i = 0; i < layers; i++) {
    const baseY = 260 + i * spacing;
    let d = `M 0 ${baseY + heightField(0)}`;

    // Use very small step size (1px) for smooth appearance
    for (let x = 1; x <= width; x += 1) {
      const y = baseY + heightField(x);
      d += ` L ${x} ${y}`;
    }

    contours.push(d);
  }

  return contours;
}

export function getElevation() {
  const sections = document.querySelectorAll<HTMLElement>(
    "section[data-elevation]"
  );
  let elevation = 0;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const progress = Math.min(
      Math.max(1 - rect.top / window.innerHeight, 0),
      1
    );

    elevation = Math.max(
      elevation,
      progress * parseFloat(section.dataset.elevation || "0")
    );
  });

  return elevation;
}

export function handleScroll(contours: SVGPathElement[]) {
  const elevation = getElevation();

  contours.forEach((path, i) => {
    const layerPoint = i / contours.length;
    const visible = elevation > layerPoint;

    path.style.opacity = visible ? "0.8" : "0";
  });
}
