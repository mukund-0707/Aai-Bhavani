import React from "react";
import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { SectionTitle, Card } from "@/components/ui";
import { FolderKanban, Shield, TrendingUp, Wrench } from "lucide-react";
import ConsultationForm from "@/components/shared/ConsultationForm";

export const metadata: Metadata = {
  title: "Project Management",
  description: "End-to-end project management services by AAI BHAVANI GROUP. On time, on budget, every time.",
};

const services = [
  { icon: FolderKanban, title: "Project Planning", desc: "Comprehensive project planning including scope, timeline, resource allocation, and risk management.", features: ["Detailed scheduling", "Resource planning", "Risk assessment", "Milestone tracking"] },
  { icon: Shield, title: "Quality Control", desc: "Rigorous quality checks at every phase to ensure the highest standards of workmanship and materials.", features: ["Material inspection", "Work quality audits", "Compliance checks", "Final inspection"] },
  { icon: TrendingUp, title: "Cost Management", desc: "Tight budget control with detailed BOQs, vendor management, and real-time cost tracking.", features: ["Detailed BOQ", "Vendor negotiation", "Cost tracking", "Value engineering"] },
  { icon: Wrench, title: "Site Supervision", desc: "Dedicated site supervisors ensuring work progresses as planned with daily progress reports.", features: ["Daily reports", "Photo updates", "Issue resolution", "Labour management"] },
];

export default function ProjectsServicePage() {
  return (
    <PublicLayout>
      <section className="bg-hero pt-32 pb-20">
        <div className="container-custom text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20 mb-6">
            <FolderKanban size={14} className="text-gold-400" /> Project Management
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
            On Time. On Budget. <span className="text-gold-400">Every Time.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Complete project management for construction, renovation, and commercial
            projects with full transparency and dedicated supervision.
          </p>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-gray-100 text-center">
          {[{ v: "150+", l: "Projects Delivered" }, { v: "100%", l: "On-Time Rate" }, { v: "₹0", l: "Cost Overruns*" }, { v: "4.9★", l: "Client Rating" }].map(s => (
            <div key={s.l} className="py-6 px-4">
              <div className="text-3xl font-bold font-heading text-navy-900 mb-1">{s.v}</div>
              <div className="text-sm text-gray-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <SectionTitle badge="Our Services" title="Complete Project" highlight="Management" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(s => (
              <Card key={s.title} hover className="p-7">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                  <s.icon size={24} className="text-orange-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  {s.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />{f}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="section bg-gray-50">
        <div className="container-custom max-w-2xl"><ConsultationForm /></div>
      </section>
    </PublicLayout>
  );
}
