'use client';

import { useCallback, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Modal, { ConfirmModal } from '../_components/Modal';
import FormField, { Input, Textarea, Toggle, FieldRow } from '../_components/FormField';
import { useToast } from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const EMPTY_FORM = {
  question: '', answer: '', order: 0, is_active: true,
};

export default function FAQsPage() {
  const toast = useToast();

  const [data,         setData]         = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [modal,        setModal]        = useState(false);
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [errors,       setErrors]       = useState({});
  const [saving,       setSaving]       = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting,     setDeleting]     = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/faqs/`);
      const json = await res.json();
      setData(json.results ?? json ?? []);
    } catch { setData([]); }
    finally  { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd  = ()     => { setForm(EMPTY_FORM); setErrors({}); setModal(true); };
  const openEdit = (item) => { setForm({ ...EMPTY_FORM, ...item }); setErrors({}); setModal(true); };

  const set       = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const setToggle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.checked }));

  function validate() {
    const errs = {};
    if (!form.question.trim()) errs.question = 'Required';
    if (!form.answer.trim())   errs.answer   = 'Required';
    return errs;
  }

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      const isEdit = !!form.id;
      const url    = isEdit ? `${API}/api/faqs/${form.id}/` : `${API}/api/faqs/`;
      const method = isEdit ? 'PATCH' : 'POST';
      const res    = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast(isEdit ? 'FAQ updated' : 'FAQ added', 'success');
      setModal(false);
      load();
    } catch { toast('Failed to save', 'error'); }
    finally  { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch(`${API}/api/faqs/${deleteTarget.id}/`, { method: 'DELETE' });
      toast('FAQ deleted', 'success');
      setDeleteTarget(null);
      load();
    } catch { toast('Failed to delete', 'error'); }
    finally  { setDeleting(false); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">FAQs</h2>
          <p className="admin-page-sub">{data.length} questions</p>
        </div>
        <button onClick={openAdd} className="admin-btn admin-btn--primary">
          <Plus size={15} /> Add FAQ
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ height: 64, borderRadius: 10, background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#111118', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>No FAQs yet.</p>
          <button onClick={openAdd} className="admin-btn admin-btn--primary"><Plus size={15} /> Add First FAQ</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.map((faq, i) => (
            <div
              key={faq.id}
              style={{
                background: '#111118', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 10, padding: '14px 18px',
                display: 'flex', alignItems: 'flex-start', gap: 14,
              }}
            >
              {/* Order num */}
              <span style={{
                flexShrink: 0, width: 24, height: 24, borderRadius: 6,
                background: 'rgba(245,194,76,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.72rem', fontWeight: 700, color: '#f5c24c',
              }}>
                {faq.order ?? i + 1}
              </span>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 600, color: '#e0e0e8', fontSize: '0.88rem', lineHeight: 1.4 }}>
                  {faq.question}
                </p>
                <p style={{
                  margin: '5px 0 0', fontSize: '0.79rem', color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.5,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {faq.answer}
                </p>
              </div>

              {/* Active badge */}
              <span style={{
                flexShrink: 0, padding: '3px 8px', borderRadius: 99, fontSize: '0.7rem', fontWeight: 600,
                background: faq.is_active ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)',
                color: faq.is_active ? '#4ade80' : 'rgba(255,255,255,0.3)',
                border: `1px solid ${faq.is_active ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)'}`,
              }}>
                {faq.is_active ? 'Active' : 'Hidden'}
              </span>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button onClick={() => openEdit(faq)} className="admin-btn admin-btn--ghost admin-btn--sm">
                  <Pencil size={13} />
                </button>
                <button onClick={() => setDeleteTarget(faq)} className="admin-btn admin-btn--danger admin-btn--sm">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={form.id ? 'Edit FAQ' : 'Add FAQ'} maxWidth={540}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <FormField label="Question" required error={errors.question}>
            <Input value={form.question} onChange={set('question')} placeholder="Is there any charge for property search?" error={errors.question} />
          </FormField>
          <FormField label="Answer" required error={errors.answer}>
            <Textarea rows={5} value={form.answer} onChange={set('answer')} placeholder="Detailed answer…" error={errors.answer} />
          </FormField>
          <FieldRow>
            <FormField label="Order" hint="Lower = appears first">
              <Input type="number" value={form.order} onChange={set('order')} min={0} />
            </FormField>
            <FormField label="Visibility" style={{ justifyContent: 'flex-end' }}>
              <div style={{ paddingTop: 8 }}>
                <Toggle id="faq-active" checked={form.is_active} onChange={setToggle('is_active')} label="Active" />
              </div>
            </FormField>
          </FieldRow>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button onClick={() => setModal(false)} className="admin-btn admin-btn--ghost">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn--primary">
              {saving ? 'Saving…' : form.id ? 'Update' : 'Add FAQ'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} itemName={deleteTarget?.question?.slice(0, 40) + '…'} loading={deleting} />
    </div>
  );
}
