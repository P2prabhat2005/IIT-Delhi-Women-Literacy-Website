const SAFE_PROTOCOLS = new Set(['http:', 'https:']);
const SAFE_HASH_ID = /^[A-Za-z][\w:-]*$/;
const SAFE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hasControlChars(value) {
  return /[\u0000-\u001F\u007F]/.test(value);
}

export function isSafeNavigationUrl(value) {
  if (typeof value !== 'string') return false;

  const url = value.trim();
  if (!url || hasControlChars(url)) return false;

  // Same-origin relative paths only. Reject protocol-relative URLs (//evil.example).
  if (url.startsWith('/') && !url.startsWith('//') && !url.startsWith('/\\')) {
    return !url.includes('\\');
  }

  try {
    const parsed = new URL(url);
    return SAFE_PROTOCOLS.has(parsed.protocol);
  } catch {
    return false;
  }
}

export function openSafeUrl(url) {
  if (typeof window === 'undefined' || !isSafeNavigationUrl(url)) {
    return false;
  }

  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (opened) {
    opened.opener = null;
  }
  return true;
}

export function sanitizeHashTargetId(hash) {
  if (typeof hash !== 'string' || !hash) return '';

  try {
    const targetId = decodeURIComponent(hash.replace(/^#/, '')).trim();
    return SAFE_HASH_ID.test(targetId) ? targetId : '';
  } catch {
    return '';
  }
}

export function isSafeMailtoAddress(value) {
  if (typeof value !== 'string') return false;
  const email = value.trim();
  return SAFE_EMAIL.test(email) && !hasControlChars(email) && !/[?,&;]/.test(email);
}
