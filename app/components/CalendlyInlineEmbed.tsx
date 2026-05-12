'use client';

import { useEffect, useSyncExternalStore, type CSSProperties } from 'react';
import { CALENDLY_LINK } from '../config/constants';

/** Origins Calendly uses for embed postMessage (e.g. page height). */
const CALENDLY_MESSAGE_ORIGINS = new Set(['https://calendly.com', 'https://app.calendly.com']);

type CalendlyInlineEmbedProps = {
  /** Must be unique per page when multiple embeds exist */
  containerId: string;
  className?: string;
  /** Iframe height in px on larger screens (default 600). */
  heightPx?: number;
  /** Shorter height on narrow viewports to reduce inner scrollbars (falls back to 75% of heightPx if omitted). */
  heightPxMobile?: number;
  /**
   * Use Calendly’s resize mode + postMessage height so the full widget fits without an inner scrollbar.
   * Set false only if you need a strictly fixed-height box.
   */
  autoResize?: boolean;
  /** Optional ceiling for auto-resize height (px). Omit for no cap (recommended for full calendar + time list). */
  maxHeightPx?: number;
  /**
   * Slightly shrink the whole widget (iframe content can’t be styled cross-origin).
   * Use ~0.92–0.95 for a smaller “font” feel, e.g. hero column.
   */
  visualScale?: number;
  /** Append a one-time query param so each page load gets a fresh embed (Book-to-Video). */
  bustEmbedCache?: boolean;
};

/**
 * Same inline Calendly widget as the homepage (CalendlySection) — uses official widget.js, not a raw iframe.
 */
