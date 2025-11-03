import { Hero } from '@/components/marketing/Hero';
import { Features } from '@/components/marketing/Features';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { Pricing } from '@/components/marketing/Pricing';
import { Footer } from '@/components/marketing/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Landing;
