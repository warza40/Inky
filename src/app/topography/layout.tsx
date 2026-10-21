import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thinking topography",
  description: "Generative contour experiment.",
  robots: { index: false, follow: false },
};

export default function TopographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="main-content">
      <h1 className="sr-only">Thinking topography</h1>
      {children}
    </main>
  );
}
