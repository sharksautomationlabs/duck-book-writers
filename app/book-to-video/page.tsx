'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CalendlyInlineWidget from '../components/CalendlyInlineWidget';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  PlayCircle, ArrowRight, 
  MonitorPlay, Sparkles,
  Menu, Search, Mic, Bell, Share2, MoreVertical, ChevronLeft, ChevronRight, X, Star, ChevronDown, CheckCircle2, XCircle
} from 'lucide-react';

// --- VIDEO CONVERSION SERVICES: swap order on timer; center = purple + hero image; sides = glass + image behind ---
type ServiceId = 'cash' | 'anim' | 'face';
type SlotPlacement = 'left' | 'center' | 'right';

const SERVICE_SLOT_ORDER: ServiceId[][] = [
  ['cash', 'anim', 'face'],
  ['anim', 'face', 'cash'],
  ['face', 'cash', 'anim'],
];

const layoutSpring = { type: 'spring' as const, stiffness: 320, damping: 34, mass: 0.9 };

const SERVICE_COPY: Record<
  ServiceId,
  { title: string; desc: string; heroSrc: string; isGif: boolean; Icon: typeof PlayCircle; centerBadge: string }
> = {
  cash: {
    title: 'Cash Cow Video',
    desc: "High-retention storytelling. We engineer scripts and visuals specifically to trigger YouTube's algorithm, turning your book's concepts into viral assets.",
    heroSrc: '/book-to-video/youtube-cash-cow-logo.png',
    isGif: false,
    Icon: PlayCircle,
    centerBadge: 'PREMIUM PICK',
  },
  anim: {
    title: '2D Animation',
    desc: 'Bring characters to life. We animate key scenes and abstract concepts into stunning 2D visuals that mesmerize viewers.',
    heroSrc: '/book-to-video/person.gif',
    isGif: true,
    Icon: Sparkles,
    centerBadge: 'MOST POPULAR',
  },
  face: {
    title: 'Face Content',
    desc: 'Personal connection. Use AI avatars or your own footage combined with professional editing to build a personal brand around your book.',
    heroSrc: '/book-to-video/action_seen.png',
    isGif: false,
    Icon: MonitorPlay,
    centerBadge: 'FEATURED',
  },
};

