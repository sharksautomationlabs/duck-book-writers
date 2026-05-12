'use client';

import { memo } from 'react';
import CalendlyInlineEmbed from '../components/CalendlyInlineEmbed';
import { BOOK_TO_VIDEO_CALENDLY_EMBED_DEFAULTS } from '../config/constants';

type Props = {
  containerId: string;
  /** kept for API compatibility — all embeds mount immediately now */
  eager?: boolean;
};

/**
 * Renders Calendly immediately on mount — no IntersectionObserver, no lazy state.
 * React.memo prevents any remount from parent rerenders.
 */
function BookToVideoCalendlyEmbed({ containerId }: Props) {
  return (
    <CalendlyInlineEmbed
      containerId={containerId}
      {...BOOK_TO_VIDEO_CALENDLY_EMBED_DEFAULTS}
    />
  );
}

export default memo(BookToVideoCalendlyEmbed);
