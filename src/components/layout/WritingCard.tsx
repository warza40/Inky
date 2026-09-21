import Image from "next/image";
import Link from "next/link";
import type { HomeWriting } from "@/data/home-writing";
import { expandingCursorAttrs } from "@/lib/expanding-cursor";

interface WritingCardProps {
  item: HomeWriting;
  index: number;
}

export function WritingCard({ item, index }: WritingCardProps) {
  const indexLabel = String(index).padStart(2, "0");

  return (
    <Link
      href={item.href}
      className="article-card"
      target="_blank"
      rel="noopener noreferrer"
      {...expandingCursorAttrs(item.cursor)}
    >
      <div className="article-card__details">
        <span className="article-card__index" aria-hidden>
          {indexLabel}
        </span>

        <div className="article-card__thumbnail">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="112px"
            className="article-card__thumbnail-image"
            style={
              item.imageObjectPosition
                ? { objectPosition: item.imageObjectPosition }
                : undefined
            }
          />
        </div>

        <div className="article-card__copy">
          <h3 className="article-card__title">{item.title}</h3>
          <p className="article-card__caption">{item.caption}</p>
          <div className="article-card__meta">
            <span className="article-card__published">
              Published on Substack
            </span>
          </div>
        </div>
      </div>

      <p className="article-card__action">{item.cursor.title}</p>
    </Link>
  );
}
