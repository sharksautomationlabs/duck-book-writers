'use client';

import Image from 'next/image';
import CalendlyInlineEmbed from '../components/CalendlyInlineEmbed';

export default function BookingSection() {
  return (
    <section id="calendly" className="py-12 sm:py-20 relative z-20 bg-transparent overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[40rem] h-[40rem] bg-gray-200/30 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-16 items-center">
        <div className="flex flex-col justify-center gap-5 sm:gap-6 w-full max-w-[500px] mx-auto lg:mx-0">
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
              <h4 className="text-[34px] sm:text-[46px] font-medium leading-none tracking-tight text-[#111111]">
                10,124+
              </h4>
              <p className="text-[16px] sm:text-[18px] font-medium text-[#333333]/70 mt-1.5">
                Book Published
              </p>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-5 sm:p-7 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.04] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 ease-out cursor-default">
            <div className="relative w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] flex-shrink-0 transform group-hover:scale-110 transition-transform duration-500 ease-out">
              <Image
                src="/youtube-page/YT-Big-icon.png"
                alt="Book Video"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-[34px] sm:text-[46px] font-medium leading-none tracking-tight text-[#111111]">
                1,200+
              </h4>
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
              <h4 className="text-[34px] sm:text-[46px] font-medium leading-none tracking-tight text-[#111111]">
                95%
              </h4>
              <p className="text-[16px] sm:text-[18px] font-medium text-[#333333]/70 mt-1.5">
                Happy Authors
              </p>
            </div>
          </div>
        </div>

        <div className="w-full relative z-10 flex justify-center lg:justify-end">
          <div className="w-full max-w-[650px] bg-transparent">
            <CalendlyInlineEmbed
              containerId="book-to-video-calendly-side"
              heightPx={720}
              className="w-full overflow-hidden bg-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
