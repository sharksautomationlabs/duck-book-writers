'use client';

import { useEffect, useRef, useState } from 'react';
import { CALENDLY_LINK } from '../config/constants';

export type CalendlyInlineEmbedProps = {
  containerId: string;
  heightPx?: number;
  heightPxMobile?: number;
  className?: string;
  calendlyUrl?: string;
  /** Accepted for API compatibility */
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
  const widgetRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const embedUrl = calendlyUrl.includes('?')
    ? calendlyUrl
    : `${calendlyUrl}?hide_gdpr_banner=1`;

  const minH = heightPxMobile ?? heightPx;

  useEffect(() => {
    const el = widgetRef.current;
    if (!el) return;
    let cleared = false;

    const tryInit = (): boolean => {
      // If Calendly auto-init (via data-url) already put an iframe here, just mark loaded.
      if (el.querySelector('iframe')) {
        if (!cleared) setLoaded(true);
        return true;
      }
      const Cal = (window as any).Calendly;
      if (!Cal?.initInlineWidget) return false;
      el.innerHTML = '';
      Cal.initInlineWidget({ url: embedUrl, parentElement: el });
      if (!cleared) setLoaded(true);
      return true;
    };

    if (tryInit()) return;

    // Calendly script not yet ready — poll every 100ms (max 10s).
    const iv = setInterval(() => { if (tryInit()) clearInterval(iv); }, 100);
    const to = setTimeout(() => { clearInterval(iv); if (!cleared) setLoaded(true); }, 10000);

    return () => { cleared = true; clearInterval(iv); clearTimeout(to); };
  }, [embedUrl]);

  return (
    <div
      id={containerId}
      className={`w-full relative ${className}`.trim()}
      style={{ minHeight: minH }}
    >
      {!loaded && (
        <div className="absolute inset-0 z-10 animate-pulse rounded-xl bg-gray-100" aria-hidden />
      )}
      {/*
        data-url triggers Calendly auto-init when widget.js scans the DOM.
        initInlineWidget (above) handles the case where the script loaded first.
      */}
      <div
        ref={widgetRef}
        className="calendly-inline-widget w-full"
        data-url={embedUrl}
        style={{ minWidth: 320, minHeight: minH, height: heightPx }}
      />
    </div>
  );
}
