import { PaperClipSticky } from "@/components/home/PaperClipIcons";
import { JournalSectionHeader } from "@/components/home/JournalSectionHeader";
import { JournalAboutPhotoCarousel } from "@/components/home/JournalAboutPhotoCarousel";
import { AboutApproachPostIt } from "@/components/home/AboutApproachPostIt";
import Image from "next/image";

/** Raster from `public/About me 1.png` — URL-encoded for spaces */
const ABOUT_PHOTO_SRC = "/About%20me%201.png";

const SECTION_THE_WORK = [
  "That curiosity is the job, really. Most of my work sits where products meet operations — flows that have to stay coherent when data, process, and human judgment all show up at once. I care about making complexity legible: the right ideas at the interface, the right framing in the room, so the product doesn't quietly encode the wrong tradeoffs.",
  "Before any of that shows up in Figma or any other tool, it shows up as walls, boards, and hard questions. That's the part I lean into most.",
];

const SECTION_THE_REST = [
  "Hello — I'm Rachana. Senior UX designer, behavioural science enthusiast, and probably the person at your table with the most specific fun fact about whatever you're talking about.",
  "I'm from Bengaluru, India. I'm curious about how things actually work, not just how they're supposed to work.",
];

const SECTION_CURRENTLY =
  "I read rooms. Not whether an idea landed — but how people process it. What format makes a stakeholder actually digest something versus perform agreement. The design usually follows once I understand what the room can actually hear.";

/** Same asset three slides so the dot carousel matches the reference rhythm */
const ABOUT_PHOTO_SLIDES = [
  { src: ABOUT_PHOTO_SRC, alt: "Rachana Mandal" },
  { src: ABOUT_PHOTO_SRC, alt: "Rachana Mandal — slide 2" },
  { src: ABOUT_PHOTO_SRC, alt: "Rachana Mandal — slide 3" },
];

export function AboutSection({
  journalLayout = false,
}: {
  journalLayout?: boolean;
}) {
  if (journalLayout) {
    return (
      <section
        className="about-section jl-about-wrap"
        id="about"
        aria-label="About me"
      >
        <div className="jl-about-outer">
          <JournalSectionHeader num="[04]" title="About me" />

          <div className="jl-about-insert jl-paper jl-paper-shadow about-section-inner">
            <div className="jl-punch-holes" aria-hidden>
              <span className="jl-punch-hole" />
              <span className="jl-punch-hole" />
              <span className="jl-punch-hole" />
            </div>

            <div className="jl-about-clip-left">
              <PaperClipSticky className="jl-clip-svg" tiltDeg={-10} />
            </div>
            <div
              className="jl-about-tape jl-washi jl-washi-asanoha"
              aria-hidden
            />

            <div className="jl-about-body-inner">
              <div className="jl-about-main-grid">
                <div className="jl-about-visual-col">
                  <div className="jl-photo-clip">
                    <PaperClipPhotoPlaceholder />
                  </div>
                  <JournalAboutPhotoCarousel slides={ABOUT_PHOTO_SLIDES} />
                </div>

                <div className="jl-about-text-col">
                  <section className="jl-about-copy-block">
                    <h3 className="jl-about-copy-eyebrow">The work</h3>
                    {SECTION_THE_WORK.map((text, i) => (
                      <p key={`jl-w-${i}`} className="about-intro-para">
                        {text}
                      </p>
                    ))}
                  </section>

                  <section className="jl-about-copy-block">
                    <h3 className="jl-about-copy-eyebrow">The rest of it</h3>
                    {SECTION_THE_REST.map((text, i) => (
                      <p key={`jl-r-${i}`} className="about-intro-para">
                        {text}
                      </p>
                    ))}
                  </section>

                  <section className="jl-about-copy-block jl-about-copy-block--currently">
                    <h3 className="jl-about-copy-eyebrow">Currently</h3>
                    <p className="about-intro-para jl-about-currently-inline">
                      <span className="jl-about-currently-dot" aria-hidden />
                      <span>{SECTION_CURRENTLY}</span>
                    </p>
                  </section>
                </div>
              </div>

              <AboutApproachPostIt />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const CLASSIC_PARAGRAPHS = [
    ...SECTION_THE_REST,
    SECTION_THE_WORK[0]!,
    SECTION_THE_WORK[1]!,
    SECTION_CURRENTLY,
  ];

  return (
    <section className="about-section" id="about" aria-label="About me">
      <div className="about-section-inner">
        <div className="about-grid">
          <figure className="about-photo-frame">
            <Image
              src={ABOUT_PHOTO_SRC}
              alt="Rachana Mandal"
              width={1440}
              height={2120}
              className="about-photo-img"
              sizes="(max-width: 768px) 220px, 280px"
              priority
            />
          </figure>
          <div className="about-intro-text">
            <header className="about-section-header">
              <p className="about-section-label">— About me</p>
              <h2 className="about-section-headline">
                Systems, craft, and the space between intent and outcome.
              </h2>
            </header>
            <div className="about-intro-copy">
              {CLASSIC_PARAGRAPHS.map((text, i) => (
                <p key={`about-p-${i}`} className="about-intro-para">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Gold “bars” accent beside the photo (reference post-it cue) */
function PaperClipPhotoPlaceholder() {
  return (
    <span className="jl-photo-bars" aria-hidden>
      <span />
      <span />
      <span />
    </span>
  );
}
