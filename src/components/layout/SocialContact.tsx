import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { SOCIAL_LINKS, type SocialLink } from "@/data/social-links";
import { expandingCursorAttrs } from "@/lib/expanding-cursor";
import { SocialContactComposer } from "./SocialContactComposer";
import { SubstackIcon } from "./SubstackIcon";
import { cn } from "@/lib/utils";

export type SocialContactFormat = "section" | "card";
export type SocialContactState = "default" | "compose";

interface SocialContactProps {
  format?: SocialContactFormat;
  state?: SocialContactState;
  className?: string;
}

function SocialDestination({ link }: { link: SocialLink }) {
  const Icon = link.icon;
  const content = (
    <>
      <span className="social-contact__tile">
        {link.id === "substack" ? (
          <SubstackIcon className="social-contact__icon" />
        ) : Icon ? (
          <Icon
            className="social-contact__icon"
            size={20}
            strokeWidth={2}
            aria-hidden
          />
        ) : null}
      </span>
      <span className="social-contact__label">{link.label}</span>
    </>
  );

  const className = cn("social-contact__item");
  const externalProps = link.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

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
      {...externalProps}
      {...cursorProps}
    >
      {content}
    </Link>
  );
}

export function SocialContact({
  format = "section",
  state = "default",
  className,
}: SocialContactProps) {
  const isCard = format === "card";
  const showComposer = !isCard && state === "compose";

  return (
    <div
      className={cn(
        "social-contact",
        isCard ? "social-contact--card" : "social-contact--section",
        showComposer && "social-contact--compose",
        className,
      )}
    >
      <header className="social-contact__header">
        {isCard ? (
          <p className="social-contact__kicker">say hello — anytime</p>
        ) : (
          <Badge variant="eyebrow" className="social-contact__eyebrow">
            Social contact
          </Badge>
        )}
        <h2 className="social-contact__title">Reach out to me through.</h2>
        {isCard ? (
          <p className="social-contact__lede">
            Find my work, notes, updates, or send a message directly.
          </p>
        ) : null}
      </header>

      <nav className="social-contact__destinations" aria-label="Social links">
        {SOCIAL_LINKS.map((link) => (
          <SocialDestination key={link.id} link={link} />
        ))}
      </nav>

      {showComposer ? <SocialContactComposer /> : null}
    </div>
  );
}
