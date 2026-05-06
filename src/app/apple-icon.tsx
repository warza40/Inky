import { ImageResponse } from "next/og";
import { loadAnybody700 } from "@/lib/anybody-font";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  const fontData = await loadAnybody700();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        borderRadius: "22%",
        color: "#ffffff",
        fontSize: 73,
        fontFamily: '"Anybody", system-ui, sans-serif',
        fontWeight: 700,
        letterSpacing: "-0.035em",
      }}
    >
      RM
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Anybody",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
