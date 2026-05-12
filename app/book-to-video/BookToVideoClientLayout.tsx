'use client';

import { useEffect } from 'react';
import CalendlyScheduledRedirect from '../components/CalendlyScheduledRedirect';

type TawkWindow = Window & {
  Tawk_API?: { hideWidget?: () => void; showWidget?: () => void };
};

export default function BookToVideoClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const hide = () => {
      (window as TawkWindow).Tawk_API?.hideWidget?.();
    };

    hide();
    const interval = window.setInterval(hide, 250);
    const stop = window.setTimeout(() => window.clearInterval(interval), 10_000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
      (window as TawkWindow).Tawk_API?.showWidget?.();
    };
  }, []);

  /**
   * After the initial anchor scroll completes, strip any `#calendly` (or other) hash so layout shifts later
   * (Calendly iframe loads, motion animations) don't cause the browser to re-scroll to the anchor.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.location.hash) return;
    const t = window.setTimeout(() => {
      const { pathname, search } = window.location;
      window.history.replaceState(null, '', `${pathname}${search}`);
    }, 600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <CalendlyScheduledRedirect />
      {children}
    </>
  );
}
