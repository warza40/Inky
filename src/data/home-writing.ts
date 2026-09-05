export interface HomeWriting {
  id: string;
  title: string;
  caption: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageObjectPosition?: string;
}

export const HOME_WRITING: HomeWriting[] = [
  {
    id: "quiet-devaluation-of-effort",
    title: "The quiet devaluation of effort",
    caption:
      "How effort is made to look wasteful — and what gets lost when we skip the work.",
    imageSrc: "/images/writing/quiet-devaluation.png",
    imageAlt: "Crumpled paper in a library waste bin",
    imageObjectPosition: "center 52%",
    href: "https://open.substack.com/pub/thelilyput/p/the-quiet-devaluation-of-effort?utm_campaign=post-expanded-share&utm_medium=web",
  },
  {
    id: "entry-exit-digital-lending",
    title: "Entry & exit in digital lending",
    caption: "Instant approval on the way in; opaque failures on the way out.",
    imageSrc: "/images/writing/digital-lending.png",
    imageAlt: "Abstract illustration for digital lending essay",
    imageObjectPosition: "center 48%",
    href: "https://open.substack.com/pub/thelilyput/p/entry-and-exit-in-digital-lending?r=g3nqv&utm_campaign=post&utm_medium=web",
  },
  {
    id: "gate-kept-degrees",
    title: 'The system behind "gate-kept" degrees',
    caption: "The economy built the gate — not designers.",
    imageSrc: "/images/writing/gate-kept-degrees.png",
    imageAlt: "Abstract illustration for gate-kept degrees essay",
    href: "https://open.substack.com/pub/thelilyput/p/the-system-behind-gate-kept-degrees?r=g3nqv&utm_campaign=post&utm_medium=web",
  },
];
