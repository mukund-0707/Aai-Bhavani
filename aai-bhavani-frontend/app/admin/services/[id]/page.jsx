'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import FormField, { Input, Textarea, Select, Toggle, FieldRow, FieldSection } from '../../_components/FormField';
import { ConfirmModal } from '../../_components/Modal';
import { useToast } from '../../_components/Toast';
import { adminFetch } from '../../../../lib/auth';

const EMPTY = {
  title: '', slug: '', icon: 'home',
  short_description: '', long_description: '',
  order: 0, is_active: true,
  is_referral_enabled: false,
  referral_type: 'percent', referral_value: '', referral_note: '',
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function ServiceFormPage() {
  const router = useRouter();
  const { id } = useParams();
  const isNew  = id === 'new';
  const toast  = useToast();

  const [form,        setForm]        = useState(EMPTY);
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(!isNew);
  const [saving,      setSaving]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting,    setDeleting]    = useState(false);
  const [slugEdited,  setSlugEdited]  = useState(false);

  /* Load existing service */
  useEffect(() => {
    if (isNew) return;
    adminFetch(`/api/services/${id}/`)
      .then(data => {
        setForm(prev => ({ ...prev, ...data }));
        setSlugEdited(true); // slug already set — don't auto-regenerate
      })
      .catch(() => toast('Failed to load service', 'error'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = (k) => (e) => {
    const val = e.target ? e.target.value : e; // toggle passes boolean directly
    setForm(f => {
      const updated = { ...f, [k]: val };
      // Auto-generate slug from title if not manually edited
      if (k === 'title' && !slugEdited) {
        updated.slug = slugify(val);
      }
      return updated;
    });
    setErrors(prev => { const e = { ...prev }; delete e[k]; return e; });
  };

  const setToggle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.checked }));

  function validate() {
    const errs = {};
    if (!form.title.trim())             errs.title = 'Required';
    if (!form.slug.trim())              errs.slug  = 'Required';
    if (!form.short_description.trim()) errs.short_description = 'Required';
    return errs;
  }

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      const url    = isNew ? `/api/services/` : `/api/services/${form.slug}/`;
      const method = isNew ? 'POST' : 'PATCH';

      // Clean payload — referral_value must be a number or null, not empty string
      const payload = {
        ...form,
        referral_value: form.referral_value !== '' ? form.referral_value : '0',
      };

      await adminFetch(url, {
        method,
        body: JSON.stringify(payload),
      });
      toast(isNew ? 'Service created!' : 'Service updated!', 'success');
      router.push('/admin/services');
    } catch (err) {
      // Try to extract field errors from the thrown error
      try {
        const data = err?.data ?? (typeof err?.message === 'string' ? JSON.parse(err.message) : null);
        if (data && typeof data === 'object') {
          setErrors(data);
          return;
        }
      } catch {}
      if (!Object.keys(errors).length) toast('Failed to save service', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await adminFetch(`/api/services/${form.slug}/`, { method: 'DELETE' });
      toast('Service deleted', 'success');
      router.push('/admin/services');
    } catch {
      toast('Failed to delete service', 'error');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s infinite' }} />
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 720 }}>

      {/* Header */}
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/admin/services" style={{ color: 'rgba(255,255,255,0.4)', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f0f0f5'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="admin-page-title">{isNew ? 'Add Service' : `Edit: ${form.title}`}</h2>
            <p className="admin-page-sub">{isNew ? 'Fill in the details below.' : `Slug: /${form.slug}`}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {!isNew && (
            <button onClick={() => setShowConfirm(true)} className="admin-btn admin-btn--danger">
              <Trash2 size={14} /> Delete
            </button>
          )}
          <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn--primary">
            <Save size={15} /> {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

        <FieldSection title="Basic Info">
          <FormField label="Title" required error={errors.title}>
            <Input value={form.title} onChange={set('title')} placeholder="Property Consulting" error={errors.title} />
          </FormField>

          <FieldRow>
            <FormField label="Slug" required error={errors.slug} hint="Used in URL">
              <Input
                value={form.slug}
                onChange={e => { setSlugEdited(true); set('slug')(e); }}
                placeholder="property-consulting"
                error={errors.slug}
              />
            </FormField>
            <FormField label="Icon" hint="home / bank / palette / users / megaphone">
              <Select value={form.icon} onChange={set('icon')}>
                <option value="home">🏠 home</option>
                <option value="bank">🏦 bank</option>
                <option value="palette">🎨 palette</option>
                <option value="users">👥 users</option>
                <option value="megaphone">📣 megaphone</option>
              </Select>
            </FormField>
          </FieldRow>

          <FormField label="Short Description" required error={errors.short_description}>
            <Input value={form.short_description} onChange={set('short_description')} placeholder="Brief one-liner about this service" error={errors.short_description} />
          </FormField>

          <FormField label="Long Description" hint="Shown on service detail page">
            <Textarea rows={5} value={form.long_description} onChange={set('long_description')} placeholder="Full description…" />
          </FormField>

          <FieldRow>
            <FormField label="Order" hint="Lower number = shown first">
              <Input type="number" value={form.order} onChange={set('order')} min={0} />
            </FormField>
            <FormField label="Status" style={{ justifyContent: 'flex-end' }}>
              <div style={{ paddingTop: 8 }}>
                <Toggle id="svc-active" checked={form.is_active} onChange={setToggle('is_active')} label="Active (visible on site)" />
              </div>
            </FormField>
          </FieldRow>
        </FieldSection>

        {/* Referral settings */}
        <FieldSection title="Referral Settings">
          <Toggle
            id="svc-referral"
            checked={form.is_referral_enabled}
            onChange={setToggle('is_referral_enabled')}
            label="Enable referral commission for this service"
          />

          {form.is_referral_enabled && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 4 }}>
              <FieldRow>
                <FormField label="Commission Type">
                  <Select value={form.referral_type} onChange={set('referral_type')}>
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </Select>
                </FormField>
                <FormField
                  label={form.referral_type === 'percent' ? 'Percentage Value' : 'Flat Amount (₹)'}
                  hint={form.referral_type === 'percent' ? 'e.g. 50 for 50%' : 'e.g. 5000 for ₹5,000'}
                >
                  <Input
                    type="number"
                    value={form.referral_value}
                    onChange={set('referral_value')}
                    placeholder={form.referral_type === 'percent' ? '50' : '5000'}
                  />
                </FormField>
              </FieldRow>
              <FormField label="Referral Note" hint="e.g. Festival offer, Limited time">
                <Input value={form.referral_note} onChange={set('referral_note')} placeholder="Deal close hone par 50% profit share" />
              </FormField>
            </div>
          )}
        </FieldSection>

        {/* Bottom save */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn--primary">
            <Save size={15} /> {saving ? 'Saving…' : 'Save Service'}
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        itemName={form.title}
        loading={deleting}
      />
    </div>
  );
}
