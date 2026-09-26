/**
 * lib/auth.js — JWT token management for admin panel
 */

const ACCESS_KEY  = 'ab_access';
const REFRESH_KEY = 'ab_refresh';

// Force production URL if environment variable not loaded
const API = process.env.NEXT_PUBLIC_API_URL || 
            (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
              ? 'http://aaibhavanigroups.eu.cc:8000' 
              : 'http://localhost:8000');

/* ── Token storage ── */
export function getAccess()  { return localStorage.getItem(ACCESS_KEY);  }
export function getRefresh() { return localStorage.getItem(REFRESH_KEY); }

export function saveTokens({ access, refresh }) {
  localStorage.setItem(ACCESS_KEY,  access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export function isLoggedIn() {
  if (typeof window === 'undefined') return false;
  return !!getAccess();
}

/* ── Refresh access token ── */
async function tryRefresh() {
  const refresh = getRefresh();
  if (!refresh) return false;
  try {
    const res = await fetch(`${API}/api/auth/token/refresh/`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ refresh }),
    });
    if (!res.ok) { clearTokens(); return false; }
    const data = await res.json();
    localStorage.setItem(ACCESS_KEY, data.access);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

/* ── Authenticated fetch — auto-retry once on 401 ── */
export async function adminFetch(path, options = {}) {
  // Don't force Content-Type for FormData — browser sets it with boundary automatically
  const isFormData = options.body instanceof FormData;

  const doRequest = (token) =>
    fetch(`${API}${path}`, {
      ...options,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

  let res = await doRequest(getAccess());

  // Token expired — try refresh once
  if (res.status === 401) {
    const refreshed = await tryRefresh();
    if (!refreshed) {
      clearTokens();
      window.location.href = '/admin/login';
      throw new Error('Session expired');
    }
    res = await doRequest(getAccess());
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err  = new Error(`API error ${res.status}`);
    err.status = res.status;
    err.data   = body;
    throw err;
  }

  if (res.status === 204) return null; // DELETE
  return res.json();
}

/* ── Login ── */
export async function login(username, password) {
  const res = await fetch(`${API}/api/auth/login/`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      data.non_field_errors?.[0] ??
      data.detail ??
      'Invalid credentials'
    );
  }
  const data = await res.json();
  saveTokens(data);
  return data.user;
}

/* ── Logout ── */
export function logout() {
  clearTokens();
  window.location.href = '/admin/login';
}
