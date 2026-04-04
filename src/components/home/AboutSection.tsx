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

        <div className="about-section-body">
          <p>
            I&apos;m a senior UX designer and strategist. Most of my work sits
            where products meet operations — flows that have to stay coherent
            when data, policy, and human judgment all show up at once.
          </p>
          <p>
            I care about making complexity legible: the right abstractions in
            the interface, and the right conversations with stakeholders so the
            product doesn&apos;t quietly encode the wrong tradeoffs.
          </p>
          <p>
            Before that work shows up as UI, it usually shows up as walls,
            boards, and hard questions. That&apos;s the part I lean into.
          </p>
        </div>
      </div>
    </section>
  );
}
