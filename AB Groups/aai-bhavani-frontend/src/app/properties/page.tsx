"use client";

import React, { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Input, Select, Badge } from "@/components/ui";
import { MapPin, BedDouble, Bath, Maximize, Search, SlidersHorizontal, Heart, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const allProperties = [
  { id: 1, title: "3 BHK Luxury Apartment", location: "Baner, Pune", price: 8500000, type: "sell", category: "residential", bedrooms: 3, bathrooms: 2, area: 1450, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", featured: true },
  { id: 2, title: "2 BHK Ready Possession", location: "Wakad, Pune", price: 5800000, type: "sell", category: "residential", bedrooms: 2, bathrooms: 2, area: 1100, image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80", featured: false },
  { id: 3, title: "Commercial Office Space", location: "Hinjewadi, Pune", price: 12000000, type: "sell", category: "commercial", bedrooms: 0, bathrooms: 2, area: 2200, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", featured: true },
  { id: 4, title: "4 BHK Villa", location: "Kothrud, Pune", price: 22000000, type: "sell", category: "residential", bedrooms: 4, bathrooms: 3, area: 2800, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", featured: false },
  { id: 5, title: "1 BHK Starter Home", location: "Pimple Saudagar, Pune", price: 3200000, type: "sell", category: "residential", bedrooms: 1, bathrooms: 1, area: 650, image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80", featured: false },
  { id: 6, title: "Shop / Retail Space", location: "Camp, Pune", price: 7500000, type: "sell", category: "commercial", bedrooms: 0, bathrooms: 1, area: 800, image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80", featured: false },
];

const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
];

const typeOptions = [
  { value: "", label: "Buy & Rent" },
  { value: "sell", label: "For Sale" },
  { value: "rent", label: "For Rent" },
];

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "area", label: "Area" },
];

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filtered = allProperties
    .filter(p =>
      (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())) &&
      (!category || p.category === category) &&
      (!type || p.type === type)
    )
    .sort((a, b) => {
      if (sortBy === "price_low") return a.price - b.price;
      if (sortBy === "price_high") return b.price - a.price;
      if (sortBy === "area") return b.area - a.area;
      return 0;
    });

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-hero pt-32 pb-16">
        <div className="container-custom text-center text-white">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Find Your <span className="text-gold-400">Perfect Property</span>
          </h1>
          <p className="text-white/60 text-lg mb-8">
            All listings are verified with complete legal documentation.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location, property type..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-gold-400 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Select
              options={categoryOptions}
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="sm:w-48"
              placeholder=""
            />
            <Select
              options={typeOptions}
              value={type}
              onChange={e => setType(e.target.value)}
              className="sm:w-40"
              placeholder=""
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="sm:w-48"
              placeholder=""
            />
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
              <SlidersHorizontal size={16} />
              {filtered.length} properties found
            </div>
          </div>

          {/* Properties Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="font-heading text-xl font-bold text-navy-900 mb-2">No properties found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(property => (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {property.featured && (
                        <span className="px-2.5 py-1 bg-gold-400 text-navy-900 text-xs font-bold rounded-lg">Featured</span>
                      )}
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-navy-900 text-xs font-semibold rounded-lg capitalize">{property.category}</span>
                    </div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                      <Heart size={15} />
                    </button>
                    <div className="absolute bottom-3 left-3">
                      <div className="px-3 py-1.5 bg-navy-900/90 backdrop-blur-sm rounded-xl">
                        <span className="text-white font-bold text-base">{formatCurrency(property.price)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-navy-900 text-base mb-1.5 group-hover:text-gold-500 transition-colors">{property.title}</h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                      <MapPin size={13} className="text-gold-500 flex-shrink-0" /> {property.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center gap-1.5"><BedDouble size={14} className="text-gray-400" />{property.bedrooms} Bed</div>
                      )}
                      <div className="flex items-center gap-1.5"><Bath size={14} className="text-gray-400" />{property.bathrooms} Bath</div>
                      <div className="flex items-center gap-1.5"><Maximize size={14} className="text-gray-400" />{property.area.toLocaleString()} sq.ft</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
