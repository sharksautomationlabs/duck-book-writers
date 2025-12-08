'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const Careers = () => {
  const sectionRef = useRef(null);
  // const isInView = useInView(sectionRef, { 
  //   once: false, 
  //   amount: 0.3,
  //   margin: "-100px 0px -100px 0px"
  // });

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-purple-200/25 rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.h1
            className="font-['Poppins'] font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#1A1A1A] mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Join Our <span className="text-yellow-500">Creative</span> Team
          </motion.h1>

          <motion.p
            className="font-['Poppins'] text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Be part of a dynamic publishing team that brings stories to life.
            We&apos;re looking for passionate individuals who share our vision of transforming manuscripts into masterpieces.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            className="relative flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <div className="text-center lg:text-left">
              <motion.h2
                className="font-['Poppins'] font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Why Work With Us?
              </motion.h2>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-['Poppins'] text-lg text-gray-700">Creative and collaborative environment</p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-['Poppins'] text-lg text-gray-700">Opportunity to work with talented authors</p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-['Poppins'] text-lg text-gray-700">Flexible working arrangements</p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-['Poppins'] text-lg text-gray-700">Competitive benefits package</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Contact Details */}
          <motion.div
            className="bg-white rounded-[15px] sm:rounded-[20px] p-4 sm:p-6 lg:p-8 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h2
              className="font-['Poppins'] font-semibold text-2xl sm:text-3xl lg:text-[32px] text-[#1A1A1A] mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Contact Us
            </motion.h2>

            <div className="space-y-6">
              {/* Phone Contact */}
              <motion.div
                className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.35 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-semibold text-lg text-[#1A1A1A]">Phone</h3>
                  <p className="font-['Poppins'] text-sm text-gray-600">+1 (346) 463-7721</p>
                </div>
              </motion.div>

              {/* Email Contact */}
              <motion.div
                className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.4 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-semibold text-lg text-[#1A1A1A]">Email</h3>
                  <p className="font-['Poppins'] text-sm text-gray-600">contact@duckbookwriters.com</p>
                </div>
              </motion.div>


              {/* Call to Action */}
              <motion.div
                className="text-center p-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.55 }}
              >
                <h3 className="font-['Poppins'] font-bold text-xl text-black mb-2">Ready to Join Our Team?</h3>
                <p className="font-['Poppins'] text-sm text-black/80 mb-4">Send us your resume and cover letter to get started!</p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@duckbookwriters.com&su=Job Application"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white font-['Poppins'] font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200"
                >
                  Apply Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Careers;