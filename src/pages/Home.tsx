import React from 'react';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import CTASection from '@/components/CTASection';
import CategoryTiles from '@/components/CategoryTiles';
import IndustriesAccordion from '@/components/IndustriesAccordion';
import SupplierBand from '@/components/SupplierBand';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryTiles />
      <IndustriesAccordion />
      <ServicesSection />
      <SupplierBand />
      <StatsSection />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
};

export default Home;