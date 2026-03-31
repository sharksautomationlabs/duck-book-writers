'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import CalendlyInlineEmbed from '../components/CalendlyInlineEmbed';
import YouTubeMarkIcon from '../components/icons/YouTubeMarkIcon';

function formatStat(n: number, useGrouping: boolean) {
  return useGrouping ? n.toLocaleString('en-US') : String(n);
}

function AnimatedStatNumber({
  target,
  suffix,
  useGrouping,
  delayMs = 0,
  className,
}: {
  target: number;
  suffix: string;
  useGrouping: boolean;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;
    const durationMs = 2200;
    const startAt = performance.now() + delayMs;

    const tick = (now: number) => {
      if (cancelled) return;
      if (now < startAt) {
        requestAnimationFrame(tick);
        return;
      }
      const t = Math.min((now - startAt) / durationMs, 1);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
      else setValue(target);
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [isInView, target, delayMs]);

  return (
    <h4 ref={ref} className={className}>
      {formatStat(value, useGrouping)}
      {suffix}
    </h4>
  );
}

export default function BookingSection() {
  return (
    <section
      id="calendly"
      className="relative z-20 overflow-hidden py-14 sm:py-20 md:py-24 bg-gradient-to-b from-[#fafaf9] via-white to-[#fff8ed]/60"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-10%] h-[380px] w-[380px] rounded-full bg-[#FFBE02]/12 blur-[100px]" />
        <div className="absolute bottom-0 left-[-8%] h-[320px] w-[320px] rounded-full bg-amber-100/40 blur-[90px]" />
        <div className="absolute top-1/3 left-1/2 h-px w-[min(72%,720px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-zinc-200/80 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-14 md:mb-16">
          <p className="mb-3 font-['Poppins'] text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
            Consultation
          </p>
          <h2 className="mx-auto max-w-5xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-[#111111] sm:text-5xl md:text-6xl lg:text-7xl">
            Reserve Your Spot.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-['Poppins'] text-base text-zinc-600 sm:text-lg">
            Free 30-minute strategy call · Walk through Book-to-YouTube with our team · No obligation
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,1.05fr)] lg:gap-16 xl:gap-20">
          <div className="mx-auto flex w-full max-w-[500px] flex-col justify-center gap-5 sm:gap-6 lg:mx-0">
          <div className="group relative bg-white rounded-3xl p-5 sm:p-7 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.04] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 ease-out cursor-default">
            <div className="relative w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] flex-shrink-0 transform group-hover:scale-110 transition-transform duration-500 ease-out">
              <Image
                src="/youtube-page/Book-Icon.png"
                alt="Book Published"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <AnimatedStatNumber
                target={10124}
                suffix="+"
                useGrouping
                delayMs={0}
                className="text-[34px] sm:text-[46px] font-medium leading-none tracking-tight text-[#111111] tabular-nums"
              />
              <p className="text-[16px] sm:text-[18px] font-medium text-[#333333]/70 mt-1.5">
                Book Published
              </p>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-5 sm:p-7 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.04] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 ease-out cursor-default">
            <div className="relative flex h-[65px] w-[65px] shrink-0 items-center justify-center sm:h-[75px] sm:w-[75px] transform transition-transform duration-500 ease-out group-hover:scale-110">
              <YouTubeMarkIcon className="h-11 w-11 sm:h-[52px] sm:w-[52px]" />
            </div>
            <div className="flex flex-col justify-center">
              <AnimatedStatNumber
                target={1200}
                suffix="+"
                useGrouping
                delayMs={120}
                className="text-[34px] sm:text-[46px] font-medium leading-none tracking-tight text-[#111111] tabular-nums"
              />
              <p className="text-[16px] sm:text-[18px] font-medium text-[#333333]/70 mt-1.5">
                Book Video
              </p>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-5 sm:p-7 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.04] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 ease-out cursor-default">
            <div className="relative w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] flex-shrink-0 transform group-hover:scale-110 transition-transform duration-500 ease-out">
              <Image
                src="/youtube-page/Smile_emoji_icon.png"
                alt="Happy Authors"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <AnimatedStatNumber
                target={95}
                suffix="%"
                useGrouping={false}
                delayMs={240}
                className="text-[34px] sm:text-[46px] font-medium leading-none tracking-tight text-[#111111] tabular-nums"
              />
              <p className="text-[16px] sm:text-[18px] font-medium text-[#333333]/70 mt-1.5">
                Happy Authors
              </p>
            </div>
          </div>
          </div>

          <div className="relative z-10 flex w-full justify-center lg:justify-end">
            <div className="w-full max-w-[600px] lg:ml-auto lg:mr-0">
              <div className="rounded-[1.5rem] bg-white/90 p-1.5 shadow-[0_24px_64px_-12px_rgba(15,15,15,0.14),0_0_0_1px_rgba(0,0,0,0.05)] backdrop-blur-sm sm:rounded-[1.85rem] sm:p-2">
                <div className="overflow-hidden rounded-[1.25rem] border border-zinc-200/80 bg-zinc-50/40 sm:rounded-[1.65rem]">
                  <div className="border-b border-zinc-200/70 bg-white px-4 py-4 sm:px-6 sm:py-5">
                    <p className="font-['Poppins'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a7209]">
                      Pick a time
                    </p>
                    <p className="mt-1.5 font-['Poppins'] text-sm leading-snug text-zinc-600 sm:text-[15px]">
                      Secure calendar — choose an opening that fits your schedule. You&apos;ll get a confirmation email right away.
                    </p>
                  </div>
                  <div className="bg-white">
                    <CalendlyInlineEmbed
                      containerId="book-to-video-calendly-side"
                      heightPx={620}
                      className="w-full min-h-[620px] overflow-hidden bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
