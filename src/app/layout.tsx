import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rachana Mandal — Senior UX Designer",
  description:
    "Senior UX Designer with 6+ years of experience designing complex product systems across UX, behavioural design, and AI-driven workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global Navigation */}
        <header className="w-full px-6 py-6">
          <nav className="mx-auto flex max-w-6xl items-center justify-between">
            <span className="text-sm font-medium">
              Rachana Mandal
            </span>

            <ul className="flex gap-6 text-sm text-neutral-700">
              <li>
                <a href="/work" className="hover:text-black">
                  Work
                </a>
              </li>
              <li>
                <a href="/experiments" className="hover:text-black">
                  Experiments
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-black">
                  Blog
                </a>
              </li>
            </ul>
          </nav>
        </header>

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
