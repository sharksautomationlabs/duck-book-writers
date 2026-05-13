import type { Metadata } from 'next';
import Services from '../components/Services';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BreadcrumbJsonLd } from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'Publishing Services — Ghostwriting, Editing, Marketing & More | Duck Book Writers',
  description:
    "Explore Duck Book Writers' complete publishing services: ghostwriting, professional editing, custom book cover design, publishing, marketing, distribution, printing, and Book-to-Video production for authors.",
  alternates: { canonical: 'https://www.duckbookwriters.com/services' },
  openGraph: {
    title: 'Publishing Services — Ghostwriting, Editing, Marketing & More',
    description: 'Complete publishing services: ghostwriting, editing, book cover design, publishing, marketing & distribution.',
    url: 'https://www.duckbookwriters.com/services',
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]} />
      <Header />
      <Services />
      <Footer />
    </div>
  );
}
