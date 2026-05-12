'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function isCalendlyOrigin(origin: string): boolean {
  try {
    const { hostname } = new URL(origin);
    return hostname === 'calendly.com' || hostname.endsWith('.calendly.com');
  } catch {
    return false;
  }
}

function getCalendlyEventName(data: unknown): string | null {
  let obj = data;
  if (typeof obj === 'string') {
    try { obj = JSON.parse(obj); } catch { return null; }
  }
  if (obj == null || typeof obj !== 'object') return null;
  const ev = (obj as Record<string, unknown>).event;
  return typeof ev === 'string' ? ev : null;
}

export default function CalendlyScheduledRedirect() {
  const router = useRouter();

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!isCalendlyOrigin(e.origin)) return;
      if (getCalendlyEventName(e.data) !== 'calendly.event_scheduled') return;
      router.replace('/thank-you');
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [router]);

  return null;
}
