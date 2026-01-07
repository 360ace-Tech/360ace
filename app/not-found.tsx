"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(numberRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      })
        .from(
          textRef.current?.children || [],
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          buttonsRef.current?.children || [],
          {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
          },
          "-=0.3"
        );

      gsap.to(numberRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-[#F9F7F2] px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 border-x border-[#E5E2D880] flex justify-between">
        <div className="h-full w-px bg-[#E5E2D84D] hidden md:block" />
        <div className="h-full w-px bg-[#E5E2D84D]" />
        <div className="h-full w-px bg-[#E5E2D84D] hidden md:block" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div
          ref={numberRef}
          className="mb-8 text-[clamp(8rem,20vw,16rem)] font-bold leading-none tracking-tighter text-[#1C1917] opacity-10 select-none"
        >
          404
        </div>

        <div ref={textRef} className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-semibold text-[#1C1917] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-[#8F877B] max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#1C1917] text-[#F9F7F2] rounded-full font-medium overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:text-[#1C1917] transition-colors">
              <Home className="w-5 h-5" />
              Back to Home
            </span>
            <span className="absolute inset-0 bg-[#F0ECE3] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-[#1C1917] text-[#1C1917] rounded-full font-medium hover:bg-[#1C1917] hover:text-[#F9F7F2] transition-all"
          >
            <Search className="w-5 h-5" />
            Explore Services
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E5E2D8]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#8F877B] hover:text-[#1C1917] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
