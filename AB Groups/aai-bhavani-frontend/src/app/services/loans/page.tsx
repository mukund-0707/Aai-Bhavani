import React from "react";
import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { SectionTitle, Card } from "@/components/ui";
import { Landmark, CreditCard, Building2, RefreshCcw, CheckCircle2, Zap } from "lucide-react";
import ConsultationForm from "@/components/shared/ConsultationForm";

export const metadata: Metadata = {
  title: "Loan Consultancy",
  description: "Get the best home loan, business loan, and personal loan rates with fast approvals through AAI BHAVANI GROUP.",
};

const loanTypes = [
  {
    icon: Landmark,
    title: "Home Loan",
    rate: "Starting at 8.5% p.a.",
    desc: "Get the best home loan rates from 25+ banks and NBFCs. We handle all documentation and follow-up.",
    features: ["Up to 90% financing", "25-year tenure", "Balance transfer available", "Doorstep service"],
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Building2,
    title: "Business Loan",
    rate: "Starting at 11% p.a.",
    desc: "Fuel your business growth with the right loan at the best rate, tailored to your business plan.",
    features: ["Up to ₹5Cr funding", "Unsecured options", "Working capital loans", "Equipment financing"],
    color: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: CreditCard,
    title: "Personal Loan",
    rate: "Starting at 10.5% p.a.",
    desc: "Quick personal loans with minimal documentation. Approved in 24-48 hours.",
    features: ["Up to ₹50L", "No collateral needed", "Quick disbursal", "Flexible tenure"],
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: RefreshCcw,
    title: "Balance Transfer",
    rate: "Save up to 3% interest",
    desc: "Transfer your existing high-interest loan to a lower rate and save lakhs over the loan tenure.",
    features: ["Lower EMI instantly", "Top-up loan option", "Minimal processing fee", "Quick processing"],
    color: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

const stats = [
  { value: "500+", label: "Loans Approved" },
  { value: "25+", label: "Partner Banks" },
  { value: "7 Days", label: "Avg. Approval Time" },
  { value: "₹200Cr+", label: "Loan Volume Processed" },
];

const process = [
  { step: "01", title: "Eligibility Check", desc: "Quick 5-minute eligibility check using your income and credit profile." },
  { step: "02", title: "Document Preparation", desc: "We guide you on exactly what documents are needed — no guesswork." },
  { step: "03", title: "Bank Shortlisting", desc: "We approach the top 3-5 banks offering best rates for your profile." },
  { step: "04", title: "Application Filing", desc: "We file all applications simultaneously to save time." },
  { step: "05", title: "Negotiation", desc: "We negotiate on your behalf to get the lowest rate and best terms." },
  { step: "06", title: "Disbursal", desc: "Loan disbursal to your account with complete documentation." },
];

export default function LoansServicePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-hero pt-32 pb-20">
        <div className="container-custom text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20 mb-6">
            <Zap size={14} className="text-gold-400" />
            Fast Loan Approvals
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
            Best Loan Rates. <span className="text-gold-400">Faster Approvals.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We compare 25+ banks and NBFCs to get you the best interest rate.
            Loans approved in as little as 7 days.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-gray-100">
            {stats.map(s => (
              <div key={s.label} className="text-center py-6 px-4">
                <div className="text-3xl font-bold font-heading text-navy-900 mb-1">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle badge="Loan Services" title="Every Type of Loan," highlight="Best Rate" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loanTypes.map(loan => (
              <Card key={loan.title} hover className="p-7">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 ${loan.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <loan.icon size={24} className={loan.iconColor} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-navy-900">{loan.title}</h3>
                    <span className="text-sm font-semibold text-gold-500">{loan.rate}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{loan.desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  {loan.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 size={12} className="text-green-500 flex-shrink-0" />
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
          <SectionTitle badge="Loan Process" title="Get Your Loan in" highlight="6 Simple Steps" />
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

      {/* EMI Calculator prompt */}
      <section className="py-12 bg-navy-900 text-white text-center">
        <div className="container-custom">
          <h3 className="font-heading text-2xl font-bold mb-3">Check Your Loan Eligibility Now</h3>
          <p className="text-white/60 mb-6">Get an instant estimate of your loan eligibility and EMI for free.</p>
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-400 text-navy-900 font-bold rounded-2xl hover:bg-gold-500 transition-all shadow-gold"
          >
            Check Eligibility — Free
          </a>
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
