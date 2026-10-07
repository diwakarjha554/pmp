import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white" | "dark";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
};

type LinkProps = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  download?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type NativeProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = LinkProps | NativeProps;

const variants: Record<Variant, string> = {
  primary:
    "shimmer-btn bg-theme text-white shadow-[0_10px_24px_-10px_rgba(10,152,70,0.6)] hover:bg-theme-dark hover:shadow-[0_14px_30px_-10px_rgba(10,152,70,0.7)]",
  secondary:
    "border border-ink/15 bg-white text-ink shadow-sm hover:border-ink hover:bg-ink hover:text-white",
  outline: "border border-theme/40 bg-white text-theme hover:border-theme hover:bg-theme hover:text-white",
  ghost: "text-theme hover:bg-theme/10",
  white: "bg-white text-theme-deep shadow-md hover:bg-mint",
  dark: "bg-ink text-white shadow-md hover:bg-ink-900",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-2",
  md: "h-12 px-6 text-[15px] gap-2.5",
  lg: "h-14 px-8 text-base gap-3",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    iconLeft,
    iconRight,
    fullWidth,
  } = props;

  const classes = cn(
    "group/btn inline-flex items-center justify-center rounded-xl font-semibold tracking-[0.01em] transition-all duration-300 select-none",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {iconLeft && <span className="relative z-10 shrink-0 [&>svg]:size-[1.15em]">{iconLeft}</span>}
      <span className="relative z-10">{children}</span>
      {iconRight && (
        <span className="relative z-10 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5 [&>svg]:size-[1.15em]">
          {iconRight}
        </span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, target, rel, download } = props;
    const external = /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
    if (external || download) {
      return (
        <a
          href={href}
          target={target ?? (external ? "_blank" : undefined)}
          rel={rel ?? (external ? "noopener noreferrer" : undefined)}
          download={download}
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as NativeProps;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, iconLeft: _l, iconRight: _r, fullWidth: _f, ...native } = rest;
  return (
    <button type={type} className={classes} {...native}>
      {content}
    </button>
  );
}
