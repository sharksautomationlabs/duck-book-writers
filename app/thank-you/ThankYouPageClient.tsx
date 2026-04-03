'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarPlus, CheckCircle2, ChevronDown, Star } from 'lucide-react';
import { COMPANY_NAME, CONTACT_EMAIL } from '../config/constants';

type SlidingReview = {
  name: string;
  /** Optional subtitle under the name (e.g. role); omit when not needed */
  role?: string;
  text: string;
  rating?: number;
  verified?: boolean;
  posted?: string;
  avatarSrc?: string;
};

function getAuthorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const a = parts[0].replace(/\./g, '')[0] ?? '?';
  const b = parts[parts.length - 1].replace(/\./g, '')[0] ?? '?';
  return (a + b).toUpperCase();
}

const THANK_YOU_FAQS = [
  {
    q: 'Is Duck Book Writers legit, or just another scam?',
    a: `${COMPANY_NAME} is a real publishing and Book to Video team. We are transparent about our process, fees, and what you can expect. You own your book and channel; we produce and help you grow.`,
  },
  {
    q: 'How do I know this is a real service, not just a course?',
    a: 'We provide done-for-you production: scripting, visuals, editing, and launch support—not only training. You get real assets you can publish, not just PDFs or replays.',
  },
  {
    q: 'Why should I trust you?',
    a: 'We share how the program works upfront, align on deliverables before you commit, and focus on long-term author growth. Ask anything on your call; we prefer clarity over hype.',
  },
  {
    q: 'Do I need a finished book to start?',
    a: 'No. We can start from a draft or a detailed outline and shape it into a series-ready plan and video strategy.',
  },
  {
    q: 'How do I make money?',
    a: 'You keep your book royalties. Video drives discovery; we help you present your story so more readers find and buy your work. Results vary by niche and execution.',
  },
  {
    q: 'Why YouTube / Cinema-style video?',
    a: 'Most readers discover books through video. A strong visual hook helps your title stand out in a crowded market.',
  },
  {
    q: 'What are realistic expectations?',
    a: 'Growth depends on your genre, assets, and consistency. We show examples of what partners have achieved, but we do not guarantee specific views or income.',
  },
  {
    q: 'How much time do I need each week?',
    a: 'Most partners spend a small amount of time on approvals and updates. We handle heavy production so you can stay focused on writing and your brand.',
  },
  {
    q: 'Will I still own my content?',
    a: 'Yes. You retain ownership of your manuscript and channel. Our role is production and strategy under your direction.',
  },
  {
    q: 'What should I do before the call?',
    a: 'Be in a quiet place, confirm the phone number you used to book, and jot down your top questions. If you miss the scheduled time, rescheduling may be limited—please be on time.',
  },
];

const PARTNER_RESULT_IMAGES = [
  { src: '/thank-you/partner-result-1.png', alt: 'Partner channel analytics — strong growth in views and subscribers' },
  { src: '/thank-you/partner-result-2.png', alt: 'Partner channel analytics — watch time and audience growth' },
  { src: '/thank-you/partner-result-3.png', alt: 'Partner channel analytics — content performance overview' },
  { src: '/thank-you/partner-result-4.png', alt: 'Partner channel analytics — viral spike example' },
  { src: '/thank-you/partner-result-5.png', alt: 'Partner channel analytics — steady growth and top videos' },
] as const;

function StepBadge({ n }: { n: number }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFBE02] text-base font-black text-zinc-900 shadow-sm ring-2 ring-[#FFBE02]/40"
      aria-hidden
    >
      {n}
    </span>
  );
}

/** ~Caldwell-length and below = no toggle; longer = See more (fixed card height). */
const THANK_YOU_REVIEW_CHAR_THRESHOLD = 220;

