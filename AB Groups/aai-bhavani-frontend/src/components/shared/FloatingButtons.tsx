"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, X, ArrowRight } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";
import Link from "next/link";

export default function FloatingButtons() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-fade-up">
          {/* Book Consultation */}
          <Link
            href="/contact#consultation"
            className="flex items-center gap-3 bg-white text-navy-900 px-4 py-3 rounded-2xl shadow-card-hover border border-gray-100 text-sm font-semibold hover:shadow-gold transition-all whitespace-nowrap"
            onClick={() => setIsExpanded(false)}
          >
            <ArrowRight size={16} className="text-gold-500" />
            Book Free Consultation
          </Link>

          {/* WhatsApp */}
          <a
            href={getWhatsAppLink("Hello! I'm interested in your services. Please get in touch.")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-2xl shadow-lg text-sm font-semibold hover:bg-green-600 transition-all whitespace-nowrap"
            onClick={() => setIsExpanded(false)}
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>

          {/* Call */}
          <a
            href="tel:+919876543210"
            className="flex items-center gap-3 bg-navy-900 text-white px-4 py-3 rounded-2xl shadow-lg text-sm font-semibold hover:bg-navy-800 transition-all whitespace-nowrap"
            onClick={() => setIsExpanded(false)}
          >
            <Phone size={16} />
            Call Now
          </a>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isExpanded
            ? "bg-gray-700 text-white rotate-45"
            : "bg-gold-400 text-navy-900 animate-pulse-gold"
        }`}
        aria-label="Contact options"
      >
        {isExpanded ? <X size={22} /> : <Phone size={22} />}
      </button>
    </div>
  );
}
