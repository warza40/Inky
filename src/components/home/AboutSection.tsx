import Image from "next/image";

const ABOUT_PHOTO_SRC = "/about-rachana.svg";

const ABOUT_ED_CARDS: string[] = [
  `Hello! I'm Rachana, a senior UX designer and a behavioural science enthusiast. Most of my work sits where products meet operations — flows that have to stay coherent when data, process and human judgment all show up at once.`,
  `I care about making complexity legible: the right concept at the interface level, and the right conversations with stakeholders so the product doesn't quietly encode the wrong tradeoffs.`,
  `Before that work shows up as UI, it usually shows up as walls, boards, and hard questions. That's the part I lean into. Most of my work happens before the Figma file opens.`,
  `I read rooms. Not whether an idea landed — but how people process it. The format that makes a stakeholder digest something versus perform agreement.`,
  `The design usually follows once I understand what the room can actually hear.`,
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

        <div className="about-divider" />

        <div className="about-intro-row">
          <figure className="about-photo-frame">
            <Image
              src={ABOUT_PHOTO_SRC}
              alt="Rachana Mandal"
              width={400}
              height={500}
              className="about-photo-img"
              sizes="(max-width: 768px) 220px, 280px"
              priority
            />
          </figure>
          <div className="about-intro-cards">
            {ABOUT_ED_CARDS.map((body, i) => (
              <article
                key={`about-ed-${i}`}
                className={
                  i % 2 === 0
                    ? "about-ed-card about-ed-card--warm"
                    : "about-ed-card about-ed-card--neutral"
                }
              >
                <div className="about-ed-card-strip" aria-hidden="true" />
                <p className="about-ed-card-body">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
