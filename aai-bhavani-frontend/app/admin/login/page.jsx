'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { login, isLoggedIn } from '../../../lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isLoggedIn()) router.replace('/admin');
  }, [router]);

  if (!mounted) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter your username and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(username.trim(), password);
      router.replace('/admin');
    } catch (err) {
      setError(err.message ?? 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#030305',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>

      {/* Background aurora blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '10%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(224,165,38,0.12), transparent 65%)',
          filter: 'blur(60px)',
          animation: 'drift 18s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '5%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(110,231,183,0.06), transparent 65%)',
          filter: 'blur(50px)',
          animation: 'drift 24s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '20%',
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(245,194,76,0.08), transparent 65%)',
          filter: 'blur(40px)',
          animation: 'drift 14s ease-in-out infinite',
          animationDelay: '-7s',
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 420,
        background: 'rgba(13,13,20,0.85)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 'clamp(28px, 5vw, 44px)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 32px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04) inset',
        animation: 'cardIn 0.5s cubic-bezier(0.22,1,0.36,1)',
      }}>

        {/* Logo + title */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(245,194,76,0.15), rgba(224,165,38,0.08))',
            border: '1px solid rgba(245,194,76,0.2)',
            marginBottom: 18,
          }}>
            <ShieldCheck size={24} color="#f5c24c" strokeWidth={1.8} />
          </div>

          <h1 style={{
            margin: 0,
            fontSize: '1.5rem', fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#f0f0f5',
          }}>
            Admin&nbsp;
            <span style={{
              background: 'linear-gradient(135deg, #fdf0c8, #f5c24c, #e0a526)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Access
            </span>
          </h1>
          <p style={{
            margin: '8px 0 0',
            fontSize: '0.84rem',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.01em',
          }}>
            Aai Bhavani · Superuser only
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Username */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              autoComplete="username"
              autoFocus
              placeholder="Enter your username"
              style={{
                width: '100%', padding: '12px 16px',
                borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: '#f0f0f5', fontSize: '0.92rem',
                outline: 'none', boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                fontFamily: 'inherit',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(245,194,76,0.5)';
                e.target.style.boxShadow   = '0 0 0 3px rgba(245,194,76,0.08)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                e.target.style.boxShadow   = 'none';
              }}
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                autoComplete="current-password"
                placeholder="Enter your password"
                style={{
                  width: '100%', padding: '12px 48px 12px 16px',
                  borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#f0f0f5', fontSize: '0.92rem',
                  outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontFamily: 'inherit',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(245,194,76,0.5)';
                  e.target.style.boxShadow   = '0 0 0 3px rgba(245,194,76,0.08)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.target.style.boxShadow   = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                tabIndex={-1}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.3)', display: 'flex', padding: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              padding: '10px 14px',
              borderRadius: 8,
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              fontSize: '0.82rem',
              color: '#fca5a5',
              animation: 'shake 0.35s ease',
            }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '13px 24px',
              borderRadius: 10, border: 'none',
              background: loading
                ? 'rgba(245,194,76,0.4)'
                : 'linear-gradient(135deg, #fbe08c, #f5c24c 50%, #e0a526)',
              color: '#0a0807',
              fontSize: '0.9rem', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 8px 28px -8px rgba(224,165,38,0.6)',
              transition: 'opacity 0.2s, transform 0.1s, box-shadow 0.2s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.92'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            onMouseDown={e  => { if (!loading) e.currentTarget.style.transform = 'scale(0.98)'; }}
            onMouseUp={e    => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 16, height: 16, border: '2px solid rgba(10,8,7,0.3)',
                  borderTopColor: '#0a0807', borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite', display: 'inline-block',
                }} />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={16} strokeWidth={2} />
              </>
            )}
          </button>
        </form>

        {/* Footer note */}
        <p style={{
          marginTop: 24, textAlign: 'center',
          fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)',
          lineHeight: 1.6,
        }}>
          Restricted access · Superuser credentials only
        </p>
      </div>

      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.05); }
          66%       { transform: translate(-20px, 15px) scale(0.97); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}
