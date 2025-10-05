const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

const ipHits = new Map<string, { count: number; expiresAt: number }>();

export function isRateLimited(identifier: string) {
  const now = Date.now();
  const record = ipHits.get(identifier);
  if (!record || record.expiresAt < now) {
    ipHits.set(identifier, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  record.count += 1;
  ipHits.set(identifier, record);
  return false;
}
