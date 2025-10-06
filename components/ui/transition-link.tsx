"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
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

export function TransitionLink({ href, children, onClick, ...rest }: TransitionLinkProps) {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    // Only intercept same-origin, app routes without a hash.
    const isInternal = href.startsWith("/") && !href.includes("#");
    const isNewTab = rest.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    if (!isInternal || isNewTab) return;

    // If navigating to the same pathname (e.g., Home from Home or from /#section),
    // skip the view transition and smooth‑scroll to top for a natural anchor feel.
    try {
      const targetPath = new URL(href, window.location.origin).pathname;
      if (targetPath === pathname) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    } catch {}

    e.preventDefault();
    router.push(href, { onTransitionReady: pageAnimation });
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}

function pageAnimation() {
  // Match the example's more noticeable motion
  document.documentElement.animate(
    [
      { opacity: 1, scale: 1, transform: "translateY(0)" },
      { opacity: 0.5, scale: 0.9, transform: "translateY(-100px)" },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      { transform: "translateY(100%)" },
      { transform: "translateY(0)" },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}
