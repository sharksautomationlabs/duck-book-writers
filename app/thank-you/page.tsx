import type { Metadata } from 'next';
import ThankYouPageClient from './ThankYouPageClient';

export const metadata: Metadata = {
  title: 'Meeting booked | Duck Book Writers',
  description: 'Your consultation is scheduled. Next steps, FAQs, and what to expect before your call.',
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return <ThankYouPageClient />;
}
