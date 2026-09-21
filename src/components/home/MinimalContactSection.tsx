import { Section } from "@/components/layout/Section";
import { SocialContact } from "@/components/layout/SocialContact";

export function MinimalContactSection() {
  return (
    <Section
      id="contact"
      padding="none"
      className="contact-section"
      ariaLabel="Contact"
    >
      <SocialContact format="section" state="compose" />
    </Section>
  );
}
