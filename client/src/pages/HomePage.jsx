import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import CategorySection from '../components/home/CategorySection';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';

export default function HomePage() {
  useEffect(() => {
    document.title = 'SmartParts - AI-Driven Spare Parts Finder';
  }, []);

  return (
    <div>
      <Hero />
      <CategorySection />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
