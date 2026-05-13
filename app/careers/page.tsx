import type { Metadata } from 'next';
import Careers from '../components/Careers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BreadcrumbJsonLd } from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'Careers — Join the Duck Book Writers Team',
  description:
    'Join the Duck Book Writers team in Richmond, TX. Explore career opportunities in book publishing, editing, marketing, graphic design, and video production. Help authors bring their stories to life.',
  alternates: { canonical: 'https://www.duckbookwriters.com/careers' },
  openGraph: {
    title: 'Careers — Join the Duck Book Writers Team',
    description: 'Explore career opportunities in publishing, editing, marketing, design & video production.',
    url: 'https://www.duckbookwriters.com/careers',
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630 }],
  },
};

export default function CareersPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers' }]} />
      <Header />
      <Careers />
      <Footer />
    </div>
  );
}
