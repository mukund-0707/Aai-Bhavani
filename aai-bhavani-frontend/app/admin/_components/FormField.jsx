'use client';

/* ── Reusable admin form field ──────────────────────────────────────── */

const labelStyle = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.5)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom: 7,
};

const baseInput = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '9px 12px',
  color: '#f0f0f5',
  fontSize: '0.88rem',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  boxSizing: 'border-box',
};

const errorStyle = {
  fontSize: '0.75rem',
  color: '#ef4444',
  marginTop: 5,
};

/* Single field wrapper */
export default function FormField({ label, error, hint, required, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {label && (
        <label style={labelStyle}>
          {label}{required && <span style={{ color: '#f5c24c', marginLeft: 3 }}>*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.3)', marginTop: 5 }}>{hint}</span>
      )}
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}

/* ── Input ── */
export function Input({ error, ...props }) {
  const style = {
    ...baseInput,
    borderColor: error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)',
  };
  return (
    <input
      style={style}
      onFocus={e => { e.target.style.borderColor = '#f5c24c'; e.target.style.background = 'rgba(245,194,76,0.04)'; }}
      onBlur={e => { e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
      {...props}
    />
  );
}

/* ── Textarea ── */
export function Textarea({ error, rows = 4, ...props }) {
  const style = {
    ...baseInput,
    resize: 'vertical',
    minHeight: rows * 24,
    borderColor: error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)',
    fontFamily: 'inherit',
    lineHeight: 1.6,
  };
  return (
    <textarea
      rows={rows}
      style={style}
      onFocus={e => { e.target.style.borderColor = '#f5c24c'; e.target.style.background = 'rgba(245,194,76,0.04)'; }}
      onBlur={e => { e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
      {...props}
    />
  );
}

/* ── Select ── */
export function Select({ error, children, ...props }) {
  const style = {
    ...baseInput,
    cursor: 'pointer',
    borderColor: error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: 36,
  };
  return (
    <select
      style={style}
      onFocus={e => { e.target.style.borderColor = '#f5c24c'; }}
      onBlur={e => { e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'; }}
      {...props}
    >
      {children}
    </select>
  );
}

/* ── Toggle ── */
export function Toggle({ checked, onChange, label, id }) {
  return (
    <label
      htmlFor={id}
      style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
    >
      <div style={{ position: 'relative', width: 40, height: 22, flexShrink: 0 }}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
        />
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          background: checked ? '#f5c24c' : 'rgba(255,255,255,0.12)',
          transition: 'background 0.2s',
        }} />
        <div style={{
          position: 'absolute', top: 3, left: checked ? 21 : 3,
          width: 16, height: 16, borderRadius: '50%',
          background: checked ? '#0a0a0f' : 'rgba(255,255,255,0.6)',
          transition: 'left 0.2s, background 0.2s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }} />
      </div>
      {label && <span style={{ fontSize: '0.87rem', color: 'rgba(255,255,255,0.7)' }}>{label}</span>}
    </label>
  );
}

/* ── Star Rating ── */
export function StarRating({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 2,
            color: n <= value ? '#f5c24c' : 'rgba(255,255,255,0.15)',
            fontSize: '1.4rem', transition: 'color 0.15s, transform 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/* ── Form row (2 cols) ── */
export function FieldRow({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      {children}
    </div>
  );
}

/* ── Section divider ── */
export function FieldSection({ title, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <p style={{
        fontSize: '0.72rem', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: '#f5c24c', margin: 0,
        paddingBottom: 8,
        borderBottom: '1px solid rgba(245,194,76,0.15)',
      }}>{title}</p>
      {children}
    </div>
  );
}
