'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AmazonHeaderProps {
  heroTitle: string;
  heroSubtitle?: string;
  customHeight?: string;
  titleSize?: string;
  subtitleSize?: string;
}

const AmazonHeader: React.FC<AmazonHeaderProps> = ({
  heroTitle,
  heroSubtitle,
  customHeight = 'h-[90vh] lg:h-[100vh]',
  titleSize = 'text-4xl lg:text-7xl lg:leading-tight tracking-tight',
  subtitleSize = 'text-lg lg:text-xl leading-relaxed opacity-90',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const currentVideo = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (currentVideo) {
              currentVideo.play();
            }
          } else {
            if (currentVideo) {
              currentVideo.pause();
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (currentVideo) {
      observer.observe(currentVideo);
    }

    return () => {
      if (currentVideo) {
        observer.unobserve(currentVideo);
      }
    };
  }, []);

  return (
    <section className={`relative w-full ${customHeight} flex items-center justify-center text-white overflow-hidden py-0`}>
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
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-center min-h-full pt-16 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <div className="max-w-4xl lg:max-w-6xl text-center">
          <motion.h1
            className={`font-['Poppins'] ${titleSize} font-bold leading-none tracking-tight mb-4 sm:mb-6 text-white`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {heroTitle.split('||').map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index < heroTitle.split('||').length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.h1>
          {heroSubtitle && (
            <motion.p
              className={`font-['Poppins'] ${subtitleSize} text-white/90 mb-6 sm:mb-8 font-medium leading-relaxed max-w-3xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {heroSubtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AmazonHeader;

