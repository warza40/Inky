import "@/styles/typography.css";
import "./globals.css";
import "@/styles/layout-tokens.css";
import "@/styles/paper-material.css";
import "@/styles/layout-system.css";
import "@/styles/sheet-system.css";
import "@/styles/badge-system.css";
import "@/styles/portfolio-card.css";
import "@/styles/article-card.css";
import "@/styles/social-contact.css";
import "@/styles/site-footer.css";
import "@/styles/sparkle.css";
import "@/styles/hero-console.css";
import "@/styles/cta-button.css";
import "@/styles/tamagotchi-character.css";
import "@/styles/expanding-cursor.css";
import "@/styles/case-omantel-journal.css";
import "@/styles/a11y.css";
import { ExpandingCursorProvider } from "@/components/layout/ExpandingCursorProvider";
import type { Viewport } from "next";
import Script from "next/script";
import ThinkingTopography from "@/components/ThinkingTopography";
import { fontClassNames } from "@/lib/fonts";
import { defaultMetadata, personJsonLd } from "@/lib/site-metadata";

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
      <body className="nebula-body text-neutral-900">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "x5d18smvgm");`}
        </Script>
        <ExpandingCursorProvider>
          <div className="app-root">
            <ThinkingTopography />
            <div className="main-content">{children}</div>
          </div>
        </ExpandingCursorProvider>
      </body>
    </html>
  );
}
