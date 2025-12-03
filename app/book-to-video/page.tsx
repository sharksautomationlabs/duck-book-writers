'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircle, ArrowRight, 
  MonitorPlay, Sparkles,
  Menu, Search, Mic, Bell, Share2, MoreVertical, ChevronLeft, ChevronRight, X
} from 'lucide-react';

// --- THE "BAAP LEVEL" VIDEO SERVICES SECTION ---
const VideoConversionServices = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#fafaf9] overflow-visible relative"> 
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#FFBE02]/5 rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-purple-500/5 rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Modern Title */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-24 lg:mb-40 relative"
        > 
          <span className="inline-block py-1.5 px-3 sm:px-4 rounded-full bg-[#FFBE02]/10 text-[#FFBE02] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-3 sm:mb-4 border border-[#FFBE02]/20">
            Premium Production
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900 font-serif tracking-tight leading-[1.1] sm:leading-tight px-2">
            Our Video Conversion <br className="hidden sm:block" /> Services
          </h2>
        </motion.div>

        {/* ULTRA GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-14 lg:gap-8 items-end relative perspective-1000">
           
          {/* --- LEFT CARD: CASH COW (Floating Parallax) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="group relative order-2 lg:order-1"
          >
            {/* 3D Background Asset - Floats Behind - Hidden on Mobile */}
            <motion.div 
              animate={{ y: [-15, 15, -15], rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block absolute -top-32 md:-top-40 -left-12 md:-left-20 z-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 blur-[2px] group-hover:blur-0"
            >
              <Image 
                src="/book-to-video/youtube_main.png" 
                alt="YouTube" 
                width={400} 
                height={400} 
                className="object-contain w-full h-full drop-shadow-2xl"
              />
            </motion.div>

            {/* Glass Card */}
            <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] p-6 sm:p-7 md:p-8 pt-10 sm:pt-11 md:pt-12 border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_60px_-15px_rgba(255,190,2,0.3)] transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-4">
              <div className="absolute top-0 right-0 p-4 sm:p-6 md:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <PlayCircle className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#FFBE02]" />
              </div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900 mb-3 sm:mb-4 font-serif group-hover:text-[#FFBE02] transition-colors">
                Cash Cow Video
              </h3>
              <div className="w-10 sm:w-12 h-1 bg-[#FFBE02] mb-4 sm:mb-5 md:mb-6 rounded-full group-hover:w-20 sm:group-hover:w-24 transition-all duration-500"></div>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-medium">
                High-retention storytelling. We engineer scripts and visuals specifically to trigger YouTube&apos;s algorithm, turning your book&apos;s concepts into viral assets.
              </p>
            </div>
          </motion.div>

          {/* --- CENTER CARD: THE STAGE (Highlight) --- */}
      <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-20 order-1 lg:order-2 -mb-6 sm:-mb-8 md:-mb-10 lg:-mb-12"
          >
            {/* The Stage Light Effect - Responsive */}
            <div className="absolute -top-[120px] sm:-top-[150px] md:-top-[180px] lg:-top-[200px] left-1/2 -translate-x-1/2 w-[200px] h-[300px] sm:w-[250px] sm:h-[400px] md:w-[280px] md:h-[450px] lg:w-[300px] lg:h-[500px] bg-gradient-to-b from-white/20 to-transparent transform -rotate-12 blur-2xl sm:blur-3xl pointer-events-none"></div>

            {/* WALKING PERSON - Responsive Sizing */}
            <div className="absolute -top-[130px] sm:-top-[160px] md:-top-[190px] lg:-top-[210px] left-1/2 -translate-x-1/2 w-[180px] h-[260px] sm:w-[220px] sm:h-[320px] md:w-[250px] md:h-[360px] lg:w-[280px] lg:h-[400px] z-30 pointer-events-none">
               <Image 
                src="/book-to-video/person.gif" 
                alt="Walking Person" 
                width={400} 
                height={600} 
                className="object-contain w-full h-full drop-shadow-2xl scale-110 sm:scale-115 md:scale-120 lg:scale-125"
                unoptimized
              />
            </div>

            {/* The Master Card */}
            <div className="relative rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] p-0.5 sm:p-1 bg-gradient-to-b from-white/40 to-white/0 shadow-xl sm:shadow-2xl">
              <div className="rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-8 md:p-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 sm:pb-12 md:pb-14 lg:pb-16 bg-gradient-to-br from-[#8B2DF0] via-[#D925C8] to-[#FF5E00] text-center overflow-hidden relative">
                
                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                
                {/* Content */}
      <div className="relative z-10">
                   <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold mb-4 sm:mb-5 md:mb-6">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFBE02]" /> MOST POPULAR
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6 font-serif drop-shadow-lg">
                    2D Animation
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium leading-relaxed max-w-[280px] sm:max-w-xs mx-auto">
                    Bring characters to life. We animate key scenes and abstract concepts into stunning 2D visuals that mesmerize viewers.
                  </p>
                </div>

                {/* Animated Floor Glow */}
                <div className="absolute bottom-0 left-0 w-full h-20 sm:h-24 md:h-28 lg:h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT CARD: FACE CONTENT (Floating Parallax) --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="group relative order-3 mt-8 sm:mt-12 md:mt-16 lg:mt-0"
          >
            {/* 3D Background Asset - Hidden on Mobile */}
            <motion.div 
              animate={{ y: [15, -15, 15], rotate: [0, 5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="hidden md:block absolute -top-32 md:-top-40 -right-12 md:-right-20 z-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 blur-[2px] group-hover:blur-0"
            >
              <Image 
                src="/book-to-video/action_seen.png" 
                alt="Clapperboard" 
                width={400} 
                height={400} 
                className="object-contain w-full h-full drop-shadow-2xl"
              />
            </motion.div>

            {/* Glass Card */}
            <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] p-6 sm:p-7 md:p-8 pt-10 sm:pt-11 md:pt-12 border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_60px_-15px_rgba(255,190,2,0.3)] transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-4">
              <div className="absolute top-0 right-0 p-4 sm:p-6 md:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <MonitorPlay className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#FFBE02]" />
              </div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900 mb-3 sm:mb-4 font-serif group-hover:text-[#FFBE02] transition-colors">
                Face Content
              </h3>
              <div className="w-10 sm:w-12 h-1 bg-[#FFBE02] mb-4 sm:mb-5 md:mb-6 rounded-full group-hover:w-20 sm:group-hover:w-24 transition-all duration-500"></div>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-medium">
                Personal connection. Use AI avatars or your own footage combined with professional editing to build a personal brand around your book.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};


// --- STREAMLINED PROCESS SECTION ---
const StreamlinedProcessSection = () => {
  const [activeProcessTab, setActiveProcessTab] = useState(0);
  
  const processSteps = [
    {
      id: 0,
      tabTitle: "Consultation & Strategy",
      heading: "Consultation & Strategy",
      desc: "Tell us about your book and your goals. We'll recommend the best video format (Animation, B-Roll, Face Content) and create a content plan tailored for YouTube.",
      image: "/book-to-video/Third_Section_banner.png"
    },
    {
      id: 1,
      tabTitle: "Production & Creation",
      heading: "Production & Creation",
      desc: "Our team of expert editors, animators, and voice artists brings your story to life. We handle scripting, storyboarding, and full-scale production with precision.",
      image: "/book-to-video/Third_Section_banner.png"
    },
    {
      id: 2,
      tabTitle: "Launch & Promote",
      heading: "Launch & Promote",
      desc: "Once the video is ready, we help you launch it strategically. From SEO-optimized titles to thumbnail design, we ensure your content reaches the right audience.",
      image: "/book-to-video/Third_Section_banner.png"
    }
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#fafaf9] to-[#f5f5f3] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden z-10">
      {/* Decorative Pattern */}
      <div className="absolute top-[-5%] right-0 w-[300px] lg:w-[400px] h-full opacity-10 pointer-events-none z-0 rotate-12">
        <div className="w-full h-full" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)`, backgroundSize: '40px 100%' }} />
      </div>

      {/* Background Image - Lights on Right Side */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`img-${activeProcessTab}`} 
          className="absolute bottom-0 right-0 w-[55%] sm:w-[60%] md:w-[65%] lg:w-[70%] h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] z-[5] pointer-events-none" 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: -50 }} 
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image 
            src="/book-to-video/lights.png" 
            alt={processSteps[activeProcessTab].heading} 
            fill 
            className="object-contain" 
            style={{ objectPosition: 'right bottom' }} 
            priority 
          />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight font-serif">
            Streamlined Process for Authors
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-6 sm:mb-8 md:mb-10 pb-2 relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[30%] h-[1px] bg-gray-300"></div>
          {processSteps.map((step, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveProcessTab(idx)} 
              className={`text-sm sm:text-base md:text-lg lg:text-xl font-semibold pb-3 px-2 transition-all duration-300 cursor-pointer relative ${
                activeProcessTab === idx 
                  ? "text-zinc-900" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {step.tabTitle}
              {activeProcessTab === idx && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFBE02]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="relative w-full min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px] flex flex-col lg:flex-row">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`text-${activeProcessTab}`} 
              className="w-full lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-16 mb-6 sm:mb-8 md:mb-10 lg:mb-0 relative z-10" 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 50 }} 
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <span className="inline-block bg-[#FFBE02]/10 text-[#FFBE02] px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs font-semibold tracking-wide mb-3 sm:mb-4 md:mb-5 w-fit border border-[#FFBE02]/20">
                Process
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-[1.1] mb-3 sm:mb-4 md:mb-5 font-serif">
                {processSteps[activeProcessTab].heading}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-['Poppins']">
                {processSteps[activeProcessTab].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// --- YOUTUBE TV SECTION ---
const YouTubeTVSection = () => {
  const [activeVideoTab, setActiveVideoTab] = useState<'long' | 'short' | 'thumbnail'>('long');
  const [currentVideo, setCurrentVideo] = useState({
    id: 'vid1',
    title: 'How to Turn Your Book into a Bestseller Video | Step by Step Guide',
    channel: 'Duck Book Writers',
    subscribers: '125K',
    views: '1.2M views',
    date: '2 days ago',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0',
    desc: 'Turn your book into a visual masterpiece. This video explains the exact process we use to convert manuscripts into high-retention video content for YouTube and Social Media.'
  });

  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const playlist = [
    {
      id: 'vid1',
      title: 'How to Turn Your Book into a Bestseller Video',
      channel: 'Duck Book Writers',
      views: '1.2M views',
      date: '2 days ago',
      thumbnailColor: '#1a1a1a',
      duration: '12:05',
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0'
    },
    {
      id: 'vid2',
      title: '2D Animation Process Explained: From Script to Screen',
      channel: 'Duck Book Writers',
      views: '854K views',
      date: '1 week ago',
      thumbnailColor: '#35c4dd',
      duration: '08:30',
      src: 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0'
    },
    {
      id: 'vid3',
      title: 'Cinematic Book Trailers: The Complete Guide',
      channel: 'Duck Book Writers',
      views: '450K views',
      date: '3 weeks ago',
      thumbnailColor: '#ff4d00',
      duration: '03:45',
      src: 'https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&rel=0'
    },
    {
      id: 'vid4',
      title: 'Why You Need Cash Cow Videos for Passive Income',
      channel: 'Duck Book Writers',
      views: '2.1M views',
      date: '1 month ago',
      thumbnailColor: '#2a2a2a',
      duration: '15:20',
      src: 'https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=1&rel=0'
    }
  ];

  const shortsList = [
    {
      id: 's1',
      videoId: '1La4QzGeaaQ',
      src: 'https://www.youtube.com/embed/1La4QzGeaaQ?autoplay=1&mute=1&controls=0&loop=1',
      title: 'The Future of Book Marketing 🚀',
      views: '1.5M',
      likes: '50K',
      comments: '1.2K',
      color: '#35c4dd'
    },
    {
      id: 's2',
      videoId: 'tgbNymZ7vqY',
      src: 'https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&controls=0&loop=1',
      title: 'From Manuscript to Movie 🎬',
      views: '800K',
      likes: '24K',
      comments: '500',
      color: '#ff4d00'
    },
    {
      id: 's3',
      videoId: 'hHqW0g7v5LI',
      src: 'https://www.youtube.com/embed/hHqW0g7v5LI?autoplay=1&mute=1&controls=0&loop=1',
      title: 'Best Selling Author Secrets 🤫',
      views: '2.1M',
      likes: '120K',
      comments: '3K',
      color: '#8a00ff'
    }
  ];

  const thumbnailList = [
    { id: 1, image: '/book-to-video/YouTube Thumbnail 1.png', title: 'Cinematic Trailer' },
    { id: 2, image: '/book-to-video/thumb-2.png', title: 'Author Interview' },
    { id: 3, image: '/book-to-video/thumb-3.jpg', title: 'Book Launch' },
    { id: 4, image: '/book-to-video/thumb-4.jpg', title: '2D Animation' },
    { id: 5, image: '/book-to-video/thumb-5.jpg', title: 'Documentary Style' },
    { id: 6, image: '/book-to-video/thumb-6.jpg', title: 'Process Reveal' }
  ];

  const handleNextShort = () => {
    setCurrentShortIndex((prev) => (prev + 1) % shortsList.length);
  };

  const handlePrevShort = () => {
    setCurrentShortIndex((prev) => (prev - 1 + shortsList.length) % shortsList.length);
  };

  const handleNextImage = useCallback(() => {
    setActiveThumbnailIndex((prev) => (prev + 1) % thumbnailList.length);
  }, [thumbnailList.length]);

  const handlePrevImage = useCallback(() => {
    setActiveThumbnailIndex((prev) => (prev - 1 + thumbnailList.length) % thumbnailList.length);
  }, [thumbnailList.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handleNextImage, handlePrevImage]);

  const extendedThumbnailList = [];
  for (let i = 0; i < 3; i++) {
    extendedThumbnailList.push(...thumbnailList.map((thumb) => ({ ...thumb, uniqueId: `${thumb.id}-${i}` })));
  }

  return (
    <section className="relative w-full bg-white pt-8 sm:pt-10 md:pt-12 lg:pt-16 py-16 sm:py-20 md:py-24 lg:py-36 overflow-hidden z-50">
      {/* Shades Image as Shadow - Covering Full Section */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] z-10 pointer-events-none">
        <Image 
          src="/book-to-video/shades.png" 
          alt="Shades Shadow" 
          fill 
          className="object-cover object-center opacity-60" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-30">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-10 lg:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mb-6 sm:mb-8 text-center font-serif">
            Videos We Created
          </h2>
          
          <div className="flex items-center gap-6 sm:gap-8 md:gap-10 border-b border-gray-200 w-full max-w-[500px] justify-center pb-2">
            <button 
              onClick={() => setActiveVideoTab('long')} 
              className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer font-['Poppins'] ${
                activeVideoTab === 'long' 
                  ? 'text-[#FFBE02] border-b-2 border-[#FFBE02]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Long
            </button>
            <button 
              onClick={() => setActiveVideoTab('short')} 
              className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer font-['Poppins'] ${
                activeVideoTab === 'short' 
                  ? 'text-[#FFBE02] border-b-2 border-[#FFBE02]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Short
            </button>
            <button 
              onClick={() => setActiveVideoTab('thumbnail')} 
              className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer font-['Poppins'] ${
                activeVideoTab === 'thumbnail' 
                  ? 'text-[#FFBE02] border-b-2 border-[#FFBE02]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Thumbnail
            </button>
          </div>
        </div>

        {/* TV Container */}
        <div className="relative w-full max-w-[1200px] mx-auto perspective-[1000px]">
          {/* TV Frame */}
          <div className="relative w-full aspect-[16/9] z-20 pointer-events-none">
            <Image src="/book-to-video/fourth_S_TV.png" alt="TV Frame" fill className="object-contain scale-105" priority />
          </div>

          {/* Internal Screen */}
          <div 
            className="absolute bg-white z-40 overflow-hidden rounded-t-[6px] sm:rounded-t-[8px] rounded-b-[12px] sm:rounded-b-[15px] shadow-inner"
            style={{
              top: width < 768 ? 'calc(12% - 40px)' : width < 1024 ? 'calc(13% - 60px)' : 'calc(15% - 80px)',
              left: width < 768 ? 'calc(8% - 15px)' : width < 1024 ? 'calc(9% - 20px)' : 'calc(10% - 30px)',
              right: width < 768 ? 'calc(8% - 15px)' : width < 1024 ? 'calc(9% - 20px)' : 'calc(10% - 30px)',
              bottom: width < 768 ? 'calc(15% - 20px)' : width < 1024 ? 'calc(16% - 30px)' : 'calc(18% - 40px)',
            }}
          >
            {/* YouTube Header */}
            <div className="sticky top-0 z-50 bg-white h-[48px] sm:h-[52px] md:h-[56px] flex items-center justify-between px-2 sm:px-3 md:px-4 shrink-0 shadow-sm border-b border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full">
                  <Menu className="w-5 h-5 text-gray-900" />
                </button>
                <div className="relative h-5 w-24 sm:h-6 sm:w-28 md:w-32 cursor-pointer flex items-center">
                  <Image src="/images/duck-logo-final.png" alt="Logo" fill className="object-contain object-left" />
                </div>
              </div>
              <div className="flex-1 max-w-[600px] mx-2 sm:mx-3 md:mx-4 hidden md:flex items-center gap-4">
                <div className="flex w-full">
                  <div className="flex flex-1 items-center border border-gray-300 rounded-l-full px-4 py-0.5 shadow-inner bg-white focus-within:border-[#FFBE02] ml-8">
                    <input type="text" placeholder="Search" className="w-full py-1.5 text-[16px] outline-none font-normal text-gray-700 placeholder-gray-500" />
                  </div>
                  <button className="bg-[#f8f8f8] border border-l-0 border-gray-300 rounded-r-full px-5 flex items-center justify-center hover:bg-[#f0f0f0]">
                    <Search className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <button className="p-2 bg-[#f9f9f9] rounded-full hover:bg-[#e5e5e5]">
                  <Mic className="w-5 h-5 text-gray-900" />
                </button>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full hidden sm:block"><Bell className="w-5 h-5 text-gray-900" /></button>
                <div className="ml-1 sm:ml-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFBE02] text-black flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer">D</div>
      </div>
    </div>

            {/* Content Area */}
            <div className="w-full h-[calc(100%-56px)] overflow-hidden bg-white relative">
              {/* LONG VIDEO TAB */}
              {activeVideoTab === 'long' && (
                <div className="w-full h-full flex flex-col lg:flex-row p-3 sm:p-4 md:p-5 lg:p-6 gap-4 sm:gap-5 md:gap-6 overflow-y-auto">
                  <div className="w-full lg:w-[70%]">
                    <div className="w-full aspect-video bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-sm mb-3 sm:mb-4">
                      <iframe width="100%" height="100%" src={currentVideo.src} title="Player" allow="autoplay; encrypted-media" className="border-0"></iframe>
                    </div>
                    <h1 className="text-base sm:text-lg md:text-[20px] font-bold text-zinc-900 mb-2 sm:mb-3 leading-6 sm:leading-7 font-serif">
                      {currentVideo.title}
                    </h1>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 border border-gray-100">
                          <Image src="/images/duck-logo-final.png" alt="Avatar" fill className="object-contain p-1" />
                        </div>
                        <div className="flex flex-col mr-4">
                          <p className="font-bold text-[16px] text-zinc-900 leading-5 font-['Poppins']">{currentVideo.channel}</p>
                          <p className="text-[12px] text-gray-600 font-['Poppins']">{currentVideo.subscribers} subscribers</p>
                        </div>
                        <button className="bg-[#FFBE02] hover:bg-[#e6aa02] text-black px-4 py-2 rounded-full text-[14px] font-bold transition-colors font-['Poppins']">
                          Subscribe
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-[#f2f2f2] rounded-full overflow-hidden h-9">
                          <button className="flex items-center gap-2 px-4 hover:bg-[#e5e5e5] border-r border-[#d9d9d9] h-full transition-colors">
                            <span className="text-sm font-medium text-zinc-900 font-['Poppins']">12K</span>
                          </button>
                        </div>
                        <button className="flex items-center gap-2 bg-[#f2f2f2] px-4 py-2 rounded-full hover:bg-[#e5e5e5] transition-colors h-9">
                          <Share2 className="w-4 h-4 text-zinc-900" />
                          <span className="text-sm font-medium text-zinc-900 font-['Poppins']">Share</span>
                        </button>
                        <button className="flex items-center justify-center bg-[#f2f2f2] w-9 h-9 rounded-full hover:bg-[#e5e5e5] transition-colors">
                          <MoreVertical className="w-4 h-4 text-zinc-900" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#f2f2f2] rounded-xl p-3 text-sm text-zinc-900 hover:bg-[#e5e5e5] transition-colors cursor-pointer font-['Poppins']">
                      <p className="font-bold mb-1">{currentVideo.views} • {currentVideo.date}</p>
                      <p className="whitespace-pre-line leading-relaxed">{currentVideo.desc}</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-[30%] flex flex-col gap-3">
                    {playlist.map((video) => (
                      <div 
                        key={video.id} 
                        onClick={() => setCurrentVideo({ ...currentVideo, ...video, desc: currentVideo.desc })} 
                        className="flex gap-2 cursor-pointer group"
                      >
                        <div className="relative w-[168px] h-[94px] flex-shrink-0 rounded-xl overflow-hidden" style={{ backgroundColor: video.thumbnailColor || '#000000' }}>
                          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold text-center px-2 opacity-80 group-hover:opacity-100 transition-opacity font-['Poppins']">
                            {video.title.substring(0, 25)}...
                          </div>
                          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] tracking-wide">
                            {video.duration}
                          </span>
                        </div>
                        <div className="flex flex-col pr-6">
                          <h4 className="text-[14px] font-semibold text-zinc-900 line-clamp-2 leading-tight mb-1 font-['Poppins']">
                            {video.title}
                          </h4>
                          <p className="text-[12px] text-gray-600 font-['Poppins']">{video.channel}</p>
                          <p className="text-[12px] text-gray-600 font-['Poppins']">{video.views} • {video.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SHORTS TAB */}
              {activeVideoTab === 'short' && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white relative overflow-hidden">
                  <button 
                    onClick={handlePrevShort}
                    className="absolute left-2 sm:left-4 md:left-6 lg:left-8 z-50 p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full bg-white/90 hover:bg-white shadow-lg border border-gray-200 transition-all active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
                  </button>
                  <button 
                    onClick={handleNextShort}
                    className="absolute right-2 sm:right-4 md:right-6 lg:right-8 z-50 p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full bg-white/90 hover:bg-white shadow-lg border border-gray-200 transition-all active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
                  </button>

                  <div className="relative w-full h-full flex items-center justify-center py-2 sm:py-1">
                    <AnimatePresence initial={false} mode="popLayout">
                      <motion.div 
                        key={shortsList[currentShortIndex].id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="relative z-30 w-[75%] max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[300px] aspect-[9/16] max-h-[85%] sm:max-h-[480px] md:max-h-[540px] lg:max-h-[680px] bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mx-auto"
                      >
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={shortsList[currentShortIndex].src} 
                          title="Shorts" 
                          allow="autoplay; encrypted-media" 
                          className="border-0 object-cover"
                        ></iframe>
                        <div className="absolute right-2 sm:right-3 bottom-20 sm:bottom-24 md:bottom-20 flex flex-col items-center gap-2 sm:gap-3 md:gap-5 lg:gap-6 z-40">
                          <div className="flex flex-col items-center gap-0.5 cursor-pointer group">
                            <div className="bg-gray-800/70 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-gray-700 transition-colors">
                              <PlayCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                            </div>
                            <span className="text-white text-[9px] sm:text-xs font-bold font-['Poppins']">{shortsList[currentShortIndex].likes}</span>
                          </div>
                          <div className="flex flex-col items-center gap-0.5 cursor-pointer group">
                            <div className="bg-gray-800/70 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-gray-700 transition-colors">
                              <Share2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                            </div>
                            <span className="text-white text-[9px] sm:text-xs font-bold font-['Poppins']">Share</span>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 pb-4 sm:pb-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-30">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-white font-bold text-xs sm:text-sm font-['Poppins']">@DuckBookWriters</span>
                            <button className="bg-white text-black text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-gray-200 transition-colors font-['Poppins']">
                              Subscribe
                            </button>
                          </div>
                          <p className="text-white text-xs sm:text-sm font-medium leading-snug pr-12 sm:pr-16 line-clamp-2 font-['Poppins']">
                            {shortsList[currentShortIndex].title} #shorts #books #publishing
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* THUMBNAIL TAB */}
              {activeVideoTab === 'thumbnail' && (
                <div className="w-full h-full relative bg-[#f9f9f9]">
                  <div className="w-full h-full overflow-y-auto p-5 sm:p-6 md:p-8 lg:p-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 w-full">
                      {extendedThumbnailList.map((thumbnail, idx) => {
                        const originalIndex = thumbnailList.findIndex(t => t.id === thumbnail.id);
                        return (
                          <motion.div
                            key={thumbnail.uniqueId}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: (idx % 3) * 0.1 }}
                            onClick={() => {
                              setActiveThumbnailIndex(originalIndex);
                              if (width >= 768) {
                                setIsLightboxOpen(true);
                              }
                            }}
                            className="group cursor-pointer flex flex-col gap-3"
                          >
                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                              <Image 
                                src={thumbnail.image}
                                alt={thumbnail.title}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 bg-[#FFBE02]/90 rounded-full p-2">
                                  <ChevronRight className="w-6 h-6 text-white" />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start justify-between px-1">
                              <h4 className="text-base font-bold text-zinc-900 group-hover:text-[#FFBE02] transition-colors duration-300 line-clamp-1 font-['Poppins']">
                                {thumbnail.title}
                              </h4>
    </div>
  </motion.div>
);
                      })}
                    </div>
                  </div>

                  {/* Lightbox */}
                  <AnimatePresence>
                    {isLightboxOpen && width >= 768 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center"
                      >
                        <button 
                          onClick={() => setIsLightboxOpen(false)}
                          className="absolute top-2 sm:top-4 right-2 sm:right-4 z-[110] p-2 sm:p-2.5 md:p-3 bg-white/95 hover:bg-white rounded-full shadow-lg transition-all active:scale-95"
                        >
                          <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
                        </button>
                        <div className="relative w-full h-full flex items-center justify-center px-2 sm:px-12">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                            className="absolute left-2 sm:left-4 md:left-6 z-[110] p-2 sm:p-2.5 md:p-3 rounded-full bg-white/95 hover:bg-white shadow-lg transition-all active:scale-95"
                          >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
                          </button>
                          <div className="relative w-full h-[60%] sm:h-[70%] md:h-[80%] max-w-[900px] shadow-2xl">
                            <AnimatePresence initial={false} mode="wait">
                              <motion.div
                                key={activeThumbnailIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute inset-0 w-full h-full"
                              >
                                <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a]">
                                  <Image 
                                    src={thumbnailList[activeThumbnailIndex].image}
                                    alt={thumbnailList[activeThumbnailIndex].title}
                                    fill
                                    className="object-contain"
                                    priority
                                  />
                                </div>
                              </motion.div>
                            </AnimatePresence>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                            className="absolute right-2 sm:right-4 md:right-6 z-[110] p-2 sm:p-2.5 md:p-3 rounded-full bg-white/95 hover:bg-white shadow-lg transition-all active:scale-95"
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
                          </button>
                        </div>
                        <div className="absolute bottom-6 w-full text-center">
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            key={`info-${activeThumbnailIndex}`}
                            className="text-white"
                          >
                            <h3 className="text-xl sm:text-2xl font-bold mb-1 tracking-wide font-serif">
                              {thumbnailList[activeThumbnailIndex].title}
                            </h3>
                            <p className="text-gray-400 text-sm font-['Poppins']">
                              {activeThumbnailIndex + 1} / {thumbnailList.length}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function BookToVideoPage() {
  return (
    <div className="w-full bg-[#fafaf9] font-sans selection:bg-yellow-200 selection:text-yellow-900 overflow-x-hidden">
      <Header />
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] lg:min-h-[100vh] flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(to bottom, #FBFBFD, #FAF6E3)' }}>
        
        {/* RIGHT SIDE IMAGE - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex absolute right-0 top-0 bottom-0 w-auto max-w-md xl:max-w-lg h-full pointer-events-none pr-8 xl:pr-16 items-center justify-end"
        >
          <div className="relative w-full h-full flex items-center justify-end">
            <Image
              src="/book-to-video/movie_frim.png"
              alt="Action Scene"
              width={500}
              height={500}
              className="w-full h-full object-contain object-right"
              priority
            />
        </div>
        </motion.div>

        {/* CENTER CONTENT */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl lg:max-w-4xl mx-auto py-10 sm:py-14 md:py-18 lg:py-24">
            
            {/* YouTube Icon */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 flex justify-center"
            >
              <Image
                src="/book-to-video/youtube_short_icon.png"
                alt="YouTube Shorts"
                width={160}
                height={160}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44 object-contain"
                priority
              />
          </motion.div>
          
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-zinc-900 mb-3 sm:mb-4 md:mb-5 lg:mb-6 font-['Poppins'] leading-[1.15] sm:leading-[1.2] md:leading-tight px-3 sm:px-4"
            >
              Transform Your Book into Visual Storytelling
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-700 mb-5 sm:mb-6 md:mb-7 lg:mb-8 font-['Poppins'] leading-[1.6] sm:leading-[1.65] md:leading-[1.7] lg:leading-relaxed max-w-[95%] sm:max-w-xl lg:max-w-2xl px-3 sm:px-4 mx-auto"
            >
              Harness the power of video to bring your stories to life on YouTube, Shorts, and beyond.
            </motion.p>

            {/* Button */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#FFBE02] hover:bg-[#e6aa02] text-black text-sm sm:text-base md:text-lg font-bold py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-12 rounded-full shadow-2xl shadow-yellow-500/30 transition-all hover:-translate-y-1 hover:scale-105 font-['Poppins'] tracking-wide whitespace-nowrap"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION (BAAP LEVEL DESIGN) */}
      <VideoConversionServices />

      {/* 3. STREAMLINED PROCESS SECTION */}
      <StreamlinedProcessSection />

      {/* 4. VIDEOS WE CREATED - YOUTUBE TV SECTION */}
      <YouTubeTVSection />

      {/* 5. VISUALIZE YOUR BOOK CTA SECTION */}
      <section className="relative w-full bg-white overflow-hidden pt-4 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12">
        {/* Top Image - Full Section Cover - Pixel Perfect Responsive */}
        <div className="relative w-full min-h-[280px] sm:min-h-[380px] md:min-h-[480px] lg:min-h-[580px] xl:min-h-[680px] 2xl:min-h-[780px]">
          <Image 
            src="/book-to-video/CTA_img.png" 
            alt="Visualize Your Book" 
            fill 
            className="object-contain object-center" 
            priority 
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
          />
        </div>
        
        {/* Yellow Background with Text - Overlapping 10% of image - Responsive */}
        <div className="relative w-full bg-[#FFBE02] py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 -mt-[26%] sm:-mt-[9%] md:-mt-[10%] lg:-mt-[10%] z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-serif leading-tight sm:leading-tight md:leading-tight lg:leading-tight px-2 sm:px-3 md:px-4">
              Visualize Your Book!
            </h2>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <Testimonials />

      {/* 7. FINAL CTA */}
      <section id="contact" className="py-24 px-4 bg-[#fafaf9]">
        <div className="max-w-6xl mx-auto bg-zinc-900 rounded-[3rem] relative overflow-hidden border-2 border-zinc-800 shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FFBE02]/20 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], rotate: [0, -45, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[100px]" 
          />

          <div className="relative z-10 py-20 px-8 md:px-20 text-center">
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight font-serif">
              Ready to go <br/> <span className="text-[#FFBE02]">Viral?</span>
            </h2>
            <p className="text-zinc-300 text-xl mb-12 max-w-2xl mx-auto font-sans">
              Join the authors who are turning pages into views. High-quality production, zero headaches.
            </p>
            
            <a 
              href="#contact"
              className="group flex items-center justify-between w-[300px] md:w-[340px] h-[64px] bg-[#FFBE02] text-black font-bold rounded-full text-xl shadow-lg overflow-hidden relative p-2 mx-auto transition-all hover:shadow-xl hover:shadow-yellow-500/30 hover:bg-[#e6aa02]" 
            >
              <span className="relative z-10 pl-6 whitespace-nowrap font-sans">Get Your Free Quote</span>
              <span className="bg-black text-[#FFBE02] rounded-full w-[48px] h-[48px] flex items-center justify-center relative z-10 flex-shrink-0">
                <ArrowRight className="w-6 h-6" />
              </span>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full transform scale-0 group-hover:scale-[30] transition-transform duration-[800ms] ease-in-out origin-center"></div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}