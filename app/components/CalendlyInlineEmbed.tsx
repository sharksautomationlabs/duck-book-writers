'use client';

import { useEffect, type CSSProperties } from 'react';
import { CALENDLY_LINK } from '../config/constants';

type CalendlyInlineEmbedProps = {
  containerId: string;
  className?: string;
  heightPx?: number;
  heightPxMobile?: number;
  visualScale?: number;
  bustEmbedCache?: boolean;
  /** @deprecated — kept for prop compatibility, has no effect */
  autoResize?: boolean;
  /** @deprecated — kept for prop compatibility, has no effect */
  maxHeightPx?: number;
};

export default function CalendlyInlineEmbed({
  containerId,
  className = 'w-full overflow-hidden',
  heightPx = 700,
  heightPxMobile,
  visualScale,
  bustEmbedCache = false,
}: CalendlyInlineEmbedProps) {
  useEffect(() => {
    const embedUrl = bustEmbedCache
      ? `${CALENDLY_LINK}${CALENDLY_LINK.includes('?') ? '&' : '?'}_t=${Date.now()}`
      : CALENDLY_LINK;

    let cancelled = false;
    let observer: MutationObserver | null = null;

    const getH = () => {
      const narrow = window.matchMedia('(max-width:639px)').matches;
      return narrow && heightPxMobile != null ? heightPxMobile : heightPx;
    };

    const cleanup = () => {
      cancelled = true;
      observer?.disconnect();
      observer = null;
      const el = document.getElementById(containerId);
      if (el) {
        el.replaceChildren();
        el.style.height = '';
        el.style.minHeight = '';
      }
    };

    const init = () => {
      if (cancelled) return;
      const el = document.getElementById(containerId);
      if (!el || !(window as any).Calendly || el.hasChildNodes()) return;

      const h = getH();
      el.style.height = `${h}px`;
      el.style.minHeight = `${h}px`;
      el.style.overflow = 'hidden';

      // Stamp iframe the moment Calendly inserts it — prevent any scroll side-effects.
      observer = new MutationObserver(() => {
        const iframe = el.querySelector('iframe') as HTMLIFrameElement | null;
        if (!iframe) return;
        iframe.style.cssText = `width:100%;height:${h}px;min-height:${h}px;border:0;display:block;overflow:hidden;`;
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('tabindex', '-1');
        (iframe as any).scrollIntoView = () => {};
      });
      observer.observe(el, { childList: true, subtree: true });

      try {
        (window as any).Calendly.initInlineWidget({
          url: embedUrl,
          parentElement: el,
          prefill: {},
          utm: {},
          // No resize:true — avoids Calendly refocusing iframes and page-jump side-effects.
        });
      } catch {
        // StrictMode dev runs effects twice; Calendly throws on duplicate init — safe to ignore.
      }
    };

    if ((window as any).Calendly) {
      const t = setTimeout(init, 50);
      return () => { clearTimeout(t); cleanup(); };
    }

    const poll = setInterval(() => {
      if ((window as any).Calendly) { clearInterval(poll); setTimeout(init, 50); }
    }, 100);
    const giveUp = setTimeout(() => clearInterval(poll), 10000);

    return () => { clearInterval(poll); clearTimeout(giveUp); cleanup(); };
  }, [containerId, heightPx, heightPxMobile, bustEmbedCache]);

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
