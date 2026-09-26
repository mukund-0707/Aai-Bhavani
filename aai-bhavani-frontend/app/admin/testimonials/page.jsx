'use client';

import { useCallback, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import Modal, { ConfirmModal } from '../_components/Modal';
import FormField, { Input, Textarea, Toggle, StarRating, FieldRow } from '../_components/FormField';
import { useToast } from '../_components/Toast';
import { adminFetch } from '../../../lib/auth';

const EMPTY_FORM = {
  client_name: '', location: '', rating: 5, review: '',
  order: 0, is_active: true,
};

function initials(name) {
  return (name || '?').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export default function TestimonialsPage() {
  const toast = useToast();

  const [data,        setData]        = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [modal,       setModal]       = useState(false);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [errors,      setErrors]      = useState({});
  const [saving,      setSaving]      = useState(false);
  const [deleteTarget,setDeleteTarget] = useState(null);
  const [deleting,    setDeleting]    = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const json = await adminFetch(`/api/testimonials/`);
      setData(json.results ?? json ?? []);
    } catch { setData([]); }
    finally  { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd  = ()    => { setForm(EMPTY_FORM); setErrors({}); setModal(true); };
  const openEdit = (item) => { setForm({ ...EMPTY_FORM, ...item }); setErrors({}); setModal(true); };

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target ? e.target.value : e }));
    setErrors(prev => { const x = {...prev}; delete x[k]; return x; });
  };
  const setToggle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.checked }));

  function validate() {
    const errs = {};
    if (!form.client_name.trim()) errs.client_name = 'Required';
    if (!form.review.trim())      errs.review      = 'Required';
    return errs;
  }

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      const isEdit = !!form.id;
      const url    = isEdit ? `/api/testimonials/${form.id}/` : `/api/testimonials/`;
      const method = isEdit ? 'PATCH' : 'POST';
      await adminFetch(url, {
        method,
        body: JSON.stringify(form),
      });
      toast(isEdit ? 'Testimonial updated' : 'Testimonial added', 'success');
      setModal(false);
      load();
    } catch { toast('Failed to save', 'error'); }
    finally  { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminFetch(`/api/testimonials/${deleteTarget.id}/`, { method: 'DELETE' });
      toast('Deleted', 'success');
      setDeleteTarget(null);
      load();
    } catch { toast('Failed to delete', 'error'); }
    finally  { setDeleting(false); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Testimonials</h2>
          <p className="admin-page-sub">{data.length} reviews</p>
        </div>
        <button onClick={openAdd} className="admin-btn admin-btn--primary">
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      {loading ? <GridSkeleton /> : data.length === 0 ? (
        <EmptyCard onAdd={openAdd} label="testimonial" />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {data.map(t => (
            <div key={t.id} style={{
              background: '#111118', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12, padding: '18px',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {t.photo ? (
                  <img src={t.photo} alt={t.client_name} style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(245,194,76,0.15)', border: '1px solid rgba(245,194,76,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.78rem', fontWeight: 700, color: '#f5c24c',
                  }}>
                    {initials(t.client_name)}
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: '#e0e0e8', fontSize: '0.9rem' }}>{t.client_name}</p>
                  {t.location && <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{t.location}</p>}
                </div>
                <span style={{
                  marginLeft: 'auto', fontSize: '0.7rem', padding: '2px 8px', borderRadius: 99,
                  background: t.is_active ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)',
                  color: t.is_active ? '#4ade80' : 'rgba(255,255,255,0.3)',
                  border: `1px solid ${t.is_active ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)'}`,
                  flexShrink: 0,
                }}>
                  {t.is_active ? 'Active' : 'Hidden'}
                </span>
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3,4,5].map(n => (
                  <Star key={n} size={13} fill={n <= t.rating ? '#f5c24c' : 'none'} color={n <= t.rating ? '#f5c24c' : 'rgba(255,255,255,0.15)'} />
                ))}
              </div>

              {/* Review */}
              <p style={{
                margin: 0, fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.6, flex: 1,
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                "{t.review}"
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
                <button onClick={() => openEdit(t)} className="admin-btn admin-btn--ghost admin-btn--sm" style={{ flex: 1, justifyContent: 'center' }}>
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => setDeleteTarget(t)} className="admin-btn admin-btn--danger admin-btn--sm">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={form.id ? 'Edit Testimonial' : 'Add Testimonial'} maxWidth={500}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <FieldRow>
            <FormField label="Client Name" required error={errors.client_name}>
              <Input value={form.client_name} onChange={set('client_name')} placeholder="Rajesh Mehta" error={errors.client_name} />
            </FormField>
            <FormField label="Location">
              <Input value={form.location} onChange={set('location')} placeholder="Adajan, Surat" />
            </FormField>
          </FieldRow>
          <FormField label="Rating">
            <StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
          </FormField>
          <FormField label="Review" required error={errors.review}>
            <Textarea rows={4} value={form.review} onChange={set('review')} placeholder="Client's feedback…" error={errors.review} />
          </FormField>
          <FieldRow>
            <FormField label="Order">
              <Input type="number" value={form.order} onChange={set('order')} min={0} />
            </FormField>
            <FormField label="Visibility" style={{ justifyContent: 'flex-end' }}>
              <div style={{ paddingTop: 8 }}>
                <Toggle id="t-active" checked={form.is_active} onChange={setToggle('is_active')} label="Active" />
              </div>
            </FormField>
          </FieldRow>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
            <button onClick={() => setModal(false)} className="admin-btn admin-btn--ghost">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn--primary">
              {saving ? 'Saving…' : form.id ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} itemName={deleteTarget?.client_name} loading={deleting} />
    </div>
  );
}

function GridSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
      {[1,2,3].map(i => (
        <div key={i} style={{ height: 180, borderRadius: 12, background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite' }} />
      ))}
    </div>
  );
}

function EmptyCard({ onAdd, label }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', background: '#111118', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)' }}>
      <p style={{ color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>No {label}s yet.</p>
      <button onClick={onAdd} className="admin-btn admin-btn--primary"><Plus size={15} /> Add First</button>
    </div>
  );
}
