'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import CalendlyInlineEmbed from '../components/CalendlyInlineEmbed';
import BookingSection from './BookingSection';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  PlayCircle, ArrowRight,
  MonitorPlay, Sparkles,
  Menu, Search, Mic, Bell, Share2, MoreVertical, ChevronLeft, ChevronRight, X, Star, ChevronDown, CheckCircle2, XCircle, Lock
} from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY_ADDRESS, COMPANY_NAME } from '../config/constants';

// --- VIDEO SERVICES: auto-rotating carousel (center = hero + asset inside; sides = glass + asset behind) ---
type VideoServiceItem = {
  id: string;
  title: string;
  description: string;
  assetSrc: string;
  assetAlt: string;
  assetUnoptimized?: boolean;
  sideIcon: 'play' | 'sparkles' | 'monitor';
};

const VIDEO_SERVICES: VideoServiceItem[] = [
  {
    id: 'cash-cow',
    title: 'Cash Cow Video',
    description:
      "High-retention storytelling. We engineer scripts and visuals specifically to trigger Cinema's algorithm, turning your book's concepts into viral assets.",
    assetSrc: '/youtube-page/1341 3.png',
    assetAlt: 'Cinema',
    sideIcon: 'play',
  },
  {
    id: '2d-animation',
    title: '2D Animation',
    description:
      'Bring characters to life. We animate key scenes and abstract concepts into stunning 2D visuals that mesmerize viewers.',
    assetSrc: '/book-to-video/person.gif',
    assetAlt: '2D animation character',
    assetUnoptimized: true,
    sideIcon: 'sparkles',
  },
  {
    id: 'face-content',
    title: 'Face Content',
    description:
      'Personal connection. Use AI avatars or your own footage combined with professional editing to build a personal brand around your book.',
    assetSrc: '/book-to-video/action_seen.png',
    assetAlt: 'Face content production',
    sideIcon: 'monitor',
  },
];

const ServiceSideIcon = ({ kind }: { kind: VideoServiceItem['sideIcon'] }) => {
  const cls = 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#FFBE02]';
  if (kind === 'play') return <PlayCircle className={cls} />;
  if (kind === 'sparkles') return <Sparkles className={cls} />;
  return <MonitorPlay className={cls} />;
};

