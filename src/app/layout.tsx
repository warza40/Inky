import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import ThinkingTopography from "@/components/ThinkingTopography";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900">
        <ThinkingTopography />
        <div className="main-content">
          {/* Global Navigation */}
          <header className="fixed top-0 left-0 right-0 z-50">
            {/* Gradient stroke */}
            <div
              aria-hidden
              className="
                pointer-events-none
                absolute inset-x-0 top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-neutral-300/40
                to-transparent
              "
            />

            {/* Nav surface */}
            <div
              className="
                bg-white/80
                backdrop-blur
                border-b border-neutral-200
              "
            >
              <div
                className="
                  pl-8 pr-12 py-4
                  flex items-center justify-between
                "
              >
                {/* Left: Logo / Name */}
                <Link
                  href="/"
                  className="flex items-center"
                >
                  <div className="relative h-10 overflow-hidden">
                    <Image
                      src="/blinkybot.gif"
                      alt="Rachana Mandal"
                      width={150}
                      height={40}
                      priority
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                </Link>

                {/* Right: Nav links */}
                <nav className="flex gap-8 text-sm text-neutral-700">
                  <a href="/work" className="hover:text-neutral-900 transition-colors">
                    Work
                  </a>
                  <a href="/experiments" className="hover:text-neutral-900 transition-colors">
                    Experiments
                  </a>
                  <a href="/blog" className="hover:text-neutral-900 transition-colors">
                    Blog
                  </a>
                </nav>
              </div>
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
