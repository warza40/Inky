/**
 * Midori-style flat index clip (metal tab on page edge) — title paper / inserts.
 */

import type { CSSProperties, SVGProps } from "react";

/** Flat brushed-brass bookmark / clip motif (rectangle + tab with +, inner slot). Hero resume Post-it mounts beneath. */
export function BrassBookmarkResumeClip(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 56 98"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient
          id="bbhMetal"
          x1="8"
          y1="12"
          x2="52"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f3eacb" />
          <stop offset="0.38" stopColor="#debd58" />
          <stop offset="0.72" stopColor="#c49a38" />
          <stop offset="1" stopColor="#7a6220" />
        </linearGradient>
        <filter id="bbhDS" x="-80%" y="-65%" width="260%" height="220%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.4" floodOpacity="0.48" />
        </filter>
        <mask id="bbhHole">
          <rect width="56" height="98" fill="white" />
          {/* + cutout on tab */}
          <rect x="25" y="11" width="6" height="2" rx="0.75" fill="black" />
          <rect x="27" y="9" width="2" height="6" rx="0.75" fill="black" />
          {/* slot through body */}
          <rect x="17.5" y="42" width="21" height="52" rx="6" fill="black" />
        </mask>
      </defs>
      <g filter="url(#bbhDS)" mask="url(#bbhHole)">
        <rect
          x="21"
          y="6"
          width="14"
          height="16"
          rx="3"
          fill="url(#bbhMetal)"
          stroke="#4f3c10"
          strokeWidth={1.2}
        />
        <rect
          x="10"
          y="28"
          width="36"
          height="62"
          rx="8"
          fill="url(#bbhMetal)"
          stroke="#4f3c10"
          strokeWidth={1.35}
        />
      </g>
    </svg>
  );
}

/**
 * Metallic index-tab clip: horizontal frame with inner cutout (page shows through hole),
 * rose-gold / copper finish — sits on sheet edge reference.
 */
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
          {/* Single journal title clip — static ids acceptable on page */}
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

/** Sliding wire-path clip from the binder edge (decorative SVG). */
export function PaperClipInsertLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={68}
      height={34}
      viewBox="0 0 68 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M 64 5 L 15 5 Q 3 5 3 17 Q 3 29 15 29 L 64 29"
        stroke="#6a5828"
        strokeWidth={6}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 64 5 L 15 5 Q 3 5 3 17 Q 3 29 15 29 L 64 29"
        stroke="#c8a85c"
        strokeWidth={3.8}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 64 5 L 15 5 Q 3 5 3 17 Q 3 29 15 29 L 64 29"
        stroke="#e8cc80"
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 64 11 L 25 11 Q 16 11 16 17 Q 16 23 25 23 L 64 23"
        stroke="#5a4818"
        strokeWidth={5.5}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 64 11 L 25 11 Q 16 11 16 17 Q 16 23 25 23 L 64 23"
        stroke="#b09848"
        strokeWidth={3.4}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 64 11 L 25 11 Q 16 11 16 17 Q 16 23 25 23 L 64 23"
        stroke="#d4b464"
        strokeWidth={1.4}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function PaperClipPhoto(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={54}
      height={26}
      viewBox="0 0 54 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M 50 4 L 12 4 Q 3 4 3 13 Q 3 22 12 22 L 50 22"
        stroke="#6a5828"
        strokeWidth={5.5}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 50 4 L 12 4 Q 3 4 3 13 Q 3 22 12 22 L 50 22"
        stroke="#c8a85c"
        strokeWidth={3.4}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 50 4 L 12 4 Q 3 4 3 13 Q 3 22 12 22 L 50 22"
        stroke="#e8cc80"
        strokeWidth={1.4}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 50 9 L 20 9 Q 14 9 14 13 Q 14 17 20 17 L 50 17"
        stroke="#5a4818"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 50 9 L 20 9 Q 14 9 14 13 Q 14 17 20 17 L 50 17"
        stroke="#b09848"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 50 9 L 20 9 Q 14 9 14 13 Q 14 17 20 17 L 50 17"
        stroke="#d4b464"
        strokeWidth={1.2}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
