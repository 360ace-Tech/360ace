import { NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  practice: z.enum(["tech", "food", "both"]),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = payloadSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    // TODO: integrate with email service or CRM (Resend, SendGrid, HubSpot)

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}
