'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const BookCategoriesHome = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>("Mystery, Thriller\n& Suspense");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intersection Observer for video lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.play();
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the video is visible
        rootMargin: '50px' // Start loading 50px before the video comes into view
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const categories = [
    {
      name: "Mystery, Thriller\n& Suspense",
      image: "/images/category-mystery.png",
      staggered: false,
      books: [
        { title: "Mystified", image: "/images/mystery/1.jpg", author: "Julia Ash" },
        { title: "Miller Avenue Murder", image: "/images/mystery/2.jpg", author: "Campbell" },
        { title: "Phantom Cove", image: "/images/mystery/3.jpg", author: "Port Stirling Mystery" },
        { title: "The Dead Bell", image: "/images/mystery/4.jpg", author: "Reid Winslow" },
        { title: "The First Paper Cut", image: "/images/mystery/5.jpg", author: "Anniversary Die" },
        { title: "The Opening Night Murders", image: "/images/mystery/6.jpg", author: "James Byrnside" }
      ]
    },
    {
      name: "Science Fiction\nand Fantasy",
      image: "/images/category-scifi.png",
      staggered: true,
      books: [
        { title: "Galactic Odyssey", image: "/images/science/1.jpg", author: "Dr. Sarah Johnson" },
        { title: "Quantum Paradox", image: "/images/science/2.jpg", author: "Mike Thompson" },
        { title: "Time Traveler's Dilemma", image: "/images/science/3.jpg", author: "Dr. Lisa Chen" },
        { title: "Neural Network", image: "/images/science/4.jpg", author: "Dr. James Wilson" },
        { title: "Mars Colony", image: "/images/science/5.jpg", author: "Sarah Martinez" },
        { title: "AI Revolution", image: "/images/science/6.jpg", author: "David Lee" }
      ]
    },
    {
      name: "Children",
      image: "/images/category-childrens.png",
      staggered: true,
      books: [
        { title: "The Magic Garden", image: "/images/children/1.jpg", author: "Sarah Johnson" },
        { title: "Adventure Friends", image: "/images/children/2.jpg", author: "Mike Thompson" },
        { title: "The Brave Little Mouse", image: "/images/children/3.jpg", author: "Lisa Chen" },
        { title: "Rainbow Dreams", image: "/images/children/4.jpg", author: "James Wilson" },
        { title: "The Flying Elephant", image: "/images/children/5.jpg", author: "Sarah Martinez" },
        { title: "Pirate's Treasure", image: "/images/children/6.jpg", author: "David Lee" }
      ]
    },
    {
      name: "Health &\nFitness",
      image: "/images/category-business.png",
      staggered: true,
      books: [
        { title: "Healthy Living Guide", image: "/images/health books/book1.jpg", author: "Dr. Sarah Johnson" },
        { title: "Fitness Fundamentals", image: "/images/health books/book2.jpg", author: "Mike Thompson" },
        { title: "Nutrition Essentials", image: "/images/health books/book3.jpg", author: "Dr. Lisa Chen" },
        { title: "Mental Wellness", image: "/images/health books/book4.jpg", author: "Dr. James Wilson" },
        { title: "Yoga & Meditation", image: "/images/health books/book5.jpg", author: "Sarah Martinez" },
        { title: "Strength Training", image: "/images/health books/book6.jpg", author: "Coach David Lee" }
      ]
    },
    {
      name: "Self-Help",
      image: "/images/category-business.png",
      staggered: false,
      books: [
        { title: "Self-Help Book 1", image: "/images/selfhelp/book1.jpg" },
        { title: "Self-Help Book 2", image: "/images/selfhelp/book2.jpg" },
        { title: "Self-Help Book 3", image: "/images/selfhelp/book3.jpg" },
        { title: "Self-Help Book 4", image: "/images/selfhelp/book4.jpg" },
        { title: "Self-Help Book 5", image: "/images/selfhelp/book5.jpg" },
        { title: "Self-Help Book 6", image: "/images/selfhelp/book6.jpg" }
      ]
    },
    {
      name: "Business &\nMoney",
      image: "/images/category-business.png",
      staggered: true,
      books: [
        { title: "Business Strategy Guide", image: "/images/business/1.jpg", author: "Dr. Sarah Johnson" },
        { title: "Financial Freedom", image: "/images/business/2.jpg", author: "Mike Thompson" },
        { title: "Investment Essentials", image: "/images/business/3.jpg", author: "Dr. Lisa Chen" },
        { title: "Entrepreneurship Guide", image: "/images/business/4.jpg", author: "Dr. James Wilson" },
        { title: "Marketing Mastery", image: "/images/business/5.jpg", author: "Sarah Martinez" },
        { title: "Leadership Excellence", image: "/images/business/6.jpg", author: "Coach David Lee" }
      ]
    }
  ];

  return (
    <>
      {/* This style block hides the scrollbar on the element it's applied to */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      <section className="relative my-12 sm:my-16 lg:my-20 py-8 sm:py-12 lg:py-16 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="object-cover w-full h-full"
            loop
            muted
            playsInline
            poster="/images/ducks-poster.jpg"
            preload="metadata"
          >
            <source src="/images/ducks.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        {/* Centered Header Container */}
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto text-center mb-8 sm:mb-10 lg:mb-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.15 }}
        >
          <h2 className="font-['Poppins'] font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            Book Category
          </h2>
        </motion.div>
        
        {/* Category Headers */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-8 sm:mb-12">
          <div className="relative">
            {/* Continuous underline */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300"></div>
            
            <div className="flex flex-nowrap justify-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 hide-scrollbar px-2">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                  className={`relative flex flex-col items-center transition-all duration-300 flex-shrink-0 group min-h-[60px] ${
                    activeCategory === category.name 
                      ? 'text-[#ffbe02]' 
                      : 'text-white hover:text-gray-200'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.1, delay: index * 0.025 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-['Poppins'] font-semibold text-sm sm:text-base lg:text-lg tracking-wide mb-2 px-2 text-center leading-tight whitespace-pre-line">
                    {category.name}
                  </span>
                  {/* Active category highlight */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                    activeCategory === category.name 
                      ? 'bg-[#ffbe02]' 
                      : 'bg-transparent group-hover:bg-[#ffbe02]/30'
                  }`}></div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Books Display */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.125 }}
          >
            {/* Active Category Header */}
                <div className="text-center mb-8 sm:mb-12">
                  <h3 className="font-['Poppins'] font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                    {activeCategory}
                  </h3>
                  <div className="w-24 h-1 bg-[#ffbe02] mx-auto rounded-full"></div>
                </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 gap-y-8 sm:gap-y-12">
              {categories
                .find(cat => cat.name === activeCategory)
                ?.books.map((book, bookIndex) => (
                  <Link href="/books" key={bookIndex}>
                  <motion.div
                    className="group cursor-pointer relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1, delay: bookIndex * 0.025 }}
                  >
                    {/* Glassmorphic Container */}
                    <div className="absolute inset-0 mx-[20%] -my-3 bg-white/10 rounded-2xl border border-white/30 shadow-lg z-10 group-hover:scale-95 transition-transform duration-300 ease-out">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                      {/* Diagonal Flash Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                        <div className="absolute -top-1 -right-1 w-8 h-full bg-white/60 transform -skew-x-12 translate-x-[200%] group-hover:translate-x-[-200%] transition-transform duration-800 ease-out"></div>
                      </div>
                    </div>
                    
                    {/* Book Image */}
                    <div className="relative z-0 group-hover:scale-95 transition-transform duration-300 ease-out">
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={200}
                        height={300}
                        className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-contain"
                      />
                    </div>
                  </motion.div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BookCategoriesHome;