export default function CalendlyInlineEmbed({
  containerId,
  className = 'w-full min-h-[600px] h-auto overflow-hidden',
  heightPx = 600,
  heightPxMobile,
  autoResize = true,
  maxHeightPx,
  visualScale,
  bustEmbedCache = false,
}: CalendlyInlineEmbedProps) {
  useEffect(() => {
    const embedUrl = bustEmbedCache
      ? `${CALENDLY_LINK}${CALENDLY_LINK.includes('?') ? '&' : '?'}embed_load=${Date.now()}`
      : CALENDLY_LINK;

    let calendlyMessageHandler: ((e: MessageEvent) => void) | null = null;
    let loaderSweepInterval: number | NodeJS.Timeout | null = null;
    let loaderSweepEndTimer: number | NodeJS.Timeout | null = null;
    let iframeObserver: MutationObserver | null = null;
    let cancelled = false;
    let lastDynamicHeight: number | null = null;

    const cleanupHost = () => {
      cancelled = true;
      if (calendlyMessageHandler) {
        window.removeEventListener('message', calendlyMessageHandler);
        calendlyMessageHandler = null;
      }
      if (loaderSweepInterval !== null) {
        window.clearInterval(loaderSweepInterval);
        loaderSweepInterval = null;
      }
      if (loaderSweepEndTimer !== null) {
        window.clearTimeout(loaderSweepEndTimer);
        loaderSweepEndTimer = null;
      }
      if (iframeObserver) {
        iframeObserver.disconnect();
        iframeObserver = null;
      }
      const el = document.getElementById(containerId);
      if (el) {
        el.replaceChildren();
        el.classList.remove('calendly-book-to-video-host');
      }
    };

    const getFallbackHeight = () => {
      const isNarrow =
        typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;
      return isNarrow && heightPxMobile !== undefined ? heightPxMobile : heightPx;
    };

    const stampIframe = (iframe: HTMLIFrameElement | null) => {
      if (!iframe) return;
      iframe.style.width = '100%';
      iframe.style.border = '0';
      iframe.style.overflow = 'hidden';
      iframe.setAttribute('scrolling', 'no');
      if (iframe.getAttribute('tabindex') !== '-1') iframe.setAttribute('tabindex', '-1');
      // Override scrollIntoView so Calendly's programmatic focus() can't scroll the page.
      (iframe as any).scrollIntoView = () => {};
    };

    /** Start watching the host so the iframe gets focus-blocked the moment Calendly inserts it. */
    const watchForIframe = (widgetElement: HTMLElement) => {
      iframeObserver = new MutationObserver(() => {
        const iframe = widgetElement.querySelector('iframe') as HTMLIFrameElement | null;
        if (iframe) stampIframe(iframe);
      });
      iframeObserver.observe(widgetElement, { childList: true, subtree: true });
    };

    const applyFallbackHeight = (widgetElement: HTMLElement, iframe: HTMLIFrameElement | null) => {
      const h = getFallbackHeight();
      widgetElement.style.minHeight = `${h}px`;
      widgetElement.style.height = `${h}px`;
      widgetElement.style.overflowX = 'hidden';
      widgetElement.style.overflowY = 'hidden';
      if (iframe) {
        iframe.style.height = '100%';
        iframe.style.minHeight = `${h}px`;
        stampIframe(iframe);
      }
    };

    const applyDynamicHeight = (
      widgetElement: HTMLElement,
      iframe: HTMLIFrameElement | null,
      rawHeight: number
    ) => {
      const cap =
        maxHeightPx != null && maxHeightPx > 0 && Number.isFinite(maxHeightPx)
          ? Math.min(rawHeight, maxHeightPx)
          : rawHeight;
      // Floor + only-grow: avoids the “page jumps when embed shrinks 2px” problem.
      const candidate = Math.max(Math.ceil(cap), getFallbackHeight());
      const h = lastDynamicHeight != null ? Math.max(candidate, lastDynamicHeight) : candidate;
      // Skip no-op writes so we don’t trigger layout for nothing.
      if (lastDynamicHeight === h) {
        stampIframe(iframe);
        return;
      }
      lastDynamicHeight = h;
      const savedY = window.scrollY;
      widgetElement.style.minHeight = `${h}px`;
      widgetElement.style.height = `${h}px`;
      widgetElement.style.overflow = 'hidden';
      if (iframe) {
        iframe.style.height = `${h}px`;
        iframe.style.minHeight = `${h}px`;
        stampIframe(iframe);
      }
      // Height change can shift layout and cause unwanted scroll — restore position.
      requestAnimationFrame(() => {
        if (window.scrollY !== savedY) window.scrollTo({ top: savedY, behavior: 'instant' });
      });
    };

    const initCalendlyWidget = () => {
      if (cancelled) return;
      const widgetElement = document.getElementById(containerId);
      if ((window as any).Calendly && widgetElement && !widgetElement.hasChildNodes()) {
        try {
          widgetElement.classList.add('calendly-book-to-video-host');
          watchForIframe(widgetElement);
          const savedScrollY = window.scrollY;
          (window as any).Calendly.initInlineWidget({
            url: embedUrl,
            parentElement: widgetElement,
            prefill: {},
            utm: {},
          });
          // Calendly's init may steal focus and scroll the page — restore position.
          requestAnimationFrame(() => requestAnimationFrame(() => {
            if (Math.abs(window.scrollY - savedScrollY) > 20) {
              window.scrollTo({ top: savedScrollY, behavior: 'instant' });
            }
          }));

          // Register handler immediately so the first page_height message isn't missed.
          if (autoResize) {
            calendlyMessageHandler = (e: MessageEvent) => {
              if (cancelled) return;
              if (!CALENDLY_MESSAGE_ORIGINS.has(e.origin)) return;
              const data = e.data as {
                event?: string;
                payload?: { height?: number } | number;
              };
              const isPageHeight =
                data?.event === 'calendly.page_height' ||
                (typeof data?.event === 'string' && data.event.includes('page_height'));
              if (!isPageHeight) return;
              const p = data.payload;
              const raw = typeof p === 'number' ? p : p?.height;
              const nextH = typeof raw === 'number' && Number.isFinite(raw) ? raw : Number(raw);
              if (!Number.isFinite(nextH) || nextH < 240) return;
              const liveIframe = widgetElement.querySelector('iframe') as HTMLIFrameElement | null;
              if (!liveIframe || e.source !== liveIframe.contentWindow) return;
              applyDynamicHeight(widgetElement, liveIframe, nextH);
            };
            window.addEventListener('message', calendlyMessageHandler);
          }

          setTimeout(() => {
            if (cancelled) return;
            const iframeNow = widgetElement.querySelector('iframe') as HTMLIFrameElement | null;
            // Only apply fallback if page_height hasn't arrived yet — don't override a dynamic height.
            if (lastDynamicHeight === null) {
              applyFallbackHeight(widgetElement, iframeNow);
            } else if (iframeNow) {
              stampIframe(iframeNow);
            }

            const hideStuckCalendlyLoader = () => {
              widgetElement.querySelectorAll('.calendly-spinner, .calendly-loading').forEach((node) => {
                node.remove();
              });
            };
            hideStuckCalendlyLoader();
            loaderSweepInterval = window.setInterval(() => {
              if (cancelled) return;
              hideStuckCalendlyLoader();
            }, 800);
            loaderSweepEndTimer = window.setTimeout(() => {
              if (loaderSweepInterval !== null) {
                window.clearInterval(loaderSweepInterval);
                loaderSweepInterval = null;
              }
              loaderSweepEndTimer = null;
            }, 12000);
          }, 100);
        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
        }
      }
    };

    if ((window as any).Calendly) {
      const startTimer = window.setTimeout(initCalendlyWidget, 50);
      return () => {
        window.clearTimeout(startTimer);
        cleanupHost();
      };
    }

    const checkCalendly = setInterval(() => {
      if ((window as any).Calendly) {
        clearInterval(checkCalendly);
        setTimeout(initCalendlyWidget, 50);
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(checkCalendly);
    }, 10000);

    return () => {
      clearInterval(checkCalendly);
      clearTimeout(timeout);
      cleanupHost();
    };
  }, [
    containerId,
    heightPx,
    heightPxMobile,
    autoResize,
    maxHeightPx,
    visualScale,
    bustEmbedCache,
  ]);

  const narrow = useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined') return () => {};
      const mq = window.matchMedia('(max-width: 639px)');
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => (typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)').matches : false),
    () => false
  );

  const boxHeight =
    narrow && heightPxMobile !== undefined ? heightPxMobile : heightPx;

  return (
    <div
      id={containerId}
      suppressHydrationWarning
      className={`${className} overflow-hidden max-sm:mx-auto`.trim()}
      style={{
        minWidth: 'min(100%, 320px)',
        minHeight: boxHeight,
        overflowAnchor: 'none',
        ...(autoResize
          ? { maxHeight: 'none' }
          : { maxHeight: boxHeight }),
        ...(visualScale != null && visualScale > 0 && visualScale !== 1
          ? ({ zoom: visualScale } as CSSProperties)
          : {}),
      }}
    />
  );
}
