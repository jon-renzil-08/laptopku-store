import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
};

export default function FadeIn({ children, className = "" }: FadeInProps) {
  return <div className={`reveal-section ${className}`}>{children}</div>;
}