function ServiceCard({ id, placement }: { id: ServiceId; placement: SlotPlacement }) {
  const s = SERVICE_COPY[id];
  const Icon = s.Icon;
  const compactCashHero = id === 'cash';
  const centerHeroClassName = compactCashHero
    ? 'h-[110px] w-auto sm:h-[126px] md:h-[142px] lg:h-[162px] object-contain object-bottom drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)]'
    : `h-[130px] w-auto object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] sm:h-[160px] md:h-[180px] lg:h-[200px] ${
        s.isGif ? 'scale-100 sm:scale-105' : 'scale-95 sm:scale-100'
      }`;

  if (placement === 'center') {
    return (
      <div className="relative w-full z-20 -mb-4 sm:-mb-6 md:-mb-8 lg:-mb-12">
        {/* Hero asset: sibling of card so card can use overflow-hidden (no gray corner leaks) */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-40 flex w-[min(88vw,260px)] sm:w-[280px] md:w-[300px] lg:w-[320px] -translate-x-1/2 -translate-y-1/2 justify-center px-2">
          <Image
            src={s.heroSrc}
            alt=""
            width={400}
            height={600}
            className={centerHeroClassName}
            unoptimized={s.isGif}
            priority
          />
        </div>

        <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] bg-gradient-to-br from-[#8B2DF0] via-[#D925C8] to-[#FF5E00] text-center shadow-xl ring-1 ring-white/25 min-h-[200px] sm:min-h-[220px]">
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

          <div
            className="pointer-events-none absolute left-1/2 top-0 z-[2] h-[100px] w-[180px] sm:h-[120px] sm:w-[220px] md:h-[140px] md:w-[260px] -translate-x-1/2 translate-y-0 bg-gradient-to-b from-white/25 to-transparent blur-2xl sm:blur-3xl"
            aria-hidden
          />

          <div className="relative z-30 px-5 sm:px-8 md:px-10 pt-[5.5rem] sm:pt-[6.5rem] md:pt-28 lg:pt-32 pb-9 sm:pb-12 md:pb-14 lg:pb-16">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold mb-4 sm:mb-5 md:mb-6">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFBE02]" /> {s.centerBadge}
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-lg">
              {s.title}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium leading-relaxed max-w-[280px] sm:max-w-xs mx-auto">
              {s.desc}
            </p>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-16 rounded-b-2xl sm:rounded-b-[2.5rem] lg:rounded-b-[3rem] bg-gradient-to-t from-black/25 to-transparent sm:h-24 md:h-28 lg:h-32" />
        </div>
      </div>
    );
  }

  const isLeft = placement === 'left';
  const isSideCash = compactCashHero;
  const sideFloatLarge = !compactCashHero || isSideCash;
  /* Cash: between last “grounded” (-12/-18/-22) and Face-style (-28/-36/-40) so it sits ~half as low as before */
  const sideTopClass = isSideCash ? '-top-20 md:-top-28 lg:-top-32' : '-top-28 md:-top-36 lg:-top-40';
  const sideFloatMotion = isSideCash
    ? { y: isLeft ? [-4, 4, -4] : [4, -4, 4], rotate: isLeft ? [0, -1.5, 0] : [0, 1.5, 0] }
    : { y: isLeft ? [-10, 10, -10] : [10, -10, 10], rotate: isLeft ? [0, -3, 0] : [0, 3, 0] };
  return (
    <div className="group relative w-full z-10">
      <motion.div
        animate={sideFloatMotion}
        transition={{ duration: isLeft ? 6 : 7, repeat: Infinity, ease: 'easeInOut', delay: isLeft ? 0 : 0.35 }}
        className={`pointer-events-none hidden md:flex absolute z-[8] items-end justify-center ${
          sideFloatLarge ? 'w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64' : 'w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44'
        } opacity-80 group-hover:opacity-95 transition-opacity ${
          isLeft
            ? `-left-4 md:-left-12 lg:-left-16 ${sideTopClass}`
            : `-right-4 md:-right-12 lg:-right-16 ${sideTopClass}`
        }`}
        style={{ transform: 'translateZ(0)' }}
      >
        <Image
          src={s.heroSrc}
          alt=""
          width={400}
          height={400}
          className={`max-h-full w-auto object-contain object-bottom drop-shadow-xl ${isSideCash ? 'max-w-[95%]' : 'h-full w-full'} ${s.isGif ? 'scale-90' : ''}`}
          unoptimized={s.isGif}
        />
      </motion.div>
      <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] p-6 sm:p-7 md:p-8 pt-10 sm:pt-11 md:pt-12 border border-white/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
        <div className="absolute top-0 right-0 p-4 sm:p-6 md:p-8 opacity-10">
          <Icon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#FFBE02]" />
        </div>
        <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900 mb-3 sm:mb-4 group-hover:text-[#FFBE02] transition-colors">
          {s.title}
        </h3>
        <div className="w-10 sm:w-12 h-1 bg-[#FFBE02] mb-4 sm:mb-5 md:mb-6 rounded-full" />
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-medium">{s.desc}</p>
      </div>
    </div>
  );
}

const VideoConversionServices = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((v) => (v + 1) % 3);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  const row = SERVICE_SLOT_ORDER[step];

  const placementAt = (index: number): SlotPlacement =>
    index === 0 ? 'left' : index === 1 ? 'center' : 'right';

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#fafaf9] overflow-x-hidden overflow-y-visible relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#FFBE02]/5 rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-purple-500/5 rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-24 lg:mb-40 relative"
        >
          <span className="inline-block py-1.5 px-3 sm:px-4 rounded-full bg-[#FFBE02]/10 text-[#FFBE02] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-3 sm:mb-4 border border-[#FFBE02]/20">
            Premium Production
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900 tracking-tight leading-[1.1] sm:leading-tight px-2">
            Our Video Conversion <br className="hidden sm:block" /> Services
          </h2>
        </motion.div>

        <LayoutGroup id="video-services">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-8 items-end relative perspective-1000">
            {row.map((id, slotIndex) => (
              <motion.div
                key={id}
                layout
                transition={layoutSpring}
                className={`relative min-w-0 ${placementAt(slotIndex) === 'center' ? 'z-20' : 'z-10'}`}
              >
                <ServiceCard id={id} placement={placementAt(slotIndex)} />
              </motion.div>
            ))}
          </div>
        </LayoutGroup>
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
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight">
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
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-[1.1] mb-3 sm:mb-4 md:mb-5">
                {processSteps[activeProcessTab].heading}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
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
const ytThumbnail = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

type CurrentLongVideo = {
  id: string;
  title: string;
  channel: string;
  subscribers: string;
  views: string;
  date: string;
  src: string;
  desc: string;
};

/** Long tab: real YouTube embeds (titles + thumbs from each video) */
const LONG_FORM_PLAYLIST = [
  {
    id: 'vid1',
    videoId: 'ZaQnaF3pP4I',
    title: 'Watch this to understand the war in Sudan | Start Here',
    channel: 'Al Jazeera English',
    views: '—',
    date: '—',
    duration: '—',
    thumbnailUrl: ytThumbnail('ZaQnaF3pP4I'),
    src: 'https://www.youtube.com/embed/ZaQnaF3pP4I?autoplay=1&rel=0',
  },
  {
    id: 'vid2',
    videoId: 'o9kb5caf7vw',
    title: 'Comet Interceptor Accelerated // Artemis II SLS Rollout // Nuclear Lunar Race',
    channel: 'Fraser Cain',
    views: '—',
    date: '—',
    duration: '—',
    thumbnailUrl: ytThumbnail('o9kb5caf7vw'),
    src: 'https://www.youtube.com/embed/o9kb5caf7vw?autoplay=1&rel=0',
  },
  {
    id: 'vid3',
    videoId: 'ha1NneZGm7A',
    title: 'The ENTIRE History of Human Civilizations | Ancient to Modern (4K Documentary) [Full Movie]',
    channel: 'Beginning To Now',
    views: '—',
    date: '—',
    duration: '—',
    thumbnailUrl: ytThumbnail('ha1NneZGm7A'),
    src: 'https://www.youtube.com/embed/ha1NneZGm7A?autoplay=1&rel=0',
  },
  {
    id: 'vid4',
    videoId: '7ChWjQ-vnEU',
    title: 'America Renewed Chapter 1 Explained | The American Tipping Point – Must Watch!',
    channel: 'Robert Bohannon',
    views: '—',
    date: '—',
    duration: '—',
    thumbnailUrl: ytThumbnail('7ChWjQ-vnEU'),
    src: 'https://www.youtube.com/embed/7ChWjQ-vnEU?autoplay=1&rel=0',
  },
  {
    id: 'vid5',
    videoId: 'TgnjPudDyLk',
    title: 'The Dog and his Bone (UK Accent) - TheFableCottage.com',
    channel: 'The Fable Cottage',
    views: '—',
    date: '—',
    duration: '—',
    thumbnailUrl: ytThumbnail('TgnjPudDyLk'),
    src: 'https://www.youtube.com/embed/TgnjPudDyLk?autoplay=1&rel=0',
  },
  {
    id: 'vid6',
    videoId: '6BIFnvjpquk',
    title: 'The Chicken | 2d Animation Short Film',
    channel: 'The Dhepaas',
    views: '—',
    date: '—',
    duration: '—',
    thumbnailUrl: ytThumbnail('6BIFnvjpquk'),
    src: 'https://www.youtube.com/embed/6BIFnvjpquk?autoplay=1&rel=0&start=1',
  },
  {
    id: 'vid7',
    videoId: 'K18Tnq7sC6M',
    title: 'THE WHITE WOLF | The Making of John (Episode 1) | Powerful Military Motivation Story',
    channel: 'TC Baker',
    views: '—',
    date: '—',
    duration: '—',
    thumbnailUrl: ytThumbnail('K18Tnq7sC6M'),
    src: 'https://www.youtube.com/embed/K18Tnq7sC6M?autoplay=1&rel=0',
  },
  {
    id: 'vid8',
    videoId: '05OWsG4sSX8',
    title: 'THE WHITE WOLF | Episode 3 — The Soldier Who Chose Love Over War | Military Motivation Story',
    channel: 'TC Baker',
    views: '—',
    date: '—',
    duration: '—',
    thumbnailUrl: ytThumbnail('05OWsG4sSX8'),
    src: 'https://www.youtube.com/embed/05OWsG4sSX8?autoplay=1&rel=0',
  },
  {
    id: 'vid9',
    videoId: 'Ou80IomKkJ0',
    title: 'THE WHITE WOLF | Episode 2 — The Trainee Who Captured the Instructors | Military Motivation Story',
    channel: 'TC Baker',
    views: '—',
    date: '—',
    duration: '—',
    thumbnailUrl: ytThumbnail('Ou80IomKkJ0'),
    src: 'https://www.youtube.com/embed/Ou80IomKkJ0?autoplay=1&rel=0',
  },
] as const;

const shortEmbed = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}`;

/** Shorts tab: real Short URLs */
const SHORTS_CHANNEL_HANDLE = 'TCBaker-books';

const SHORTS_PLAYLIST = [
  {
    id: 'short1',
    videoId: 'wysJZvHFqxI',
    title:
      'White Wolf — John became a Navy SEAL | T.C. Baker #herojourney #militarymotivation',
    channel: 'TC Baker',
    src: shortEmbed('wysJZvHFqxI'),
    views: '—',
    likes: '—',
    comments: '—',
    color: '#35c4dd',
  },
  {
    id: 'short2',
    videoId: 'o9jx-6XvWlM',
    title:
      'White Wolf — The Trainee Even His Instructors Hated | T.C. Baker #herojourney #militarymotivation',
    channel: 'TC Baker',
    src: shortEmbed('o9jx-6XvWlM'),
    views: '—',
    likes: '—',
    comments: '—',
    color: '#ff4d00',
  },
  {
    id: 'short3',
    videoId: 'eGA2oAaswxQ',
    title:
      'The Real Message of White Wolf — Love Is the Strongest Force #herojourney #courage #love',
    channel: 'TC Baker',
    src: shortEmbed('eGA2oAaswxQ'),
    views: '—',
    likes: '—',
    comments: '—',
    color: '#8a00ff',
  },
] as const;

const YouTubeTVSection = () => {
  const [activeVideoTab, setActiveVideoTab] = useState<'long' | 'short' | 'thumbnail'>('long');
  const [autoTabRotate, setAutoTabRotate] = useState(true);
  const [currentVideo, setCurrentVideo] = useState<CurrentLongVideo>(() => {
    const v = LONG_FORM_PLAYLIST[0];
    return {
      id: v.id,
      title: v.title,
      channel: v.channel,
      subscribers: '—',
      views: v.views,
      date: v.date,
      src: `https://www.youtube.com/embed/${v.videoId}?autoplay=0&rel=0`,
      desc: '',
    };
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

  useEffect(() => {
    if (!autoTabRotate) return;
    const intervalMs = 8000;
    const timer = window.setInterval(() => {
      setActiveVideoTab((prev) =>
        prev === 'long' ? 'short' : prev === 'short' ? 'thumbnail' : 'long'
      );
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [autoTabRotate]);

  const playlist = LONG_FORM_PLAYLIST;

  const shortsList = SHORTS_PLAYLIST;

  const thumbnailList = LONG_FORM_PLAYLIST.map((v, i) => ({
    id: i + 1,
    image: v.thumbnailUrl,
    title: v.title,
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mb-6 sm:mb-8 text-center">
            Videos We Created
          </h2>
          
          <div className="flex items-center gap-6 sm:gap-8 md:gap-10 border-b border-gray-200 w-full max-w-[500px] justify-center pb-2">
            <button 
              type="button"
              onClick={() => { setAutoTabRotate(false); setActiveVideoTab('long'); }} 
              className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer ${
                activeVideoTab === 'long' 
                  ? 'text-[#FFBE02] border-b-2 border-[#FFBE02]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Long
            </button>
            <button 
              type="button"
              onClick={() => { setAutoTabRotate(false); setActiveVideoTab('short'); }} 
              className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer ${
                activeVideoTab === 'short' 
                  ? 'text-[#FFBE02] border-b-2 border-[#FFBE02]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Short
            </button>
            <button 
              type="button"
              onClick={() => { setAutoTabRotate(false); setActiveVideoTab('thumbnail'); }} 
              className={`pb-2 text-base sm:text-lg md:text-xl font-semibold transition-all cursor-pointer ${
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
            <Image src="/book-to-video/fourth_S_TV.png" alt="TV Frame" fill className="object-contain scale-105" sizes="(max-width: 1200px) 100vw, 1100px" />
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
                      <iframe
                        key={`${currentVideo.id}-${currentVideo.src}`}
                        width="100%"
                        height="100%"
                        src={currentVideo.src}
                        title={currentVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        className="border-0 w-full h-full"
                      />
                    </div>
                    <h1 className="text-base sm:text-lg md:text-[20px] font-bold text-zinc-900 mb-2 sm:mb-3 leading-6 sm:leading-7">
                      {currentVideo.title}
                    </h1>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 border border-gray-100">
                          <Image src="/images/duck-logo-final.png" alt="Avatar" fill className="object-contain p-1" />
                        </div>
                        <div className="flex flex-col mr-4">
                          <p className="font-bold text-[16px] text-zinc-900 leading-5">{currentVideo.channel}</p>
                          <p className="text-[12px] text-gray-600">{currentVideo.subscribers} subscribers</p>
                        </div>
                        <button className="bg-[#FFBE02] hover:bg-[#e6aa02] text-black px-4 py-2 rounded-full text-[14px] font-bold transition-colors">
                          Subscribe
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-[#f2f2f2] rounded-full overflow-hidden h-9">
                          <button className="flex items-center gap-2 px-4 hover:bg-[#e5e5e5] border-r border-[#d9d9d9] h-full transition-colors">
                            <span className="text-sm font-medium text-zinc-900">12K</span>
                          </button>
                        </div>
                        <button className="flex items-center gap-2 bg-[#f2f2f2] px-4 py-2 rounded-full hover:bg-[#e5e5e5] transition-colors h-9">
                          <Share2 className="w-4 h-4 text-zinc-900" />
                          <span className="text-sm font-medium text-zinc-900">Share</span>
                        </button>
                        <button className="flex items-center justify-center bg-[#f2f2f2] w-9 h-9 rounded-full hover:bg-[#e5e5e5] transition-colors">
                          <MoreVertical className="w-4 h-4 text-zinc-900" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#f2f2f2] rounded-xl p-3 text-sm text-zinc-900 hover:bg-[#e5e5e5] transition-colors cursor-pointer">
                      <p className="font-bold mb-1">{currentVideo.views} • {currentVideo.date}</p>
                      <p className="whitespace-pre-line leading-relaxed">{currentVideo.desc}</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-[30%] flex flex-col gap-3">
                    {playlist.map((video) => (
                      <div 
                        key={video.id} 
                        onClick={() =>
                          setCurrentVideo((prev) => ({
                            ...prev,
                            id: video.id,
                            title: video.title,
                            channel: video.channel,
                            subscribers: '—',
                            views: video.views,
                            date: video.date,
                            src: video.src.replace('autoplay=1', 'autoplay=0'),
                            desc: '',
                          }))
                        }
                        className="flex gap-2 cursor-pointer group"
                      >
                        <div className="relative w-[168px] h-[94px] flex-shrink-0 rounded-xl overflow-hidden bg-black">
                          <Image
                            src={video.thumbnailUrl}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="168px"
                          />
                          {video.duration !== '—' && (
                            <span className="absolute bottom-1 right-1 z-10 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] tracking-wide">
                              {video.duration}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col pr-6">
                          <h4 className="text-[14px] font-semibold text-zinc-900 line-clamp-2 leading-tight mb-1">
                            {video.title}
                          </h4>
                          <p className="text-[12px] text-gray-600">{video.channel}</p>
                          <p className="text-[12px] text-gray-600">{video.views} • {video.date}</p>
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
                          title={shortsList[currentShortIndex].title}
                          allow="autoplay; encrypted-media" 
                          loading="lazy"
                          className="border-0 object-cover"
                        ></iframe>
                        <div className="absolute right-2 sm:right-3 bottom-20 sm:bottom-24 md:bottom-20 flex flex-col items-center gap-2 sm:gap-3 md:gap-5 lg:gap-6 z-40">
                          <div className="flex flex-col items-center gap-0.5 cursor-pointer group">
                            <div className="bg-gray-800/70 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-gray-700 transition-colors">
                              <PlayCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                            </div>
                            <span className="text-white text-[9px] sm:text-xs font-bold">{shortsList[currentShortIndex].likes}</span>
                          </div>
                          <div className="flex flex-col items-center gap-0.5 cursor-pointer group">
                            <div className="bg-gray-800/70 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-gray-700 transition-colors">
                              <Share2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                            </div>
                            <span className="text-white text-[9px] sm:text-xs font-bold">Share</span>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 pb-4 sm:pb-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-30">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-white font-bold text-xs sm:text-sm">@{SHORTS_CHANNEL_HANDLE}</span>
                            <button className="bg-white text-black text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-gray-200 transition-colors">
                              Subscribe
                            </button>
                          </div>
                          <p className="text-white text-xs sm:text-sm font-medium leading-snug pr-12 sm:pr-16 line-clamp-2">
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
                              <h4 className="text-base font-bold text-zinc-900 group-hover:text-[#FFBE02] transition-colors duration-300 line-clamp-1">
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
                            <h3 className="text-xl sm:text-2xl font-bold mb-1 tracking-wide">
                              {thumbnailList[activeThumbnailIndex].title}
                            </h3>
                            <p className="text-gray-400 text-sm">
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
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-7 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-full"
          >
            <div className="relative w-full max-w-[500px] mx-auto lg:mx-0 rounded-[2rem] overflow-hidden shadow-[0_18px_45px_-25px_rgba(0,0,0,0.45)] min-h-[460px] sm:min-h-[520px] lg:min-h-[650px]">
              <Image src="/youtube-page/why_youtube.png" alt="Why Youtube" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 500px" />
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
                Why Youtube ?
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
                  We adapt your manuscript into a high-retention, animated Youtube series. We build the visuals that stop the scroll.
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
                  Your Youtube series acts as a 24/7 sales machine, funneling viewers directly from your episodes to your checkout page.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- 6. SLIDING TESTIMONIALS SECTION ---
const SlidingTestimonials = () => {
  const reviewsRow1 = [
    { name: "Sarah Jenkins", role: "Fiction Author", text: "My book sales exploded after the cinematic trailer went live on YouTube!" },
    { name: "Michael T.", role: "Bestseller", text: "The cash cow strategy worked flawlessly. Passive income is real." },
    { name: "Emily Rose", role: "Indie Publisher", text: "Unbelievable quality. The 2D animation brought my characters to life." },
    { name: "David Clarke", role: "Author", text: "They handled everything from script to upload. Absolute lifesavers!" },
    { name: "Anita S.", role: "Writer", text: "Best marketing investment I have ever made for my series." },
  ];

  const reviewsRow2 = [
    { name: "John Doe", role: "Fantasy Writer", text: "They turned my 300-page book into a viral 15-minute masterpiece." },
    { name: "Elena G.", role: "Non-Fiction", text: "The team is incredibly talented. My audience engagement is up 400%." },
    { name: "Robert Fox", role: "Historian", text: "Highly professional and the video quality is just out of this world." },
    { name: "Linda M.", role: "Romance Author", text: "I was skeptical at first, but the results speak for themselves." },
    { name: "Chris P.", role: "Author", text: "If you want your book noticed in 2024, you need their services." },
  ];

  const TestimonialCard = ({ item }: { item: any }) => (
    <div className="w-[320px] md:w-[380px] bg-white border border-gray-100 rounded-[5px] p-6 shadow-sm flex flex-col gap-4 flex-shrink-0">
      <div className="flex text-[#FFBE02]">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
      </div>
      <p className="text-gray-700 italic flex-1 text-sm md:text-base leading-relaxed">&quot;{item.text}&quot;</p>
      <div className="flex items-center gap-3 mt-2">
        <div className="w-10 h-10 bg-gradient-to-tr from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
          {item.name[0]}
        </div>
        <div>
          <h5 className="font-bold text-gray-900 text-sm">{item.name}</h5>
          <p className="text-xs text-gray-500">{item.role}</p>
        </div>
      </div>
    </div>
  );

  const MarqueeRow = ({ items, direction = 1, speed = 100 }: { items: any[], direction?: number, speed?: number }) => (
    <div className="book-video-testimonial-row flex overflow-hidden w-full mb-6 relative">
      <div
        className={`book-video-testimonial-track ${direction === 1 ? 'book-video-testimonial-track--ltr' : 'book-video-testimonial-track--rtl'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-[#fefdfb] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
          Join <span className="text-[#FFBE02]">Authors</span>
        </h2>
        <p className="text-gray-500 mt-2 text-lg italic">Who have achieved massive success.</p>
      </div>

      <div className="relative w-full flex flex-col items-center rotate-[-1deg] scale-105">
        <MarqueeRow items={reviewsRow1} direction={1} speed={110} />
        <MarqueeRow items={reviewsRow2} direction={-1} speed={120} />

        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#fefdfb] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#fefdfb] to-transparent z-10 pointer-events-none" />
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
    <section className="py-20 sm:py-24 bg-[#efefef]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">

        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[2.4rem] sm:text-[4.5rem] md:text-[5.5rem] leading-none tracking-tight mb-2 sm:mb-4">
            <span className="font-bold text-[#EAB308]">Right</span>{" "}
            <span className="font-normal text-[#1F1F1F]">Fit</span>
          </h2>
          <p className="text-[1.15rem] sm:text-[2.2rem] text-[#333333] font-light tracking-wide">
            Is This the for You?
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-9">

          {/* LEFT CARD: This is for you — warm gold / brand yellow */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.1rem] p-9 sm:p-11 md:p-12 h-full border-2 border-[#FFBE02]/35 bg-gradient-to-br from-[#fffdf7] via-[#fff8e7] to-[#FFBE02]/20 shadow-[0_22px_44px_-22px_rgba(255,190,2,0.35),0_12px_28px_-18px_rgba(0,0,0,0.08)]"
          >
            <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full bg-[#FFBE02]/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-8 w-40 h-40 rounded-full bg-[#eab308]/20 blur-3xl pointer-events-none" />
            <h3 className="text-[2rem] sm:text-[2.25rem] font-bold text-[#b45309] mb-6 sm:mb-7 tracking-tight leading-tight">
              This is for you if:
            </h3>
            <ul className="flex flex-col gap-3.5 sm:gap-4">
              {forYouList.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#FFBE02] text-[1.2rem] leading-[1.2] mt-0.5 font-semibold">•</span>
                  <span className="text-[1.05rem] sm:text-[1.34rem] leading-[1.45] text-[#292524] font-normal">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT CARD: same gradient treatment as Video Conversion Services center card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.1rem] p-9 sm:p-11 md:p-12 h-full bg-gradient-to-br from-[#8B2DF0] via-[#D925C8] to-[#FF5E00] shadow-xl ring-1 ring-white/25"
          >
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <div
              className="pointer-events-none absolute left-1/2 top-0 z-[2] h-[90px] w-[min(70%,220px)] sm:h-[110px] sm:w-[260px] -translate-x-1/2 bg-gradient-to-b from-white/25 to-transparent blur-2xl sm:blur-3xl"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 sm:h-24 rounded-b-[2rem] sm:rounded-b-[2.1rem] bg-gradient-to-t from-black/25 to-transparent" />

            <div className="relative z-10">
              <h3 className="text-[2rem] sm:text-[2.25rem] font-bold italic text-white mb-6 sm:mb-7 tracking-tight leading-tight drop-shadow-lg">
                This isn&apos;t for you if:
              </h3>
              <ul className="flex flex-col gap-3.5 sm:gap-4">
                {notForYouList.map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#FFBE02] text-[1.2rem] leading-[1.2] mt-0.5 font-semibold italic">•</span>
                    <span className="text-[1.05rem] sm:text-[1.34rem] leading-[1.45] text-white/90 italic font-medium">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
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
    { q: "Do I need to have my own script ready?", a: "Not at all! Our professional scriptwriters will analyze your book and craft a highly engaging script designed for YouTube audience retention." },
    { q: "Do you guarantee a certain amount of views?", a: "While we use battle-tested strategies to maximize algorithmic reach, YouTube is an organic platform, so we cannot promise exact view counts. We do guarantee premium, highly engaging production." },
    { q: "Who owns the rights to the finalized video?", a: "You do! Once the project is complete and paid in full, you retain 100% of the commercial rights to the video to use anywhere you like." }
  ];

  return (
    <section className="py-24 bg-[#fafaf9]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900">
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

const heroBookEase = [0.16, 1, 0.3, 1] as const;

/** Slides in over hero banner: left book from right → left; right book from left → right (LED stays on base art). */
function BookToVideoHeroFloatingBooks() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute z-[12] left-[3%] sm:left-[5%] md:left-[6%] bottom-[8%] sm:bottom-[10%] md:bottom-[11%] h-[32%] sm:h-[35%] md:h-[38%] max-h-[200px] sm:max-h-[248px] md:max-h-[292px] w-auto max-w-[22vw] sm:max-w-[18%] md:max-w-[16%]"
        initial={{ x: 'min(13vw, 5.5rem)', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: heroBookEase }}
      >
        <Image
          src="/youtube-page/book-1.png"
          alt=""
          width={320}
          height={460}
          className="h-full w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)] scale-[1.04]"
        />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute z-[12] right-[3%] sm:right-[5%] md:right-[6%] bottom-[8%] sm:bottom-[10%] md:bottom-[11%] h-[32%] sm:h-[35%] md:h-[38%] max-h-[200px] sm:max-h-[248px] md:max-h-[292px] w-auto max-w-[22vw] sm:max-w-[18%] md:max-w-[16%]"
        initial={{ x: 'calc(-1 * min(13vw, 5.5rem))', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.32, ease: heroBookEase }}
      >
        <Image
          src="/youtube-page/book-2.png"
          alt=""
          width={320}
          height={460}
          className="h-full w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)] scale-[1.04]"
        />
      </motion.div>
    </>
  );
}

export default function BookToVideoPage() {
  return (
    <div className="w-full bg-[#fafaf9] selection:bg-red-200 selection:text-red-900 overflow-x-hidden">
      <Header />
      
      {/* 1. HERO BANNER SECTION (EXACT REPLICA WITH SMOKY BLUR EFFECT) */}
      <section className="relative w-full bg-white pt-6 sm:pt-8 pb-4 flex flex-col items-center justify-start overflow-hidden">
        
        {/* Text Content Area */}
        <div className="text-center max-w-5xl mx-auto px-4 relative z-20 flex flex-col items-center">
          
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(1rem,4vw,3.125rem)] leading-[1.08] text-[#111] mb-2 sm:mb-3 tracking-tight whitespace-nowrap"
          >
            <span className="font-normal text-black">Turn your Book into a </span>
            <span className="font-black text-[#FF0000] tracking-tighter">YouTube</span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-gray-800 mb-4 sm:mb-5 max-w-3xl mx-auto font-medium"
          >
            For ambitious authors with a manuscript or a published book who are tired of being
          </motion.p>
          
          {/* Replica CTA Button */}
          <motion.a 
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group flex items-center bg-[#FF0000] rounded-full p-1 pr-5 sm:pr-6 shadow-[0_6px_22px_rgba(255,0,0,0.22)] hover:shadow-[0_10px_32px_rgba(255,0,0,0.32)] hover:-translate-y-1 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-md group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="/youtube-page/YT-Icon.png" 
                alt="YT Icon" 
                width={20} 
                height={20} 
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] object-contain" 
              />
            </div>
            <span className="text-white font-bold text-sm sm:text-base tracking-wide">Start Your Journey</span>
          </motion.a>
        </div>

        {/* Main Image with Edge Smoky Blurs */}
        <div className="relative w-full max-w-[1600px] mx-auto mt-4 sm:mt-6 px-4 sm:px-0">
          {/* Left Elite Smoky / Fade Blur Overlay */}
          <div className="absolute top-0 bottom-0 left-0 w-[15%] md:w-[20%] lg:w-[25%] bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none backdrop-blur-[2px] [mask-image:linear-gradient(to_right,black,transparent)]" />
          
          {/* Right Elite Smoky / Fade Blur Overlay */}
          <div className="absolute top-0 bottom-0 right-0 w-[15%] md:w-[20%] lg:w-[25%] bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none backdrop-blur-[2px] [mask-image:linear-gradient(to_left,black,transparent)]" />

          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[2.2/1] lg:aspect-[2.5/1]">
            <Image
              src="/youtube-page/Banner_img.png"
              alt="Books to YouTube Video Conversion Banner"
              fill
              className="object-contain object-top z-0"
              priority
            />
            <BookToVideoHeroFloatingBooks />
          </div>
        </div>
      </section>

      {/* 2. TOP CALENDLY & LEFT BOX SECTION */}
      <section id="calendly" className="py-16 sm:py-24 bg-[#fafaf9] relative z-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[42%_58%] gap-8 lg:gap-12 items-stretch">

          {/* LEFT BOX: Stats Card */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.03] p-7 sm:p-14 flex flex-col justify-center gap-10 sm:gap-16 h-full">

            {/* Stat 1: Books Published */}
            <div className="flex items-center gap-6 sm:gap-8">
              <div className="relative w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] flex-shrink-0">
                <Image
                  src="/youtube-page/Book-Icon.png"
                  alt="Book Published"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-[32px] sm:text-[52px] font-light leading-none tracking-tight text-[#111111]">
                  10,124+
                </h4>
                <p className="text-[17px] sm:text-[20px] font-normal text-[#333333] mt-1.5 sm:mt-2">
                  Book Published
                </p>
              </div>
            </div>

            {/* Stat 2: Book Video */}
            <div className="flex items-center gap-6 sm:gap-8">
              <div className="relative w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] flex-shrink-0">
                <Image
                  src="/youtube-page/YT-Big-icon.png"
                  alt="Book Video"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-[32px] sm:text-[52px] font-light leading-none tracking-tight text-[#111111]">
                  1,200+
                </h4>
                <p className="text-[17px] sm:text-[20px] font-normal text-[#333333] mt-1.5 sm:mt-2">
                  Book Video
                </p>
              </div>
            </div>

            {/* Stat 3: Happy Authors */}
            <div className="flex items-center gap-6 sm:gap-8">
              <div className="relative w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] flex-shrink-0">
                <Image
                  src="/youtube-page/Smile_emoji_icon.png"
                  alt="Happy Authors"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-[32px] sm:text-[52px] font-light leading-none tracking-tight text-[#111111]">
                  95%
                </h4>
                <p className="text-[17px] sm:text-[20px] font-normal text-[#333333] mt-1.5 sm:mt-2">
                  Happy Authors
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT BOX: Calendly inline widget */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.03] overflow-hidden min-h-[650px] lg:min-h-[700px] w-full h-full relative">
            <CalendlyInlineWidget minHeight={700} />
          </div>

        </div>
      </section>

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

      {/* 8. CENTER CALENDLY */}
      <section className="py-20 bg-[#fafaf9]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden min-h-[700px]">
            <CalendlyInlineWidget minHeight={700} />
          </div>
        </div>
      </section>

      {/* 9. FAQs SECTION */}
      <FAQSection />

      {/* 10. FOOTER / CONTACT — Calendly replaces contact form on this page */}
      <section id="contact" className="bg-white border-t border-gray-100 scroll-mt-24">
        <Footer replaceContactForm={<CalendlyInlineWidget minHeight={700} />} />
      </section>
    </div>
  );
}