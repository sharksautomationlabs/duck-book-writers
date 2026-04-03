'use client';

import { useEffect } from 'react';

const STYLE_ID = 'duck-calendly-spinner-override';

/**
 * Calendly's widget.css uses .calendly-spinner (3 grey dots, top:50%) with z-index quirks;
 * it often stays visible on live sites. This appends a late stylesheet + watches DOM.
 */
export default function CalendlyLoaderSuppress() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = STYLE_ID;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
html body .calendly-spinner,
html body .calendly-spinner > div,
html body .calendly-bounce1,
html body .calendly-bounce2,
html body .calendly-bounce3 {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  width: 0 !important;
  height: 0 !important;
  max-width: 0 !important;
  max-height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  animation: none !important;
  transform: none !important;
  pointer-events: none !important;
  overflow: hidden !important;
  clip-path: inset(100%) !important;
}
`;

    const crush = () => {
      document.querySelectorAll('.calendly-spinner').forEach((node) => {
        node.remove();
      });
    };

    crush();
    const observer = new MutationObserver(crush);
    observer.observe(document.body, { childList: true, subtree: true });

    const rapid = window.setInterval(crush, 300);
    const stopRapid = window.setTimeout(() => window.clearInterval(rapid), 45000);

    return () => {
      observer.disconnect();
      window.clearInterval(rapid);
      window.clearTimeout(stopRapid);
    };
  }, []);

  return null;
}
