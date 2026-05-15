import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Book to Cinema in 14 Days | Duck Book Writers',
  description:
    'Transform your book into a cinematic production — published, distributed and converted to cinema worldwide within 14 days. Duck Book Writers.',
};

export default function BookToCinemaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
