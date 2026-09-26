/* ═══════════════════════════════════════════════════════════════════════
   siteData.js — Helper functions only.
   All static data removed — everything now comes from the API.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Helper: referral label ─────────────────────────────────────────── */
export function referralLabel(service) {
  if (!service.is_referral_enabled) return '';
  const val = parseFloat(service.referral_value);
  return service.referral_type === 'percent'
    ? `${val % 1 === 0 ? val : val.toFixed(2)}% profit share`
    : `Flat ₹${val.toLocaleString('en-IN')}`;
}

/* ── Helper: format property price ─────────────────────────────────── */
export function formatPrice(prop) {
  const { price, type } = prop;
  const fmt = (n) => {
    if (n >= 1e7) return `₹${+(n / 1e7).toFixed(2)} Cr`;
    if (n >= 1e5) return `₹${+(n / 1e5).toFixed(2)} Lakh`;
    return `₹${n.toLocaleString('en-IN')}`;
  };
  return type === 'rent' ? `${fmt(price)} / mo` : fmt(price);
}
