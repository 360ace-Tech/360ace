"use client";

import { useEffect, useRef, useState } from "react";
import { User, Mail, Building2, MessageSquareText, ChevronDown } from "lucide-react";
import gsap from "gsap";
import Script from "next/script";

function CustomCursor(){
  const c=useRef<HTMLDivElement|null>(null),f=useRef<HTMLDivElement|null>(null);
  useEffect(()=>{const fine=window.matchMedia('(pointer: fine)').matches&&window.matchMedia('(hover: hover)').matches;if(!fine)return;const mv=(e:MouseEvent)=>{if(!c.current||!f.current)return;gsap.to(c.current,{x:e.clientX,y:e.clientY,duration:.1});gsap.to(f.current,{x:e.clientX,y:e.clientY,duration:.5,ease:"power2.out"})};addEventListener("mousemove",mv);return()=>removeEventListener("mousemove",mv)},[]);
  return(<><div ref={c} className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-[#1C1917] rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"/><div ref={f} className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-[#D6D0C4] rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2"/></>)}

function GridLines(){return(<div className="fixed inset-0 w-full h-full pointer-events-none z-0 border-x border-[#E5E2D880] flex justify-between"><div className="h-full w-px bg-[#E5E2D84D] hidden md:block"/><div className="h-full w-px bg-[#E5E2D84D]"/><div className="h-full w-px bg-[#E5E2D84D] hidden md:block"/></div>)}

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
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
  const [form, setForm] = useState<FormState>({ firstName: "", lastName: "", email: "", organization: "", category: "Tech", message: "", ts: String(Date.now()), website: "" });
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
    setTimeout(() => { (document.getElementById("firstName") as HTMLInputElement | null)?.focus(); }, 200);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client validations
    const errors: string[] = [];
    if (!form.firstName || form.firstName.trim().length < 2) errors.push("First name must be at least 2 characters");
    if (!form.lastName || form.lastName.trim().length < 2) errors.push("Last name must be at least 2 characters");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.push("Enter a valid email address");
    if (!form.message || form.message.trim().length < 20) errors.push("Message must be at least 20 characters");
    if (errors.length) { setResult({ ok: false, message: errors[0] }); return; }
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, cfToken }) });
      const json = await res.json();
      setResult({ ok: res.ok, message: json.message || (res.ok ? "Sent" : "Failed") });
      if (res.ok) setForm({ firstName: "", lastName: "", email: "", organization: "", category: "Tech", message: "", ts: String(Date.now()), website: "" });
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

          <div ref={collRef} className="mt-10 md:mt-8 max-w-lg sm:max-w-xl mx-auto w-full overflow-hidden" style={{ maxHeight: 0 }}>
            {showForm && (
              <div ref={formWrapRef} id="form" className="border border-[#E5E2D8] bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-h-[60vh] overflow-auto">
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* First Name */}
                  <div className="col-span-1 relative">
                    <input id="firstName" placeholder=" " required value={form.firstName} onChange={(e)=>setForm({...form,firstName:e.target.value})}
                      className="peer w-full text-sm border-2 border-transparent focus:border-[#1C1917] rounded-2xl px-6 pt-5 pb-3 bg-white/80 text-[#1C1917] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C1917]/25 hover:border-[#C8C2B4] hover:bg-white" />
                    <label htmlFor="firstName" className="absolute left-6 top-1/2 -translate-y-1/2 text-[14px] text-[#8F877B] transition-all peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-[#1C1917] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[14px] peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#1C1917]">First name</label>
                    <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C9487] transition-all peer-focus:text-[#1C1917] peer-focus:drop-shadow-[0_0_8px_rgba(28,25,23,0.25)]" />
                  </div>
                  {/* Last Name */}
                  <div className="col-span-1 relative">
                    <input id="lastName" placeholder=" " required value={form.lastName} onChange={(e)=>setForm({...form,lastName:e.target.value})}
                      className="peer w-full text-sm border-2 border-transparent focus:border-[#1C1917] rounded-2xl px-6 pt-5 pb-3 bg-white/80 text-[#1C1917] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C1917]/25 hover:border-[#C8C2B4] hover:bg-white" />
                    <label htmlFor="lastName" className="absolute left-6 top-1/2 -translate-y-1/2 text-[14px] text-[#8F877B] transition-all peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-[#1C1917] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[14px] peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#1C1917]">Last name</label>
                    <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C9487] transition-all peer-focus:text-[#1C1917] peer-focus:drop-shadow-[0_0_8px_rgba(28,25,23,0.25)]" />
                  </div>
                  {/* Email */}
                  <div className="col-span-1 relative">
                    <input id="email" placeholder=" " type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}
                      className="peer w-full text-sm border-2 border-transparent focus:border-[#1C1917] rounded-2xl px-6 pt-5 pb-3 bg-white/80 text-[#1C1917] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C1917]/25 hover:border-[#C8C2B4] hover:bg-white" />
                    <label htmlFor="email" className="absolute left-6 top-1/2 -translate-y-1/2 text-[14px] text-[#8F877B] transition-all peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-[#1C1917] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[14px] peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#1C1917]">Email</label>
                    <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C9487] transition-all peer-focus:text-[#1C1917] peer-focus:drop-shadow-[0_0_8px_rgba(28,25,23,0.25)]" />
                  </div>
                  {/* Organization (optional) */}
                  <div className="col-span-1 relative">
                    <input id="organization" placeholder=" " value={form.organization || ""} onChange={(e)=>setForm({...form,organization:e.target.value})}
                      className="peer w-full text-sm border-2 border-transparent focus:border-[#1C1917] rounded-2xl px-6 pt-5 pb-3 bg-white/80 text-[#1C1917] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C1917]/25 hover:border-[#C8C2B4] hover:bg-white" />
                    <label htmlFor="organization" className="absolute left-6 top-1/2 -translate-y-1/2 text-[14px] text-[#8F877B] transition-all peer-focus:top-3.5 peer-focus:text-xs peer-focus:text-[#1C1917] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[14px] peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#1C1917]">Organization (optional)</label>
                    <Building2 className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C9487] transition-all peer-focus:text-[#1C1917] peer-focus:drop-shadow-[0_0_8px_rgba(28,25,23,0.25)]" />
                  </div>
                  {/* Category */}
                  <div className="col-span-1 relative peer">
                    <label htmlFor="category" className="block text-xs font-mono uppercase tracking-widest text-[#8F877B] mb-2">Category</label>
                    <select id="category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value as FormState["category"]})}
                      className="cursor-pointer appearance-none w-full text-sm border-2 border-transparent focus:border-[#1C1917] rounded-2xl pl-6 pr-10 py-4 bg-white/80 text-[#1C1917] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C1917]/25 hover:border-[#C8C2B4] hover:bg-white">
                      <option>Tech</option>
                      <option>Food</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9C9487] transition-transform peer-focus-within:rotate-180" />
                  </div>
                  {/* Message */}
                  <div className="col-span-1 md:col-span-2 relative">
                    <textarea id="message" placeholder=" " rows={5} minLength={20} required value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})}
                      className="peer w-full text-sm border-2 border-transparent focus:border-[#1C1917] rounded-2xl px-6 pt-7 pb-4 bg-white/80 text-[#1C1917] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C1917]/25 hover:border-[#C8C2B4] hover:bg-white min-h-[140px] md:min-h-[180px]" />
                    <label htmlFor="message" className="absolute left-6 top-6 text-[14px] text-[#8F877B] transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#1C1917] peer-placeholder-shown:top-6 peer-placeholder-shown:text-[14px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#1C1917]">Message</label>
                    <MessageSquareText className="absolute right-5 top-5 w-5 h-5 text-[#9C9487] transition-all peer-focus:text-[#1C1917] peer-focus:drop-shadow-[0_0_8px_rgba(28,25,23,0.25)]" />
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
