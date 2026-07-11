import React from "react";
import { Shield, Eye, Scale, Users, Zap, UserCheck } from "lucide-react";
import { SectionTitle } from "@/components/ui";

const features = [
  {
    icon: Eye,
    title: "100% Transparent Process",
    description:
      "No surprises. Every step — from property search to deal closure — is clearly communicated to you in writing.",
  },
  {
    icon: Scale,
    title: "No Hidden Charges",
    description:
      "What we quote is what you pay. Our pricing is upfront and competitive with zero additional costs.",
  },
  {
    icon: Shield,
    title: "Legal Support Included",
    description:
      "Complete property verification, documentation, and legal review are included in our service at no extra cost.",
  },
  {
    icon: Users,
    title: "Expert Consultants",
    description:
      "Our team has 10+ years of experience in real estate, banking, and interior design across Pune.",
  },
  {
    icon: Zap,
    title: "Fast, Efficient Service",
    description:
      "We value your time. Loan approvals in 7 days, property deals closed faster with our expert network.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Relationship Manager",
    description:
      "Every client gets a dedicated manager who is your single point of contact from start to finish.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/15 text-gold-600 rounded-full text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 leading-tight mb-5">
              We Make Every Transaction{" "}
              <span className="text-gradient-gold">Simple & Trustworthy</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              We built AAI BHAVANI GROUP on one principle: treat every client like
              family. That means honesty, transparency, and going the extra mile — always.
            </p>

            {/* Key numbers */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "10+", label: "Years Experience" },
                { value: "99%", label: "Client Satisfaction" },
                { value: "24/7", label: "Support Available" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl p-4 text-center shadow-card border border-gray-100"
                >
                  <div className="text-2xl font-bold font-heading text-navy-900 mb-1">
                    {value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium leading-tight">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 hover:shadow-card-hover transition-shadow group"
              >
                <div className="w-11 h-11 bg-navy-900/5 rounded-xl flex items-center justify-center mb-3 group-hover:bg-gold-400/10 transition-colors">
                  <feature.icon size={20} className="text-navy-900 group-hover:text-gold-500 transition-colors" />
                </div>
                <h4 className="font-heading font-semibold text-navy-900 text-sm mb-2 leading-snug">
                  {feature.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
