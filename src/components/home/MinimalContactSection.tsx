import { Section } from "@/components/layout/Section";
import { LayoutGrid, GridCell } from "@/components/layout/LayoutGrid";

export function MinimalContactSection() {
  return (
    <Section id="contact" padding="standard" ariaLabel="Contact">
      <LayoutGrid className="layout-grid--align-start">
        <GridCell col={{ start: 1, end: 7 }}>
          <h2 className="work-section__heading">Contact</h2>
        </GridCell>
        <GridCell col={{ start: 7, end: 13 }}>
          <div className="contact-section__content">
            <p className="contact-section__support">
              Open to senior product design roles. Email if you want to talk
              through a messy system.
            </p>
            <a
              href="mailto:rachanamandal@gmail.com"
              className="contact-section__email"
            >
              rachanamandal@gmail.com
            </a>
          </div>
        </GridCell>
      </LayoutGrid>
    </Section>
  );
}
