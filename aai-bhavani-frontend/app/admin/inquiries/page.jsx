'use client';

import { useCallback, useEffect, useState } from 'react';
import { Search, Phone, Mail, Calendar, StickyNote } from 'lucide-react';
import DataTable   from '../_components/DataTable';
import StatusBadge from '../_components/StatusBadge';
import Modal       from '../_components/Modal';
import { useToast } from '../_components/Toast';
import FormField, { Select, Textarea } from '../_components/FormField';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const STATUS_OPTIONS = [
  { value: '',            label: 'All Status'   },
  { value: 'new',         label: 'New'          },
  { value: 'contacted',   label: 'Contacted'    },
  { value: 'in_progress', label: 'In Progress'  },
  { value: 'closed',      label: 'Closed'       },
];

function formatDate(str) {
  if (!str) return '—';
  return new Date(str).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function InquiriesPage() {
  const toast = useToast();

  const [data,        setData]        = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [statusFilter,setStatusFilter] = useState('');
  const [search,      setSearch]      = useState('');
  const [selected,    setSelected]    = useState(null);   // inquiry being edited
  const [saving,      setSaving]      = useState(false);
  const [editStatus,  setEditStatus]  = useState('');
  const [editNotes,   setEditNotes]   = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/inquiries/`);
      const json = await res.json();
      setData(json.results ?? json ?? []);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  /* Open detail modal */
  const openModal = (inq) => {
    setSelected(inq);
    setEditStatus(inq.status);
    setEditNotes(inq.notes ?? '');
  };

  /* Save status + notes */
  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/inquiries/${selected.id}/`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ status: editStatus, notes: editNotes }),
      });
      if (!res.ok) throw new Error();
      toast('Inquiry updated successfully', 'success');
      setSelected(null);
      load();
    } catch {
      toast('Failed to update inquiry', 'error');
    } finally {
      setSaving(false);
    }
  };

  /* Filter */
  const filtered = data.filter(inq => {
    const matchStatus = !statusFilter || inq.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || inq.name?.toLowerCase().includes(q) || inq.phone?.includes(q) || inq.email?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const COLUMNS = [
    {
      key: 'name', label: 'Name',
      render: (v, row) => (
        <div>
          <p style={{ margin: 0, fontWeight: 600, color: '#e0e0e8' }}>{v}</p>
          <p style={{ margin: '2px 0 0', fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Phone size={10} /> {row.phone}
          </p>
        </div>
      ),
    },
    {
      key: 'service', label: 'Service',
      render: (v, row) => (
        <div>
          <span style={{ color: '#e0e0e8' }}>{row.service_name ?? v ?? '—'}</span>
          {row.category_name && (
            <span style={{ display: 'block', fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)' }}>{row.category_name}</span>
          )}
        </div>
      ),
    },
    { key: 'status',     label: 'Status',  render: v => <StatusBadge status={v} type="inquiry" /> },
    { key: 'created_at', label: 'Date',    render: v => <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>{formatDate(v)}</span> },
    {
      key: 'id', label: 'Action', align: 'right', width: 80,
      render: (_, row) => (
        <button
          onClick={() => openModal(row)}
          className="admin-btn admin-btn--ghost admin-btn--sm"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Inquiries</h2>
          <p className="admin-page-sub">{data.length} total · {data.filter(i => i.status === 'new').length} new</p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 320 }}>
          <Search size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search name, phone, email…"
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
        {/* Status filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className="admin-btn admin-btn--ghost admin-btn--sm"
              style={{
                background:   statusFilter === opt.value ? 'rgba(245,194,76,0.12)' : undefined,
                borderColor:  statusFilter === opt.value ? 'rgba(245,194,76,0.3)'  : undefined,
                color:        statusFilter === opt.value ? '#f5c24c'               : undefined,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <DataTable columns={COLUMNS} data={filtered} loading={loading} emptyMsg="No inquiries found." />

      {/* Detail Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Inquiry Detail"
        maxWidth={520}
      >
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Info grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <InfoRow icon={<span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Name</span>}    value={selected.name} />
              <InfoRow icon={<Phone size={13} />}    value={selected.phone} />
              {selected.email && <InfoRow icon={<Mail size={13} />} value={selected.email} />}
              <InfoRow icon={<Calendar size={13} />} value={formatDate(selected.created_at)} />
            </div>

            {/* Service / Category */}
            <div style={{
              padding: '12px 14px', borderRadius: 8,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Service</span>
              <span style={{ fontWeight: 600 }}>{selected.service_name ?? selected.service ?? '—'}</span>
              {selected.category_name && (
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>{selected.category_name}</span>
              )}
            </div>

            {/* Message */}
            {selected.message && (
              <div style={{
                padding: '12px 14px', borderRadius: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6,
              }}>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Message</span>
                {selected.message}
              </div>
            )}

            {/* Status update */}
            <FormField label="Update Status">
              <Select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </Select>
            </FormField>

            {/* Admin Notes */}
            <FormField label="Admin Notes" hint="Internal notes — not visible to customer">
              <Textarea
                rows={3}
                placeholder="Add follow-up notes here…"
                value={editNotes}
                onChange={e => setEditNotes(e.target.value)}
              />
            </FormField>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
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

function InfoRow({ icon, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.55)', fontSize: '0.84rem' }}>
      <span style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>{icon}</span>
      <span style={{ color: '#e0e0e8' }}>{value}</span>
    </div>
  );
}
