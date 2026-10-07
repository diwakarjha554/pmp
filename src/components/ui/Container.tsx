import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
  as?: ElementType;
  id?: string;
};

const sizes = {
  default: "max-w-[1400px]",
  narrow: "max-w-4xl",
  wide: "max-w-[1600px]",
};

export function Container({ children, className, size = "default", as: Tag = "div", id }: Props) {
  return (
    <Tag id={id} className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)}>
      {children}
    </Tag>
  );
}
