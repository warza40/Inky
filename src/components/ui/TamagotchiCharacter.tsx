import { cn } from "@/lib/utils";

/** Figma 61:1354 (xs) · 61:346 (sm) · 61:1690 (mobile-md) · 61:682 (md/lg) · 53:178/57:178 (hero) · 61:1018 (xl) · 61:2026 (mobile-xl). */
export type TamagotchiExpression =
  | "idle"
  | "media"
  | "write"
  | "wink"
  | "celebrate";

export type TamagotchiSize =
  | "xs"
  | "sm"
  | "mobile-md"
  | "md"
  | "lg"
  | "mobile-xl"
  | "xl"
  | "hero";

type TamagotchiCharacterProps = {
  expression?: TamagotchiExpression;
  size?: TamagotchiSize;
  blink?: boolean;
  className?: string;
};

function TamagotchiFace({
  expression,
  blink,
  size,
}: {
  expression: TamagotchiExpression;
  blink: boolean;
  size: TamagotchiSize;
}) {
  const eyeClass = cn(
    "tamagotchi-character__eye",
    blink && expression === "idle" && "tamagotchi-character__eye--blink",
    blink &&
      expression === "idle" &&
      size === "hero" &&
      "tamagotchi-character__eye--blink-hero",
  );

  const eyeMetrics = {
    xs: { w: 1.7, h: 3.9, y: 12.2, leftX: 15, rightX: 22.8 },
    sm: { w: 2.43, h: 5.59, y: 11.8, leftX: 14.4, rightX: 22.3 },
    hero: { w: 3.33, h: 7.67, y: 11.5, leftX: 14.3, rightX: 22.3 },
    default: { w: 2.5, h: 5.5, y: 12, leftX: 14.5, rightX: 22.5 },
  } as const;

  const metrics =
    size === "xs" || size === "sm" || size === "hero"
      ? eyeMetrics[size]
      : eyeMetrics.default;

  const {
    w: eyeW,
    h: eyeH,
    y: eyeY,
    leftX: eyeLeftX,
    rightX: eyeRightX,
  } = metrics;

  switch (expression) {
    case "media":
      return (
        <path
          className="tamagotchi-character__play"
          d="M17.2 12.8L24.8 17L17.2 21.2V12.8Z"
          fill="#272222"
        />
      );
    case "write":
      return (
        <path
          className="tamagotchi-character__write"
          d="M15.5 12.5L20 19.5L24.5 12.5H21.8L20 15.8L18.2 12.5H15.5Z"
          fill="#272222"
        />
      );
    case "wink":
      return (
        <rect
          className="tamagotchi-character__wink"
          x="18.5"
          y="11.5"
          width="2.5"
          height="5.5"
          rx="0.5"
          fill="#272222"
          transform="rotate(40 19.75 14.25)"
        />
      );
    case "celebrate":
      return (
        <g
          className="tamagotchi-character__celebrate"
          transform="rotate(13 20 16)"
        >
          <path d="M17.5 10.5H19.5V18.5H17.5V10.5Z" fill="#272222" />
          <path
            d="M19.5 10.5L22.5 8.5L21.5 11.5L24 12.5L21 13.5L21.5 16.5L19.5 14.5V10.5Z"
            fill="#272222"
          />
          <circle cx="23.5" cy="9.5" r="0.6" fill="#272222" />
          <circle cx="24.5" cy="11" r="0.5" fill="#272222" />
          <circle cx="22.8" cy="12.2" r="0.45" fill="#272222" />
        </g>
      );
    case "idle":
    default:
      return (
        <>
          <rect
            className={cn(eyeClass, "tamagotchi-character__eye--left")}
            x={eyeLeftX}
            y={eyeY}
            width={eyeW}
            height={eyeH}
            rx="0.5"
            fill="#272222"
          />
          <rect
            className={cn(eyeClass, "tamagotchi-character__eye--right")}
            x={eyeRightX}
            y={eyeY}
            width={eyeW}
            height={eyeH}
            rx="0.5"
            fill="#272222"
          />
        </>
      );
  }
}

function TamagotchiButtons({ size }: { size: TamagotchiSize }) {
  if (size === "hero") {
    return (
      <>
        <rect
          x="5.9"
          y="31.2"
          width="5.8"
          height="3.9"
          rx="2.4"
          fill="#6CC3A4"
        />
        <rect
          x="17.1"
          y="31.2"
          width="5.8"
          height="3.9"
          rx="2.4"
          fill="#6CC3A4"
        />
        <rect
          x="28.3"
          y="31.2"
          width="5.8"
          height="3.9"
          rx="2.4"
          fill="#6CC3A4"
        />
      </>
    );
  }

  if (size === "xs" || size === "sm") {
    const pill =
      size === "xs"
        ? { w: 2.95, h: 2, rx: 1, y: 27.1, xs: [6.1, 13.2, 20.3] as const }
        : {
            w: 4.2,
            h: 2.85,
            rx: 1.4,
            y: 26.8,
            xs: [5.9, 14.05, 22.2] as const,
          };

    return (
      <>
        {pill.xs.map((x) => (
          <rect
            key={x}
            x={x}
            y={pill.y}
            width={pill.w}
            height={pill.h}
            rx={pill.rx}
            fill="#6CC3A4"
          />
        ))}
      </>
    );
  }

  return (
    <>
      <rect x="6.5" y="26.2" width="5.8" height="3.9" rx="2" fill="#6CC3A4" />
      <rect x="17.1" y="26.2" width="5.8" height="3.9" rx="2" fill="#6CC3A4" />
      <rect x="27.7" y="26.2" width="5.8" height="3.9" rx="2" fill="#6CC3A4" />
    </>
  );
}

export function TamagotchiCharacter({
  expression = "idle",
  size = "md",
  blink = expression === "idle",
  className,
}: TamagotchiCharacterProps) {
  return (
    <span
      className={cn(
        "tamagotchi-character",
        `tamagotchi-character--${size}`,
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="tamagotchi-character__svg"
      >
        <path
          d="M35.7 5.4C36.9 5.4 37.9 6.4 37.9 7.6V32.4C37.9 33.6 36.9 34.6 35.7 34.6H4.3C3.1 34.6 2.1 33.6 2.1 32.4V7.6C2.1 6.4 3.1 5.4 4.3 5.4H35.7Z"
          fill="#278263"
        />
        <path
          d="M6.8 7.5C5.9 7.5 5.2 8.2 5.2 9.1V21.6C5.2 22.5 5.9 23.2 6.8 23.2H33.2C34.1 23.2 34.8 22.5 34.8 21.6V9.1C34.8 8.2 34.1 7.5 33.2 7.5H6.8Z"
          fill="#F8F7F4"
        />
        <TamagotchiFace expression={expression} blink={blink} size={size} />
        <TamagotchiButtons size={size} />
      </svg>
    </span>
  );
}
