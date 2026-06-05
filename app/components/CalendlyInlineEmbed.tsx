'use client';

import { useState } from 'react';
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
  const [loaded, setLoaded] = useState(false);

  const embedUrl = calendlyUrl.includes('?')
    ? `${calendlyUrl}&hide_gdpr_banner=1`
    : `${calendlyUrl}?hide_gdpr_banner=1`;

  const minH = heightPxMobile ?? heightPx;

  return (
    <div
      id={containerId}
      className={`w-full relative ${className}`.trim()}
      style={{ minHeight: minH, height: heightPx }}
    >
      {!loaded && (
        <div className="absolute inset-0 z-10 animate-pulse rounded-xl bg-gray-100" aria-hidden />
      )}
      <iframe
        src={embedUrl}
        width="100%"
        frameBorder="0"
        title="Schedule a meeting"
        onLoad={() => setLoaded(true)}
        style={{ minWidth: 320, width: '100%', height: '100%', border: 'none', display: 'block' }}
      />
    </div>
  );
}
