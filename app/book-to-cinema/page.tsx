'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';
import { CALENDLY_LINK, COMPANY_NAME, CONTACT_EMAIL, CONTACT_PHONE } from '../config/constants';
import Header from '../components/Header';

const ACCENT = '#FFBE02';

// ─── CTA BUTTON ──────────────────────────────────────────────────────────────
const CTAButton = ({ text = 'BOOK YOUR FREE STRATEGY CALL →', className = '' }: { text?: string; className?: string }) => (
  <a
    href={CALENDLY_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-block bg-[#FFBE02] hover:bg-[#e6aa02] text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${className}`}
  >
    {text}
  </a>
);

// ─── FOOTER HELPERS ──────────────────────────────────────────────────────────
const footerFont = 'font-[system-ui,-apple-system,BlinkMacSystemFont,"Segoe_UI",sans-serif]';
const footerColTitle = `text-[16px] sm:text-[17px] font-semibold tracking-[0.03em] text-slate-900 mb-5 ${footerFont}`;
const footerLinkClass = `text-[16px] sm:text-[18px] leading-[1.5] text-slate-600 hover:text-slate-900 transition-colors ${footerFont}`;

const FooterSocial = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF0000] to-[#FFBE02] text-white shadow-md hover:brightness-110 transition-transform hover:-translate-y-0.5">
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

const SiteFooter = () => (
  <footer className="mt-0 bg-[#faf9f6] pt-8 pb-10 sm:pt-10 sm:pb-12">
    <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-10 xl:px-12">
      <div className="rounded-2xl sm:rounded-3xl shadow-md shadow-black/[0.04] border border-amber-200/35 bg-gradient-to-br from-[#fff8da] via-[#fff6f6] to-[#ffe7d8] px-5 sm:px-9 lg:px-8 xl:px-10 py-10 sm:py-12 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-7 gap-x-3 sm:gap-x-4 xl:gap-x-5 lg:justify-items-start">
          <div className="min-w-0 lg:col-span-1 flex flex-col items-start">
            <Link href="/" className="inline-block">
              <Image src="/images/duck-logo-final.png" alt={`${COMPANY_NAME} logo`} width={180} height={72}
                className="h-[56px] sm:h-[62px] md:h-[70px] lg:h-[78px] w-auto object-contain" />
            </Link>
          </div>
          <div className="min-w-0">
            <h4 className={footerColTitle}>Product</h4>
            <ul className="space-y-3">
              <li><Link href="/book-to-video" className={footerLinkClass}>Book to Video</Link></li>
              <li><Link href="/book-to-cinema" className={footerLinkClass}>Book to Cinema</Link></li>
              <li><Link href="/services" className={footerLinkClass}>Our Services</Link></li>
            </ul>
          </div>
          <div className="min-w-0">
            <h4 className={footerColTitle}>Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/book-to-video#calendly" className={footerLinkClass}>How it works</Link></li>
              <li><Link href="/news" className={footerLinkClass}>Writing &amp; publishing blog</Link></li>
              <li><Link href="/authors" className={footerLinkClass}>For authors</Link></li>
              <li><Link href="/books" className={footerLinkClass}>Books</Link></li>
            </ul>
          </div>
          <div className="min-w-0">
            <h4 className={footerColTitle}>Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className={footerLinkClass}>About us</Link></li>
              <li><Link href="/news" className={footerLinkClass}>News and media</Link></li>
              <li><Link href="/careers" className={footerLinkClass}>Careers</Link></li>
              <li><Link href="/services" className={footerLinkClass}>Testimonials</Link></li>
            </ul>
          </div>
          <div className="min-w-0 lg:-translate-x-1 xl:-translate-x-2">
            <h4 className={footerColTitle}>Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className={footerLinkClass}>Terms and conditions</a></li>
              <li><a href="#" className={footerLinkClass}>Privacy policy</a></li>
              <li><a href="#" className={footerLinkClass}>Cancellation policy</a></li>
            </ul>
          </div>
          <div className="min-w-0 w-full lg:col-span-1 lg:justify-self-start text-left">
            <h4 className={`${footerColTitle} text-left`}>Get in touch</h4>
            <div className={`space-y-2 text-[14px] sm:text-[15px] xl:text-[16px] leading-relaxed text-slate-600 ${footerFont}`}>
              <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-1 font-normal">
                <a href={`mailto:${CONTACT_EMAIL}`} className="whitespace-nowrap text-slate-600 hover:text-slate-900 underline-offset-2 hover:underline">{CONTACT_EMAIL}</a>
                <span className="text-slate-300 select-none" aria-hidden>·</span>
                <a href="tel:+13464637721" className="whitespace-nowrap text-slate-600 hover:text-slate-900">Main: {CONTACT_PHONE}</a>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <FooterSocial href="https://www.facebook.com/duckbookwriters" label="Facebook">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.03H7.9v-2.9h2.54V9.77c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.94 8.44-9.94Z" /></svg>
              </FooterSocial>
              <FooterSocial href="https://www.instagram.com/duckbookwriters/" label="Instagram">
                <Image src="/images/instagram.svg" alt="" width={22} height={22} className="h-[22px] w-[22px] brightness-0 invert" />
              </FooterSocial>
              <FooterSocial href="https://www.youtube.com/results?search_query=Duck+Book+Writers" label="YouTube">
                <svg className="h-5 w-[22px]" viewBox="0 0 24 18" fill="currentColor" aria-hidden><path d="M23.5 4.5a2.8 2.8 0 0 0-1.98-2C19.5 2 12 2 12 2s-7.5 0-9.52.5A2.8 2.8 0 0 0 .5 4.5 29 29 0 0 0 0 9a29 29 0 0 0 .5 4.5 2.8 2.8 0 0 0 1.98 2C4.5 16 12 16 12 16s7.5 0 9.52-.5a2.8 2.8 0 0 0 1.98-2 29 29 0 0 0 .5-4.5 29 29 0 0 0-.5-4.5ZM9.75 12.25V5.75L15.5 9l-5.75 3.25Z"/></svg>
              </FooterSocial>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-200/50 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between bg-white/60 rounded-xl px-4 sm:px-6 py-5">
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
            <div className="flex flex-wrap items-center gap-2.5" role="list" aria-label="Accepted payment methods">
              <PaymentMarkApple /><PaymentMarkDiscover /><PaymentMarkGoogle />
              <PaymentMarkMastercard /><PaymentMarkAmex /><PaymentMarkPayPal /><PaymentMarkVisa />
            </div>
            <p className={`text-[15px] sm:text-[16px] text-slate-600 ${footerFont}`}>
              <Link href="/" className="hover:text-slate-800 underline-offset-2 hover:underline">Home</Link>
              {' · '}© {new Date().getFullYear()} {COMPANY_NAME}
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// ─── 3. HERO ─────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-violet-50/15 to-[#fffbeb] pt-6 pb-12 sm:pt-8 sm:pb-16 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="pointer-events-none absolute -top-24 right-[-14%] h-[320px] w-[320px] rounded-full bg-[#FFBE02]/18 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-12%] h-[200px] w-[240px] rounded-full bg-violet-200/20 blur-[90px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center relative z-10">

        {/* LEFT: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FFBE02]/10 border border-[#FFBE02]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm">🎬</span>
            <span className="text-[#b8860b] text-xs font-bold tracking-[0.2em] uppercase">Book-to-Cinema Transformation</span>
          </div>

          {/* Heading */}
          <h1 className="mb-5 leading-[1.1]">
            <span className="block text-zinc-900 text-5xl sm:text-6xl md:text-7xl font-bold">Your Story.</span>
            <span className="block text-5xl sm:text-6xl md:text-7xl font-bold italic" style={{ color: '#b8860b' }}>Your Legacy.</span>
          </h1>

          {/* Belief shift */}
          <p className="text-zinc-700 text-lg sm:text-xl font-medium leading-relaxed mb-2">
            Most writers believe publishing is the finish line.
          </p>
          <p className="text-xl sm:text-2xl font-bold italic mb-4" style={{ color: '#b8860b' }}>
            It&apos;s not.
          </p>
          <p className="text-zinc-500 text-base leading-relaxed mb-2">
            Publishing without structure and distribution means your story stays invisible.
          </p>
          <p className="text-zinc-400 text-sm mb-8">
            A book that isn&apos;t positioned for visibility is just content without reach.
          </p>

          <CTAButton />

          <p className="text-zinc-400 text-xs mt-4">No pressure. No obligation. Just clarity on whether your story is ready.</p>
        </motion.div>

        {/* RIGHT: Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.14)] border border-zinc-100 bg-white">
            {!playing ? (
              <div className="relative aspect-video flex items-center justify-center cursor-pointer group" onClick={() => setPlaying(true)}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1930] via-[#16152a] to-[#0d0c1d]" />
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#FFBE02] flex items-center justify-center group-hover:bg-[#FFBE02]/20 transition-all duration-200">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] ml-1" style={{ borderLeftColor: ACCENT }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/K18Tnq7sC6M?autoplay=1&rel=0" title="Book to Cinema" allow="autoplay; encrypted-media" className="border-0" />
              </div>
            )}
          </div>
          <p className="text-zinc-400 text-sm mt-3 text-center">
            See exactly how we transform your story into a global Cinema presence 👇
          </p>
        </motion.div>

      </div>
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
    "You don't care about distribution or visibility",
    'You are treating this as a casual hobby',
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#eeede8] via-[#fff9f2] to-[#fff5e8] py-20 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="pointer-events-none absolute top-1/2 left-[-6%] h-[260px] w-[260px] rounded-full bg-violet-200/15 blur-[90px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading — left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-xl"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#FFBE02]/10 text-[#b8860b] text-xs font-bold tracking-widest uppercase mb-3 border border-[#FFBE02]/20">
            — IS THIS FOR ME?
          </span>
          <h2 className="text-zinc-900 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Is This The{' '}
            <span className="italic" style={{ color: '#b8860b' }}>Right Fit</span>{' '}
            For You?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-7 sm:p-8 border border-white/60 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)]"
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-emerald-600">
              <span>✅</span> This Is For You If:
            </h3>
            <ul className="space-y-4">
              {forYou.map((t) => (
                <li key={t} className="flex items-start gap-3 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0 font-bold">✓</span> {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-7 sm:p-8 border border-white/60 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)]"
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-red-500">
              <span>✗</span> This Is NOT For You If:
            </h3>
            <ul className="space-y-4">
              {notForYou.map((t) => (
                <li key={t} className="flex items-start gap-3 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">✗</span> {t}
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
      num: '01', icon: '🔍', title: 'Strategic Story Audit',
      desc: "We start by analyzing exactly where you are right now — whether you have a finished manuscript or just an early idea. We identify what's missing, what's holding your story back, and what needs to happen to make it market-ready. Then we map out the fastest, most strategic path to get your story published and positioned for real audience reach.",
      proof: 'Client entered with a 120-page incomplete manuscript → left with a fully structured, publish-ready outline and execution roadmap within 5–7 days.',
    },
    {
      num: '02', icon: '📚', title: 'Professional Publishing & Global Distribution',
      desc: "We transform your work into a professionally published book — handling formatting, publishing setup, and distribution across 300+ global platforms. So your story doesn't just exist — it becomes accessible, credible, and positioned in front of a worldwide audience.",
      proof: 'Client went from unpublished draft → live book distributed across 300+ global platforms (including major retailers) within 21–30 days.',
    },
    {
      num: '03', icon: '🎬', title: 'Cinematic Story Conversion',
      desc: "Using our Story-to-Screen™ System, we transform your content into a cinematic, animated format designed for digital platforms — built to capture attention instantly, create shareable scroll-stopping visuals, and turn passive viewers into an engaged audience.",
      proof: 'Client went from static book content → 15+ short-form cinematic videos published across platforms, generating consistent impressions within 30–45 days.',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-violet-50/40 via-[#faf8f5] to-[#fff8e6]/35 py-20 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="pointer-events-none absolute top-[-5%] right-0 h-[300px] w-[300px] rounded-full bg-[#FFBE02]/10 blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading row — left text, right subtext */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#FFBE02]/10 text-[#b8860b] text-xs font-bold tracking-widest uppercase mb-3 border border-[#FFBE02]/20">
              — THE SYSTEM
            </span>
            <h2 className="text-zinc-900 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              How It{' '}
              <span className="italic" style={{ color: '#b8860b' }}>Works</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-zinc-500 text-base md:text-right md:max-w-xs"
          >
            Three steps — from manuscript to a distributed media presence.
          </motion.p>
        </div>

        <div className="space-y-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] border border-white/60 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-0">
                {/* Step number — left column */}
                <div className="flex items-start justify-center md:justify-start px-7 pt-7 md:pt-8 pb-0 md:pb-8">
                  <span className="text-7xl font-black leading-none select-none" style={{ color: `${ACCENT}20` }}>
                    {s.num}
                  </span>
                </div>
                {/* Content — right column */}
                <div className="px-7 pt-3 md:pt-8 pb-7 md:pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: ACCENT }}>STEP {s.num}</span>
                  </div>
                  <h3 className="text-zinc-900 text-xl sm:text-2xl font-bold mb-3">
                    {s.title}
                  </h3>
                  <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-5">{s.desc}</p>
                  <div className="border-l-2 pl-4 py-1" style={{ borderColor: ACCENT }}>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed italic">💡 {s.proof}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <CTAButton text="START YOUR JOURNEY →" />
        </div>
      </div>
    </section>
  );
};

// ─── 6. WHAT HAPPENS? ────────────────────────────────────────────────────────
const OutcomeSection = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#fff8e6] via-[#fffdf6] to-[#eeede8] py-20 px-4 sm:px-6 md:px-10 lg:px-14">
    <div className="pointer-events-none absolute bottom-[-5%] right-[-5%] h-[280px] w-[280px] rounded-full bg-[#FFBE02]/15 blur-[100px]" />

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* LEFT: Heading + description */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#FFBE02]/10 text-[#b8860b] text-xs font-bold tracking-widest uppercase mb-4 border border-[#FFBE02]/20">
            — THE RESULT
          </span>
          <h2 className="text-zinc-900 text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            What Happens If You{' '}
            <span className="italic" style={{ color: '#b8860b' }}>Do This?</span>
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg leading-relaxed mb-8">
            Instead of a manuscript sitting unseen, your story becomes a published book, a global asset, and a visual content system designed for discovery.
          </p>
          <div className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl p-6 shadow-sm">
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              This is not instant exposure. It&apos;s a{' '}
              <span className="text-zinc-900 font-semibold">structured visibility system that compounds over time.</span>{' '}
              When structured correctly — your story becomes a long-term digital asset instead of a static file.
            </p>
          </div>
        </motion.div>

        {/* RIGHT: 3 outcome cards */}
        <div className="space-y-4">
          {[
            { icon: '📖', label: 'A Published Book', desc: 'Professionally structured and ready for the world', delay: 0 },
            { icon: '🌍', label: 'A Global Asset', desc: 'Distributed across 300+ platforms worldwide', delay: 0.1 },
            { icon: '🎬', label: 'A Visual Content System', desc: 'Designed for discovery, attention, and reach', delay: 0.2 },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white/60 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.07)] flex items-center gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#FFBE02]/10 flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <div>
                <p className="text-zinc-900 font-bold text-base">{item.label}</p>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

// ─── 7. CASE STUDIES ─────────────────────────────────────────────────────────
const CaseStudiesSection = () => {
  const cases = [
    {
      number: '01', icon: '📝',
      headline: 'From a scattered draft… to a clear, publish-ready book plan in under a week',
      story: 'When our client E. came to us, they had over 100+ pages written — but no clear structure, no positioning, and no idea how to turn it into a finished book. They had the content. But no direction.',
      proofItems: ['Restructured the entire manuscript', 'Defined a clear target audience', 'Mapped out a complete chapter framework', 'Created a step-by-step publishing roadmap'],
      result: '120-page draft → fully structured, publish-ready manuscript + execution plan in under 1 week',
    },
    {
      number: '02', icon: '🌍',
      headline: 'From an unpublished draft… to a globally available book in under 30 days',
      story: "After structuring the manuscript, the next challenge was visibility. Like most writers, the client had no idea how to publish professionally, distribute globally, or get listed beyond a single platform.",
      proofItems: ['Completed professional formatting', 'Handled full publishing setup', 'Distributed across 300+ global platforms', 'Listed on major retailers worldwide'],
      result: 'Unpublished manuscript → live book available worldwide across major platforms within 30 days',
    },
    {
      number: '03', icon: '🎬',
      headline: "From a static book… to a content engine generating attention within weeks",
      story: 'Even after publishing, most books stay invisible. That was the client\'s biggest concern: "What if no one sees it?" So we moved into the next phase — visibility.',
      proofItems: ['Created 15+ cinematic short-form videos', 'Optimized for platform distribution', 'Published across visual content channels', 'Generated consistent impressions + traffic back to the book'],
      result: 'Static book → multi-platform video content generating consistent impressions and driving traffic back to the book within 30–45 days',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#eeede8] via-[#fff9f2] to-[#fff5e8] py-20 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="pointer-events-none absolute top-1/3 right-[-8%] h-[300px] w-[300px] rounded-full bg-[#FFBE02]/12 blur-[95px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#FFBE02]/10 text-[#b8860b] text-xs font-bold tracking-widest uppercase mb-3 border border-[#FFBE02]/20">
              — PROOF
            </span>
            <h2 className="text-zinc-900 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Real Writers.{' '}
              <span className="italic" style={{ color: '#b8860b' }}>Real Results.</span>
            </h2>
          </motion.div>
        </div>

        <div className="space-y-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] border border-white/60 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              <div className="border-b border-zinc-100 px-7 sm:px-10 py-5 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{c.icon}</span>
                <div>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: ACCENT }}>CASE STUDY {c.number}</span>
                  <h3 className="text-zinc-900 font-bold text-lg sm:text-xl leading-snug mt-1">
                    {c.headline}
                  </h3>
                </div>
              </div>
              <div className="px-7 sm:px-10 py-7 grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <p className="text-zinc-400 text-[11px] font-bold tracking-widest uppercase mb-3">THE STORY</p>
                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">{c.story}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-[11px] font-bold tracking-widest uppercase mb-3">WHAT WE DID</p>
                  <ul className="space-y-2 mb-5">
                    {c.proofItems.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-zinc-600 text-sm">
                        <span style={{ color: ACCENT }} className="mt-0.5 flex-shrink-0 font-bold">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-xl p-4 border border-[#FFBE02]/30 bg-[#FFBE02]/5">
                    <p className="text-[10px] font-black tracking-widest uppercase mb-1.5 text-[#b8860b]">RESULT</p>
                    <p className="text-zinc-700 text-sm leading-relaxed italic font-medium">{c.result}</p>
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
  <section className="relative w-full overflow-hidden bg-gradient-to-b from-violet-50/40 via-[#faf8f5] to-[#fff8e6]/35 py-20 px-4 sm:px-6 md:px-10 lg:px-14">
    <div className="pointer-events-none absolute top-[-8%] left-[-5%] h-[280px] w-[280px] rounded-full bg-violet-200/15 blur-[90px]" />

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#FFBE02]/10 text-[#b8860b] text-xs font-bold tracking-widest uppercase mb-3 border border-[#FFBE02]/20">
            — FOUNDATION
          </span>
          <h2 className="text-zinc-900 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Why This{' '}
            <span className="italic" style={{ color: '#b8860b' }}>System Works</span>
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Focus areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-7 sm:p-8 border border-white/60 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)]"
        >
          <p className="text-zinc-700 text-base sm:text-lg leading-relaxed mb-7 font-medium">
            Most writers focus only on writing. We focus on:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: 'Structure', detail: 'Making your story market-ready' },
              { label: 'Distribution', detail: 'Getting it in front of a worldwide audience' },
              { label: 'Visibility Systems', detail: 'Content that creates ongoing reach' },
            ].map((item) => (
              <div key={item.label} className="border-t-2 pt-4" style={{ borderColor: ACCENT }}>
                <p className="text-zinc-900 font-bold text-base mb-1">{item.label}</p>
                <p className="text-zinc-500 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-400 text-sm mt-7 pt-5 border-t border-zinc-100">
            Writing alone doesn&apos;t create attention.{' '}
            <span className="text-zinc-700 font-semibold">Distribution does.</span>
          </p>
        </motion.div>

        {/* Expectation setting */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-7 border border-white/60 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)]"
        >
          <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-4">WHAT THIS IS NOT</p>
          <ul className="space-y-2 mb-6">
            {['Overnight fame', 'Guaranteed virality', 'Instant income'].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span className="text-zinc-400 line-through">{t}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-zinc-100 pt-5">
            <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-3">WHAT IT IS</p>
            <p className="text-zinc-600 text-sm leading-relaxed">
              A <span className="text-zinc-900 font-semibold">long-term digital asset</span> that compounds over time when structured correctly.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Transparency */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#FFBE02]/8 border border-[#FFBE02]/25 rounded-2xl p-6 sm:p-8 flex items-start gap-4"
      >
        <span className="text-2xl flex-shrink-0">🛡️</span>
        <div>
          <p className="text-zinc-900 font-bold text-base mb-1.5">Our Transparency Policy</p>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Before starting any project, we evaluate whether your manuscript or idea is actually ready for structured publishing.
            If it&apos;s not aligned, we tell you upfront.{' '}
            <span className="text-zinc-800 font-semibold">No forced publishing. No shortcuts.</span>
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── 9. FINAL CTA ────────────────────────────────────────────────────────────
const FinalCTASection = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#fff8e6]/45 via-[#FFBE02]/10 to-[#fffbeb] py-24 px-4 sm:px-6 md:px-10 lg:px-14">
    <div className="pointer-events-none absolute bottom-[-12%] right-[-10%] h-[380px] w-[380px] rounded-full bg-[#FFBE02]/25 blur-[110px]" />
    <div className="pointer-events-none absolute top-[-5%] left-[-8%] h-[240px] w-[240px] rounded-full bg-violet-200/15 blur-[90px]" />

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#FFBE02]/15 text-[#b8860b] text-xs font-bold tracking-widest uppercase mb-5 border border-[#FFBE02]/30">
            — NEXT STEP
          </span>
          <h2 className="text-zinc-900 text-4xl sm:text-5xl font-bold mb-2 leading-tight">
            Book Your Free
          </h2>
          <h2 className="text-4xl sm:text-5xl font-bold italic mb-6 leading-tight" style={{ color: '#b8860b' }}>
            Strategy Call
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed mb-6">
            If you want clarity on how this would work for your story, book a strategy call. On the call, we&apos;ll break down:
          </p>
          <ul className="space-y-3 mb-8">
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
                className="flex items-start gap-3 text-zinc-600 text-sm sm:text-base"
              >
                <span style={{ color: ACCENT }} className="mt-0.5 flex-shrink-0 font-bold text-base">→</span> {item}
              </motion.li>
            ))}
          </ul>
          <p className="text-zinc-400 text-xs italic">No pressure. No obligation. Just clarity on whether your story is ready.</p>
        </motion.div>

        {/* RIGHT: CTA card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-8 sm:p-10 border border-white/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] text-center"
        >
          <div className="text-4xl mb-4">🎬</div>
          <h3 className="text-zinc-900 text-2xl font-bold mb-2">Ready to Start?</h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-7">
            Lock in a time. We&apos;ll prep a full analysis of your story&apos;s potential before the call — completely free.
          </p>
          <CTAButton text="CLAIM YOUR FREE CALL →" className="w-full justify-center" />
          <div className="mt-8 pt-6 border-t border-zinc-100">
            <p className="text-zinc-400 text-xs leading-relaxed">
              If you just want to &ldquo;publish a book&rdquo; casually — this is not for you.
              But if you want your story structured, published, and transformed into a distributed content asset —{' '}
              <span className="text-zinc-600 font-semibold">this system was built for you.</span>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function BookToCinemaPage() {
  return (
    <div className="w-full bg-[#faf9f6] font-sans overflow-x-hidden">
      <Header forceBookToVideoLayout />
      <HeroSection />
      <IsThisForMeSection />
      <HowItWorksSection />
      <OutcomeSection />
      <CaseStudiesSection />
      <WhyItWorksSection />
      <FinalCTASection />
      <SiteFooter />
    </div>
  );
}
