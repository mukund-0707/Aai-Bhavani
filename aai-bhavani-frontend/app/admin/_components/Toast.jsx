'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

/* ── Context ── */
const ToastCtx = createContext(null);

/* ── Provider — wrap layout with this ── */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  const push = useCallback((message, type = 'success') => {
    const id = ++counter.current;
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);

  const remove = useCallback((id) => {
    setToasts(p => p.filter(t => t.id !== id));
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      {/* Portal-style fixed container */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24,
        zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10,
        pointerEvents: 'none',
      }}>
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onRemove={remove} />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

function ToastItem({ toast, onRemove }) {
  const isSuccess = toast.type === 'success';
  return (
    <div style={{
      pointerEvents: 'all',
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 16px',
      borderRadius: 10,
      background: isSuccess ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
      border: `1px solid ${isSuccess ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
      backdropFilter: 'blur(12px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      color: '#f0f0f5',
      fontSize: '0.85rem',
      fontWeight: 500,
      minWidth: 240,
      maxWidth: 360,
      animation: 'toastIn 0.3s cubic-bezier(0.22,1,0.36,1)',
    }}>
      {isSuccess
        ? <CheckCircle2 size={17} color="#22c55e" style={{ flexShrink: 0 }} />
        : <XCircle size={17} color="#ef4444" style={{ flexShrink: 0 }} />
      }
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 2, display: 'flex' }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

/* ── Hook ── */
export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
}
