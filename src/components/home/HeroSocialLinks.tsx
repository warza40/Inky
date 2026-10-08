import Link from "next/link";
import { FileText } from "lucide-react";
import { SOCIAL_LINKS, type SocialLink } from "@/data/social-links";
import { expandingCursorAttrs } from "@/lib/expanding-cursor";
import { SubstackIcon } from "@/components/layout/SubstackIcon";

function HeroSocialIcon({ link }: { link: SocialLink }) {
  if (link.id === "substack") {
    return <SubstackIcon className="home-hero__social-icon" />;
  }
  if (link.id === "resume") {
    return (
      <FileText
        className="home-hero__social-icon"
        size={20}
        strokeWidth={2}
        aria-hidden
      />
    );
  }
  const Icon = link.icon;
  if (!Icon) return null;
  return (
    <Icon
      className="home-hero__social-icon"
      size={20}
      strokeWidth={2}
      aria-hidden
    />
  );
}

function HeroSocialItem({ link }: { link: SocialLink }) {
  const content = (
    <>
      <span className="home-hero__social-tile">
        <HeroSocialIcon link={link} />
      </span>
      <span className="home-hero__social-label">{link.label}</span>
    </>
  );

  const className = "home-hero__social-item";
  const cursorProps = expandingCursorAttrs(link.cursor);

  if (link.href.startsWith("mailto:")) {
    return (
      <a
        href={link.href}
        className={className}
        data-social={link.id}
        {...cursorProps}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={className}
      data-social={link.id}
      {...(link.external
        ? { target: "_blank" as const, rel: "noopener noreferrer" }
        : {})}
      {...cursorProps}
    >
      {content}
    </Link>
  );
}

export function HeroSocialLinks() {
  return (
    <nav className="home-hero__socials" aria-label="Social links">
      {SOCIAL_LINKS.map((link) => (
        <HeroSocialItem key={link.id} link={link} />
      ))}
    </nav>
  );
}
