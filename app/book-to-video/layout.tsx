import { DM_Sans } from 'next/font/google';

/** Avoid long-lived CDN/page cache so book-to-video always matches latest deploy. */
export const dynamic = 'force-dynamic';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function BookToVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={dmSans.className}>{children}</div>;
}
