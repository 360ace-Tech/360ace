"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import data from "@/content/tech.json";

gsap.registerPlugin(ScrollTrigger);

function ProjectItem({ title, category, index }: { title: string; category: string; index: number }) {
  return (
    <div className="group interactive relative border-t border-[#E5E2D8] hover:bg-[#E5E2D8] transition-colors duration-500">
      <div className="py-8 md:py-12 px-4 flex flex-col md:flex-row justify-between items-baseline gap-6 relative z-10">
        <div className="flex items-baseline gap-8">
          <span className="text-xs font-mono text-[#C8C2B6] group-hover:text-[#7E786E] transition-colors">0{index + 1}</span>
          <h3 className="text-4xl md:text-5xl text-[#292524] font-medium tracking-tighter group-hover:text-[#1C1917] group-hover:translate-x-4 transition-all duration-300">{title}</h3>
        </div>
        <div className="flex items-center gap-6 md:gap-12">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8F877B] opacity-60 group-hover:opacity-100 transition-opacity">{category}</span>
          <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#D6D0C4] bg-white text-[#7E786E]">
            <span className="absolute transition-all duration-300 ease-out group-hover:opacity-0">-</span>
            <span className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:rotate-180">+</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TechPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const items = (data as any).items as { title: string; category: string }[];
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
      <main className="relative z-10">
        <section ref={ref} className="pt-28 md:pt-32 pb-16 px-6 md:px-12 scroll-mt-32">
          <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-[#E5E2D8] pb-6 gap-3">
            <div className="max-w-full">
              <span className="text-[10px] font-mono text-[#8F877B] uppercase tracking-widest block mb-2">TECH</span>
              <h1 className="text-5xl text-[#1C1917] font-light tracking-tight">{(data as any).title ?? "Tech Projects"}</h1>
            </div>
            <a href="https://360ace.tech" target="_blank" rel="noopener noreferrer" className="interactive group flex items-center gap-3 text-[#8F877B] hover:text-[#1C1917] transition-colors text-[10px] font-mono uppercase tracking-widest">
              <div className="w-2 h-2 bg-[#1C1917] rounded-full" />
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
