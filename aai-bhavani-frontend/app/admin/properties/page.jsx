'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, MapPin, Star } from 'lucide-react';
import { ConfirmModal } from '../_components/Modal';
import { useToast } from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const TYPE_FILTERS = [
  { value: '',     label: 'All Types' },
  { value: 'sell', label: 'For Sale'  },
  { value: 'rent', label: 'For Rent'  },
  { value: 'both', label: 'Both'      },
];
const CAT_FILTERS = [
  { value: '',             label: 'All Categories' },
  { value: 'residential',  label: 'Residential'    },
  { value: 'commercial',   label: 'Commercial'     },
  { value: 'plot',         label: 'Plot'           },
];

function formatPrice(price, type) {
  const n = parseFloat(price);
  let str;
  if (n >= 1e7) str = `₹${+(n / 1e7).toFixed(2)} Cr`;
  else if (n >= 1e5) str = `₹${+(n / 1e5).toFixed(2)} L`;
  else str = `₹${n.toLocaleString('en-IN')}`;
  return type === 'rent' ? `${str}/mo` : str;
}

export default function PropertiesPage() {
  const toast = useToast();

  const [data,         setData]         = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [typeFilter,   setTypeFilter]   = useState('');
  const [catFilter,    setCatFilter]    = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting,     setDeleting]     = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/properties/`);
      const json = await res.json();
      setData(json.results ?? json ?? []);
    } catch { setData([]); }
    finally  { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API}/api/properties/${deleteTarget.id}/`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) throw new Error();
      toast('Property deleted', 'success');
      setDeleteTarget(null);
      load();
    } catch { toast('Failed to delete', 'error'); }
    finally  { setDeleting(false); }
  };

  const filtered = data.filter(p =>
    (!typeFilter || p.type     === typeFilter) &&
    (!catFilter  || p.category === catFilter)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Properties</h2>
          <p className="admin-page-sub">{data.length} listings · {data.filter(p => p.is_featured).length} featured</p>
        </div>
        <Link href="/admin/properties/new" className="admin-btn admin-btn--primary">
          <Plus size={15} /> Add Property
        </Link>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        {TYPE_FILTERS.map(f => (
          <button key={f.value} onClick={() => setTypeFilter(f.value)} className="admin-btn admin-btn--ghost admin-btn--sm"
            style={{
              background:  typeFilter === f.value ? 'rgba(245,194,76,0.12)' : undefined,
              borderColor: typeFilter === f.value ? 'rgba(245,194,76,0.3)'  : undefined,
              color:       typeFilter === f.value ? '#f5c24c'               : undefined,
            }}>
            {f.label}
          </button>
        ))}
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
        {CAT_FILTERS.map(f => (
          <button key={f.value} onClick={() => setCatFilter(f.value)} className="admin-btn admin-btn--ghost admin-btn--sm"
            style={{
              background:  catFilter === f.value ? 'rgba(96,165,250,0.12)' : undefined,
              borderColor: catFilter === f.value ? 'rgba(96,165,250,0.3)'  : undefined,
              color:       catFilter === f.value ? '#60a5fa'               : undefined,
            }}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1,2,3].map(i => <div key={i} style={{ height: 80, borderRadius: 12, background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite' }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#111118', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>{data.length === 0 ? 'No properties yet.' : 'No results for current filter.'}</p>
          {data.length === 0 && (
            <Link href="/admin/properties/new" className="admin-btn admin-btn--primary"><Plus size={15} /> Add First Property</Link>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(prop => {
            const primaryImg = prop.images?.find(i => i.is_primary) ?? prop.images?.[0];
            return (
              <div key={prop.id} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 18px',
                background: '#111118',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >
                {/* Thumbnail */}
                <div style={{
                  width: 56, height: 56, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(255,255,255,0.05)',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  {primaryImg ? (
                    <img src={primaryImg.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🏠</div>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <p style={{ margin: 0, fontWeight: 600, color: '#e0e0e8' }}>{prop.title}</p>
                    {prop.is_featured && (
                      <span style={{ fontSize: '0.68rem', padding: '2px 7px', borderRadius: 99, background: 'rgba(245,194,76,0.12)', color: '#f5c24c', border: '1px solid rgba(245,194,76,0.2)', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Star size={9} fill="currentColor" /> Featured
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: '0.76rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={11} /> {prop.area ? `${prop.area}, ` : ''}{prop.city}
                    {prop.builder_name && ` · ${prop.builder_name}`}
                  </p>
                </div>

                {/* Price */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ margin: 0, fontWeight: 700, color: '#f0f0f5', fontSize: '0.9rem' }}>
                    {formatPrice(prop.price, prop.type)}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textTransform: 'capitalize' }}>
                    {prop.type === 'sell' ? 'For Sale' : prop.type === 'rent' ? 'For Rent' : 'Sale & Rent'} · {prop.category}
                  </p>
                </div>

                {/* Active badge */}
                <span style={{
                  flexShrink: 0, padding: '3px 9px', borderRadius: 99, fontSize: '0.7rem', fontWeight: 600,
                  background: prop.is_active ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)',
                  color: prop.is_active ? '#4ade80' : 'rgba(255,255,255,0.3)',
                  border: `1px solid ${prop.is_active ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.1)'}`,
                }}>
                  {prop.is_active ? 'Active' : 'Hidden'}
                </span>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <Link href={`/admin/properties/${prop.id}`} className="admin-btn admin-btn--ghost admin-btn--sm">
                    <Pencil size={13} /> Edit
                  </Link>
                  <button onClick={() => setDeleteTarget(prop)} className="admin-btn admin-btn--danger admin-btn--sm">
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
