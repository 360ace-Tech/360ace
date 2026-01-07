"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Header is global via layout

gsap.registerPlugin(ScrollTrigger);

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorRef.current || !followerRef.current) return;
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (<>
    <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-[#1C1917] rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2" />
    <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-[#D6D0C4] rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-colors" />
  </>);
}

function GridLines() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 border-x border-[#E5E2D880] flex justify-between">
      <div className="h-full w-px bg-[#E5E2D84D] hidden md:block" />
      <div className="h-full w-px bg-[#E5E2D84D]" />
      <div className="h-full w-px bg-[#E5E2D84D] hidden md:block" />
    </div>
  );
}

// No local Navbar here

// 3D scene removed on work page

function ProjectItem({ title, category, year, index }: { title: string; category: string; year: string; index: number }) {
  return (
    <div className="group interactive relative border-t border-[#E5E2D8] hover:bg-[#E5E2D8] transition-colors duration-500">
      <div className="py-12 md:py-16 px-4 flex flex-col md:flex-row justify-between items-baseline gap-6 relative z-10">
        <div className="flex items-baseline gap-8">
          <span className="text-xs font-mono text-[#C8C2B6] group-hover:text-[#7E786E] transition-colors">0{index + 1}</span>
          <h3 className="text-4xl md:text-6xl text-[#292524] font-medium tracking-tighter group-hover:text-[#1C1917] group-hover:translate-x-4 transition-all duration-300">{title}</h3>
        </div>
        <div className="flex items-center gap-6 md:gap-12 opacity-50 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8F877B]">{category}</span>
          <span className="text-xs border border-[#D6D0C4] text-[#7E786E] px-2 py-1 rounded bg-white group-hover:border-[#C8C2B6] transition-colors">{year}</span>
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const works = [
    { title: "Aerosphere", category: "E-Commerce / 3D", year: "2024" },
    { title: "Krypton Labs", category: "Fintech / Web3", year: "2023" },
    { title: "Mono Architecture", category: "Portfolio / Minimal", year: "2023" },
    { title: "Nexus Health", category: "Corporate / App", year: "2022" },
  ];
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".project-row");
      rows.forEach((row, i) => {
        gsap.from(row, { opacity: 0, y: 24, duration: 0.6, ease: "power2.out", delay: i * 0.06, immediateRender: false, scrollTrigger: { trigger: row, start: "top 95%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full">
      <CustomCursor />
      <GridLines />
      <main className="relative z-10">
        <section ref={ref} className="py-24 px-6 md:px-12 scroll-mt-32">
          <div className="mb-16 flex items-end justify-between border-b border-[#E5E2D8] pb-6">
            <div>
              <span className="text-[10px] font-mono text-[#8F877B] uppercase tracking-widest block mb-2">Selected Works</span>
              <h1 className="text-5xl text-[#1C1917] font-light tracking-tight">Project Showcase</h1>
            </div>
          </div>
          <div className="flex flex-col">{works.map((work, i) => (
            <div key={i} className="project-row"><ProjectItem {...work} index={i} /></div>
          ))}</div>
        </section>
      </main>
    </div>
  );
}
