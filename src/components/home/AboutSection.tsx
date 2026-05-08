import { JournalSectionHeader } from "@/components/home/JournalSectionHeader";
import {
  JournalAboutPhotoCarousel,
  type AboutCarouselSlide,
} from "@/components/home/JournalAboutPhotoCarousel";
import { AboutApproachPostIt } from "@/components/home/AboutApproachPostIt";

const ABOUT_ME_ASSET_PREFIX = "/About me";

/** Encode spaces in paths under `public/About me/`. */
function aboutMeAsset(fileName: string): string {
  return encodeURI(`${ABOUT_ME_ASSET_PREFIX}/${fileName}`);
}

/**
 * Journal carousel images from `public/About me/`.
 * Third slide uses a resized JPEG exported from HEIC so it loads reliably in Chromium/Firefox.
 */
const ABOUT_PHOTO_SLIDES: AboutCarouselSlide[] = [
  {
    src: aboutMeAsset("About me 1.png"),
    alt: "Rachana Mandal",
    width: 1440,
    height: 2120,
  },
  {
    src: aboutMeAsset("About me 2.JPEG"),
    alt: "Rachana Mandal",
    width: 4000,
    height: 3000,
  },
  {
    src: aboutMeAsset("About me 3-carousel.jpg"),
    alt: "Rachana Mandal",
    width: 2000,
    height: 1500,
  },
];

function AboutBriefContent() {
  return (
    <div className="about-brief">
      <blockquote className="about-brief-quote">
        <p>
          I got into design because I couldn&apos;t stop asking why things work
          the way they do. Turns out that question is harder to answer than it
          looks — and a lot more fun.
        </p>
      </blockquote>

      <hr className="about-brief-rule" />

      <section
        className="about-brief-block"
        aria-labelledby="about-brief-the-work-heading"
      >
        <h3 id="about-brief-the-work-heading" className="about-brief-label">
          THE WORK
        </h3>
        <div className="about-brief-content">
          <p>
            My work so far has been across B2B, SaaS and enterprise platforms —
            in the form of internal tools and operational workflows where the
            system works at a slightly more complex level.
          </p>
          <p>
            I love this kind of complexity. The job is to make it legible — to
            hold the messy parts long enough that the team can find the right
            tradeoffs together. Walls, boards, hard questions, lots of post-its.
            Figma comes later.
          </p>
        </div>
      </section>

      <hr className="about-brief-rule" />

      <section
        className="about-brief-block"
        aria-labelledby="about-brief-how-i-think-heading"
      >
        <h3 id="about-brief-how-i-think-heading" className="about-brief-label">
          HOW I THINK
        </h3>
        <div className="about-brief-content">
          <p>
            I tend to pay attention to rooms — not whether an idea landed, but{" "}
            <em>how</em> people are processing it. What helps a stakeholder
            genuinely engage with something versus politely nod past it.
          </p>
          <p>
            I learn a lot from the people I work with — engineers, PMs, ops
            folks who know the system in ways I don&apos;t. The design usually
            gets stronger once I understand what the room is actually thinking.
          </p>
          <p className="about-brief-aside">
            Outside of work I illustrate, make paintings and write essays. I
            take utmost delight in learning new things that add more perspective
            to the way I look at the world.
          </p>
        </div>
      </section>

      <hr className="about-brief-rule" />

      <section
        className="about-brief-block"
        aria-labelledby="about-brief-background-heading"
      >
        <h3 id="about-brief-background-heading" className="about-brief-label">
          BACKGROUND
        </h3>
        <div className="about-brief-content">
          <p>
            HCI at masters level, computer science before that. Behavioural
            science has been a running interest ever since — it shapes how I
            frame problems more than any tool does.
          </p>
          <p className="about-brief-credentials">
            <span>M.Des · HCI</span>
            <span className="about-brief-cred-sep"> / </span>
            <span>B.E · Computer Science</span>
            <span className="about-brief-cred-sep"> / </span>
            <span>Behavioural Science</span>
          </p>
        </div>
      </section>

      <hr className="about-brief-rule" />

      <section
        className="about-brief-block"
        aria-labelledby="about-brief-availability-heading"
      >
        <h3 id="about-brief-availability-heading" className="about-brief-label">
          AVAILABILITY
        </h3>
        <div className="about-brief-content">
          <p className="about-brief-availability-pill-wrap">
            <span
              className="about-brief-status"
              aria-label="Currently open to opportunities"
            >
              <span className="about-brief-status-dot" aria-hidden="true" />
              Open to opportunities
            </span>
          </p>
          <p className="about-brief-availability-meta">
            Actively applying. Open to relocation. Always up for a conversation.
          </p>
        </div>
      </section>
    </div>
  );
}

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
            <div className="jl-about-body-inner jl-about-body-inner--grid">
              <div className="jl-about-main-grid">
                <div className="jl-about-visual-col">
                  <JournalAboutPhotoCarousel
                    slides={ABOUT_PHOTO_SLIDES}
                    autoAdvanceIntervalMs={5200}
                  />
                  <AboutApproachPostIt />
                </div>
                <div className="jl-about-text-col">
                  <AboutBriefContent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="about-section" id="about" aria-label="About me">
      <div className="about-section-inner about-section-inner--brief">
        <header className="about-section-header about-brief-classic-header">
          <p className="about-section-label">— About me</p>
          <h2 className="about-section-headline">About me</h2>
        </header>
        <AboutBriefContent />
      </div>
    </section>
  );
}
