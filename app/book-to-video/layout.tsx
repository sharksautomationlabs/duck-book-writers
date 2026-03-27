import { DM_Sans } from 'next/font/google';

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
