'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, BookOpen, X } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
// import emailjs from '@emailjs/browser'; // Not needed - using Resend for this form

const NewsEvents = () => {
  const pathname = usePathname();
  const isNewsPage = pathname === '/news';

  // Add CSS animation for moving glow effect
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes movingGlow {
        0% {
          box-shadow: 
            0 -10px 15px rgba(251, 191, 36, 0.4),
            0 -20px 25px rgba(251, 191, 36, 0.3),
            0 -30px 35px rgba(251, 191, 36, 0.2),
            inset 0 -10px 15px rgba(251, 191, 36, 0.2),
            0 10px 15px rgba(251, 146, 60, 0.4),
            0 20px 25px rgba(251, 146, 60, 0.3),
            0 30px 35px rgba(251, 146, 60, 0.2),
            inset 0 10px 15px rgba(251, 146, 60, 0.2);
        }
        25% {
          box-shadow: 
            10px 0 15px rgba(251, 191, 36, 0.4),
            20px 0 25px rgba(251, 191, 36, 0.3),
            30px 0 35px rgba(251, 191, 36, 0.2),
            inset 10px 0 15px rgba(251, 191, 36, 0.2),
            -10px 0 15px rgba(251, 146, 60, 0.4),
            -20px 0 25px rgba(251, 146, 60, 0.3),
            -30px 0 35px rgba(251, 146, 60, 0.2),
            inset -10px 0 15px rgba(251, 146, 60, 0.2);
        }
        50% {
          box-shadow: 
            0 10px 15px rgba(251, 191, 36, 0.4),
            0 20px 25px rgba(251, 191, 36, 0.3),
            0 30px 35px rgba(251, 191, 36, 0.2),
            inset 0 10px 15px rgba(251, 191, 36, 0.2),
            0 -10px 15px rgba(251, 146, 60, 0.4),
            0 -20px 25px rgba(251, 146, 60, 0.3),
            0 -30px 35px rgba(251, 146, 60, 0.2),
            inset 0 -10px 15px rgba(251, 146, 60, 0.2);
        }
        75% {
          box-shadow: 
            -10px 0 15px rgba(251, 191, 36, 0.4),
            -20px 0 25px rgba(251, 191, 36, 0.3),
            -30px 0 35px rgba(251, 191, 36, 0.2),
            inset -10px 0 15px rgba(251, 191, 36, 0.2),
            10px 0 15px rgba(251, 146, 60, 0.4),
            20px 0 25px rgba(251, 146, 60, 0.3),
            30px 0 35px rgba(251, 146, 60, 0.2),
            inset 10px 0 15px rgba(251, 146, 60, 0.2);
        }
        100% {
          box-shadow: 
            0 -10px 15px rgba(251, 191, 36, 0.4),
            0 -20px 25px rgba(251, 191, 36, 0.3),
            0 -30px 35px rgba(251, 191, 36, 0.2),
            inset 0 -10px 15px rgba(251, 191, 36, 0.2),
            0 10px 15px rgba(251, 146, 60, 0.4),
            0 20px 25px rgba(251, 146, 60, 0.3),
            0 30px 35px rgba(251, 146, 60, 0.2),
            inset 0 10px 15px rgba(251, 146, 60, 0.2);
        }
      }
      
      /* Mobile touch styles to match desktop hover */
      .group-touch .group-hover\\:bg-white,
      .group-touch .group-active\\:bg-white {
        background-color: white !important;
      }
      .group-touch .group-hover\\:text-black,
      .group-touch .group-active\\:text-black {
        color: black !important;
      }
      .group-touch .group-hover\\:text-white,
      .group-touch .group-active\\:text-white {
        color: white !important;
      }
      
      /* Force mobile hover styles */
      .group-touch .group-hover\\:bg-white,
      .group-touch .group-active\\:bg-white,
      .group-touch [class*="group-hover:bg-white"],
      .group-touch [class*="group-active:bg-white"] {
        background-color: white !important;
      }
      .group-touch .group-hover\\:text-black,
      .group-touch .group-active\\:text-black,
      .group-touch [class*="group-hover:text-black"],
      .group-touch [class*="group-active:text-black"] {
        color: black !important;
      }
      .group-touch .group-hover\\:text-white,
      .group-touch .group-active\\:text-white,
      .group-touch [class*="group-hover:text-white"],
      .group-touch [class*="group-active:text-white"] {
        color: white !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);


  // Registration form state
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    cityStateZip: '',
    bookName: '',
    authorName: '',
    genre: '',
    bookVisibility: '',
    bookTopic: '',
    isbn: '',
    numberOfPages: '',
    printedCopies: '',
    soldCopies: '',
    bookReviews: 0,
    ebookFile: null,
    bookCoverFile: null,
    confirmation: false,
    event: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleRegistrationClick = (event: any) => {
    setSelectedEvent(event);
    setRegistrationData(prev => ({ ...prev, event: event.title }));
    setIsRegistrationOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: files?.[0] || null
    }));
  };

  const handleStarRating = (rating: number) => {
    setRegistrationData(prev => ({
      ...prev,
      bookReviews: rating
    }));
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      let manuscriptFileName = 'No file uploaded';
      let bookCoverFileName = 'No file uploaded';

      // Upload files if they exist
      if (registrationData.ebookFile) {
        const manuscriptFormData = new FormData();
        manuscriptFormData.append('file', registrationData.ebookFile);

        const manuscriptResponse = await fetch('/api/upload', {
          method: 'POST',
          body: manuscriptFormData,
        });

        if (manuscriptResponse.ok) {
          const manuscriptResult = await manuscriptResponse.json();
          manuscriptFileName = manuscriptResult.filename;
        }
      }

      if (registrationData.bookCoverFile) {
        const bookCoverFormData = new FormData();
        bookCoverFormData.append('file', registrationData.bookCoverFile);

        const bookCoverResponse = await fetch('/api/upload', {
          method: 'POST',
          body: bookCoverFormData,
        });

        if (bookCoverResponse.ok) {
          const bookCoverResult = await bookCoverResponse.json();
          bookCoverFileName = bookCoverResult.filename;
        }
      }

      // Send email with file attachments
      const emailData = {
        from_name: registrationData.fullName,
        from_email: registrationData.email,
        contact_number: registrationData.contactNumber,
        cityStateZip: registrationData.cityStateZip,
        bookName: registrationData.bookName,
        authorName: registrationData.authorName,
        genre: registrationData.genre,
        bookVisibility: registrationData.bookVisibility,
        bookTopic: registrationData.bookTopic,
        isbn: registrationData.isbn,
        numberOfPages: registrationData.numberOfPages,
        printedCopies: registrationData.printedCopies,
        soldCopies: registrationData.soldCopies,
        bookReviews: registrationData.bookReviews,
        manuscript_file: manuscriptFileName,
        book_cover_file: bookCoverFileName,
        event_name: registrationData.event,
        confirmation: registrationData.confirmation
      };

      const emailResponse = await fetch('/api/send-email-resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      setSubmitStatus('success');

      // Reset form after successful submission
      setTimeout(() => {
        setRegistrationData({
          fullName: '',
          contactNumber: '',
          email: '',
          cityStateZip: '',
          bookName: '',
          authorName: '',
          genre: '',
          bookVisibility: '',
          bookTopic: '',
          isbn: '',
          numberOfPages: '',
          printedCopies: '',
          soldCopies: '',
          bookReviews: 0,
          ebookFile: null,
          bookCoverFile: null,
          confirmation: false,
          event: ''
        });
        setIsRegistrationOpen(false);
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Error sending registration:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to parse date string and subtract days
  const subtractDays = (dateString: string, days: number): string => {
    // Parse date string (handles both "Month Day, Year" and "Month Day-Day, Year" formats)
    const dateMatch = dateString.match(/(\w+)\s+(\d+)(?:-(\d+))?,\s+(\d+)/);
    if (!dateMatch) return dateString;

    const [, month, startDay, endDay, year] = dateMatch;
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = monthNames.indexOf(month);

    if (monthIndex === -1) return dateString;

    // Use start day for calculations
    const day = parseInt(startDay);
    const date = new Date(parseInt(year), monthIndex, day);
    date.setDate(date.getDate() - days);

    const newMonth = monthNames[date.getMonth()];
    const newDay = date.getDate();
    const newYear = date.getFullYear();

    // Format as "Month Day, Year"
    return `${newMonth} ${newDay}, ${newYear}`;
  };

  // Helper function to parse event date and check if it's outdated
  const isEventOutdated = (dateString: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

    // Parse date string (handles both "Month Day, Year" and "Month Day-Day, Year" formats)
    const dateMatch = dateString.match(/(\w+)\s+(\d+)(?:-(\d+))?,\s+(\d+)/);
    if (!dateMatch) return false;

    const [, month, startDay, endDay, year] = dateMatch;
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = monthNames.indexOf(month);

    if (monthIndex === -1) return false;

    // Use end day if it's a date range, otherwise use start day
    const day = endDay ? parseInt(endDay) : parseInt(startDay);
    const eventDate = new Date(parseInt(year), monthIndex, day);
    eventDate.setHours(23, 59, 59, 999); // Set to end of day

    return eventDate < today;
  };

  const allEvents = [
    {
      id: 1,
      title: "2025 American Association of School Librarians",
      date: "October 16-18, 2025",
      location: "St. Louis, MO",
      type: "Conference",
      description: "Join us at the American Association of School Librarians conference to showcase our educational publishing services and connect with school librarians nationwide.",
      attendees: "300+ School Librarians",
      price: "Reg. Deadline: Sep 10, 2025",
      displayCopyDeadline: "Display Copy Deadline - Oct 11, 2025",
      image: "/images/aasl-conference.jpg",
      featured: true
    },
    {
      id: 2,
      title: "2025 New York Library Association",
      date: "November 5-8, 2025",
      location: "Saratoga Springs, NY",
      type: "Conference",
      description: "Join us at the New York Library Association conference to showcase our publishing services and connect with librarians and book industry professionals.",
      attendees: "500+ Librarians & Professionals",
      price: "Reg. Deadline: Oct 5, 2025",
      displayCopyDeadline: "Display Copy Deadline - Oct 31, 2025",
      image: "/images/ny-library-conference.jpg",
      featured: true
    },
    {
      id: 5,
      title: "2026 American Library Association Annual Conference",
      date: "June 26-29, 2026",
      location: "Chicago, IL",
      type: "Conference",
      description: "Join us at the American Library Association Annual Conference to showcase our publishing services and connect with librarians nationwide.",
      attendees: "1000+ Librarians & Professionals",
      price: "Reg. Deadline: May 10, 2026",
      displayCopyDeadline: "Display Copy Deadline - May 17, 2026",
      image: "/images/ala-conference.jpg",
      featured: true
    },
    {
      id: 6,
      title: "2026 California Library Association",
      date: "October 21-23, 2026",
      location: "Riverside, CA",
      type: "Conference",
      description: "Join us at the California Library Association conference to showcase our publishing services and connect with West Coast librarians.",
      attendees: "400+ Librarians & Professionals",
      price: "Reg. Deadline: Sep 13, 2026",
      displayCopyDeadline: "Display Copy Deadline - Sep 20, 2026",
      image: "/images/california-library-conference.jpg",
      featured: true
    },
    {
      id: 7,
      title: "2026 National Council Teachers of English",
      date: "November 20-23, 2026",
      location: "Philadelphia, PA",
      type: "Conference",
      description: "Join us at the National Council Teachers of English conference to showcase our educational publishing services and connect with educators nationwide.",
      attendees: "400+ Teachers & Educators",
      price: "Reg. Deadline: Oct 18, 2026",
      displayCopyDeadline: "Display Copy Deadline - Oct 25, 2026",
      image: "/images/ncte-2026-conference.jpg",
      featured: true
    },
  ];

  // Filter out outdated events
  const upcomingEvents = useMemo(() => {
    return allEvents.filter(event => !isEventOutdated(event.date));
  }, []);

  // Mobile viewport detection and intersection observer
  useEffect(() => {
    const checkScreenSize = () => {
      return window.innerWidth < 768; // md breakpoint
    };

    const isMobile = checkScreenSize();
    if (!isMobile) {
      // On desktop, ensure no mobile effects are active and return early
      const cards = document.querySelectorAll('.event-card');
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.classList.remove('group-touch');
        cardElement.style.animation = 'none';
        cardElement.style.background = 'linear-gradient(to top, black 0%, black 0%, white 0%, white 100%)';
      });
      return; // Exit early - no mobile logic runs on desktop
    }

    // Wait for cards to be rendered
    let hoverTimeout: NodeJS.Timeout;
    let observer: IntersectionObserver;
    let handleScroll: () => void;

    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.event-card');

      observer = new IntersectionObserver(
        (entries) => {
          // Only run on mobile devices
          if (!checkScreenSize()) return;

          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;

            if (entry.isIntersecting) {
              // Clear any existing timeout
              if (hoverTimeout) clearTimeout(hoverTimeout);

              // Remove hover from all other cards first
              cards.forEach((card) => {
                if (card !== target) {
                  const cardElement = card as HTMLElement;
                  cardElement.classList.remove('group-touch');
                  cardElement.style.animation = 'none';
                  cardElement.style.background = 'linear-gradient(to top, black 0%, black 0%, white 0%, white 100%)';
                }
              });

              // Add hover effect to current card after delay
              hoverTimeout = setTimeout(() => {
                // Trigger the same hover effect as desktop
                target.classList.add('group-touch');
                target.style.animation = 'movingGlow 2s ease-in-out infinite';
                target.style.background = 'linear-gradient(to top, #fbbf24 0%, #fbbf24 100%, white 0%, white 0%)';
              }, 800); // 800ms delay before showing hover effect

            } else {
              // Card is out of view - reset to normal
              clearTimeout(hoverTimeout);
              target.classList.remove('group-touch');
              target.style.animation = 'none';
              target.style.background = 'linear-gradient(to top, black 0%, black 0%, white 0%, white 100%)';
            }
          });
        },
        {
          threshold: [0.3, 0.7], // Trigger when 30% visible and when 70% visible
          rootMargin: '0px 0px -10% 0px' // More lenient margin for edge cards
        }
      );

      cards.forEach((card) => observer.observe(card));

      // Fallback for edge cards - check on scroll
      handleScroll = () => {
        // Only run on mobile devices
        if (!checkScreenSize()) return;

        cards.forEach((card) => {
          const cardElement = card as HTMLElement;
          const rect = cardElement.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          const isInFocus = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;

          if (isVisible && isInFocus) {
            // This card should have hover effect
            clearTimeout(hoverTimeout);

            // Remove hover from all other cards
            cards.forEach((otherCard) => {
              if (otherCard !== card) {
                const otherElement = otherCard as HTMLElement;
                otherElement.classList.remove('group-touch');
                otherElement.style.animation = 'none';
                otherElement.style.background = 'linear-gradient(to top, black 0%, black 0%, white 0%, white 100%)';
              }
            });

            // Add hover to current card
            hoverTimeout = setTimeout(() => {
              cardElement.classList.add('group-touch');
              cardElement.style.animation = 'movingGlow 2s ease-in-out infinite';
              cardElement.style.background = 'linear-gradient(to top, #fbbf24 0%, #fbbf24 100%, white 0%, white 0%)';
            }, 800);
          }
        });
      };

      // Add scroll listener as fallback
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Initial check
      handleScroll();

      return () => {
        clearTimeout(hoverTimeout);
        cards.forEach((card) => observer.unobserve(card));
        window.removeEventListener('scroll', handleScroll);
      };
    }, 100); // Small delay to ensure cards are rendered

    // Handle screen size changes
    const handleResize = () => {
      const isStillMobile = checkScreenSize();
      if (!isStillMobile) {
        // If screen size changed to desktop, clean up all mobile effects
        const cards = document.querySelectorAll('.event-card');
        cards.forEach((card) => {
          const cardElement = card as HTMLElement;
          cardElement.classList.remove('group-touch');
          cardElement.style.animation = 'none';
          cardElement.style.background = 'linear-gradient(to top, black 0%, black 0%, white 0%, white 100%)';
        });
        // Remove all mobile event listeners
        window.removeEventListener('scroll', handleScroll);
        cards.forEach((card) => observer.unobserve(card));
        // Clear any pending timeouts
        if (hoverTimeout) clearTimeout(hoverTimeout);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [upcomingEvents]); // Re-run when events change

  const newsItems = [
    {
      id: 1,
      title: "Duck Book Writers Expands Services to Include Audio Book Production",
      date: "February 10, 2025",
      category: "Company News",
      excerpt: "We're excited to announce our new audio book production services, helping authors reach wider audiences through audio formats."
    },
    {
      id: 2,
      title: "Local Author Judith Hobson Celebrates Book Launch Success",
      date: "January 28, 2025",
      category: "Author Success",
      excerpt: "Judith Hobson's memoir 'An Old Little Lady' has gained recognition in the local community, with strong sales and positive reader feedback since its publication."
    },
    {
      id: 3,
      title: "New Partnership with Major Book Distributors",
      date: "January 28, 2025",
      category: "Partnerships",
      excerpt: "Duck Book Writers has formed strategic partnerships with leading book distributors to expand our authors' reach globally."
    }
  ];

  // const getEventIcon = (type: string) => {
  //   switch (type) {
  //     case 'Workshop': return <PenTool className="w-5 h-5" />;
  //     case 'Masterclass': return <BookOpen className="w-5 h-5" />;
  //     case 'Networking': return <Users className="w-5 h-5" />;
  //     case 'Festival': return <Award className="w-5 h-5" />;
  //     case 'Conference': return <Star className="w-5 h-5" />;
  //     default: return <Calendar className="w-5 h-5" />;
  //   }
  // };

  // const getEventColor = (type: string) => {
  //   switch (type) {
  //     case 'Workshop': return 'bg-blue-100 text-blue-600';
  //     case 'Masterclass': return 'bg-purple-100 text-purple-600';
  //     case 'Networking': return 'bg-green-100 text-green-600';
  //     case 'Festival': return 'bg-yellow-100 text-yellow-600';
  //     case 'Conference': return 'bg-red-100 text-red-600';
  //     default: return 'bg-gray-100 text-gray-600';
  //   }
  // };

  if (isNewsPage) {
    return (
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="font-['Poppins'] font-bold text-4xl sm:text-5xl lg:text-6xl text-black mb-4">
              News & Events
            </h1>
            <p className="font-['Poppins'] text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news and upcoming events at Duck Book Writers
            </p>
          </motion.div>

          {/* Featured Events */}
          <div className="mb-16">
            <h2 className="font-['Poppins'] font-bold text-3xl sm:text-4xl text-black mb-8 text-center">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={`group event-card bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col h-full relative ${event.featured ? 'ring-2 ring-yellow-400' : ''
                    }`}
                  style={{
                    background: 'linear-gradient(to top, black 0%, black 0%, white 0%, white 100%)',
                    transition: 'background 0.3s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.animation = 'movingGlow 2s ease-in-out infinite';
                    e.currentTarget.style.background = 'linear-gradient(to top, #fbbf24 0%, #fbbf24 100%, white 0%, white 0%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.animation = 'none';
                    e.currentTarget.style.background = 'linear-gradient(to top, #fbbf24 0%, #fbbf24 0%, white 0%, white 100%)';
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.animation = 'movingGlow 2s ease-in-out infinite';
                    e.currentTarget.style.background = 'linear-gradient(to top, #fbbf24 0%, #fbbf24 100%, white 0%, white 0%)';
                    // Add group class for mobile touch
                    e.currentTarget.classList.add('group-touch');
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.animation = 'none';
                    e.currentTarget.style.background = 'linear-gradient(to top, black 0%, black 0%, white 0%, white 100%)';
                    // Remove group class for mobile touch
                    e.currentTarget.classList.remove('group-touch');
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.025 }}
                  whileHover={{ y: -5 }}
                >
                  {event.featured && (
                    <div className="bg-yellow-400 group-hover:bg-white group-hover:text-black text-black text-center py-2 font-['Poppins'] font-bold text-sm transition-colors duration-300 group-active:bg-white group-active:text-black">
                      FEATURED EVENT
                    </div>
                  )}

                  <div className="p-4 sm:p-6 flex flex-col h-full">
                    <div className="flex items-center justify-start mb-4">
                      <div className="text-left">
                        <div className="text-sm text-gray-500 group-hover:text-white group-active:text-white transition-colors duration-300">{event.attendees}</div>
                        <div className="font-bold text-yellow-600 group-hover:text-white group-active:text-white transition-colors duration-300">{event.price}</div>
                      </div>
                    </div>

                    <h3 className="font-['Poppins'] font-bold text-lg sm:text-xl text-black group-hover:text-white group-active:text-white mb-3 line-clamp-2 transition-colors duration-300">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 group-hover:text-white group-active:text-white transition-colors duration-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600 group-hover:text-white group-active:text-white transition-colors duration-300">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.displayCopyDeadline}</span>
                      </div>
                      <div className="flex items-center text-gray-600 group-hover:text-white group-active:text-white transition-colors duration-300">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 group-hover:text-white group-active:text-white text-sm mb-4 line-clamp-3 flex-grow transition-colors duration-300">
                      {event.description}
                    </p>

                    <div className="mt-auto">
                      <button
                        onClick={() => handleRegistrationClick(event)}
                        className="w-full bg-yellow-400 group-hover:bg-white group-hover:text-black group-active:bg-white group-active:text-black text-black font-['Poppins'] font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-sm sm:text-base"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Latest News */}
          <div>
            <h2 className="font-['Poppins'] font-bold text-3xl sm:text-4xl text-black mb-8 text-center">
              Latest News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((news, index) => (
                <motion.article
                  key={news.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: (index + 6) * 0.025 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                        {news.category}
                      </span>
                      <span className="text-sm text-gray-500">{news.date}</span>
                    </div>

                    <h3 className="font-['Poppins'] font-bold text-xl text-black mb-3 line-clamp-2">
                      {news.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>

                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* Registration Modal */}
        {isRegistrationOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
            {/* Floating Book on Right - Hidden on mobile */}
            <motion.div
              className="absolute top-1/2 right-10 z-10 transform -translate-y-1/2 hidden lg:block"
              animate={{
                y: [0, -15, 0],
                rotate: [0, -8, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/images/bookfare.jpg"
                alt="Floating Book"
                width={420}
                height={450}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>

            <motion.div
              className="group bg-white/90 hover:bg-yellow-400 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              style={{
                background: 'linear-gradient(to top, #fbbf24 0%, #fbbf24 0%, white 0%, white 100%)',
                transition: 'background 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to top, #fbbf24 0%, #fbbf24 100%, white 0%, white 0%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to top, #fbbf24 0%, #fbbf24 0%, white 0%, white 100%)';
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-['Poppins'] font-bold text-xl text-black group-hover:text-white transition-colors duration-300">
                  Register for {(selectedEvent as any)?.title}
                </h3>
                <button
                  onClick={() => setIsRegistrationOpen(false)}
                  className="text-gray-500 hover:text-yellow-500 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Full Name? *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={registrationData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Contact Number? *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={registrationData.contactNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    E-mail Address? *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={registrationData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* City, State & Zip Code */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    City, State & Zip Code? *
                  </label>
                  <input
                    type="text"
                    name="cityStateZip"
                    value={registrationData.cityStateZip}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* Book Name */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Book Name? *
                  </label>
                  <input
                    type="text"
                    name="bookName"
                    value={registrationData.bookName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* Author Name */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Author Name? *
                  </label>
                  <input
                    type="text"
                    name="authorName"
                    value={registrationData.authorName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* Genre */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Genre Of The Book? *
                  </label>
                  <input
                    type="text"
                    name="genre"
                    value={registrationData.genre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* Book Visibility */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Visibility Of The Book? (Name the platform(s) on which the book is available)
                  </label>
                  <input
                    type="text"
                    name="bookVisibility"
                    value={registrationData.bookVisibility}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* Book Topic */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Topic Of The Book? (Summary) *
                  </label>
                  <textarea
                    name="bookTopic"
                    value={registrationData.bookTopic}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* ISBN */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    International Standard Book Number (ISBN)? *
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={registrationData.isbn}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* Number of Pages */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Number Of Book Pages? *
                  </label>
                  <input
                    type="number"
                    name="numberOfPages"
                    value={registrationData.numberOfPages}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* Printed Copies */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Number Of Printed Copies? (if available)
                  </label>
                  <input
                    type="number"
                    name="printedCopies"
                    value={registrationData.printedCopies}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* Sold Copies */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Number Of Sold Copies? (eBook and/or Printed)
                  </label>
                  <input
                    type="number"
                    name="soldCopies"
                    value={registrationData.soldCopies}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                    placeholder="Your answer"
                  />
                </div>

                {/* Book Reviews - Star Rating */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-4 transition-colors duration-300">
                    Book Reviews Rating? *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarRating(star)}
                        className={`transition-all duration-300 transform hover:scale-110 active:scale-95 ${star <= registrationData.bookReviews
                            ? 'text-black'
                            : 'text-white group-hover:text-white'
                          }`}
                      >
                        <span className="text-2xl">
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {registrationData.bookReviews > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="font-['Poppins'] font-semibold text-yellow-600">
                            {registrationData.bookReviews} out of 5 stars
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${i < registrationData.bookReviews
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                  }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500">Click to rate your book</span>
                      )}
                    </div>
                    {registrationData.bookReviews > 0 && (
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {registrationData.bookReviews === 1 && 'Poor'}
                        {registrationData.bookReviews === 2 && 'Fair'}
                        {registrationData.bookReviews === 3 && 'Good'}
                        {registrationData.bookReviews === 4 && 'Very Good'}
                        {registrationData.bookReviews === 5 && 'Excellent'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Manuscript Upload */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Upload Manuscript (PDF, DOC, DOCX) *
                  </label>
                  <input
                    type="file"
                    name="ebookFile"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black group-hover:file:bg-white group-hover:file:text-black"
                  />
                  {registrationData.ebookFile && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {(registrationData.ebookFile as File).name}
                    </p>
                  )}
                </div>

                {/* Book Cover Upload */}
                <div>
                  <label className="block font-['Poppins'] font-medium text-sm text-black group-hover:text-white mb-1 transition-colors duration-300">
                    Upload Book Cover (JPG, PNG, GIF) *
                  </label>
                  <input
                    type="file"
                    name="bookCoverFile"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.gif"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-['Poppins'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black group-hover:file:bg-white group-hover:file:text-black"
                  />
                  {registrationData.bookCoverFile && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {(registrationData.bookCoverFile as File).name}
                    </p>
                  )}
                </div>

                {/* Confirmation Checkbox */}
                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="confirmation"
                      checked={registrationData.confirmation}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, confirmation: e.target.checked }))}
                      required
                      className="mt-1 w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                    />
                    <span className="font-['Poppins'] text-sm text-black">
                      I hereby confirm my participation in the {(selectedEvent as any)?.title} and agree to enroll my book with Duck Book Writers. I acknowledge and accept all event deadlines, requirements, and the associated fee, which I understand is strictly non-refundable under any circumstances. *
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black group-hover:bg-white group-hover:text-black disabled:bg-gray-400 text-white font-['Poppins'] font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-3 bg-yellow-100 border border-yellow-400 text-black rounded-lg font-['Poppins'] text-sm">
                    Registration submitted successfully! We&apos;ll contact you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-['Poppins'] text-sm">
                    There was an error submitting your registration. Please try again.
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-background.png"
          alt="News Events Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-['Poppins'] font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-[64px] leading-[1.2] tracking-[0.64px] sm:tracking-[0.8px] lg:tracking-[1px] xl:tracking-[1.28px] text-black mb-4">
            News & Events
          </h2>
          <p className="font-['Poppins'] font-normal text-base sm:text-lg lg:text-[18px] leading-[1.4] text-[#6b6b6b] max-w-3xl mx-auto mb-8">
            Stay updated with everything happening at Duck Book Writers.
          </p>
          {!isNewsPage && (
            <Link href="/news">
              <button className="bg-black hover:bg-gray-800 text-white font-['Poppins'] font-semibold px-6 sm:px-8 py-1 rounded-[50px] text-sm sm:text-base lg:text-[18px] w-[120px] sm:w-[130px] lg:w-[146px] h-[36px] sm:h-[40px] lg:h-[43px] flex items-center justify-center mx-auto">
                View All
              </button>
            </Link>
          )}
        </div>

        {/* News Cards and Event - Show 2 news + 1 event on homepage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* News Cards - Show only 2 */}
          {newsItems.slice(0, 2).map((news, index) => (
            <motion.article
              key={news.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: index * 0.025 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                    {news.category}
                  </span>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>

                <h3 className="font-['Poppins'] font-bold text-xl text-black mb-3 line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
              </div>
            </motion.article>
          ))}

          {/* Event Card - Show 1 featured event */}
          {upcomingEvents.slice(0, 1).map((event, index) => (
            <motion.div
              key={event.id}
              className="group event-card bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col h-full relative"
              style={{
                background: 'linear-gradient(to top, black 0%, black 0%, white 0%, white 100%)',
                transition: 'background 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.animation = 'movingGlow 2s ease-in-out infinite';
                e.currentTarget.style.background = 'linear-gradient(to top, #fbbf24 0%, #fbbf24 100%, white 0%, white 0%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.animation = 'none';
                e.currentTarget.style.background = 'linear-gradient(to top, #fbbf24 0%, #fbbf24 0%, white 0%, white 100%)';
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.animation = 'movingGlow 2s ease-in-out infinite';
                e.currentTarget.style.background = 'linear-gradient(to top, #fbbf24 0%, #fbbf24 100%, white 0%, white 0%)';
                e.currentTarget.classList.add('group-touch');
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.animation = 'none';
                e.currentTarget.style.background = 'linear-gradient(to top, black 0%, black 0%, white 0%, white 100%)';
                e.currentTarget.classList.remove('group-touch');
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: (index + 2) * 0.025 }}
              whileHover={{ y: -5 }}
            >
              {event.featured && (
                <div className="bg-yellow-400 group-hover:bg-white group-hover:text-black text-black text-center py-2 font-['Poppins'] font-bold text-sm transition-colors duration-300 group-active:bg-white group-active:text-black">
                  FEATURED EVENT
                </div>
              )}

              <div className="p-4 sm:p-6 flex flex-col h-full">
                <div className="flex items-center justify-start mb-4">
                  <div className="text-left">
                    <div className="text-sm text-gray-500 group-hover:text-white group-active:text-white transition-colors duration-300">{event.attendees}</div>
                    <div className="font-bold text-yellow-600 group-hover:text-white group-active:text-white transition-colors duration-300">{event.price}</div>
                  </div>
                </div>

                <h3 className="font-['Poppins'] font-bold text-lg sm:text-xl text-black group-hover:text-white group-active:text-white mb-3 line-clamp-2 transition-colors duration-300">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 group-hover:text-white group-active:text-white transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 group-hover:text-white group-active:text-white transition-colors duration-300">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.displayCopyDeadline}</span>
                  </div>
                  <div className="flex items-center text-gray-600 group-hover:text-white group-active:text-white transition-colors duration-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 group-hover:text-white group-active:text-white text-sm mb-4 line-clamp-3 flex-grow transition-colors duration-300">
                  {event.description}
                </p>

                <div className="mt-auto">
                  <button
                    onClick={() => handleRegistrationClick(event)}
                    className="w-full bg-yellow-400 group-hover:bg-white group-hover:text-black group-active:bg-white group-active:text-black text-black font-['Poppins'] font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-sm sm:text-base"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
