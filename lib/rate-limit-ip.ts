import { NextRequest } from 'next/server';

const MAX_SUBMISSIONS_PER_IP = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

type Entry = { count: number; resetAt: number };

function getStore(): Map<string, Entry> {
  const g = globalThis as unknown as { __formRateLimitStore?: Map<string, Entry> };
  if (!g.__formRateLimitStore) {
    g.__formRateLimitStore = new Map();
  }
  return g.__formRateLimitStore;
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim() || 'unknown';
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

/**
 * Returns true if this IP can submit (under limit), false if over limit.
 * If over limit, increments are not applied (caller should return 429).
 */
export function checkIpRateLimit(ip: string): { allowed: boolean; remaining: number } {
  if (ip === 'unknown') {
    // No IP → allow but don't track (dev localhost often has no forwarded IP)
    return { allowed: true, remaining: MAX_SUBMISSIONS_PER_IP };
  }
  const store = getStore();
  const now = Date.now();
  let entry = store.get(ip);
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    store.set(ip, entry);
  }
  if (entry.count >= MAX_SUBMISSIONS_PER_IP) {
    return { allowed: false, remaining: 0 };
  }
  entry.count += 1;
  return { allowed: true, remaining: MAX_SUBMISSIONS_PER_IP - entry.count };
}
