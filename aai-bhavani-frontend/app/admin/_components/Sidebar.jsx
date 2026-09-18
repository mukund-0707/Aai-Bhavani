'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Settings, Briefcase, Building2,
  MessageSquare, Users2, Star, UserRound, HelpCircle,
  Share2, ExternalLink, ChevronRight,
} from 'lucide-react';

const NAV = [
  {
    group: 'Overview',
    items: [
      { label: 'Dashboard',     href: '/admin',             icon: LayoutDashboard },
    ],
  },
  {
    group: 'Content',
    items: [
      { label: 'Site Settings', href: '/admin/site-settings', icon: Settings    },
      { label: 'Services',      href: '/admin/services',      icon: Briefcase   },
      { label: 'Properties',    href: '/admin/properties',    icon: Building2   },
      { label: 'Testimonials',  href: '/admin/testimonials',  icon: Star        },
      { label: 'Team',          href: '/admin/team',          icon: UserRound   },
      { label: 'FAQs',          href: '/admin/faqs',          icon: HelpCircle  },
    ],
  },
  {
    group: 'CRM',
    items: [
      { label: 'Inquiries',  href: '/admin/inquiries',  icon: MessageSquare },
      { label: 'Referrals',  href: '/admin/referrals',  icon: Share2        },
    ],
  },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 39,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: 220, zIndex: 40,
        background: '#0d0d14',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        transform: mobileOpen ? 'translateX(0)' : undefined,
        transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
        // Mobile: hidden by default via CSS class
      }}>
        {/* Logo */}
        <div style={{
          padding: '18px 20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: 10,
          flexShrink: 0,
        }}>
          <img src="/logo-mark-dark.png" alt="" style={{ height: 32, width: 'auto' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, lineHeight: 1 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Aai Bhavani</span>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#f5c24c', opacity: 0.7 }}>Admin</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
          {NAV.map(group => (
            <div key={group.group} style={{ marginBottom: 22 }}>
              <p style={{
                fontSize: '0.65rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.22)',
                padding: '0 10px', margin: '0 0 6px',
              }}>{group.group}</p>
              {group.items.map(item => {
                const active = isActive(item.href);
                const Icon   = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 9,
                      padding: '8px 10px',
                      borderRadius: 8,
                      fontSize: '0.84rem',
                      fontWeight: active ? 600 : 400,
                      color: active ? '#f5c24c' : 'rgba(255,255,255,0.5)',
                      background: active ? 'rgba(245,194,76,0.1)' : 'transparent',
                      border: active ? '1px solid rgba(245,194,76,0.15)' : '1px solid transparent',
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                      marginBottom: 2,
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                      }
                    }}
                  >
                    <Icon size={16} strokeWidth={active ? 2 : 1.6} style={{ flexShrink: 0 }} />
                    {item.label}
                    {active && (
                      <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.6 }} />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer — View Site link */}
        <div style={{
          padding: '12px 10px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '8px 10px', borderRadius: 8,
              fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none', transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            <ExternalLink size={15} strokeWidth={1.6} />
            View Live Site
          </Link>
        </div>
      </aside>
    </>
  );
}
