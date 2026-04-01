'use client';

import { useEffect } from 'react';
import { CALENDLY_LINK } from '../config/constants';

type CalendlyInlineEmbedProps = {
  /** Must be unique per page when multiple embeds exist */
  containerId: string;
  className?: string;
  /** Iframe height in px on larger screens (default 600). */
  heightPx?: number;
  /** Shorter height on narrow viewports to reduce inner scrollbars (falls back to 75% of heightPx if omitted). */
  heightPxMobile?: number;
};

/**
 * Same inline Calendly widget as the homepage (CalendlySection) — uses official widget.js, not a raw iframe.
 */
export default function CalendlyInlineEmbed({
  containerId,
  className = 'w-full min-h-[600px] h-auto overflow-hidden',
  heightPx = 600,
  heightPxMobile,
}: CalendlyInlineEmbedProps) {
  useEffect(() => {
    let resizeHandler: (() => void) | null = null;

    const applyHeights = (widgetElement: HTMLElement, iframe: HTMLIFrameElement | null) => {
      const isNarrow =
        typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;
      const h = isNarrow && heightPxMobile !== undefined ? heightPxMobile : heightPx;
      widgetElement.style.height = `${h}px`;
      widgetElement.style.maxHeight = `${h}px`;
      widgetElement.style.minHeight = `${h}px`;
      widgetElement.style.overflowY = 'auto';
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
            const setHeights = () => {
              const iframeNow = widgetElement.querySelector('iframe') as HTMLIFrameElement | null;
              applyHeights(widgetElement, iframeNow);
            };
            setHeights();
            resizeHandler = () => setHeights();
            window.addEventListener('resize', resizeHandler);
          }, 300);
        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
        }
      }
    };

    if ((window as any).Calendly) {
      setTimeout(initCalendlyWidget, 200);
      return () => {
        if (resizeHandler) window.removeEventListener('resize', resizeHandler);
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
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    };
  }, [containerId, heightPx, heightPxMobile]);

  const initialMinH = heightPxMobile !== undefined ? Math.min(heightPxMobile, heightPx) : heightPx;

  return (
    <div
      id={containerId}
      className={`${className} overflow-hidden max-sm:mx-auto`.trim()}
      style={{ minWidth: '320px', minHeight: initialMinH, maxHeight: heightPx }}
    />
  );
}
