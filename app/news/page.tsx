import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/Header';
import NewsEvents from '../components/NewsEvents';
import Footer from '../components/Footer';
import { BreadcrumbJsonLd } from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'News & Events — Publishing Industry Updates | Duck Book Writers',
  description:
    'Stay updated with Duck Book Writers news, author success stories, new book releases, and upcoming literary events and publishing industry conferences.',
  alternates: { canonical: 'https://www.duckbookwriters.com/news' },
  openGraph: {
    title: 'News & Events — Publishing Industry Updates',
    description: 'Latest news, author success stories, new releases & upcoming literary events from Duck Book Writers.',
    url: 'https://www.duckbookwriters.com/news',
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630 }],
  },
};

export default function NewsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'News & Events', url: '/news' }]} />
      <Header />
      <main>
        <h1 className="sr-only">News &amp; Events — Duck Book Writers</h1>
        <NewsEvents />
      </main>
      <Footer />
    </div>
  );
}
