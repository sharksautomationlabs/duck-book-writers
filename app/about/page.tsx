import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import About from '../components/About';
import Footer from '../components/Footer';
import { BreadcrumbJsonLd } from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'About Us — Our Story & Mission | Duck Book Writers',
  description:
    'Learn about Duck Book Writers — a passionate publishing house in Richmond, TX dedicated to helping authors worldwide bring their stories to life. Meet our team and discover our publishing mission.',
  alternates: { canonical: 'https://www.duckbookwriters.com/about' },
  openGraph: {
    title: 'About Duck Book Writers — Our Story & Mission',
    description: 'A passionate publishing house helping authors bring their stories to life. Meet our team.',
    url: 'https://www.duckbookwriters.com/about',
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'About Us', url: '/about' }]} />
      <main>
        <AboutUs />
        <About />
      </main>
      <Footer />
    </div>
  );
}
