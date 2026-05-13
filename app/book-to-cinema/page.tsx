'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { CALENDLY_LINK, COMPANY_NAME } from '../config/constants';

const GOLD = '#C9A227';
const BG = '#0c0b0b';
const BG_CARD = '#16152a';
const TICKER_WORDS = ['WE STRUCTURE', 'WE PUBLISH', 'WE DISTRIBUTE'];

// ─── CTA BUTTON ──────────────────────────────────────────────────────────────
const CTAButton = ({ text = 'BOOK YOUR FREE STRATEGY CALL →', className = '' }: { text?: string; className?: string }) => (
  <a
    href={CALENDLY_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-block bg-[#C9A227] hover:bg-[#b8911f] text-black font-bold uppercase tracking-widest text-sm px-10 py-4 rounded transition-all duration-200 ${className}`}
  >
    {text}
  </a>
);

// ─── 1. ANNOUNCEMENT BAR ─────────────────────────────────────────────────────
const AnnouncementBar = () => (
  <div className="w-full bg-[#7c1d1d] text-white text-center text-xs sm:text-sm font-bold tracking-widest uppercase py-3 px-4">
    🎬 LIMITED SPOTS AVAILABLE — BOOK YOUR FREE STORY STRATEGY CALL NOW
  </div>
);

// ─── 2. MINI HEADER ───────────────────────────────────────────────────────────
const MiniHeader = () => (
  <header className="sticky top-0 z-50 w-full bg-[#0c0b0b] border-b border-white/5">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-14 w-44">
          <Image
            src="/images/duck-logo-final.png"
            alt="Duck Book Writers"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </Link>
      <a
        href={CALENDLY_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-[#C9A227] text-white hover:bg-[#C9A227] hover:text-black transition-all duration-200 font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded"
      >
        BOOK FREE CALL →
      </a>
    </div>
  </header>
);

// ─── 3. HERO / BELIEF SHIFT ──────────────────────────────────────────────────
const HeroSection = () => {
  const [playing, setPlaying] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % TICKER_WORDS.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="w-full bg-[#0c0b0b] py-20 sm:py-28 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-[#C9A227]/40 bg-[#1a1a1a] rounded-full px-5 py-2 mb-8">
          <span className="text-base">🎬</span>
          <span className="text-[#C9A227] text-xs font-bold tracking-[0.2em] uppercase">Book-to-Cinema Transformation</span>
        </div>

        {/* Heading with cycling ticker */}
        <h1 className="mb-2">
          <div className="overflow-hidden h-9 sm:h-10 mb-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={TICKER_WORDS[wordIdx]}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="block text-xl sm:text-2xl md:text-3xl font-bold uppercase"
                style={{ letterSpacing: '0.25em', color: GOLD }}
              >
                {TICKER_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span
            className="block text-white text-6xl sm:text-7xl md:text-8xl font-bold"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            Your Story.
          </span>
          <span
            className="block text-6xl sm:text-7xl md:text-8xl font-bold italic"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', color: GOLD }}
          >
            Your Legacy.
          </span>
        </h1>

        {/* Belief shift */}
        <div className="mt-8 mb-10 space-y-3 max-w-2xl mx-auto">
          <p
            className="text-white/85 text-lg sm:text-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            Most writers believe publishing is the finish line.
          </p>
          <p
            className="text-2xl sm:text-3xl font-bold italic"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', color: GOLD }}
          >
            It&apos;s not.
          </p>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed pt-1">
            Publishing without structure and distribution means your story stays invisible.
          </p>
          <p className="text-white/35 text-sm">
            A book that isn&apos;t positioned for visibility is just content without reach.
          </p>
        </div>

        {/* Video Player */}
        <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden mb-4" style={{ background: '#1a1930' }}>
          {!playing ? (
            <div
              className="relative aspect-video flex items-center justify-center cursor-pointer group"
              onClick={() => setPlaying(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1930] via-[#16152a] to-[#0d0c1d]" />
              <div className="relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#C9A227] flex items-center justify-center group-hover:bg-[#C9A227]/10 transition-all duration-200">
                  <div
                    className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] ml-1"
                    style={{ borderLeftColor: GOLD }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/K18Tnq7sC6M?autoplay=1&rel=0"
                title="Book to Cinema"
                allow="autoplay; encrypted-media"
                className="border-0"
              />
            </div>
          )}
        </div>
        <p className="text-white/40 text-sm mb-8">
          See exactly how we transform your story into a global Cinema presence 👇
        </p>

        <CTAButton />
      </motion.div>
    </section>
  );
};

// ─── 4. IS THIS FOR ME? ───────────────────────────────────────────────────────
const IsThisForMeSection = () => {
  const forYou = [
    'You have a manuscript, draft, or story idea',
    'You want it professionally published',
    'You care about real audience reach — not just publishing for the sake of it',
    'You want your work structured and positioned properly',
  ];
  const notForYou = [
    'You just want to self-publish without strategy',
    'You don\'t care about distribution or visibility',
    'You are treating this as a casual hobby',
  ];

  return (
    <section className="w-full bg-[#0c0b0b] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[#C9A227] text-xs font-bold tracking-[0.3em] uppercase mb-4">— IS THIS FOR ME?</p>
          <h2
            className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            Is This The{' '}
            <span className="italic" style={{ color: GOLD }}>Right Fit</span>{' '}
            For You?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-green-900/40 p-6 sm:p-8"
            style={{ background: '#0d1a10' }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2" style={{ color: '#10b981' }}>
              <span>✅</span> This Is For You If:
            </h3>
            <ul className="space-y-4">
              {forYou.map((t) => (
                <li key={t} className="flex items-start gap-3 text-white/75 text-sm sm:text-base leading-relaxed">
                  <span className="text-green-400 mt-0.5 flex-shrink-0 font-bold">✓</span> {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-red-900/40 p-6 sm:p-8"
            style={{ background: '#1a0e0e' }}
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2" style={{ color: '#ef4444' }}>
              <span>✗</span> This Is NOT For You If:
            </h3>
            <ul className="space-y-4">
              {notForYou.map((t) => (
                <li key={t} className="flex items-start gap-3 text-white/75 text-sm sm:text-base leading-relaxed">
                  <span className="text-red-500 mt-0.5 flex-shrink-0 font-bold">✗</span> {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── 5. HOW IT WORKS ─────────────────────────────────────────────────────────
const HowItWorksSection = () => {
  const steps = [
    {
      num: '01',
      icon: '🔍',
      title: 'Strategic Story Audit',
      desc: 'We start by analyzing exactly where you are right now — whether you have a finished manuscript or just an early idea. We identify what\'s missing, what\'s holding your story back, and what needs to happen to make it market-ready. Then we map out the fastest, most strategic path to get your story published and positioned for real audience reach.',
      proof: 'Client entered with a 120-page incomplete manuscript → left with a fully structured, publish-ready outline and execution roadmap within 5–7 days.',
    },
    {
      num: '02',
      icon: '📚',
      title: 'Professional Publishing & Global Distribution',
      desc: 'We transform your work into a professionally published book — handling formatting, publishing setup, and distribution across 300+ global platforms. So your story doesn\'t just exist — it becomes accessible, credible, and positioned in front of a worldwide audience.',
      proof: 'Client went from unpublished draft → live book distributed across 300+ global platforms (including major retailers) within 21–30 days.',
    },
    {
      num: '03',
      icon: '🎬',
      title: 'Cinematic Story Conversion',
      desc: 'Using our Story-to-Screen™ System, we transform your content into a cinematic, animated format designed for digital platforms — built to capture attention instantly, create shareable scroll-stopping visuals, and turn passive viewers into an engaged audience. So instead of your story sitting unread, it becomes something people actually watch, follow, and engage with.',
      proof: 'Client went from static book content → 15+ short-form cinematic videos published across platforms, generating consistent impressions within 30–45 days.',
    },
  ];

  return (
    <section className="w-full bg-[#0c0b0b] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[#C9A227] text-xs font-bold tracking-[0.3em] uppercase mb-3">— THE SYSTEM</p>
          <h2
            className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            How It{' '}
            <span className="italic" style={{ color: GOLD }}>Works</span>
          </h2>
          <p className="text-white/50 text-base">Three steps — from manuscript to a distributed media presence.</p>
        </motion.div>

        <div className="space-y-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-xl border border-white/8 overflow-hidden"
              style={{ background: BG_CARD }}
            >
              <div className="px-7 sm:px-10 py-7">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 text-3xl mt-1">{s.icon}</div>
                  <div className="flex-1">
                    <span
                      className="text-[10px] font-black tracking-[0.3em] uppercase"
                      style={{ color: GOLD }}
                    >
                      STEP {s.num}
                    </span>
                    <h3
                      className="text-white text-xl sm:text-2xl font-bold mt-1 mb-3"
                      style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5">{s.desc}</p>
                    <div className="border-l-2 pl-4 py-1" style={{ borderColor: GOLD }}>
                      <p className="text-white/45 text-xs sm:text-sm leading-relaxed italic">
                        💡 {s.proof}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <CTAButton text="START YOUR JOURNEY →" />
        </div>
      </div>
    </section>
  );
};

// ─── 6. WHAT HAPPENS? ────────────────────────────────────────────────────────
const OutcomeSection = () => (
  <section className="w-full py-20 px-4" style={{ background: BG_CARD }}>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      className="max-w-3xl mx-auto text-center"
    >
      <p className="text-[#C9A227] text-xs font-bold tracking-[0.3em] uppercase mb-4">— THE RESULT</p>
      <h2
        className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
        style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
      >
        What Happens If You{' '}
        <span className="italic" style={{ color: GOLD }}>Do This?</span>
      </h2>
      <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-10">
        Instead of a manuscript sitting unseen, your story becomes:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {[
          { icon: '📖', label: 'A Published Book', desc: 'Professionally structured and ready for the world' },
          { icon: '🌍', label: 'A Global Asset', desc: 'Distributed across 300+ platforms worldwide' },
          { icon: '🎬', label: 'A Visual Content System', desc: 'Designed for discovery, attention, and reach' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="rounded-xl border border-[#C9A227]/20 p-6 text-center"
            style={{ background: BG }}
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <p
              className="text-white font-bold text-sm mb-1"
              style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
            >
              {item.label}
            </p>
            <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="border border-[#C9A227]/20 rounded-xl p-6 text-left" style={{ background: BG }}>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed">
          This is not instant exposure. It&apos;s a{' '}
          <span className="text-white font-semibold">structured visibility system that compounds over time.</span>{' '}
          When structured correctly — your story becomes a long-term digital asset instead of a static file.
        </p>
      </div>
    </motion.div>
  </section>
);

// ─── 7. CASE STUDIES ─────────────────────────────────────────────────────────
const CaseStudiesSection = () => {
  const cases = [
    {
      number: '01',
      icon: '📝',
      headline: 'From a scattered draft… to a clear, publish-ready book plan in under a week',
      story: 'When our client E. came to us, they had over 100+ pages written — but no clear structure, no positioning, and no idea how to turn it into a finished book. They had the content. But no direction.',
      proofItems: [
        'Restructured the entire manuscript',
        'Defined a clear target audience',
        'Mapped out a complete chapter framework',
        'Created a step-by-step publishing roadmap',
      ],
      result: '120-page draft → fully structured, publish-ready manuscript + execution plan in under 1 week',
    },
    {
      number: '02',
      icon: '🌍',
      headline: 'From an unpublished draft… to a globally available book in under 30 days',
      story: 'After structuring the manuscript, the next challenge was visibility. Like most writers, the client had no idea how to publish professionally, distribute globally, or get listed beyond a single platform.',
      proofItems: [
        'Completed professional formatting',
        'Handled full publishing setup',
        'Distributed across 300+ global platforms',
        'Listed on major retailers worldwide',
      ],
      result: 'Unpublished manuscript → live book available worldwide across major platforms within 30 days',
    },
    {
      number: '03',
      icon: '🎬',
      headline: 'From a static book… to a content engine generating attention within weeks',
      story: 'Even after publishing, most books stay invisible. That was the client\'s biggest concern: "What if no one sees it?" So we moved into the next phase — visibility.',
      proofItems: [
        'Created 15+ cinematic short-form videos',
        'Optimized for platform distribution',
        'Published across visual content channels',
        'Generated consistent impressions + traffic back to the book',
      ],
      result: 'Static book → multi-platform video content generating consistent impressions and driving traffic back to the book within 30–45 days',
    },
  ];

  return (
    <section className="w-full bg-[#0c0b0b] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[#C9A227] text-xs font-bold tracking-[0.3em] uppercase mb-3">— PROOF</p>
          <h2
            className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            Real Writers.{' '}
            <span className="italic" style={{ color: GOLD }}>Real Results.</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-xl border border-white/8 overflow-hidden"
              style={{ background: BG_CARD }}
            >
              {/* Card header */}
              <div className="border-b border-white/8 px-7 sm:px-10 py-5 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{c.icon}</span>
                <div>
                  <span
                    className="text-[10px] font-black tracking-[0.3em] uppercase"
                    style={{ color: GOLD }}
                  >
                    CASE STUDY {c.number}
                  </span>
                  <h3
                    className="text-white font-bold text-lg sm:text-xl leading-snug mt-1"
                    style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
                  >
                    {c.headline}
                  </h3>
                </div>
              </div>

              {/* Card body */}
              <div className="px-7 sm:px-10 py-7 grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <p className="text-white/45 text-[11px] font-bold tracking-widest uppercase mb-3">THE STORY</p>
                  <p className="text-white/65 text-sm sm:text-base leading-relaxed">{c.story}</p>
                </div>
                <div>
                  <p className="text-white/45 text-[11px] font-bold tracking-widest uppercase mb-3">WHAT WE DID</p>
                  <ul className="space-y-2 mb-5">
                    {c.proofItems.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-white/70 text-sm">
                        <span style={{ color: GOLD }} className="mt-0.5 flex-shrink-0">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-lg p-4 border border-[#C9A227]/25" style={{ background: BG }}>
                    <p
                      className="text-[10px] font-black tracking-widest uppercase mb-1.5"
                      style={{ color: GOLD }}
                    >
                      RESULT
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed italic">{c.result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── 8. WHY THIS SYSTEM WORKS ────────────────────────────────────────────────
const WhyItWorksSection = () => (
  <section className="w-full py-20 px-4" style={{ background: BG_CARD }}>
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <p className="text-[#C9A227] text-xs font-bold tracking-[0.3em] uppercase mb-3">— FOUNDATION</p>
        <h2
          className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
        >
          Why This{' '}
          <span className="italic" style={{ color: GOLD }}>System Works</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Focus areas */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
            Most writers focus only on writing. We focus on:
          </p>
          <ul className="space-y-4">
            {[
              { label: 'Structure', detail: 'Making your story market-ready' },
              { label: 'Distribution', detail: 'Getting it in front of a worldwide audience' },
              { label: 'Visibility Systems', detail: 'Content that creates ongoing reach' },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span style={{ color: GOLD }} className="mt-1 flex-shrink-0 font-bold">→</span>
                <div>
                  <span className="text-white font-semibold text-sm">{item.label}</span>
                  <span className="text-white/50 text-sm"> — {item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-white/40 text-sm mt-7 leading-relaxed border-t border-white/8 pt-5">
            Writing alone doesn&apos;t create attention.{' '}
            <span className="text-white/65 font-semibold">Distribution does.</span>
          </p>
        </motion.div>

        {/* Expectation setting */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-white/8 p-6 sm:p-7"
          style={{ background: BG }}
        >
          <p className="text-white/45 text-xs font-bold tracking-widest uppercase mb-4">WHAT THIS IS NOT</p>
          <ul className="space-y-2 mb-6">
            {['Overnight fame', 'Guaranteed virality', 'Instant income'].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm">
                <span className="text-red-500 flex-shrink-0">✗</span>
                <span className="text-white/40 line-through">{t}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 pt-5">
            <p className="text-white/45 text-xs font-bold tracking-widest uppercase mb-3">WHAT IT IS</p>
            <p className="text-white/70 text-sm leading-relaxed">
              Publishing and visibility take time to compound. But when structured correctly — your story becomes a{' '}
              <span className="text-white font-semibold">long-term digital asset</span> instead of a static file.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Transparency */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-xl border border-[#C9A227]/20 p-6 sm:p-8"
        style={{ background: BG }}
      >
        <div className="flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">🛡️</span>
          <div>
            <p className="text-white font-bold text-base mb-2">Our Transparency Policy</p>
            <p className="text-white/55 text-sm sm:text-base leading-relaxed">
              Before starting any project, we evaluate whether your manuscript or idea is actually ready for structured publishing.
              If it&apos;s not aligned, we tell you upfront.{' '}
              <span className="text-white/75 font-semibold">No forced publishing. No shortcuts.</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── 9. FINAL CTA ────────────────────────────────────────────────────────────
const FinalCTASection = () => (
  <section className="w-full bg-[#0c0b0b] py-24 px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-2xl mx-auto"
    >
      <p className="text-[#C9A227] text-xs font-bold tracking-[0.3em] uppercase mb-5">— NEXT STEP</p>
      <h2
        className="text-white text-4xl sm:text-5xl font-bold mb-3 leading-tight"
        style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
      >
        Book Your Free
      </h2>
      <h2
        className="text-4xl sm:text-5xl font-bold italic mb-6 leading-tight"
        style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', color: GOLD }}
      >
        Strategy Call
      </h2>

      <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-6">
        If you want clarity on how this would work for your story, book a strategy call.
        On the call, we&apos;ll break down:
      </p>

      <ul className="text-left max-w-sm mx-auto space-y-3 mb-8">
        {[
          'How your story would be structured',
          'What your publishing + distribution path looks like',
          'How the Story-to-Screen™ system applies to your content',
        ].map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
            className="flex items-start gap-3 text-white/70 text-sm"
          >
            <span style={{ color: GOLD }} className="mt-0.5 flex-shrink-0 font-bold">→</span> {item}
          </motion.li>
        ))}
      </ul>

      <p className="text-white/30 text-xs italic mb-7">
        No pressure. No obligation. Just clarity on whether your story is ready.
      </p>

      <CTAButton />

      {/* Identity lock */}
      <div className="mt-12 border-t border-white/8 pt-8">
        <p className="text-white/35 text-sm leading-relaxed max-w-lg mx-auto">
          If you just want to &ldquo;publish a book&rdquo; casually — this is not for you.
          <br className="hidden sm:block" />
          But if you want your story structured, published, and transformed into a distributed content asset —{' '}
          <span className="text-white/60 font-semibold">this system was built for you.</span>
        </p>
      </div>
    </motion.div>
  </section>
);

// ─── 10. FOOTER ───────────────────────────────────────────────────────────────
const FooterSection = () => (
  <footer className="w-full bg-[#0c0b0b] border-t-2 border-[#C9A227]/30 py-6 px-5">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
      <span>
        <span className="text-white font-bold">Duck Book</span>{' '}
        <span style={{ color: GOLD }} className="font-bold">Writers</span>
        {' · '}100% hassle-free
      </span>
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {[
          { label: 'Book to Cinema', href: '/book-to-cinema' },
          { label: 'Services', href: '/services' },
          { label: 'About', href: '/about' },
          { label: 'Privacy Policy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Contact', href: 'mailto:contact@duckbookwriters.com' },
        ].map((l) => (
          <Link key={l.label} href={l.href} className="hover:text-white transition-colors">
            {l.label}
          </Link>
        ))}
      </nav>
      <span>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</span>
    </div>
  </footer>
);

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function BookToCinemaPage() {
  return (
    <div style={{ background: BG, minHeight: '100vh' }} className="overflow-x-hidden">
      <AnnouncementBar />
      <MiniHeader />
      <HeroSection />
      <IsThisForMeSection />
      <HowItWorksSection />
      <OutcomeSection />
      <CaseStudiesSection />
      <WhyItWorksSection />
      <FinalCTASection />
      <FooterSection />
    </div>
  );
}
