import { Section } from "@/components/layout/Section";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";

export function MinimalAboutSection() {
  return (
    <Section id="about" padding="standard" ariaLabel="About">
      <LayoutGrid className="layout-grid--align-start">
        <GridCell col={{ start: 1, end: 7 }}>
          <h2 className="about-section__title">
            I design for systems that are actually complicated.
          </h2>
        </GridCell>
        <GridCell col={{ start: 7, end: 13 }}>
          <div className="about-section__content">
            <div className="about-section__narrative">
              <p>
                Most of my work is B2B and enterprise: internal tools,
                activation flows, and ops dashboards where the hard part is
                getting smart people to agree on tradeoffs before anyone opens
                Figma.
              </p>
              <p>
                I got into design because I kept asking why things worked the
                way they did. That habit still drives how I run workshops, map
                systems, and write case studies.
              </p>
            </div>
            <p className="about-section__note">
              M.Des HCI · B.E CS · Bengaluru
            </p>
          </div>
        </GridCell>
      </LayoutGrid>
    </Section>
  );
}
