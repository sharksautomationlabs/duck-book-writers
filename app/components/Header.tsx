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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  
  return (
    <header className={`${isHomePage ? 'bg-transparent absolute left-0 right-0 z-50 top-[40px] sm:top-[44px]' : 'bg-white shadow-sm relative'} z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
  );
};

export default Header;