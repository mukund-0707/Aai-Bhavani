'use client';

export default function DebugPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  return (
    <div style={{ padding: 40, fontFamily: 'monospace', background: '#0a0a0f', color: '#fff', minHeight: '100vh' }}>
      <h1>🔍 Environment Debug</h1>
      
      <div style={{ background: '#111', padding: 20, borderRadius: 8, marginTop: 20 }}>
        <h2>NEXT_PUBLIC_API_URL:</h2>
        <p style={{ fontSize: 18, color: '#f5c24c' }}>
          {apiUrl || '❌ NOT SET'}
        </p>
      </div>

      <div style={{ marginTop: 20, padding: 20, background: '#1a1a24', borderRadius: 8 }}>
        <h3>Expected Values:</h3>
        <ul>
          <li>Development: http://localhost:8000</li>
          <li>Production: https://aaibhavanigroups.eu.cc:8000</li>
          <li>Or with reverse proxy: https://aaibhavanigroups.eu.cc/api</li>
        </ul>
      </div>

      <div style={{ marginTop: 20, padding: 20, background: '#1a1a24', borderRadius: 8 }}>
        <h3>Test API Call:</h3>
        <button
          onClick={async () => {
            try {
              const res = await fetch(`${apiUrl}/api/site-settings/`);
              const data = await res.json();
              alert('✅ API Working!\n\n' + JSON.stringify(data, null, 2));
            } catch (err) {
              alert('❌ API Error:\n\n' + err.message);
            }
          }}
          style={{
            padding: '10px 20px',
            background: '#f5c24c',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Test API Connection
        </button>
      </div>
    </div>
  );
}
