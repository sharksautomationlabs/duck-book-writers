import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BreadcrumbJsonLd } from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy | Duck Book Writers',
  description:
    'Learn how Duck Book Writers collects, uses, and protects your personal information when you use our book publishing and ghostwriting services.',
  alternates: { canonical: 'https://www.duckbookwriters.com/privacy' },
  robots: { index: true, follow: true },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4">{title}</h2>
    <div className="text-slate-600 leading-relaxed space-y-3 text-[15px] sm:text-base">{children}</div>
  </div>
);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy' }]} />
      <Header />
      <main className="max-w-3xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-12">Last updated: May 2025</p>

        <Section title="1. Information We Collect">
          <p>When you contact us, request a quote, or purchase services, we may collect: your name, email address, phone number, mailing address, manuscript or book content you share with us, payment information (processed securely through our payment providers), and usage data from our website (via cookies and analytics tools).</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information we collect to: deliver the publishing services you have requested, communicate with you about your project, process payments, improve our website and services, and send you relevant updates or offers (you may opt out at any time).</p>
          <p>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
        </Section>

        <Section title="3. Cookies and Analytics">
          <p>Our website uses cookies and similar tracking technologies to understand how visitors use our site. We use Google Analytics to collect aggregated, anonymized data about site traffic. You can disable cookies in your browser settings; however, some features of the site may not function correctly.</p>
        </Section>

        <Section title="4. Data Sharing">
          <p>We may share your information with trusted service providers (payment processors, cloud storage, email platforms) who assist us in operating our business, under strict confidentiality agreements. We may also disclose information when required by law or to protect our legal rights.</p>
        </Section>

        <Section title="5. Data Security">
          <p>We implement industry-standard security measures including SSL encryption to protect your personal data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
        </Section>

        <Section title="6. Data Retention">
          <p>We retain your personal information for as long as necessary to fulfill the purposes described in this policy, or as required by law. You may request deletion of your data at any time by contacting us.</p>
        </Section>

        <Section title="7. Your Rights">
          <p>Depending on your location, you may have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, and opt out of marketing communications. To exercise any of these rights, contact us at the details below.</p>
        </Section>

        <Section title="8. Third-Party Links">
          <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>
        </Section>

        <Section title="9. Children&apos;s Privacy">
          <p>Our services are not directed to individuals under 13 years of age. We do not knowingly collect personal information from children.</p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>We may update this Privacy Policy periodically. We will notify you of significant changes by posting the updated policy on this page with a revised date.</p>
        </Section>

        <Section title="11. Contact">
          <p>For privacy-related questions, contact us at <a href="mailto:contact@duckbookwriters.com" className="text-amber-600 hover:underline">contact@duckbookwriters.com</a> or call <a href="tel:+13464637721" className="text-amber-600 hover:underline">+1 (346) 463-7721</a>.</p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
