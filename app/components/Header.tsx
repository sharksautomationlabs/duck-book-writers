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

function normalizePathname(path: string | null): string {
  if (path == null || path === '') return '/';
  const noQuery = path.split('?')[0] ?? path;
  return noQuery.replace(/\/+$/, '') || '/';
}

export type HeaderProps = {
  /**
   * Minimal header (logo + Get Started). Set from `/book-to-video` page so production
   * always matches even if `usePathname()` differs (trailing slash, proxies, stale HTML).
   */
  forceBookToVideoLayout?: boolean;
};

const Header = ({ forceBookToVideoLayout = false }: HeaderProps = {}) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const pathNorm = normalizePathname(pathname);
  const isBookToVideoPage =
    forceBookToVideoLayout || pathNorm === '/book-to-video';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  
  return (
    <>
      {isBookToVideoPage ? (
        <header className="sticky top-0 z-50 bg-white/95 pt-2 sm:pt-3 backdrop-blur">
          <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute -top-6 right-[-8%] h-[210px] w-[280px] rounded-full bg-[#FFF4D4] blur-[70px]" />
            <div className="relative bg-gradient-to-r from-[#FFF7DC] via-white to-[#FFE4E4] rounded-xl sm:rounded-2xl border border-[#FFE08A] shadow-[0_10px_24px_rgba(0,0,0,0.05)] px-4 sm:px-5 py-2 sm:py-2.5">
              <div className="flex items-center justify-between gap-3">
                <Link href="/" passHref className="flex shrink-0 items-center gap-2">
                  <Image
                    src="/images/duck-logo-final.png"
                    alt="Duck Book Writers Logo"
                    width={159}
                    height={159}
                    className="object-contain w-[88px] h-[56px] sm:w-[102px] sm:h-[60px] md:w-[118px] md:h-[66px] lg:w-[132px] lg:h-[72px]"
                  />
                </Link>

                <Link
                  href="/book-to-video#calendly"
                  className="shrink-0 text-[12px] sm:text-[13px] font-semibold border border-[#FF0000] text-[#FF0000] px-4 py-1.5 sm:px-6 sm:py-2 rounded-full bg-white/90 hover:bg-[#FF0000] hover:text-white transition-colors duration-200 shadow-[0_6px_14px_rgba(220,38,38,0.22)]"
                >
                  Get Started
                </Link>
              </div>
            </div>
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
          <div className={`hidden lg:flex flex-grow flex-col items-center min-w-0 mx-2 xl:mx-8 2xl:mx-16 max-w-[calc(100vw-12rem)] ${isHomePage ? 'bg-black/20 backdrop-blur-md border border-black/30 rounded-2xl px-3 xl:px-6 2xl:px-8 py-3 xl:py-4 shadow-lg' : 'bg-black/80 backdrop-blur-md border border-black/50 rounded-2xl px-3 xl:px-6 2xl:px-8 py-3 xl:py-4 shadow-lg'}`}>
            {/* Navigation Links */}
            <nav className="w-full min-w-0 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <ul className="flex items-center justify-center gap-3 xl:gap-4 2xl:gap-6 flex-nowrap px-1">
                {navLinks.map((link) => (
                  <li key={link.href} className="flex-shrink-0">
                    <Link href={link.href} className={`text-xs xl:text-sm whitespace-nowrap ${isHomePage ? 'text-white hover:text-yellow-300 drop-shadow-lg' : 'text-white hover:text-yellow-300'} transition-colors duration-200 font-medium`}>
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