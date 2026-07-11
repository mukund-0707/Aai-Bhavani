import React from "react";
import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { SectionTitle, Card } from "@/components/ui";
import { Palette, Ruler, Wrench, LayoutDashboard, Star } from "lucide-react";
import ConsultationForm from "@/components/shared/ConsultationForm";

export const metadata: Metadata = {
  title: "Interior Design",
  description: "Transform your space with AAI BHAVANI GROUP's award-winning interior design services. 3D visualization, budget-friendly execution.",
};

const services = [
  {
    icon: Palette,
    title: "Interior Design",
    desc: "Complete interior design solutions for residential and commercial spaces, tailored to your taste and budget.",
    features: ["Space planning", "Color consultation", "Furniture selection", "Lighting design"],
  },
  {
    icon: Ruler,
    title: "Structure Design",
    desc: "Expert structural design for renovations, extensions, and new constructions with complete drawings.",
    features: ["Architectural drawings", "Structural plans", "3D modeling", "BOQ preparation"],
  },
  {
    icon: Wrench,
    title: "Execution & Renovation",
    desc: "On-time, on-budget execution of interior design projects with premium quality materials and workmanship.",
    features: ["Project supervision", "Quality materials", "Timely delivery", "Post-project support"],
  },
  {
    icon: LayoutDashboard,
    title: "3D Visualization",
    desc: "Photo-realistic 3D renders of your space before execution, so you can see the final result before work begins.",
    features: ["Photorealistic renders", "360° walkthrough", "Multiple design options", "Quick turnaround"],
  },
];

const portfolioImages = [
  { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80", label: "Modern Living Room" },
  { img: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=500&q=80", label: "Luxury Bedroom" },
  { img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&q=80", label: "Contemporary Kitchen" },
  { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80", label: "Office Design" },
  { img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80", label: "Modular Kitchen" },
  { img: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&q=80", label: "Modern Bathroom" },
];

export default function InteriorServicePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-hero pt-32 pb-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20 mb-6">
                <Palette size={14} className="text-gold-400" />
                Interior Design
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
                Transform Your Space Into a{" "}
                <span className="text-gold-400">Dream Home</span>
              </h1>
              <p className="text-white/60 text-lg mb-8">
                Award-winning interior design services that blend aesthetics with functionality.
                See your space in 3D before we touch a single wall.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#consultation" className="btn-primary">Book Interior Consultation</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 hidden lg:grid">
              {portfolioImages.slice(0, 4).map(p => (
                <div key={p.label} className="rounded-2xl overflow-hidden aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-gray-100 text-center">
            {[
              { value: "300+", label: "Projects Completed" },
              { value: "₹500+", label: "Avg. Per Sq.Ft Savings" },
              { value: "4.9★", label: "Client Rating" },
              { value: "100%", label: "On-Time Delivery" },
            ].map(s => (
              <div key={s.label} className="py-6 px-4">
                <div className="text-3xl font-bold font-heading text-navy-900 mb-1">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle badge="Interior Services" title="Everything Your Space" highlight="Deserves" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(s => (
              <Card key={s.title} hover className="p-7">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                  <s.icon size={24} className="text-purple-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
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

      {/* Portfolio Grid */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle badge="Our Work" title="Recent" highlight="Projects" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioImages.map(p => (
              <div key={p.label} className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-navy-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-semibold text-sm">{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-2xl text-center">
          <div className="flex justify-center gap-0.5 mb-4">
            {[1,2,3,4,5].map(s => <Star key={s} size={20} className="fill-gold-400 text-gold-400" />)}
          </div>
          <p className="text-xl text-gray-600 italic mb-4 leading-relaxed">
            &quot;Our 2BHK was transformed beyond what we imagined. The 3D visualization helped us see
            exactly what we were getting. Delivered on time and within budget!&quot;
          </p>
          <div className="font-semibold text-navy-900">— Meera Desai, Wakad, Pune</div>
        </div>
      </section>

      <section id="consultation" className="section bg-gray-50">
        <div className="container-custom max-w-2xl">
          <ConsultationForm />
        </div>
      </section>
    </PublicLayout>
  );
}
