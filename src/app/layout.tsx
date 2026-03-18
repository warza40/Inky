import "./globals.css";
import ThinkingTopography from "@/components/ThinkingTopography";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Questrial, Fraunces, DM_Sans, Inter, Poppins } from "next/font/google";

const questrial = Questrial({ weight: "400", variable: "--font-questrial", display: "swap" });

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('rachana-portfolio-theme');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${questrial.variable} ${fraunces.variable} ${dmSans.variable} ${inter.variable} ${poppins.variable}`}
    >
      <body className="nebula-body text-neutral-900 dark:text-neutral-100">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
