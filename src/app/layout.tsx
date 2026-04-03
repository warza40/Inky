import "./globals.css";
import ThinkingTopography from "@/components/ThinkingTopography";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Lora, Instrument_Serif, DM_Sans, DM_Mono, Noto_Serif_JP } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300"],
  variable: "--font-noto-jp",
  display: "swap",
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} ${instrumentSerif.variable} ${dmSans.variable} ${dmMono.variable} ${notoSerifJP.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,300;1,400;1,500&family=Cabinet+Grotesk:wght@700;800;900&family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400&family=Noto+Serif+JP:wght@200;300&display=swap" rel="stylesheet" />
      </head>
      <body className="nebula-body text-neutral-900">
        <ThemeProvider>
          <div className="app-root">
            <ThinkingTopography />
            <div className="main-content">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
