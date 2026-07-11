import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import CTASection from "@/components/home/CTASection";
import ConsultationForm from "@/components/shared/ConsultationForm";

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <FeaturedProperties />
      <TestimonialsSection />
      <section id="consultation" className="section bg-gray-50">
        <div className="container-custom">
          <ConsultationForm />
        </div>
      </section>
      <CTASection />
    </PublicLayout>
  );
}
