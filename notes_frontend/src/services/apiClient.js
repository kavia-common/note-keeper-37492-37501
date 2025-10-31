const BASE =
  (process.env.REACT_APP_API_BASE && String(process.env.REACT_APP_API_BASE)) ||
  (process.env.REACT_APP_BACKEND_URL && String(process.env.REACT_APP_BACKEND_URL)) ||
  '';

/**
 * PUBLIC_INTERFACE
 * getBaseUrl returns the resolved backend base URL or empty string for no backend.
 */
export function getBaseUrl() {
  return BASE;
}

/**
 * PUBLIC_INTERFACE
 * hasBackend indicates whether a backend API base URL is configured.
 */
export function hasBackend() {
  return Boolean(BASE && BASE.trim());
}

/**
 * PUBLIC_INTERFACE
 * apiClient wraps fetch for JSON APIs. If no BASE configured, throws for callers to fallback.
 */
export async function apiClient(path, options = {}) {
  if (!hasBackend()) {
    throw new Error('NO_BACKEND_CONFIGURED');
  }
  const url = `${BASE.replace(/\/$/, '')}/${String(path).replace(/^\//, '')}`;
  const init = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API_ERROR ${res.status}: ${text}`);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}
