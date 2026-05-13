import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BreadcrumbJsonLd } from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Duck Book Writers',
  description:
    'Read the Terms and Conditions governing your use of Duck Book Writers services including ghostwriting, editing, book cover design, publishing, and distribution.',
  alternates: { canonical: 'https://www.duckbookwriters.com/terms' },
  robots: { index: true, follow: true },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4">{title}</h2>
    <div className="text-slate-600 leading-relaxed space-y-3 text-[15px] sm:text-base">{children}</div>
  </div>
);

export default function TermsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'Terms and Conditions', url: '/terms' }]} />
      <Header />
      <main className="max-w-3xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Terms and Conditions</h1>
        <p className="text-sm text-slate-400 mb-12">Last updated: May 2025</p>

        <Section title="1. Acceptance of Terms">
          <p>By accessing or using any service offered by Duck Book Writers (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
        </Section>

        <Section title="2. Services">
          <p>Duck Book Writers provides professional book publishing services including but not limited to ghostwriting, developmental editing, copyediting, proofreading, book cover design, self-publishing assistance, global distribution setup, book marketing, and Book-to-Video production.</p>
          <p>The scope of each project is defined in a separate Service Agreement signed between you and the Company prior to commencement of work.</p>
        </Section>

        <Section title="3. Payment Terms">
          <p>All fees are quoted in USD. Payment schedules are outlined in your individual Service Agreement. We accept major credit cards, PayPal, and other payment methods listed on our website. Invoices are due upon receipt unless otherwise agreed in writing.</p>
          <p>Late payments may result in suspension of ongoing work until the outstanding balance is settled.</p>
        </Section>

        <Section title="4. Intellectual Property">
          <p>Upon receipt of full payment, all creative deliverables produced exclusively for your project are assigned to you. You grant Duck Book Writers a limited, non-exclusive right to display completed work in our portfolio and marketing materials unless you request otherwise in writing.</p>
          <p>Any pre-existing intellectual property owned by the Company (templates, frameworks, tools) remains the property of Duck Book Writers.</p>
        </Section>

        <Section title="5. Confidentiality">
          <p>We treat all manuscript content, business information, and personal details shared with us as strictly confidential. We will not disclose your information to third parties except as required to deliver the agreed services or as required by law.</p>
        </Section>

        <Section title="6. Revisions and Approvals">
          <p>The number of included revision rounds is specified in your Service Agreement. Additional revisions beyond the agreed scope may be subject to additional fees. Your written approval at each milestone stage constitutes acceptance of that deliverable.</p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>Duck Book Writers shall not be liable for any indirect, incidental, or consequential damages arising out of or related to our services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.</p>
        </Section>

        <Section title="8. Governing Law">
          <p>These Terms and Conditions are governed by the laws of the State of Texas, United States, without regard to its conflict-of-law principles. Any disputes shall be resolved in the courts of Richmond, Texas.</p>
        </Section>

        <Section title="9. Changes to These Terms">
          <p>We reserve the right to update these Terms at any time. Continued use of our services after changes are posted constitutes acceptance of the revised Terms.</p>
        </Section>

        <Section title="10. Contact">
          <p>Questions about these Terms? Email us at <a href="mailto:contact@duckbookwriters.com" className="text-amber-600 hover:underline">contact@duckbookwriters.com</a> or call <a href="tel:+13464637721" className="text-amber-600 hover:underline">+1 (346) 463-7721</a>.</p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
