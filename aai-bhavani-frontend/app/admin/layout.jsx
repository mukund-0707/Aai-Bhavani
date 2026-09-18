'use client';

import { useState } from 'react';
import Sidebar from './_components/Sidebar';
import Topbar  from './_components/Topbar';
import { ToastProvider } from './_components/Toast';

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ToastProvider>
      <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#f0f0f5' }}>

        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        {/* Right side */}
        <div style={{ marginLeft: 220, minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="admin-main">
          <Topbar onMenuClick={() => setMobileOpen(v => !v)} />

          {/* Page content */}
          <main style={{
            flex: 1,
            marginTop: 56,
            padding: 'clamp(18px, 3vw, 32px)',
            maxWidth: 1200,
            width: '100%',
          }}>
            {children}
          </main>
        </div>

        {/* Global admin styles */}
        <style>{`
          /* ── Reset for select options dark bg ── */
          option { background: #1a1a24; color: #f0f0f5; }

          /* ── Button system ── */
          .admin-btn {
            display: inline-flex; align-items: center; gap: 7px;
            padding: 8px 16px; border-radius: 8px;
            font-size: 0.84rem; font-weight: 600;
            cursor: pointer; border: none;
            transition: opacity 0.15s, transform 0.1s;
            text-decoration: none; white-space: nowrap;
            font-family: inherit;
          }
          .admin-btn:active { transform: scale(0.97); }
          .admin-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

          .admin-btn--primary {
            background: linear-gradient(135deg, #fbe08c, #f5c24c 50%, #e0a526);
            color: #0a0807;
          }
          .admin-btn--primary:hover:not(:disabled) { opacity: 0.9; }

          .admin-btn--ghost {
            background: rgba(255,255,255,0.06);
            color: rgba(255,255,255,0.65);
            border: 1px solid rgba(255,255,255,0.1);
          }
          .admin-btn--ghost:hover:not(:disabled) {
            background: rgba(255,255,255,0.1);
            color: #f0f0f5;
          }

          .admin-btn--danger {
            background: rgba(239,68,68,0.15);
            color: #f87171;
            border: 1px solid rgba(239,68,68,0.25);
          }
          .admin-btn--danger:hover:not(:disabled) {
            background: rgba(239,68,68,0.25);
          }

          .admin-btn--sm {
            padding: 5px 11px;
            font-size: 0.78rem;
          }

          /* ── Page card ── */
          .admin-card {
            background: #111118;
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 12px;
            padding: 22px;
          }

          /* ── Page header row ── */
          .admin-page-header {
            display: flex; align-items: center; justify-content: space-between;
            flex-wrap: wrap; gap: 12px;
            margin-bottom: 22px;
          }
          .admin-page-title {
            font-size: 1.05rem; font-weight: 700;
            color: #f0f0f5; margin: 0;
            letter-spacing: -0.02em;
          }
          .admin-page-sub {
            font-size: 0.8rem; color: rgba(255,255,255,0.35);
            margin: 4px 0 0; 
          }

          /* ── Filters bar ── */
          .admin-filters {
            display: flex; flex-wrap: wrap; gap: 10px;
            margin-bottom: 18px; align-items: center;
          }

          /* ── Toast animation ── */
          @keyframes toastIn {
            from { opacity: 0; transform: translateY(12px) scale(0.96); }
            to   { opacity: 1; transform: translateY(0)    scale(1);    }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to   { opacity: 1; transform: scale(1)    translateY(0);    }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.4; }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          /* ── Mobile responsive ── */
          @media (max-width: 768px) {
            .admin-main { margin-left: 0 !important; }
            .admin-topbar { left: 0 !important; }
            .admin-mobile-only { display: flex !important; }
          }
        `}</style>
      </div>
    </ToastProvider>
  );
}
