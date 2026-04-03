import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Meeting booked | Duck Book Writers',
  description: 'Your consultation is scheduled. We will see you soon.',
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-svh w-full bg-gradient-to-b from-[#fff8e6] via-[#fffbeb] to-[#faf9f6] font-sans">
      <div className="mx-auto flex min-h-svh max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFBE02]/20 ring-2 ring-[#FFBE02]/40">
          <CheckCircle2 className="h-10 w-10 text-[#c9a008]" strokeWidth={2} aria-hidden />
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          You&apos;re all set
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
          Thanks for booking your call with Duck Book Writers. You&apos;ll get a confirmation email from
          Calendly with the time and link. We look forward to speaking with you.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-800"
          >
            Back to home
          </Link>
          <Link
            href="/book-to-video"
            className="inline-flex items-center justify-center rounded-full border-2 border-zinc-300 bg-white px-8 py-3 text-sm font-semibold text-zinc-800 transition hover:border-[#FFBE02] hover:text-zinc-900"
          >
            Book to Video
          </Link>
        </div>
      </div>
    </div>
  );
}
