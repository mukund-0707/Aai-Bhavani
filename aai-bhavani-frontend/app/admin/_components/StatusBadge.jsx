'use client';

/* ── Status color map ── */
const INQUIRY_COLORS = {
  new:         { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: 'rgba(59,130,246,0.25)' },
  contacted:   { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: 'rgba(245,158,11,0.25)' },
  in_progress: { bg: 'rgba(249,115,22,0.15)', color: '#fb923c', border: 'rgba(249,115,22,0.25)' },
  closed:      { bg: 'rgba(34,197,94,0.15)',  color: '#4ade80', border: 'rgba(34,197,94,0.25)'  },
};

const REFERRAL_COLORS = {
  pending:   { bg: 'rgba(59,130,246,0.15)',  color: '#60a5fa', border: 'rgba(59,130,246,0.25)'  },
  converted: { bg: 'rgba(245,158,11,0.15)',  color: '#fbbf24', border: 'rgba(245,158,11,0.25)'  },
  paid:      { bg: 'rgba(34,197,94,0.15)',   color: '#4ade80', border: 'rgba(34,197,94,0.25)'   },
  cancelled: { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)', border: 'rgba(255,255,255,0.1)' },
};

/* ── Badge labels ── */
const LABELS = {
  new: 'New', contacted: 'Contacted', in_progress: 'In Progress', closed: 'Closed',
  pending: 'Pending', converted: 'Converted', paid: 'Paid', cancelled: 'Cancelled',
};

export default function StatusBadge({ status, type = 'inquiry' }) {
  const map = type === 'referral' ? REFERRAL_COLORS : INQUIRY_COLORS;
  const c   = map[status] ?? { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: 'rgba(255,255,255,0.1)' };
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 999,
      fontSize: '0.72rem',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'capitalize',
      background: c.bg,
      color: c.color,
      border: `1px solid ${c.border}`,
      whiteSpace: 'nowrap',
    }}>
      {LABELS[status] ?? status}
    </span>
  );
}
