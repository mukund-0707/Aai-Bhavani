import React from "react";
import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { SectionTitle, Card } from "@/components/ui";
import { Shield, Eye, Users, Star, Award, TrendingUp, Heart } from "lucide-react";
import ConsultationForm from "@/components/shared/ConsultationForm";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AAI BHAVANI GROUP — our story, mission, values, and the expert team behind Pune's most trusted property and loan consultancy.",
};

const values = [
  { icon: Eye, title: "Transparency", desc: "Every process, every cost, clearly communicated — always." },
  { icon: Shield, title: "Trust", desc: "We earn your trust through consistent, honest service delivery." },
  { icon: Award, title: "Professionalism", desc: "Industry-certified experts with 10+ years of combined experience." },
  { icon: Heart, title: "Customer First", desc: "Your satisfaction is our only measure of success." },
  { icon: TrendingUp, title: "No Hidden Charges", desc: "What we quote is exactly what you pay. Period." },
  { icon: Users, title: "Dedicated Support", desc: "A personal relationship manager for every client." },
];

const milestones = [
  { year: "2014", event: "Founded AAI BHAVANI Consultancy in Pune" },
  { year: "2016", event: "Expanded to Loan Consultancy division" },
  { year: "2018", event: "Launched Interior Design services" },
  { year: "2020", event: "Crossed 500+ happy clients" },
  { year: "2022", event: "Launched Project Management division" },
  { year: "2024", event: "1500+ clients. ₹250Cr+ property transactions." },
];

const team = [
  { name: "Founder & CEO", dept: "Leadership", emoji: "👨‍💼" },
  { name: "Head of Property", dept: "Real Estate", emoji: "🏠" },
  { name: "Head of Loans", dept: "Finance", emoji: "💼" },
  { name: "Lead Interior Designer", dept: "Interior", emoji: "🎨" },
  { name: "Legal Advisor", dept: "Legal", emoji: "⚖️" },
  { name: "Customer Relations", dept: "Support", emoji: "🤝" },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-hero pt-32 pb-20">
        <div className="container-custom text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 rounded-full text-sm font-medium border border-white/20 mb-6">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
            Our Story
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
            Building Trust Since <span className="text-gold-400">2014</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            AAI BHAVANI GROUP started with a simple belief: every person deserves honest,
            expert guidance for the most important decisions of their life.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/15 text-gold-600 rounded-full text-sm font-semibold mb-4">
                Who We Are
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-5">
                Pune&apos;s Most Trusted{" "}
                <span className="text-gradient-gold">Multi-Service</span> Partner
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  AAI BHAVANI GROUP is a comprehensive business services company providing
                  expert consultancy across Property, Loans, Interior Design, and Project
                  Management.
                </p>
                <p>
                  We believe that buying a home or getting a loan should be a joyful
                  experience — not a stressful one. That&apos;s why we handle every step
                  transparently, with zero hidden charges and dedicated support throughout.
                </p>
                <p>
                  With 10+ years of experience and 1,500+ happy clients, we&apos;ve built a
                  reputation for integrity, speed, and exceptional results in Pune&apos;s real
                  estate and finance market.
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "1500+", label: "Happy Clients", icon: Users },
                { value: "10+", label: "Years Experience", icon: Award },
                { value: "₹250Cr+", label: "Property Value", icon: TrendingUp },
                { value: "99%", label: "Satisfaction Rate", icon: Star },
              ].map(({ value, label, icon: Icon }) => (
                <Card key={label} className="text-center p-6" hover>
                  <div className="w-12 h-12 bg-gold-400/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={22} className="text-gold-500" />
                  </div>
                  <div className="text-3xl font-bold font-heading text-navy-900 mb-1">{value}</div>
                  <div className="text-sm text-gray-500 font-medium">{label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            badge="Our Foundation"
            title="Core Values That"
            highlight="Drive Us"
            subtitle="Everything we do is guided by these principles — from the first call to project completion."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <Card key={v.title} hover className="p-6">
                <div className="w-12 h-12 bg-navy-900/5 rounded-xl flex items-center justify-center mb-4">
                  <v.icon size={22} className="text-navy-900" />
                </div>
                <h3 className="font-heading font-bold text-navy-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white">
        <div className="container-custom max-w-3xl">
          <SectionTitle
            badge="Our Journey"
            title="A Decade of"
            highlight="Growth & Trust"
          />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex items-start gap-6 pl-16 relative">
                  <div className="absolute left-5 top-3 w-6 h-6 bg-gold-400 rounded-full flex items-center justify-center -translate-x-1/2 shadow-gold">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-gold-500 uppercase tracking-wider">
                      {m.year}
                    </span>
                    <p className="text-navy-900 font-medium mt-0.5">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            badge="The Team"
            title="Meet the Experts"
            highlight="Behind Your Success"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {team.map((member) => (
              <Card key={member.name} hover className="p-5 text-center">
                <div className="w-14 h-14 bg-navy-900/5 rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl">
                  {member.emoji}
                </div>
                <div className="text-sm font-semibold text-navy-900 mb-1 leading-tight">
                  {member.name}
                </div>
                <div className="text-xs text-gray-400">{member.dept}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation */}
      <section className="section bg-white">
        <div className="container-custom max-w-2xl">
          <ConsultationForm />
        </div>
      </section>
    </PublicLayout>
  );
}
