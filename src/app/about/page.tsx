import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

const title = "About me";
const description =
  "I got into design because I couldn't stop asking why things work the way they do. Turns out that question is harder to answer than it looks — and a lot more fun.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
