import React from 'react';
import Header from '../components/Header';
import Authors from '../components/Authors';
import Footer from '../components/Footer';

export default function AuthorsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <main>
        <Authors />
      </main>
      <Footer />
    </div>
  );
}
