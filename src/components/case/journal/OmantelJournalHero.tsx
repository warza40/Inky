import Image from "next/image";

interface OmantelJournalHeroProps {
  src: string;
  alt: string;
}

/** Full-bleed hero visual with leather fade — images + copy unchanged from case data */
export function OmantelJournalHero({ src, alt }: OmantelJournalHeroProps) {
  return (
    <section className="ojo-hero" aria-label="Case study hero visual">
      <div className="ojo-hero-gradient" aria-hidden />
      <div className="ojo-hero-stage">
        <Image
          src={src}
          alt={alt}
          width={1440}
          height={810}
          sizes="(max-width: 768px) 100vw, min(1200px, 96vw)"
          priority
          className="ojo-hero-img"
        />
      </div>
      <div className="ojo-hero-overlay-bottom" aria-hidden />
    </section>
  );
}
