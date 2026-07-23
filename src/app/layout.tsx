import "./globals.css";
import "@/styles/case-omantel-journal.css";
import type { Metadata, Viewport } from "next";
import ThinkingTopography from "@/components/ThinkingTopography";
import { ThemeProvider } from "@/contexts/ThemeContext";
import {
  Lora,
  Instrument_Serif,
  DM_Mono,
  Noto_Serif_JP,
  Bricolage_Grotesque,
  Anybody,
  Plus_Jakarta_Sans,
} from "next/font/google";

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

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

const anybody = Anybody({
  subsets: ["latin"],
  variable: "--font-anybody-family",
  display: "swap",
});

/** Mobile + tablet: correct initial scale, notches, safe areas */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#faf7f2",
};

export const metadata: Metadata = {
  title: "Rachana Mandal — Senior Product Designer",
  description:
    "Senior Product Designer with 6+ years of experience designing complex product systems across UX, behavioural design, and AI-driven workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} ${instrumentSerif.variable} ${dmMono.variable} ${notoSerifJP.variable} ${plusJakartaSans.variable} ${bricolageGrotesque.variable} ${anybody.variable}`}
    >
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "x5d18smvgm");`,
          }}
        />
      </head>
      <body className="nebula-body text-neutral-900">
        <ThemeProvider>
          <div className="app-root">
            <ThinkingTopography />
            <div className="main-content">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
