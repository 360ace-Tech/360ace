"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Script from "next/script";

function CustomCursor(){
  const c=useRef<HTMLDivElement|null>(null),f=useRef<HTMLDivElement|null>(null);
  useEffect(()=>{const fine=window.matchMedia('(pointer: fine)').matches&&window.matchMedia('(hover: hover)').matches;if(!fine)return;const mv=(e:MouseEvent)=>{if(!c.current||!f.current)return;gsap.to(c.current,{x:e.clientX,y:e.clientY,duration:.1});gsap.to(f.current,{x:e.clientX,y:e.clientY,duration:.5,ease:"power2.out"})};addEventListener("mousemove",mv);return()=>removeEventListener("mousemove",mv)},[]);
  return(<><div ref={c} className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-[#1C1917] rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"/><div ref={f} className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-[#D6D0C4] rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2"/></>)}

function GridLines(){return(<div className="fixed inset-0 w-full h-full pointer-events-none z-0 border-x border-[#E5E2D880] flex justify-between"><div className="h-full w-px bg-[#E5E2D84D] hidden md:block"/><div className="h-full w-px bg-[#E5E2D84D]"/><div className="h-full w-px bg-[#E5E2D84D] hidden md:block"/></div>)}

type FormState = {
  name: string;
  email: string;
  category: "Tech" | "Food";
  message: string;
  ts: string;
  website?: string; // honeypot
};

export default function ContactPage(){
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; message: string }>(null);
  const formWrapRef = useRef<HTMLDivElement|null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", category: "Tech", message: "", ts: String(Date.now()), website: "" });
  const [cfToken, setCfToken] = useState<string>("");
  const widgetRef = useRef<HTMLDivElement|null>(null);
  const heroRef = useRef<HTMLDivElement|null>(null);
  const collRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    if (showForm && formWrapRef.current) {
      gsap.fromTo(formWrapRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    }
  }, [showForm]);

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.to(heroRef.current, { y: showForm ? -48 : 0, duration: 0.6, ease: "power2.out" });
    if (collRef.current) {
      gsap.to(collRef.current, { maxHeight: showForm ? "70vh" : 0, duration: 0.6, ease: "power2.out" });
    }
  }, [showForm]);

  const onClickConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForm((s) => !s);
    setResult(null);
    setForm((f) => ({ ...f, ts: String(Date.now()) }));
    setTimeout(() => { (document.getElementById("name") as HTMLInputElement | null)?.focus(); }, 200);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, cfToken }) });
      const json = await res.json();
      setResult({ ok: res.ok, message: json.message || (res.ok ? "Sent" : "Failed") });
      if (res.ok) setForm({ name: "", email: "", category: "Tech", message: "", ts: String(Date.now()), website: "" });
    } catch (err) {
      setResult({ ok: false, message: "Network error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <CustomCursor />
      <GridLines />
      <main className="relative z-10 flex-1 flex">
        <section id="contact" className={`min-h-screen flex flex-col justify-center pt-24 pb-8 px-6 md:px-12 relative overflow-hidden scroll-mt-32 w-full`}>
          <div ref={heroRef} className="relative z-10 flex flex-col items-center text-center will-change-transform">
            <span className="text-xs font-mono text-[#8F877B] uppercase tracking-widest mb-4">Start Your Journey</span>
            <h1 className="text-5xl md:text-7xl text-[#1C1917] font-semibold tracking-tighter mb-8 hover:scale-105 transition-transform duration-500">Let&apos;s Talk</h1>
            <a href="#form" onClick={onClickConnect} className="interactive group relative px-8 py-4 bg-[#1C1917] text-[#F9F7F2] rounded-full font-medium overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <span className="relative z-10 group-hover:text-[#1C1917] transition-colors">Connect with Us</span>
              <span className="absolute inset-0 bg-[#F0ECE3] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </a>
          </div>

          <div ref={collRef} className="mt-10 md:mt-8 max-w-3xl mx-auto w-full overflow-hidden" style={{ maxHeight: 0 }}>
            {showForm && (
              <div ref={formWrapRef} id="form" className="border border-[#E5E2D8] bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 max-h-[60vh] overflow-auto">
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="col-span-1">
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-[#8F877B] mb-2">Name</label>
                    <input id="name" required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full border border-[#E5E2D8] rounded-md px-3 py-2 bg-white text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D6D0C4]" />
                  </div>
                <div className="col-span-1">
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-[#8F877B] mb-2">Email</label>
                  <input id="email" type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="w-full border border-[#E5E2D8] rounded-md px-3 py-2 bg-white text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D6D0C4]" />
                </div>
                <div className="col-span-1">
                  <label htmlFor="category" className="block text-xs font-mono uppercase tracking-widest text-[#8F877B] mb-2">Category</label>
                  <select id="category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value as FormState["category"]})} className="w-full border border-[#E5E2D8] rounded-md px-3 py-2 bg-white text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D6D0C4]">
                    <option>Tech</option>
                    <option>Food</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-[#8F877B] mb-2">Message</label>
                  <textarea id="message" rows={4} required value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} className="w-full border border-[#E5E2D8] rounded-md px-3 py-2 bg-white text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D6D0C4]" />
                </div>
                {/* honeypot and timestamp */}
                <input type="hidden" name="ts" value={form.ts} />
                <div className="hidden" aria-hidden>
                  <label htmlFor="website">Website</label>
                  <input id="website" autoComplete="off" tabIndex={-1} value={form.website} onChange={(e)=>setForm({...form,website:e.target.value})} />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <div ref={widgetRef} className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}></div>
                </div>
                  <div className="col-span-1 md:col-span-2 flex items-center justify-between gap-4 mt-2">
                    <button disabled={submitting} className="interactive px-6 py-3 rounded-md bg-[#1C1917] text-[#F9F7F2] hover:bg-[#2A2624] transition-colors">
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                    {result && (
                      <span className={`text-sm ${result.ok ? "text-green-700" : "text-red-700"}`}>{result.message}</span>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onLoad={() => {
        try {
          type Turnstile = { render: (el: HTMLElement, opts: { sitekey?: string; theme?: 'light'|'dark'; callback?: (token: string) => void }) => void };
          type W = Window & { turnstile?: Turnstile };
          const w = window as W;
          if (widgetRef.current && w && w.turnstile) {
            w.turnstile.render(widgetRef.current, {
              sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
              theme: 'light',
              callback: (token: string) => setCfToken(token),
            });
          }
        } catch {}
      }} />
    </div>
  );
}
