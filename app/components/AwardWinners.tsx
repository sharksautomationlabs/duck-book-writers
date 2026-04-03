'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const AwardWinners = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[400px] sm:h-[500px] lg:h-[650px] bg-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-background.png"
          alt="Award Winners Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="relative max-w-screen-2xl mx-auto h-full z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full py-8 lg:py-0">
          {/* Left Column: Title and Sub-text */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
            <h2 className="font-['Poppins'] font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-8xl leading-tight text-gray-800">
              Award
              <br />
              Winners
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <p className="font-['Poppins'] text-base sm:text-lg lg:text-xl text-gray-600">
                Recognized for excellence
                <br />
                and impact.
              </p>
              <Link href="/books" className="flex items-center justify-center lg:justify-start gap-2 group">
                <span className="font-['Poppins'] font-semibold text-blue-800 group-hover:underline">
                  Read Now
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-800 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Award Decoration and Image Cluster */}
          <div className="relative w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] h-[250px] sm:h-[350px] lg:h-[450px] xl:h-[500px] mx-auto lg:mx-0 order-1 lg:order-2">
            
            {/* Center Book with Floating Motion */}
            <motion.div 
              className="absolute top-[60px] sm:top-[80px] lg:top-[100px] xl:top-[118px] left-1/2 -translate-x-1/2 w-[100px] sm:w-[150px] lg:w-[180px] xl:w-[200px] h-[150px] sm:h-[220px] lg:h-[260px] xl:h-[300px] z-10"
              animate={{ 
                y: [-8, 8, -8]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/images/books/book1.jpg"
                alt="The Journey Within - Award Winning Book"
                layout="fill"
                objectFit="contain"
              />
            </motion.div>

            {/* Left Book - Behind Center Book, Closer Position */}
            <motion.div 
              className="absolute top-[70px] sm:top-[90px] lg:top-[110px] xl:top-[128px] left-2 sm:left-[80px] lg:left-[100px] xl:left-[120px] w-[72px] sm:w-[120px] lg:w-[140px] xl:w-[160px] h-[110px] sm:h-[180px] lg:h-[220px] xl:h-[250px] z-0"
              animate={{ 
                y: [-6, 6, -6],
                rotate: [25, 25, 25]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              style={{ 
                transformOrigin: 'center'
              }}
            >
              <Image
                src="/images/books/book2.jpg"
                alt="You Are Not Only One - Award Winning Book"
                layout="fill"
                objectFit="contain"
              />
            </motion.div>

            {/* Right Book - Behind Center Book, Closer Position */}
            <motion.div 
              className="absolute top-[70px] sm:top-[90px] lg:top-[110px] xl:top-[128px] right-2 sm:right-[80px] lg:right-[100px] xl:right-[120px] w-[72px] sm:w-[120px] lg:w-[140px] xl:w-[160px] h-[110px] sm:h-[180px] lg:h-[220px] xl:h-[250px] z-0"
              animate={{ 
                y: [-6, 6, -6],
                rotate: [-25, -25, -25]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              style={{ 
                transformOrigin: 'center'
              }}
            >
              <Image
                src="/images/books/book3.jpg"
                alt="Stories of Hope - Award Winning Book"
                layout="fill"
                objectFit="contain"
              />
            </motion.div>

            {/* Overlay Image: Duck Mascot with jumping animation and sparkles */}
            {/* <motion.div 
              className="absolute bottom-[65px] right-[180px] w-[140px] h-[180px]"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                // Single jumping animation when section comes into focus
                y: isInView ? [0, -20, 0, -15, 0, -25, 0] : 0,
                // Gentle continuous quiver
                rotate: [0, 0.5, -0.5, 0.5, -0.5, 0]
              }}
              transition={{ 
                duration: 2.5, 
                delay: 0.3,
                ease: "easeInOut",
                // Jumping animation settings - single sequence, no repeat
                y: {
                  duration: 2.0,
                  repeat: 0,
                  ease: "easeInOut"
                },
                // Quiver animation settings
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }
              }}
              // whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Image
                src="/images/duck-mascot-2.png"
                alt="Duck Mascot"
                layout="fill"
                objectFit="contain"
              />
               */}
              {/* Yellow sparkles coming out of the book - only visible when mascot reaches final position */}
              {/* <motion.div
                className="absolute top-[60px] left-[70px] w-[6px] h-[6px] bg-yellow-400 rounded-full opacity-0"
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
                  delay: 1.8  // Wait for mascot to reach final position (0.3s initial + 1.5s movement)
                }}
                style={{
                  boxShadow: isInView ? '0 0 25px #fbbf24, 0 0 50px #fbbf24, 0 0 75px #fbbf24' : 'none'
                }}
              />
              
              <motion.div
                className="absolute top-[55px] left-[65px] w-[5px] h-[5px] bg-yellow-300 rounded-full opacity-0"
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
                  delay: 2.1  // Wait for mascot + 0.3s stagger
                }}
                style={{
                  boxShadow: isInView ? '0 0 20px #f59e0b, 0 0 40px #f59e0b, 0 0 60px #f59e0b' : 'none'
                }}
              />
              
              <motion.div
                className="absolute top-[65px] left-[75px] w-[7px] h-[7px] bg-yellow-500 rounded-full opacity-0"
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
                  delay: 2.4  // Wait for mascot + 0.6s stagger
                }}
                style={{
                  boxShadow: isInView ? '0 0 30px #eab308, 0 0 60px #eab308, 0 0 90px #eab308' : 'none'
                }}
              />
              
              <motion.div
                className="absolute top-[50px] left-[60px] w-[4px] h-[4px] bg-yellow-400 rounded-full opacity-0"
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
                  delay: 2.7  // Wait for mascot + 0.9s stagger
                }}
                style={{
                  boxShadow: isInView ? '0 0 18px #fbbf24, 0 0 36px #fbbf24, 0 0 54px #fbbf24' : 'none'
                }}
              />
              
              <motion.div
                className="absolute top-[70px] left-[80px] w-[5px] h-[5px] bg-yellow-300 rounded-full opacity-0"
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
                  delay: 3.0  // Wait for mascot + 1.2s stagger
                }}
                style={{
                  boxShadow: isInView ? '0 0 22px #f59e0b, 0 0 44px #f59e0b, 0 0 66px #f59e0b' : 'none'
                }}
              />
              
              <motion.div
                className="absolute top-[45px] left-[55px] w-[3px] h-[3px] bg-yellow-500 rounded-full opacity-0"
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
                  delay: 3.3  // Wait for mascot + 1.5s stagger
                }}
                style={{
                  boxShadow: isInView ? '0 0 15px #eab308, 0 0 30px #eab308, 0 0 45px #eab308' : 'none'
                }}
              />
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardWinners;