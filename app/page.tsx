import Header from './components/Header';
import Hero from './components/Hero';
import HeroFormSection from './components/HeroFormSection';
import About from './components/About';
import Partners from './components/Partners';
import NewReleases from './components/NewReleases';
import Bestsellers from './components/Bestsellers';
import BookCategoriesHome from './components/BookCategoriesHome';
import ComingSoon from './components/ComingSoon';
import AwardWinners from './components/AwardWinners';
import PublishingProcess from './components/PublishingProcess';
import ReadyToPublish from './components/ReadyToPublish';
import Authors from './components/Authors';
import NewsEvents from './components/NewsEvents';
import CalendlySection from './components/CalendlySection';
import Footer from './components/Footer';
import AnimatedSection from './components/AnimatedSection';


export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      <Header />
      <Hero />
      <AnimatedSection delay={0.1}>
        <HeroFormSection />
      </AnimatedSection>
      <div className="py-8 sm:py-12 lg:py-16"></div>
      <AnimatedSection delay={0.2}>
        <About />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <Partners />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <NewReleases />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <Bestsellers />
      </AnimatedSection>
      <AnimatedSection delay={0.6}>
        <BookCategoriesHome />
      </AnimatedSection>
      <AnimatedSection delay={0.7}>
        <ComingSoon />
      </AnimatedSection>
      <AnimatedSection delay={0.8}>
        <AwardWinners />
      </AnimatedSection>
      <AnimatedSection delay={0.9}>
        <PublishingProcess />
      </AnimatedSection>
      <AnimatedSection delay={1.0}>
        <ReadyToPublish />
      </AnimatedSection>
      <AnimatedSection delay={1.1}>
        <Authors />
      </AnimatedSection>
      <AnimatedSection delay={1.2}>
        <NewsEvents />
      </AnimatedSection>
      <AnimatedSection delay={1.3}>
        <CalendlySection />
      </AnimatedSection>
      <Footer />
    </main>
  );
}
