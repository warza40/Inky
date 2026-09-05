import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiments",
  description: "Interactive and visual experiments.",
};

export default function ExperimentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
