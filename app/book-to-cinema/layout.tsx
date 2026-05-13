import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display } from 'next/font/google';

export const revalidate = 3600;

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Book to Cinema in 14 Days | Duck Book Writers',
  description:
    'Transform your book into a cinematic production — published, distributed and converted to cinema worldwide within 14 days. Duck Book Writers.',
};

export default function BookToCinemaLayout({ children }: { children: ReactNode }) {
  return <div className={playfair.variable}>{children}</div>;
}
