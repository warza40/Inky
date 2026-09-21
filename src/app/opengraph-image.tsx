import { ImageResponse } from "next/og";
import { TamagotchiIconMark } from "@/lib/tamagotchi-icon-mark";
import { siteName } from "@/lib/site-metadata";

export const alt = siteName;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        background: "#f8f7f4",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 220,
          height: 220,
          background: "#63aa92",
          borderRadius: 48,
          border: "4px solid #1c1c1e",
          boxShadow: "8px 8px 0 0 #1c1c1e",
        }}
      >
        <TamagotchiIconMark width={160} height={160} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 640,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#1c1c1e",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#55545a",
            lineHeight: 1.3,
          }}
        >
          Product designer for B2B tools and operational workflows.
        </div>
      </div>
    </div>,
    size,
  );
}
