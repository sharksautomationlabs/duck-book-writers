'use client';

import { motion } from 'framer-motion';

const PublishingProcess = () => {
  const processSteps = [
    {
      step: "1",
      title: "Manuscript Review",
      description: "We evaluate your manuscript and provide detailed feedback"
    },
    {
      step: "2", 
      title: "Editing & Design",
      description: "Professional editing and custom cover design"
    },
    {
      step: "3",
      title: "Formatting",
      description: "Format for print and digital distribution"
    },
    {
      step: "4",
      title: "Publishing",
      description: "Publish across all major platforms worldwide"
    },
    {
      step: "5",
      title: "Marketing",
      description: "Strategic marketing to boost visibility and sales"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1920px] mx-auto px-16 lg:px-24 xl:px-32">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.h2 
            className="font-['Poppins'] font-semibold text-3xl sm:text-4xl lg:text-[48px] text-[#1A1A1A] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.15, delay: 0.05 }}
          >
            Our Publishing Process
          </motion.h2>
          <motion.p 
            className="font-['Poppins'] text-sm sm:text-base lg:text-[18px] text-[#6B6B6B] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.15, delay: 0.1 }}
          >
            A streamlined 5-step process that takes your manuscript from concept to bestseller.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {/* Helical Spiral Line */}
          <motion.div 
            className="hidden md:block absolute top-8 left-0 w-full h-8 pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.125, delay: 0.125 }}
          >
            <motion.svg
              width="100%"
              height="32"
              viewBox="0 0 1000 32"
              className="absolute inset-0"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
            >
              <motion.path
                d="M0,16 Q100,8 200,16 Q300,24 400,16 Q500,8 600,16 Q700,24 800,16 Q900,8 1000,16"
                stroke="#FFBE02"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
              />
              <motion.path
                d="M0,18 Q100,10 200,18 Q300,26 400,18 Q500,10 600,18 Q700,26 800,18 Q900,10 1000,18"
                stroke="#FFBE02"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 4, delay: 1.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M0,20 Q100,12 200,20 Q300,28 400,20 Q500,12 600,20 Q700,28 800,20 Q900,12 1000,20"
                stroke="#FFBE02"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 4, delay: 1.4, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>

          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center relative"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.15, 
                delay: 0.4 + (index * 0.4), // Each step appears after the wave reaches it
                ease: "easeOut" 
              }}
            >
              <motion.div 
                className="w-16 h-16 bg-[#FFBE02] text-[#040404] rounded-full flex items-center justify-center mx-auto mb-6 font-['Poppins'] font-bold text-[18px] relative"
              >
                <span className="relative z-10">{step.step}</span>
              </motion.div>
              
              <motion.h3 
                className="font-['Poppins'] font-semibold text-[18px] text-[#1A1A1A] mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.1, delay: 0.25 + (index * 0.2) }}
              >
                {step.title}
              </motion.h3>
              
              <motion.p 
                className="font-['Poppins'] text-[14px] text-[#6B6B6B]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.1, delay: 0.3 + (index * 0.2) }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublishingProcess;
