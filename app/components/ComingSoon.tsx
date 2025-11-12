'use client';

import Image from 'next/image';
import Countdown from 'react-countdown';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import CalendlyWidget from './CalendlyWidget';

// Animated Countdown Component
const AnimatedCountdown = ({ value, label }: { value: number; label: string }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayValue !== value) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  return (
    <div className="text-center">
      <motion.div 
        className="bg-white rounded-lg p-2 sm:p-3 shadow w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={displayValue}
            className="font-['Poppins'] font-semibold text-xl sm:text-2xl lg:text-3xl text-gray-700"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {String(displayValue).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 bg-yellow-200 opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
      <span className="font-['Poppins'] text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 block">{label}</span>
    </div>
  );
};

// Custom countdown renderer
const CountdownRenderer = ({ hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return (
      <div className="flex gap-3">
        <AnimatedCountdown value={0} label="Hr" />
        <AnimatedCountdown value={0} label="Min" />
        <AnimatedCountdown value={0} label="Sec" />
      </div>
    );
  }

  return (
    <div className="flex gap-2 sm:gap-3">
      <AnimatedCountdown value={hours} label="Hr" />
      <AnimatedCountdown value={minutes} label="Min" />
      <AnimatedCountdown value={seconds} label="Sec" />
    </div>
  );
};

const ComingSoon = () => {
  const sectionRef = useRef(null);

  // Set target date (24 hours from now for demo)
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 8);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <section 
        ref={sectionRef}
        className="relative rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] my-12 sm:my-16 lg:my-20 p-4 sm:p-6 lg:p-8"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(255, 190, 2, 0.15) 0%, rgba(255, 190, 2, 0) 70%), linear-gradient(to right, #F8F9FA, #F3F4FF)'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-6 lg:gap-4">
          {/* Left Column: Text Content - Shifted right with padding */}
          <div className="text-center lg:text-left space-y-3 lg:col-span-1 lg:pl-8">
            <h2 className="font-['Poppins'] font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight text-gray-800">
              Coming
              <br />
              <span className="font-bold text-red-500">Soon</span>
            </h2>
            <p className="font-['Poppins'] text-base sm:text-lg text-gray-500">
              Be the first to meet tomorrow&apos;s literary sensations.
            </p>
          </div>

          {/* Center Column: Book and Mascot */}
          <div className="relative flex justify-center items-center lg:col-span-3">
            {/* Main Book Image Placeholder */}
            <motion.div 
              className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px]"
              animate={{ 
                y: [-10, 10, -10]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/images/coming-soon-book.png" // << REPLACE THIS IMAGE PATH
                alt="Flight Path book cover"
                width={450}
                height={450}
                className="object-contain"
              />
            </motion.div>
            {/* Duck Mascot with quiver and sparkles */}
            {/* <motion.div 
              className="absolute -bottom-5 left-60 z-10 w-32 h-40"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                // Gentle continuous quiver
                y: [0, -1, 1, -1, 1, 0],
                rotate: [0, 0.5, -0.5, 0.5, -0.5, 0]
              }}
              transition={{ 
                duration: 1.5, 
                delay: 0.3,
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
            >
              <Image
                src="/images/duck-mascot-3.png"
                alt="Duck mascot"
                width={128}
                height={160}
              />
               */}
              {/* Yellow sparkles coming out of the book - only visible when section is in focus */}
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
                  delay: 1.8  // Wait for mascot to reach final position
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
               */}
              {/* <motion.div
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

          {/* Right Column: Countdown and Button */}
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 lg:col-span-1">
            {/* Animated Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <Countdown
                date={targetDate}
                renderer={CountdownRenderer}
                intervalDelay={1000}
                precision={1}
              />
            </motion.div>
            
            {/* Pre Order Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <CalendlyWidget 
                url="https://calendly.com/contact-duckbookwriters/30min"
                text="Pre Order Now"
                size="sm"
                className="bg-[#ffbe02] hover:bg-yellow-500 text-black font-['Poppins'] font-semibold px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm w-[120px] sm:w-[140px] lg:w-[160px] hover-lift smooth-transition"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComingSoon;