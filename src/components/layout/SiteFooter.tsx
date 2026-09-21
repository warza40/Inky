import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { Sparkle } from "@/components/ui/Sparkle";
import { TamagotchiNavIcon } from "@/components/layout/TamagotchiNavIcon";
import { RESUME_URL } from "@/data/social-links";

const CONTACT_EMAIL = "rachanamandal@gmail.com";
const PLOTTER_AI_URL = "https://plotter.ai";

export function SiteFooter() {
  return (
    <footer id="footer" className="site-footer" aria-label="Footer">
      <div className="site-footer__inner">
        <div className="site-footer__invitation">
          <div className="site-footer__copy">
            <p className="site-footer__eyebrow">[ LET&apos;S TALK ]</p>
            <h2 className="site-footer__headline">
              Open to Senior Product Designer roles in enterprise and AI-driven
              platforms.
            </h2>

            <div className="site-footer__brand">
              <div className="site-footer__brand-row">
                <TamagotchiNavIcon />
                <span className="site-footer__brand-name">RACHANA.M</span>
              </div>
              <p className="site-footer__brand-tagline">
                Product designer for complex, high-stakes enterprise systems.
              </p>
            </div>

            <p className="site-footer__experience">
              Six years working across US, EU and India time zones.
            </p>

            <div className="site-footer__actions">
              <CtaButton href={`mailto:${CONTACT_EMAIL}`} variant="primary">
                Email me
              </CtaButton>
              <CtaButton href={RESUME_URL} external variant="secondary">
                View resume
              </CtaButton>
            </div>
          </div>

          <aside
            className="site-footer__availability site-footer__availability--desktop"
            aria-label="Availability"
          >
            <Sparkle size={72} className="site-footer__sparkle" />
            <div className="site-footer__status-pill">
              <span className="site-footer__status-dot" aria-hidden>
                ●
              </span>
              <span>Available for work</span>
            </div>
            <p className="site-footer__location">
              Bengaluru, India · IST (UTC+5:30)
            </p>
          </aside>
        </div>

        <hr className="site-footer__divider" />

        <div className="site-footer__details">
          <div className="site-footer__currently">
            <p className="site-footer__details-label">Currently</p>
            <p className="site-footer__currently-title">
              <Link
                href={PLOTTER_AI_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Building Plotter.ai
              </Link>
            </p>
            <p className="site-footer__currently-note">
              Replies within 24h, most days.
            </p>
          </div>

          <div
            className="site-footer__availability site-footer__availability--compact"
            aria-label="Availability"
          >
            <p className="site-footer__status-line">
              <span className="site-footer__status-dot" aria-hidden>
                ●
              </span>
              Available for work
            </p>
            <p className="site-footer__location">
              Bengaluru, India · IST (UTC+5:30)
            </p>
          </div>
        </div>

        <div className="site-footer__meta">
          <p className="site-footer__note">
            Made with experience, a bunch of tools and a lot of caffeine.
          </p>
          <p className="site-footer__copyright">
            © 2026 Rachana Mandal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
