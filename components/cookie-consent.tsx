"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

type ConsentLevel = "essential" | "all";

const CONSENT_COOKIE = "site_consent";
const CONSENT_TTL_DAYS = 180;

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax`;
}

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const existing = getCookie(CONSENT_COOKIE);
      if (!existing) {
        // Slight delay to avoid clashing with main reveal
        const t = setTimeout(() => {
          setOpen(true);
          if (wrapRef.current) {
            gsap.fromTo(
              wrapRef.current,
              { y: 24, opacity: 0, scale: 0.98 },
              { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }
            );
          }
        }, 900);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  if (!mounted || !open) return null;

  const saveConsent = (level: ConsentLevel) => {
    try {
      setCookie(CONSENT_COOKIE, level, CONSENT_TTL_DAYS);
      localStorage.setItem("consent_prefs", JSON.stringify({ analytics: level === "all" ? true : analytics }));
      window.dispatchEvent(new CustomEvent("cookie-consent", { detail: { level, analytics: level === "all" ? true : analytics } }));
    } catch {}
    if (wrapRef.current) {
      gsap.to(wrapRef.current, { y: 10, opacity: 0, duration: 0.25, ease: "power2.in" }).then(() => setOpen(false));
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[96] pointer-events-none flex justify-center p-4 md:p-6">
      <div ref={wrapRef} role="dialog" aria-live="polite" aria-label="Cookie consent"
           className="pointer-events-auto w-full max-w-3xl rounded-xl border border-[#E5E2D8] bg-[#F9F7F2]/95 backdrop-blur-md shadow-lg">
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="hidden md:block w-10 h-10 rounded-full bg-[#E5E2D8] flex items-center justify-center text-[#1C1917]">🍪</div>
            <div className="flex-1">
              <h3 className="text-[#1C1917] font-semibold tracking-tight mb-1">We use cookies</h3>
              <p className="text-sm text-[#7E786E] leading-relaxed">
                We use essential cookies to make our site work. We&apos;d also like to set optional analytics cookies to help us improve it. You can accept all, or opt for essential only. See our <Link className="underline text-[#1C1917]" href="/privacy">Privacy Policy</Link> for details.
              </p>
              {expanded && (
                <div className="mt-3 rounded-lg border border-[#E5E2D8] bg-white p-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                    <div>
                      <div className="text-[#1C1917] font-medium">Analytics cookies</div>
                      <div className="text-xs text-[#7E786E]">Helps us understand site usage. Disabled by default.</div>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-end">
            <button onClick={() => setExpanded((s) => !s)}
                    className="interactive px-4 py-2 rounded-md border border-[#E5E2D8] text-[#1C1917] bg-white hover:bg-[#F0ECE3] transition-colors">
              {expanded ? "Hide preferences" : "Manage preferences"}
            </button>
            {expanded && (
              <button onClick={() => saveConsent(analytics ? "all" : "essential")}
                      className="interactive px-4 py-2 rounded-md border border-[#E5E2D8] text-[#1C1917] bg-white hover:bg-[#F0ECE3] transition-colors">
                Save preferences
              </button>
            )}
            <button onClick={() => saveConsent("essential")} className="interactive px-4 py-2 rounded-md border border-[#E5E2D8] text-[#1C1917] bg-white hover:bg-[#F0ECE3] transition-colors">
              Only essential
            </button>
            <button onClick={() => saveConsent("all")} className="interactive px-4 py-2 rounded-md bg-[#1C1917] text-[#F9F7F2] hover:bg-[#2A2624] transition-colors">
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
