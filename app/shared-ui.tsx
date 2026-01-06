"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Home, Cpu, Utensils, Workflow, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function CustomCursor() {
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

export function GridLines({ visible = true }: { visible?: boolean }) {
  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-0 border-x border-[#E5E2D880] flex justify-between transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div className="h-full w-px bg-[#E5E2D84D] hidden md:block" />
      <div className="h-full w-px bg-[#E5E2D84D]" />
      <div className="h-full w-px bg-[#E5E2D84D] hidden md:block" />
    </div>
  );
}

export function Navbar({ logoRef, visible = true }: { logoRef?: React.RefObject<HTMLSpanElement | null>; visible?: boolean }) {
  const onNavClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const href = (e.currentTarget.getAttribute('href') || '/');
    e.preventDefault();
    try { window.dispatchEvent(new CustomEvent('trigger-transition', { detail: href })); } catch {}
  };
  return (
    <nav className="site-nav fixed top-0 left-0 w-full z-[60] py-6 px-6 md:px-12 pointer-events-none">
      <div className={`w-full flex justify-between items-center pointer-events-auto transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-col">
          <Link href="/" onClick={onNavClick} className="interactive">
            <span data-el="header-logo" ref={logoRef as React.RefObject<HTMLSpanElement>} className="header-logo inline-flex items-center gap-0 align-middle">
              <img src="/logo-dark.png" alt="360ace logo" className="h-8 w-auto select-none" />
              <span className="header-logo-text text-[#1C1917] text-xl leading-none whitespace-nowrap font-bold tracking-tighter">360ace.NET</span>
            </span>
          </Link>
          <span className="ml-8 text-[10px] text-[#8F877B] font-mono tracking-widest uppercase leading-none">CONSULTANCY</span>
        </div>
        <div className="hidden md:flex gap-8">
          <Link href="/tech" onClick={onNavClick} className="interactive text-xs font-mono uppercase tracking-widest text-[#8F877B] hover:text-[#1C1917] transition-colors">Tech</Link>
          <Link href="/food" onClick={onNavClick} className="interactive text-xs font-mono uppercase tracking-widest text-[#8F877B] hover:text-[#1C1917] transition-colors">Food</Link>
          <Link href="/services" onClick={onNavClick} className="interactive text-xs font-mono uppercase tracking-widest text-[#8F877B] hover:text-[#1C1917] transition-colors">ENGAGEMENT</Link>
          <Link href="/contact" onClick={onNavClick} className="interactive text-xs font-mono uppercase tracking-widest text-[#8F877B] hover:text-[#1C1917] transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export function HeaderScrollHide() {
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const down = y > lastY && y > 64;
        document.documentElement.classList.toggle('header-hidden', down);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}

export function Scene({ isLoading = false, onReady }: { isLoading?: boolean; onReady?: () => void }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const meshMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const pointsMatRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xF9F7F2, 0.035);
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const mountEl = mountRef.current;
    mountEl?.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const geo1 = new THREE.TorusKnotGeometry(1.2, 0.4, 120, 20);
    const mat1 = new THREE.MeshBasicMaterial({ color: 0xEAE7DF, wireframe: true, transparent: true, opacity: isLoading ? 0.2 : 0.08 });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    meshMatRef.current = mat1;
    group.add(mesh1);

    const geo2 = new THREE.IcosahedronGeometry(2.5, 2);
    const pos = geo2.attributes.position.array as ArrayLike<number>;
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pos as unknown as number[]), 3));
    const pointsMat = new THREE.PointsMaterial({ size: isLoading ? 0.028 : 0.018, color: isLoading ? 0x7C7264 : 0xE5E2D8 });
    const points = new THREE.Points(pointsGeo, pointsMat);
    pointsMatRef.current = pointsMat;
    group.add(points);

    scene.add(group);
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const tl = gsap.timeline({ scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1.5 } });
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
      if (!notified && onReady) { notified = true; onReady(); }
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
      if (mountEl && renderer.domElement && mountEl.contains(renderer.domElement)) mountEl.removeChild(renderer.domElement);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isLoading, onReady]);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-screen -z-10 pointer-events-none" />;
}

export function SiteFooter() {
  const href = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/360ace/";
  return (
    <footer className="w-full flex items-center justify-between border-t border-[#E5E2D8] py-4 px-6 md:px-12">
      <div className="text-[10px] text-[#8F877B] font-mono tracking-widest">
        © {new Date().getFullYear()} 360ace.NET — All Rights Reserved.
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="interactive text-[#8F877B] hover:text-[#1C1917] transition-colors">
        <Linkedin className="w-5 h-5" />
      </a>
    </footer>
  );
}

export function MobileDock() {
  const onNavClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const href = (e.currentTarget.getAttribute('href') || '/');
    e.preventDefault();
    try { window.dispatchEvent(new CustomEvent('trigger-transition', { detail: href })); } catch {}
  };
  const dockRef = useRef<HTMLDivElement|null>(null);
  useEffect(() => {
    if (!dockRef.current) return;
    const items = dockRef.current.querySelectorAll('.dock-item');
    gsap.fromTo(dockRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
    gsap.from(items, { y: 10, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05, delay: 0.1 });
  }, []);
  const Item = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
    <Link href={href} onClick={onNavClick} className="group relative dock-item inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white text-[#1C1917] shadow-sm border border-[#E5E2D8]">
      {children}
      <span className="pointer-events-none absolute -top-2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono tracking-widest text-[#8F877B] bg-white border border-[#E5E2D8] rounded px-2 py-1">{label}</span>
    </Link>
  );
  return (
    <nav ref={dockRef} className="md:hidden fixed left-1/2 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom,0px)+2rem)] z-[55] px-2 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E5E2D8] shadow-lg">
      <div className="flex items-center gap-2">
        <Item href="/" label="Home"><Home className="w-5 h-5" /></Item>
        <Item href="/tech" label="Tech"><Cpu className="w-5 h-5" /></Item>
        <Item href="/food" label="Food"><Utensils className="w-5 h-5" /></Item>
        <Item href="/services" label="Engage"><Workflow className="w-5 h-5" /></Item>
        <Item href="/contact" label="Contact"><Mail className="w-5 h-5" /></Item>
      </div>
    </nav>
  );
}
