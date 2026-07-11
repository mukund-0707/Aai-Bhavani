import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";
import { SectionTitle, Card } from "@/components/ui";
import {
  Building2, Banknote, Palette, FolderKanban, ArrowRight,
  Home, TrendingUp, Shield, CreditCard, Landmark, RefreshCcw,
  Ruler, Wrench, LayoutDashboard,
} from "lucide-react";
import ConsultationForm from "@/components/shared/ConsultationForm";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore all services by AAI BHAVANI GROUP — Property consultancy, loan services, interior design, and project management.",
};

const servicePages = [
  {
    id: "property",
    icon: Building2,
    title: "Property Consultancy",
    subtitle: "Buy, Sell & Invest Smart",
    href: "/services/property",
    description:
      "Expert guidance for buying, selling, or investing in residential and commercial properties with complete legal support and verification.",
    highlights: ["Free property search", "Legal verification", "Price negotiation", "Documentation support"],
    color: "bg-blue-600",
    lightColor: "bg-blue-50",
    iconColor: "text-blue-600",
    sub: [
      { icon: Home, label: "Buy Property" },
      { icon: TrendingUp, label: "Sell Property" },
      { icon: TrendingUp, label: "Investment Advisory" },
      { icon: Shield, label: "Property Verification" },
    ],
  },
  {
    id: "loans",
    icon: Banknote,
    title: "Loan Consultancy",
    subtitle: "Best Rates. Fast Approval.",
    href: "/services/loans",
    description:
      "Get the best loan rates with quick approvals for home, business, and personal loans. Balance transfers at minimal costs.",
    highlights: ["7-day approval", "Best rates", "All banks covered", "Zero processing stress"],
    color: "bg-green-600",
    lightColor: "bg-green-50",
    iconColor: "text-green-600",
    sub: [
      { icon: Landmark, label: "Home Loan" },
      { icon: Building2, label: "Business Loan" },
      { icon: CreditCard, label: "Personal Loan" },
      { icon: RefreshCcw, label: "Balance Transfer" },
    ],
  },
  {
    id: "interior",
    icon: Palette,
    title: "Interior Design",
    subtitle: "Transform Your Space",
    href: "/services/interior",
    description:
      "From concept to completion — award-winning interior design, structure design, and complete execution services.",
    highlights: ["3D visualization", "Budget-friendly", "On-time delivery", "Quality materials"],
    color: "bg-purple-600",
    lightColor: "bg-purple-50",
    iconColor: "text-purple-600",
    sub: [
      { icon: Palette, label: "Interior Design" },
      { icon: Ruler, label: "Structure Design" },
      { icon: Wrench, label: "Execution" },
      { icon: LayoutDashboard, label: "3D Visualization" },
    ],
  },
  {
    id: "projects",
    icon: FolderKanban,
    title: "Project Management",
    subtitle: "On Time. On Budget.",
    href: "/services/projects",
    description:
      "End-to-end project management for construction, renovation, and commercial projects with complete site supervision.",
    highlights: ["Daily progress reports", "Cost management", "Quality control", "Site supervision"],
    color: "bg-orange-600",
    lightColor: "bg-orange-50",
    iconColor: "text-orange-600",
    sub: [
      { icon: FolderKanban, label: "Planning & Design" },
      { icon: Shield, label: "Quality Control" },
      { icon: TrendingUp, label: "Cost Management" },
      { icon: Wrench, label: "Site Supervision" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-hero pt-32 pb-20">
        <div className="container-custom text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 rounded-full text-sm font-medium border border-white/20 mb-6">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
            Complete Solutions
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
            All Services Under <span className="text-gold-400">One Roof</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From finding your property to securing finance to designing your interior —
            we handle every step with expertise and integrity.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="space-y-8">
            {servicePages.map((service, i) => (
              <div
                key={service.id}
                className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 ${service.lightColor} rounded-xl mb-4`}
                  >
                    <service.icon size={16} className={service.iconColor} />
                    <span className={`text-sm font-semibold ${service.iconColor}`}>
                      {service.subtitle}
                    </span>
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-navy-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">{service.description}</p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-gold-400 rounded-full flex-shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-semibold rounded-xl hover:bg-navy-800 transition-all"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Sub-services cards */}
                <div className={`grid grid-cols-2 gap-4 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  {service.sub.map((s) => (
                    <Card key={s.label} hover className="p-5 text-center">
                      <div
                        className={`w-12 h-12 ${service.lightColor} rounded-xl flex items-center justify-center mx-auto mb-3`}
                      >
                        <s.icon size={22} className={service.iconColor} />
                      </div>
                      <div className="font-heading font-semibold text-navy-900 text-sm">
                        {s.label}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation */}
      <section className="section bg-gray-50" id="consultation">
        <div className="container-custom max-w-2xl">
          <ConsultationForm />
        </div>
      </section>
    </PublicLayout>
  );
}
