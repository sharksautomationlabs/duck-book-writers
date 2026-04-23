"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Lock } from "lucide-react";
import { COMPANY_NAME, CONTACT_EMAIL, CONTACT_PHONE } from "../config/constants";

const footerFont =
  'font-[system-ui,-apple-system,BlinkMacSystemFont,"Segoe_UI",sans-serif]';
const footerColTitle =
  `text-[16px] sm:text-[17px] font-semibold tracking-[0.03em] text-slate-900 mb-5 ${footerFont}`;
const footerLinkClass =
  `text-[16px] sm:text-[18px] leading-[1.5] text-slate-600 hover:text-slate-900 transition-colors ${footerFont}`;

const FooterSocial = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF0000] to-[#FFBE02] text-white shadow-md hover:brightness-110 transition-transform transition-colors hover:-translate-y-0.5"
  >
    {children}
  </a>
);

const PaymentMarkVisa = () => (
  <span className="inline-flex h-8 min-w-[48px] items-center justify-center rounded bg-white px-2 shadow-sm ring-1 ring-black/5" aria-hidden>
    <svg viewBox="0 0 48 16" className="h-3.5 w-auto" fill="none"><path fill="#1434CB" d="M20 2h8l-5 12h-8l5-12ZM31 2h5.5l3.5 6.2L42.5 2H47l-5 12h-5l5-12H31V2ZM9 2L4 14H0l2.2-5.5L2 2h7Zm2.5 0L9 14H5l2.5-12H11.5Z" /></svg>
  </span>
);
const PaymentMarkMastercard = () => (
  <span className="inline-flex h-8 min-w-[46px] items-center justify-center rounded bg-white px-2 shadow-sm ring-1 ring-black/5" aria-hidden>
    <svg viewBox="0 0 40 24" className="h-5 w-auto"><circle cx="15" cy="12" r="10" fill="#EB001B" /><circle cx="25" cy="12" r="10" fill="#F79E1B" /><path d="M20 5.5a10 10 0 000 13 10 10 0 010-13Z" fill="#FF5F00" /></svg>
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

export default function Footer() {
  return (
    <footer className="mt-0 bg-[#faf9f6] pt-8 pb-10 sm:pt-10 sm:pb-12">
      <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="rounded-2xl sm:rounded-3xl shadow-md shadow-black/[0.04] border border-amber-200/35 bg-gradient-to-br from-[#fff8da] via-[#fff6f6] to-[#ffe7d8] px-5 sm:px-9 lg:px-8 xl:px-10 py-10 sm:py-12 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-7 gap-x-3 sm:gap-x-4 xl:gap-x-5 lg:justify-items-start">
            <div className="min-w-0 lg:col-span-1 flex flex-col items-start">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/duck-logo-final.png"
                  alt={`${COMPANY_NAME} logo`}
                  width={180}
                  height={72}
                  className="h-[56px] sm:h-[62px] md:h-[70px] lg:h-[78px] w-auto object-contain"
                />
              </Link>
            </div>

            <div className="min-w-0">
              <h4 className={footerColTitle}>Product</h4>
              <ul className="space-y-3">
                <li><Link href="/book-to-video" className={footerLinkClass}>Book to Cinema</Link></li>
                <li><Link href="/services" className={footerLinkClass}>Our Services</Link></li>
                <li><span className={footerLinkClass + " cursor-default"}>Cash Cow &amp; Long-form</span></li>
                <li><span className={footerLinkClass + " cursor-default"}>2D Animation</span></li>
                <li><span className={footerLinkClass + " cursor-default"}>Face Content</span></li>
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
                <li><span className={footerLinkClass + " cursor-default"}>Cookie settings</span></li>
              </ul>
            </div>

            <div className="min-w-0 w-full lg:col-span-1 lg:justify-self-start text-left">
              <h4 className={`${footerColTitle} text-left`}>Get in touch</h4>
              <div className={`space-y-2 text-[14px] sm:text-[15px] xl:text-[16px] leading-relaxed text-slate-600 ${footerFont}`}>
                <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-1 font-normal">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="whitespace-nowrap text-slate-600 hover:text-slate-900 underline-offset-2 hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <span className="text-slate-300 select-none" aria-hidden>
                    ·
                  </span>
                  <a href="tel:+13464637721" className="whitespace-nowrap text-slate-600 hover:text-slate-900">
                    Main: {CONTACT_PHONE}
                  </a>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <FooterSocial href="https://www.facebook.com/duckbookwriters" label="Facebook">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.03H7.9v-2.9h2.54V9.77c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.94 8.44-9.94Z" />
                  </svg>
                </FooterSocial>
                <FooterSocial href="https://www.instagram.com/duckbookwriters/" label="Instagram">
                  <Image src="/images/instagram.svg" alt="" width={22} height={22} className="h-[22px] w-[22px] brightness-0 invert" />
                </FooterSocial>
                <FooterSocial href="https://www.youtube.com/results?search_query=Duck+Book+Writers" label="Cinema">
                  <svg className="h-5 w-[22px]" viewBox="0 0 24 18" fill="currentColor" aria-hidden>
                    <path d="M23.5 4.5a2.8 2.8 0 0 0-1.98-2C19.5 2 12 2 12 2s-7.5 0-9.52.5A2.8 2.8 0 0 0 .5 4.5 29 29 0 0 0 0 9a29 29 0 0 0 .5 4.5 2.8 2.8 0 0 0 1.98 2C4.5 16 12 16 12 16s7.5 0 9.52-.5a2.8 2.8 0 0 0 1.98-2 29 29 0 0 0 .5-4.5 29 29 0 0 0-.5-4.5ZM9.75 12.25V5.75L15.5 9l-5.75 3.25Z" />
                  </svg>
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
              <div
                className="flex flex-wrap items-center gap-2.5"
                role="list"
                aria-label="Accepted payment methods"
              >
                <PaymentMarkApple />
                <PaymentMarkDiscover />
                <PaymentMarkGoogle />
                <PaymentMarkMastercard />
                <PaymentMarkAmex />
                <PaymentMarkPayPal />
                <PaymentMarkVisa />
              </div>
              <p className={`text-[15px] sm:text-[16px] text-slate-600 ${footerFont}`}>
                <Link href="/" className="hover:text-slate-800 underline-offset-2 hover:underline">Home</Link>
                {" · "}
                © {new Date().getFullYear()} {COMPANY_NAME}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


