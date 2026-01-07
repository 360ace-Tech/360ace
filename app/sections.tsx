"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Monitor, Smartphone, Box, PenTool } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HeroWord({ text, baseColor, hoverColor }: { text: string; baseColor: string; hoverColor: string }) {
  return (
    <span className={`inline-block mr-[0.25em] ${baseColor} ${hoverColor} transition-colors duration-500 ease-out`}>
      {text.split("").map((char, i) => (
        <span key={i} className="hero-char inline-block">
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero({ ready = true }: { ready?: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.set(".hero-char", { y: 100, opacity: 0, rotateX: -90 });
      gsap.set(".hero-fade", { opacity: 0, y: 20 });
      gsap.to(".hero-char", { y: 0, opacity: 1, rotateX: 0, stagger: 0.045, duration: 1.8, ease: "power4.out", delay: 0.35 });
      gsap.to(".hero-fade", { opacity: 1, y: 0, duration: 1.2, delay: 1.4, stagger: 0.25 });
    }, containerRef);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={containerRef} className="h-screen w-full flex flex-col justify-center px-6 md:px-12 relative overflow-hidden">
      <div className="relative z-10 space-y-2 md:space-y-4 select-none">
        <div className="overflow-hidden">
          <h1 className="text-[13vw] leading-[0.8] font-semibold tracking-tighter uppercase flex flex-wrap">
            <HeroWord text="WE" baseColor="text-[#1C1917]" hoverColor="hover:text-[#8F877B]" />
            <HeroWord text="BUILD" baseColor="text-[#1C1917]" hoverColor="hover:text-[#8F877B]" />
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-[13vw] leading-[0.8] font-semibold tracking-titter uppercase flex flex-wrap">
            <HeroWord text="DIGITAL" baseColor="text-[#D6D0C4]" hoverColor="hover:text-[#7E786E]" />
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-[13vw] leading-[0.8] font-semibold tracking-titter uppercase text-glow flex flex-wrap">
            <HeroWord text="LEGACIES" baseColor="text-[#1C1917]" hoverColor="hover:text-[#8F877B]" />
          </h1>
        </div>
      </div>

      <div className="absolute bottom-12 w-full left-0 px-6 md:px-12 flex flex-col md:flex-row justify-between items-end gap-6 z-20 pointer-events-none">
        <div className="hero-fade max-w-sm">
          <p className="text-sm text-[#7E786E] leading-relaxed font-light">
            <span className="text-[#1C1917] font-medium">360ace.NET</span> crafts high-performance websites and bespoke digital experiences.
          </p>
        </div>
        <div className="hero-fade flex items-center gap-4">
          <div className="w-2 h-2 bg-[#1C1917] rounded-full animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#8F877B]">Scroll to Explore</span>
          <ArrowDown className="text-[#8F877B]" />
        </div>
      </div>
    </section>
  );
}

export function ProjectItem({ title, category, year, index }: { title: string; category: string; year: string; index: number }) {
  return (
    <div className="group interactive relative border-t border-[#E5E2D8] hover:bg-[#E5E2D8] transition-colors duration-500">
      <div className="py-12 md:py-16 px-4 flex flex-col md:flex-row justify-between items-baseline gap-6 relative z-10">
        <div className="flex items-baseline gap-8">
          <span className="text-xs font-mono text-[#C8C2B6] group-hover:text-[#7E786E] transition-colors">0{index + 1}</span>
          <h3 className="text-4xl md:text-6xl text-[#292524] font-medium tracking-titter group-hover:text-[#1C1917] group-hover:translate-x-4 transition-all duration-300">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-6 md:gap-12 opacity-50 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8F877B]">{category}</span>
          <span className="text-xs border border-[#D6D0C4] text-[#7E786E] px-2 py-1 rounded bg-white group-hover:border-[#C8C2B6] transition-colors">{year}</span>
          <ArrowUpRight className="text-[#1C1917] text-xl transform group-hover:rotate-45 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}

export function Projects({ ready = true }: { ready?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const works = [
    { title: "Aerosphere", category: "E-Commerce / 3D", year: "2024" },
    { title: "Krypton Labs", category: "Fintech / Web3", year: "2023" },
    { title: "Mono Architecture", category: "Portfolio / Minimal", year: "2023" },
    { title: "Nexus Health", category: "Corporate / App", year: "2022" },
  ];
  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".project-row");
      rows.forEach((row, i) => {
        gsap.from(row, { opacity: 0, y: 24, duration: 0.6, ease: "power2.out", delay: i * 0.06, immediateRender: false, scrollTrigger: { trigger: row, start: "top 95%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="work" ref={ref} className="py-24 px-6 md:px-12 scroll-mt-32">
      <div className="mb-16 flex items-end justify-between border-b border-[#E5E2D8] pb-6">
        <div>
          <span className="text-[10px] font-mono text-[#8F877B] uppercase tracking-widest block mb-2">Selected Works</span>
          <h2 className="text-3xl text-[#1C1917] font-light tracking-tight">Project Showcase</h2>
        </div>
      </div>
      <div className="flex flex-col">{works.map((work, i) => <div key={i} className="project-row"><ProjectItem {...work} index={i} /></div>)}</div>
    </section>
  );
}

export function ServiceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="interactive border border-[#E5E2D8] p-8 hover:border-[#C8C2B6] hover:bg-[#F0ECE3] transition-all duration-300 group">
      <div className="bg-[#E5E2D8] w-12 h-12 flex items-center justify-center rounded-full mb-6 group-hover:scale-110 transition-transform text-[#1C1917]">
        {icon}
      </div>
      <h3 className="text-xl text-[#1C1917] font-medium mb-4 tracking-tight">{title}</h3>
      <p className="text-sm text-[#7E786E] leading-relaxed group-hover:text-[#292524] transition-colors">{desc}</p>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 relative z-10 scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <span className="text-[10px] font-mono text-[#8F877B] uppercase tracking-widest block mb-4">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl text-[#1C1917] font-semibold tracking-titter mb-8">
            Engineering <br />
            <span className="text-[#D6D0C4]">Perfection</span>
          </h2>
          <p className="text-[#7E786E] font-light leading-relaxed mb-8">
            We don&apos;t just build websites; we construct digital ecosystems.
          </p>
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E5E2D8] border border-[#E5E2D8]">
          <ServiceCard icon={<Monitor className="w-5 h-5" />} title="Web Development" desc="Responsive, high-performance websites built with React, Tailwind, and cutting-edge frameworks." />
          <ServiceCard icon={<Smartphone className="w-5 h-5" />} title="App Development" desc="Native and cross-platform mobile applications that provide seamless user experiences." />
          <ServiceCard icon={<Box className="w-5 h-5" />} title="3D WebGL" desc="Immersive Three.js experiences that add depth and interactivity to your brand story." />
          <ServiceCard icon={<PenTool className="w-5 h-5" />} title="UI/UX Design" desc="Pixel-perfect interfaces designed for conversion, accessibility, and visual impact." />
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="min-h-[80vh] flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 relative overflow-hidden scroll-mt-32">
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-center">
        <span className="text-xs font-mono text-[#8F877B] uppercase tracking-widest mb-6">Start Your Journey</span>
        <h2 className="text-6xl md:text-9xl text-[#1C1917] font-semibold tracking-titter mb-12 hover:scale-105 transition-transform duration-500">
          Let&apos;s Talk
        </h2>
        <a href="mailto:hello@maskokoit.com" className="interactive group relative px-8 py-4 bg-[#1C1917] text-[#F9F7F2] rounded-full font-medium overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <span className="relative z-10 group-hover:text-[#1C1917] transition-colors">Launch Project</span>
          <span className="absolute inset-0 bg-[#F0ECE3] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
        </a>
      </div>

      <footer className="w-full flex flex-col md:flex-row justify-between items-end border-t border-[#E5E2D8] pt-8 gap-4">
        <div>
          <h4 className="text-[#1C1917] font-bold tracking-tight">360ace.NET</h4>
          <p className="text-[10px] text-[#8F877B] font-mono mt-1">© 2024. All Rights Reserved.</p>
        </div>
        <div className="flex gap-6">
          {["Twitter", "Instagram", "LinkedIn", "Github"].map((social) => (
            <a key={social} href="#" className="interactive text-xs text-[#8F877B] hover:text-[#1C1917] transition-colors uppercase font-mono tracking-wider">
              {social}
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}
