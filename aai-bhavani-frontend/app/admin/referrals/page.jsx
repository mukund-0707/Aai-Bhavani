'use client';

import { useCallback, useEffect, useState } from 'react';
import { Search, Phone, IndianRupee, ArrowRight } from 'lucide-react';
import DataTable   from '../_components/DataTable';
import StatusBadge from '../_components/StatusBadge';
import Modal       from '../_components/Modal';
import { useToast } from '../_components/Toast';
import FormField, { Select, Textarea, Input } from '../_components/FormField';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const STATUS_OPTIONS = [
  { value: '',          label: 'All Status' },
  { value: 'pending',   label: 'Pending'    },
  { value: 'converted', label: 'Converted'  },
  { value: 'paid',      label: 'Paid'       },
  { value: 'cancelled', label: 'Cancelled'  },
];

function formatDate(str) {
  if (!str) return '—';
  return new Date(str).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatRupee(val) {
  if (!val && val !== 0) return '—';
  return `₹${Number(val).toLocaleString('en-IN')}`;
}

export default function ReferralsPage() {
  const toast = useToast();

  const [data,         setData]         = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search,       setSearch]       = useState('');
  const [selected,     setSelected]     = useState(null);
  const [saving,       setSaving]       = useState(false);
  const [editStatus,   setEditStatus]   = useState('');
  const [editNotes,    setEditNotes]    = useState('');
  const [dealValue,    setDealValue]    = useState('');
  const [commission,   setCommission]   = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/referrals/`);
      const json = await res.json();
      setData(json.results ?? json ?? []);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openModal = (ref) => {
    setSelected(ref);
    setEditStatus(ref.status);
    setEditNotes(ref.notes ?? '');
    setDealValue(ref.deal_value ?? '');
    setCommission(ref.commission_paid ?? '');
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const payload = {
        status:          editStatus,
        notes:           editNotes,
        deal_value:      dealValue !== '' ? dealValue : null,
        commission_paid: commission !== '' ? commission : null,
      };
      const res = await fetch(`${API}/api/referrals/${selected.id}/`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast('Referral updated successfully', 'success');
      setSelected(null);
      load();
    } catch {
      toast('Failed to update referral', 'error');
    } finally {
      setSaving(false);
    }
  };

  /* Filter */
  const filtered = data.filter(ref => {
    const matchStatus = !statusFilter || ref.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q
      || ref.referrer_name?.toLowerCase().includes(q)
      || ref.client_name?.toLowerCase().includes(q)
      || ref.referrer_phone?.includes(q);
    return matchStatus && matchSearch;
  });

  const COLUMNS = [
    {
      key: 'referrer_name', label: 'Referrer',
      render: (v, row) => (
        <div>
          <p style={{ margin: 0, fontWeight: 600, color: '#e0e0e8' }}>{v}</p>
          <p style={{ margin: '2px 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Phone size={10} /> {row.referrer_phone}
          </p>
        </div>
      ),
    },
    {
      key: 'client_name', label: 'Client',
      render: (v, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <ArrowRight size={12} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
          <div>
            <span style={{ color: '#e0e0e8', fontWeight: 500 }}>{v}</span>
            {row.client_phone && (
              <span style={{ display: 'block', fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)' }}>{row.client_phone}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'service', label: 'Service',
      render: (v, row) => <span style={{ color: 'rgba(255,255,255,0.6)' }}>{row.service_name ?? v ?? '—'}</span>,
    },
    { key: 'status', label: 'Status',     render: v => <StatusBadge status={v} type="referral" /> },
    {
      key: 'commission_paid', label: 'Commission', align: 'right',
      render: v => <span style={{ color: v ? '#4ade80' : 'rgba(255,255,255,0.25)', fontWeight: v ? 600 : 400 }}>{formatRupee(v)}</span>,
    },
    { key: 'created_at', label: 'Date', render: v => <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>{formatDate(v)}</span> },
    {
      key: 'id', label: '', align: 'right', width: 80,
      render: (_, row) => (
        <button onClick={() => openModal(row)} className="admin-btn admin-btn--ghost admin-btn--sm">View</button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Referrals</h2>
          <p className="admin-page-sub">
            {data.length} total · {data.filter(r => r.status === 'pending').length} pending · {data.filter(r => r.status === 'paid').length} paid
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 320 }}>
          <Search size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search referrer, client, phone…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box',
              paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, color: '#f0f0f5',
              fontSize: '0.84rem', outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className="admin-btn admin-btn--ghost admin-btn--sm"
              style={{
                background:  statusFilter === opt.value ? 'rgba(245,194,76,0.12)' : undefined,
                borderColor: statusFilter === opt.value ? 'rgba(245,194,76,0.3)'  : undefined,
                color:       statusFilter === opt.value ? '#f5c24c'               : undefined,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <DataTable columns={COLUMNS} data={filtered} loading={loading} emptyMsg="No referrals found." />

      {/* Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Referral Detail" maxWidth={540}>
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* People */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <PersonCard title="Referrer" name={selected.referrer_name} phone={selected.referrer_phone} email={selected.referrer_email} />
              <PersonCard title="Client"   name={selected.client_name}   phone={selected.client_phone} />
            </div>

            {/* Service */}
            <div style={{
              padding: '10px 14px', borderRadius: 8,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              fontSize: '0.85rem',
            }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Service</span>
              <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{selected.service_name ?? selected.service ?? '—'}</p>
            </div>

            {/* Status */}
            <FormField label="Status">
              <Select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="converted">Converted</option>
                <option value="paid">Paid</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </FormField>

            {/* Commission */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FormField label="Deal Value" hint="Total deal amount (₹)">
                <div style={{ position: 'relative' }}>
                  <IndianRupee size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                  <Input
                    type="number" placeholder="0"
                    value={dealValue}
                    onChange={e => setDealValue(e.target.value)}
                    style={{ paddingLeft: 28 }}
                  />
                </div>
              </FormField>
              <FormField label="Commission Paid" hint="Amount transferred (₹)">
                <div style={{ position: 'relative' }}>
                  <IndianRupee size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                  <Input
                    type="number" placeholder="0"
                    value={commission}
                    onChange={e => setCommission(e.target.value)}
                    style={{ paddingLeft: 28 }}
                  />
                </div>
              </FormField>
            </div>

            {/* Notes */}
            <FormField label="Notes" hint="Internal notes">
              <Textarea rows={3} placeholder="Follow-up notes…" value={editNotes} onChange={e => setEditNotes(e.target.value)} />
            </FormField>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setSelected(null)} className="admin-btn admin-btn--ghost">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn--primary">
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function PersonCard({ title, name, phone, email }) {
  return (
    <div style={{
      padding: '12px 14px', borderRadius: 8,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</span>
      <p style={{ margin: '5px 0 3px', fontWeight: 600, color: '#e0e0e8' }}>{name}</p>
      {phone && <p style={{ margin: '2px 0', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{phone}</p>}
      {email && <p style={{ margin: '2px 0', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{email}</p>}
    </div>
  );
}
