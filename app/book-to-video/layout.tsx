import type { Metadata } from 'next';
import BookToVideoClientLayout from './BookToVideoClientLayout';

/** Static HTML cached by CDN; revalidate hourly so updates ship without manual deploys. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Book to Video — Turn Your Book Into YouTube Content | Duck Book Writers',
  description:
    "Transform your book into viral YouTube content with Duck Book Writers' Book-to-Video service. We offer Cash Cow videos, Long-form content, 2D Animation, and Face Content video production for authors.",
  alternates: { canonical: 'https://www.duckbookwriters.com/book-to-video' },
  openGraph: {
    title: 'Book to Video — Turn Your Book Into YouTube Content',
    description: 'Transform your book into viral YouTube content. Cash Cow, Long-form, 2D Animation & Face Content.',
    url: 'https://www.duckbookwriters.com/book-to-video',
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630 }],
  },
};

export default function BookToVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Fetch widget.js and warm the iframe origin before React hydrates. */}
      <link rel="preload" href="https://assets.calendly.com/assets/external/widget.js" as="script" />
      <link rel="preconnect" href="https://app.calendly.com" crossOrigin="" />
      <BookToVideoClientLayout>{children}</BookToVideoClientLayout>
    </>
  );
}
