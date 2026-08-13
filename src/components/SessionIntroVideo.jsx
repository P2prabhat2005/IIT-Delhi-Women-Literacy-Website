import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  bootstrapIntroVideoPreload,
  hideIntroVideoElement,
  markIntroSplashPlayed,
  revealIntroVideoElement,
  setIntroSplashActive,
  shouldPlayIntroSplash,
} from '../utils/introSplash.js';

const FADE_SECONDS = 0.85;
const FADE_MS = 850;
const HERO_REVEAL_START_PROGRESS = 0.62;
const FINAL_DISSOLVE_SECONDS = 1;

const OVERLAY_STYLE = {
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  backgroundColor: '#000',
  opacity: 1,
  transform: 'translateZ(0)',
  willChange: 'opacity',
  transition: 'opacity 850ms ease-out',
  contain: 'strict',
};

const VIDEO_STYLE = {
  position: 'fixed',
  inset: '0',
  zIndex: 101,
  display: 'block',
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  objectPosition: 'center',
  opacity: 1,
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  willChange: 'opacity',
  pointerEvents: 'none',
};

const SKIP_BUTTON_CLASS =
  'pointer-events-auto absolute right-4 top-4 rounded-full border border-white/30 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-slate-950 sm:right-6 sm:top-6';

function easeOutCubic(value) {
  return 1 - (1 - value) ** 3;
}

function getVideoOpacity(currentTime, duration) {
  if (!Number.isFinite(duration) || duration <= 0) {
    return 1;
  }

  const progress = Math.min(Math.max(currentTime / duration, 0), 1);

  if (progress < HERO_REVEAL_START_PROGRESS) {
    return 1;
  }

  const revealProgress = (progress - HERO_REVEAL_START_PROGRESS) / (1 - HERO_REVEAL_START_PROGRESS);
  const easedReveal = easeOutCubic(Math.min(Math.max(revealProgress, 0), 1));
  const remainingSeconds = duration - currentTime;
  const finalDissolveProgress = Math.min(
    Math.max((FINAL_DISSOLVE_SECONDS - remainingSeconds) / FINAL_DISSOLVE_SECONDS, 0),
    1,
  );
  const opacityBeforeFinalDissolve = 1 - easedReveal * 0.82;

  return Math.max(0, opacityBeforeFinalDissolve * (1 - finalDissolveProgress));
}

function applyDesktopCoverMode(overlay, video) {
  if (!window.matchMedia('(min-width: 1024px)').matches) {
    return;
  }

  if (overlay) {
    overlay.style.backgroundColor = 'transparent';
  }

  if (video) {
    video.style.objectFit = 'cover';
  }
}

