'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Save, Trash2, Plus, X,
  Upload, Star, ImageOff, CheckCircle2,
} from 'lucide-react';
import FormField, {
  Input, Textarea, Select, Toggle, FieldRow, FieldSection,
} from '../../_components/FormField';
import { ConfirmModal } from '../../_components/Modal';
import { useToast } from '../../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

/* ── Default form state ──────────────────────────────────────────── */
const EMPTY = {
  title:        '',
  type:         'sell',
  category:     'residential',
  price:        '',
  city:         '',
  area:         '',
  address:      '',
  builder_name: '',
  description:  '',
  amenities:    [],
  is_featured:  false,
  is_active:    true,
};

/* ── Amenity presets for quick-add chips ─────────────────────────── */
const AMENITY_PRESETS = [
  'Parking', 'Gym', 'Swimming Pool', 'Lift', 'Security',
  'Power Backup', 'Garden', 'Club House', 'CCTV', 'Intercom',
  'Modular Kitchen', 'Vastu Compliant', 'Near Metro', 'Near School',
];

/* ─────────────────────────────────────────────────────────────────── */
export default function PropertyFormPage() {
  const router    = useRouter();
  const { id }    = useParams();
  const isNew     = id === 'new';
  const toast     = useToast();
  const fileRef   = useRef(null);

  /* Form state */
  const [form,        setForm]        = useState(EMPTY);
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(!isNew);
  const [saving,      setSaving]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting,    setDeleting]    = useState(false);

  /* Amenity input state */
  const [amenityInput, setAmenityInput] = useState('');

  /* Images state */
  const [images,       setImages]       = useState([]);   // [{id, image, is_primary, alt_text, order}]
  const [uploading,    setUploading]    = useState(false);
  const [deletingImgId, setDeletingImgId] = useState(null);

  /* ── Load existing property ────────────────────────────────────── */
  useEffect(() => {
    if (isNew) return;
    fetch(`${API}/api/properties/${id}/`)
      .then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(data => {
        const { images: imgs, ...rest } = data;
        setForm(prev => ({ ...prev, ...rest, amenities: rest.amenities ?? [] }));
        setImages(imgs ?? []);
      })
      .catch(() => toast('Failed to load property', 'error'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  /* ── Field helpers ─────────────────────────────────────────────── */
  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(prev => { const x = { ...prev }; delete x[k]; return x; });
  };
  const setToggle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.checked }));

  /* ── Amenities ─────────────────────────────────────────────────── */
  const addAmenity = (val) => {
    const trimmed = val.trim();
    if (!trimmed) return;
    if (form.amenities.map(a => a.toLowerCase()).includes(trimmed.toLowerCase())) return;
    setForm(f => ({ ...f, amenities: [...f.amenities, trimmed] }));
    setAmenityInput('');
  };
  const removeAmenity = (idx) => {
    setForm(f => ({ ...f, amenities: f.amenities.filter((_, i) => i !== idx) }));
  };
  const handleAmenityKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addAmenity(amenityInput);
    }
  };

  /* ── Validation ────────────────────────────────────────────────── */
  function validate() {
    const errs = {};
    if (!form.title.trim())    errs.title    = 'Required';
    if (!form.city.trim())     errs.city     = 'Required';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      errs.price = 'Enter a valid price';
    return errs;
  }

  /* ── Save property ─────────────────────────────────────────────── */
  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    try {
      const url    = isNew ? `${API}/api/properties/` : `${API}/api/properties/${id}/`;
      const method = isNew ? 'POST' : 'PATCH';
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...form,
          price: String(form.price),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data && typeof data === 'object') setErrors(data);
        throw new Error();
      }
      const saved = await res.json();
      toast(isNew ? 'Property created!' : 'Property saved!', 'success');
      if (isNew) {
        // Redirect to edit page so images can be uploaded
        router.replace(`/admin/properties/${saved.id}`);
      }
    } catch {
      if (!Object.keys(errors).length) toast('Failed to save property', 'error');
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete property ───────────────────────────────────────────── */
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`${API}/api/properties/${id}/`, { method: 'DELETE' });
      toast('Property deleted', 'success');
      router.push('/admin/properties');
    } catch {
      toast('Failed to delete', 'error');
    } finally {
      setDeleting(false);
    }
  };

  /* ── Image upload ──────────────────────────────────────────────── */
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    if (isNew) {
      toast('Save property first, then upload images', 'error');
      return;
    }
    setUploading(true);
    let successCount = 0;
    for (const file of files) {
      try {
        const fd = new FormData();
        fd.append('image', file);
        fd.append('order', String(images.length + successCount));
        const res = await fetch(`${API}/api/properties/${id}/images/`, {
          method: 'POST',
          body:   fd,
        });
        if (!res.ok) throw new Error();
        const newImg = await res.json();
        setImages(prev => [...prev, newImg]);
        successCount++;
      } catch {
        toast(`Failed to upload ${file.name}`, 'error');
      }
    }
    if (successCount > 0) toast(`${successCount} image${successCount > 1 ? 's' : ''} uploaded`, 'success');
    setUploading(false);
    // Reset file input so same file can be re-uploaded if needed
    if (fileRef.current) fileRef.current.value = '';
  };

  /* ── Set primary image ─────────────────────────────────────────── */
  const handleSetPrimary = async (imgId) => {
    try {
      const res = await fetch(`${API}/api/properties/${id}/images/${imgId}/set_primary/`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error();
      setImages(prev => prev.map(img => ({ ...img, is_primary: img.id === imgId })));
      toast('Primary image set', 'success');
    } catch {
      toast('Failed to set primary', 'error');
    }
  };

  /* ── Delete image ──────────────────────────────────────────────── */
  const handleDeleteImage = async (imgId) => {
    setDeletingImgId(imgId);
    try {
      const res = await fetch(`${API}/api/properties/${id}/images/${imgId}/`, {
        method: 'DELETE',
      });
      if (!res.ok && res.status !== 204) throw new Error();
      setImages(prev => prev.filter(img => img.id !== imgId));
      toast('Image deleted', 'success');
    } catch {
      toast('Failed to delete image', 'error');
    } finally {
      setDeletingImgId(null);
    }
  };

  /* ── Loading skeleton ──────────────────────────────────────────── */
  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 760 }}>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} style={{
          height: i === 1 ? 48 : 40,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.06)',
          animation: 'pulse 1.5s infinite',
          width: i % 2 === 0 ? '65%' : '100%',
        }} />
      ))}
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════ */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 760 }}>

      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            href="/admin/properties"
            style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f0f0f5'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="admin-page-title">
              {isNew ? 'Add Property' : (form.title || 'Edit Property')}
            </h2>
            <p className="admin-page-sub">
              {isNew ? 'Fill in details, save — then upload images.' : `ID: ${id} · ${images.length} image${images.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {!isNew && (
            <button onClick={() => setShowConfirm(true)} className="admin-btn admin-btn--danger">
              <Trash2 size={14} /> Delete
            </button>
          )}
          <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn--primary">
            <Save size={15} />
            {saving ? 'Saving…' : isNew ? 'Create Property' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* ── Main Form Card ── */}
      <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* Basic Info */}
        <FieldSection title="Basic Info">
          <FormField label="Title" required error={errors.title}>
            <Input
              value={form.title}
              onChange={set('title')}
              placeholder="3BHK Luxury Apartment in Adajan"
              error={errors.title}
            />
          </FormField>

          <FieldRow>
            <FormField label="Type" required>
              <Select value={form.type} onChange={set('type')}>
                <option value="sell">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="both">Sale &amp; Rent</option>
              </Select>
            </FormField>
            <FormField label="Category" required>
              <Select value={form.category} onChange={set('category')}>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="plot">Plot</option>
              </Select>
            </FormField>
          </FieldRow>

          <FormField label="Price (₹)" required error={errors.price}>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem', pointerEvents: 'none',
              }}>₹</span>
              <Input
                type="number"
                value={form.price}
                onChange={set('price')}
                placeholder="5000000"
                style={{ paddingLeft: 24 }}
                error={errors.price}
                min={0}
              />
            </div>
            {form.price && !isNaN(Number(form.price)) && Number(form.price) > 0 && (
              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                = {formatPriceHuman(form.price)}
              </span>
            )}
          </FormField>
        </FieldSection>

        {/* Location */}
        <FieldSection title="Location">
          <FieldRow>
            <FormField label="City" required error={errors.city}>
              <Input
                value={form.city}
                onChange={set('city')}
                placeholder="Surat"
                error={errors.city}
              />
            </FormField>
            <FormField label="Area / Locality">
              <Input
                value={form.area}
                onChange={set('area')}
                placeholder="Adajan"
              />
            </FormField>
          </FieldRow>

          <FormField label="Full Address">
            <Textarea
              rows={2}
              value={form.address}
              onChange={set('address')}
              placeholder="Plot no. 12, Near XYZ Mall, Adajan, Surat — 395009"
            />
          </FormField>

          <FormField label="Builder / Developer Name">
            <Input
              value={form.builder_name}
              onChange={set('builder_name')}
              placeholder="Rajhans Constructions"
            />
          </FormField>
        </FieldSection>

        {/* Description */}
        <FieldSection title="Description">
          <FormField label="Property Description" hint="Shown on property detail page">
            <Textarea
              rows={5}
              value={form.description}
              onChange={set('description')}
              placeholder="Spacious 3BHK apartment with premium fittings, east-facing, Vastu compliant…"
            />
          </FormField>
        </FieldSection>

        {/* Amenities */}
        <FieldSection title="Amenities">
          {/* Tag chips */}
          {form.amenities.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
              {form.amenities.map((a, idx) => (
                <span key={idx} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '4px 10px',
                  borderRadius: 99,
                  background: 'rgba(245,194,76,0.1)',
                  border: '1px solid rgba(245,194,76,0.2)',
                  color: '#f5c24c',
                  fontSize: '0.8rem', fontWeight: 500,
                }}>
                  {a}
                  <button
                    type="button"
                    onClick={() => removeAmenity(idx)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(245,194,76,0.6)', padding: 0, display: 'flex',
                      lineHeight: 1,
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f5c24c'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,194,76,0.6)'}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Input to add new amenity */}
          <FormField hint="Press Enter or comma to add">
            <div style={{ display: 'flex', gap: 8 }}>
              <Input
                value={amenityInput}
                onChange={e => setAmenityInput(e.target.value)}
                onKeyDown={handleAmenityKey}
                placeholder="Type amenity and press Enter…"
              />
              <button
                type="button"
                onClick={() => addAmenity(amenityInput)}
                className="admin-btn admin-btn--ghost"
                style={{ flexShrink: 0, paddingLeft: 12, paddingRight: 12 }}
              >
                <Plus size={15} />
              </button>
            </div>
          </FormField>

          {/* Quick-add presets */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', alignSelf: 'center', marginRight: 2 }}>
              Quick add:
            </span>
            {AMENITY_PRESETS.map(preset => {
              const alreadyAdded = form.amenities.map(a => a.toLowerCase()).includes(preset.toLowerCase());
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => addAmenity(preset)}
                  disabled={alreadyAdded}
                  className="admin-btn admin-btn--ghost admin-btn--sm"
                  style={{
                    opacity:     alreadyAdded ? 0.35 : 1,
                    cursor:      alreadyAdded ? 'default' : 'pointer',
                    fontSize:    '0.74rem',
                    padding:     '3px 9px',
                  }}
                >
                  {alreadyAdded ? '✓ ' : '+ '}{preset}
                </button>
              );
            })}
          </div>
        </FieldSection>

        {/* Toggles */}
        <FieldSection title="Visibility">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Toggle
              id="prop-featured"
              checked={form.is_featured}
              onChange={setToggle('is_featured')}
              label="Featured property (highlighted on homepage)"
            />
            <Toggle
              id="prop-active"
              checked={form.is_active}
              onChange={setToggle('is_active')}
              label="Active (visible on website)"
            />
          </div>
        </FieldSection>

        {/* Bottom save */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn--primary">
            <Save size={15} />
            {saving ? 'Saving…' : isNew ? 'Create Property' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* ── Images Section ── */}
      <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f5c24c' }}>
              Images
            </p>
            <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
              {isNew
                ? 'Save property first, then upload images.'
                : `${images.length} image${images.length !== 1 ? 's' : ''} · Click star to set primary`}
            </p>
          </div>
          {!isNew && (
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="admin-btn admin-btn--ghost"
              style={{ gap: 7 }}
            >
              <Upload size={15} />
              {uploading ? 'Uploading…' : 'Upload Images'}
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>

        {isNew ? (
          /* New property — prompt to save first */
          <div style={{
            padding: '32px 20px', borderRadius: 10,
            background: 'rgba(245,194,76,0.05)',
            border: '1px dashed rgba(245,194,76,0.2)',
            textAlign: 'center',
          }}>
            <Upload size={28} style={{ color: 'rgba(255,255,255,0.15)', marginBottom: 10 }} />
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
              Create the property first — then come back to upload images.
            </p>
          </div>
        ) : images.length === 0 ? (
          /* No images yet */
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              padding: '40px 20px', borderRadius: 10,
              background: 'rgba(255,255,255,0.02)',
              border: '2px dashed rgba(255,255,255,0.08)',
              textAlign: 'center', cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,194,76,0.3)'; e.currentTarget.style.background = 'rgba(245,194,76,0.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
          >
            <ImageOff size={32} style={{ color: 'rgba(255,255,255,0.15)', marginBottom: 10 }} />
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
              No images yet. Click to upload.
            </p>
            <p style={{ margin: '5px 0 0', color: 'rgba(255,255,255,0.15)', fontSize: '0.76rem' }}>
              JPG, PNG, WebP — multiple files supported
            </p>
          </div>
        ) : (
          /* Image grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {images.map(img => (
              <ImageCard
                key={img.id}
                img={img}
                onSetPrimary={() => handleSetPrimary(img.id)}
                onDelete={() => handleDeleteImage(img.id)}
                deleting={deletingImgId === img.id}
              />
            ))}
            {/* Upload more tile */}
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                minHeight: 140, borderRadius: 10,
                border: '2px dashed rgba(255,255,255,0.08)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 6, cursor: 'pointer',
                color: 'rgba(255,255,255,0.2)',
                fontSize: '0.78rem',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,194,76,0.3)'; e.currentTarget.style.color = '#f5c24c'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.2)'; }}
            >
              <Plus size={22} />
              Add More
            </div>
          </div>
        )}

        {uploading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f5c24c', fontSize: '0.82rem' }}>
            <span style={{ width: 16, height: 16, border: '2px solid rgba(245,194,76,0.3)', borderTopColor: '#f5c24c', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
            Uploading images…
          </div>
        )}
      </div>

      {/* ── Delete confirm ── */}
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

/* ── Single image card ─────────────────────────────────────────────── */
function ImageCard({ img, onSetPrimary, onDelete, deleting }) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 10,
      overflow: 'hidden',
      background: '#0d0d14',
      border: img.is_primary
        ? '2px solid rgba(245,194,76,0.6)'
        : '1px solid rgba(255,255,255,0.08)',
      minHeight: 140,
    }}>
      {/* Image */}
      <img
        src={img.image}
        alt={img.alt_text || 'property'}
        style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
      />

      {/* Primary badge */}
      {img.is_primary && (
        <div style={{
          position: 'absolute', top: 7, left: 7,
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '3px 8px', borderRadius: 99,
          background: 'rgba(245,194,76,0.9)',
          color: '#0a0807',
          fontSize: '0.65rem', fontWeight: 700,
          letterSpacing: '0.04em',
        }}>
          <Star size={10} fill="currentColor" /> PRIMARY
        </div>
      )}

      {/* Action overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: '8px 8px',
        opacity: 0,
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
      onMouseLeave={e => e.currentTarget.style.opacity = '0'}
      >
        {/* Set primary */}
        {!img.is_primary && (
          <button
            onClick={onSetPrimary}
            style={{
              background: 'rgba(245,194,76,0.9)', border: 'none', borderRadius: 7,
              width: 30, height: 30,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#0a0807',
              transition: 'transform 0.1s',
            }}
            title="Set as primary"
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Star size={14} />
          </button>
        )}
        {img.is_primary && (
          <div style={{
            background: 'rgba(245,194,76,0.3)', borderRadius: 7,
            width: 30, height: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#f5c24c',
          }}>
            <CheckCircle2 size={14} />
          </div>
        )}

        {/* Delete */}
        <button
          onClick={onDelete}
          disabled={deleting}
          style={{
            background: deleting ? 'rgba(239,68,68,0.5)' : 'rgba(239,68,68,0.85)',
            border: 'none', borderRadius: 7,
            width: 30, height: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: deleting ? 'not-allowed' : 'pointer',
            color: '#fff',
            transition: 'transform 0.1s',
          }}
          title="Delete image"
          onMouseEnter={e => { if (!deleting) e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {deleting
            ? <span style={{ width: 12, height: 12, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
            : <Trash2 size={14} />
          }
        </button>
      </div>
    </div>
  );
}

/* ── Price human format ─────────────────────────────────────────────── */
function formatPriceHuman(price) {
  const n = parseFloat(price);
  if (isNaN(n)) return '';
  if (n >= 1e7) return `₹${+(n / 1e7).toFixed(2)} Crore`;
  if (n >= 1e5) return `₹${+(n / 1e5).toFixed(2)} Lakh`;
  return `₹${n.toLocaleString('en-IN')}`;
}
