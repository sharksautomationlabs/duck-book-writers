export const CONTACT_EMAIL = 'contact@duckbookwriters.com';
export const CONTACT_PHONE = '+1 (346) 463-7721';
export const COMPANY_NAME = 'Duck Book Writers';
export const COMPANY_ADDRESS = '22023 Rustic Canyon Ln, Richmond TX - 77469, United States';
/** Full scheduling URL from Calendly (Share → Add to website, ya browser bar se). Override via Vercel / `.env.local`: `NEXT_PUBLIC_CALENDLY_URL`. */
export const CALENDLY_LINK =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_CALENDLY_URL?.trim()) ||
  'https://calendly.com/meeting-duckbookwriters/30min';
