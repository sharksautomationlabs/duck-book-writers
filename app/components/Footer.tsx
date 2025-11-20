"use client"
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// Define interfaces for the data structures
interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

interface SocialLink {
  icon: string;
  alt: string;
  href: string;
}

const Footer: React.FC = () => {
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
      [name]: value.trim()
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

      // EmailJS is now configured and ready to use

      // Format project value for better readability
      const formatProjectValue = (value: string) => {
        if (!value) return 'Not specified';
        // Capitalize first letter of each word
        return value.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@duckbookwriters.com',
          from_name: formData.name,
          from_email: formData.email,
          contact_number: formData.contact || 'Not provided',
          project: formatProjectValue(formData.project),
          budget: formData.budget || 'No budget specified',
        },
        publicKey
      );

      console.log('Email sent successfully:', result);

      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          contact: '',
          project: '',
          budget: ''
        });
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo: ContactInfo[] = [
    { icon: Phone, text: "+1 (346) 463-7721" },
    { icon: Mail, text: "contact@duckbookwriters.com" },
    { icon: MapPin, text: "22023 Rustic Canyon Ln, Richmond,\nTX 77469, USA" },
  ];

  const socialLinks: SocialLink[] = [
    { icon: "/images/facebook.png", alt: "Facebook", href: "https://www.facebook.com/share/1C6vAB9LkC/" },
    { icon: "/images/instagram.svg", alt: "Instagram", href: "https://www.instagram.com/duckbookwriters?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { icon: "/images/linkedin.png", alt: "LinkedIn", href: "https://www.linkedin.com/posts/duckbookwriters_bookwriter-bookwriters-book-activity-7369508314637914113-K3AA?utm_source=share&utm_medium=member_android&rcm=ACoAAES1QwQBkN7cj2uiSK3N8zIARlbIo_Z4iiU" },
    // { icon: "/images/x.png", alt: "X", href: "#" },
  ];

  return (
    <>
      <footer className="relative mt-16 sm:mt-20 lg:mt-24 mb-4">
        <div className="relative max-w-screen-2xl mx-auto px-4">
          
          {/* DIV 1: Main Content (Logo, Details, Nav) */}
          <div className="relative bg-[#F8F9FA] rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] z-10">

            <div className="pt-12 sm:pt-16 lg:pt-20 pb-4 sm:pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 px-4 sm:px-8 lg:px-24">
                {/* Left Column - Logo and Contact Info */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  {/* Logo */}
                  <div className="mb-6 sm:mb-8">
                    <Image
                      src="/images/duck-logo-final.png"
                      alt="Duck Book Writers Logo"
                      width={200}
                      height={80}
                      className="w-40 sm:w-48 lg:w-52 h-auto"
                    />
            </div>

                  {/* Contact Info */}
                  <div className="space-y-4 sm:space-y-5 w-full">
                  {contactInfo.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 justify-center lg:justify-start">
                        <item.icon className="mt-1 flex-shrink-0 w-6 h-6 text-yellow-500" />
                      {index === 0 ? (
                            <a href="tel:+13464637721" className="font-['Poppins'] text-sm sm:text-base text-gray-600 hover:text-yellow-500 transition-colors duration-200 text-center lg:text-left">
                          {item.text}
                        </a>
                      ) : index === 1 ? (
                          <a href="mailto:contact@duckbookwriters.com" className="font-['Poppins'] text-sm sm:text-base text-gray-600 hover:text-yellow-500 transition-colors duration-200 text-center lg:text-left">
                          {item.text}
                        </a>
                      ) : (
                          <p className="font-['Poppins'] text-sm sm:text-base text-gray-600 whitespace-pre-line text-center lg:text-left">{item.text}</p>
                      )}
                    </div>
                  ))}
                </div>

                  {/* Social Media Links */}
                  <div className="mt-6 sm:mt-8 w-full">
                    <h4 className="font-['Poppins'] font-semibold text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 text-center lg:text-left">
                      Follow Us
                    </h4>
                    <div className="flex items-start gap-4 w-full justify-center lg:justify-start">
                      <div className="flex gap-3 mt-1">
                        {socialLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-yellow-100 transition-colors duration-200"
                          >
                            <Image
                              src={link.icon}
                              alt={link.alt}
                              width={20}
                              height={20}
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${link.alt === 'Facebook' ? 'object-contain' : ''}`}
                              style={link.alt === 'Facebook' ? { objectFit: 'contain' } : {}}
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact Form */}
                <div className="bg-white rounded-[15px] sm:rounded-[20px] p-4 sm:p-6 lg:p-8 shadow-lg">
                  <h3 className="font-['Poppins'] font-bold text-xl sm:text-2xl text-[#1A1A1A] mb-4 sm:mb-6">
                    Let&apos;s Talk About Your Book
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block font-['Poppins'] font-medium text-xs sm:text-sm text-[#1A1A1A] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-[8px] font-['Poppins'] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ffbe02] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block font-['Poppins'] font-medium text-xs sm:text-sm text-[#1A1A1A] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-[8px] font-['Poppins'] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ffbe02] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Contact Field */}
                    <div>
                      <label htmlFor="contact" className="block font-['Poppins'] font-medium text-xs sm:text-sm text-[#1A1A1A] mb-1">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-[8px] font-['Poppins'] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ffbe02] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your contact number"
                      />
                    </div>

                    {/* Project/Services Field */}
                    <div className="relative">
                      <label htmlFor="project" className="block font-['Poppins'] font-medium text-xs sm:text-sm text-[#1A1A1A] mb-1">
                        Project/Services *
                      </label>
                      <select
                        id="project"
                        name="project"
                        value={formData.project}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-[8px] font-['Poppins'] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ffbe02] focus:border-transparent transition-all duration-200 appearance-none bg-white"
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
                      <label htmlFor="budget" className="block font-['Poppins'] font-medium text-xs sm:text-sm text-[#1A1A1A] mb-1">
                        Budget (Optional)
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-[8px] font-['Poppins'] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ffbe02] focus:border-transparent transition-all duration-200 appearance-none bg-white"
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
                      className="w-full bg-[#ffbe02] hover:bg-[#e6aa02] disabled:bg-gray-400 text-[#040404] font-['Poppins'] font-semibold px-4 py-2 rounded-[40px] text-xs sm:text-sm transition-all duration-200 flex items-center justify-center hover-lift smooth-transition"
                    >
                      {isSubmitting ? 'Sending...' : 'Get Started'}
                    </button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="p-2 bg-green-100 border border-green-400 text-green-700 rounded-[8px] font-['Poppins'] text-xs">
                        Thank you! Your message has been sent. We&apos;ll get back to you soon.
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded-[8px] font-['Poppins'] text-xs">
                        There was an error sending your message. Please try again.
                      </div>
                    )}
                  </form>
                </div>

              </div>

            </div>
          </div>

          {/* DIV 2: Links and Social Media */}
          <div className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] mt-4 py-6 sm:py-8 px-4 sm:px-8 lg:px-24">
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 sm:gap-6">
              {/* Links - centered on mobile, right aligned on desktop */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:ml-auto sm:justify-end w-full sm:w-auto text-center sm:text-left">
                <Link href="#" className="flex items-center gap-2 font-['Poppins'] text-xs sm:text-sm text-gray-600 hover:text-yellow-500 transition-colors duration-200">
                    Privacy Policy
                    <ChevronRight className="text-yellow-500 w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                <Link href="#" className="flex items-center gap-2 font-['Poppins'] text-xs sm:text-sm text-gray-600 hover:text-yellow-500 transition-colors duration-200">
                  Terms of Service
                    <ChevronRight className="text-yellow-500 w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                <Link href="#" className="flex items-center gap-2 font-['Poppins'] text-xs sm:text-sm text-gray-600 hover:text-yellow-500 transition-colors duration-200">
                  Cookie Policy
                  <ChevronRight className="text-yellow-500 w-3 h-3 sm:w-4 sm:h-4" />
                      </Link>
              </div>

            </div>
          </div>

          {/* DIV 3: Copyright Bar */}
          <div className="bg-[#ffbe02] rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] mt-2 py-1 text-center">
            <p className="font-['Poppins'] text-[10px] sm:text-xs text-gray-800 font-medium">
             A Project of ECOMMERCE SHARKS LLC |  © 2025 Duck Book Writers. All Rights Reserved.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;


