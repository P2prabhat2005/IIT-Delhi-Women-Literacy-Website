/**
 * Minimal fetch wrapper for the Project Bharti backend API.
 *
 * Every editable-media hook/utility in the app goes through this module
 * instead of calling `fetch` directly, so the base URL, error shape, and
 * JSON/multipart handling only need to be defined once.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiRequestError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message = body?.error?.message || `Request failed with status ${response.status}`;
    throw new ApiRequestError(message, response.status, body?.error?.code || 'REQUEST_FAILED');
  }

  const data = body?.data ?? null;
  return resolveUrlsInObject(data);
}

function getFullMediaUrl(path) {
  if (!path || typeof path !== 'string') return path;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:') || path.startsWith('data:')) return path;
  
  try {
    const base = new URL(API_BASE, window.location.origin);
    return new URL(path, base.origin).toString();
  } catch {
    return path;
  }
}

function resolveUrlsInObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    obj.forEach(resolveUrlsInObject);
  } else {
    for (const key of Object.keys(obj)) {
      if (key === 'url' && typeof obj[key] === 'string') {
        obj[key] = getFullMediaUrl(obj[key]);
      } else if (typeof obj[key] === 'object') {
        resolveUrlsInObject(obj[key]);
      }
    }
  }
  return obj;
}

export async function apiGet(path, params) {
  const url = new URL(`${API_BASE}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value);
      }
    });
  }

  const response = await fetch(url.toString(), { credentials: 'include' });
  return parseResponse(response);
}

export async function apiSend(method, path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  return parseResponse(response);
}

export async function apiUpload(path, file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  return parseResponse(response);
}

export async function apiDelete(path) {
  const response = await fetch(`${API_BASE}${path}`, { method: 'DELETE', credentials: 'include' });
  return parseResponse(response);
}

export { ApiRequestError };
