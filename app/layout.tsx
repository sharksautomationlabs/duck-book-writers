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
  title: "Duck Book Writers | Publishing House",
  description: "Duck Book Writers is a full-service publishing house serving authors around the globe.",
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
    description: "Duck Book Writers is a full-service publishing house serving authors around the globe.",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Duck Book Writers | Publishing House",
    description: "Duck Book Writers is a full-service publishing house serving authors around the globe.",
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
