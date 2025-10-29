'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Authors = () => {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const authors = [
    { 
      name: "Daniel Alston", 
      image: "/images/author-2.png",
      bio: "Daniel Alston is known for his engaging and imaginative childrens books, bringing stories to life for young readers.",
      books: "1 Published Books. 1 on it way",
      genre: "Childrens book"
    },
    { 
      name: "Judith Hobson", 
      image: "/images/author-1.png",
      bio: "Judith Hobson writes self biographies, sharing personal journeys and life experiences through her published works.",
      books: "3 Published Books",
      genre: "Self Biographies"
    },
    { 
      name: "Cotton Mather", 
      image: "/images/author-3.png",
      bio: "Cotton Mather is a dedicated author who writes on faith, morality, and early American thought. His work blends historical insight with spiritual depth, inspiring readers to reflect on purpose and conviction in everyday life.",
      books: "6 Published Books",
      genre: "Mystery, Thriller & Suspense"
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-200/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
           <h2 className="font-['Poppins'] font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-800 mb-4 sm:mb-6">
            Meet Our Authors
          </h2>
          <p className="font-['Poppins'] text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the talented writers behind our bestselling books. Each author brings unique perspectives and storytelling mastery to our publishing family.
          </p>
        </motion.div>

        {/* Beautiful Carousel */}
        <div className="relative">
          {/* Main Carousel Container */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl">
             <AnimatePresence mode="wait">
        <motion.div
                 key={currentIndex}
                 className="absolute inset-0 flex items-center justify-center"
                 initial={{ opacity: 0, x: 300 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -300 }}
                 transition={{ duration: 0.5, ease: "easeInOut" }}
               >
                {/* Author Card */}
                <div className="relative w-full max-w-4xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Author Image */}
        <motion.div
                      className="relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={authors[currentIndex].image}
                          alt={authors[currentIndex].name}
                          width={600}
                          height={800}
                          className="w-full h-full object-cover"
                          priority={currentIndex === 0}
                          unoptimized={true}
                          onError={(e) => {
                            console.log('Image error for:', authors[currentIndex].name, authors[currentIndex].image);
                            // Try to reload the image
                            e.currentTarget.src = authors[currentIndex].image + '?t=' + Date.now();
                          }}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        
                      </div>
                    </motion.div>

                    {/* Author Info */}
        <motion.div
                      className="space-y-6 lg:space-y-8"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div>
                         <motion.h3 
                           className="font-['Poppins'] font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4"
                          whileHover={{ color: "#ffbe02" }}
                          transition={{ duration: 0.2 }}
                        >
                          {authors[currentIndex].name}
                        </motion.h3>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                            {authors[currentIndex].genre}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {authors[currentIndex].books}
                          </span>
                        </div>
                         <p className="font-['Poppins'] text-lg text-gray-600 leading-relaxed">
                          {authors[currentIndex].bio}
          </p>
        </div>

                    </motion.div>
                </div>
              </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center z-10"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + authors.length) % authors.length)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center z-10"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % authors.length)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
              </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {authors.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
              </div>

        </div>
      </div>
    </section>
  );
};

export default Authors;