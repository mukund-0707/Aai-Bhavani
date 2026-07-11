import React from "react";
import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import ConsultationForm from "@/components/shared/ConsultationForm";
import { getWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with AAI BHAVANI GROUP. Book a free consultation or reach us by phone, email, or WhatsApp.",
};

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+91 98765 43210",
    sub: "Mon–Sat, 9AM–7PM",
    href: "tel:+919876543210",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    detail: "+91 98765 43210",
    sub: "Available 24/7",
    href: getWhatsAppLink("Hello! I'd like to get in touch."),
    color: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "info@aaibhavani.com",
    sub: "Reply within 24 hours",
    href: "mailto:info@aaibhavani.com",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "Pune, Maharashtra",
    sub: "Get directions on Google Maps",
    href: "https://maps.google.com",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

export default function ContactPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-hero pt-32 pb-20">
        <div className="container-custom text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 rounded-full text-sm font-medium border border-white/20 mb-6">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
            We're Here to Help
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
            Get in <span className="text-gold-400">Touch</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Have questions? Want to book a consultation? Our team is ready to help
            you make the best decision.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-sm bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all p-5 text-center"
              >
                <div
                  className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                >
                  <method.icon size={22} className={method.iconColor} />
                </div>
                <div className="font-heading font-bold text-navy-900 text-sm mb-1">
                  {method.title}
                </div>
                <div className="text-navy-900 text-sm font-medium mb-0.5">{method.detail}</div>
                <div className="text-gray-400 text-xs">{method.sub}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section id="consultation" className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — Info */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy-900 mb-4">
                Book Your Free Consultation
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Fill out the form and our expert consultants will contact you within 24 hours
                to understand your requirements and guide you through the best options.
              </p>

              {/* Office hours */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold-400/10 rounded-xl flex items-center justify-center">
                    <Clock size={20} className="text-gold-500" />
                  </div>
                  <h3 className="font-heading font-bold text-navy-900">Office Hours</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
                    { day: "Saturday", time: "9:00 AM – 5:00 PM" },
                    { day: "Sunday", time: "10:00 AM – 2:00 PM" },
                  ].map(({ day, time }) => (
                    <div key={day} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{day}</span>
                      <span className="font-semibold text-navy-900">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-card h-52 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Pune, Maharashtra, India</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-navy-900 font-semibold hover:text-gold-500 transition-colors mt-1 block"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-8">
              <ConsultationForm compact />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
