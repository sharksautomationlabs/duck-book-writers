'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Palette, 
  Megaphone, 
  Globe, 
  Headphones, 
  Shield, 
  Star,
  Users,
  Award,
  Clock
} from 'lucide-react';
import CalendlyWidget from './CalendlyWidget';

const Services = () => {

  const services = [
    {
      icon: BookOpen,
      title: "Publishing Services",
      description: "Complete book publishing from manuscript to market",
      features: [
        "Manuscript evaluation and editing",
        "ISBN assignment and registration",
        "Print and digital publishing",
        "Global distribution setup"
      ]
    },
    {
      icon: Palette,
      title: "Design & Layout",
      description: "Professional cover design and interior layout",
      features: [
        "Custom cover design",
        "Interior layout and typography",
        "E-book formatting",
        "Print-ready file preparation"
      ]
    },
    {
      icon: Megaphone,
      title: "Marketing & Promotion",
      description: "Strategic marketing campaigns to boost visibility",
      features: [
        "Social media marketing",
        "Book launch campaigns",
        "Press release distribution",
        "Author website development"
      ]
    },
    {
      icon: Globe,
      title: "Distribution",
      description: "Global distribution across all major platforms",
      features: [
        "Amazon Kindle Direct Publishing",
        "Apple Books and Google Play",
        "Barnes & Noble Nook",
        "International distribution"
      ]
    },
    {
      icon: Headphones,
      title: "Author Support",
      description: "Dedicated support throughout your publishing journey",
      features: [
        "Personal publishing consultant",
        "24/7 customer support",
        "Author resource library",
        "Community access"
      ]
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous editing and quality control processes",
      features: [
        "Professional editing services",
        "Proofreading and copyediting",
        "Quality control checks",
        "Final review and approval"
      ]
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "10+ Years Experience",
      description: "Over a decade of publishing expertise"
    },
    {
      icon: BookOpen,
      title: "500+ Books Published",
      description: "Successfully launched hundreds of titles"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Distribution in 190+ countries worldwide"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance for our authors"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation",
      description: "Initial discussion about your book and goals"
    },
    {
      step: "02", 
      title: "Editing",
      description: "Professional editing and manuscript preparation"
    },
    {
      step: "03",
      title: "Design",
      description: "Cover design and interior layout creation"
    },
    {
      step: "04",
      title: "Publishing",
      description: "Publication across all major platforms"
    },
    {
      step: "05",
      title: "Marketing",
      description: "Strategic promotion and marketing campaigns"
    }
  ];


  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden bg-white">
        {/* Background container */}
        <div 
          className="absolute top-0 left-0 h-full w-full overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(255, 224, 51, 0.25) 0%, rgba(255, 224, 51, 0) 70%), linear-gradient(to bottom, #FDFDFD, #F5F6FF)'
          }}
        ></div>

        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 relative z-10 h-full flex items-center pt-8 sm:pt-0">
          <div className="text-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8"
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 bg-[#FFBE02] rounded-full mb-6"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <BookOpen className="w-10 h-10 text-[#040404]" />
              </motion.div>
            </motion.div>

            <motion.h1 
              className="font-['Poppins'] font-semibold text-4xl sm:text-5xl lg:text-[64px] leading-[1.2] tracking-[0.5px] sm:tracking-[0.8px] lg:tracking-[1.28px] text-[#1A1A1A] mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            >
              Our Services
            </motion.h1>
            
            <motion.h2 
              className="font-['Poppins'] font-medium text-xl sm:text-2xl lg:text-[32px] text-[#1A1A1A] mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
            >
              Comprehensive Publishing Solutions for Every Author
            </motion.h2>
            
            <motion.p 
              className="font-['Poppins'] font-normal text-sm sm:text-base lg:text-[18px] leading-[1.7] text-[#6B6B6B] max-w-4xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
            >
              From manuscript to bestseller, we provide end-to-end publishing services that bring your stories to life and connect them with readers worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
              className="flex justify-center items-center gap-4"
            >
              <motion.div
                className="flex items-center gap-2 text-[#6B6B6B] font-['Poppins'] text-sm"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Star className="w-4 h-4 text-[#FFBE02]" />
                <span>Trusted by 500+ Authors</span>
              </motion.div>
              <div className="w-1 h-1 bg-[#6B6B6B] rounded-full"></div>
              <motion.div
                className="flex items-center gap-2 text-[#6B6B6B] font-['Poppins'] text-sm"
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Globe className="w-4 h-4 text-[#FFBE02]" />
                <span>Global Distribution</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-[20px] p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover-lift smooth-transition group relative overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Hover background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#FFBE02]/5 to-[#001B86]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#FFBE02] rounded-[15px] flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#e6aa02] transition-colors duration-300"
                      whileHover={{ 
                        rotate: [0, -5, 5, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#040404] transition-colors duration-300" />
                    </motion.div>
                    
                    <h3 className="font-['Poppins'] font-bold text-lg sm:text-xl lg:text-[24px] text-[#1A1A1A] mb-2 sm:mb-3 group-hover:text-[#FFBE02] transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="font-['Poppins'] text-sm sm:text-base lg:text-[16px] text-[#6B6B6B] mb-4 sm:mb-6 leading-[1.6]">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center font-['Poppins'] text-xs sm:text-sm lg:text-[14px] text-[#6B6B6B]"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.1 * featureIndex }}
                        >
                          <motion.div 
                            className="w-2 h-2 bg-[#FFBE02] rounded-full mr-3 flex-shrink-0"
                            whileHover={{ scale: 1.5 }}
                          />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CalendlyWidget 
                        url="https://calendly.com/contact-duckbookwriters/30min"
                        text="Learn More"
                        size="md"
                        fullWidth={true}
                        className="w-full bg-[#FFBE02] hover:bg-[#e6aa02] text-[#040404] font-['Poppins'] font-semibold px-6 py-3 rounded-[50px] text-[14px] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      />
                      </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F8F9FA]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.h2 
              className="font-['Poppins'] font-semibold text-3xl sm:text-4xl lg:text-[48px] text-[#1A1A1A] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Why Choose Duck Book Writers?
            </motion.h2>
            <motion.p 
              className="font-['Poppins'] text-sm sm:text-base lg:text-[18px] text-[#6B6B6B] max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              We combine industry expertise with personalized service to deliver exceptional results for every author.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: 0.05 * index, ease: "easeOut" }}
                  whileHover={{ y: -10 }}
                >
                  <motion.div 
                    className="w-20 h-20 bg-[#FFBE02] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#e6aa02] transition-colors duration-300 relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <IconComponent className="w-10 h-10 text-[#040404] transition-colors duration-300 relative z-10" />
                  </motion.div>
                  
                  <motion.h3 
                    className="font-['Poppins'] font-semibold text-[20px] text-[#1A1A1A] mb-3 group-hover:text-[#FFBE02] transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + 0.1 * index }}
                  >
                    {item.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="font-['Poppins'] text-[14px] text-[#6B6B6B]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + 0.1 * index }}
                  >
                    {item.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1920px] mx-auto px-16 lg:px-24 xl:px-32">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.h2 
              className="font-['Poppins'] font-semibold text-3xl sm:text-4xl lg:text-[48px] text-[#1A1A1A] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Our Publishing Process
            </motion.h2>
            <motion.p 
              className="font-['Poppins'] text-sm sm:text-base lg:text-[18px] text-[#6B6B6B] max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
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
              transition={{ duration: 0.25, delay: 0.25 }}
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
                  duration: 0.3, 
                  delay: 0.8 + (index * 0.8), // Each step appears after the wave reaches it
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
                  transition={{ duration: 0.2, delay: 0.5 + (index * 0.4) }}
                >
                  {step.title}
                </motion.h3>
                
                <motion.p 
                  className="font-['Poppins'] text-[14px] text-[#6B6B6B]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: 0.6 + (index * 0.4) }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
    </div>
  );
};

export default Services;
