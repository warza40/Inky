import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CtaButtonVariant = "primary" | "secondary" | "ghost";

type CtaButtonBaseProps = {
  variant?: CtaButtonVariant;
  iconOnly?: boolean;
  className?: string;
  children?: ReactNode;
};

type CtaButtonAsButton = CtaButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type CtaButtonAsLink = CtaButtonBaseProps & {
  href: string;
  external?: boolean;
  disabled?: boolean;
};

export type CtaButtonProps = CtaButtonAsButton | CtaButtonAsLink;

const variantClass: Record<CtaButtonVariant, string> = {
  primary: "cta-button--primary",
  secondary: "cta-button--secondary",
  ghost: "cta-button--ghost",
};

export function CtaButton({
  variant = "primary",
  iconOnly = false,
  className,
  children,
  ...rest
}: CtaButtonProps) {
  const classes = cn(
    "cta-button",
    variantClass[variant],
    iconOnly && "cta-button--icon-only",
    className,
  );

  if ("href" in rest && rest.href) {
    const { href, external, disabled, ...linkRest } = rest as CtaButtonAsLink;

    if (disabled) {
      return (
        <span
          className={cn(classes, "cta-button--disabled")}
          aria-disabled="true"
        >
          {children}
        </span>
      );
    }

    if (external || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...linkRest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const {
    disabled,
    type = "button",
    ...buttonRest
  } = rest as CtaButtonAsButton;

  return (
    <button type={type} className={classes} disabled={disabled} {...buttonRest}>
      {children}
    </button>
  );
}
