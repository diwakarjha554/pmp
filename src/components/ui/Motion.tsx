"use client";

import { MotionConfig, motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Global motion settings. `reducedMotion="user"` lets Motion honour the OS
 * "reduce motion" preference (transforms are skipped, opacity still fades)
 * without branching in render, which keeps server and client markup identical.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const EASE = [0.19, 1, 0.22, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "span";
  id?: string;
};

/** Fades + slides children in when they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 24,
  x = 0,
  scale = 1,
  once = true,
  as = "div",
  id,
}: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: "-60px 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
  as = "div",
  mount = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
  /** Animate on mount instead of on scroll (hero content). */
  mount?: boolean;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      {...(mount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-60px 0px" } })}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}

/** Gentle lift on hover for cards. */
export function HoverLift({
  children,
  className,
  lift = 6,
  scale = 1,
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
  scale?: number;
}) {
  return (
    <motion.div
      className={cn("h-full", className)}
      whileHover={{ y: -lift, scale }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}

/** Continuous float used for hero imagery. */
export function Float({
  children,
  className,
  amount = 10,
  duration = 6,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amount, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
