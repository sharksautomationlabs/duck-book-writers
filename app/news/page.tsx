import React from 'react';
import Header from '../components/Header';
import NewsEvents from '../components/NewsEvents';
import Footer from '../components/Footer';

export default function NewsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <main>
        <NewsEvents />
      </main>
      <Footer />
    </div>
  );
}
