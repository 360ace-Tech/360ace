import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Simple in-memory rate limiter per IP
type Entry = { count: number; resetAt: number };
const WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000); // 10 min
const MAX_COUNT = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5);
const bucket = new Map<string, Entry>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const e = bucket.get(ip);
  if (!e || e.resetAt <= now) {
    bucket.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (e.count >= MAX_COUNT) return false;
  e.count += 1;
  return true;
}

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  category: z.enum(["Tech", "Food"]),
  message: z.string().min(10).max(5000),
  ts: z.string(),
  website: z.string().optional(), // honeypot
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json({ message: "Too many requests, please try later." }, { status: 429 });
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid submission" }, { status: 400 });
    }
    const data = parsed.data;

    // Honeypot check
    if ((data.website || "").trim().length > 0) {
      return NextResponse.json({ message: "OK" }); // pretend success for bots
    }

    // Time check: at least 3s after ts and less than 1 hour
    const tsNum = Number(data.ts || 0);
    const delta = Date.now() - tsNum;
    if (!Number.isFinite(tsNum) || delta < 3000 || delta > 60 * 60 * 1000) {
      return NextResponse.json({ message: "Suspicious timing" }, { status: 400 });
    }

    // Optional Cloudflare Turnstile verification
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    const cfToken: string | undefined = body && (body.cfToken as string);
    if (turnstileSecret && cfToken) {
      try {
        const form = new URLSearchParams({ secret: turnstileSecret, response: cfToken, remoteip: ip as string });
        const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: form.toString(),
        });
        const json: unknown = await resp.json();
        const ok = typeof (json as { success?: boolean }).success === 'boolean' ? (json as { success?: boolean }).success : false;
        if (!ok) {
          return NextResponse.json({ message: "Captcha failed" }, { status: 400 });
        }
      } catch {
        // Soft-fail during local dev if network is unavailable
      }
    }

    // Send email via nodemailer
    let nodemailer: unknown;
    try {
      nodemailer = (await import("nodemailer")).default;
    } catch {
      return NextResponse.json({ message: "Email service not available. Please install 'nodemailer' dependency." }, { status: 500 });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_FROM, CONTACT_EMAIL_TO } = process.env as Record<string, string | undefined>;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL_FROM || !CONTACT_EMAIL_TO) {
      return NextResponse.json({ message: "Email is not configured on server." }, { status: 500 });
    }

    const transporter = (nodemailer as { createTransport: (opts: { host: string; port: number; secure: boolean; auth: { user: string; pass: string } }) => { sendMail: (o: { from: string; to: string; subject: string; text: string; replyTo?: string }) => Promise<unknown> } }).createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `New ${data.category} inquiry from ${data.name}`;
    const text = `Name: ${data.name}\nEmail: ${data.email}\nCategory: ${data.category}\nIP: ${ip}\n---\n${data.message}`;

    await transporter.sendMail({
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_EMAIL_TO,
      subject,
      text,
      replyTo: data.email,
    });

    return NextResponse.json({ message: "Message sent. We will be in touch." });
  } catch (e) {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
