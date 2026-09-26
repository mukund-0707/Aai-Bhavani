'use client';

export default function Error({ error, reset }) {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', color: '#fff' }}>
      <p>Something went wrong. Please try again.</p>
      <button onClick={reset} style={{ marginTop: 16, padding: '10px 24px', borderRadius: 8, background: '#f5c24c', color: '#0a0807', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
        Retry
      </button>
    </div>
  );
}
