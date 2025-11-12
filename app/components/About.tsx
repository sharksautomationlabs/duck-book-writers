'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import CalendlyWidget from './CalendlyWidget';

const About = () => {
  const sectionRef = useRef(null);


  return (
    <section ref={sectionRef} className="relative w-full min-h-[700px] sm:h-[700px] lg:h-[878px] overflow-hidden bg-white">
      {/* Background container for the right side */}
      <div className="absolute top-0 right-0 h-full w-full lg:w-[65%] rounded-bl-[20px] rounded-tl-[20px] bg-yellow-400 overflow-hidden">
        {/* Yellow gradient overlay */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,190,2,1) 0%, rgba(255,190,2,0.8) 100%)'
          }}
        ></div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full py-8 lg:py-0">
          {/* Image - Left side */}
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div 
              className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[647px] h-[350px] sm:h-[400px] lg:h-[653px] relative mx-auto"
              whileHover={{ scale: 1.02 }}
              animate={{ 
                y: [-10, 10, -10]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Background Health Book - Moved further right */}
              <motion.div
                className="absolute inset-0 z-0"
                animate={{ 
                  y: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                style={{ 
                  transform: 'translateX(20px) translateY(-120px)',
                  transformOrigin: 'center'
                }}
              >
                <Image
                  src="/images/health books/book4.jpg"
                  alt="Mental Wellness"
                  width={647}
                  height={653}
                  className="w-full h-full object-contain opacity-60"
                />
              </motion.div>
              
              {/* Foreground Self-Help Book - Moved further left */}
              <Image
                src="/images/selfhelp/book4.jpg"
                alt="Self-Help Book 4"
                width={647}
                height={653}
                className="w-full h-full object-contain relative z-10"
                style={{ 
                  transform: 'translateX(150px)',
                  transformOrigin: 'center'
                }}
              />
            </motion.div>
            
            {/* Duck mascot with scroll-based animation and gentle quiver */}
            {/* <motion.div 
              className="absolute top-90 w-[236px] h-[300px]"
              initial={{ opacity: 0, scale: 0.8, rotate: -10, x: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: isInView ? 800 : 0,  // Move 800px to the right when in view
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
              // whileHover={{ rotate: 5 }}
              style={{ left: '480px' }}
            >
              <Image
                src="/images/duck-mascot-3.png"
                alt="Duck Mascot"
                width={236}
                height={236}
                className="w-full h-full object-cover transform scale-x-[-1]"
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
                  delay: 1.8  // Wait for mascot to reach final position (0.3s initial + 1.5s movement)
                }}
                style={{
                  boxShadow: isInView ? '0 0 25px #fbbf24, 0 0 50px #fbbf24, 0 0 75px #fbbf24' : 'none'
                }}
              />
               */}
              {/* <motion.div
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
                  delay: 2.1  // Wait for mascot + 0.3s stagger
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
                  delay: 2.4  // Wait for mascot + 0.6s stagger
                }}
                style={{
                  boxShadow: isInView ? '0 0 30px #eab308, 0 0 60px #eab308, 0 0 90px #eab308' : 'none'
                }}
              />
              
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
                  delay: 2.7  // Wait for mascot + 0.9s stagger
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
                  delay: 3.0  // Wait for mascot + 1.2s stagger
                }}
                style={{
                  boxShadow: isInView ? '0 0 22px #f59e0b, 0 0 44px #f59e0b, 0 0 66px #f59e0b' : 'none'
                }}
              />
              
              <motion.div
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
                  delay: 3.3  // Wait for mascot + 1.5s stagger
                }}
                style={{
                  boxShadow: isInView ? '0 0 15px #eab308, 0 0 30px #eab308, 0 0 45px #eab308' : 'none'
                }}
              />
            </motion.div> */}
          </motion.div>

          {/* Content - Right side */}
          <motion.div 
            className="space-y-6 lg:space-y-8 px-4 lg:pr-[120px] order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <motion.h2 
              className="font-['Poppins'] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight text-white text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Bringing Author&apos;s
              <br />
              Stories to Readers
              <br />
              Worldwide
            </motion.h2>
            
            <motion.div 
              className="space-y-4 lg:space-y-5 w-full max-w-[550px] mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <motion.p 
                className="font-['Poppins'] text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.35 }}
              >
                We transform your manuscript into a published masterpiece that makes waves in the literary world.
              </motion.p>
              
              <motion.p 
                className="font-['Poppins'] text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.4 }}
              >
                From editing to distribution, we handle the heavy lifting so you can focus on what matters most: writing your story.
              </motion.p>
              
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 0.5 }}
              className="mx-auto lg:mx-0"
            >
              <CalendlyWidget 
                url="https://calendly.com/contact-duckbookwriters/30min"
                text="Learn More"
                size="md"
                className="!bg-black hover:!bg-black text-white font-['Poppins'] font-semibold rounded-[50px] transition-all duration-200 w-[140px] sm:w-[166px] h-[36px] sm:h-[42px] hover-lift smooth-transition"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;