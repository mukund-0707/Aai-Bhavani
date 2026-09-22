// Force production URL if environment variable not loaded
const BASE = process.env.NEXT_PUBLIC_API_URL || 
             (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
               ? 'http://aaibhavanigroups.eu.cc:8000' 
               : 'http://localhost:8000');

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  
  if (!res.ok) {
    // Try to parse error response body
    let errorMsg = `API error ${res.status}`;
    try {
      const errorData = await res.json();
      // DRF returns validation errors as { field: ["error message"] }
      if (errorData) {
        const errors = Object.entries(errorData)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
          .join('; ');
        errorMsg = errors || errorMsg;
      }
    } catch {
      // If response body is not JSON, use status text
      errorMsg = `${res.status} ${res.statusText}`;
    }
    const error = new Error(errorMsg);
    error.status = res.status;
    throw error;
  }
  
  return res.json();
}
