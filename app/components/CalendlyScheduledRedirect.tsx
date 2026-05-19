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
    // Prefetch thank-you page immediately so the redirect is instant.
    router.prefetch('/thank-you');

    const onMessage = (e: MessageEvent) => {
      if (!isCalendlyOrigin(e.origin)) return;
      const name = getCalendlyEventName(e.data);
      // Start prefetch even earlier when user picks a time slot.
      if (name === 'calendly.date_and_time_selected') {
        router.prefetch('/thank-you');
        return;
      }
      if (name !== 'calendly.event_scheduled') return;
      // Hard replace — no waiting for JS bundle, instant navigation.
      window.location.replace('/thank-you');
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [router]);

  return null;
}
