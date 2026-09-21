import { Section } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SocialContact } from "@/components/layout/SocialContact";

export function MinimalContactSection() {
  return (
    <>
      <Section
        id="contact"
        padding="standard"
        className="contact-section"
        ariaLabel="Social contact"
      >
        <SocialContact format="section" state="compose" />
      </Section>
      <SiteFooter />
    </>
  );
}
