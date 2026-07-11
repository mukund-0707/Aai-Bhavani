import React from "react";
import { Users, CheckCircle, Palette, TrendingUp } from "lucide-react";

const stats = [
  {
    value: "1500+",
    label: "Happy Clients",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    value: "500+",
    label: "Loan Approvals",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    value: "300+",
    label: "Interior Projects",
    icon: Palette,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    value: "₹250Cr+",
    label: "Property Value",
    icon: TrendingUp,
    color: "text-gold-600",
    bg: "bg-gold-400/10",
  },
];

export default function StatsSection() {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-gray-100">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 px-6 text-center group hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={22} className={stat.color} />
              </div>
              <div className="text-3xl md:text-4xl font-bold font-heading text-navy-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
