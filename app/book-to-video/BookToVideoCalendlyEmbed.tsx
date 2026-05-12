'use client';

import { useEffect, useRef, useState } from 'react';
import CalendlyInlineEmbed from '../components/CalendlyInlineEmbed';
import { BOOK_TO_VIDEO_CALENDLY_EMBED_DEFAULTS } from '../config/constants';

type Props = {
  containerId: string;
  /** When true, mount the iframe immediately. When false, wait for it to scroll near the viewport. */
  eager?: boolean;
};

const FALLBACK_HEIGHT_PX = BOOK_TO_VIDEO_CALENDLY_EMBED_DEFAULTS.heightPx;

/**
 * Book-to-Video: shared inline Calendly. Hero uses eager=true; mid/bottom embeds defer iframe init
 * until they scroll near viewport (IntersectionObserver) so the first load only spawns 1 iframe, not 3.
 */
export default function BookToVideoCalendlyEmbed({ containerId, eager = false }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(eager);

  useEffect(() => {
    if (eager || shouldMount) return;
    const node = wrapperRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldMount(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, shouldMount]);

  return (
    <div
      ref={wrapperRef}
      className="min-w-0 [overflow-anchor:none]"
      style={{ overflowAnchor: 'none', minHeight: FALLBACK_HEIGHT_PX }}
    >
      {shouldMount ? (
        <CalendlyInlineEmbed
          containerId={containerId}
          {...BOOK_TO_VIDEO_CALENDLY_EMBED_DEFAULTS}
        />
      ) : (
        <div
          aria-hidden
          className="flex items-center justify-center bg-white text-sm text-zinc-400"
          style={{ minHeight: FALLBACK_HEIGHT_PX }}
        >
          Loading scheduler…
        </div>
      )}
    </div>
  );
}
