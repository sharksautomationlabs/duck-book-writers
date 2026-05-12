export const CONTACT_EMAIL = 'contact@duckbookwriters.com';
export const CONTACT_PHONE = '+1 (346) 463-7721';
export const COMPANY_NAME = 'Duck Book Writers';
/** Full scheduling URL from Calendly (Share → Add to website, ya browser bar se). Override via Vercel / `.env.local`: `NEXT_PUBLIC_CALENDLY_URL`. */
export const CALENDLY_LINK =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_CALENDLY_URL?.trim()) ||
  'https://calendly.com/meeting-duckbookwriters/30min';

/**
 * Book-to-Video inline Calendly: shrink the whole widget (smaller text/UI) so more of the
 * scheduling flow fits on screen. Tweak 0.78–0.88 if needed.
 */
export const BOOK_TO_VIDEO_CALENDLY_VISUAL_SCALE = 0.82;

/**
 * Shared props for every Calendly embed on Book-to-Video (hero, booking strip, bottom CTA).
 * autoResize: true — each embed listens only to its own iframe's page_height messages (e.source check),
 * so 3 embeds on one page don't interfere. Container grows to exactly match Calendly content height.
 */
export const BOOK_TO_VIDEO_CALENDLY_EMBED_DEFAULTS = {
  heightPx: 900,
  heightPxMobile: 850,
  visualScale: BOOK_TO_VIDEO_CALENDLY_VISUAL_SCALE,
  className: 'w-full overflow-hidden bg-white',
  autoResize: false,
} as const;
