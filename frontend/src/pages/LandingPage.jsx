import { useEffect } from 'react';
import Background from '../components/Background';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import BentoSection from '../components/BentoSection';
import PricingSection from '../components/PricingSection';
import HorizontalScrollSection from '../components/HorizontalScrollSection';
import MarqueeSection from '../components/MarqueeSection';
import OrbitalSection from '../components/OrbitalSection';
import ExpansionSection from '../components/ExpansionSection';
import Footer from '../components/Footer';

export default function LandingPage({ onGoToApp, onContactSales }) {
  // Global intersection observer for .fade-up and .scale-in elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up, .scale-in').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="text-neutral-200 antialiased selection:bg-white/20 selection:text-white">
      <Background />
      <Navbar onGoToApp={onGoToApp} />
      <HeroSection onGoToApp={onGoToApp} />
      <CapabilitiesSection />
      <BentoSection />
      <PricingSection onContactSales={onContactSales} />
      <HorizontalScrollSection />
      <MarqueeSection />
      <OrbitalSection />
      <ExpansionSection />
      <Footer />
    </div>
  );
}

