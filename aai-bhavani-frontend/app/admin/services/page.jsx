'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Home, Landmark, Palette, Users, Megaphone } from 'lucide-react';
import { ConfirmModal } from '../_components/Modal';
import { useToast } from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const ICON_MAP = { home: Home, bank: Landmark, palette: Palette, users: Users, megaphone: Megaphone };

export default function ServicesPage() {
  const toast = useToast();
  const [services,    setServices]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [deleteTarget,setDeleteTarget] = useState(null);
  const [deleting,    setDeleting]    = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/services/`);
      const json = await res.json();
      setServices(json.results ?? json ?? []);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API}/api/services/${deleteTarget.slug}/`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) throw new Error();
      toast('Service deleted', 'success');
      setDeleteTarget(null);
      load();
    } catch {
      toast('Failed to delete service', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Services</h2>
          <p className="admin-page-sub">{services.length} services · drag to reorder</p>
        </div>
        <Link href="/admin/services/new" className="admin-btn admin-btn--primary">
          <Plus size={15} /> Add Service
        </Link>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ height: 70, borderRadius: 12, background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : services.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {services.map(svc => {
            const Icon = ICON_MAP[svc.icon] ?? Home;
            return (
              <div
                key={svc.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px',
                  background: '#111118',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >
                {/* Icon */}
                <div style={{
                  width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                  background: 'rgba(245,194,76,0.1)',
                  border: '1px solid rgba(245,194,76,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#f5c24c',
                }}>
                  <Icon size={17} strokeWidth={1.7} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: '#e0e0e8' }}>{svc.title}</p>
                  <p style={{ margin: '3px 0 0', fontSize: '0.76rem', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {svc.short_description}
                  </p>
                </div>

                {/* Badges */}
                <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
                  <span style={{
                    padding: '3px 9px', borderRadius: 99, fontSize: '0.7rem', fontWeight: 600,
                    background: svc.is_active ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)',
                    color:      svc.is_active ? '#4ade80'               : 'rgba(255,255,255,0.3)',
                    border:     `1px solid ${svc.is_active ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.1)'}`,
                  }}>
                    {svc.is_active ? 'Active' : 'Hidden'}
                  </span>
                  {svc.is_referral_enabled && (
                    <span style={{
                      padding: '3px 9px', borderRadius: 99, fontSize: '0.7rem', fontWeight: 600,
                      background: 'rgba(167,139,250,0.12)',
                      color: '#a78bfa',
                      border: '1px solid rgba(167,139,250,0.2)',
                    }}>
                      Referral On
                    </span>
                  )}
                </div>

                {/* Order */}
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.2)', flexShrink: 0, width: 24, textAlign: 'center' }}>
                  #{svc.order}
                </span>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <Link href={`/admin/services/${svc.id}`} className="admin-btn admin-btn--ghost admin-btn--sm">
                    <Pencil size={13} /> Edit
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(svc)}
                    className="admin-btn admin-btn--danger admin-btn--sm"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.title}
        loading={deleting}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{
      textAlign: 'center', padding: '60px 20px',
      background: '#111118', borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      <p style={{ color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>No services yet.</p>
      <Link href="/admin/services/new" className="admin-btn admin-btn--primary">
        <Plus size={15} /> Add First Service
      </Link>
    </div>
  );
}
