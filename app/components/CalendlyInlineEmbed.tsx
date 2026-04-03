'use client';

import { useEffect, useSyncExternalStore, type CSSProperties } from 'react';
import { CALENDLY_LINK } from '../config/constants';

type CalendlyInlineEmbedProps = {
  /** Must be unique per page when multiple embeds exist */
  containerId: string;
  className?: string;
  /** Iframe height in px on larger screens (default 600). */
  heightPx?: number;
  /** Shorter height on narrow viewports to reduce inner scrollbars (falls back to 75% of heightPx if omitted). */
  heightPxMobile?: number;
  /**
   * Slightly shrink the whole widget (iframe content can’t be styled cross-origin).
   * Use ~0.92–0.95 for a smaller “font” feel, e.g. hero column.
   */
  visualScale?: number;
};

/**
 * Same inline Calendly widget as the homepage (CalendlySection) — uses official widget.js, not a raw iframe.
 */
export default function CalendlyInlineEmbed({
  containerId,
  className = 'w-full min-h-[600px] h-auto overflow-hidden',
  heightPx = 600,
  heightPxMobile,
  visualScale,
}: CalendlyInlineEmbedProps) {
  useEffect(() => {
    let resizeHandler: (() => void) | null = null;
    let loaderSweepInterval: number | NodeJS.Timeout | null = null;
    let loaderSweepEndTimer: number | NodeJS.Timeout | null = null;
    let cancelled = false;

    const cleanupHost = () => {
      cancelled = true;
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
        resizeHandler = null;
      }
      if (loaderSweepInterval !== null) {
        window.clearInterval(loaderSweepInterval);
        loaderSweepInterval = null;
      }
      if (loaderSweepEndTimer !== null) {
        window.clearTimeout(loaderSweepEndTimer);
        loaderSweepEndTimer = null;
      }
      const el = document.getElementById(containerId);
      if (el) {
        el.replaceChildren();
        el.classList.remove('calendly-book-to-video-host');
      }
    };

    const applyHeights = (widgetElement: HTMLElement, iframe: HTMLIFrameElement | null) => {
      const isNarrow =
        typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;
      const h = isNarrow && heightPxMobile !== undefined ? heightPxMobile : heightPx;
      widgetElement.style.height = `${h}px`;
      widgetElement.style.maxHeight = `${h}px`;
      widgetElement.style.minHeight = `${h}px`;
      widgetElement.style.overflowY = 'hidden';
      widgetElement.style.overflowX = 'hidden';
      if (iframe) {
        iframe.style.height = '100%';
        iframe.style.maxHeight = 'none';
        iframe.style.minHeight = `${h}px`;
        iframe.style.width = '100%';
        iframe.style.border = '0';
      }
    };

    const initCalendlyWidget = () => {
      if (cancelled) return;
      const widgetElement = document.getElementById(containerId);
      if ((window as any).Calendly && widgetElement && !widgetElement.hasChildNodes()) {
        try {
          widgetElement.classList.add('calendly-book-to-video-host');
          (window as any).Calendly.initInlineWidget({
            url: CALENDLY_LINK,
            parentElement: widgetElement,
            prefill: {},
            utm: {},
          });

          setTimeout(() => {
            if (cancelled) return;
            const setHeights = () => {
              const iframeNow = widgetElement.querySelector('iframe') as HTMLIFrameElement | null;
              applyHeights(widgetElement, iframeNow);
            };
            setHeights();
            resizeHandler = () => setHeights();
            window.addEventListener('resize', resizeHandler);

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
          }, 300);
        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
        }
      }
    };

    if ((window as any).Calendly) {
      const startTimer = window.setTimeout(initCalendlyWidget, 200);
      return () => {
        window.clearTimeout(startTimer);
        cleanupHost();
      };
    }

    const checkCalendly = setInterval(() => {
      if ((window as any).Calendly) {
        clearInterval(checkCalendly);
        setTimeout(initCalendlyWidget, 200);
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
  }, [containerId, heightPx, heightPxMobile]);

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
        maxHeight: boxHeight,
        ...(visualScale != null && visualScale > 0 && visualScale !== 1
          ? ({ zoom: visualScale } as CSSProperties)
          : {}),
      }}
    />
  );
}
