"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Script from "next/script";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { ArrowRight } from "lucide-react";
import heroData from "@/content/hero.json";

gsap.registerPlugin(ScrollTrigger);

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches;
    if (!fine) return;
    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current || !followerRef.current) return;
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out" });
    };

    const handleHoverStart = () => {
      if (!followerRef.current || !cursorRef.current) return;
      gsap.to(followerRef.current, { scale: 2.5, backgroundColor: "rgba(41,37,36,0.10)", borderColor: "rgba(214,208,216,1)", duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
    };
    const handleHoverEnd = () => {
      if (!followerRef.current || !cursorRef.current) return;
      gsap.to(followerRef.current, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(214,208,216,1)", duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const observer = new MutationObserver(() => {
      const interactives = document.querySelectorAll<HTMLElement>("a, button, .interactive");
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-[#1C1917] rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2" />
      <div ref={followerRef} className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-[#D6D0C4] rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-colors" />
    </>
  );
}

function Scene({ isLoading, onReady }: { isLoading: boolean; onReady?: () => void }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const meshMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const pointsMatRef = useRef<THREE.PointsMaterial | null>(null);
  const readyCbRef = useRef<typeof onReady>(undefined);

  useEffect(() => { readyCbRef.current = onReady; }, [onReady]);

  useEffect(() => {
    const scene = new THREE.Scene();
    // Cream tone fog to match background
    scene.fog = new THREE.FogExp2(0xF9F7F2, 0.020);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const mountEl = mountRef.current;
    mountEl?.appendChild(renderer.domElement);

    const group = new THREE.Group();

    const geo1 = new THREE.TorusKnotGeometry(1.2, 0.4, 120, 20);
    const mat1 = new THREE.MeshBasicMaterial({ color: 0xDED9CC, wireframe: true, transparent: true, opacity: isLoading ? 0.35 : 0.18 });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    meshMatRef.current = mat1;
    group.add(mesh1);

    const geo2 = new THREE.IcosahedronGeometry(2.5, 2);
    const pos = geo2.attributes.position.array as ArrayLike<number>;
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pos as unknown as number[]), 3));
    const pointsMat = new THREE.PointsMaterial({ size: isLoading ? 0.04 : 0.032, color: isLoading ? 0x8F877B : 0x9C9487 });
    const points = new THREE.Points(pointsGeo, pointsMat);
    pointsMatRef.current = pointsMat;
    group.add(points);

    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const tl = gsap.timeline({
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1.5 },
    });
    tl.to(group.rotation, { x: 0.5, y: 3, duration: 1 })
      .to(group.position, { z: -2, duration: 1 }, "<")
      .to(mesh1.material as THREE.MeshBasicMaterial, { opacity: 0.06, color: 0xF0ECE3, duration: 1 }, "<")
      .to(points.material as THREE.PointsMaterial, { size: 0.035, color: 0xCFC9BD, duration: 1 }, "<");

    let notified = false;
    const animate = () => {
      group.rotation.x += 0.001;
      group.rotation.y += 0.002;
      group.rotation.x += (mouseY - group.rotation.x) * 0.05;
      group.rotation.y += (mouseX - group.rotation.y) * 0.05;
      renderer.render(scene, camera);
      if (!notified && readyCbRef.current) {
        notified = true;
        try { readyCbRef.current(); } catch {}
      }
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mountEl && renderer.domElement && mountEl.contains(renderer.domElement)) {
        mountEl.removeChild(renderer.domElement);
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Smoothly set materials to match preloader look even after loading
  useEffect(() => {
    const mm = meshMatRef.current;
    const pm = pointsMatRef.current;
    if (mm) {
      mm.color.set(0xDED9CC);
      gsap.to(mm, { opacity: 0.35, duration: 0.45, ease: "power2.out" });
    }
    if (pm) {
      pm.color.set(0x8F877B);
      gsap.to(pm, { size: 0.04, duration: 0.45, ease: "power2.out" });
    }
  }, [isLoading]);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none" />;
}

function GridLines({ visible }: { visible: boolean }) {
  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-0 border-x border-[#E5E2D880] flex justify-between transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div className="h-full w-px bg-[#E5E2D84D] hidden md:block" />
      <div className="h-full w-px bg-[#E5E2D84D]" />
      <div className="h-full w-px bg-[#E5E2D84D] hidden md:block" />
    </div>
  );
}

// Navbar moved to global layout

function Preloader({ sceneReady, onDone }: { sceneReady: boolean; onDone: () => void }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLSpanElement | null>(null);
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number | null>(null);

  // Drive progress from 0 -> 90 while waiting, then to 100 when sceneReady
  useEffect(() => {
    let raf = 0;
    const MIN_DURATION = 2200; // slow down gauge a bit more
    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      setProgress((p) => {
        const target = sceneReady && elapsed >= MIN_DURATION ? 100 : 90;
        if (p >= target) return p;
        const delta = Math.max(0.3, (target - p) * 0.03);
        return Math.min(target, p + delta);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sceneReady]);

  // When progress hits 100, wait for fonts, FLIP to header logo, and fade overlay
  useEffect(() => {
    if (progress < 100) return;
    requestAnimationFrame(async () => {
      try {
        const fontsObj = (document as unknown as { fonts?: { ready?: Promise<void> } }).fonts;
        if (fontsObj && fontsObj.ready) {
          await fontsObj.ready.catch(() => {});
        }
      } catch {}
      requestAnimationFrame(() => {
        const headerEl2 = document.querySelector('[data-el="header-logo"]') as HTMLElement | null;
        const from = logoRef.current?.getBoundingClientRect();
        const to = headerEl2?.getBoundingClientRect();
        if (!from || !to || !logoRef.current || !overlayRef.current) {
          onDone();
          return;
        }
        const dx = to.left - from.left;
        const dy = to.top - from.top;
        const scaleX = to.width / from.width || 1;
        const scaleY = to.height / from.height || 1;
        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
        if (headerEl2) headerEl2.style.opacity = '0';
        gsap.set(logoRef.current, { transformOrigin: 'left top', willChange: 'transform' });
        tl.to(logoRef.current, { x: dx, y: dy, scaleX, scaleY, duration: 0.9, force3D: true })
          .to(headerEl2, { opacity: 1, duration: 0.25 }, "-=0.1")
          .add(() => { document.documentElement.classList.remove('preload-hide-header'); })
          .to(overlayRef.current, { opacity: 0, duration: 0.45 }, "-=0.05")
          .add(() => onDone())
          .set(logoRef.current, { opacity: 0 });
      });
    });
  }, [progress, onDone]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-40 flex items-center justify-center bg-transparent pointer-events-auto">
      <span data-el="preloader-logo" ref={logoRef} className="inline-flex items-center gap-0 align-middle">
        <img src="/logo-dark.png" alt="360ace logo" className="h-8 w-auto select-none" />
        <span className="header-logo-text text-[#1C1917] text-xl leading-none whitespace-nowrap font-bold tracking-tighter">360ace.NET</span>
      </span>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-[#E5E2D8]">
        <div className="h-full" style={{ width: `${progress}%`, background: "linear-gradient(to right, #E5E2D8, #000000)" }} />
      </div>
      <div className="absolute bottom-2 right-4 text-sm md:text-lg font-mono text-[#1C1917]">{Math.round(progress)}%</div>
    </div>
  );
}

function HeroWord({ text, baseColor, hoverColor }: { text: string; baseColor: string; hoverColor: string }) {
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

function Hero({ ready }: { ready: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rerunRef = useRef(0);

  const runHero = () => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-char", { y: 100, opacity: 0, rotateX: -90 });
      gsap.set(".hero-fade", { opacity: 0, y: 20 });
      gsap.to(".hero-char", { y: 0, opacity: 1, rotateX: 0, stagger: 0.045, duration: 1.8, ease: "power4.out", delay: 0.35 });
      gsap.to(".hero-fade", { opacity: 1, y: 0, duration: 1.2, delay: 1.4, stagger: 0.25 });
    }, containerRef);
    return () => ctx.revert();
  };

  useLayoutEffect(() => {
    if (!ready) return;
    const cleanup = runHero();
    return () => cleanup();
  }, [ready, rerunRef.current]);

  useEffect(() => {
    const onReveal = () => { rerunRef.current++; runHero(); };
    window.addEventListener('page:revealed', onReveal);
    return () => window.removeEventListener('page:revealed', onReveal);
  }, []);

  const cfg = heroData as unknown as {
    lines: { text: string; base: "dark" | "cream"; hover: "muted" | "creamMuted" }[][];
    bottomCopy?: string;
    ctas?: { label: string; href: string }[];
  };
  const baseMap: Record<string, string> = {
    dark: "text-[#1C1917]",
    cream: "text-[#D6D0C4]",
  };
  const hoverMap: Record<string, string> = {
    muted: "hover:text-[#8F877B]",
    creamMuted: "hover:text-[#7E786E]",
  };

  return (
    <section ref={containerRef} className="min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-112px)] w-full grid grid-rows-[1fr_auto] px-6 md:px-12 pt-24 md:pt-28 pb-10 md:pb-14 relative overflow-hidden">
      <div className="row-start-1 row-end-2 self-center relative z-10 space-y-3 md:space-y-5 select-none max-w-screen-2xl">
        {cfg.lines.map((words, idx) => (
          <div key={idx} className="overflow-hidden">
            <h1 className={`text-[14vw] md:text-[13vw] lg:text-[13vw] xl:text-[13vw] 2xl:text-[13vw] leading-[0.8] font-semibold tracking-tighter uppercase flex flex-wrap lg:flex-nowrap lg:whitespace-nowrap ${idx === 2 ? "text-glow" : ""}`}>
              {words.map((w, i) => (
                <HeroWord key={`${idx}-${i}`} text={w.text} baseColor={baseMap[w.base]} hoverColor={hoverMap[w.hover]} />
              ))}
            </h1>
          </div>
        ))}

        {Array.isArray(cfg.ctas) && cfg.ctas.length > 0 && (
          <div className="pointer-events-auto mt-6 md:mt-8 grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-4">
            {cfg.ctas.map((cta, i) => (
              <a key={i} href={cta.href} target="_blank" rel="noopener noreferrer"
                 className="interactive group relative inline-flex items-center justify-center px-4 py-3 sm:px-7 sm:py-3 bg-[#1C1917] text-[#F9F7F2] rounded-full font-medium overflow-hidden shadow-sm hover:shadow-md transition-shadow text-center text-sm sm:text-base">
                <span className="relative z-10 group-hover:text-[#1C1917] transition-colors whitespace-nowrap">{cta.label}</span>
                <span className="absolute inset-0 bg-[#F0ECE3] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="row-start-2 row-end-3 w-full flex flex-col md:flex-row items-start md:items-end">
        <div className="hero-fade max-w-sm px-0 md:px-0">
          <p className="text-sm text-[#7E786E] leading-relaxed font-light">
            {(() => {
              const brand = "360ace.NET";
              const text = cfg.bottomCopy ?? `${brand} crafts high-performance websites and bespoke digital experiences.`;
              const parts = text.split(brand);
              return parts.map((part, i) => (
                <span key={`bc${i}`}>
                  {part}
                  {i < parts.length - 1 && (<span className="text-[#1C1917] font-medium">{brand}</span>)}
                </span>
              ));
            })()}
          </p>
        </div>
        <a href="/services" className="hero-fade group flex items-center gap-3 pointer-events-auto interactive mt-3 md:mt-0 md:ml-auto md:mr-0">
          <div className="w-2 h-2 bg-[#1C1917] rounded-full animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#8F877B]">Find out More</span>
          <ArrowRight className="text-[#8F877B] transition-transform duration-500 ease-out will-change-transform group-hover:rotate-[360deg]" />
        </a>
      </div>
    </section>
  );
}

/* Removed legacy Projects sample
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
        gsap.from(row, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power2.out",
          delay: i * 0.06,
          immediateRender: false,
          scrollTrigger: { trigger: row, start: "top 95%", once: true },
        });
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
*/

/*
function ServiceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
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

function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 relative z-10 scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <span className="text-[10px] font-mono text-[#8F877B] uppercase tracking-widest block mb-4">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl text-[#1C1917] font-semibold tracking-tighter mb-8">
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
*/

/*
function Contact() {
  return (
    <section id="contact" className="min-h-[80vh] flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 relative overflow-hidden scroll-mt-32">
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-center">
        <span className="text-xs font-mono text-[#8F877B] uppercase tracking-widest mb-6">Start Your Journey</span>
        <h2 className="text-6xl md:text-9xl text-[#1C1917] font-semibold tracking-tighter mb-12 hover:scale-105 transition-transform duration-500">
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
*/

export default function Page() {
  // Start with a deterministic value for SSR to avoid hydration mismatches
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    if (!isLoading && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );
      // Refresh ScrollTrigger so project animations calculate with final layout
      setTimeout(() => ScrollTrigger.refresh(), 50);
    }
  }, [isLoading]);

  // Only run preloader when TTL has expired (default 5 minutes)
  useEffect(() => {
    try {
      const ttl = Number(process.env.NEXT_PUBLIC_PRELOAD_TTL_MS ?? 300000);
      const ts = localStorage.getItem('mk_preloaded_ts');
      const visited = ts && Date.now() - parseInt(ts, 10) <= ttl;
      if (visited) {
        setIsLoading(false);
        document.documentElement.classList.remove('preload-hide-header');
      }
    } catch {}
  }, []);

  return (
    <div className="relative w-full">
      <Script id="hide-header-preload" strategy="beforeInteractive">{`try{var TTL=Number('${process.env.NEXT_PUBLIC_PRELOAD_TTL_MS ?? 300000}');var ts=localStorage.getItem('mk_preloaded_ts');if(!(ts&& (Date.now()-(+ts))<=TTL)){document.documentElement.classList.add('preload-hide-header')}}catch(e){}`}</Script>
      <CustomCursor />
      <GridLines visible={!isLoading} />
      <Scene isLoading={isLoading} onReady={() => setSceneReady(true)} />
      {isLoading && (
        <Preloader sceneReady={sceneReady} onDone={() => { try{ localStorage.setItem('mk_preloaded_ts', String(Date.now())); }catch(_err){}; setIsLoading(false); }} />
      )}
      <main ref={contentRef} className={`relative z-10 transition-opacity duration-500 ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <Hero ready={!isLoading} />
      </main>
    </div>
  );
}
