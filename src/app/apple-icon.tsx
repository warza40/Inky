import { ImageResponse } from "next/og";
import { TamagotchiIconMark } from "@/lib/tamagotchi-icon-mark";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#63aa92",
        borderRadius: 40,
      }}
    >
      <TamagotchiIconMark width={132} height={132} />
    </div>,
    size,
  );
}