function ThankYouReviewCard({ item }: { item: SlidingReview }) {
  const [expanded, setExpanded] = useState(false);
  const rating = item.rating ?? 5;
  const needsToggle = item.text.length > THANK_YOU_REVIEW_CHAR_THRESHOLD;

  return (
    <div className="flex h-[17.75rem] w-[min(300px,calc(100vw-2rem))] shrink-0 flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:h-[18.5rem] sm:w-[360px] sm:gap-2.5 sm:rounded-3xl sm:p-5 md:h-[19rem] md:w-[420px]">
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <div className="flex text-[#FFBE02]">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${i < rating ? 'fill-current text-[#FFBE02]' : 'fill-gray-200 text-gray-200'}`}
            />
          ))}
        </div>
        {item.verified ? (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-800 ring-1 ring-teal-200/80 sm:text-[11px]">
            <CheckCircle2 className="h-3 w-3 shrink-0 text-teal-600" aria-hidden />
            Verified Buyer
          </span>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div
          className={`min-h-0 flex-1 ${expanded ? 'overflow-y-auto pr-0.5 [scrollbar-gutter:stable]' : 'overflow-hidden'}`}
        >
          <p
            className={`text-xs italic leading-relaxed text-gray-700 sm:text-sm ${expanded ? '' : 'line-clamp-6'}`}
          >
            &quot;{item.text}&quot;
          </p>
        </div>
        <div className="flex h-6 shrink-0 items-center pt-1">
          {needsToggle ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-left text-[11px] font-semibold text-[#9a7209] transition hover:text-zinc-900 hover:underline"
            >
              {expanded ? 'See less' : 'See more'}
            </button>
          ) : (
            <span className="invisible select-none text-[11px] font-semibold" aria-hidden>
              See more
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-end justify-between gap-2 border-t border-gray-100 pt-2.5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {item.avatarSrc ? (
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-gray-200/80 sm:h-9 sm:w-9">
              <Image src={item.avatarSrc} alt={item.name} fill className="object-cover" sizes="(max-width: 640px) 32px, 36px" />
            </div>
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 text-[10px] font-bold text-gray-600 sm:h-9 sm:w-9 sm:text-xs">
              {getAuthorInitials(item.name)}
            </div>
          )}
          <div className="min-w-0">
            <h5 className="text-xs font-bold text-gray-900 sm:text-sm">{item.name}</h5>
            {item.role ? <p className="truncate text-[10px] text-gray-500 sm:text-xs">{item.role}</p> : null}
          </div>
        </div>
        {item.posted ? <p className="shrink-0 text-right text-[10px] text-gray-400 sm:text-xs">{item.posted}</p> : null}
      </div>
    </div>
  );
}

function ThankYouTestimonials() {
  const reviewsRow1: SlidingReview[] = [
    {
      name: 'Julissa Taggi',
      text: 'I enjoyed my experience editing, and creating a book from my manuscript with Duck Book Writers. I saw my book for the first time from a friend and was very pleased with the finished product. Thank you for your support and guidance Palmetto publishing.',
      verified: true,
      posted: 'Posted 3 months ago',
    },
    {
      name: 'Caldwell Dejesus',
      text: 'Duck Book Writers is an invaluable resource for aspiring authors. Their guidance on both self-publishing and traditional publishing is clear and actionable. A must-visit for anyone looking to navigate the book publishing world!',
      verified: true,
      posted: 'Posted 3 months ago',
    },
    {
      name: 'Lucas Mart',
      text: 'This group took the pressure off marketing my book. Working with Freddie Norman made the publishing experience easier. He brought a high degree of professionalism and confidence to the table and was backed by an excellent, proficient team. Deadlines were met, and communication was excellent.',
      verified: true,
      posted: 'Posted 3 months ago',
    },
    {
      name: 'Stanley Levy',
      text: "Their promotion service helped my book gain visibility across the United States. I'm so grateful for their expertise.",
      verified: true,
      posted: 'Posted 3 months ago',
    },
    {
      name: 'David Holder',
      text: 'Fantastic service! My book sales and online presence have improved significantly. Highly recommended.',
      verified: true,
      posted: 'Posted 3 months ago',
    },
  ];

  const reviewsRow2: SlidingReview[] = [
    {
      name: 'Rob B.',
      text: 'I gave them the project to convert my book into videos and they did an amazing job. They just not only create videos, but they also created my youtube channel, branded it with my initials and pictures and upload those videos to that channel and now I am getting amazing response. These guys are promoting my book on youtube and my sales are multiplied 3 times better than before. Duck Book is a highly recommended company. I am definitely gonna tell my friends about them. Such an amazing team with amazing creativity and expertise. Hats off Jerry, Freddie, Aaron, Josh and the whole team. Cheers!!!',
      verified: true,
      posted: 'Posted 3 months ago',
    },
    {
      name: 'Rylan Julissa',
      text: "The editing team was sharp. They didn't just fix grammar, they pushed my storytelling to the next level. I had a complex magic system, and they respected it without watering it down. Only hiccup was a small delay in cover revisions, but they made up for it fast. I'm already outlining book two.",
      verified: true,
      posted: 'Posted 3 months ago',
    },
    {
      name: 'Adison Lucas',
      text: 'Duck Book Writers made my dream come true. From editing to final publication, they were with me every step of the way.',
      verified: true,
      posted: 'Posted 3 months ago',
    },
    {
      name: 'Amy Thomas',
      text: "I have been very pleased with the way the illustrations turned out in my children's book. Also, they are looking into making it into a video series on YouTube. Also, I needed help with doing a revisions to my first book and they were able to do that for me. I have enjoyed working with them.",
      rating: 4,
      verified: true,
      posted: 'Posted 2 weeks ago',
    },
  ];

  const MarqueeRow = ({ items, direction = 1, speed = 40 }: { items: SlidingReview[]; direction?: number; speed?: number }) => (
    <div className="book-video-testimonial-row relative mb-6 flex w-full overflow-hidden">
      <div
        className={
          direction === 1
            ? 'book-video-testimonial-track book-video-testimonial-track--ltr items-stretch'
            : 'book-video-testimonial-track book-video-testimonial-track--rtl items-stretch'
        }
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <ThankYouReviewCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fff8e6]/45 via-[#FFBE02]/18 to-[#fffbeb] py-16 sm:py-20">
      <div className="mx-auto mb-10 max-w-3xl px-4 text-center sm:mb-12">
        <div className="mb-3 flex items-center justify-center gap-3">
          <StepBadge n={3} />
          <h2 className="font-serif text-2xl font-black tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            See what others have to <span className="text-[#FFBE02]">say</span>
          </h2>
        </div>
        <p className="text-base italic text-gray-600">First-hand experiences from authors who partnered with our team.</p>
      </div>

      <div className="relative flex w-full rotate-[-1deg] flex-col items-center scale-100 sm:scale-105">
        <MarqueeRow items={reviewsRow1} direction={1} speed={78} />
        <MarqueeRow items={reviewsRow2} direction={-1} speed={85} />

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#fffbeb] to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#fffbeb] to-transparent md:w-24" />
      </div>
    </section>
  );
}

function ThankYouFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf9f6] via-[#faf9f6] to-[#faf9f6] py-14 sm:py-20">
      <div className="pointer-events-none absolute -left-[8%] -top-24 h-[260px] w-[260px] rounded-full bg-violet-200/25 blur-[95px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-[10%] h-[220px] w-[220px] rounded-full bg-[#FFBE02]/12 blur-[85px]" />
      <div className="relative mx-auto max-w-3xl px-4">
        <div className="mb-8 flex flex-col items-center gap-3 text-center sm:mb-10 sm:flex-row sm:justify-center">
          <StepBadge n={2} />
          <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Frequently asked <span className="text-[#FFBE02]">questions</span>
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {THANK_YOU_FAQS.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-violet-100/40 bg-white/95 shadow-sm transition-all hover:border-violet-200/50 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left focus:outline-none sm:px-6 sm:py-5"
              >
                <span className="pr-3 text-base font-bold text-gray-800 sm:text-lg">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-gray-600 sm:px-6 sm:pb-6 sm:text-base">
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
}

export default function ThankYouPageClient() {
  return (
    <div className="min-h-svh w-full bg-gradient-to-b from-[#fff8e6] via-[#fffbeb] to-[#faf9f6] font-sans text-zinc-900">
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:max-w-4xl">
        <div className="mb-10 text-center sm:mb-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFBE02]/20 ring-2 ring-[#FFBE02]/40">
            <CheckCircle2 className="h-10 w-10 text-[#c9a008]" strokeWidth={2} aria-hidden />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b8860b] sm:text-sm">Congrats</p>
          <h1 className="font-serif text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Your call has been <span className="text-[#FFBE02]">booked</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            Follow the steps below to confirm your spot and get the most out of your consultation with {COMPANY_NAME}.
          </p>
        </div>

        {/* Step 1 — Calendar (ECOM-style single CTA, Book-to-Video theme) */}
        <section className="mb-12 rounded-2xl border border-[#FFE08A]/60 bg-white/90 p-6 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.12)] sm:mb-14 sm:rounded-3xl sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-center sm:justify-start sm:text-left">
            <StepBadge n={1} />
            <h2 className="font-serif text-xl font-bold sm:text-2xl">Click the button below to add the event to your calendar</h2>
          </div>
          <div className="flex flex-col items-center">
            <a
              href="https://calendar.google.com/calendar/u/0/r"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full max-w-lg items-center justify-center gap-3 rounded-xl bg-[#FFBE02] px-6 py-4 text-center text-base font-black tracking-tight text-zinc-900 shadow-[0_8px_24px_-4px_rgba(255,190,2,0.55)] ring-2 ring-[#e5a800]/40 transition hover:bg-[#f5b400] hover:shadow-[0_12px_28px_-4px_rgba(255,190,2,0.65)] active:scale-[0.99] sm:py-5 sm:text-lg"
            >
              <CalendarPlus className="h-6 w-6 shrink-0" strokeWidth={2.25} aria-hidden />
              Add The Event To Your Calendar
            </a>
            <p className="mt-5 max-w-lg text-center text-sm text-zinc-600">
              Your Calendly confirmation email also has an add-to-calendar link for Google, Outlook, or Apple Calendar.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Calendar%20help%20%E2%80%93%20Book%20to%20Video%20call`}
              className="mt-3 text-sm font-medium text-[#b8860b] underline-offset-2 hover:underline"
            >
              Didn&apos;t get the email? Contact us
            </a>
          </div>
        </section>
      </main>

      <ThankYouFAQ />

      {/* Partner results — full width band */}
      <section className="border-y border-[#FFE08A]/40 bg-gradient-to-b from-white to-[#fffbeb]/80 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-2 text-center font-serif text-2xl font-black text-zinc-900 sm:text-3xl md:text-4xl">
            Inside Look at <span className="text-[#FFBE02]">Partner Store</span> Results
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-zinc-600 sm:text-base">
            A glimpse into the audience growth partners have seen with our Book to Video approach. Screenshots are illustrative of real analytics dashboards;{' '}
            <span className="font-medium text-zinc-700">individual results vary.</span>
          </p>
          <div className="flex flex-col gap-8">
            {PARTNER_RESULT_IMAGES.map((img, i) => (
              <div
                key={img.src}
                className="w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_16px_48px_-20px_rgba(0,0,0,0.15)] ring-1 ring-zinc-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={800}
                  className="h-auto w-full object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ThankYouTestimonials />

      <div className="mx-auto max-w-3xl px-4 pb-16 pt-4 sm:px-6 lg:max-w-4xl">
        {/* Step 4 — Prepare */}
        <section className="mb-12 rounded-2xl border border-[#FFE08A]/60 bg-white/90 p-6 shadow-sm sm:rounded-3xl sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <StepBadge n={4} />
            <h2 className="font-serif text-xl font-bold sm:text-2xl">Prepare for your call</h2>
          </div>
          <ul className="list-inside list-disc space-y-3 text-zinc-600 marker:text-[#FFBE02]">
            <li>
              <span className="font-semibold text-zinc-800">Double-check your phone number</span> — use one you can answer at the scheduled time.
            </li>
            <li>
              <span className="font-semibold text-zinc-800">Be ready to pick up</span> — missed calls may not be rescheduled.
            </li>
            <li>
              <span className="font-semibold text-zinc-800">Quiet space + questions</span> — bring anything you want clarity on before moving forward.
            </li>
          </ul>
        </section>

        <div className="mb-10 text-center">
          <p className="font-serif text-xl font-bold text-zinc-900 sm:text-2xl">We look forward to seeing you on the call!</p>
        </div>

        <footer className="border-t border-zinc-200/80 pt-8 text-center text-xs text-zinc-500 sm:text-sm">
          <p className="mb-3">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#b8860b] underline-offset-2 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mx-auto max-w-2xl leading-relaxed">
            {COMPANY_NAME} provides publishing and Book to Video services. We do not guarantee specific views, subscribers, or income. Testimonials reflect real author
            experiences but are not guarantees. By using this page, you acknowledge that you are responsible for your decisions and outcomes.
          </p>
          <p className="mt-4 text-zinc-400">&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
