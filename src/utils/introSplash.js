import { useSyncExternalStore } from 'react';

export const INTRO_VIDEO_SRC = '/videos/project-bharti-opening.mp4';
export const INTRO_POSTER_SRC = '/videos/project-bharti-opening-poster.jpg';
export const INTRO_SESSION_KEY = 'project-bharti-opening-intro-played';

export const PRELOAD_VIDEO_ID = 'project-bharti-intro-preload';

const HIDDEN_INTRO_VIDEO_STYLE =
  'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;top:0';

let introActive = false;
const listeners = new Set();
let introSourceAttachScheduled = false;

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

function getIntroVideoElement() {
  return document.getElementById(PRELOAD_VIDEO_ID);
}

/**
 * Attach the intro MP4 to the existing preload <video> (never create a second element).
 * Idempotent: safe to call from both the post-paint scheduler and SessionIntroVideo.
 */
export function ensureIntroVideoSourceAttached(preloader = getIntroVideoElement()) {
  if (!preloader || !shouldPlayIntroSplash()) {
    return preloader;
  }

  if (preloader.getAttribute('src') || preloader.currentSrc) {
    preloader.dataset.srcAttached = 'true';
    return preloader;
  }

  preloader.dataset.srcAttached = 'true';
  preloader.src = INTRO_VIDEO_SRC;
  try {
    if (preloader.readyState < 1) {
      preloader.load();
    }
  } catch {
    // Ignore load() race conditions during bootstrap.
  }

  return preloader;
}

/**
 * After the next paint (double rAF), prefer an idle slot so critical CSS/JS keep bandwidth.
 * timeout: 200 keeps intro from waiting too long if the main thread stays busy.
 * setTimeout(0) is only a requestIdleCallback polyfill — not an arbitrary long delay.
 */
function scheduleAfterCriticalPaint(task) {
  if (typeof window === 'undefined') {
    return;
  }

  const run = () => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(task, { timeout: 200 });
    } else {
      window.setTimeout(task, 0);
    }
  };

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(run);
  });
}

/**
 * Prepare the shared intro <video>: poster immediately, MP4 after critical paint.
 * `<link rel="preload" as="video">` is unsupported in Chromium; a real <video> is required.
 */
export function bootstrapIntroVideoPreload() {
  if (typeof document === 'undefined' || !shouldPlayIntroSplash()) {
    return null;
  }

  let preloader = getIntroVideoElement();

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

  preloader.preload = 'auto';
  if (!preloader.getAttribute('poster')) {
    preloader.poster = INTRO_POSTER_SRC;
  }

  // Warm the poster cache with high priority when supported.
  if (typeof Image !== 'undefined') {
    const poster = new Image();
    poster.fetchPriority = 'high';
    poster.decoding = 'async';
    poster.src = INTRO_POSTER_SRC;
  }

  if (!introSourceAttachScheduled) {
    introSourceAttachScheduled = true;
    scheduleAfterCriticalPaint(() => {
      ensureIntroVideoSourceAttached(preloader);
    });
  }

  return preloader;
}

export function revealIntroVideoElement(video, style) {
  if (!video) return;

  // Splash UI is visible — attach source now if the post-paint scheduler has not yet.
  // Critical CSS/JS requests have already started by the time React mounts this overlay.
  ensureIntroVideoSourceAttached(video);

  Object.assign(video.style, style);
  video.removeAttribute('aria-hidden');
  video.tabIndex = -1;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.preload = 'auto';
  if ('fetchPriority' in video) {
    video.fetchPriority = 'high';
  }
}

export function hideIntroVideoElement(video) {
  if (!video) return;

  video.pause();
  try {
    video.currentTime = 0;
  } catch {
    // Ignore seek failures while tearing down.
  }
  video.style.cssText = HIDDEN_INTRO_VIDEO_STYLE;
  video.setAttribute('aria-hidden', 'true');
  video.tabIndex = -1;
}
