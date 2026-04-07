import Image from "next/image";

/** Raster from `public/About me 1.png` — URL-encoded for spaces */
const ABOUT_PHOTO_SRC = "/About%20me%201.png";

const ABOUT_PARAGRAPHS: string[] = [
  "Hello — I'm Rachana. Senior UX designer, behavioural science enthusiast, and probably the person at your table with the most specific fun fact about whatever you're talking about.",
  "I'm from Bengaluru, India. I'm curious about how things actually work, not just how they're supposed to work.",
  "That curiosity is the job, really. Most of my work sits where products meet operations — flows that have to stay coherent when data, process, and human judgment all show up at once. I care about making complexity legible: the right ideas at the interface, the right framing in the room, so the product doesn't quietly encode the wrong tradeoffs.",
  "Before any of that shows up in Figma or any other tool, it shows up as walls, boards, and hard questions. That's the part I lean into most.",
  "I read rooms. Not whether an idea landed — but how people process it. What format makes a stakeholder actually digest something versus perform agreement. The design usually follows once I understand what the room can actually hear.",
];

export function AboutSection() {
  return (
    <section className="about-section" id="about" aria-label="About me">
      <div className="about-section-inner">
        <header className="about-section-header">
          <p className="about-section-label">— About me</p>
          <h2 className="about-section-headline">
            Systems, craft, and the space between intent and outcome.
          </h2>
        </header>

        <div className="about-intro-row">
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
          <div className="about-intro-copy">
            {ABOUT_PARAGRAPHS.map((text, i) => (
              <p key={`about-p-${i}`} className="about-intro-para">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
