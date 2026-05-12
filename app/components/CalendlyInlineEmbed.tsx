'use client';

import { memo, useEffect, useRef, type CSSProperties } from 'react';
import { CALENDLY_LINK } from '../config/constants';

type CalendlyInlineEmbedProps = {
  containerId: string;
  className?: string;
  heightPx?: number;
  heightPxMobile?: number;
  visualScale?: number;
  /** @deprecated no-op */
  autoResize?: boolean;
  /** @deprecated no-op */
  maxHeightPx?: number;
  /** @deprecated no-op */
  bustEmbedCache?: boolean;
};

function CalendlyInlineEmbed({
  containerId,
  className = 'w-full overflow-hidden',
  heightPx = 950,
  visualScale,
}: CalendlyInlineEmbedProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const init = () => {
      if (initialized.current || !innerRef.current || !window.Calendly) return;
      initialized.current = true;
      window.Calendly.initInlineWidget({
        url: `${CALENDLY_LINK}?hide_gdpr_banner=1`,
        parentElement: innerRef.current,
      });
    };

    if (window.Calendly) {
      init();
      return;
    }

    // widget.js uses strategy="afterInteractive" — poll until it's ready
    const iv = setInterval(() => {
      if (window.Calendly) { clearInterval(iv); init(); }
    }, 50);
    const to = setTimeout(() => clearInterval(iv), 8000);
    return () => { clearInterval(iv); clearTimeout(to); };
  }, []);

  const outerStyle: CSSProperties = {
    position: 'relative',
    height: `${heightPx}px`,
    minHeight: `${heightPx}px`,
    overflow: 'hidden',
    overflowAnchor: 'none',
    ...(visualScale != null && visualScale !== 1 ? { zoom: visualScale } : {}),
  };

  return (
    <div id={containerId} className={className} style={outerStyle}>
      {/* widget.js injects its iframe here; outer div clips any height changes */}
      <div
        ref={innerRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default memo(CalendlyInlineEmbed);
