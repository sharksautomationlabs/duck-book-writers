'use client';

import Image from 'next/image';

const MarqueeBanner = () => {
  const text = "a project of ECOMMERCE SHARKS LLC";
  const content = (
    <>
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-8 font-['Poppins'] text-xs sm:text-sm font-semibold uppercase flex items-center gap-2">
          <Image 
            src="/images/ecom-logo.png" 
            alt="Ecommerce Sharks Logo" 
            width={28} 
            height={28} 
            className="object-contain"
          />
          {text}
        </span>
      ))}
    </>
  );
  
  return (
    <div className="bg-white/80 text-black py-2 overflow-hidden relative z-50">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* First set */}
        {content}
        {/* Duplicate set for seamless loop */}
        {content}
      </div>
    </div>
  );
};

export default MarqueeBanner;

