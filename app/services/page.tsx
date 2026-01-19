"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PenTool, Search, Wrench, Activity, TrendingUp } from "lucide-react";
import engagement from "@/content/engagement.json";
import impact from "@/content/impact.json";
import { CustomCursor, GridLines } from "../shared-ui";

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({icon,title,desc}:{icon:React.ReactNode,title:string,desc:string}){
  return(
    <div className="interactive bg-white border border-[#E5E2D8] p-6 md:p-8 hover:border-[#C8C2B6] hover:bg-[#F0ECE3] transition-all duration-300 group h-full flex flex-col">
      <div className="bg-[#E5E2D8] w-12 h-12 flex items-center justify-center rounded-full mb-4 md:mb-6 group-hover:scale-110 transition-transform text-[#1C1917] flex-shrink-0">{icon}</div>
      <h3 className="text-lg md:text-xl text-[#1C1917] font-medium mb-2 md:mb-3 tracking-tight">{title}</h3>
      <p className="text-xs md:text-sm text-[#7E786E] leading-relaxed group-hover:text-[#292524] transition-colors flex-grow">{desc}</p>
    </div>
  );
}

// Block reveal only (no character splitting)

const getIcon = (i: number) => {
  const Icon = [Search, PenTool, Wrench, Activity, TrendingUp][i % 5];
  return <Icon className="w-5 h-5" />;
};

type EngagementService = { title: string; desc: string };
type EngagementData = { eyebrow?: string; headline?: string; highlight?: string; intro?: string; services: EngagementService[] };
type ImpactStat = { value: number; suffix?: string; label: string };
type ImpactData = { title?: string; taglineTop?: string; taglineBottom?: string; stats: ImpactStat[]; logos?: string[] };

export default function ServicesPage(){
  const e = engagement as EngagementData;
  const im = impact as ImpactData;
  const services = e.services;
  const stats = im.stats;
  // Text reveals disabled per request
  useEffect(() => {
    // Only keep count-up like index.html behavior; remove card reveals to avoid hidden state.
    gsap.utils.toArray<HTMLElement>(".count-up").forEach((el) => {
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || "";
      const obj = { n: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 95%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            n: target,
            duration: 1.0,
            ease: "power2.out",
            onUpdate: () => { el.textContent = Math.floor(obj.n).toString() + suffix; },
          });
        },
      });
    });
    const onReveal = () => { try { ScrollTrigger.refresh(); } catch {} };
    window.addEventListener('page:revealed', onReveal);
    return () => { window.removeEventListener('page:revealed', onReveal); };
  }, []);

  return(
    <div className="relative w-full"><CustomCursor/><GridLines/>
      <main className="relative z-10">
        <section className="pt-28 md:pt-32 pb-16 px-6 md:px-12 relative z-10 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="eng-reveal text-[10px] font-mono text-[#8F877B] uppercase tracking-widest block mb-3">{e.eyebrow ?? "Our Expertise"}</span>
              <h1 className="eng-reveal text-5xl text-[#1C1917] font-semibold tracking-tighter leading-tight mb-6">
                {e.headline ?? "Engineering"}
                <br/>
                <span className="text-[#D6D0C4]">{e.highlight ?? "Platforma"}</span>
              </h1>
              <p className="eng-reveal text-[#7E786E] font-light leading-relaxed mb-8">{e.intro ?? "We don't just build websites; we construct digital ecosystems."}</p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E2D8] border border-[#E5E2D8]">
              {services.map((s, i)=> (
                <div key={`${s.title}-${i}`} className="min-w-0"><ServiceCard icon={getIcon(i)} title={`${i+1}. ${s.title}`} desc={s.desc} /></div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-12 relative z-10 impact-gradient rounded-xl">
          <div className="mb-6 space-y-1">
            <span className="eng-reveal text-[10px] font-mono text-[#8F877B] uppercase tracking-widest block">{im.title ?? "Trusted impact"}</span>
            <h2 className="eng-reveal text-4xl md:text-5xl text-[#1C1917] font-semibold tracking-tighter leading-tight">
              {im.taglineTop ?? "Delivering measurable change"}
              <br/>
              <span className="text-[#D6D0C4]">{im.taglineBottom ?? "for regulated and growth-focused teams."}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5E2D8] border border-[#E5E2D8] mb-12">
            {stats.map((s, i)=> (
              <div key={i} className="bg-white p-8 hover:bg-[#F0ECE3] transition-colors">
                <div className="clip-text-reveal">
                  <div className="text-4xl md:text-5xl text-[#1C1917] font-semibold tracking-tight count-up" data-target={s.value} data-suffix={s.suffix || ""}>0</div>
                </div>
                <div className="text-sm text-[#7E786E] mt-2">{s.label}</div>
              </div>
            ))}
          </div>
          {Array.isArray(im.logos) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E5E2D8] border border-[#E5E2D8]">
              {im.logos.map((name, i)=> (
                <div key={`${name}-${i}`} className="bg-white p-4 text-center text-xs font-mono uppercase tracking-widest text-[#8F877B]">{name}</div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )}
