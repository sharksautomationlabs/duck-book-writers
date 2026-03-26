'use client';

import { useEffect } from 'react';
import { CALENDLY_LINK } from '../config/constants';

type CalendlyInlineEmbedProps = {
  /** Must be unique per page when multiple embeds exist */
  containerId: string;
  className?: string;
  /** Iframe height in px (taller = less in-widget scrolling). Default 700. */
  heightPx?: number;
};

/**
 * Same inline Calendly widget as the homepage (CalendlySection) — uses official widget.js, not a raw iframe.
 */
export default function CalendlyInlineEmbed({
  containerId,
  className = 'w-full min-h-[700px] h-auto overflow-hidden',
  heightPx = 700,
}: CalendlyInlineEmbedProps) {
  useEffect(() => {
    let resizeHandler: (() => void) | null = null;

    const initCalendlyWidget = () => {
      const widgetElement = document.getElementById(containerId);
      if ((window as any).Calendly && widgetElement && !widgetElement.hasChildNodes()) {
        try {
          (window as any).Calendly.initInlineWidget({
            url: CALENDLY_LINK,
            parentElement: widgetElement,
            prefill: {},
            utm: {},
          });

          setTimeout(() => {
            const iframe = widgetElement.querySelector('iframe') as HTMLIFrameElement | null;
            const setHeights = () => {
              const h = heightPx;
              widgetElement.style.height = `${h}px`;
              if (iframe) {
                iframe.style.height = '100%';
                iframe.style.minHeight = `${h}px`;
                iframe.style.width = '100%';
                iframe.style.border = '0';
                iframe.style.overflow = 'hidden';
              }
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
  }, [containerId, heightPx]);

  return (
    <div
      id={containerId}
      className={className}
      style={{ minWidth: '320px', minHeight: heightPx }}
    />
  );
}
