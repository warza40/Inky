import {
  IBM_Plex_Mono,
  Instrument_Sans,
  Source_Serif_4,
} from "next/font/google";

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  adjustFontFallback: true,
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  adjustFontFallback: true,
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  adjustFontFallback: true,
});

export const fontClassNames = `${instrumentSans.variable} ${sourceSerif.variable} ${ibmPlexMono.variable}`;
