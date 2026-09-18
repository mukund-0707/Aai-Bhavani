'use client';

export default function StatCard({ label, value, sub, icon: Icon, color = '#f5c24c' }) {
  return (
    <div style={{
      background: '#111118',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 12,
      padding: '20px 22px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 80, height: 80,
        background: `radial-gradient(circle, ${color}22, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Icon box */}
      {Icon && (
        <div style={{
          width: 42, height: 42, borderRadius: 10, flexShrink: 0,
          background: `${color}18`,
          border: `1px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color,
        }}>
          <Icon size={19} strokeWidth={1.8} />
        </div>
      )}

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
        <span style={{
          fontSize: '0.73rem', fontWeight: 600,
          letterSpacing: '0.07em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
        }}>{label}</span>
        <span style={{
          fontSize: '1.8rem', fontWeight: 800,
          letterSpacing: '-0.04em', color: '#f0f0f5', lineHeight: 1,
        }}>{value ?? '—'}</span>
        {sub && (
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{sub}</span>
        )}
      </div>
    </div>
  );
}
