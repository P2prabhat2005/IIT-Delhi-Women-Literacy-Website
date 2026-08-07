import { useSyncExternalStore } from 'react';

export const INTRO_VIDEO_SRC = '/videos/project-bharti-opening.mp4';
export const INTRO_POSTER_SRC = '/videos/project-bharti-opening-poster.jpg';
export const INTRO_SESSION_KEY = 'project-bharti-opening-intro-played';

const PRELOAD_VIDEO_ID = 'project-bharti-intro-preload';

let introActive = false;
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener());
}

export function getIntroSplashActive() {
  return introActive;
}

export function setIntroSplashActive(nextValue) {
  const normalized = Boolean(nextValue);
  if (introActive === normalized) {
    return;
  }

  introActive = normalized;
  emit();
}

export function subscribeIntroSplash(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useIntroSplashActive() {
  return useSyncExternalStore(subscribeIntroSplash, getIntroSplashActive, () => false);
}

export function shouldPlayIntroSplash() {
  if (typeof window === 'undefined') {
    return false;
  }

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const prefersReducedData = navigator.connection?.saveData;

  if (prefersReducedMotion || prefersReducedData) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true';
  } catch {
    return true;
  }
}

export function markIntroSplashPlayed() {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
  } catch {
    // Never trap the user if sessionStorage is unavailable.
  }
}

/**
 * Start buffering the intro video as early as possible using a real media element.
 * `<link rel="preload" as="video">` is unsupported in Chromium; a hidden <video preload="auto"> is reliable.
 */
export function bootstrapIntroVideoPreload() {
  if (typeof document === 'undefined' || !shouldPlayIntroSplash()) {
    return null;
  }

  let preloader = document.getElementById(PRELOAD_VIDEO_ID);

  if (!preloader) {
    preloader = document.createElement('video');
    preloader.id = PRELOAD_VIDEO_ID;
    preloader.muted = true;
    preloader.defaultMuted = true;
    preloader.playsInline = true;
    preloader.setAttribute('playsinline', '');
    preloader.setAttribute('muted', '');
    preloader.setAttribute('preload', 'auto');
    preloader.setAttribute('aria-hidden', 'true');
    preloader.tabIndex = -1;
    preloader.style.cssText =
      'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;top:0;';
    document.body.appendChild(preloader);
  }

  if (preloader.dataset.srcAttached !== 'true' || !preloader.getAttribute('src')) {
    preloader.dataset.srcAttached = 'true';
    preloader.preload = 'auto';
    if (!preloader.getAttribute('src') && !preloader.currentSrc) {
      preloader.src = INTRO_VIDEO_SRC;
    }
    try {
      if (preloader.readyState < 2) {
        preloader.load();
      }
    } catch {
      // Ignore load() race conditions during bootstrap.
    }
  }

  // Warm the poster cache with high priority when supported.
  if (typeof Image !== 'undefined') {
    const poster = new Image();
    poster.fetchPriority = 'high';
    poster.decoding = 'async';
    poster.src = INTRO_POSTER_SRC;
  }

  return preloader;
}
