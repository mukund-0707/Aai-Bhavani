'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import FormField, { Input, Textarea, FieldRow, FieldSection } from '../_components/FormField';
import { useToast } from '../_components/Toast';
import { adminFetch } from '../../../lib/auth';

const TABS = ['General', 'Social Media', 'Hero Section'];

const EMPTY = {
  site_name: '', site_tagline: '',
  phone: '', whatsapp: '', email: '', address: '', google_map_url: '', working_hours: '',
  facebook_url: '', instagram_url: '', linkedin_url: '', youtube_url: '',
  hero_title: '', hero_subtitle: '', hero_description: '', hero_button_text: '', hero_button_link: '',
};

export default function SiteSettingsPage() {
  const toast = useToast();
  const [tab,     setTab]     = useState(0);
  const [form,    setForm]    = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  /* Load existing settings */
  useEffect(() => {
    adminFetch(`/api/site-settings/`)
      .then(data => {
        setForm(prev => ({ ...prev, ...data }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminFetch(`/api/site-settings/`, {
        method:  'PATCH',
        body:    JSON.stringify(form),
      });
      toast('Settings saved successfully', 'success');
    } catch {
      toast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PageSkeleton />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 720 }}>

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Site Settings</h2>
          <p className="admin-page-sub">Manage your site info, contact details and hero content.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn--primary">
          <Save size={15} />
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 0 }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '9px 16px',
              fontSize: '0.85rem', fontWeight: tab === i ? 600 : 400,
              color: tab === i ? '#f5c24c' : 'rgba(255,255,255,0.4)',
              borderBottom: tab === i ? '2px solid #f5c24c' : '2px solid transparent',
              marginBottom: -1,
              transition: 'all 0.15s',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* ── Tab 0: General ── */}
        {tab === 0 && (
          <>
            <FieldSection title="Brand">
              <FieldRow>
                <FormField label="Site Name" required>
                  <Input value={form.site_name} onChange={set('site_name')} placeholder="Aai Bhavani Consultant" />
                </FormField>
                <FormField label="Tagline">
                  <Input value={form.site_tagline} onChange={set('site_tagline')} placeholder="Your trusted partner" />
                </FormField>
              </FieldRow>
            </FieldSection>

            <FieldSection title="Contact">
              <FieldRow>
                <FormField label="Phone">
                  <Input value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" />
                </FormField>
                <FormField label="WhatsApp" hint="With country code, no + (e.g. 919876543210)">
                  <Input value={form.whatsapp} onChange={set('whatsapp')} placeholder="919876543210" />
                </FormField>
              </FieldRow>
              <FormField label="Email">
                <Input type="email" value={form.email} onChange={set('email')} placeholder="info@aaibhavani.com" />
              </FormField>
              <FormField label="Address">
                <Textarea rows={2} value={form.address} onChange={set('address')} placeholder="Surat, Gujarat, India" />
              </FormField>
              <FieldRow>
                <FormField label="Working Hours">
                  <Input value={form.working_hours} onChange={set('working_hours')} placeholder="Mon–Sat: 9am – 7pm" />
                </FormField>
                <FormField label="Google Map URL">
                  <Input value={form.google_map_url} onChange={set('google_map_url')} placeholder="https://maps.google.com/…" />
                </FormField>
              </FieldRow>
            </FieldSection>
          </>
        )}

        {/* ── Tab 1: Social ── */}
        {tab === 1 && (
          <FieldSection title="Social Media Links">
            <FormField label="Facebook URL">
              <Input value={form.facebook_url} onChange={set('facebook_url')} placeholder="https://facebook.com/aaibhavani" />
            </FormField>
            <FormField label="Instagram URL">
              <Input value={form.instagram_url} onChange={set('instagram_url')} placeholder="https://instagram.com/aaibhavani" />
            </FormField>
            <FormField label="LinkedIn URL">
              <Input value={form.linkedin_url} onChange={set('linkedin_url')} placeholder="https://linkedin.com/company/aaibhavani" />
            </FormField>
            <FormField label="YouTube URL">
              <Input value={form.youtube_url} onChange={set('youtube_url')} placeholder="https://youtube.com/@aaibhavani" />
            </FormField>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)', margin: '4px 0 0' }}>
              Leave blank to hide the icon on the website footer.
            </p>
          </FieldSection>
        )}

        {/* ── Tab 2: Hero ── */}
        {tab === 2 && (
          <>
            <FieldSection title="Hero Text">
              <FormField label="Hero Title">
                <Input value={form.hero_title} onChange={set('hero_title')} placeholder="Find it. Finance it. Design it." />
              </FormField>
              <FormField label="Hero Subtitle">
                <Input value={form.hero_subtitle} onChange={set('hero_subtitle')} placeholder="Property Consulting | Interior Design | Home Loan" />
              </FormField>
              <FormField label="Hero Description">
                <Textarea rows={3} value={form.hero_description} onChange={set('hero_description')} placeholder="Trusted expertise brought together under one roof." />
              </FormField>
            </FieldSection>

            <FieldSection title="Hero Button">
              <FieldRow>
                <FormField label="Button Text">
                  <Input value={form.hero_button_text} onChange={set('hero_button_text')} placeholder="Talk to an Expert" />
                </FormField>
                <FormField label="Button Link">
                  <Input value={form.hero_button_link} onChange={set('hero_button_link')} placeholder="#contact" />
                </FormField>
              </FieldRow>
            </FieldSection>

            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)', margin: '4px 0 0' }}>
              Note: Hero video and image uploads are managed via the Django admin panel.
            </p>
          </>
        )}

        {/* Save at bottom too */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn--primary">
            <Save size={15} />
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
      {[100, 60, 80, 60, 80].map((w, i) => (
        <div key={i} style={{ height: 36, width: `${w}%`, borderRadius: 8, background: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s infinite' }} />
      ))}
    </div>
  );
}
