'use client';

import { motion } from 'framer-motion';
import { Users, Award } from 'lucide-react';
import CalendlyWidget from './CalendlyWidget';

const ReadyToPublish = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(255, 224, 51, 0.25) 0%, rgba(255, 224, 51, 0) 70%), linear-gradient(to bottom, #FDFDFD, #F5F6FF)'
        }}
      />

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-[#FFBE02] rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-32 w-3 h-3 bg-[#FFBE02] rounded-full opacity-40"
        animate={{
          y: [0, -15, 0],
          x: [0, -8, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute bottom-32 left-32 w-2 h-2 bg-[#FFBE02] rounded-full opacity-50"
        animate={{
          y: [0, -10, 0],
          x: [0, 12, 0],
          scale: [1, 1.4, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="max-w-[1920px] mx-auto px-16 lg:px-24 xl:px-32 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.h2 
            className="font-['Poppins'] font-semibold text-[48px] text-[#1A1A1A] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Ready to Publish Your Book?
          </motion.h2>
          
          <motion.p 
            className="font-['Poppins'] text-[18px] text-[#6B6B6B] mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Join hundreds of successful authors who trust us with their stories. Let&apos;s bring your book to life together.
          </motion.p>
          
          <motion.div
            className="flex justify-center items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <motion.div
              className="flex items-center gap-2 text-[#6B6B6B] font-['Poppins'] text-sm"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Users className="w-4 h-4 text-[#FFBE02]" />
              <span>500+ Authors Trust Us</span>
            </motion.div>
            <div className="w-1 h-1 bg-[#6B6B6B] rounded-full"></div>
            <motion.div
              className="flex items-center gap-2 text-[#6B6B6B] font-['Poppins'] text-sm"
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <Award className="w-4 h-4 text-[#FFBE02]" />
              <span>Award-Winning Service</span>
            </motion.div>
          </motion.div>
          
            <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CalendlyWidget 
              url="https://calendly.com/contact-duckbookwriters/30min"
              text="Get Started Today"
              size="lg"
              className="bg-[#FFBE02] hover:bg-[#e6aa02] text-[#040404] font-['Poppins'] font-semibold px-8 py-2 rounded-[50px] text-[18px] transition-all duration-300 hover-lift smooth-transition flex items-center justify-center gap-3 mx-auto group/btn"
            />
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReadyToPublish;
