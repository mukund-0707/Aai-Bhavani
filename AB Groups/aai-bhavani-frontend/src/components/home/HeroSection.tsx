"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, Star, ChevronDown } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

const trustBadges = [
  "100% Transparent Process",
  "No Hidden Charges",
  "Trusted Experts",
];

const heroImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
];

export default function HeroSection() {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <section className="relative min-h-screen bg-hero flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-36 lg:pt-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Top badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-white/90">
                Pune&apos;s Most Trusted Property Partner
              </span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={10} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-heading font-bold leading-[1.1] text-[clamp(2.2rem,4.5vw,3.75rem)]">
                Your Trusted Partner
                <br />
                for{" "}
                <span className="text-gradient-gold">Property, Loans</span>
                <br />
                &amp; Interior Solutions
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              From finding your dream property to securing the best loan rates and
              designing your perfect interior — we handle everything with complete
              transparency and zero hidden charges.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15"
                >
                  <CheckCircle2 size={15} className="text-gold-400 flex-shrink-0" />
                  <span className="text-sm text-white/90 font-medium">{badge}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact#consultation"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gold-400 text-navy-900 font-bold rounded-2xl hover:bg-gold-500 transition-all shadow-gold text-base active:scale-95"
              >
                Book Free Consultation
                <ArrowRight size={18} />
              </Link>
              <a
                href={getWhatsAppLink("Hello! I'm interested in your services.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all text-base"
              >
                <Phone size={18} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-3">
                {["👩", "👨", "👩‍💼", "👨‍💼"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 bg-navy-700 rounded-full border-2 border-navy-900 flex items-center justify-center text-base"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="text-white/70 text-sm">
                <span className="text-white font-semibold">1,500+</span> happy clients trust us
              </div>
            </div>
          </div>

          {/* Right — Image Gallery */}
          <div className="relative hidden lg:block">
            {/* Main large image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImages[activeImg]}
                alt="Premium property"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />

              {/* Floating card — bottom left */}
              <div className="absolute bottom-5 left-5 glass rounded-2xl p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white text-lg">
                    ✓
                  </div>
                  <div>
                    <div className="text-navy-900 text-sm font-semibold">Deal Closed!</div>
                    <div className="text-gray-500 text-xs">₹85L Property in Pune</div>
                  </div>
                </div>
              </div>

              {/* Image thumbnails */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {heroImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === i ? "border-gold-400 scale-110" : "border-white/50"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 shadow-card-hover">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading text-navy-900">₹250Cr+</div>
                  <div className="text-xs text-gray-500 font-medium">Property Value</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold font-heading text-navy-900">500+</div>
                  <div className="text-xs text-gray-500 font-medium">Loans Approved</div>
                </div>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute -top-4 -left-4 glass rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-navy-900">4.9</span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">200+ Reviews</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <span className="text-xs font-medium">Scroll Down</span>
          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
}
