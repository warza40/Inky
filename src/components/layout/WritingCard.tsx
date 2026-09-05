import Image from "next/image";
import Link from "next/link";
import type { HomeWriting } from "@/data/home-writing";

interface WritingCardProps {
  item: HomeWriting;
}

export function WritingCard({ item }: WritingCardProps) {
  return (
    <Link
      href={item.href}
      className="sheet-card sheet-card--tile sheet-card--writing"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="sheet-card-visual">
        <div className="sheet-card-image-wrap">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
            className="sheet-card-image"
            style={
              item.imageObjectPosition
                ? { objectPosition: item.imageObjectPosition }
                : undefined
            }
          />
        </div>
      </div>
      <div className="sheet-card-body">
        <h3 className="sheet-card-title">{item.title}</h3>
        <p className="sheet-card-desc">{item.caption}</p>
      </div>
    </Link>
  );
}
