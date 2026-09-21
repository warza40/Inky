"use client";

import { TamagotchiFaceCycle } from "@/components/ui/TamagotchiFaceCycle";
import {
  TamagotchiCharacter,
  type TamagotchiExpression,
} from "@/components/ui/TamagotchiCharacter";
import { cn } from "@/lib/utils";

type TamagotchiWebsiteThumbnailProps = {
  className?: string;
  /** Cycle wink → media → celebrate → write → idle (Figma 117:1386 layers). */
  cycle?: boolean;
  expression?: TamagotchiExpression;
};

function ThumbnailMascot({
  cycle,
  expression,
  size,
}: {
  cycle: boolean;
  expression: TamagotchiExpression;
  size: "mobile-xl" | "xl";
}) {
  if (cycle) {
    return <TamagotchiFaceCycle size={size} />;
  }

  return (
    <TamagotchiCharacter
      size={size}
      expression={expression}
      blink={expression === "idle"}
    />
  );
}

/** Figma 117:1386 — white-frame website thumbnail with expression cycle. */
export function TamagotchiWebsiteThumbnail({
  className,
  cycle = true,
  expression = "idle",
}: TamagotchiWebsiteThumbnailProps) {
  return (
    <div className={cn("tamagotchi-website-thumbnail", className)} aria-hidden>
      <span className="tamagotchi-website-thumbnail__slot tamagotchi-website-thumbnail__slot--mobile">
        <ThumbnailMascot
          cycle={cycle}
          expression={expression}
          size="mobile-xl"
        />
      </span>
      <span className="tamagotchi-website-thumbnail__slot tamagotchi-website-thumbnail__slot--desktop">
        <ThumbnailMascot cycle={cycle} expression={expression} size="xl" />
      </span>
    </div>
  );
}
