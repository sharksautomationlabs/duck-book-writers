'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NewReleases = () => {
  const releases = [
    {
      titleLine1: "COUPLES THERAPY",
      titleLine2: "WORKBOOK",
      imageSrc: "/images/selfhelp/book1.jpg",
      altText: "Couples Therapy Workbook",
      description: "A comprehensive guide to improving communication and strengthening relationships through practical exercises and proven techniques."
    },
    {
      titleLine1: "HEAL YOUR",
      titleLine2: "INNER CHILD",
      imageSrc: "/images/selfhelp/book2.jpg",
      altText: "Heal Your Inner Child",
      description: "Transform your relationships and emotional well-being by healing childhood wounds and developing healthier patterns."
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-['Poppins'] font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-3 sm:mb-4">
            New Releases
          </h2>
          <p className="font-['Poppins'] text-sm sm:text-base text-gray-500 max-w-3xl mx-auto px-4">
            Discover fresh voices and must-read titles now available.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 sm:gap-8 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.3, staggerChildren: 0.1 }}
        >
          {releases.map((book, index) => (
            <motion.div 
              key={index} 
              className="bg-[#F8F9FA] rounded-2xl p-4 sm:p-6 w-full max-w-[680px] flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 hover-lift smooth-transition mx-auto"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Book Image */}
              <motion.div 
                className="flex-shrink-0 mx-auto sm:mx-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                <div className="w-32 h-44 sm:w-40 sm:h-56 lg:w-50 lg:h-68 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={book.imageSrc}
                    alt={book.altText}
                    width={224}
                    height={320}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
              
              {/* Content */}
              <div className="space-y-3 sm:space-y-4 flex-1 text-center sm:text-left w-full">
                {/* New badge */}
                <motion.div 
                  className="inline-block bg-[#ffbe02] text-white font-['Poppins'] font-semibold px-3 py-1 rounded-md text-xs sm:text-sm mx-auto sm:mx-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.15, delay: 0.15 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  New
                </motion.div>
                
                {/* Title */}
                <motion.h3 
                  className="font-['Poppins'] font-medium text-xl sm:text-2xl leading-tight text-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: 0.2 + index * 0.1 }}
                >
                  {book.titleLine1} <br />
                  {book.titleLine2}
                </motion.h3>
                
                
                {/* Description */}
                <motion.p 
                  className="font-['Poppins'] font-normal text-sm sm:text-base text-gray-500"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: 0.3 + index * 0.1 }}
                >
                  {book.description}
                </motion.p>
                
                {/* Read Now button */}
                <Link href="/books">
                  <motion.div 
                    className="flex items-center justify-center sm:justify-start space-x-2 group cursor-pointer pt-4 sm:pt-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.35 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="font-['Poppins'] font-semibold text-[#ffbe02] text-sm sm:text-base">
                      Read Now
                    </span>
                    <motion.div 
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src="/images/arrow-right.svg"
                        alt="Arrow"
                        width={20}
                        height={20}
                      />
                    </motion.div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewReleases;