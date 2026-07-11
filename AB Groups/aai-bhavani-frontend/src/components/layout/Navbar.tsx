"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getWhatsAppLink } from "@/lib/utils";
import {
  Menu, X, Phone, ChevronDown, Building2, Banknote,
  Palette, FolderKanban, Home, LogIn, User,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const services = [
  { label: "Property Consultancy", href: "/services/property", icon: Building2, desc: "Buy, Sell & Investment" },
  { label: "Loan Consultancy", href: "/services/loans", icon: Banknote, desc: "Home, Business & Personal" },
  { label: "Interior Design", href: "/services/interior", icon: Palette, desc: "Design & Execution" },
  { label: "Project Management", href: "/services/projects", icon: FolderKanban, desc: "End-to-End Management" },
];

const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";
  const isDark = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || !isHomePage
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gold-400 rounded-xl flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
                <Building2 size={22} className="text-navy-900" />
              </div>
              <div>
                <div
                  className={cn(
                    "font-heading font-bold text-base leading-none transition-colors",
                    isDark ? "text-white" : "text-navy-900"
                  )}
                >
                  AAI BHAVANI
                </div>
                <div
                  className={cn(
                    "text-xs font-medium leading-none mt-0.5 transition-colors",
                    isDark ? "text-gold-400" : "text-gold-500"
                  )}
                >
                  GROUP
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNav.map((item) =>
                item.hasDropdown ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        isDark
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-gray-600 hover:text-navy-900 hover:bg-navy-900/5",
                        pathname.startsWith("/services") && (isDark ? "text-gold-400" : "text-navy-900 font-semibold")
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn("transition-transform", isServicesOpen && "rotate-180")}
                      />
                    </button>

                    {/* Dropdown */}
                    {isServicesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white rounded-2xl shadow-card-hover border border-gray-100 p-2 animate-fade-in">
                        {services.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-navy-900/5 transition-colors group"
                          >
                            <div className="w-9 h-9 bg-gold-400/10 rounded-lg flex items-center justify-center text-gold-500 group-hover:bg-gold-400/20 transition-colors flex-shrink-0">
                              <s.icon size={18} />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-navy-900">{s.label}</div>
                              <div className="text-xs text-gray-500">{s.desc}</div>
                            </div>
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <Link
                            href="/services"
                            className="flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-navy-900 hover:text-gold-500 transition-colors"
                          >
                            View All Services →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      isDark
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-gray-600 hover:text-navy-900 hover:bg-navy-900/5",
                      pathname === item.href &&
                        (isDark ? "text-gold-400 font-semibold" : "text-navy-900 font-semibold")
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${"+919876543210"}`}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  isDark
                    ? "text-white/80 hover:text-white"
                    : "text-gray-600 hover:text-navy-900"
                )}
              >
                <Phone size={15} />
                <span>Call Us</span>
              </a>

              {isAuthenticated ? (
                <Link
                  href={
                    user?.role === "owner"
                      ? "/dashboard/admin"
                      : user?.role === "employee"
                      ? "/dashboard/employee"
                      : "/dashboard/client"
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors"
                >
                  <User size={15} />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-navy-900 text-navy-900 rounded-xl text-sm font-semibold hover:bg-navy-900 hover:text-white transition-all"
                >
                  <LogIn size={15} />
                  Login
                </Link>
              )}

              <Link
                href="/contact#consultation"
                className="px-5 py-2.5 bg-gold-400 text-navy-900 rounded-xl text-sm font-bold hover:bg-gold-500 transition-all shadow-gold active:scale-95"
              >
                Book Consultation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "lg:hidden p-2 rounded-xl transition-colors",
                isDark ? "text-white hover:bg-white/10" : "text-navy-900 hover:bg-gray-100"
              )}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-900/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-2xl flex flex-col overflow-y-auto animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gold-400 rounded-xl flex items-center justify-center">
                  <Building2 size={20} className="text-navy-900" />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-navy-900">AAI BHAVANI</div>
                  <div className="text-xs text-gold-500 font-medium">GROUP</div>
                </div>
              </Link>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-5 space-y-1">
              {mainNav.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      pathname === item.href
                        ? "bg-navy-900 text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {item.label === "Home" && <Home size={18} />}
                    {item.label === "Services" && <Building2 size={18} />}
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <div className="ml-4 mt-1 space-y-1">
                      {services.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-navy-900"
                        >
                          <s.icon size={15} />
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="p-5 border-t border-gray-100 space-y-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-green-500 text-white font-semibold rounded-xl text-base"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/contact#consultation"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gold-400 text-navy-900 font-bold rounded-xl text-base shadow-gold"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 border-2 border-navy-900 text-navy-900 font-semibold rounded-xl text-base"
              >
                <LogIn size={18} />
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
