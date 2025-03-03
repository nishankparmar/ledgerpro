
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PdfUploadFeature from '@/components/PdfUploadFeature';
import DoubleEntryShowcase from '@/components/DoubleEntryShowcase';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <DoubleEntryShowcase />
      <PdfUploadFeature />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
