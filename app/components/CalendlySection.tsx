'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CalendlySection = () => {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);

  useEffect(() => {
    const initCalendlyWidget = () => {
      const widgetElement = document.getElementById('calendly-inline-embed');
      if ((window as any).Calendly && widgetElement && !widgetElement.hasChildNodes()) {
        try {
          (window as any).Calendly.initInlineWidget({
            url: 'https://calendly.com/contact-duckbookwriters/30min',
            parentElement: widgetElement,
            prefill: {},
            utm: {}
          });
        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
        }
      }
    };

    // Check if Calendly is already loaded (from layout.tsx script)
    if ((window as any).Calendly) {
      setIsCalendlyLoaded(true);
      // Small delay to ensure DOM is ready
      setTimeout(initCalendlyWidget, 200);
      return;
    }

    // Wait for script from layout.tsx to load
    const checkCalendly = setInterval(() => {
      if ((window as any).Calendly) {
        setIsCalendlyLoaded(true);
        clearInterval(checkCalendly);
        setTimeout(initCalendlyWidget, 200);
      }
    }, 100);

    // Cleanup interval after 10 seconds if Calendly doesn't load
    const timeout = setTimeout(() => {
      clearInterval(checkCalendly);
    }, 10000);

    return () => {
      clearInterval(checkCalendly);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-[#FDFDFD] via-[#F8F9FA] to-[#F5F6FF] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-yellow-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.h2 
            className="font-['Poppins'] font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Schedule a <span className="text-yellow-500">30 Minute Meeting</span>
          </motion.h2>
          
          <motion.p 
            className="font-['Poppins'] text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            30 Minute Meeting - Duck Book Writers
          </motion.p>
          
          <motion.p 
            className="font-['Poppins'] text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            Book a free consultation with our team to discuss your book publishing needs and discover how we can help bring your story to life.
          </motion.p>
        </motion.div>

        {/* Calendly Inline Widget */}
        <motion.div 
          className="bg-white rounded-[20px] sm:rounded-[30px] shadow-xl p-4 sm:p-6 lg:p-8 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div 
            id="calendly-inline-embed" 
            className="w-full min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]"
            style={{ minWidth: '320px', height: '100%' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CalendlySection;

