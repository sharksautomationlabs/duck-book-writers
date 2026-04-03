import BookToVideoClientLayout from './BookToVideoClientLayout';

/** Fresh HTML on each request — avoids CDN / stale shell showing wrong header or old Calendly scripts on live. */
export const dynamic = 'force-dynamic';

export default function BookToVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BookToVideoClientLayout>{children}</BookToVideoClientLayout>;
}
