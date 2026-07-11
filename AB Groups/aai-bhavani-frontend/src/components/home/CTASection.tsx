import React from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

export default function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="relative bg-hero rounded-3xl overflow-hidden px-8 py-16 md:px-16 text-center">
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

          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gold-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 rounded-full text-sm font-medium border border-white/20 mb-6">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
              Free Consultation — No Commitment Required
            </span>

            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Ready to Make Your{" "}
              <span className="text-gold-400">Best Move?</span>
            </h2>

            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Whether you want to buy a property, get a loan approved, or redesign your
              home — our experts are just one call away.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact#consultation"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold-400 text-navy-900 font-bold rounded-2xl hover:bg-gold-500 transition-all shadow-gold text-base active:scale-95"
              >
                Book Free Consultation
                <ArrowRight size={18} />
              </Link>
              <a
                href={getWhatsAppLink("Hello! I'd like to book a free consultation.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all text-base"
              >
                <Phone size={18} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-white/40 text-xs font-medium">
              <span>✓ No spam calls</span>
              <span>✓ Confidential consultation</span>
              <span>✓ Expert advice in 24 hours</span>
              <span>✓ Zero obligation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
