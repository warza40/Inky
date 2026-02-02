import type { CaseStudy } from "@/case-studies/omantel";
import { MotionImage } from "./MotionImage";

interface DecisionBlockProps {
  decision: CaseStudy["sections"]["decisions"][0];
  index: number;
}

export function DecisionBlock({ decision, index }: DecisionBlockProps) {
  const displayImages = decision.images?.slice(0, 2) || [];

  return (
    <div className="mb-8 p-6 rounded-xl bg-white border border-neutral-200/50 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-bold">
          {index + 1}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            {decision.title}
          </h3>
          <p className="text-base text-neutral-700 leading-relaxed mb-4">
            {decision.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-200/50">
        <div>
          <h4 className="text-sm font-semibold text-neutral-700 mb-2">Rationale</h4>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {decision.rationale}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-neutral-700 mb-2">Impact</h4>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {decision.impact}
          </p>
        </div>
      </div>

      {displayImages.length > 0 && (
        <>
          <div className="mt-6 pt-6 border-t border-neutral-200/50 w-full">
            <h4 className="text-sm font-semibold text-neutral-700 mb-4">Visuals</h4>
            <div
              className={`grid gap-4 w-full max-w-full ${
                displayImages.length === 2 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {displayImages.map((image, imageIndex) => (
                <MotionImage
                  key={imageIndex}
                  src={image.src}
                  alt={image.alt}
                  caption={image.caption}
                  fill
                  objectFit="contain"
                  lightbox
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
