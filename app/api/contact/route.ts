import { NextResponse } from 'next/server';
import { z } from 'zod';

import { isRateLimited } from '@/lib/rate-limit';

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  company: z.string().min(2).max(120),
  practice: z.enum(['tech', 'food', 'both']),
  message: z.string().min(10).max(1500),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const skipRateLimit = process.env.NODE_ENV !== 'production';
  if (!skipRateLimit && isRateLimited(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again shortly.' }, { status: 429 });
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid submission', details: parsed.error.issues },
      { status: 422 },
    );
  }

  // TODO: Integrate email provider such as Resend/SendGrid.
  console.log('Contact submission', parsed.data);

  return NextResponse.json({ ok: true });
}
