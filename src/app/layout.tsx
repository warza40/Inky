import "@/styles/typography.css";
import "./globals.css";
import "@/styles/layout-tokens.css";
import "@/styles/paper-material.css";
import "@/styles/layout-system.css";
import "@/styles/sheet-system.css";
import "@/styles/case-omantel-journal.css";
import type { Viewport } from "next";
import ThinkingTopography from "@/components/ThinkingTopography";
import { fontClassNames } from "@/lib/fonts";
import { defaultMetadata } from "@/lib/site-metadata";

export const metadata = defaultMetadata;

/** Mobile + tablet: correct initial scale, notches, safe areas */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f7f4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fontClassNames}>
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
        <div className="app-root">
          <ThinkingTopography />
          <div className="main-content">{children}</div>
        </div>
      </body>
    </html>
  );
}
