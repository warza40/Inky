import { FloatingNav } from "@/components/layout/FloatingNav";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";
import { AboutApproach } from "@/components/about/AboutApproach";
import {
  AboutPhotoCarousel,
  type AboutCarouselSlide,
} from "@/components/about/AboutPhotoCarousel";

const ABOUT_ME_ASSET_PREFIX = "/About me";

function aboutMeAsset(fileName: string): string {
  return encodeURI(`${ABOUT_ME_ASSET_PREFIX}/${fileName}`);
}

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

export function AboutPage() {
  return (
    <div className="about-page">
      <FloatingNav />
      <main id="main-content" className="about-page__main">
        <div className="layout-rail about-page__rail">
          <div className="about-page__lead">
            <header className="about-page__intro">
              <h1 className="about-page__title">About me</h1>
              <blockquote className="about-page__quote">
                <p>
                  I got into design because I couldn&apos;t stop asking why
                  things work the way they do. Turns out that question is harder
                  to answer than it looks — and a lot more fun.
                </p>
              </blockquote>
            </header>

            <LayoutGrid className="about-page__split layout-grid--align-start">
              <GridCell col={{ start: 1, end: 6 }}>
                <AboutPhotoCarousel slides={ABOUT_PHOTO_SLIDES} />
              </GridCell>
              <GridCell col={{ start: 7, end: 13 }}>
                <dl className="about-page__rows">
                  <div className="about-page__row">
                    <dt className="about-page__label">Work</dt>
                    <dd className="about-page__value">
                      <p>
                        My work so far has been across B2B, SaaS and enterprise
                        platforms — in the form of internal tools and
                        operational workflows where the system works at a
                        slightly more complex level.
                      </p>
                      <p>
                        I love this kind of complexity. The job is to make it
                        legible — to hold the messy parts long enough that the
                        team can find the right tradeoffs together. Walls,
                        boards, hard questions, lots of post-its. Figma comes
                        later.
                      </p>
                    </dd>
                  </div>

                  <div className="about-page__row">
                    <dt className="about-page__label">How I think</dt>
                    <dd className="about-page__value">
                      <p>
                        I tend to pay attention to rooms — not whether an idea
                        landed, but <em>how</em> people are processing it. What
                        helps a stakeholder genuinely engage with something
                        versus politely nod past it.
                      </p>
                      <p>
                        I learn a lot from the people I work with — engineers,
                        PMs, ops folks who know the system in ways I don&apos;t.
                        The design usually gets stronger once I understand what
                        the room is actually thinking.
                      </p>
                      <p>
                        Outside of work I illustrate, make paintings and write
                        essays. I take utmost delight in learning new things
                        that add more perspective to the way I look at the
                        world.
                      </p>
                    </dd>
                  </div>

                  <div className="about-page__row">
                    <dt className="about-page__label">Background</dt>
                    <dd className="about-page__value">
                      <p>
                        HCI at masters level, computer science before that.
                        Behavioural science has been a running interest ever
                        since — it shapes how I frame problems more than any
                        tool does.
                      </p>
                      <p className="about-page__credentials">
                        <span>M.Des · HCI</span>
                        <span className="about-page__cred-sep"> / </span>
                        <span>B.E · Computer Science</span>
                        <span className="about-page__cred-sep"> / </span>
                        <span>Behavioural Science</span>
                      </p>
                    </dd>
                  </div>

                  <div className="about-page__row">
                    <dt className="about-page__label">Availability</dt>
                    <dd className="about-page__value">
                      <p>
                        <span className="about-page__pill">
                          <span className="about-page__pill-dot" aria-hidden />
                          Open to opportunities
                        </span>
                      </p>
                      <p className="about-page__meta">
                        Actively applying. Open to relocation. Always up for a
                        conversation.
                      </p>
                    </dd>
                  </div>
                </dl>
              </GridCell>
            </LayoutGrid>
          </div>

          <AboutApproach />
        </div>
      </main>
    </div>
  );
}
