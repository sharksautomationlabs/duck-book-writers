import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Authors from '../components/Authors';
import Footer from '../components/Footer';
import { BreadcrumbJsonLd } from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'Our Authors — Meet the Writers Behind Our Books | Duck Book Writers',
  description:
    "Meet the talented authors published by Duck Book Writers. Discover their stories, published books, and the journeys that brought their manuscripts from concept to print.",
  alternates: { canonical: 'https://www.duckbookwriters.com/authors' },
  openGraph: {
    title: 'Our Authors — Meet the Writers Behind Our Books',
    description: "Meet talented authors whose books we've published. Discover their stories and writing journeys.",
    url: 'https://www.duckbookwriters.com/authors',
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630 }],
  },
};

export default function AuthorsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'Authors', url: '/authors' }]} />
      <Header />
      <main>
        <Authors />
      </main>
      <Footer />
    </div>
  );
}
