'use client';

import { memo, type CSSProperties } from 'react';
import { CALENDLY_LINK } from '../config/constants';

type CalendlyInlineEmbedProps = {
  containerId: string;
  className?: string;
  heightPx?: number;
  heightPxMobile?: number;
  visualScale?: number;
  /** @deprecated no-op, kept for prop compatibility */
  autoResize?: boolean;
  /** @deprecated no-op, kept for prop compatibility */
  maxHeightPx?: number;
  /** @deprecated no-op, kept for prop compatibility */
  bustEmbedCache?: boolean;
};

/**
 * Renders a fixed-height Calendly iframe directly in JSX — no useEffect, no widget.js,
 * no dynamic resize, no scroll manipulation. React.memo prevents any remount.
 */
function CalendlyInlineEmbed({
  containerId,
  className = 'w-full overflow-hidden',
  heightPx = 950,
  visualScale,
}: CalendlyInlineEmbedProps) {
  const src = `${CALENDLY_LINK}?embed_type=Inline&hide_gdpr_banner=1`;

  return (
    <div
      id={containerId}
      className={className}
      style={{
        height: `${heightPx}px`,
        minHeight: `${heightPx}px`,
        overflow: 'hidden',
        overflowAnchor: 'none',
        contain: 'strict',
        ...(visualScale != null && visualScale !== 1
          ? ({ zoom: visualScale } as CSSProperties)
          : {}),
      }}
    >
      <iframe
        src={src}
        title="Schedule a meeting"
        width="100%"
        height={heightPx}
        frameBorder={0}
        scrolling="no"
        tabIndex={-1}
        style={{ display: 'block', border: 'none', overflow: 'hidden' }}
      />
    </div>
  );
}

export default memo(CalendlyInlineEmbed);
