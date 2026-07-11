import React from "react";
import Link from "next/link";
import { Building2, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

// Social icons as inline SVG since lucide removed them in v3
const SocialIcons = {
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

const services = [
  { label: "Property Buy & Sell", href: "/services/property" },
  { label: "Home Loan", href: "/services/loans" },
  { label: "Business Loan", href: "/services/loans" },
  { label: "Interior Design", href: "/services/interior" },
  { label: "Structure Design", href: "/services/projects" },
  { label: "Project Management", href: "/services/projects" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Contact Us", href: "/contact" },
  { label: "Book Consultation", href: "/contact#consultation" },
  { label: "Client Login", href: "/login" },
  { label: "Refer & Earn", href: "/referral" },
];

const socialLinks = [
  { icon: SocialIcons.Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: SocialIcons.Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: SocialIcons.Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: SocialIcons.LinkedIn, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to Find Your <span className="text-gold-400">Dream Property?</span>
              </h3>
              <p className="text-white/60 text-base">
                Get a free consultation with our expert advisors today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href={getWhatsAppLink("Hi! I'd like to book a free consultation.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/contact#consultation"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold rounded-xl transition-all shadow-gold"
              >
                Book Free Consultation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gold-400 rounded-xl flex items-center justify-center">
                <Building2 size={22} className="text-navy-900" />
              </div>
              <div>
                <div className="font-heading font-bold text-white">AAI BHAVANI</div>
                <div className="text-gold-400 text-sm font-semibold tracking-wider">GROUP</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Building Trust. Creating Value. Your comprehensive partner for Property,
              Loans, Interior Design, and beyond.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-white/70 hover:text-gold-400 transition-colors text-sm"
              >
                <Phone size={15} className="text-gold-400 flex-shrink-0" />
                +91 98765 43210
              </a>
              <a
                href="mailto:info@aaibhavani.com"
                className="flex items-center gap-3 text-white/70 hover:text-gold-400 transition-colors text-sm"
              >
                <Mail size={15} className="text-gold-400 flex-shrink-0" />
                info@aaibhavani.com
              </a>
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin size={15} className="text-gold-400 flex-shrink-0 mt-0.5" />
                Pune, Maharashtra, India
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-gold-400/20 hover:text-gold-400 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-base">Our Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-white/60 hover:text-gold-400 transition-colors text-sm group"
                  >
                    <ArrowRight size={13} className="text-gold-400/50 group-hover:text-gold-400 transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-base">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-white/60 hover:text-gold-400 transition-colors text-sm group"
                  >
                    <ArrowRight size={13} className="text-gold-400/50 group-hover:text-gold-400 transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-base">Office Hours</h4>
            <div className="space-y-3">
              {[
                { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
                { day: "Saturday", time: "9:00 AM – 5:00 PM" },
                { day: "Sunday", time: "10:00 AM – 2:00 PM" },
              ].map(({ day, time }) => (
                <div key={day} className="text-sm">
                  <div className="text-white/50">{day}</div>
                  <div className="text-white font-medium">{time}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-sm text-gold-400 font-semibold mb-1">Emergency Support</p>
              <p className="text-white/60 text-xs">
                Available 24/7 via WhatsApp for urgent property and loan queries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <p>© {new Date().getFullYear()} AAI BHAVANI GROUP. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-white/70 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
