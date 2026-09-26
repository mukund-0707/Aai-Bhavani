'use client';

/* ── Generic admin data table ─────────────────────────────────────── */

export default function DataTable({ columns, data, loading, emptyMsg = 'No records found.' }) {
  return (
    <div style={{
      background: '#111118',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          {/* Head */}
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {columns.map(col => (
                <th
                  key={col.key}
                  style={{
                    padding: '11px 16px',
                    textAlign: col.align ?? 'left',
                    fontSize: '0.72rem', fontWeight: 700,
                    letterSpacing: '0.07em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    whiteSpace: 'nowrap',
                    width: col.width,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  {columns.map(col => (
                    <td key={col.key} style={{ padding: '13px 16px' }}>
                      <div style={{
                        height: 14, borderRadius: 6,
                        background: 'rgba(255,255,255,0.06)',
                        width: col.skeletonW ?? '80%',
                        animation: 'pulse 1.5s ease-in-out infinite',
                      }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: '48px 16px', textAlign: 'center',
                    color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem',
                  }}
                >
                  {emptyMsg}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {columns.map(col => (
                    <td
                      key={col.key}
                      style={{
                        padding: '13px 16px',
                        color: '#e0e0e8',
                        textAlign: col.align ?? 'left',
                        verticalAlign: 'middle',
                        whiteSpace: col.wrap ? 'normal' : 'nowrap',
                      }}
                    >
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