function SessionIntroVideo() {
  const overlayRef = useRef(null);
  const videoRef = useRef(null);
  const fadeStartedRef = useRef(false);
  const playbackStartedRef = useRef(false);
  const usesFrameCallbackRef = useRef(false);
  const frameCallbackRef = useRef(null);
  const removeTimerRef = useRef(null);

  const [isEligible] = useState(shouldPlayIntroSplash);
  const [isDismissed, setIsDismissed] = useState(false);

  const cleanupMediaCallbacks = useCallback(() => {
    const video = videoRef.current;

    if (video && frameCallbackRef.current && 'cancelVideoFrameCallback' in video) {
      video.cancelVideoFrameCallback(frameCallbackRef.current);
    }

    frameCallbackRef.current = null;
    window.clearTimeout(removeTimerRef.current);
    removeTimerRef.current = null;
  }, []);

  const removeIntro = useCallback(() => {
    const video = videoRef.current;

    markIntroSplashPlayed();
    setIntroSplashActive(false);

    if (video) {
      video.pause();
    }

    cleanupMediaCallbacks();
    setIsDismissed(true);
  }, [cleanupMediaCallbacks]);

  const startFade = useCallback(() => {
    if (fadeStartedRef.current) {
      return;
    }

    fadeStartedRef.current = true;

    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.opacity = '0';
    }

    removeTimerRef.current = window.setTimeout(removeIntro, FADE_MS);
  }, [removeIntro]);

  const handleVideoProgress = useCallback(() => {
    const video = videoRef.current;

    if (
      !video ||
      usesFrameCallbackRef.current ||
      !Number.isFinite(video.duration) ||
      video.duration <= 0 ||
      fadeStartedRef.current
    ) {
      return;
    }

    if (playbackStartedRef.current) {
      video.style.opacity = String(getVideoOpacity(video.currentTime, video.duration));
    }

    if (video.duration - video.currentTime <= FADE_SECONDS) {
      startFade();
    }
  }, [startFade]);

  const handleVideoEnd = useCallback(() => {
    if (!fadeStartedRef.current) {
      startFade();
    }
  }, [startFade]);

  const monitorVideoFrames = useCallback(() => {
    const video = videoRef.current;

    if (!video || fadeStartedRef.current) {
      return;
    }

    if ('requestVideoFrameCallback' in video) {
      usesFrameCallbackRef.current = true;
      frameCallbackRef.current = video.requestVideoFrameCallback((_, metadata) => {
        if (fadeStartedRef.current) {
          return;
        }

        video.style.opacity = String(getVideoOpacity(metadata.mediaTime, video.duration));

        if (Number.isFinite(video.duration) && video.duration - metadata.mediaTime <= FADE_SECONDS) {
          startFade();
          return;
        }

        monitorVideoFrames();
      });

      return;
    }

    handleVideoProgress();
  }, [handleVideoProgress, startFade]);

  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;

    if (!video || playbackStartedRef.current || fadeStartedRef.current) {
      return;
    }

    if (video.readyState < 2) {
      return;
    }

    playbackStartedRef.current = true;
    applyDesktopCoverMode(overlay, video);
    video.style.opacity = '1';

    const playPromise = video.play();

    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.then(monitorVideoFrames).catch(() => {
        // Autoplay can be blocked in some browsers; keep the poster visible and allow Skip.
        playbackStartedRef.current = false;
      });
    } else {
      monitorVideoFrames();
    }
  }, [monitorVideoFrames]);

  useLayoutEffect(() => {
    if (!isEligible || isDismissed) {
      setIntroSplashActive(false);
      return undefined;
    }

    setIntroSplashActive(true);
    const video = bootstrapIntroVideoPreload();
    if (!video) {
      return undefined;
    }

    videoRef.current = video;
    revealIntroVideoElement(video, VIDEO_STYLE);
    applyDesktopCoverMode(overlayRef.current, video);

    video.addEventListener('loadeddata', startPlayback);
    video.addEventListener('canplay', startPlayback);
    video.addEventListener('canplaythrough', startPlayback);
    video.addEventListener('timeupdate', handleVideoProgress);
    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', removeIntro);

    if (video.readyState >= 2) {
      startPlayback();
    }

    return () => {
      video.removeEventListener('loadeddata', startPlayback);
      video.removeEventListener('canplay', startPlayback);
      video.removeEventListener('canplaythrough', startPlayback);
      video.removeEventListener('timeupdate', handleVideoProgress);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', removeIntro);
      hideIntroVideoElement(video);
      setIntroSplashActive(false);
    };
  }, [handleVideoEnd, handleVideoProgress, isDismissed, isEligible, removeIntro, startPlayback]);

  useEffect(() => {
    if (!isEligible || isDismissed) {
      return undefined;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        removeIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      cleanupMediaCallbacks();
    };
  }, [cleanupMediaCallbacks, isDismissed, isEligible, removeIntro]);

  if (!isEligible || isDismissed) {
    return null;
  }

  return createPortal(
    <>
      <div ref={overlayRef} style={OVERLAY_STYLE} aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 z-[102]"
        role="dialog"
        aria-label="Project introduction video"
        aria-modal="true"
      >
        <button type="button" onClick={removeIntro} autoFocus className={SKIP_BUTTON_CLASS}>
          Skip introduction
        </button>
      </div>
    </>,
    document.body,
  );
}

export default memo(SessionIntroVideo);
