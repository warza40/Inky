/**
 * Midori-style flat index clip (metal tab on page edge) — title paper / inserts.
 */

import type { CSSProperties, SVGProps } from "react";

/** Metallic index-tab clip for case study title paper. */
export function PaperClipSticky(
  props: Omit<SVGProps<SVGSVGElement>, "width" | "height" | "viewBox"> & {
    tiltDeg?: number;
  },
) {
  const { className, tiltDeg = 11, style, ...rest } = props;

  return (
    <span
      className={
        className
          ? `pc-index-clip-on-paper ${className}`
          : "pc-index-clip-on-paper"
      }
      style={{ ...style, "--pc-index-tilt": `${tiltDeg}deg` } as CSSProperties}
    >
      <svg
        className="pc-index-clip-svg"
        width={68}
        height={44}
        viewBox="0 0 80 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        {...rest}
      >
        <defs>
          <linearGradient
            id="idxTabMetal"
            x1="8"
            y1="12"
            x2="72"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff0e8" />
            <stop offset="0.18" stopColor="#f5c4ae" />
            <stop offset="0.42" stopColor="#d98770" />
            <stop offset="0.62" stopColor="#c96f58" />
            <stop offset="0.82" stopColor="#e09a82" />
            <stop offset="1" stopColor="#8f4a42" />
          </linearGradient>
          <mask id="idxTabRing" maskUnits="userSpaceOnUse">
            <rect
              x="9"
              y="10"
              width="62"
              height="31"
              rx="5"
              ry="5"
              fill="white"
            />
            <rect
              x="19"
              y="18.5"
              width="42"
              height="14.5"
              rx="3.2"
              ry="3.2"
              fill="black"
            />
          </mask>
          <filter id="idxTabDs" x="-35%" y="-35%" width="175%" height="175%">
            <feDropShadow
              dx="0"
              dy="2.75"
              stdDeviation="2.2"
              floodOpacity="0.38"
            />
          </filter>
        </defs>
        <g filter="url(#idxTabDs)">
          <rect
            x="9"
            y="10"
            width="62"
            height="31"
            rx="5"
            ry="5"
            fill="url(#idxTabMetal)"
            mask="url(#idxTabRing)"
          />
          <rect
            x="9"
            y="10"
            width="62"
            height="31"
            rx="5"
            ry="5"
            fill="none"
            stroke="rgba(72, 32, 28, 0.42)"
            strokeWidth="1"
            mask="url(#idxTabRing)"
          />
          <rect
            x="19"
            y="18.5"
            width="42"
            height="14.5"
            rx="3.2"
            ry="3.2"
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="0.55"
          />
        </g>
      </svg>
    </span>
  );
}
