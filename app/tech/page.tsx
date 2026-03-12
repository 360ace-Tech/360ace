"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import data from "@/content/tech.json";
import { CustomCursor, GridLines } from "../shared-ui";

gsap.registerPlugin(ScrollTrigger);

function ProjectItem({ title, category, index }: { title: string; category: string; index: number }) {
  return (
    <div className="group interactive relative border-t border-[#E5E2D8] hover:bg-[#E5E2D8] transition-colors duration-500">
      <div className="py-6 md:py-8 px-4 flex flex-col md:flex-row justify-between items-baseline gap-4 relative z-10">
        <div className="flex items-baseline gap-6">
          <span className="text-xs font-mono text-[#C8C2B6] group-hover:text-[#7E786E] transition-colors">0{index + 1}</span>
          <h3 className="text-3xl md:text-4xl text-[#292524] font-medium tracking-tighter group-hover:text-[#1C1917] group-hover:translate-x-4 transition-all duration-300">{title}</h3>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8F877B] opacity-60 group-hover:opacity-100 transition-opacity">{category}</span>
          <span className="relative inline-flex items-center justify-center w-6 h-6 rounded-full border border-[#D6D0C4] bg-white text-[#7E786E] text-sm">
            <span className="absolute transition-all duration-300 ease-out group-hover:opacity-0">-</span>
            <span className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:rotate-180">+</span>
          </span>
        </div>
      </div>
    </div>
  );
}

type TechItem = { title: string; category: string };
type TechData = { title?: string; items: TechItem[] };

export default function TechPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const items = (data as TechData).items;
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".project-row");
      // Set initial state immediately to prevent flash of unstyled content
      gsap.set(rows, { opacity: 1, y: 0 });
      rows.forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: i * 0.06, scrollTrigger: { trigger: row, start: "top 95%", once: true } }
        );
      });
      // On direct page loads ScrollTrigger never receives a scroll/resize event
      // so it doesn't know items are already in the viewport. Force a refresh.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full">
      <CustomCursor />
      <GridLines />
      <main className="relative z-10">
        <section ref={ref} className="pt-28 md:pt-32 pb-16 px-6 md:px-12 scroll-mt-32">
          <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-[#E5E2D8] pb-6 gap-3">
            <div className="max-w-full">
              <span className="text-[10px] font-mono text-[#8F877B] uppercase tracking-widest block mb-2">TECH</span>
              <h1 className="text-5xl text-[#1C1917] font-light tracking-tight">{(data as TechData).title ?? "Tech Projects"}</h1>
            </div>
            <a href="https://360ace.tech" target="_blank" rel="noopener noreferrer" className="interactive group flex items-center gap-3 text-[#1C1917] hover:text-[#8F877B] transition-colors text-xs font-semibold uppercase tracking-widest">
              <div className="w-2 h-2 bg-[#1C1917] rounded-full animate-pulse" />
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out will-change-transform group-hover:rotate-[360deg]" />
            </a>
          </div>
          <div className="flex flex-col">{items.map((work, i) => (
            <div key={i} className="project-row"><ProjectItem title={work.title} category={work.category} index={i} /></div>
          ))}</div>
        </section>
      </main>
    </div>
  );
}
