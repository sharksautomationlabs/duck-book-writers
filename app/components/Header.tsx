"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import CalendlyWidget from './CalendlyWidget';
import { CALENDLY_LINK } from '../config/constants';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About US' },
  { href: '/books', label: 'Books' },
  { href: '/authors', label: 'Authors' },
  { href: '/services', label: 'Services' },
  { href: '/book-to-video', label: 'Book to Video' },
  { href: '/news', label: 'News & Event' },
  { href: '/careers', label: 'Careers' },
];

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isBookToVideoPage = pathname === '/book-to-video';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  
  return (
    <>
      {isBookToVideoPage ? (
        <header className="sticky top-0 z-50 bg-white/95 pt-4 sm:pt-5 backdrop-blur">
          <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute -top-10 right-[-10%] h-[190px] w-[260px] rounded-full bg-[#FFF4D4] blur-[90px]" />
            <div className="relative bg-gradient-to-r from-[#FFF7DC] via-white to-[#FFE4E4] rounded-2xl sm:rounded-[22px] border border-[#FFE08A] shadow-[0_14px_30px_rgba(0,0,0,0.06)] px-4 sm:px-6 py-3 sm:py-3.5">
              <div className="flex items-center justify-between gap-4">
                {/* Left: Logo + brand */}
                <Link href="/" passHref className="flex shrink-0 items-center gap-2">
                  <Image
                    src="/images/duck-logo-final.png"
                    alt="Duck Book Writers Logo"
                    width={159}
                    height={159}
                    className="object-contain w-[88px] h-[56px] sm:w-[102px] sm:h-[60px] md:w-[118px] md:h-[66px] lg:w-[132px] lg:h-[72px]"
                  />
                </Link>

                {/* Center: Nav (same links as global header, sirf styling different) */}
                <nav className="hidden lg:flex items-center justify-center flex-1">
                  <ul className="flex items-center justify-center gap-6 text-[13px] font-medium text-gray-700 whitespace-nowrap">
                    {navLinks.map((link) => (
                      <li key={link.href} className="flex-shrink-0">
                        <Link
                          href={link.href}
                          className="hover:text-[#FF0000] transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Right: Get Started only */}
                <div className="hidden lg:flex items-center gap-4">
                  <Link
                    href="/book-to-video#calendly"
                    className="text-[13px] font-semibold border border-[#FF0000] text-[#FF0000] px-6 py-2 rounded-full bg-white/90 hover:bg-[#FF0000] hover:text-white transition-colors duration-200 shadow-[0_8px_18px_rgba(220,38,38,0.3)]"
                  >
                    Get Started
                  </Link>
                </div>

                {/* Mobile: Menu button */}
                <div className="lg:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    aria-label="Open menu"
                  >
                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile dropdown */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-3 bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
                <div className="p-4">
                  <ul className="flex flex-col text-center gap-2">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 text-[14px] font-medium text-gray-800 hover:text-[#FF0000] transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-center gap-4 pt-4">
                    <Link
                      href="/book-to-video#calendly"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-[14px] font-semibold border border-[#FF0000] text-[#FF0000] px-6 py-2 rounded-full bg-white hover:bg-[#FF0000] hover:text-white transition-colors duration-200"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
      ) : (
        <header className={`${isHomePage ? 'bg-transparent absolute left-0 right-0 z-50 top-[40px] sm:top-[44px]' : 'bg-white shadow-sm relative'} z-50`}>
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12 sm:h-16 lg:h-28">
          
          {/* Column 1: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" passHref>
              <Image 
                src="/images/duck-logo-final.png" 
                alt="Duck Book Writers Logo" 
                width={159} 
                height={159} 
                className="object-contain w-16 h-16 lg:w-[159px] lg:h-[159px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className={`hidden lg:flex flex-grow flex-col items-center mx-32 ${isHomePage ? 'bg-black/20 backdrop-blur-md border border-black/30 rounded-2xl px-8 py-4 shadow-lg' : 'bg-black/80 backdrop-blur-md border border-black/50 rounded-2xl px-8 py-4 shadow-lg'}`}>
            {/* Navigation Links */}
            <nav className="w-full">
              <ul className="flex items-center justify-center space-x-6 flex-nowrap">
                {navLinks.map((link) => (
                  <li key={link.href} className="flex-shrink-0">
                    <Link href={link.href} className={`text-sm whitespace-nowrap ${isHomePage ? 'text-white hover:text-yellow-300 drop-shadow-lg' : 'text-white hover:text-yellow-300'} transition-colors duration-200 font-medium`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Desktop Contact Button - Hidden on mobile */}
          <div className="hidden lg:flex flex-shrink-0">
            <CalendlyWidget 
              url={CALENDLY_LINK}
              text="Contact"
              size="md"
              className="font-medium"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <CalendlyWidget 
              url={CALENDLY_LINK}
              text="Contact"
              size="sm"
              className="font-medium"
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 ${isHomePage ? 'text-white' : 'text-gray-700'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/60 backdrop-blur-md border border-white/20 shadow-xl z-50">
            <div className="px-4 py-6 space-y-4 pt-8 text-center">
              {/* Mobile Navigation Links */}
              <nav>
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="block text-base text-black hover:text-yellow-500 transition-colors duration-200 font-medium py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
          </div>
        </header>
      )}
    </>
  );
};

export default Header;