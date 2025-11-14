import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import FacebookPixel from "./components/FacebookPixel";
import TawkTo from "./components/TawkTo";
import "./globals.css";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Duck Book Writers | Publishing House",
  description: "Duck Book Writers is a full-service publishing house based in Richmond, TX, serving authors around the globe.",
  keywords: "publishing, books, authors, writing, publishing house, book writers",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' }
    ],
    apple: '/favicon.ico',
    shortcut: '/favicon.ico'
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Duck Book Writers | Publishing House",
    description: "Duck Book Writers is a full-service publishing house based in Richmond, TX, serving authors around the globe.",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Duck Book Writers | Publishing House",
    description: "Duck Book Writers is a full-service publishing house based in Richmond, TX, serving authors around the globe.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />   
        {/* added for calendly     */}
      </head>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <FacebookPixel />
        <TawkTo />
        {children}
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />   
        {/* added for calendly */}
      </body>
    </html>
  );
}
