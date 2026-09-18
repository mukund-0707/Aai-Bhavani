'use client';

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

const PAGE_TITLES = {
  '/admin':               'Dashboard',
  '/admin/site-settings': 'Site Settings',
  '/admin/services':      'Services',
  '/admin/properties':    'Properties',
  '/admin/inquiries':     'Inquiries',
  '/admin/referrals':     'Referrals',
  '/admin/testimonials':  'Testimonials',
  '/admin/team':          'Team',
  '/admin/faqs':          'FAQs',
};

export default function Topbar({ onMenuClick }) {
  const pathname = usePathname();

  // Match exact or prefix for dynamic routes
  let title = 'Admin';
  for (const [key, val] of Object.entries(PAGE_TITLES)) {
    if (pathname === key || pathname.startsWith(key + '/')) {
      title = val;
    }
  }

  return (
    <header style={{
      position: 'fixed',
      top: 0, right: 0, left: 220,
      height: 56,
      zIndex: 30,
      background: 'rgba(10,10,15,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center',
      padding: '0 24px',
      gap: 14,
    }} className="admin-topbar">
      {/* Mobile burger */}
      <button
        onClick={onMenuClick}
        className="admin-mobile-only"
        style={{
          background: 'rgba(255,255,255,0.06)', border: 'none',
          borderRadius: 8, width: 34, height: 34,
          display: 'none', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
          flexShrink: 0,
        }}
      >
        <Menu size={18} />
      </button>

      <h1 style={{
        margin: 0, fontSize: '1rem', fontWeight: 700,
        color: '#f0f0f5', letterSpacing: '-0.02em',
      }}>
        {title}
      </h1>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)',
          padding: '4px 10px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          No Auth Mode
        </span>
      </div>
    </header>
  );
}
