import BookToVideoClientLayout from './BookToVideoClientLayout';

/** Static HTML cached by CDN; revalidate hourly so updates ship without manual deploys. */
export const revalidate = 3600;

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
