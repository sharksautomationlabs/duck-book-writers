'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import CalendlyWidget from './CalendlyWidget';

const Bestsellers = () => {
  const sectionRef = useRef(null);

  const books = [
    {
      title: "An Old Little Lady",
      author: "Judy Hobson",
      image: "/images/judy-book1.jpg",
      imageWidth: 200,
      imageHeight: 300,
      amazonLink: "https://www.amazon.in/dp/B0FQ2LTH5Y",
    },
    {
      title: "You Are Not Only One", 
      author: "Judy Hobson",
      image: "/images/judy-book2.jpg",
      imageWidth: 200,
      imageHeight: 300,
      amazonLink: "https://www.amazon.com/You-Are-Not-Only-One/dp/1304017710",
    },
    {
      title: "Reggie The Redbird & Talking Subway car",
      author: "Daniel A Alston",
      image: "/images/judy-book3.jpg",
      imageWidth: 200,
      imageHeight: 300,
      amazonLink: "https://www.amazon.com/Reggie-Redbird-Talking-Subway-Cars-ebook/dp/B0FXPDW2KQ/ref=sr_1_1?crid=33G34XQHFE4Q6&dib=eyJ2IjoiMSJ9.ZtTs5ClGCxsf2XQ-cNkfQw.ryPNjuqtFIm9Y3pWO6NlQxJWLAQQkOXLwlObTwKMUes&dib_tag=se&keywords=Reggie+The+Redbird+%26+Talking+Subway+car+by+Daniel+A+Alston&qid=1761936194&sprefix=%2Caps%2C329&sr=8-1",
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 lg:py-20 bg-white">
      {/* Background Wavy Lines */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-background.png"
          alt="Background pattern"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Duck Mascot with scroll-based animation and sparkles */}
      {/* <motion.div 
        className="absolute bottom-0 z-20 w-48 h-56"
        initial={{ opacity: 0, x: -50, rotate: -10 }}
        animate={{ 
          opacity: 1, 
          x: isInView ? 1300 : 0,  // Move 200px to the right when in view
          // Gentle continuous quiver
          y: [0, -1, 1, -1, 1, 0],
          rotate: [0, 0.5, -0.5, 0.5, -0.5, 0]
        }}
        transition={{ 
          duration: 1.5, 
          delay: 0.5,
          ease: "easeInOut",
          // Quiver animation settings
          y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          },
          rotate: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }
        }}
        whileHover={{ scale: 1.05, rotate: 5 }}
        style={{ left: '40px' }}
      >
        <Image
          src="/images/duck-mascot-3.png"
          alt="Duck mascot reading a book"
          width={192}
          height={224}
          className="transform -scale-x-100"
        />
         */}
        {/* Yellow sparkles coming out of the book - only visible when mascot reaches final position */}
        {/* <motion.div
          className="absolute top-[60px] left-[120px] w-[6px] h-[6px] bg-yellow-400 rounded-full opacity-0"
          animate={{
            opacity: isInView ? [0, 1, 0] : 0,
            y: isInView ? [0, -80, -100] : 0,
            x: isInView ? [0, 8, -5] : 0,
            scale: isInView ? [0.5, 1.5, 1, 0] : 0
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: 2.0  // Wait for mascot to reach final position (0.5s initial + 1.5s movement)
          }}
          style={{
            boxShadow: isInView ? '0 0 25px #fbbf24, 0 0 50px #fbbf24, 0 0 75px #fbbf24' : 'none'
          }}
        />
        
        <motion.div
          className="absolute top-[55px] left-[115px] w-[5px] h-[5px] bg-yellow-300 rounded-full opacity-0"
          animate={{
            opacity: isInView ? [0, 1, 0] : 0,
            y: isInView ? [0, -70, -90] : 0,
            x: isInView ? [0, -6, 4] : 0,
            scale: isInView ? [0.3, 1.3, 0.8, 0] : 0
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: 2.3  // Wait for mascot + 0.3s stagger
          }}
          style={{
            boxShadow: isInView ? '0 0 20px #f59e0b, 0 0 40px #f59e0b, 0 0 60px #f59e0b' : 'none'
          }}
        />
        
        <motion.div
          className="absolute top-[65px] left-[125px] w-[7px] h-[7px] bg-yellow-500 rounded-full opacity-0"
          animate={{
            opacity: isInView ? [0, 1, 0] : 0,
            y: isInView ? [0, -75, -95] : 0,
            x: isInView ? [0, 5, -7] : 0,
            scale: isInView ? [0.4, 1.4, 0.9, 0] : 0
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: 2.6  // Wait for mascot + 0.6s stagger
          }}
          style={{
            boxShadow: isInView ? '0 0 30px #eab308, 0 0 60px #eab308, 0 0 90px #eab308' : 'none'
          }}
        /> */}
{/*         
        <motion.div
          className="absolute top-[50px] left-[110px] w-[4px] h-[4px] bg-yellow-400 rounded-full opacity-0"
          animate={{
            opacity: isInView ? [0, 1, 0] : 0,
            y: isInView ? [0, -60, -80] : 0,
            x: isInView ? [0, -3, 6] : 0,
            scale: isInView ? [0.2, 1.2, 0.7, 0] : 0
          }}
          transition={{
            duration: 2.0,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: 2.9  // Wait for mascot + 0.9s stagger
          }}
          style={{
            boxShadow: isInView ? '0 0 18px #fbbf24, 0 0 36px #fbbf24, 0 0 54px #fbbf24' : 'none'
          }}
        />
        
        <motion.div
          className="absolute top-[70px] left-[130px] w-[5px] h-[5px] bg-yellow-300 rounded-full opacity-0"
          animate={{
            opacity: isInView ? [0, 1, 0] : 0,
            y: isInView ? [0, -65, -85] : 0,
            x: isInView ? [0, 7, -4] : 0,
            scale: isInView ? [0.3, 1.3, 0.8, 0] : 0
          }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: 3.2  // Wait for mascot + 1.2s stagger
          }}
          style={{
            boxShadow: isInView ? '0 0 22px #f59e0b, 0 0 44px #f59e0b, 0 0 66px #f59e0b' : 'none'
          }}
        />
         */}
        {/* <motion.div
          className="absolute top-[45px] left-[105px] w-[3px] h-[3px] bg-yellow-500 rounded-full opacity-0"
          animate={{
            opacity: isInView ? [0, 1, 0] : 0,
            y: isInView ? [0, -55, -75] : 0,
            x: isInView ? [0, -2, 3] : 0,
            scale: isInView ? [0.1, 1.1, 0.6, 0] : 0
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: 3.5  // Wait for mascot + 1.5s stagger
          }}
          style={{
            boxShadow: isInView ? '0 0 15px #eab308, 0 0 30px #eab308, 0 0 45px #eab308' : 'none'
          }}
        /> */}
      {/* </motion.div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center mb-12 sm:mb-16 lg:mb-24 gap-4 sm:gap-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center sm:text-left">
            <motion.h2 
              className="font-['Poppins'] font-semibold text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-2 sm:mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Recently Published
            </motion.h2>
            <motion.p 
              className="font-['Poppins'] text-sm sm:text-base text-gray-500"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Explore books topping charts and winning hearts worldwide.
            </motion.p>
          </div>
          <Link href="/books">
            <motion.button 
              className="bg-gray-800 hover:bg-black text-white font-['Poppins'] font-semibold px-4 sm:px-6 py-1 rounded-full text-sm sm:text-base hover-lift smooth-transition"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All
            </motion.button>
          </Link>
        </motion.div>
        
        <motion.div 
          className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-10 lg:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
        >
          {books.map((book, index) => (
            <motion.div 
              key={index} 
              className="relative rounded-2xl p-4 sm:p-6 pb-20 sm:pb-24 w-full max-w-[360px] hover-lift smooth-transition"
              style={{
                background: 'radial-gradient(ellipse at bottom right, rgba(255, 190, 2, 0.25) 0%, rgba(255, 190, 2, 0) 70%), linear-gradient(to bottom, #FDFDFD, #F5F6FF)'
              }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Book Image - Absolutely Positioned */}
              <motion.div 
                className="absolute left-4 sm:left-6 -top-4 sm:-top-6 w-[120px] h-[168px] sm:w-[150px] sm:h-[210px] rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: -20, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <Image
                  src={book.image}
                  alt={book.title.replace("\n", " ")}
                  width={book.imageWidth}
                  height={book.imageHeight}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Content Container */}
              <motion.div 
                className="ml-[130px] sm:ml-[170px]" 
                style={{ minHeight: '120px' }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
              >
                {/* Title */}
                <motion.h3 
                  className="font-['Poppins'] font-semibold text-lg sm:text-xl leading-tight text-gray-800 whitespace-pre-line mb-2"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                >
                  {book.title}
                </motion.h3>
                
                {/* Author */}
                <motion.p 
                  className="font-['Poppins'] text-sm text-gray-600 mb-3 sm:mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
                >
                  by {book.author}
                </motion.p>
                
                {/* 5 Star Rating */}
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-0.5">
                    <span className="text-yellow-500 text-xl font-light">★</span>
                    <span className="text-yellow-500 text-xl font-light">★</span>
                    <span className="text-yellow-500 text-xl font-light">★</span>
                    <span className="text-yellow-500 text-xl font-light">★</span>
                    <span className="text-yellow-500 text-xl font-light">★</span>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Buy Now button - Repositioned and elongated */}
              <motion.div 
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.2 }}
              >
                {book.amazonLink ? (
                  <a 
                    href={book.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#ffbe02] hover:bg-yellow-500 text-black font-['Poppins'] font-semibold py-1 rounded-2xl text-sm sm:text-base shadow-lg shadow-yellow-300/50 hover-lift smooth-transition block text-center"
                  >
                    Buy Now
                  </a>
                ) : (
                  <CalendlyWidget 
                    url="https://calendly.com/contact-duckbookwriters/30min"
                    text="Buy Now"
                    size="sm"
                    className="w-full bg-[#ffbe02] hover:bg-yellow-500 text-black font-['Poppins'] font-semibold py-1 rounded-2xl text-sm sm:text-base shadow-lg shadow-yellow-300/50 hover-lift smooth-transition"
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Bestsellers;