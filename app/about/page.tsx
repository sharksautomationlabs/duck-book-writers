import React from 'react';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import About from '../components/About';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <main>
        <AboutUs />
        <About />
      </main>
      <Footer />
    </div>
  );
}
