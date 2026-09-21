import {
  Hanken_Grotesk,
  JetBrains_Mono,
  Nanum_Pen_Script,
} from "next/font/google";

export const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-hanken-grotesk",
  display: "swap",
  adjustFontFallback: true,
});

export const nanumPen = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-nanum-pen",
  display: "swap",
  adjustFontFallback: true,
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  adjustFontFallback: true,
});

export const fontClassNames = `${hankenGrotesk.variable} ${nanumPen.variable} ${jetbrainsMono.variable}`;
