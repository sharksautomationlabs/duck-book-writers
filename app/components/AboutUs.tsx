'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: false, 
    amount: 0.3,
    margin: "-100px 0px -100px 0px"
  });

  const missionVision = [
    {
      icon: "/images/mission-icon.svg",
      title: "Our Mission",
      description: "To empower writers by providing exceptional publishing, design, and marketing services that bring their stories to the world. We are committed to producing books that leave a lasting mark on readers.",
    },
    {
      icon: "/images/vision-icon.svg",
      title: "Our Vision",
      description: "To become the most trusted global publishing partner, known for producing bestsellers and championing diverse voices.",
    }
  ];

  const values = [
    { title: "Quality Publishing", description: "Every book gets expert editing, design, and production.", bgColor: "gradient", bgStyle: { background: 'radial-gradient(ellipse at bottom right, rgba(255, 190, 2, 0.25) 0%, rgba(255, 190, 2, 0) 70%), linear-gradient(to bottom, #FDFDFD, #F5F6FF)' } },
    { title: "Global Reach", description: "We distribute to readers in every corner of the world.", bgColor: "bg-[#F8F9FA]" },
    { title: "Author Support", description: "We distribute to readers in every corner of the world.", bgColor: "gradient", bgStyle: { background: 'radial-gradient(ellipse at bottom right, rgba(255, 190, 2, 0.25) 0%, rgba(255, 190, 2, 0) 70%), linear-gradient(to bottom, #FDFDFD, #F5F6FF)' } },
    { title: "Innovation", description: "We use the latest tools and strategies to maximize your reach.", bgColor: "bg-[#F8F9FA]" },
    { title: "Diversity", description: "We welcome stories from all backgrounds and cultures.", bgColor: "gradient", bgStyle: { background: 'radial-gradient(ellipse at bottom right, rgba(255, 190, 2, 0.25) 0%, rgba(255, 190, 2, 0) 70%), linear-gradient(to bottom, #FDFDFD, #F5F6FF)' } }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Top Section: Image and Mission/Vision */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left side - Image */}
          <div className="relative">
            <div className="w-full h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="/images/about-image.png"
                alt="Woman reading a book"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div 
              className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 md:-right-16 w-50 h-50 max-w-[40vw]"
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
              {/* <Image
                src="/images/duck-mascot-2.png"
                alt="Duck Mascot"
                width={160}
                height={160}
                className="w-full h-full object-contain"
              />
               */}
              {/* Yellow sparkles coming out of the book - only visible when mascot reaches final position */}
              <motion.div
                className="absolute top-[60px] left-[80px] w-[6px] h-[6px] bg-yellow-400 rounded-full opacity-0"
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
                className="absolute top-[55px] left-[75px] w-[5px] h-[5px] bg-yellow-300 rounded-full opacity-0"
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
                  delay: 0.8  // Wait for mascot + 0.3s stagger
                }}
                style={{
                  boxShadow: isInView ? '0 0 20px #f59e0b, 0 0 40px #f59e0b, 0 0 60px #f59e0b' : 'none'
                }}
              />
              
              <motion.div
                className="absolute top-[65px] left-[85px] w-[7px] h-[7px] bg-yellow-500 rounded-full opacity-0"
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
                className="absolute top-[50px] left-[70px] w-[4px] h-[4px] bg-yellow-400 rounded-full opacity-0"
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
                className="absolute top-[70px] left-[90px] w-[5px] h-[5px] bg-yellow-300 rounded-full opacity-0"
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
                className="absolute top-[45px] left-[65px] w-[3px] h-[3px] bg-yellow-500 rounded-full opacity-0"
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
            </motion.div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <h2 className="font-['Poppins'] font-bold text-5xl text-gray-800">
              About Us
            </h2>
            {missionVision.map((item, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16">
                  <Image src={item.icon} alt={`${item.title} icon`} width={64} height={64} />
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-bold text-2xl text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="font-['Poppins'] text-base text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Our Values */}
        <div className="text-center">
          <h3 className="font-['Poppins'] font-bold text-4xl text-gray-800 mb-12">
            Our Values
          </h3>
          <div className="flex justify-center flex-wrap gap-6">
            {values.map((value, index) => (
              <div key={index} className={`${value.bgColor === 'gradient' ? '' : value.bgColor} rounded-xl p-6 w-56 h-auto flex flex-col items-center text-center`} style={value.bgStyle}>
                <h4 className="font-['Poppins'] font-bold text-base text-gray-800 mb-2">
                  {value.title}
                </h4>
                <p className="font-['Poppins'] text-sm text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;