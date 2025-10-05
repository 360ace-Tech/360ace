import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  focus: z.enum(["tech", "food", "both"]),
  message: z.string().min(20),
});

const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 1000 * 60; // 1 minute

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();

  const lastSubmission = recentSubmissions.get(ip);
  if (lastSubmission && now - lastSubmission < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json({ error: "Too many submissions. Please wait a moment." }, { status: 429 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch (error) {
    console.error("Failed to parse contact payload", error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = ContactSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json({ error: "Validation failed", details: result.error.flatten() }, { status: 400 });
  }

  recentSubmissions.set(ip, now);

  // TODO: integrate with email provider (Resend/SendGrid) using environment variables.
  console.log("Contact submission", result.data);

  return NextResponse.json({ ok: true });
}
