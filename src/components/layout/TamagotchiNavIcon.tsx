import { TamagotchiCharacter } from "@/components/ui/TamagotchiCharacter";

/** Nav mascot — sm desktop (61:346 / 88:1324), scales to xs slot on mobile. */
export function TamagotchiNavIcon() {
  return (
    <TamagotchiCharacter
      size="sm"
      expression="idle"
      blink
      className="tamagotchi-nav-icon"
    />
  );
}
