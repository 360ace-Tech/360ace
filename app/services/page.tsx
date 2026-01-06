"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PenTool, Search, Wrench, Activity, TrendingUp } from "lucide-react";
import engagement from "@/content/engagement.json";
import impact from "@/content/impact.json";

gsap.registerPlugin(ScrollTrigger);

function CustomCursor(){
  const c=useRef<HTMLDivElement|null>(null), f=useRef<HTMLDivElement|null>(null);
  useEffect(()=>{const fine=window.matchMedia('(pointer: fine)').matches&&window.matchMedia('(hover: hover)').matches;if(!fine)return;const mv=(e:MouseEvent)=>{if(!c.current||!f.current)return;gsap.to(c.current,{x:e.clientX,y:e.clientY,duration:.1});gsap.to(f.current,{x:e.clientX,y:e.clientY,duration:.5,ease:"power2.out"})};window.addEventListener("mousemove",mv);return()=>window.removeEventListener("mousemove",mv)},[]);
  return(<><div ref={c} className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-[#1C1917] rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"/><div ref={f} className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-[#D6D0C4] rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2"/></>)}

function GridLines(){return(<div className="fixed inset-0 w-full h-full pointer-events-none z-0 border-x border-[#E5E2D880] flex justify-between"><div className="h-full w-px bg-[#E5E2D84D] hidden md:block"/><div className="h-full w-px bg-[#E5E2D84D]"/><div className="h-full w-px bg-[#E5E2D84D] hidden md:block"/></div>)}

function ServiceCard({icon,title,desc}:{icon:React.ReactNode,title:string,desc:string}){return(<div className="interactive bg-white border border-[#E5E2D8] p-8 hover:border-[#C8C2B6] hover:bg-[#F0ECE3] transition-all duration-300 group"><div className="bg-[#E5E2D8] w-12 h-12 flex items-center justify-center rounded-full mb-6 group-hover:scale-110 transition-transform text-[#1C1917]">{icon}</div><h3 className="text-xl text-[#1C1917] font-medium mb-3 tracking-tight">{title}</h3><p className="text-xs md:text-sm text-[#7E786E] leading-relaxed group-hover:text-[#292524] transition-colors">{desc}</p></div>)}

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
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5E2D8] border border-[#E5E2D8]">
              {services.map((s, i)=> (
                <div key={`${s.title}-${i}`}><ServiceCard icon={getIcon(i)} title={`${i+1}. ${s.title}`} desc={s.desc} /></div>
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
