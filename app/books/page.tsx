import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/Header';
import BookCategoriesPage from '../components/BookCategoriesPage';
import AwardWinners from '../components/AwardWinners';
import ComingSoon from '../components/ComingSoon';
import { BreadcrumbJsonLd } from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'Books — Browse Our Published Collection | Duck Book Writers',
  description:
    "Browse books published by Duck Book Writers across Mystery & Thriller, Science Fiction, Children's, Health & Fitness, Self-Help, and Business genres. Award-winning titles from talented authors worldwide.",
  alternates: { canonical: 'https://www.duckbookwriters.com/books' },
  openGraph: {
    title: 'Books — Browse Our Published Collection',
    description: "Award-winning books across Mystery, Sci-Fi, Children's, Health, Self-Help & Business genres.",
    url: 'https://www.duckbookwriters.com/books',
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630 }],
  },
};
import Footer from '../components/Footer';

export default function BooksPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'Books', url: '/books' }]} />
      <Header />
      <main>
        <BookCategoriesPage />
        <ComingSoon />
        <AwardWinners />
      </main>
      <Footer />
    </div>
  );
}
