import Image from "next/image";
import Link from "next/link";
import type { HomeCaseStudy } from "@/data/home-case-studies";

interface CaseStudyCardProps {
  study: HomeCaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      href={study.href}
      className="sheet-card sheet-card--tile sheet-card--case"
    >
      <div className="sheet-card-visual">
        <div className="sheet-card-image-wrap">
          <Image
            src={study.imageSrc}
            alt={study.imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
            className="sheet-card-image"
          />
        </div>
      </div>
      <div className="sheet-card-body">
        <h3 className="sheet-card-title">{study.title}</h3>
        <p className="sheet-card-desc">{study.caption}</p>
      </div>
    </Link>
  );
}
