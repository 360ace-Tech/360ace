"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import Logo from "./site-logo";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoOverlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);
  const [startWrite, setStartWrite] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const revealPage = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.display = 'grid';
    gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });
    gsap.to(blocksRef.current, {
      scaleX: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "right",
      onComplete: () => {
        isTransitioning.current = false;
        if (overlayRef.current) overlayRef.current.style.display = 'none';
        if (logoOverlayRef.current) logoOverlayRef.current.style.display = 'none';
        try {
          window.dispatchEvent(new CustomEvent('page:revealed'));
          requestAnimationFrame(() => { window.dispatchEvent(new Event('resize')); window.dispatchEvent(new Event('scroll')); });
        } catch {}
      },
    });
  }, []);

  const coverPage = useCallback((url: string) => {
    if (overlayRef.current) overlayRef.current.style.display = "grid";
    if (logoOverlayRef.current) logoOverlayRef.current.style.display = "grid";
    if (blocksRef.current.length) { gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" }); }
    gsap.set(logoOverlayRef.current, { opacity: 0 });
    const TRANSITION_TEXT = "360ace Technologies";
    const CHAR_DELAY = 0.08; const WRITE_DUR = 0.2; const FILL_DUR = 0.12;
    const count = TRANSITION_TEXT.length; const totalWrite = (count - 1) * CHAR_DELAY + WRITE_DUR + FILL_DUR;
    setStartWrite(false);
    const tl = gsap.timeline({ onComplete: () => router.push(url) });
    tl.to(blocksRef.current, { scaleX: 1, duration: 0.4, stagger: 0.02, ease: "power2.out", transformOrigin: "left" })
      .set(logoOverlayRef.current, { opacity: 1 })
      .add(() => setStartWrite(true))
      .to({}, { duration: totalWrite })
      .to(logoOverlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" });
  }, [router]);

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = "";
      blocksRef.current = [];
      for (let i = 0; i < 20; i++) {
        const block = document.createElement("div");
        block.className = "block";
        overlayRef.current.appendChild(block);
        blocksRef.current.push(block);
      }
      gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });
    };

    createBlocks();

    if (logoRef.current) {
      const path = logoRef.current.querySelector("path");
      if (path) {
        const length = (path as SVGPathElement).getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: "transparent",
        });
      }
    }

    // Skip initial reveal if preloader will run (TTL not satisfied)
    const ttl = Number(process.env.NEXT_PUBLIC_PRELOAD_TTL_MS ?? 300000);
    let shouldReveal = true;
    try {
      const ts = localStorage.getItem('mk_preloaded_ts');
      shouldReveal = !!(ts && Date.now() - parseInt(ts, 10) <= ttl);
    } catch {}

    if (shouldReveal) {
      revealPage();
    } else {
      if (overlayRef.current) overlayRef.current.style.display = 'none';
      if (logoOverlayRef.current) logoOverlayRef.current.style.display = 'none';
    }

    // Global capture-phase click interception for all internal links (reliable for Next <Link>)
    const onDocClick: EventListener = (ev) => {
      const e = ev as MouseEvent;
      const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
      if (isModified) return;
      const t = e.target as Element | null;
      const a = t?.closest('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const hrefAttr = a.getAttribute('href') || '';
      if (!hrefAttr || hrefAttr.startsWith('#') || a.target === '_blank' || a.hasAttribute('download')) return;
      const abs = a.href || hrefAttr;
      let urlPath = '';
      try { urlPath = new URL(abs, window.location.href).pathname; } catch { urlPath = hrefAttr; }
      if (!urlPath.startsWith('/')) return;
      const norm = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);
      if (norm(urlPath) !== norm(pathname || '')) {
        e.preventDefault();
        if (!isTransitioning.current) {
          isTransitioning.current = true;
          coverPage(urlPath);
        }
      }
    };
    const onKeyDown: EventListener = (ev) => {
      const e = ev as KeyboardEvent;
      if (e.key !== 'Enter') return;
      const t = e.target as Element | null;
      const a = t?.closest('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const abs = a.href || a.getAttribute('href') || '';
      let urlPath = '';
      try { urlPath = new URL(abs, window.location.href).pathname; } catch { urlPath = abs; }
      if (!urlPath.startsWith('/')) return;
      const norm = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);
      if (norm(urlPath) !== norm(pathname || '')) {
        e.preventDefault();
        if (!isTransitioning.current) { isTransitioning.current = true; coverPage(urlPath); }
      }
    };
    document.addEventListener('click', onDocClick, { capture: true });
    document.addEventListener('mousedown', onDocClick, { capture: true });
    document.addEventListener('pointerdown', onDocClick, { capture: true });
    document.addEventListener('touchstart', onDocClick, { capture: true });
    document.addEventListener('keydown', onKeyDown, { capture: true });

    // Programmatic trigger from Navbar (fallback if link interception is blocked)
    const onTrigger = (ev: Event) => {
      try {
        const ce = ev as CustomEvent<string>;
        const url = ce.detail;
        if (!url || isTransitioning.current) return;
        isTransitioning.current = true;
        coverPage(url);
      } catch {}
    };
    window.addEventListener('trigger-transition', onTrigger as EventListener, { capture: true });
    return () => {
      document.removeEventListener('click', onDocClick as EventListener, { capture: true } as EventListenerOptions);
      document.removeEventListener('mousedown', onDocClick as EventListener, { capture: true } as EventListenerOptions);
      document.removeEventListener('pointerdown', onDocClick as EventListener, { capture: true } as EventListenerOptions);
      document.removeEventListener('touchstart', onDocClick as EventListener, { capture: true } as EventListenerOptions);
      document.removeEventListener('keydown', onKeyDown as EventListener, { capture: true } as EventListenerOptions);
      window.removeEventListener('trigger-transition', onTrigger as EventListener, { capture: true } as EventListenerOptions);
    };
  }, [pathname, coverPage, revealPage]);

  // When route changes (after push), reveal
  useEffect(() => {
    if (isTransitioning.current) {
      revealPage();
    }
  }, [pathname, revealPage]);

  // no special queries needed for CSS-driven handwriting

  return (
    <>
      <div ref={overlayRef} className="transition-overlay" />
      <div ref={logoOverlayRef} className="logo-overlay">
        <div className="logo-container">
          <Logo ref={logoRef} text="360ace Technologies" start={startWrite} />
        </div>
      </div>
      {children}
    </>
  );
}
