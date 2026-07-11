import React from "react";
import Link from "next/link";
import {
  Building2, Banknote, Palette, FolderKanban,
  ArrowRight, Home, TrendingUp, Shield, LayoutDashboard,
  Landmark, CreditCard, RefreshCcw, Ruler, Wrench,
} from "lucide-react";
import { SectionTitle } from "@/components/ui";

const serviceGroups = [
  {
    id: "property",
    title: "Property Consultancy",
    icon: Building2,
    href: "/services/property",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "hover:border-blue-200",
    description: "Expert guidance to buy, sell, or invest in properties with complete legal support.",
    services: [
      { icon: Home, label: "Buy Property" },
      { icon: TrendingUp, label: "Sell Property" },
      { icon: TrendingUp, label: "Investment" },
      { icon: Shield, label: "Property Verification" },
    ],
  },
  {
    id: "loans",
    title: "Loan Consultancy",
    icon: Banknote,
    href: "/services/loans",
    color: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "hover:border-green-200",
    description: "Get the best loan rates with quick approvals for home, business, and personal loans.",
    services: [
      { icon: Landmark, label: "Home Loan" },
      { icon: Building2, label: "Business Loan" },
      { icon: CreditCard, label: "Personal Loan" },
      { icon: RefreshCcw, label: "Balance Transfer" },
    ],
  },
  {
    id: "interior",
    title: "Interior Design",
    icon: Palette,
    href: "/services/interior",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "hover:border-purple-200",
    description: "Transform your space with our award-winning interior design and execution services.",
    services: [
      { icon: Palette, label: "Interior Design" },
      { icon: Ruler, label: "Structure Design" },
      { icon: Wrench, label: "Execution" },
      { icon: LayoutDashboard, label: "3D Visualization" },
    ],
  },
  {
    id: "projects",
    title: "Project Management",
    icon: FolderKanban,
    href: "/services/projects",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    borderColor: "hover:border-orange-200",
    description: "Complete end-to-end project management from planning to delivery on time and budget.",
    services: [
      { icon: FolderKanban, label: "Planning" },
      { icon: Shield, label: "Quality Control" },
      { icon: TrendingUp, label: "Cost Management" },
      { icon: Wrench, label: "Site Supervision" },
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <SectionTitle
          badge="What We Offer"
          title="Complete Solutions Under"
          highlight="One Roof"
          subtitle="From property search to loan approval to interior design — we handle every step of your journey."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceGroups.map((group) => (
            <Link
              key={group.id}
              href={group.href}
              className={`group bg-white rounded-2xl border-2 border-gray-100 ${group.borderColor} p-6 shadow-card hover:shadow-card-hover transition-all duration-300`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 ${group.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <group.icon size={28} className={group.iconColor} />
              </div>

              {/* Title & Description */}
              <h3 className="font-heading text-lg font-bold text-navy-900 mb-2">
                {group.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {group.description}
              </p>

              {/* Sub-services */}
              <div className="space-y-2 mb-6">
                {group.services.map((s) => (
                  <div key={s.label} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-gold-400 rounded-full flex-shrink-0" />
                    <span className="text-sm">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1.5 text-navy-900 text-sm font-semibold group-hover:gap-2.5 transition-all">
                Explore Services
                <ArrowRight size={15} className="text-gold-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-navy-900 text-white font-semibold rounded-2xl hover:bg-navy-800 transition-all"
          >
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
