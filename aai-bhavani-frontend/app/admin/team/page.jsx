'use client';

import { useCallback, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Modal, { ConfirmModal } from '../_components/Modal';
import FormField, { Input, Textarea, Toggle, FieldRow, FieldSection } from '../_components/FormField';
import { useToast } from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const EMPTY_FORM = {
  name: '', designation: '', description: '',
  facebook: '', instagram: '', linkedin: '',
  order: 0, is_active: true,
};

function initials(name) {
  return (name || '?').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export default function TeamPage() {
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
      const res  = await fetch(`${API}/api/team/`);
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
    if (!form.name.trim())        errs.name        = 'Required';
    if (!form.designation.trim()) errs.designation = 'Required';
    return errs;
  }

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      const isEdit = !!form.id;
      const url    = isEdit ? `${API}/api/team/${form.id}/` : `${API}/api/team/`;
      const method = isEdit ? 'PATCH' : 'POST';
      const res    = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast(isEdit ? 'Member updated' : 'Member added', 'success');
      setModal(false);
      load();
    } catch { toast('Failed to save', 'error'); }
    finally  { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch(`${API}/api/team/${deleteTarget.id}/`, { method: 'DELETE' });
      toast('Member deleted', 'success');
      setDeleteTarget(null);
      load();
    } catch { toast('Failed to delete', 'error'); }
    finally  { setDeleting(false); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Team</h2>
          <p className="admin-page-sub">{data.length} members</p>
        </div>
        <button onClick={openAdd} className="admin-btn admin-btn--primary">
          <Plus size={15} /> Add Member
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {[1,2,3].map(i => <div key={i} style={{ height: 160, borderRadius: 12, background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite' }} />)}
        </div>
      ) : data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#111118', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>No team members yet.</p>
          <button onClick={openAdd} className="admin-btn admin-btn--primary"><Plus size={15} /> Add First Member</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {data.map(member => (
            <div key={member.id} style={{
              background: '#111118', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12, padding: '18px',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              {/* Avatar + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {member.photo ? (
                  <img src={member.photo} alt={member.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(167,139,250,0.15)',
                    border: '1px solid rgba(167,139,250,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.82rem', fontWeight: 700, color: '#a78bfa',
                  }}>
                    {initials(member.name)}
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: '#e0e0e8' }}>{member.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.76rem', color: '#f5c24c', opacity: 0.8 }}>{member.designation}</p>
                </div>
              </div>

              {/* Bio */}
              {member.description && (
                <p style={{
                  margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.6, flex: 1,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {member.description}
                </p>
              )}

              {/* Social chips */}
              {(member.instagram || member.linkedin || member.facebook) && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Instagram</a>}
                  {member.linkedin  && <a href={member.linkedin}  target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>LinkedIn</a>}
                  {member.facebook  && <a href={member.facebook}  target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Facebook</a>}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
                <button onClick={() => openEdit(member)} className="admin-btn admin-btn--ghost admin-btn--sm" style={{ flex: 1, justifyContent: 'center' }}>
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => setDeleteTarget(member)} className="admin-btn admin-btn--danger admin-btn--sm">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={form.id ? 'Edit Member' : 'Add Team Member'} maxWidth={520}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <FieldSection title="Basic Info">
            <FieldRow>
              <FormField label="Name" required error={errors.name}>
                <Input value={form.name} onChange={set('name')} placeholder="Dhaval Mahajan" error={errors.name} />
              </FormField>
              <FormField label="Designation" required error={errors.designation}>
                <Input value={form.designation} onChange={set('designation')} placeholder="Founder" error={errors.designation} />
              </FormField>
            </FieldRow>
            <FormField label="Bio / Description">
              <Textarea rows={3} value={form.description} onChange={set('description')} placeholder="Short description about the team member…" />
            </FormField>
          </FieldSection>

          <FieldSection title="Social Links (optional)">
            <FormField label="Instagram URL">
              <Input value={form.instagram} onChange={set('instagram')} placeholder="https://instagram.com/…" />
            </FormField>
            <FormField label="LinkedIn URL">
              <Input value={form.linkedin} onChange={set('linkedin')} placeholder="https://linkedin.com/in/…" />
            </FormField>
            <FormField label="Facebook URL">
              <Input value={form.facebook} onChange={set('facebook')} placeholder="https://facebook.com/…" />
            </FormField>
          </FieldSection>

          <FieldRow>
            <FormField label="Order">
              <Input type="number" value={form.order} onChange={set('order')} min={0} />
            </FormField>
            <FormField label="Visibility" style={{ justifyContent: 'flex-end' }}>
              <div style={{ paddingTop: 8 }}>
                <Toggle id="tm-active" checked={form.is_active} onChange={setToggle('is_active')} label="Active" />
              </div>
            </FormField>
          </FieldRow>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button onClick={() => setModal(false)} className="admin-btn admin-btn--ghost">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn--primary">
              {saving ? 'Saving…' : form.id ? 'Update' : 'Add Member'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} itemName={deleteTarget?.name} loading={deleting} />
    </div>
  );
}
