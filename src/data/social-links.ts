import type { LucideIcon } from "lucide-react";
import { Download, Instagram, Linkedin, Mail } from "lucide-react";
import type { ExpandingCursorPrompt } from "@/lib/expanding-cursor";

export type SocialLinkId =
  | "linkedin"
  | "instagram"
  | "substack"
  | "mail"
  | "resume";

export interface SocialLink {
  id: SocialLinkId;
  label: string;
  href: string;
  external?: boolean;
  icon?: LucideIcon;
  cursor: ExpandingCursorPrompt;
}

export const RESUME_URL =
  "https://drive.google.com/file/d/11pRdPZdKTFnX9Q06PUfgj922_X8luZ9K/view?usp=drivesdk";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "linkedin",
    label: "Linkedin",
    href: "https://www.linkedin.com/in/rachanamandal/",
    external: true,
    icon: Linkedin,
    cursor: {
      title: "Connect on LinkedIn",
      hint: "Opens in new tab",
    },
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/rachanamandal/",
    external: true,
    icon: Instagram,
    cursor: {
      title: "Follow on Instagram",
      hint: "Opens in new tab",
    },
  },
  {
    id: "substack",
    label: "Substack",
    href: "https://open.substack.com/pub/thelilyput",
    external: true,
    cursor: {
      title: "Read on Substack",
      hint: "Opens in new tab",
    },
  },
  {
    id: "mail",
    label: "Mail",
    href: "mailto:rachanamandal@gmail.com",
    icon: Mail,
    cursor: {
      title: "Send an email",
      hint: "Opens your mail app",
    },
  },
  {
    id: "resume",
    label: "Resume",
    href: RESUME_URL,
    external: true,
    icon: Download,
    cursor: {
      title: "View resume",
      hint: "Opens PDF in new tab",
    },
  },
];
