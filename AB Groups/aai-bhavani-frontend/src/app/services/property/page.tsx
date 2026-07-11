import React from "react";
import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { SectionTitle, Card } from "@/components/ui";
import { Home, TrendingUp, Shield, CheckCircle2, Phone, ArrowRight } from "lucide-react";
import ConsultationForm from "@/components/shared/ConsultationForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Consultancy",
  description: "Buy, sell, or invest in properties with AAI BHAVANI GROUP. Expert consultants, legal verification, 100% transparent.",
};

const services = [
  {
    icon: Home,
    title: "Buy Property",
    desc: "We help you find the perfect property matching your budget, location, and lifestyle requirements with complete legal verification.",
    features: ["Free property search", "Site visits arranged", "Price negotiation", "Legal documentation"],
  },
  {
    icon: TrendingUp,
    title: "Sell Property",
    desc: "Get the best price for your property with our extensive buyer network and expert marketing strategies.",
    features: ["Free property valuation", "Premium listing", "Qualified buyer network", "Fast closure"],
  },
  {
    icon: TrendingUp,
    title: "Property Investment",
    desc: "Identify high-ROI investment opportunities in Pune's growing real estate market with data-driven insights.",
    features: ["Market analysis", "ROI projections", "Risk assessment", "Portfolio planning"],
  },
  {
    icon: Shield,
    title: "Property Verification",
    desc: "Complete legal due diligence to ensure your property is free from disputes, encumbrances, and legal issues.",
    features: ["Title verification", "Encumbrance check", "Document review", "Legal clearance"],
  },
];

const process = [
  { step: "01", title: "Initial Consultation", desc: "Free 30-minute discussion to understand your requirements." },
  { step: "02", title: "Property Search", desc: "We curate a shortlist of properties matching your criteria." },
  { step: "03", title: "Site Visits", desc: "Organized visits with our consultant at your convenience." },
  { step: "04", title: "Legal Verification", desc: "Complete due diligence and document verification." },
  { step: "05", title: "Negotiation", desc: "Expert price negotiation to get you the best deal." },
  { step: "06", title: "Deal Closure", desc: "Documentation, registration, and handover — all handled." },
];

export default function PropertyServicePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-hero pt-32 pb-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20 mb-6">
                <Home size={14} className="text-gold-400" />
                Property Consultancy
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
                Find Your <span className="text-gold-400">Perfect Property</span>
              </h1>
              <p className="text-white/60 text-lg mb-8">
                Expert guidance for buying, selling, or investing in properties across Pune.
                100% transparent process with zero hidden charges.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Free Consultation", "Legal Verification", "Best Price Guarantee", "Dedicated Manager"].map(t => (
                  <div key={t} className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/15">
                    <CheckCircle2 size={14} className="text-gold-400" />
                    <span className="text-sm text-white/90">{t}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Link href="#consultation" className="btn-primary">Book Free Consultation</Link>
                <a href="tel:+919876543210" className="btn-white">
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80"
                alt="Property"
                className="rounded-3xl shadow-2xl aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle badge="Property Services" title="Complete Property" highlight="Solutions" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(s => (
              <Card key={s.title} hover className="p-7">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <s.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-4 text-sm">{s.desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  {s.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                      {f}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle badge="How It Works" title="Our Simple" highlight="6-Step Process" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map(p => (
              <div key={p.step} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
                <div className="text-4xl font-bold font-heading text-gold-400/30 mb-3">{p.step}</div>
                <h4 className="font-heading font-bold text-navy-900 mb-2">{p.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Properties CTA */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container-custom text-center">
          <h3 className="font-heading text-2xl font-bold text-navy-900 mb-3">Ready to Browse Properties?</h3>
          <p className="text-gray-500 mb-6">View our curated list of verified properties in Pune.</p>
          <Link href="/properties" className="btn-navy inline-flex items-center gap-2">
            View All Properties <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Form */}
      <section id="consultation" className="section bg-gray-50">
        <div className="container-custom max-w-2xl">
          <ConsultationForm />
        </div>
      </section>
    </PublicLayout>
  );
}
