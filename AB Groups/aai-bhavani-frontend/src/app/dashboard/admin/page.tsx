"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, Badge, Avatar } from "@/components/ui";
import {
  TrendingUp, Users, Building2, Banknote, Palette,
  FolderKanban, Star, Activity, Settings, BarChart3,
  ArrowUp, ArrowDown, ArrowRight, Phone, Clock,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { icon: BarChart3, label: "Overview", href: "/dashboard/admin" },
  { icon: TrendingUp, label: "Revenue", href: "/dashboard/admin/revenue" },
  { icon: Users, label: "Lead Analytics", href: "/dashboard/admin/leads" },
  { icon: Building2, label: "Property Deals", href: "/dashboard/admin/properties" },
  { icon: Banknote, label: "Loan Status", href: "/dashboard/admin/loans" },
  { icon: Palette, label: "Interior Projects", href: "/dashboard/admin/interior" },
  { icon: Users, label: "Employee Performance", href: "/dashboard/admin/employees" },
  { icon: Activity, label: "Recent Activities", href: "/dashboard/admin/activities" },
  { icon: Users, label: "All Clients", href: "/dashboard/admin/clients" },
  { icon: Settings, label: "CMS & Settings", href: "/dashboard/admin/settings" },
];

const kpiData = [
  { label: "Total Revenue (Jul)", value: "₹12.4L", change: "+18%", up: true, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  { label: "New Leads", value: "47", change: "+12%", up: true, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Deals Closed", value: "18", change: "+5%", up: true, icon: Building2, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Active Clients", value: "134", change: "+8%", up: true, icon: Star, color: "text-gold-600", bg: "bg-gold-400/10" },
];

const recentLeads = [
  { name: "Rahul Gupta", service: "Home Loan", amount: "₹75L", status: "new", time: "5 min ago" },
  { name: "Anjali Mehta", service: "Property Buy", amount: "₹85L", status: "in_progress", time: "1 hr ago" },
  { name: "Suresh Nair", service: "Interior Design", amount: "₹8L", status: "meeting_set", time: "2 hr ago" },
  { name: "Kavita Shah", service: "Personal Loan", amount: "₹15L", status: "approved", time: "3 hr ago" },
  { name: "Manish Patil", service: "Sell Property", amount: "₹1.2Cr", status: "new", time: "4 hr ago" },
];

const employeePerformance = [
  { name: "Rahul Sharma", dept: "Property", deals: 8, revenue: "₹4.2L", rating: 4.9, pct: 95 },
  { name: "Priya Desai", dept: "Loans", deals: 12, revenue: "₹3.8L", rating: 4.8, pct: 88 },
  { name: "Amit Kumar", dept: "Interior", deals: 5, revenue: "₹2.1L", rating: 4.7, pct: 80 },
  { name: "Sunita Joshi", dept: "Property", deals: 6, revenue: "₹3.5L", rating: 4.6, pct: 76 },
];

const revenueByService = [
  { service: "Property", amount: "₹6.8L", pct: 55, color: "bg-blue-500" },
  { service: "Loans", amount: "₹3.2L", pct: 26, color: "bg-green-500" },
  { service: "Interior", amount: "₹1.8L", pct: 14, color: "bg-purple-500" },
  { service: "Projects", amount: "₹0.6L", pct: 5, color: "bg-orange-500" },
];

const statusBadgeMap: Record<string, "green" | "navy" | "gold" | "gray"> = {
  approved: "green",
  in_progress: "navy",
  meeting_set: "navy",
  new: "gold",
};

export default function AdminDashboard() {
  return (
    <DashboardLayout navItems={navItems} title="Business Overview" role="Owner Portal">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-hero rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-1">Business Dashboard 🏢</h2>
              <p className="text-white/60 text-sm">
                July 2026 · All numbers updated in real-time
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/admin/leads" className="px-4 py-2 bg-gold-400 text-navy-900 font-bold rounded-xl text-sm hover:bg-gold-500 transition-all">
                View All Leads
              </Link>
              <Link href="/dashboard/admin/settings" className="px-4 py-2 bg-white/10 text-white font-semibold rounded-xl text-sm border border-white/20 hover:bg-white/20">
                <Settings size={14} className="inline mr-1.5" />Settings
              </Link>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map(kpi => (
            <Card key={kpi.label} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${kpi.bg} rounded-xl flex items-center justify-center`}>
                  <kpi.icon size={20} className={kpi.color} />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.up ? "text-green-600" : "text-red-500"}`}>
                  {kpi.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {kpi.change}
                </div>
              </div>
              <div className="text-2xl font-bold font-heading text-navy-900">{kpi.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{kpi.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue by Service */}
          <Card padding="md">
            <h3 className="font-heading font-bold text-navy-900 mb-5">Revenue by Service</h3>
            <div className="space-y-4">
              {revenueByService.map(r => (
                <div key={r.service}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-600">{r.service}</span>
                    <span className="text-sm font-bold text-navy-900">{r.amount}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{r.pct}% of total</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">Total Revenue</span>
              <span className="font-bold text-navy-900">₹12.4L</span>
            </div>
          </Card>

          {/* Recent Leads */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-heading font-bold text-navy-900">Recent Leads</h3>
                <Link href="/dashboard/admin/leads" className="text-xs text-navy-900 font-medium hover:text-gold-500 flex items-center gap-1">
                  View All <ArrowRight size={12} />
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {recentLeads.map(lead => (
                  <div key={lead.name} className="p-4 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar name={lead.name} size="sm" />
                      <div>
                        <div className="font-semibold text-navy-900 text-sm">{lead.name}</div>
                        <div className="text-xs text-gray-500">{lead.service} · {lead.amount}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={10} /> {lead.time}
                      </div>
                      <Badge variant={statusBadgeMap[lead.status] || "gray"}>
                        {lead.status === "in_progress" ? "In Progress" :
                         lead.status === "meeting_set" ? "Meeting Set" :
                         lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Employee Performance */}
        <Card padding="none">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-heading font-bold text-navy-900">Employee Performance — July 2026</h3>
            <Link href="/dashboard/admin/employees" className="text-xs text-navy-900 font-medium hover:text-gold-500 flex items-center gap-1">
              Full Report <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="text-center p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deals</th>
                  <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[120px]">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employeePerformance.map(emp => (
                  <tr key={emp.name} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={emp.name} size="sm" />
                        <span className="font-medium text-navy-900 text-sm">{emp.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{emp.dept}</td>
                    <td className="p-4 text-center">
                      <span className="text-sm font-bold text-navy-900">{emp.deals}</span>
                    </td>
                    <td className="p-4 text-sm font-semibold text-green-600">{emp.revenue}</td>
                    <td className="p-4 text-sm">
                      <span className="flex items-center gap-1 text-gold-500 font-semibold">
                        <Star size={12} className="fill-gold-400" /> {emp.rating}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gold-400 rounded-full" style={{ width: `${emp.pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-8">{emp.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Add New Lead", icon: Users, href: "/dashboard/admin/leads/new", color: "bg-blue-50 text-blue-600" },
            { label: "Schedule Meeting", icon: Phone, href: "/dashboard/admin/meetings/new", color: "bg-green-50 text-green-600" },
            { label: "View All Inquiries", icon: Activity, href: "/dashboard/admin/leads", color: "bg-purple-50 text-purple-600" },
            { label: "CMS Settings", icon: Settings, href: "/dashboard/admin/settings", color: "bg-gold-400/10 text-gold-600" },
          ].map(action => (
            <Link
              key={action.label}
              href={action.href}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-100 bg-white shadow-card hover:shadow-card-hover transition-all text-center group`}
            >
              <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <action.icon size={18} />
              </div>
              <span className="text-xs font-semibold text-navy-900">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
