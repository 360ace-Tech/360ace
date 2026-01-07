import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
  firstName: z.string().min(2).max(60),
  lastName: z.string().min(2).max(60),
  organization: z.string().max(120).optional(),
  email: z.string().email(),
  category: z.enum(["Tech", "Food"]),
  message: z.string().min(20).max(5000),
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

    // Optional origin allowlist (more tolerant matching)
    const origin = req.headers.get('origin') || '';
    const referer = req.headers.get('referer') || '';
    const requestOrigin = (() => { try { return new URL(req.url).origin; } catch { return ''; } })();
    const rawAllowed = (process.env.CONTACT_ALLOWED_ORIGINS || process.env.NEXT_PUBLIC_SITE_URL || '')
      .split(',').map(s => s.trim()).filter(Boolean);
    const allowed = [...rawAllowed];
    if (process.env.NODE_ENV !== 'production' && rawAllowed.length) {
      // Include common local dev origins to reduce friction
      allowed.push('http://localhost', 'http://localhost:3000', 'http://127.0.0.1');
    }
    const norm = (s: string) => {
      try { return new URL(s).origin; } catch { return s.replace(/\/$/, ''); }
    };
    const candidates = [origin, referer, requestOrigin].filter(Boolean).map(norm);
    const allowedSet = new Set(allowed.map(norm));
    if (allowedSet.size) {
      const ok = candidates.some(c => {
        // Allow wildcard
        if (allowed.includes('*')) return true;
        for (const a of allowedSet) {
          if (c.startsWith(a)) return true;
        }
        return false;
      });
      if (!ok) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
      }
    }

    // Optional CSRF-style header check
    const expectedXRW = process.env.CONTACT_REQUESTED_WITH;
    if (expectedXRW) {
      const xrw = (req.headers.get('x-requested-with') || '').toLowerCase();
      if (xrw !== expectedXRW.toLowerCase()) {
        // In non-production, do not hard block; surface 400 to hint misconfig
        if (process.env.NODE_ENV !== 'production') {
          return NextResponse.json({ message: 'Bad request (X-Requested-With mismatch)' }, { status: 400 });
        }
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
      }
    }
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
    const publicSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    const cfToken: string | undefined = body && ((body.cfToken as string) || (body["cf-turnstile-response"] as string));
    const requireCaptcha = Boolean(
      turnstileSecret && publicSiteKey && (process.env.TURNSTILE_REQUIRE === '1' || process.env.NODE_ENV === 'production')
    );
    if (requireCaptcha) {
      if (!cfToken) {
        return NextResponse.json({ message: "Captcha required" }, { status: 400 });
      }
      try {
        const form = new URLSearchParams({ secret: turnstileSecret as string, response: cfToken as string });
        const ipStr = String(ip || '').trim();
        if (/^\d+\.\d+\.\d+\.\d+$/.test(ipStr) || /:/.test(ipStr)) {
          form.append('remoteip', ipStr);
        }
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
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Turnstile verify error:', e);
          return NextResponse.json({ message: "Captcha verification error" }, { status: 400 });
        }
        return NextResponse.json({ message: "Captcha failed" }, { status: 400 });
      }
    }

    // Determine mail provider (MailerSend preferred)
    const { MAILERSEND_API_KEY, CONTACT_EMAIL_FROM } = process.env as Record<string, string | undefined>;

    if (!MAILERSEND_API_KEY || !CONTACT_EMAIL_FROM) {
      const missing = [!MAILERSEND_API_KEY ? 'MAILERSEND_API_KEY' : null, !CONTACT_EMAIL_FROM ? 'CONTACT_EMAIL_FROM' : null].filter(Boolean).join(', ');
      const devDetail = process.env.NODE_ENV !== 'production' ? ` Missing: ${missing}` : '';
      return NextResponse.json({ message: `Email is not configured on server.${devDetail}` }, { status: 500 });
    }

    // no SMTP configuration here; using MailerSend REST

    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const org = (data.organization || '').trim();
    const subject = `New ${data.category} inquiry from ${fullName}${org ? ` (${org})` : ''}`;
    const text = `Name: ${fullName}\nEmail: ${data.email}\nCategory: ${data.category}${org ? `\nOrganization: ${org}` : ''}\n---\n${data.message}`;

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://360ace.net').replace(/\/$/, '');
    const brandImgSrc = `${siteUrl}/logo-dark.png`;
    const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background:#f7f6f2; padding:24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e8e5da;overflow:hidden">
        <tr>
          <td style="padding:24px 24px 8px 24px; border-bottom:1px solid #eeeadd;">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td style="vertical-align:middle; padding-right:10px;">
                <img src="${brandImgSrc}" alt="360ace.NET" height="28" style="display:block; height:28px; width:auto; border:0; outline:none; text-decoration:none;" />
              </td>
              <td style="vertical-align:middle;">
                <div style="font-size:16px; color:#1c1917; font-weight:700; letter-spacing:0.02em;">360ace.NET</div>
              </td>
            </tr></table>
            <div style="font-size:12px;color:#7e786e;letter-spacing:0.18em;margin-top:6px;text-transform:uppercase">Contact Inquiry</div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <h1 style="margin:0 0 12px 0; font-size:20px; color:#1c1917;">New ${data.category} inquiry</h1>
            <p style="margin:0 0 16px 0; color:#4a4744;">You received a new message from the contact form.</p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 12px 0;">
              <tr>
                <td style="padding:8px 0;color:#7e786e; width:140px;">Name</td>
                <td style="padding:8px 0;color:#1c1917;"><strong>${fullName}</strong></td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#7e786e;">Email</td>
                <td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#1c1917;">${data.email}</a></td>
              </tr>
              ${org ? `<tr><td style="padding:8px 0;color:#7e786e;">Organization</td><td style="padding:8px 0;color:#1c1917;">${org}</td></tr>` : ''}
              <tr>
                <td style="padding:8px 0;color:#7e786e;">Category</td>
                <td style="padding:8px 0;color:#1c1917;">${data.category}</td>
              </tr>
            </table>
            <div style="background:#fbfaf7;border:1px solid #eeeadd;border-radius:8px;padding:16px;color:#1c1917;white-space:pre-wrap;line-height:1.6;">${escapeHtml(data.message)}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px; border-top:1px solid #eeeadd; color:#9c9487; font-size:12px;">This email was sent from the 360ace.NET contact form.</td>
        </tr>
      </table>
    </div>`;

    // Helper to parse "Name <email@>" or plain email
    const parseAddress = (addr: string): { email: string; name?: string } => {
      const m = addr.match(/^\s*([^<]*)<([^>]+)>\s*$/);
      if (m) { const name = m[1].trim(); const email = m[2].trim(); return { email, name: name || undefined }; }
      return { email: addr.trim() };
    };

    // Resolve recipient by category
    const toEmail = data.category === 'Food' ? 'food@360ace.food' : 'info@360ace.tech';
    if (!MAILERSEND_API_KEY) {
      if (process.env.NODE_ENV !== 'production') {
        return NextResponse.json({ message: 'MailerSend API key not configured' }, { status: 500 });
      }
      return NextResponse.json({ message: 'Email send failed' }, { status: 500 });
    }
    try {
      const { email: fromEmail, name: fromName } = parseAddress(CONTACT_EMAIL_FROM!);
      const msRes = await fetch('https://api.mailersend.com/v1/email', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MAILERSEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: { email: fromEmail, name: fromName },
          to: [{ email: toEmail }],
          subject,
          text,
          html,
          reply_to: { email: data.email },
          settings: { track_clicks: false, track_opens: false },
        }),
      });
      if (!msRes.ok) {
        const body = await msRes.text().catch(() => '');
        if (process.env.NODE_ENV !== 'production') {
          console.error('MailerSend API error:', msRes.status, body);
          return NextResponse.json({ message: `Email send failed (MailerSend): ${msRes.status}` }, { status: 500 });
        }
        return NextResponse.json({ message: 'Email send failed' }, { status: 500 });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      if (process.env.NODE_ENV !== 'production') {
        console.error('MailerSend error:', err);
        return NextResponse.json({ message: `Email send failed (MailerSend): ${msg}` }, { status: 500 });
      }
      return NextResponse.json({ message: 'Email send failed' }, { status: 500 });
    }

    return NextResponse.json({ message: "Message sent. We will be in touch." });
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Contact API error:', e);
      const msg = e instanceof Error ? e.message : 'Unknown error';
      return NextResponse.json({ message: `Unexpected error: ${msg}` }, { status: 500 });
    }
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
export const runtime = 'edge';
