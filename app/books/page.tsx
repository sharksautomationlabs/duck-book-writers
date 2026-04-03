import React from 'react';
import Header from '../components/Header';
import BookCategoriesPage from '../components/BookCategoriesPage';
import AwardWinners from '../components/AwardWinners';
import ComingSoon from '../components/ComingSoon';
import Footer from '../components/Footer';

export default function BooksPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
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
