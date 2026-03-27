'use client';

import { useEffect, useRef } from 'react';

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';
const DEFAULT_CALENDLY_URL = 'https://calendly.com/meeting-duckbookwriters/30min';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadCalendlyScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT_SRC}"]`);
    if (existing) {
      if (window.Calendly) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Calendly script failed')));
      return;
    }
    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Calendly script failed'));
    document.body.appendChild(script);
  });

  return scriptPromise;
}

type CalendlyInlineWidgetProps = {
  className?: string;
  minHeight?: number;
  /** Full Calendly scheduling URL */
  calendlyUrl?: string;
};

export default function CalendlyInlineWidget({
  className = '',
  minHeight = 700,
  calendlyUrl = DEFAULT_CALENDLY_URL,
}: CalendlyInlineWidgetProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    let cancelled = false;

    void loadCalendlyScript().then(() => {
      if (cancelled || !parentRef.current) return;
      parentRef.current.innerHTML = '';
      window.Calendly?.initInlineWidget({
        url: calendlyUrl,
        parentElement: parentRef.current,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [calendlyUrl]);

  return (
    <div
      ref={parentRef}
      className={`calendly-inline-widget w-full ${className}`.trim()}
      style={{ minWidth: 320, minHeight: minHeight, height: minHeight }}
    />
  );
}
