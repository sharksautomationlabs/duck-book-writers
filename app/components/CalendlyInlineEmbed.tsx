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
    const embedUrl = bustEmbedCache
      ? `${CALENDLY_LINK}${CALENDLY_LINK.includes('?') ? '&' : '?'}_t=${Date.now()}`
      : CALENDLY_LINK;

    let msgHandler: ((e: MessageEvent) => void) | null = null;
    let sweepInterval: ReturnType<typeof setInterval> | null = null;
    let sweepStop: ReturnType<typeof setTimeout> | null = null;
    let iframeObserver: MutationObserver | null = null;
    let focusCleanup: (() => void) | null = null;
    let cancelled = false;

    const getFallback = () => {
      const narrow = window.matchMedia('(max-width:639px)').matches;
      return narrow && heightPxMobile != null ? heightPxMobile : heightPx;
    };

    const cleanup = () => {
      cancelled = true;
      if (msgHandler) { window.removeEventListener('message', msgHandler); msgHandler = null; }
      if (sweepInterval !== null) { clearInterval(sweepInterval); sweepInterval = null; }
      if (sweepStop !== null) { clearTimeout(sweepStop); sweepStop = null; }
      if (iframeObserver) { iframeObserver.disconnect(); iframeObserver = null; }
      if (focusCleanup) { focusCleanup(); focusCleanup = null; }
      const el = document.getElementById(containerId);
      if (el) { el.replaceChildren(); el.classList.remove('calendly-embed-host'); }
    };

    const stampIframe = (iframe: HTMLIFrameElement) => {
      iframe.style.width = '100%';
      iframe.style.border = '0';
      iframe.style.overflow = 'hidden';
      iframe.setAttribute('scrolling', 'no');
      if (!iframe.getAttribute('tabindex')) iframe.setAttribute('tabindex', '-1');
      (iframe as any).scrollIntoView = () => {};
    };

    const setHeight = (el: HTMLElement, iframe: HTMLIFrameElement | null, h: number) => {
      const savedY = window.scrollY;
      el.style.height = `${h}px`;
      el.style.minHeight = `${h}px`;
      el.style.overflow = 'hidden';
      if (iframe) {
        iframe.style.height = `${h}px`;
        iframe.style.minHeight = `${h}px`;
        stampIframe(iframe);
      }
      requestAnimationFrame(() => {
        if (window.scrollY !== savedY) window.scrollTo({ top: savedY, behavior: 'instant' });
      });
    };

    const init = () => {
      if (cancelled) return;
      const el = document.getElementById(containerId);
      if (!el || !(window as any).Calendly || el.hasChildNodes()) return;

      el.classList.add('calendly-embed-host');

      // Watch for iframe insertion so we can stamp it immediately.
      iframeObserver = new MutationObserver(() => {
        const iframe = el.querySelector('iframe') as HTMLIFrameElement | null;
        if (iframe) stampIframe(iframe);
      });
      iframeObserver.observe(el, { childList: true, subtree: true });

      // Per-embed focus guard.
      const onFocus = (ev: FocusEvent) => {
        const iframe = el.querySelector('iframe') as HTMLIFrameElement | null;
        if (!iframe || ev.target !== iframe) return;
        const y = window.scrollY;
        requestAnimationFrame(() => {
          if (window.scrollY !== y) window.scrollTo({ top: y, behavior: 'instant' });
        });
      };
      document.addEventListener('focus', onFocus, { capture: true, passive: true });
      focusCleanup = () => document.removeEventListener('focus', onFocus, true);

      // Register page_height handler BEFORE init so the first message isn't missed.
      if (autoResize) {
        msgHandler = (e: MessageEvent) => {
          if (cancelled || !CALENDLY_ORIGINS.has(e.origin)) return;
          const data = e.data as { event?: string; payload?: { height?: number } | number };
          if (!data?.event?.includes('page_height')) return;
          const raw = typeof data.payload === 'number' ? data.payload : data.payload?.height;
          const h = typeof raw === 'number' && Number.isFinite(raw) ? raw : NaN;
          if (isNaN(h) || h < 200) return;
          const iframe = el.querySelector('iframe') as HTMLIFrameElement | null;
          // Drop message if we can confirm it came from a different embed.
          if (iframe?.contentWindow && e.source && e.source !== iframe.contentWindow) return;
          const capped = maxHeightPx ? Math.min(h, maxHeightPx) : h;
          setHeight(el, iframe, capped);
        };
        window.addEventListener('message', msgHandler);
      }

      const savedY = window.scrollY;
      (window as any).Calendly.initInlineWidget({
        url: embedUrl,
        parentElement: el,
        prefill: {},
        utm: {},
        resize: true,
      });
      // Restore scroll in case Calendly's init stole focus.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (Math.abs(window.scrollY - savedY) > 20) {
          window.scrollTo({ top: savedY, behavior: 'instant' });
        }
      }));

      // Fallback height — only applied if no page_height arrived yet.
      setTimeout(() => {
        if (cancelled) return;
        const iframe = el.querySelector('iframe') as HTMLIFrameElement | null;
        if (el.style.height === '' || el.style.height === '0px') {
          setHeight(el, iframe, getFallback());
        } else if (iframe) {
          stampIframe(iframe);
        }
        // Remove stuck spinners.
        const crush = () => el.querySelectorAll('.calendly-spinner,.calendly-loading').forEach(n => n.remove());
        crush();
        sweepInterval = setInterval(() => { if (!cancelled) crush(); }, 800);
        sweepStop = setTimeout(() => { if (sweepInterval) { clearInterval(sweepInterval); sweepInterval = null; } }, 12000);
      }, 100);
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
