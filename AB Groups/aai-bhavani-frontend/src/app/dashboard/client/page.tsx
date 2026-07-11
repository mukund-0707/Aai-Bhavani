"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, Badge, Avatar } from "@/components/ui";
import {
  Home, Banknote, Palette, FolderKanban, FileText,
  CreditCard, Calendar, Headphones, User, ArrowRight,
  CheckCircle, Clock, AlertCircle, Phone,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { icon: Home, label: "Overview", href: "/dashboard/client" },
  { icon: Home, label: "My Properties", href: "/dashboard/client/properties" },
  { icon: Banknote, label: "My Loans", href: "/dashboard/client/loans" },
  { icon: Palette, label: "Interior Projects", href: "/dashboard/client/interior" },
  { icon: FileText, label: "Documents", href: "/dashboard/client/documents" },
  { icon: CreditCard, label: "Payments", href: "/dashboard/client/payments" },
  { icon: Calendar, label: "Appointments", href: "/dashboard/client/appointments", badge: 1 },
  { icon: Headphones, label: "Support", href: "/dashboard/client/support" },
  { icon: User, label: "My Profile", href: "/dashboard/client/profile" },
];

const myServices = [
  {
    icon: Home,
    title: "Property Search",
    status: "in_progress",
    detail: "3 BHK in Baner — Site visit scheduled",
    date: "Site Visit: 15 Jul 2026",
    color: "blue",
  },
  {
    icon: Banknote,
    title: "Home Loan Application",
    status: "approved",
    detail: "₹75L Home Loan — HDFC Bank",
    date: "Approved: 08 Jul 2026",
    color: "green",
  },
  {
    icon: Palette,
    title: "Interior Design",
    status: "pending",
    detail: "2 BHK Interior — Design phase",
    date: "Starting: 20 Jul 2026",
    color: "purple",
  },
];

const upcomingAppointments = [
  {
    title: "Property Site Visit — Baner",
    date: "15 Jul 2026",
    time: "10:00 AM",
    with: "Rahul Sharma (Property Advisor)",
  },
  {
    title: "Loan Document Submission",
    date: "17 Jul 2026",
    time: "3:00 PM",
    with: "Priya Desai (Loan Advisor)",
  },
];

const statusIcon = (status: string) => {
  if (status === "approved") return <CheckCircle size={15} className="text-green-500" />;
  if (status === "in_progress") return <Clock size={15} className="text-blue-500" />;
  return <AlertCircle size={15} className="text-orange-500" />;
};

const statusBadge = (status: string) => {
  const map: Record<string, "green" | "navy" | "gold" | "gray"> = {
    approved: "green",
    in_progress: "navy",
    pending: "gray",
  };
  const labels: Record<string, string> = {
    approved: "Approved",
    in_progress: "In Progress",
    pending: "Pending",
  };
  return <Badge variant={map[status] || "gray"}>{labels[status] || status}</Badge>;
};

export default function ClientDashboard() {
  return (
    <DashboardLayout navItems={navItems} title="My Dashboard" role="Client Portal">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Welcome Banner */}
        <div className="bg-hero rounded-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-1">Good Evening! 👋</h2>
              <p className="text-white/60 text-sm">
                You have 1 upcoming appointment and 2 active service requests.
              </p>
            </div>
            <Link
              href="/contact#consultation"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-400 text-navy-900 font-bold rounded-xl text-sm hover:bg-gold-500 transition-all flex-shrink-0"
            >
              Book New Service
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "1", label: "Active Property Search", icon: Home, color: "text-blue-600", bg: "bg-blue-50" },
            { value: "1", label: "Loan Application", icon: Banknote, color: "text-green-600", bg: "bg-green-50" },
            { value: "1", label: "Interior Project", icon: Palette, color: "text-purple-600", bg: "bg-purple-50" },
            { value: "2", label: "Appointments", icon: Calendar, color: "text-gold-600", bg: "bg-gold-400/10" },
          ].map(s => (
            <Card key={s.label} className="p-5 text-center">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <s.icon size={20} className={s.color} />
              </div>
              <div className="text-2xl font-bold font-heading text-navy-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
            </Card>
          ))}
        </div>

        {/* My Active Services */}
        <Card padding="none">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-heading font-bold text-navy-900">My Active Services</h3>
            <Link href="/dashboard/client/properties" className="text-sm text-navy-900 font-medium hover:text-gold-500 flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {myServices.map(s => (
              <div key={s.title} className="p-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 bg-${s.color}-50 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <s.icon size={18} className={`text-${s.color}-600`} />
                  </div>
                  <div>
                    <div className="font-semibold text-navy-900 text-sm">{s.title}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{s.detail}</div>
                    <div className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                      {statusIcon(s.status)} {s.date}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">{statusBadge(s.status)}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Appointments */}
        <Card padding="none">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-heading font-bold text-navy-900">Upcoming Appointments</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingAppointments.map(apt => (
              <div key={apt.title} className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-gold-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-gold-500" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-navy-900 text-sm">{apt.title}</div>
                  <div className="text-gray-500 text-xs mt-1">
                    {apt.date} at {apt.time}
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5">With: {apt.with}</div>
                </div>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:border-navy-900 hover:text-navy-900 transition-all"
                >
                  <Phone size={12} /> Call
                </a>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Support */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-navy-900 rounded-2xl p-5 text-white">
            <Headphones size={28} className="text-gold-400 mb-3" />
            <h4 className="font-heading font-bold mb-1">Need Help?</h4>
            <p className="text-white/60 text-sm mb-4">Our support team is available Mon–Sat 9AM–7PM.</p>
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 font-semibold rounded-xl text-sm">
              <Phone size={14} /> Call Support
            </a>
          </div>
          <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
            <div className="text-3xl mb-3">💬</div>
            <h4 className="font-heading font-bold text-navy-900 mb-1">WhatsApp Support</h4>
            <p className="text-gray-500 text-sm mb-4">Available 24/7 for urgent queries on WhatsApp.</p>
            <a
              href="https://wa.me/919876543210?text=Hello! I need help."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-xl text-sm"
            >
              Open WhatsApp
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
