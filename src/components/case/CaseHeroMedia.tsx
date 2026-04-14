import Image from "next/image";

interface CaseHeroMediaProps {
  src: string;
  alt: string;
}

export function CaseHeroMedia({ src, alt }: CaseHeroMediaProps) {
  return (
    <div className="cs-case-hero-media cs-case-hero-media--enter">
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={810}
        className="cs-case-hero-media-img"
        sizes="100vw"
        priority
      />
    </div>
  );
}
