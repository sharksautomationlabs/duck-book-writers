import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BreadcrumbJsonLd } from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'Cancellation Policy | Duck Book Writers',
  description:
    'Review the Duck Book Writers cancellation and refund policy for ghostwriting, editing, publishing, and all other book services.',
  alternates: { canonical: 'https://www.duckbookwriters.com/cancellation' },
  robots: { index: true, follow: true },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4">{title}</h2>
    <div className="text-slate-600 leading-relaxed space-y-3 text-[15px] sm:text-base">{children}</div>
  </div>
);

export default function CancellationPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'Cancellation Policy', url: '/cancellation' }]} />
      <Header />
      <main className="max-w-3xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Cancellation Policy</h1>
        <p className="text-sm text-slate-400 mb-12">Last updated: May 2025</p>

        <Section title="1. Our 30-Day Money-Back Guarantee">
          <p>Duck Book Writers offers a 30-day money-back guarantee on all new service engagements. If you are not satisfied with the initial deliverables within the first 30 days of your project start date, you may request a full refund — no questions asked.</p>
        </Section>

        <Section title="2. Cancellation Before Work Begins">
          <p>If you cancel your order before any work has commenced, you are entitled to a full refund of all amounts paid. Please notify us in writing at <a href="mailto:contact@duckbookwriters.com" className="text-amber-600 hover:underline">contact@duckbookwriters.com</a> as soon as possible.</p>
        </Section>

        <Section title="3. Cancellation After Work Has Begun">
          <p>If you cancel after work has begun but before the 30-day guarantee period expires, you are entitled to a full refund provided no milestone deliverable has been approved by you.</p>
          <p>If one or more milestone deliverables have been approved in writing, a partial refund will be issued based on the percentage of work remaining, less any completed and approved milestones.</p>
        </Section>

        <Section title="4. Cancellation After 30 Days">
          <p>Cancellations requested after 30 days from the project start date are evaluated on a case-by-case basis. Refunds for work already completed and approved are not available after 30 days. Payments for future milestones not yet started may be refunded at our discretion.</p>
        </Section>

        <Section title="5. Non-Refundable Items">
          <p>The following are non-refundable under any circumstances: third-party costs (ISBN registration, distribution platform fees, printing costs, software licences) already incurred on your behalf; rush-service surcharges for work already delivered; and any milestone that has been explicitly approved in writing by you.</p>
        </Section>

        <Section title="6. How to Request a Cancellation or Refund">
          <p>Send a written cancellation request to <a href="mailto:contact@duckbookwriters.com" className="text-amber-600 hover:underline">contact@duckbookwriters.com</a> with your name, order reference, and reason for cancellation. We will acknowledge your request within 2 business days and process eligible refunds within 7–10 business days to your original payment method.</p>
        </Section>

        <Section title="7. Project Pauses">
          <p>If you need to temporarily pause your project (rather than cancel), please contact us. We accommodate pauses of up to 60 days at no charge. Projects paused beyond 60 days may require a re-engagement fee to resume.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>Duck Book Writers reserves the right to modify this Cancellation Policy at any time. Changes take effect upon posting to this page. Existing Service Agreements are governed by the policy in effect at the time of signing.</p>
        </Section>

        <Section title="9. Contact">
          <p>Questions? Reach us at <a href="mailto:contact@duckbookwriters.com" className="text-amber-600 hover:underline">contact@duckbookwriters.com</a> or call <a href="tel:+13464637721" className="text-amber-600 hover:underline">+1 (346) 463-7721</a>.</p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
