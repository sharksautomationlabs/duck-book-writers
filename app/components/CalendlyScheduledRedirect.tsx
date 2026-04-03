'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CALENDLY_ORIGINS = new Set(['https://calendly.com', 'https://app.calendly.com']);

function isCalendlyScheduledMessage(event: MessageEvent): boolean {
  if (!CALENDLY_ORIGINS.has(event.origin)) return false;
  const d = event.data;
  if (d == null || typeof d !== 'object') return false;
  return (d as { event?: string }).event === 'calendly.event_scheduled';
}

/**
 * When an invitee books via embedded Calendly, the iframe posts `calendly.event_scheduled`
 * to the parent window — no Calendly dashboard "redirect URL" required for embeds.
 */
export default function CalendlyScheduledRedirect() {
  const router = useRouter();

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!isCalendlyScheduledMessage(e)) return;
      router.push('/thank-you');
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [router]);

  return null;
}
