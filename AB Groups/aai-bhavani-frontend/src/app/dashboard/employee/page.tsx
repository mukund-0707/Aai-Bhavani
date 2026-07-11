"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, Badge, Avatar } from "@/components/ui";
import {
  Users, Calendar, CheckSquare, Phone, MapPin,
  TrendingUp, User, Bell, ArrowRight, Clock,
  CheckCircle, XCircle, AlertCircle,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { icon: TrendingUp, label: "Overview", href: "/dashboard/employee" },
  { icon: Users, label: "Today's Leads", href: "/dashboard/employee/leads", badge: 5 },
  { icon: Calendar, label: "Today's Meetings", href: "/dashboard/employee/meetings", badge: 2 },
  { icon: CheckSquare, label: "My Tasks", href: "/dashboard/employee/tasks", badge: 3 },
  { icon: Phone, label: "Follow Ups", href: "/dashboard/employee/followups" },
  { icon: MapPin, label: "Site Visits", href: "/dashboard/employee/site-visits" },
  { icon: TrendingUp, label: "My Performance", href: "/dashboard/employee/performance" },
  { icon: User, label: "My Profile", href: "/dashboard/employee/profile" },
];

const todayLeads = [
  { name: "Ravi Sharma", service: "Home Loan", time: "9:30 AM", status: "new", phone: "+91 9876543210" },
  { name: "Priya Kulkarni", service: "Buy Property", time: "11:00 AM", status: "called", phone: "+91 9876543211" },
  { name: "Amit Nair", service: "Interior Design", time: "2:00 PM", status: "meeting_set", phone: "+91 9876543212" },
  { name: "Sunita Joshi", service: "Personal Loan", time: "3:30 PM", status: "new", phone: "+91 9876543213" },
  { name: "Deepak Patil", service: "Sell Property", time: "4:00 PM", status: "follow_up", phone: "+91 9876543214" },
];

const todayMeetings = [
  { title: "Property Site Visit — Baner", time: "10:00 AM", client: "Mr. & Mrs. Sharma", location: "Baner Road, Pune" },
  { title: "Loan Document Submission", time: "3:00 PM", client: "Mr. Ravi Kumar", location: "Office" },
];

const myTasks = [
  { task: "Call Priya Kulkarni for property shortlist", priority: "high", due: "Today" },
  { task: "Send loan documents to HDFC", priority: "high", due: "Today" },
  { task: "Update property listing for 3BHK Wakad", priority: "medium", due: "Tomorrow" },
  { task: "Follow up with 5 old leads", priority: "low", due: "This Week" },
];

const statusConfig: Record<string, { label: string; variant: "green" | "navy" | "gold" | "gray" | "red" }> = {
  new: { label: "New", variant: "gold" },
  called: { label: "Called", variant: "navy" },
  meeting_set: { label: "Meeting Set", variant: "green" },
  follow_up: { label: "Follow Up", variant: "gray" },
};

const priorityColor: Record<string, string> = {
  high: "text-red-500",
  medium: "text-orange-500",
  low: "text-gray-400",
};

export default function EmployeeDashboard() {
  return (
    <DashboardLayout navItems={navItems} title="Employee Dashboard" role="Employee Portal">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Welcome + Date */}
        <div className="bg-hero rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-1">Good Evening! 💪</h2>
              <p className="text-white/60 text-sm">You have 5 new leads and 2 meetings today.</p>
            </div>
            <div className="text-right">
              <div className="text-white/40 text-xs">Today</div>
              <div className="text-white font-semibold">Saturday, 11 Jul 2026</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "5", label: "New Leads Today", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
            { value: "2", label: "Meetings Today", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
            { value: "4", label: "Tasks Pending", icon: CheckSquare, color: "text-orange-600", bg: "bg-orange-50" },
            { value: "12", label: "Deals This Month", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Leads */}
          <Card padding="none">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-heading font-bold text-navy-900">Today&apos;s Leads</h3>
              <Link href="/dashboard/employee/leads" className="text-xs text-navy-900 font-medium hover:text-gold-500 flex items-center gap-1">
                View All <ArrowRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {todayLeads.map(lead => (
                <div key={lead.name} className="p-4 flex items-center justify-between gap-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar name={lead.name} size="sm" />
                    <div>
                      <div className="font-semibold text-navy-900 text-sm">{lead.name}</div>
                      <div className="text-xs text-gray-500">{lead.service} · {lead.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusConfig[lead.status]?.variant || "gray"}>
                      {statusConfig[lead.status]?.label}
                    </Badge>
                    <a href={`tel:${lead.phone}`} className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors">
                      <Phone size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Today's Meetings + Tasks */}
          <div className="space-y-6">
            {/* Meetings */}
            <Card padding="none">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-heading font-bold text-navy-900">Today&apos;s Meetings</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {todayMeetings.map(m => (
                  <div key={m.title} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-navy-900 text-sm">{m.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                          <Clock size={11} /> {m.time} · {m.client}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <MapPin size={11} /> {m.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tasks */}
            <Card padding="none">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-heading font-bold text-navy-900">My Tasks</h3>
                <Link href="/dashboard/employee/tasks" className="text-xs text-navy-900 font-medium hover:text-gold-500 flex items-center gap-1">
                  View All <ArrowRight size={12} />
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {myTasks.map(task => (
                  <div key={task.task} className="p-4 flex items-center gap-3">
                    <button className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-green-500 flex-shrink-0 transition-colors" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-navy-900 truncate">{task.task}</div>
                      <div className={`text-xs font-medium mt-0.5 ${priorityColor[task.priority]}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} · Due {task.due}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Performance Overview */}
        <Card padding="md">
          <h3 className="font-heading font-bold text-navy-900 mb-5">This Month&apos;s Performance</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Leads Handled", value: "45", target: "50", pct: 90 },
              { label: "Deals Closed", value: "12", target: "15", pct: 80 },
              { label: "Client Rating", value: "4.8★", target: "5.0", pct: 96 },
              { label: "Revenue Generated", value: "₹8.2L", target: "₹10L", pct: 82 },
            ].map(p => (
              <div key={p.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-500">{p.label}</span>
                  <span className="text-xs font-bold text-navy-900">{p.value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-400 rounded-full transition-all"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">Target: {p.target}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
