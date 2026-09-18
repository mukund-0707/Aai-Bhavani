'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare, Share2, AlertCircle, Clock,
  Briefcase, Building2, Settings, Plus, ArrowRight,
} from 'lucide-react';
import StatCard  from './_components/StatCard';
import StatusBadge from './_components/StatusBadge';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function AdminDashboard() {
  const [inquiries,  setInquiries]  = useState([]);
  const [referrals,  setReferrals]  = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [iq, ref] = await Promise.all([
          fetch(`${API}/api/inquiries/`).then(r => r.ok ? r.json() : { results: [], count: 0 }),
          fetch(`${API}/api/referrals/`).then(r => r.ok ? r.json() : { results: [], count: 0 }),
        ]);
        setInquiries(iq.results ?? iq ?? []);
        setReferrals(ref.results ?? ref ?? []);
      } catch {
        // backend not running — silently show zeros
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const newInquiries  = inquiries.filter(i => i.status === 'new').length;
  const pendingRefs   = referrals.filter(r => r.status === 'pending').length;
  const recent5Inq    = inquiries.slice(0, 5);
  const recent5Ref    = referrals.slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Welcome */}
      <div>
        <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#f0f0f5', letterSpacing: '-0.03em' }}>
          Welcome back 👋
        </h2>
        <p style={{ margin: '5px 0 0', fontSize: '0.84rem', color: 'rgba(255,255,255,0.35)' }}>
          Here's what's happening with Aai Bhavani today.
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
        <StatCard
          label="Total Inquiries"
          value={loading ? '…' : inquiries.length}
          icon={MessageSquare}
          color="#60a5fa"
        />
        <StatCard
          label="New Inquiries"
          value={loading ? '…' : newInquiries}
          sub="Awaiting response"
          icon={AlertCircle}
          color="#f5c24c"
        />
        <StatCard
          label="Total Referrals"
          value={loading ? '…' : referrals.length}
          icon={Share2}
          color="#a78bfa"
        />
        <StatCard
          label="Pending Referrals"
          value={loading ? '…' : pendingRefs}
          sub="Need follow-up"
          icon={Clock}
          color="#fb923c"
        />
      </div>

      {/* Quick actions */}
      <div>
        <p style={{ margin: '0 0 12px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          Quick Actions
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <QuickLink href="/admin/services/new"      icon={Plus}      label="Add Service"       />
          <QuickLink href="/admin/properties/new"    icon={Building2} label="Add Property"      />
          <QuickLink href="/admin/site-settings"     icon={Settings}  label="Edit Site Info"    />
          <QuickLink href="/admin/inquiries"         icon={MessageSquare} label="View Inquiries" />
        </div>
      </div>

      {/* Recent tables */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 18 }}>

        {/* Recent Inquiries */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#f0f0f5' }}>
              Recent Inquiries
            </h3>
            <Link href="/admin/inquiries" style={{ fontSize: '0.78rem', color: '#f5c24c', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <SkeletonRows n={4} />
          ) : recent5Inq.length === 0 ? (
            <Empty msg="No inquiries yet." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {recent5Inq.map((inq, i) => (
                <div key={inq.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                  padding: '10px 0',
                  borderBottom: i < recent5Inq.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '0.84rem', fontWeight: 600, color: '#e0e0e8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {inq.name}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)' }}>
                      {inq.service_name ?? inq.service ?? 'General'} · {timeAgo(inq.created_at)}
                    </p>
                  </div>
                  <StatusBadge status={inq.status} type="inquiry" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Referrals */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#f0f0f5' }}>
              Recent Referrals
            </h3>
            <Link href="/admin/referrals" style={{ fontSize: '0.78rem', color: '#f5c24c', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <SkeletonRows n={4} />
          ) : recent5Ref.length === 0 ? (
            <Empty msg="No referrals yet." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {recent5Ref.map((ref, i) => (
                <div key={ref.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                  padding: '10px 0',
                  borderBottom: i < recent5Ref.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '0.84rem', fontWeight: 600, color: '#e0e0e8' }}>
                      {ref.referrer_name}
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, margin: '0 5px' }}>→</span>
                      {ref.client_name}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)' }}>
                      {ref.service_name ?? ref.service ?? 'General'} · {timeAgo(ref.created_at)}
                    </p>
                  </div>
                  <StatusBadge status={ref.status} type="referral" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Quick link chip ── */
function QuickLink({ href, icon: Icon, label }) {
  return (
    <Link href={href} style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      padding: '8px 14px', borderRadius: 8,
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.09)',
      fontSize: '0.82rem', fontWeight: 500,
      color: 'rgba(255,255,255,0.65)',
      textDecoration: 'none',
      transition: 'all 0.15s',
    }}
    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,194,76,0.1)'; e.currentTarget.style.borderColor = 'rgba(245,194,76,0.2)'; e.currentTarget.style.color = '#f5c24c'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
    >
      <Icon size={14} strokeWidth={1.8} />
      {label}
    </Link>
  );
}

/* ── Skeleton loading rows ── */
function SkeletonRows({ n = 4 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '8px 0' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ height: 12, width: '60%', borderRadius: 6, background: 'rgba(255,255,255,0.07)', animation: 'pulse 1.5s infinite' }} />
            <div style={{ height: 10, width: '40%', borderRadius: 6, background: 'rgba(255,255,255,0.04)', animation: 'pulse 1.5s infinite' }} />
          </div>
          <div style={{ height: 22, width: 70, borderRadius: 99, background: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s infinite' }} />
        </div>
      ))}
    </div>
  );
}

/* ── Empty state ── */
function Empty({ msg }) {
  return (
    <p style={{ textAlign: 'center', padding: '28px 0', color: 'rgba(255,255,255,0.2)', fontSize: '0.84rem', margin: 0 }}>
      {msg}
    </p>
  );
}
