'use client';

import { useEffect, type CSSProperties } from 'react';
import { CALENDLY_LINK } from '../config/constants';

const CALENDLY_ORIGINS = new Set(['https://calendly.com', 'https://app.calendly.com']);

type CalendlyInlineEmbedProps = {
  containerId: string;
  className?: string;
  heightPx?: number;
  heightPxMobile?: number;
  autoResize?: boolean;
  maxHeightPx?: number;
  visualScale?: number;
  bustEmbedCache?: boolean;
};

export default function CalendlyInlineEmbed({
  containerId,
  className = 'w-full overflow-hidden',
  heightPx = 600,
  heightPxMobile,
  autoResize = true,
  maxHeightPx,
  visualScale,
  bustEmbedCache = false,
}: CalendlyInlineEmbedProps) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container || container.hasChildNodes()) return;

    const narrow = window.matchMedia('(max-width:639px)').matches;
    const startH = narrow && heightPxMobile != null ? heightPxMobile : heightPx;

    let src = bustEmbedCache
      ? `${CALENDLY_LINK}${CALENDLY_LINK.includes('?') ? '&' : '?'}_t=${Date.now()}`
      : CALENDLY_LINK;
    const sep = src.includes('?') ? '&' : '?';
    src = `${src}${sep}embed_type=Inline&embed_domain=${encodeURIComponent(window.location.hostname)}`;

    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.style.cssText = `width:100%;height:${startH}px;border:0;display:block;overflow:hidden;`;
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('tabindex', '-1');
    (iframe as any).scrollIntoView = () => {};

    container.style.height = `${startH}px`;
    container.style.minHeight = `${startH}px`;
    container.style.overflow = 'hidden';
    container.appendChild(iframe);

    if (!autoResize) {
      return () => { container.replaceChildren(); };
    }

    let maxH = startH;

    const onMessage = (e: MessageEvent) => {
      if (!CALENDLY_ORIGINS.has(e.origin)) return;
      const data = e.data as { event?: string; payload?: { height?: number } | number };
      if (!data?.event?.includes('page_height')) return;

      // Only handle message from this container's iframe when identifiable.
      const liveIframe = container.querySelector('iframe');
      if (liveIframe?.contentWindow && e.source && e.source !== liveIframe.contentWindow) return;

      const raw = typeof data.payload === 'number' ? data.payload : data.payload?.height;
      const h = typeof raw === 'number' && Number.isFinite(raw) ? raw : NaN;
      if (isNaN(h) || h < 300) return;

      const capped = maxHeightPx ? Math.min(h, maxHeightPx) : h;
      const next = Math.max(capped, maxH);
      if (next === maxH) return;
      maxH = next;

      const savedY = window.scrollY;
      iframe.style.height = `${next}px`;
      container.style.height = `${next}px`;
      container.style.minHeight = `${next}px`;
      requestAnimationFrame(() => {
        if (window.scrollY !== savedY) window.scrollTo({ top: savedY, behavior: 'instant' });
      });
    };

    window.addEventListener('message', onMessage);

    // Focus guard — prevent iframe focus from scrolling the page.
    const onFocus = (ev: FocusEvent) => {
      if (ev.target !== iframe) return;
      const y = window.scrollY;
      requestAnimationFrame(() => {
        if (window.scrollY !== y) window.scrollTo({ top: y, behavior: 'instant' });
      });
    };
    document.addEventListener('focus', onFocus, { capture: true, passive: true });

    return () => {
      window.removeEventListener('message', onMessage);
      document.removeEventListener('focus', onFocus, true);
      container.replaceChildren();
      container.style.cssText = '';
    };
  }, [containerId, heightPx, heightPxMobile, autoResize, maxHeightPx, bustEmbedCache]);

  return (
    <div
      id={containerId}
      suppressHydrationWarning
      className={className}
      style={{
        minHeight: heightPx,
        overflowAnchor: 'none',
        ...(visualScale != null && visualScale !== 1
          ? ({ zoom: visualScale } as CSSProperties)
          : {}),
      }}
    />
  );
}
