'use client';

import { useEffect, useRef, useState } from 'react';
import { CALENDLY_LINK } from '../config/constants';

const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css';
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js';

let scriptPromise: Promise<void> | null = null;

function loadCalendlyScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if ((window as any).Calendly) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_JS}"]`);
    if (existing) {
      if ((window as any).Calendly) { resolve(); return; }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Calendly failed')));
      return;
    }
    const script = document.createElement('script');
    script.src = CALENDLY_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Calendly failed'));
    document.body.appendChild(script);
  });

  return scriptPromise;
}

function loadCalendlyCSS() {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`link[href="${CALENDLY_CSS}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = CALENDLY_CSS;
  document.head.appendChild(link);
}

function initCalendly(el: HTMLElement, url: string) {
  el.innerHTML = '';
  (window as any).Calendly?.initInlineWidget({ url, parentElement: el });
}

export type CalendlyInlineEmbedProps = {
  containerId: string;
  heightPx?: number;
  heightPxMobile?: number;
  className?: string;
  calendlyUrl?: string;
  /** Accepted for API compatibility — not applied */
  visualScale?: number;
  /** Accepted for API compatibility */
  autoResize?: boolean;
};

export default function CalendlyInlineEmbed({
  containerId,
  heightPx = 700,
  heightPxMobile,
  className = '',
  calendlyUrl = CALENDLY_LINK,
}: CalendlyInlineEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let done = false;

    const run = () => {
      if (done) return;
      done = true;
      loadCalendlyCSS();
      void loadCalendlyScript().then(() => {
        if (!containerRef.current) return;
        initCalendly(containerRef.current, calendlyUrl);
        setLoaded(true);
      });
    };

    // Lazy: fire when near viewport. Fallback after 2.5s in case observer misses.
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { observer.disconnect(); clearTimeout(fallback); run(); } },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    const fallback = setTimeout(() => { observer.disconnect(); run(); }, 2500);

    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [calendlyUrl]);

  const minH = heightPxMobile ?? heightPx;

  return (
    <div
      id={containerId}
      className={`w-full relative ${className}`.trim()}
      style={{ minHeight: minH }}
    >
      {/* Gray skeleton shown until Calendly loads */}
      {!loaded && (
        <div className="absolute inset-0 z-10 animate-pulse rounded-xl bg-gray-100" aria-hidden />
      )}
      {/*
        calendly-inline-widget class is required by Calendly's widget.css.
        height must be set (not just minHeight) so Calendly renders the full UI.
        This div is always in DOM so initInlineWidget gets real pixel dimensions.
      */}
      <div
        ref={containerRef}
        className="calendly-inline-widget w-full"
        style={{ minWidth: 320, minHeight: minH, height: heightPx }}
      />
    </div>
  );
}
