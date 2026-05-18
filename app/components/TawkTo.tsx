'use client';

import { useEffect } from 'react';

const TAWK_SRC = 'https://embed.tawk.to/68c879bff929da1929585a38/1j57hn5b4';

function initTawkTo() {
  if (typeof window === 'undefined' || (window as any).__tawkLoaded) return;
  (window as any).__tawkLoaded = true;
  (window as any).Tawk_API = (window as any).Tawk_API || {};
  (window as any).Tawk_LoadStart = new Date();
  const s1 = document.createElement('script');
  s1.async = true;
  s1.src = TAWK_SRC;
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  const s0 = document.getElementsByTagName('script')[0];
  s0.parentNode!.insertBefore(s1, s0);
}

const TawkTo = () => {
  useEffect(() => {
    // Load after first user interaction or after 7 seconds — whichever comes first
    const events = ['scroll', 'mousemove', 'keydown', 'touchstart', 'click'] as const;

    const load = () => {
      initTawkTo();
      events.forEach(e => window.removeEventListener(e, load));
      clearTimeout(timer);
    };

    const timer = setTimeout(load, 7000);
    events.forEach(e => window.addEventListener(e, load, { passive: true, once: true }));

    return () => {
      clearTimeout(timer);
      events.forEach(e => window.removeEventListener(e, load));
    };
  }, []);

  return null;
};

export default TawkTo;
