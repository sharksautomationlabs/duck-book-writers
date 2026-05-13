import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import FacebookPixel from "./components/FacebookPixel";
import CalendlyLoaderSuppress from "./components/CalendlyLoaderSuppress";
import TawkTo from "./components/TawkTo";
import "./globals.css";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Duck Book Writers — Book Publishing & Ghostwriting Services',
    template: '%s | Duck Book Writers',
  },
  description:
    'Duck Book Writers is a full-service book publishing house offering ghostwriting, editing, book cover design, self-publishing, global distribution, and Book-to-Video services for authors worldwide.',
  keywords: [
    'book publishing services', 'ghostwriting', 'self publishing', 'book editing',
    'book cover design', 'global book distribution', 'book marketing', 'publishing house',
  ],
  metadataBase: new URL('https://www.duckbookwriters.com'),
  alternates: { canonical: 'https://www.duckbookwriters.com' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Duck Book Writers — Book Publishing & Ghostwriting Services',
    description:
      'Full-service publishing house: ghostwriting, editing, cover design, global distribution & Book-to-Video. Helping authors worldwide since 2018.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.duckbookwriters.com',
    siteName: 'Duck Book Writers',
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630, alt: 'Duck Book Writers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duck Book Writers — Book Publishing & Ghostwriting Services',
    description:
      'Full-service publishing house: ghostwriting, editing, cover design, global distribution & Book-to-Video.',
    images: ['/images/og-cover.jpg'],
  },
  verification: {
    google: 'V6lCmVOzgMoXgXIi9-8lGW7VzBv2WpxHWIyPnXO9wbo',
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
        {/* Google Fonts & external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Calendly: warm DNS/TLS for asset host, booking app, and iframe origin. */}
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="" />
        <link rel="preconnect" href="https://calendly.com" crossOrigin="" />
        <link rel="preconnect" href="https://app.calendly.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://app.calendly.com" />
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        {/* added for calendly     */}
        <FacebookPixel />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <CalendlyLoaderSuppress />
        <TawkTo />
        {children}
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