const VideoServiceSideCard = ({ service, side }: { service: VideoServiceItem; side: 'left' | 'right' }) => {
  const isLeft = side === 'left';
  return (
    <motion.div
      layout
      transition={{ layout: { type: 'tween', duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
      className="group relative lg:mt-0 mt-6 sm:mt-8"
    >
      <motion.div
        animate={
          isLeft
            ? { y: [-15, 15, -15], rotate: [0, -5, 0] }
            : { y: [15, -15, 15], rotate: [0, 5, 0] }
        }
        transition={{ duration: isLeft ? 6 : 7, repeat: Infinity, ease: 'easeInOut', delay: isLeft ? 0 : 0.5 }}
        className={`hidden md:block absolute -top-32 md:-top-40 z-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 blur-[2px] group-hover:blur-0 pointer-events-none ${isLeft ? '-left-12 md:-left-20' : '-right-12 md:-right-20'
          }`}
      >
        <Image
          src={service.assetSrc}
          alt={service.assetAlt}
          width={400}
          height={400}
          className="object-contain w-full h-full drop-shadow-2xl"
          unoptimized={service.assetUnoptimized}
        />
      </motion.div>

      <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] p-6 sm:p-7 md:p-8 pt-10 sm:pt-11 md:pt-12 border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_60px_-15px_rgba(255,190,2,0.3)] transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-4">
        <div className="absolute top-0 right-0 p-4 sm:p-6 md:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <ServiceSideIcon kind={service.sideIcon} />
        </div>
        <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900 mb-3 sm:mb-4 font-serif group-hover:text-[#FFBE02] transition-colors">
          {service.title}
        </h3>
        <div className="w-10 sm:w-12 h-1 bg-[#FFBE02] mb-4 sm:mb-5 md:mb-6 rounded-full group-hover:w-20 sm:group-hover:w-24 transition-all duration-500" />
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-medium">{service.description}</p>
      </div>
    </motion.div>
  );
};

const VideoServiceCenterCard = ({ service }: { service: VideoServiceItem }) => {
  const isAnimatedGif = service.id === '2d-animation';
  const assetWrapClass = isAnimatedGif
    ? 'w-[128px] h-[158px] sm:w-[152px] sm:h-[190px] md:w-[172px] md:h-[214px] lg:w-[190px] lg:h-[235px] scale-[1.02] sm:scale-105'
    : 'w-[100px] h-[120px] sm:w-[118px] sm:h-[142px] md:w-[132px] md:h-[158px] lg:w-[145px] lg:h-[172px] scale-100 sm:scale-105';

  return (
  <motion.div
    layout
    transition={{ layout: { type: 'tween', duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
    className="relative z-20 -mb-4 sm:-mb-6 md:-mb-8 lg:-mb-10"
  >
    <div className={`absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-white/25 to-transparent transform -rotate-12 blur-2xl sm:blur-3xl pointer-events-none ${isAnimatedGif ? '-top-[80px] sm:-top-[96px] md:-top-[108px] lg:-top-[120px] w-[150px] h-[220px] sm:w-[182px] sm:h-[268px] md:w-[200px] md:h-[290px] lg:w-[216px] lg:h-[308px]' : '-top-[72px] sm:-top-[88px] md:-top-[100px] lg:-top-[112px] w-[140px] h-[200px] sm:w-[170px] sm:h-[240px] md:w-[190px] md:h-[260px] lg:w-[200px] lg:h-[280px]'}`} />

    <div className="relative rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] p-0.5 sm:p-1 bg-gradient-to-b from-white/40 to-white/0 shadow-xl sm:shadow-2xl">
      <div className="rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] px-4 sm:px-6 md:px-8 pt-5 sm:pt-6 md:pt-7 pb-6 sm:pb-7 md:pb-8 lg:pb-9 bg-gradient-to-br from-[#8B2DF0] via-[#D925C8] to-[#FF5E00] text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className={`relative mx-auto mb-3 sm:mb-3.5 md:mb-4 flex items-center justify-center ${assetWrapClass}`}>
            <Image
              src={service.assetSrc}
              alt={service.assetAlt}
              width={400}
              height={520}
              className={`object-contain w-full h-full drop-shadow-2xl ${isAnimatedGif ? 'scale-110 sm:scale-[1.14] md:scale-[1.12]' : ''}`}
              unoptimized={service.assetUnoptimized}
            />
          </div>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold mb-2.5 sm:mb-3 md:mb-3.5">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFBE02]" /> FEATURED
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2.5 sm:mb-3 md:mb-3.5 font-serif drop-shadow-lg px-1 leading-tight">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm md:text-[15px] text-white/90 font-medium leading-snug max-w-[280px] sm:max-w-xs mx-auto px-1">
            {service.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-10 sm:h-12 md:h-14 lg:h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </div>
  </motion.div>
  );
};

const VideoConversionServices = () => {
  const [centerIndex, setCenterIndex] = useState(1);
  const count = VIDEO_SERVICES.length;

  useEffect(() => {
    const id = window.setInterval(() => {
      setCenterIndex((i) => (i + 1) % count);
    }, 5000);
    return () => window.clearInterval(id);
  }, [count]);

  const leftIndex = (centerIndex + count - 1) % count;
  const rightIndex = (centerIndex + 1) % count;
  const leftService = VIDEO_SERVICES[leftIndex];
  const centerService = VIDEO_SERVICES[centerIndex];
  const rightService = VIDEO_SERVICES[rightIndex];

  return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#fafaf9] overflow-visible relative">
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-[260px] w-[260px] rounded-full bg-[#FFBE02]/18 blur-[90px]" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#FFBE02]/5 rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:h-[600px] lg:h-[600px] bg-purple-500/5 rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 relative"
        >
          <span className="inline-block py-1.5 px-3 sm:px-4 rounded-full bg-[#FFBE02]/10 text-[#FFBE02] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3 border border-[#FFBE02]/20">
            Premium Production
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-zinc-900 font-serif tracking-tight leading-[1.12] sm:leading-tight px-2">
            Our Video Conversion <br className="hidden sm:block" /> Services
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-end relative perspective-1000">
          <motion.div
            key={`l-${leftService.id}`}
            layout
            transition={{ layout: { type: 'tween', duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
            className="relative min-h-[1px]"
          >
            <VideoServiceSideCard service={leftService} side="left" />
          </motion.div>
          <motion.div
            key={`c-${centerService.id}`}
            layout
            transition={{ layout: { type: 'tween', duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
            className="relative min-h-[1px]"
          >
            <VideoServiceCenterCard service={centerService} />
          </motion.div>
          <motion.div
            key={`r-${rightService.id}`}
            layout
            transition={{ layout: { type: 'tween', duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
            className="relative min-h-[1px]"
          >
            <VideoServiceSideCard service={rightService} side="right" />
          </motion.div>
        </div>

        <div className="lg:hidden w-full overflow-hidden pb-4">
          <motion.div
            className="flex"
            style={{ width: `${count * 100}%` }}
            animate={{ x: `${-(centerIndex * 100) / count}%` }}
            transition={{ type: 'tween', duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {VIDEO_SERVICES.map((s) => (
              <div
                key={s.id}
                className="shrink-0 px-1 sm:px-2"
                style={{ width: `${100 / count}%` }}
              >
                <VideoServiceCenterCard service={s} />
              </div>
            ))}
          </motion.div>
        </div>
        </motion.div>
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
      desc: "Tell us about your book and your goals. We'll recommend the best video format (Animation, B-Roll, Face Content) and create a content plan tailored for Cinema.",
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
            sizes="(max-width: 1024px) 100vw, 70vw"
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
              className={`text-sm sm:text-base md:text-lg lg:text-xl font-semibold pb-3 px-2 transition-all duration-300 cursor-pointer relative ${activeProcessTab === idx
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

/** Pause / mute embedded players when the LED section is off-screen (stops audio leaking). */
function ledAwareEmbedSrc(inView: boolean, videoId: string, activeSrc: string): string {
  if (inView) return activeSrc;
  return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&controls=1&rel=0`;
}

// --- YOUTUBE TV SECTION ---
const YouTubeTVSection = () => {
  const ledSectionRef = useRef<HTMLElement | null>(null);
  const ledInView = useInView(ledSectionRef, { amount: 0.12, margin: '-15% 0px -15% 0px' });

  const [activeVideoTab, setActiveVideoTab] = useState<'long' | 'short' | 'thumbnail'>('long');
  /** After user clicks a tab once, stop auto-cycling until page reload */
  const [videoTabsManual, setVideoTabsManual] = useState(false);

  const longFormDefaultDesc =
    'Videos we produced and curated for authors — long-form storytelling and education on Cinema.';

  const playlist = [
    {
      id: 'long-1',
      videoId: 'ha1NneZGm7A',
      title: 'The ENTIRE History of Human Civilizations | Ancient to Modern (4K Documentary) [Full Movie]',
      channel: 'Duck Book Writers',
      subscribers: '',
      views: 'Long form',
      date: '',
      thumbnailUrl: 'https://i.ytimg.com/vi/ha1NneZGm7A/hqdefault.jpg',
      duration: '',
      src: 'https://www.youtube.com/embed/ha1NneZGm7A?autoplay=0&rel=0',
      desc: longFormDefaultDesc,
    },
    {
      id: 'long-2',
      videoId: '7ChWjQ-vnEU',
      title: 'America Renewed Chapter 1 Explained | The American Tipping Point - Must Watch!',
      channel: 'Duck Book Writers',
      subscribers: '',
      views: 'Long form',
      date: '',
      thumbnailUrl: 'https://i.ytimg.com/vi/7ChWjQ-vnEU/hqdefault.jpg',
      duration: '',
      src: 'https://www.youtube.com/embed/7ChWjQ-vnEU?autoplay=0&rel=0',
      desc: longFormDefaultDesc,
    },
    {
      id: 'long-3',
      videoId: 'mBZBPptSneM',
      title: 'Timber | Short Film about Solidarity by Nils Hedinger',
      channel: 'Duck Book Writers',
      subscribers: '',
      views: 'Long form',
      date: '',
      thumbnailUrl: 'https://i.ytimg.com/vi/mBZBPptSneM/hqdefault.jpg',
      duration: '',
      src: 'https://www.youtube.com/embed/mBZBPptSneM?autoplay=0&rel=0',
      desc: longFormDefaultDesc,
    },
    {
      id: 'long-4',
      videoId: 'VjTJvwgJnGc',
      title: 'The Little Red Hen (US English accent) - TheFableCottage.com',
      channel: 'Duck Book Writers',
      subscribers: '',
      views: 'Long form',
      date: '',
      thumbnailUrl: 'https://i.ytimg.com/vi/VjTJvwgJnGc/hqdefault.jpg',
      duration: '',
      src: 'https://www.youtube.com/embed/VjTJvwgJnGc?autoplay=0&rel=0',
      desc: longFormDefaultDesc,
    },
    {
      id: 'long-5',
      videoId: '05OWsG4sSX8',
      title: 'THE WHITE WOLF | Episode 3 — The Soldier Who Chose Love Over War | Military Motivation Story',
      channel: 'Duck Book Writers',
      subscribers: '',
      views: 'Long form',
      date: '',
      thumbnailUrl: 'https://i.ytimg.com/vi/05OWsG4sSX8/hqdefault.jpg',
      duration: '',
      src: 'https://www.youtube.com/embed/05OWsG4sSX8?autoplay=0&rel=0',
      desc: longFormDefaultDesc,
    },
    {
      id: 'long-6',
      videoId: 'Ou80IomKkJ0',
      title: 'THE WHITE WOLF | Episode 2 — The Trainee Who Captured the Instructors | Military Motivation Story',
      channel: 'Duck Book Writers',
      subscribers: '',
      views: 'Long form',
      date: '',
      thumbnailUrl: 'https://i.ytimg.com/vi/Ou80IomKkJ0/hqdefault.jpg',
      duration: '',
      src: 'https://www.youtube.com/embed/Ou80IomKkJ0?autoplay=0&rel=0',
      desc: longFormDefaultDesc,
    },
    {
      id: 'long-7',
      videoId: 'K18Tnq7sC6M',
      title: 'THE WHITE WOLF | The Making of John (Episode 1) | Powerful Military Motivation Story',
      channel: 'Duck Book Writers',
      subscribers: '',
      views: 'Long form',
      date: '',
      thumbnailUrl: 'https://i.ytimg.com/vi/K18Tnq7sC6M/hqdefault.jpg',
      duration: '',
      src: 'https://www.youtube.com/embed/K18Tnq7sC6M?autoplay=0&rel=0',
      desc: longFormDefaultDesc,
    },
  ];

  const [currentVideo, setCurrentVideo] = useState({ ...playlist[0] });

  const fmtShortViews = (n: number) =>
    n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(1)}K` : `${n}`;

  const shortsList = [
    {
      id: 's-u1',
      videoId: 'eGA2oAaswxQ',
      src: 'https://www.youtube.com/embed/eGA2oAaswxQ?autoplay=1&mute=0&controls=1&loop=1&playlist=eGA2oAaswxQ',
      title: 'The Real Message of White Wolf - Love Is the Strongest Force   #herojourney #courage #love',
      views: 'Short',
      likes: '—',
      color: '#1a1a1a',
    },
    {
      id: 's-u2',
      videoId: 'wysJZvHFqxI',
      src: 'https://www.youtube.com/embed/wysJZvHFqxI?autoplay=1&mute=0&controls=1&loop=1&playlist=wysJZvHFqxI',
      title: 'White Wolf - John became a Navy SEAL | T.C. Baker  #herojourney #militarymotivation',
      views: 'Short',
      likes: '—',
      color: '#2a2a2a',
    },
    {
      id: 's-u3',
      videoId: 'tT-BzWbyqkw',
      src: 'https://www.youtube.com/embed/tT-BzWbyqkw?autoplay=1&mute=0&controls=1&loop=1&playlist=tT-BzWbyqkw',
      title: "Why Nobody Can Cross Darien Gap ?? What's Wrong here? ??",
      views: 'Short',
      likes: '—',
      color: '#0f172a',
    },
    {
      id: 's-u4',
      videoId: 'XfnznTT2BqY',
      src: 'https://www.youtube.com/embed/XfnznTT2BqY?autoplay=1&mute=0&controls=1&loop=1&playlist=XfnznTT2BqY',
      title: 'SHE IS ME | JENYCEE ZABDA',
      views: 'Short',
      likes: '—',
      color: '#292524',
    },
    {
      id: 's-u5',
      videoId: 'rdCdrqbpptg',
      src: 'https://www.youtube.com/embed/rdCdrqbpptg?autoplay=1&mute=0&controls=1&loop=1&playlist=rdCdrqbpptg',
      title: 'The Attorney for the Damned #Shorts #History #Documentary #PerfectCrime',
      views: 'Short',
      likes: '—',
      color: '#1e1b4b',
    },
    {
      id: 's-u6',
      videoId: '0EezRgZ6tmE',
      src: 'https://www.youtube.com/embed/0EezRgZ6tmE?autoplay=1&mute=0&controls=1&loop=1&playlist=0EezRgZ6tmE',
      title: 'How Libya Built $25B New Rivers Over The Sahara Desert? #shorts',
      views: 'Short',
      likes: '—',
      color: '#14532d',
    },
    {
      id: 's-rb1',
      videoId: 'Mn5nhsyCk9w',
      src: 'https://www.youtube.com/embed/Mn5nhsyCk9w?autoplay=1&mute=0&controls=1&loop=1&playlist=Mn5nhsyCk9w',
      title: 'Chapter 5 | Part 1 Thorium Reactors: Safe, Clean, and Revolutionary ⚡',
      views: fmtShortViews(101),
      likes: fmtShortViews(Math.max(4, Math.round(101 * 0.08))),
      color: '#431407',
    },
    {
      id: 's-rb2',
      videoId: 'SA2N_0wqnms',
      src: 'https://www.youtube.com/embed/SA2N_0wqnms?autoplay=1&mute=0&controls=1&loop=1&playlist=SA2N_0wqnms',
      title: 'CHAPTER 4 | Part 2 Redirecting Tariffs to Small Businesses — A Blueprint for Economic Renewal',
      views: fmtShortViews(194),
      likes: fmtShortViews(Math.max(8, Math.round(194 * 0.08))),
      color: '#422006',
    },
    {
      id: 's-rb3',
      videoId: 'edWxxPr0Ju4',
      src: 'https://www.youtube.com/embed/edWxxPr0Ju4?autoplay=1&mute=0&controls=1&loop=1&playlist=edWxxPr0Ju4',
      title: 'CHAPTER | 4 PART 1 | America Collects $1.5 Trillion in Tariffs',
      views: fmtShortViews(185),
      likes: fmtShortViews(Math.max(8, Math.round(185 * 0.08))),
      color: '#3f2212',
    },
    {
      id: 's-rb4',
      videoId: 'NJ7s9n93pJ0',
      src: 'https://www.youtube.com/embed/NJ7s9n93pJ0?autoplay=1&mute=0&controls=1&loop=1&playlist=NJ7s9n93pJ0',
      title: 'CHAPTER 3 | SS-X: A Social Security System Built on Ownership',
      views: fmtShortViews(48),
      likes: fmtShortViews(Math.max(3, Math.round(48 * 0.08))),
      color: '#1c1917',
    },
    {
      id: 's-rb5',
      videoId: '_9KdDTF25ko',
      src: 'https://www.youtube.com/embed/_9KdDTF25ko?autoplay=1&mute=0&controls=1&loop=1&playlist=_9KdDTF25ko',
      title: 'CHAPTER | 3 Social Security Is Breaking —',
      views: fmtShortViews(56),
      likes: fmtShortViews(Math.max(4, Math.round(56 * 0.08))),
      color: '#292524',
    },
    {
      id: 's-rb6',
      videoId: '5iOBoM-gXZ4',
      src: 'https://www.youtube.com/embed/5iOBoM-gXZ4?autoplay=1&mute=0&controls=1&loop=1&playlist=5iOBoM-gXZ4',
      title: "CHAPTER 2 | Communities don't fall apart from gunfire—",
      views: fmtShortViews(1200),
      likes: fmtShortViews(Math.max(40, Math.round(1200 * 0.06))),
      color: '#422006',
    },
    {
      id: 's-rb7',
      videoId: 'MkThOtNH5Jg',
      src: 'https://www.youtube.com/embed/MkThOtNH5Jg?autoplay=1&mute=0&controls=1&loop=1&playlist=MkThOtNH5Jg',
      title: 'Time is not neutral.',
      views: fmtShortViews(63),
      likes: fmtShortViews(Math.max(4, Math.round(63 * 0.08))),
      color: '#1e293b',
    },
    {
      id: 's-rb8',
      videoId: 'XVu4F_8oSEg',
      src: 'https://www.youtube.com/embed/XVu4F_8oSEg?autoplay=1&mute=0&controls=1&loop=1&playlist=XVu4F_8oSEg',
      title: 'We Stand at a Precipice — What Happens Next Depends on Us',
      views: fmtShortViews(43),
      likes: fmtShortViews(Math.max(3, Math.round(43 * 0.08))),
      color: '#312e81',
    },
    {
      id: 's-rb9',
      videoId: 'QtRJqhKY69M',
      src: 'https://www.youtube.com/embed/QtRJqhKY69M?autoplay=1&mute=0&controls=1&loop=1&playlist=QtRJqhKY69M',
      title: 'America Is Being Tested Do You Feel It ?',
      views: fmtShortViews(106),
      likes: fmtShortViews(Math.max(6, Math.round(106 * 0.08))),
      color: '#451a03',
    },
  ];

  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [width, setWidth] = useState(0);

  // Auto-rotate tabs only while the section is on screen and user hasn't locked a tab
  useEffect(() => {
    if (isLightboxOpen || videoTabsManual || !ledInView) return;
    const tabOrder: Array<'long' | 'short' | 'thumbnail'> = ['long', 'short', 'thumbnail'];
    const intervalId = window.setInterval(() => {
      setActiveVideoTab((prev) => tabOrder[(tabOrder.indexOf(prev) + 1) % tabOrder.length]);
    }, 3000);
    return () => window.clearInterval(intervalId);
  }, [isLightboxOpen, videoTabsManual, ledInView]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Thumbnails: long-form playlist only (no shorts), no duplicated rows
  const thumbnailList = playlist.map((video, idx) => ({
    id: idx + 1,
    image: video.thumbnailUrl,
    title: video.title,
  }));

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

  return (
    <section
      ref={ledSectionRef}
      className="relative w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12 py-12 sm:py-14 md:py-20 lg:py-24 overflow-hidden z-50"
      style={{
        background:
          'linear-gradient(135deg, rgba(255,190,2,0.32) 0%, #fff8e6 38%, #fff8e6 62%, rgba(255,190,2,0.28) 100%)',
      }}
    >
      {/* Warm yellow wash — bottom-right (no hard edge: large blur only) */}
      <div
        className="absolute bottom-[-12%] right-[-15%] w-[min(95%,560px)] sm:w-[min(78%,680px)] aspect-square rounded-full bg-[#FFBE02]/35 blur-[100px] sm:blur-[128px] z-[8] pointer-events-none"
        aria-hidden
      />
      {/* Shades — feathered into section so no visible horizontal seam */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px] xl:h-[460px] z-10 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.35)_14%,black_28%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.35)_14%,black_28%)]"
        aria-hidden
      >
        <Image
          src="/book-to-video/shades.png"
          alt="Shades Shadow"
          fill
          className="object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff8e6]/0 via-[#FFBE02]/12 to-[#FFBE02]/28 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-30">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-5 sm:mb-6 lg:mb-8 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-zinc-900 mb-3 sm:mb-4 text-center font-serif">
            Videos We Created
          </h2>

          <div className="flex items-center gap-6 sm:gap-8 md:gap-10 border-b border-gray-200 w-full max-w-[500px] justify-center pb-2">
            <button
              type="button"
              onClick={() => {
                setVideoTabsManual(true);
                setActiveVideoTab('long');
              }}
              className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer font-['Poppins'] ${activeVideoTab === 'long'
                  ? 'text-[#FFBE02] border-b-2 border-[#FFBE02]'
                  : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              Long
            </button>
            <button
              type="button"
              onClick={() => {
                setVideoTabsManual(true);
                setActiveVideoTab('short');
              }}
              className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer font-['Poppins'] ${activeVideoTab === 'short'
                  ? 'text-[#FFBE02] border-b-2 border-[#FFBE02]'
                  : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              Short
            </button>
            <button
              type="button"
              onClick={() => {
                setVideoTabsManual(true);
                setActiveVideoTab('thumbnail');
              }}
              className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer font-['Poppins'] ${activeVideoTab === 'thumbnail'
                  ? 'text-[#FFBE02] border-b-2 border-[#FFBE02]'
                  : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              Thumbnails
            </button>
          </div>
        </div>

        {/* Mobile: shadow bahar; border seedha YouTube screen panel pe (neeche inner div) */}
        <div className="relative w-full max-w-[min(92vw,316px)] mx-auto md:max-w-[1000px] lg:max-w-[1080px] perspective-[1000px] max-md:drop-shadow-[0_3px_14px_rgba(0,0,0,0.14)]">
          <div className={`relative w-full z-20 pointer-events-none mx-auto ${width < 768 ? 'aspect-[10/20]' : 'aspect-[16/9]'}`}>
            <Image
              src={width < 768 ? '/youtube-page/mobile-removebg-preview.png' : '/book-to-video/fourth_S_TV.png'}
              alt={width < 768 ? 'Phone frame' : 'TV frame'}
              fill
              className={`object-contain ${width < 768 ? '' : 'scale-105'}`}
              sizes={width < 768 ? '(max-width: 767px) 316px, 100vw' : '(max-width: 1080px) 100vw, 1080px'}
            />
          </div>

          {/* Internal Screen — mobile: patla border yahi (YouTube UI ke sath); insets thode tight */}
          <div
            className={`absolute bg-white z-40 overflow-hidden shadow-inner box-border ${
              width < 768
                ? 'rounded-[22px] border-[4px] border-black'
                : 'rounded-t-[5px] sm:rounded-t-[7px] rounded-b-[11px] sm:rounded-b-[14px]'
            }`}
            style={
              width < 768
                ? {
                    top: '10.35%',
                    left: '6.95%',
                    right: '6.95%',
                    bottom: '9.95%',
                  }
                : {
                    top: width < 1024 ? 'calc(14.25% - 52px)' : 'calc(16.25% - 68px)',
                    left: width < 1024 ? 'calc(10% - 16px)' : 'calc(11% - 24px)',
                    right: width < 1024 ? 'calc(10% - 16px)' : 'calc(11% - 24px)',
                    bottom: width < 1024 ? 'calc(16.75% - 28px)' : 'calc(18.75% - 36px)',
                  }
            }
          >
            {/* YouTube Header — compact to match smaller bezel */}
            <div className="sticky top-0 z-50 bg-white h-10 sm:h-11 md:h-12 flex items-center justify-between px-1.5 sm:px-2.5 md:px-3 shrink-0 shadow-sm border-b border-gray-200">
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full">
                  <Menu className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-gray-900" />
                </button>
                <div className="relative h-[18px] w-[5.5rem] sm:h-5 sm:w-24 md:h-5 md:w-28 cursor-pointer flex items-center">
                  <Image src="/images/duck-logo-final.png" alt="Logo" fill className="object-contain object-left" />
                </div>
              </div>
              <div className="flex-1 max-w-[420px] mx-1 sm:mx-2 md:mx-3 hidden md:flex items-center gap-2">
                <div className="flex w-full">
                  <div className="flex flex-1 items-center border border-gray-300 rounded-l-full px-2.5 py-0.5 shadow-inner bg-white focus-within:border-[#FFBE02] ml-4">
                    <input type="text" placeholder="Search" className="w-full py-1 text-[13px] outline-none font-normal text-gray-700 placeholder-gray-500" />
                  </div>
                  <button className="bg-[#f8f8f8] border border-l-0 border-gray-300 rounded-r-full px-3 flex items-center justify-center hover:bg-[#f0f0f0]">
                    <Search className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <button className="p-1.5 bg-[#f9f9f9] rounded-full hover:bg-[#e5e5e5]">
                  <Mic className="w-4 h-4 text-gray-900" />
                </button>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <button className="p-1 hover:bg-gray-100 rounded-full hidden sm:block"><Bell className="w-4 h-4 text-gray-900" /></button>
                <div className="ml-0.5 sm:ml-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FFBE02] text-black flex items-center justify-center text-[10px] sm:text-xs font-bold cursor-pointer">D</div>
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full h-[calc(100%-2.5rem)] sm:h-[calc(100%-2.75rem)] md:h-[calc(100%-3rem)] overflow-hidden bg-white relative">
              {/* LONG VIDEO TAB */}
              {activeVideoTab === 'long' && (
                <div className="w-full h-full flex flex-col lg:flex-row p-2 sm:p-3 md:p-4 lg:p-4 gap-2 sm:gap-3 md:gap-4 overflow-y-auto">
                  <div className="w-full lg:w-[70%]">
                    <div className="w-full aspect-video bg-black rounded-md sm:rounded-lg overflow-hidden shadow-sm mb-2 sm:mb-3">
                      <iframe
                        key={`${currentVideo.videoId}-${ledInView ? 'on' : 'off'}`}
                        width="100%"
                        height="100%"
                        src={ledAwareEmbedSrc(ledInView, currentVideo.videoId, currentVideo.src)}
                        title="Player"
                        allow="autoplay; encrypted-media"
                        loading="lazy"
                        className="border-0"
                      />
                    </div>
                    <h1 className="text-sm sm:text-[15px] md:text-base font-bold text-zinc-900 mb-1.5 sm:mb-2 leading-snug sm:leading-tight font-serif line-clamp-3">
                      {currentVideo.title}
                    </h1>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 sm:pb-3 gap-2 sm:gap-3">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-gray-200 border border-gray-100">
                          <Image src="/images/duck-logo-final.png" alt="Avatar" fill className="object-contain p-1" />
                        </div>
                        <div className="flex flex-col mr-2">
                          <p className="font-bold text-[13px] sm:text-sm text-zinc-900 leading-tight font-['Poppins']">{currentVideo.channel}</p>
                          {currentVideo.subscribers ? (
                            <p className="text-[11px] text-gray-600 font-['Poppins']">{currentVideo.subscribers} subscribers</p>
                          ) : null}
                        </div>
                        <button className="bg-[#FFBE02] hover:bg-[#e6aa02] text-black px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-[13px] font-bold transition-colors font-['Poppins']">
                          Subscribe
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <div className="flex items-center bg-[#f2f2f2] rounded-full overflow-hidden h-8">
                          <button className="flex items-center gap-1.5 px-3 hover:bg-[#e5e5e5] border-r border-[#d9d9d9] h-full transition-colors">
                            <span className="text-xs font-medium text-zinc-900 font-['Poppins']">12K</span>
                          </button>
                        </div>
                        <button className="flex items-center gap-1.5 bg-[#f2f2f2] px-3 py-1.5 rounded-full hover:bg-[#e5e5e5] transition-colors h-8">
                          <Share2 className="w-3.5 h-3.5 text-zinc-900" />
                          <span className="text-xs font-medium text-zinc-900 font-['Poppins']">Share</span>
                        </button>
                        <button className="flex items-center justify-center bg-[#f2f2f2] w-8 h-8 rounded-full hover:bg-[#e5e5e5] transition-colors">
                          <MoreVertical className="w-3.5 h-3.5 text-zinc-900" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#f2f2f2] rounded-lg p-2 sm:p-2.5 text-xs sm:text-[13px] text-zinc-900 hover:bg-[#e5e5e5] transition-colors cursor-pointer font-['Poppins']">
                      <p className="font-bold mb-1">{[currentVideo.views, currentVideo.date].filter(Boolean).join(' • ')}</p>
                      <p className="whitespace-pre-line leading-relaxed">{currentVideo.desc}</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-[30%] flex flex-col gap-2">
                    {playlist.map((video) => (
                      <div
                        key={video.id}
                        onClick={() =>
                          setCurrentVideo({
                            ...video,
                            src: video.src.replace('autoplay=0', 'autoplay=1'),
                          })
                        }
                        className="flex gap-1.5 cursor-pointer group"
                      >
                        <div className="relative w-[120px] sm:w-[136px] md:w-[148px] h-[68px] sm:h-[76px] md:h-[84px] flex-shrink-0 rounded-lg overflow-hidden bg-black">
                          <Image
                            src={video.thumbnailUrl}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="148px"
                          />
                          {video.duration ? (
                            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] tracking-wide z-10">
                              {video.duration}
                            </span>
                          ) : null}
                        </div>
                        <div className="flex flex-col pr-2 min-w-0">
                          <h4 className="text-[12px] sm:text-[13px] font-semibold text-zinc-900 line-clamp-2 leading-tight mb-0.5 font-['Poppins']">
                            {video.title}
                          </h4>
                          <p className="text-[11px] text-gray-600 font-['Poppins']">{video.channel}</p>
                          <p className="text-[11px] text-gray-600 font-['Poppins']">{[video.views, video.date].filter(Boolean).join(' • ')}</p>
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
                        className="relative z-30 w-[72%] max-w-[168px] sm:max-w-[188px] md:max-w-[208px] lg:max-w-[236px] xl:max-w-[252px] aspect-[9/16] max-h-[82%] sm:max-h-[400px] md:max-h-[460px] lg:max-h-[520px] bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-2xl mx-auto"
                      >
                        <iframe
                          key={`${shortsList[currentShortIndex].videoId}-${ledInView ? 'on' : 'off'}`}
                          width="100%"
                          height="100%"
                          src={ledAwareEmbedSrc(
                            ledInView,
                            shortsList[currentShortIndex].videoId,
                            shortsList[currentShortIndex].src,
                          )}
                          title="Shorts"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                          className="border-0 object-cover"
                        />
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
                  <div className="w-full h-full overflow-y-auto p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5 w-full">
                      {thumbnailList.map((thumbnail, idx) => (
                          <motion.div
                            key={thumbnail.id}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: (idx % 3) * 0.1 }}
                            onClick={() => {
                              setActiveThumbnailIndex(idx);
                              if (width >= 768) {
                                setIsLightboxOpen(true);
                              }
                            }}
                            className="group cursor-pointer flex flex-col gap-2"
                          >
                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
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
                            <div className="flex items-start justify-between px-0.5">
                              <h4 className="text-sm font-bold text-zinc-900 group-hover:text-[#FFBE02] transition-colors duration-300 line-clamp-1 font-['Poppins']">
                                {thumbnail.title}
                              </h4>
                            </div>
                          </motion.div>
                      ))}
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
                                    sizes="(max-width: 900px) 100vw, 900px"
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

// --- 5. WHY YOUTUBE SECTION ---
const WhyYouTubeSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#efefef] relative z-10">
      <div className="pointer-events-none absolute -top-20 left-[-12%] h-[240px] w-[240px] rounded-full bg-[#FFBE02]/16 blur-[85px]" />
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-7 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-full"
          >
            <div className="relative w-full max-w-[500px] mx-auto lg:mx-0 rounded-[2rem] overflow-hidden shadow-[0_18px_45px_-25px_rgba(0,0,0,0.45)] min-h-[460px] sm:min-h-[520px] lg:min-h-[650px]">
              <Image src="/youtube-page/why_youtube.png" alt="Why Cinema" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 500px" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center h-full"
          >
            <div className="relative inline-flex items-center mb-6 mt-4 pl-2">
              {/* Red Button Box */}
              <div className="bg-[#FF0000] text-white pl-8 sm:pl-10 pr-16 sm:pr-20 py-3.5 sm:py-4.5 rounded-[1.25rem] sm:rounded-[1.5rem] text-[1.6rem] sm:text-[2rem] font-black tracking-tight leading-none shadow-[0_10px_25px_rgba(255,0,0,0.35)]">
                Why Cinema ?
              </div>

            </div>

            <h2 className="text-[3.05rem] sm:text-[3.4rem] font-black text-black leading-[0.95] tracking-[-0.02em]">
              How It Works
            </h2>
            <h3 className="text-[2.2rem] sm:text-[2.6rem] font-medium text-zinc-900 leading-[1.02] tracking-[-0.02em] mb-6 sm:mb-7">
              The 7-Days Roadmap
            </h3>

            <div className="space-y-4">
              <div className="bg-[#f4f4f4] border border-[#e6e6e6] rounded-[1.9rem] px-6 sm:px-7 py-5 sm:py-6 shadow-[0_8px_20px_-18px_rgba(0,0,0,0.35)]">
                <p className="text-[1.08rem] sm:text-[1.24rem] leading-tight text-zinc-900">
                  <span className="font-extrabold">Phase 1 - </span>
                  <span className="font-medium">Cinematic Transformation</span>
                </p>
                <p className="mt-1.5 text-[0.96rem] sm:text-[1rem] leading-[1.15] text-zinc-700">
                  We adapt your manuscript into a high-retention, animated Cinema series. We build the visuals that stop the scroll.
                </p>
              </div>

              <div className="bg-[#f4f4f4] border border-[#e6e6e6] rounded-[1.9rem] px-6 sm:px-7 py-5 sm:py-6 shadow-[0_8px_20px_-18px_rgba(0,0,0,0.35)]">
                <p className="text-[1.08rem] sm:text-[1.24rem] leading-tight text-zinc-900">
                  <span className="font-extrabold">Phase 2 - </span>
                  <span className="font-medium">Global Distribution</span>
                </p>
                <p className="mt-1.5 text-[0.96rem] sm:text-[1rem] leading-[1.15] text-zinc-700">
                  We launch your book across 200+ global retailers. You keep 100% of your rights and every cent of your royalties.
                </p>
              </div>

              <div className="bg-[#f4f4f4] border border-[#e6e6e6] rounded-[1.9rem] px-6 sm:px-7 py-5 sm:py-6 shadow-[0_8px_20px_-18px_rgba(0,0,0,0.35)]">
                <p className="text-[1.08rem] sm:text-[1.24rem] leading-tight text-zinc-900">
                  <span className="font-extrabold">Phase 3 - </span>
                  <span className="font-medium">The Viral Funnel</span>
                </p>
                <p className="mt-1.5 text-[0.96rem] sm:text-[1rem] leading-[1.15] text-zinc-700">
                  Your Cinema series acts as a 24/7 sales machine, funneling viewers directly from your episodes to your checkout page.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

type SlidingReview = {
  name: string;
  role: string;
  text: string;
  /** Set only when you have a real photo for this author; otherwise initials show */
  avatarSrc?: string;
};

function getAuthorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const a = parts[0].replace(/\./g, "")[0] ?? "?";
  const b = parts[parts.length - 1].replace(/\./g, "")[0] ?? "?";
  return (a + b).toUpperCase();
}

// --- 6. SLIDING TESTIMONIALS SECTION ---
const SlidingTestimonials = () => {
  const reviewsRow1: SlidingReview[] = [
    { name: "Sarah Jenkins", role: "Fiction Author", text: "My book sales exploded after the cinematic trailer went live on Cinema!" },
    { name: "Michael T.", role: "Bestseller", text: "The cash cow strategy worked flawlessly. Passive income is real." },
    { name: "Emily Rose", role: "Indie Publisher", text: "Unbelievable quality. The 2D animation brought my characters to life.", avatarSrc: "/book-to-video/review-author-user-1.png" },
    { name: "David Clarke", role: "Author", text: "They handled everything from script to upload. Absolute lifesavers!", avatarSrc: "/book-to-video/review-author-user-2.png" },
    { name: "Anita S.", role: "Writer", text: "Best marketing investment I have ever made for my series.", avatarSrc: "/youtube-page/review-author-5.png" },
  ];

  const reviewsRow2: SlidingReview[] = [
    { name: "John Doe", role: "Fantasy Writer", text: "They turned my 300-page book into a viral 15-minute masterpiece.", avatarSrc: "/book-to-video/review-author-user-1.png" },
    { name: "Elena G.", role: "Non-Fiction", text: "The team is incredibly talented. My audience engagement is up 400%.", avatarSrc: "/book-to-video/review-author-user-2.png" },
    { name: "Robert Fox", role: "Historian", text: "Highly professional and the video quality is just out of this world." },
    { name: "Linda M.", role: "Romance Author", text: "I was skeptical at first, but the results speak for themselves." },
    { name: "Chris P.", role: "Author", text: "If you want your book noticed in 2024, you need their services." },
  ];

  const TestimonialCard = ({ item }: { item: SlidingReview }) => (
    <div className="w-[320px] md:w-[380px] bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4 flex-shrink-0">
      <div className="flex text-[#FFBE02]">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
      </div>
      <p className="text-gray-700 italic flex-1 text-sm md:text-base leading-relaxed">&quot;{item.text}&quot;</p>
      <div className="flex items-center gap-3 mt-2">
        {item.avatarSrc ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200/80">
            <Image src={item.avatarSrc} alt={item.name} fill className="object-cover" sizes="40px" />
          </div>
        ) : (
          <div className="w-10 h-10 bg-gradient-to-tr from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold flex-shrink-0">
            {getAuthorInitials(item.name)}
          </div>
        )}
        <div>
          <h5 className="font-bold text-gray-900 text-sm">{item.name}</h5>
          <p className="text-xs text-gray-500">{item.role}</p>
        </div>
      </div>
    </div>
  );

  const MarqueeRow = ({ items, direction = 1, speed = 40 }: { items: SlidingReview[]; direction?: number; speed?: number }) => (
    <div className="book-video-testimonial-row flex w-full overflow-hidden mb-6 relative">
      <div
        className={
          direction === 1
            ? 'book-video-testimonial-track book-video-testimonial-track--ltr'
            : 'book-video-testimonial-track book-video-testimonial-track--rtl'
        }
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-20 overflow-hidden relative bg-gradient-to-b from-violet-100/50 via-[#FFBE02]/28 to-[#FFBE02]/18">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 font-serif tracking-tight">
          Join <span className="text-[#FFBE02]">Authors</span>
        </h2>
        <p className="text-gray-500 mt-2 text-lg italic">Who have achieved massive success.</p>
      </div>

      <div className="relative w-full flex flex-col items-center rotate-[-1deg] scale-105">
        <MarqueeRow items={reviewsRow1} direction={1} speed={78} />
        <MarqueeRow items={reviewsRow2} direction={-1} speed={85} />

        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#fff8e6] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#fff8e6] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

// --- 7. RIGHT FIT SECTION ---
const RightFitSection = () => {
  const forYouList = [
    "You believe your book deserves global reach.",
    "You want expert editing, design, and translation.",
    "You prefer a dedicated team over DIY management.",
    "You value quality across every detail and format.",
    "You want full ownership and creative control.",
    "You are ready to invest in long-term visibility and impact."
  ];

  const notForYouList = [
    "You are looking for a quick or low-cost solution.",
    "Your project skips professional editing, design, or polish.",
    "Your book is limited to only one format or market.",
    "You want to manage everything yourself.",
    "You aren't focused on visibility, reach, or legacy."
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#efefef] font-sans relative overflow-hidden">
      <div className="pointer-events-none absolute -top-16 right-[-10%] h-[220px] w-[220px] rounded-full bg-[#FFBE02]/14 blur-[80px]" />
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">

        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-[2rem] sm:text-[3.25rem] md:text-[4rem] leading-none tracking-tight mb-1.5 sm:mb-3">
            <span className="font-bold text-[#EAB308]">Right</span>{" "}
            <span className="font-normal text-[#1F1F1F]">Fit</span>
          </h2>
          <p className="text-[1.02rem] sm:text-[1.65rem] md:text-[1.85rem] text-[#333333] font-light tracking-wide">
            Is This the for You?
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-9">

          {/* LEFT CARD: This is for you — gold / theme */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.1rem] p-9 sm:p-11 md:p-12 h-full border border-[#FFBE02]/35 shadow-[0_22px_48px_-20px_rgba(234,179,8,0.35)] bg-gradient-to-br from-[#fffefb] via-[#fff8e8] to-[#FFBE02]/20"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay pointer-events-none" />
            <div className="absolute -top-16 -right-10 w-52 h-52 rounded-full bg-[#FFBE02]/30 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#EAB308]/20 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-[2rem] sm:text-[2.25rem] font-bold text-[#b45309] mb-6 sm:mb-7 tracking-tight leading-tight drop-shadow-sm">
                This is for you if:
              </h3>
              <ul className="flex flex-col gap-3.5 sm:gap-4">
                {forYouList.map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#FFBE02] text-[1.2rem] leading-[1.2] mt-0.5 font-bold">•</span>
                    <span className="text-[1.05rem] sm:text-[1.34rem] leading-[1.45] text-[#1f2937] font-medium">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* RIGHT CARD: same purple gradient as centered 2D Animation service card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.1rem] p-0.5 sm:p-1 bg-gradient-to-b from-white/35 to-white/5 shadow-[0_24px_56px_-18px_rgba(139,45,240,0.45)] h-full"
          >
            <div className="relative overflow-hidden rounded-[calc(2rem-4px)] sm:rounded-[calc(2.1rem-4px)] p-9 sm:p-11 md:p-12 h-full bg-gradient-to-br from-[#8B2DF0] via-[#D925C8] to-[#FF5E00]">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
              <div className="absolute -bottom-16 -left-10 w-52 h-52 rounded-full bg-white/10 blur-3xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-[#8B2DF0]/40 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-14 sm:h-16 bg-gradient-to-t from-black/15 to-transparent pointer-events-none rounded-b-[inherit]" />
              <div className="relative z-10">
                <h3 className="text-[2rem] sm:text-[2.25rem] font-bold italic text-white mb-6 sm:mb-7 tracking-tight leading-tight drop-shadow-md">
                  This isn&apos;t for you if:
                </h3>
                <ul className="flex flex-col gap-3.5 sm:gap-4">
                  {notForYouList.map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#FFBE02] text-[1.2rem] leading-[1.2] mt-0.5 font-bold italic">•</span>
                      <span className="text-[1.05rem] sm:text-[1.34rem] leading-[1.45] text-white/95 italic font-medium">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- 9. FAQS SECTION ---
const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: "How long does the entire video creation process take?", a: "Depending on the complexity (2D animation vs standard editing), it generally takes between 2 to 4 weeks from script approval to final delivery." },
    { q: "Do I need to have my own script ready?", a: "Not at all! Our professional scriptwriters will analyze your book and craft a highly engaging script designed for Cinema audience retention." },
    { q: "Do you guarantee a certain amount of views?", a: "While we use battle-tested strategies to maximize algorithmic reach, Cinema is an organic platform, so we cannot promise exact view counts. We do guarantee premium, highly engaging production." },
    { q: "Who owns the rights to the finalized video?", a: "You do! Once the project is complete and paid in full, you retain 100% of the commercial rights to the video to use anywhere you like." }
  ];

  return (
    <section className="py-24 bg-[#fafaf9] relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-[-8%] h-[260px] w-[260px] rounded-full bg-[#FFBE02]/16 blur-[90px]" />
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-serif text-gray-900">
          Frequently Asked <span className="text-[#FFBE02]">Questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span className="font-bold text-lg text-gray-800">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 10. BOOK-TO-VIDEO FOOTER (layout/typography inspired by spines.com footer) ---
const footerFont =
  'font-[system-ui,-apple-system,BlinkMacSystemFont,"Segoe_UI",sans-serif]';
const footerColTitle =
  `text-[16px] sm:text-[17px] font-semibold tracking-[0.03em] text-slate-900 mb-5 ${footerFont}`;
const footerLinkClass =
  `text-[16px] sm:text-[18px] leading-[1.5] text-slate-600 hover:text-slate-900 transition-colors ${footerFont}`;

const BookToVideoFooterSocial = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF0000] to-[#FFBE02] text-white shadow-md hover:brightness-110 transition-transform transition-colors hover:-translate-y-0.5"
  >
    {children}
  </a>
);

const PaymentMarkVisa = () => (
  <span className="inline-flex h-8 min-w-[48px] items-center justify-center rounded bg-white px-2 shadow-sm ring-1 ring-black/5" aria-hidden>
    <svg viewBox="0 0 48 16" className="h-3.5 w-auto" fill="none"><path fill="#1434CB" d="M20 2h8l-5 12h-8l5-12ZM31 2h5.5l3.5 6.2L42.5 2H47l-5 12h-5l5-12H31V2ZM9 2L4 14H0l2.2-5.5L2 2h7Zm2.5 0L9 14H5l2.5-12H11.5Z"/></svg>
  </span>
);
const PaymentMarkMastercard = () => (
  <span className="inline-flex h-8 min-w-[46px] items-center justify-center rounded bg-white px-2 shadow-sm ring-1 ring-black/5" aria-hidden>
    <svg viewBox="0 0 40 24" className="h-5 w-auto"><circle cx="15" cy="12" r="10" fill="#EB001B"/><circle cx="25" cy="12" r="10" fill="#F79E1B"/><path d="M20 5.5a10 10 0 000 13 10 10 0 010-13Z" fill="#FF5F00"/></svg>
  </span>
);
const PaymentMarkAmex = () => (
  <span className="inline-flex h-8 min-w-[50px] items-center justify-center rounded bg-[#006FCF] px-2 shadow-sm" aria-hidden>
    <span className="text-[10px] font-bold tracking-tight text-white">AMEX</span>
  </span>
);
const PaymentMarkDiscover = () => (
  <span className="inline-flex h-8 min-w-[56px] items-center justify-center rounded bg-white px-2 shadow-sm ring-1 ring-black/5" aria-hidden>
    <span className="text-[10px] font-bold text-[#E9752F]">DISCOVER</span>
  </span>
);
const PaymentMarkPayPal = () => (
  <span className="inline-flex h-8 min-w-[54px] items-center justify-center rounded bg-white px-2 shadow-sm ring-1 ring-black/5" aria-hidden>
    <span className="text-[10px] font-bold"><span className="text-[#003087]">Pay</span><span className="text-[#009cde]">Pal</span></span>
  </span>
);
const PaymentMarkApple = () => (
  <span className="inline-flex h-8 min-w-[58px] items-center justify-center rounded bg-black px-2 shadow-sm" aria-hidden>
    <span className="text-[9px] font-semibold tracking-tight text-white leading-none"> Apple Pay</span>
  </span>
);
const PaymentMarkGoogle = () => (
  <span className="inline-flex h-8 min-w-[60px] items-center justify-center rounded bg-white px-2 shadow-sm ring-1 ring-black/5" aria-hidden>
    <span className="text-[10px] font-medium text-slate-700">G Pay</span>
  </span>
);

const BookToVideoFooter = () => {
  return (
    <footer className="bg-white pt-16 pb-10 mt-8 border-t border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="rounded-[32px] shadow-xl border border-[#ffe19a] bg-gradient-to-br from-[#fff8da] via-[#fff6f6] to-[#ffe7d8] px-5 sm:px-9 lg:px-8 xl:px-10 py-10 sm:py-12 overflow-hidden">
          {/* Logo + 4 menus + contact — tighter gaps so Legal + Get in touch sit on one row without horizontal scroll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-7 gap-x-3 sm:gap-x-4 xl:gap-x-5 lg:justify-items-start">
            {/* Logo column */}
            <div className="min-w-0 lg:col-span-1 flex flex-col items-start">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/duck-logo-final.png"
                  alt={`${COMPANY_NAME} logo`}
                  width={180}
                  height={72}
                  className="h-[56px] sm:h-[62px] md:h-[70px] lg:h-[78px] w-auto object-contain"
                />
              </Link>
            </div>

            {/* Product */}
            <div className="min-w-0">
              <h4 className={footerColTitle}>Product</h4>
              <ul className="space-y-3">
                <li><Link href="/book-to-video" className={footerLinkClass}>Book to Cinema</Link></li>
                <li><Link href="/services" className={footerLinkClass}>Our Services</Link></li>
                <li><span className={footerLinkClass + ' cursor-default'}>Cash Cow &amp; Long-form</span></li>
                <li><span className={footerLinkClass + ' cursor-default'}>2D Animation</span></li>
                <li><span className={footerLinkClass + ' cursor-default'}>Face Content</span></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="min-w-0">
              <h4 className={footerColTitle}>Resources</h4>
              <ul className="space-y-3">
                <li><Link href="/book-to-video#calendly" className={footerLinkClass}>How it works</Link></li>
                <li><Link href="/news" className={footerLinkClass}>Writing &amp; publishing blog</Link></li>
                <li><Link href="/authors" className={footerLinkClass}>For authors</Link></li>
                <li><Link href="/books" className={footerLinkClass}>Books</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="min-w-0">
              <h4 className={footerColTitle}>Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className={footerLinkClass}>About us</Link></li>
                <li><Link href="/news" className={footerLinkClass}>News and media</Link></li>
                <li><Link href="/careers" className={footerLinkClass}>Careers</Link></li>
                <li><Link href="/services" className={footerLinkClass}>Testimonials</Link></li>
              </ul>
            </div>

            {/* Legal — nudged slightly left so more room for Get in touch */}
            <div className="min-w-0 lg:-translate-x-1 xl:-translate-x-2">
              <h4 className={footerColTitle}>Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className={footerLinkClass}>Terms and conditions</a></li>
                <li><a href="#" className={footerLinkClass}>Privacy policy</a></li>
                <li><a href="#" className={footerLinkClass}>Cancellation policy</a></li>
                <li><span className={footerLinkClass + ' cursor-default'}>Cookie settings</span></li>
              </ul>
            </div>

            {/* Get in touch — left-aligned; column keeps min width so email + phone stay one line */}
            <div className="min-w-0 w-full lg:col-span-1 lg:justify-self-start text-left">
              <h4 className={`${footerColTitle} text-left`}>Get in touch</h4>
              <div className={`space-y-2 text-[14px] sm:text-[15px] xl:text-[16px] leading-relaxed text-slate-600 ${footerFont}`}>
                <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-1 font-normal">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="whitespace-nowrap text-slate-600 hover:text-slate-900 underline-offset-2 hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <span className="text-slate-300 select-none" aria-hidden>
                    ·
                  </span>
                  <a href="tel:+13464637721" className="whitespace-nowrap text-slate-600 hover:text-slate-900">
                    Main: {CONTACT_PHONE}
                  </a>
                </div>
                <p className="text-[15px] sm:text-[16px] text-slate-600 pt-0.5 leading-snug">{COMPANY_ADDRESS}</p>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <BookToVideoFooterSocial href="https://www.facebook.com/duckbookwriters" label="Facebook">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.03H7.9v-2.9h2.54V9.77c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.94 8.44-9.94Z" />
                  </svg>
                </BookToVideoFooterSocial>
                <BookToVideoFooterSocial href="https://www.instagram.com/duckbookwriters/" label="Instagram">
                  <Image src="/images/instagram.svg" alt="" width={22} height={22} className="h-[22px] w-[22px] brightness-0 invert" />
                </BookToVideoFooterSocial>
                <BookToVideoFooterSocial href="https://www.youtube.com/results?search_query=Duck+Book+Writers" label="Cinema">
                  <svg className="h-5 w-[22px]" viewBox="0 0 24 18" fill="currentColor" aria-hidden>
                    <path d="M23.5 4.5a2.8 2.8 0 0 0-1.98-2C19.5 2 12 2 12 2s-7.5 0-9.52.5A2.8 2.8 0 0 0 .5 4.5 29 29 0 0 0 0 9a29 29 0 0 0 .5 4.5 2.8 2.8 0 0 0 1.98 2C4.5 16 12 16 12 16s7.5 0 9.52-.5a2.8 2.8 0 0 0 1.98-2 29 29 0 0 0 .5-4.5 29 29 0 0 0-.5-4.5ZM9.75 12.25V5.75L15.5 9l-5.75 3.25Z"/>
                  </svg>
                </BookToVideoFooterSocial>
              </div>
            </div>
          </div>

          {/* Bottom: trust badges + payment marks + copyright (Spines-style) */}
          <div className="mt-12 pt-8 border-t border-[#ffd98a] flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between bg-white/55 rounded-2xl px-4 sm:px-6 py-5">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              <div className="flex gap-3 max-w-[280px] sm:max-w-[300px]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FF0000]/10 text-[#FF0000]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className={`text-[17px] sm:text-[18px] font-semibold text-slate-900 ${footerFont}`}>100% hassle-free</p>
                  <p className={`mt-1.5 text-[15px] sm:text-[16px] leading-snug text-slate-600 ${footerFont}`}>30-day money-back guarantee</p>
                </div>
              </div>
              <div className="flex gap-3 max-w-[300px] sm:max-w-[340px]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFBE02]/15 text-[#b45309]">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <p className={`text-[17px] sm:text-[18px] font-semibold text-slate-900 ${footerFont}`}>SSL Secure payment</p>
                  <p className={`mt-1.5 text-[15px] sm:text-[16px] leading-snug text-slate-600 ${footerFont}`}>Your information is protected by 256-bit SSL encryption</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div
                className="flex flex-wrap items-center gap-2.5"
                role="list"
                aria-label="Accepted payment methods"
              >
                <PaymentMarkApple />
                <PaymentMarkDiscover />
                <PaymentMarkGoogle />
                <PaymentMarkMastercard />
                <PaymentMarkAmex />
                <PaymentMarkPayPal />
                <PaymentMarkVisa />
              </div>
              <p className={`text-[15px] sm:text-[16px] text-slate-600 ${footerFont}`}>
                <Link href="/" className="hover:text-slate-800 underline-offset-2 hover:underline">Home</Link>
                {' · '}
                © {new Date().getFullYear()} {COMPANY_NAME}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const heroReviewAuthorAvatars = [
  { src: '/youtube-page/review-author-1.png', alt: 'Author' },
  { src: '/youtube-page/review-author-2.png', alt: 'Author' },
  { src: '/youtube-page/review-author-3.png', alt: 'Author' },
  { src: '/youtube-page/review-author-4.png', alt: 'Author' },
  { src: '/youtube-page/review-author-5.png', alt: 'Author' },
] as const;

export default function BookToVideoPage() {
  return (
    <div className="w-full bg-[#fafaf9] font-sans selection:bg-red-200 selection:text-red-900 overflow-x-hidden">
      <Header />

      {/* 1. HERO BANNER SECTION (ELITE FULL-SCREEN ANIMATION) */}
      <section className="relative w-full min-h-0 max-md:h-auto md:min-h-[850px] md:h-[100dvh] bg-white pt-9 max-md:pt-12 sm:pt-12 md:pt-16 lg:pt-[4.25rem] pb-6 max-md:pb-9 sm:pb-6 flex flex-col items-center max-md:justify-start md:justify-between overflow-hidden font-sans">
        <div className="pointer-events-none absolute -top-24 right-[-14%] h-[320px] w-[320px] rounded-full bg-[#FFBE02]/20 blur-[110px]" />

        {/* --- 1. TOP TEXT AREA (Slides Down & Adjusted Size) --- */}
        <div className="relative z-50 flex flex-col items-center text-center px-4 sm:px-4 shrink-0 mt-0 sm:mt-0">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] leading-[1.12] text-[#111] mb-4 max-md:mb-5 sm:mb-2.5 tracking-tight"
          >
            <span className="font-normal text-black">Turn your Book into a </span>
            <span className="font-black text-[#FFBE02] tracking-tighter">Cinema</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12px] sm:text-[14px] md:text-[15px] text-gray-600 mb-10 max-md:mb-12 sm:mb-12 md:mb-16 max-w-[520px] mx-auto font-medium leading-relaxed"
          >
            For ambitious authors with a manuscript or a published book who are tired of being
          </motion.p>

        </div>

        {/* --- 2. THE STAGE: TV & BOOKS ANIMATION (With Proper Spacing) --- */}
        <div className="relative w-full min-w-0 flex-1 max-md:flex-none max-w-[100vw] mx-auto flex items-center justify-center mt-10 max-md:mt-16 sm:mt-24 md:mt-36 lg:mt-44 mb-8 max-md:mb-10 sm:mb-12 md:mb-16 pointer-events-none px-3 max-sm:px-4 sm:px-0">

          {/* Edge fade — z below books (z-10+) so covers aren’t hidden under white; TV stays z-50 */}
          <div className="absolute inset-0 z-[6] pointer-events-none">
            <div className="absolute top-0 bottom-0 left-0 w-[3%] max-w-[32px] bg-gradient-to-r from-white via-white/50 to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-[3%] max-w-[32px] bg-gradient-to-l from-white via-white/50 to-transparent" />
          </div>

          {/* Soft Shadow behind the TV & Books */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] bg-black/10 blur-[60px] z-0" />

          {/* The 8 Books Sliding Out (compact, slight overlap, fully visible) */}
          {[
            // Left side (inner → outer); x is % of book width — more negative = further left (fills left edge)
            { src: "/youtube-page/book-4.png", x: "-218%", y: "-50%", scale: 0.96, z: 16, delay: 0.62 },
            { src: "/youtube-page/book-3.png", x: "-272%", y: "-50%", scale: 0.92, z: 14, delay: 0.72 },
            { src: "/youtube-page/book-2.png", x: "-326%", y: "-50%", scale: 0.84, z: 12, delay: 0.82 },
            { src: "/youtube-page/book-1.png", x: "-382%", y: "-50%", scale: 0.77, z: 10, delay: 0.92 },

            // Right side (inner → outer)
            { src: "/youtube-page/book-6.png", x: "138%", y: "-50%", scale: 0.96, z: 16, delay: 0.62 },
            { src: "/youtube-page/hero-right-fatal-exchange.png", x: "198%", y: "-50%", scale: 0.92, z: 14, delay: 0.72 },
            { src: "/youtube-page/hero-right-educated.png", x: "236%", y: "-50%", scale: 0.84, z: 12, delay: 0.82 },
            { src: "/youtube-page/hero-right-paradox.png", x: "274%", y: "-50%", scale: 0.77, z: 10, delay: 0.92 },
          ].map((book, i) => (
            <motion.div
              key={`${book.src}-${i}`}
              className="absolute top-1/2 left-1/2 w-[90px] sm:w-[130px] md:w-[170px] lg:w-[210px] aspect-[2/3] overflow-hidden rounded-[2px] drop-shadow-[0_12px_22px_rgba(0,0,0,0.22)]"
              style={{ zIndex: book.z }}
              initial={{ x: "-50%", y: "-50%", opacity: 0, scale: 0.58 }}
              animate={{ x: book.x, y: book.y, opacity: 1, scale: book.scale }}
              transition={{
                duration: 1.9,
                delay: book.delay,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Image
                src={book.src}
                alt={`Book ${i + 1}`}
                fill
                sizes="(max-width: 640px) 90px, (max-width: 768px) 130px, (max-width: 1024px) 170px, 210px"
                className="object-cover object-center"
              />
            </motion.div>
          ))}

          {/* Center LED — must stay position:absolute (never add trailing `relative` — it overrides absolute and breaks centering) */}
          <motion.div
            className="absolute top-1/2 left-1/2 z-50 aspect-video max-sm:aspect-square w-full max-w-[min(268px,calc(100vw-2.5rem))] sm:max-w-none sm:w-[min(670px,calc(100vw-2rem))] md:w-[min(940px,calc(100vw-2.5rem))] lg:w-[min(1180px,95vw)] overflow-hidden drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
            initial={{ x: "-50%", y: "20%", opacity: 0 }}
            animate={{ x: "-50%", y: "-50%", opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/youtube-page/led.png"
              alt="LED display"
              fill
              className="object-contain object-center"
              priority
            />
          </motion.div>

        </div>

        {/* --- 3. BOTTOM REVIEWS: compact trust strip like reference --- */}
        <motion.div
          className="relative z-50 shrink-0 w-full max-w-[300px] sm:max-w-[480px] md:max-w-[560px] pt-7 max-md:pt-10 sm:pt-12 md:pt-24 lg:pt-28 mt-6 max-md:mt-8 sm:mt-8 md:mt-12 mb-6 max-md:mb-8 sm:mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
            <div className="flex items-center justify-center">
              {heroReviewAuthorAvatars.map((author, i) => (
                <div
                  key={author.src}
                  className="relative h-7 w-7 sm:h-9 sm:w-9 md:h-[42px] md:w-[42px] rounded-full border-[2px] border-white shadow-[0_6px_14px_rgba(0,0,0,0.18)] overflow-hidden bg-zinc-100 -ml-1 sm:-ml-1.5 first:ml-0"
                  style={{ zIndex: 10 + i }}
                >
                  <Image
                    src={author.src}
                    alt={author.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 28px, 42px"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-normal leading-none text-black tracking-tight">
                  Excellent
                </h3>
                <div className="flex items-center gap-0.5 pt-0.5" role="img" aria-label="4.5 out of 5 stars">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span
                      key={i}
                      className="inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
                      aria-hidden
                    >
                      <Star className="h-full w-full text-[#F8BE00] fill-[#F8BE00]" strokeWidth={0} />
                    </span>
                  ))}
                  <span
                    className="relative inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center overflow-hidden sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
                    aria-hidden
                  >
                    <Star className="absolute inset-0 h-full w-full text-zinc-200 fill-zinc-200" strokeWidth={0} />
                    <Star
                      className="absolute inset-0 h-full w-full text-[#F8BE00] fill-[#F8BE00] [clip-path:inset(0_50%_0_0)]"
                      strokeWidth={0}
                    />
                  </span>
                </div>
              </div>
              <p className="text-[12px] sm:text-[14px] md:text-[16px] leading-tight text-zinc-700 font-medium mt-0.5">
                based on 1000+ Cinema Channels
              </p>
              <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-[11px] font-semibold text-zinc-600 sm:justify-start">
                <span className="inline-flex items-center gap-1">
                  <span className="h-3.5 w-3.5 rounded-full bg-black text-white inline-flex items-center justify-center text-[8px]">G</span>
                  <span className="tracking-tight">Google</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#1877F2] text-white inline-flex items-center justify-center text-[8px]">f</span>
                  <span className="tracking-tight">Facebook</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-[2px] bg-emerald-500 text-white text-[9px]">★</span>
                  <span className="tracking-tight">Trustpilot</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-zinc-700 text-white text-[8px] font-bold">b</span>
                  <span className="tracking-tight">bark</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </section>

      <BookingSection />
      {/* 3. VIDEOS WE CREATED - YOUTUBE TV SECTION */}
      <YouTubeTVSection />

      {/* 4. SERVICES SECTION (BAAP LEVEL DESIGN) */}
      <VideoConversionServices />

      {/* 5. WHY YOUTUBE SECTION */}
      <WhyYouTubeSection />

      {/* 6. SLIDING TESTIMONIALS */}
      <SlidingTestimonials />

      {/* 7. RIGHT FIT SECTION */}
      <RightFitSection />

      {/* 8. Bottom Calendly — same flow, focused CTA after page scroll */}
      <section
        id="schedule-consultation"
        className="relative overflow-hidden bg-gradient-to-b from-white via-[#fafaf9] to-[#fff8ed]/50 py-16 sm:py-20 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-20%] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#FFBE02]/10 blur-[110px]" />
          <div className="absolute left-[-15%] bottom-0 h-[280px] w-[280px] rounded-full bg-violet-200/15 blur-[90px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            className="mb-10 text-center sm:mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 font-['Poppins'] text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              Next step
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-[2.75rem] md:leading-tight">
              Book your free{' '}
              <span className="text-[#FFBE02]">30-minute</span> consultation
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-['Poppins'] text-base leading-relaxed text-zinc-600 sm:text-lg">
              Same calendar as above — lock in a time when you&apos;re ready. We&apos;ll confirm by email and prep for your call.
            </p>
          </motion.div>
          <motion.div
            className="mx-auto max-w-[640px]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-[1.5rem] bg-white/90 p-1.5 shadow-[0_24px_64px_-12px_rgba(15,15,15,0.14),0_0_0_1px_rgba(0,0,0,0.05)] backdrop-blur-sm sm:rounded-[1.85rem] sm:p-2">
              <div className="overflow-hidden rounded-[1.25rem] border border-zinc-200/80 bg-zinc-50/40 sm:rounded-[1.65rem]">
                <div className="bg-white">
                  <CalendlyInlineEmbed
                    containerId="book-to-video-calendly-center"
                    heightPx={520}
                    heightPxMobile={440}
                    className="w-full min-h-[440px] sm:min-h-[520px] overflow-hidden bg-white"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. FAQs SECTION */}
      <FAQSection />

      {/* 10. Custom Spines-style footer just for Book-to-Video */}
      <BookToVideoFooter />
    </div>
  );
}