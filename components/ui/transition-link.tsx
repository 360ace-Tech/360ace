import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type TransitionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

// Simple wrapper around Next.js Link
// Transitions are handled by PageWrapper with Framer Motion
export function TransitionLink({ href, children, ...rest }: TransitionLinkProps) {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
