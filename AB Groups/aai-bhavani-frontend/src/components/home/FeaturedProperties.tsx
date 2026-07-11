import React from "react";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Maximize, ArrowRight, Heart } from "lucide-react";
import { SectionTitle, Badge } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";

const featuredProperties = [
  {
    id: 1,
    title: "3 BHK Luxury Apartment",
    location: "Baner, Pune",
    price: 8500000,
    type: "sell",
    category: "residential",
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "2 BHK Ready Possession",
    location: "Wakad, Pune",
    price: 5800000,
    type: "sell",
    category: "residential",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80",
    featured: false,
  },
  {
    id: 3,
    title: "Commercial Office Space",
    location: "Hinjewadi, Pune",
    price: 12000000,
    type: "sell",
    category: "commercial",
    bedrooms: 0,
    bathrooms: 2,
    area: 2200,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    featured: true,
  },
];

export default function FeaturedProperties() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <SectionTitle
          badge="Featured Properties"
          title="Handpicked"
          highlight="Premium Properties"
          subtitle="Verified listings with complete documentation and legal clearance."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {property.featured && (
                    <span className="px-2.5 py-1 bg-gold-400 text-navy-900 text-xs font-bold rounded-lg">
                      Featured
                    </span>
                  )}
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-navy-900 text-xs font-semibold rounded-lg capitalize">
                    {property.category}
                  </span>
                </div>

                {/* Wishlist */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                  <Heart size={15} />
                </button>

                {/* Price tag */}
                <div className="absolute bottom-3 left-3">
                  <div className="px-3 py-1.5 bg-navy-900/90 backdrop-blur-sm rounded-xl">
                    <span className="text-white font-bold text-base">
                      {formatCurrency(property.price)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <h3 className="font-heading font-bold text-navy-900 text-base mb-1.5 group-hover:text-gold-500 transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                  <MapPin size={13} className="text-gold-500 flex-shrink-0" />
                  {property.location}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-1.5">
                      <BedDouble size={14} className="text-gray-400" />
                      <span>{property.bedrooms} Bed</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Bath size={14} className="text-gray-400" />
                    <span>{property.bathrooms} Bath</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize size={14} className="text-gray-400" />
                    <span>{property.area.toLocaleString()} sq.ft</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-navy-900 text-navy-900 font-semibold rounded-2xl hover:bg-navy-900 hover:text-white transition-all"
          >
            View All Properties
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
