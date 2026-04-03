'use client';

import { useEffect } from 'react';

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

  return <>{children}</>;
}
