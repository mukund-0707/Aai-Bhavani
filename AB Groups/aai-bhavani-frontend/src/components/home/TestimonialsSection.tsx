import React from "react";
import { Star, Quote } from "lucide-react";
import { SectionTitle } from "@/components/ui";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Home Buyer",
    location: "Baner, Pune",
    rating: 5,
    review:
      "AAI BHAVANI GROUP made our dream home purchase so smooth! They were completely transparent about every cost and helped us get a home loan at the best rate. Highly recommended!",
    emoji: "👩",
  },
  {
    id: 2,
    name: "Rajesh Kulkarni",
    role: "Business Owner",
    location: "Hinjewadi, Pune",
    rating: 5,
    review:
      "Got my business loan approved in just 6 days! Their documentation team is excellent and the relationship manager was available 24/7. Zero hidden charges as promised.",
    emoji: "👨‍💼",
  },
  {
    id: 3,
    name: "Meera Desai",
    role: "Interior Design Client",
    location: "Wakad, Pune",
    rating: 5,
    review:
      "Our 2BHK interior was transformed beautifully within budget. The 3D visualization helped us visualize everything before execution. Absolutely love the result!",
    emoji: "👩",
  },
  {
    id: 4,
    name: "Amit Patil",
    role: "Property Investor",
    location: "Kothrud, Pune",
    rating: 5,
    review:
      "Sold my property 3 weeks faster than expected and at a better price than I anticipated. Their market knowledge and negotiation skills are top-notch.",
    emoji: "👨",
  },
  {
    id: 5,
    name: "Sunita Joshi",
    role: "First-time Buyer",
    location: "Pimple Saudagar, Pune",
    rating: 5,
    review:
      "Being a first-time buyer, I was nervous. But the team explained everything step by step. Property verification, legal check — all handled professionally.",
    emoji: "👩‍💼",
  },
  {
    id: 6,
    name: "Deepak Nair",
    role: "Construction Client",
    location: "Aundh, Pune",
    rating: 5,
    review:
      "Their project management team delivered our commercial renovation on time and 10% under budget. Detailed daily progress reports kept us informed throughout.",
    emoji: "👷",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section bg-navy-900">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 rounded-full text-sm font-semibold mb-4 border border-white/20">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full inline-block" />
            Client Reviews
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Real stories from real clients who trusted us with their most important decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
            >
              <Quote size={28} className="text-gold-400 mb-4 opacity-70" />

              <p className="text-white/80 text-sm leading-relaxed mb-5">{t.review}</p>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="fill-gold-400 text-gold-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  {t.emoji}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/50 text-xs">
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 py-8 border-t border-white/10">
          <div className="text-center">
            <div className="text-5xl font-bold font-heading text-white">4.9</div>
            <div className="flex items-center justify-center gap-0.5 mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} className="fill-gold-400 text-gold-400" />
              ))}
            </div>
            <div className="text-white/50 text-sm mt-1">Overall Rating</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-white/20" />
          <div className="text-center">
            <div className="text-5xl font-bold font-heading text-white">200+</div>
            <div className="text-white/50 text-sm mt-2">Verified Reviews</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-white/20" />
          <div className="text-center">
            <div className="text-5xl font-bold font-heading text-white">99%</div>
            <div className="text-white/50 text-sm mt-2">Recommend Us</div>
          </div>
        </div>
      </div>
    </section>
  );
}
