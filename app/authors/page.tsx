import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Authors from '../components/Authors';
import Footer from '../components/Footer';
import { BreadcrumbJsonLd, PersonJsonLd } from '../components/JsonLd';

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

const AUTHORS = [
  { name: 'TC Baker', description: 'Fiction author of three books published by Duck Book Writers, now collaborating on a series-style film production.', genre: 'Fiction' },
  { name: 'Dr. Irwin Hudson', description: 'Human Systems Integration Engineer and Science & Technology Manager at US Army DEVCOM; published author and leadership professional.', genre: 'Science & Technology' },
];

export default function AuthorsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'Authors', url: '/authors' }]} />
      <PersonJsonLd people={AUTHORS} />
      <Header />
      <main>
        <Authors />
      </main>
      <Footer />
    </div>
  );
}
