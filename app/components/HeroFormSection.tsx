'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const HeroFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    project: '',
    budget: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      const serviceId = 'service_ms74fti';
      const templateId = 'template_kagzkck';
      const publicKey = 'nRYR8C_VGeFw1myb9';

      // Format project value for better readability
      const formatProjectValue = (value: string) => {
        if (!value) return 'Not specified';
        // Capitalize first letter of each word
        return value.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
      };

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        contact_number: formData.contact || 'Not provided',
        project_service: formatProjectValue(formData.project),
        project: formatProjectValue(formData.project), // Also send as 'project' for compatibility
        budget: formData.budget || 'No budget specified',
        to_name: 'Duck Book Writers'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        contact: '',
        project: '',
        budget: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full min-h-[400px] bg-white py-8 lg:py-12">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Contact Form */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

            <div className="bg-yellow-400 rounded-[20px] p-6 sm:p-8 shadow-lg max-w-md mx-auto lg:mx-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block font-['Poppins'] font-medium text-sm text-[#1A1A1A] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-[8px] font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-[#ffbe02] focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block font-['Poppins'] font-medium text-sm text-[#1A1A1A] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-[8px] font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-[#ffbe02] focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Contact Field */}
                <div>
                  <label htmlFor="contact" className="block font-['Poppins'] font-medium text-sm text-[#1A1A1A] mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-[8px] font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-[#ffbe02] focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter your contact number"
                  />
                </div>

                {/* Project/Services Field */}
                <div className="relative">
                  <label htmlFor="project" className="block font-['Poppins'] font-medium text-sm text-[#1A1A1A] mb-1">
                    Project/Services *
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-[8px] font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-[#ffbe02] focus:border-transparent transition-all duration-200 appearance-none bg-white"
                    style={{ 
                      position: 'relative', 
                      zIndex: 10,
                      backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3e%3c/svg%3e")',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Select a project/service</option>
                    <option value="ghost writing">Ghost Writing</option>
                    <option value="publishing">Publishing</option>
                    <option value="editing">Editing</option>
                    <option value="marketing">Marketing</option>
                    <option value="distribution">Distribution</option>
                    <option value="printing">Printing</option>
                    <option value="book to youtube">Book to YouTube</option>
                  </select>
                </div>

                {/* Budget Field */}
                <div className="relative">
                  <label htmlFor="budget" className="block font-['Poppins'] font-medium text-sm text-[#1A1A1A] mb-1">
                    Budget (Optional)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-[8px] font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-[#ffbe02] focus:border-transparent transition-all duration-200 appearance-none bg-white"
                    style={{ 
                      position: 'relative', 
                      zIndex: 10,
                      backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3e%3c/svg%3e")',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Select budget range</option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500 - $1,000">$500 - $1,000</option>
                    <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="Over $10,000">Over $10,000</option>
                    <option value="Let's discuss">Let&apos;s discuss</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-['Poppins'] font-semibold px-4 py-3 rounded-[40px] text-sm transition-all duration-200 flex items-center justify-center hover-lift smooth-transition"
                >
                  {isSubmitting ? 'Sending...' : 'Get Started'}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-2 bg-green-100 border border-green-400 text-green-700 rounded-[8px] font-['Poppins'] text-sm">
                    Thank you! Your message has been sent. We&apos;ll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded-[8px] font-['Poppins'] text-sm">
                    There was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right Side: Award-Winning Books */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >

            {/* Book Display */}
            <div className="relative w-full max-w-[800px] sm:max-w-[900px] lg:max-w-[1000px] h-[600px] sm:h-[700px] lg:h-[800px] mx-auto lg:mx-0">
              
              {/* Center Book */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                animate={{
                  y: [-5, 5, -5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="relative w-80 h-96 sm:w-96 sm:h-[448] lg:w-[448] lg:h-[512] group">
                  <Image
                    src="/images/books/book1.jpg"
                    alt="Award Winning Book 1"
                    width={448}
                    height={512}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </motion.div>

              {/* Left Book */}
              <motion.div
                className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-0"
                animate={{
                  y: [-8, 8, -8],
                  rotate: [-25, -25, -25]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="relative w-64 h-80 sm:w-72 sm:h-88 lg:w-80 lg:h-96 group">
                  <Image
                    src="/images/books/book2.jpg"
                    alt="Award Winning Book 2"
                    width={320}
                    height={384}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </motion.div>

              {/* Right Book */}
              <motion.div
                className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 z-0"
                animate={{
                  y: [-8, 8, -8],
                  rotate: [25, 25, 25]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="relative w-64 h-80 sm:w-72 sm:h-88 lg:w-80 lg:h-96 group">
                  <Image
                    src="/images/books/book3.jpg"
                    alt="Award Winning Book 3"
                    width={320}
                    height={384}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
        
        {/* Section Heading - Below form and books */}
        <motion.div
          className="text-center pt-8 pb-2"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-['Poppins'] font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4">
            Start Your <span className="text-yellow-400">Publishing</span> Journey
          </h2>
          <p className="font-['Poppins'] text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your manuscript into a published masterpiece with our comprehensive publishing services and expert support.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroFormSection;
