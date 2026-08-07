import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const INTRO_VIDEO_SRC = '/videos/project-bharti-opening.mp4';
const INTRO_SESSION_KEY = 'project-bharti-opening-intro-played';
const FADE_SECONDS = 0.85;
const FADE_MS = 850;
const HERO_REVEAL_START_PROGRESS = 0.62;
const FINAL_DISSOLVE_SECONDS = 1;
const START_BUFFER_SECONDS = 0.35;
const READY_FALLBACK_MS = 900;

function shouldShowIntro() {
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

function markIntroPlayed() {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
  } catch {
    // The intro should never trap the user if sessionStorage is unavailable.
  }
}

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

export default function SessionIntroVideo() {
  const overlayRef = useRef(null);
  const videoRef = useRef(null);
  const fadeStartedRef = useRef(false);
  const playbackStartedRef = useRef(false);
  const usesFrameCallbackRef = useRef(false);
  const frameCallbackRef = useRef(null);
  const readyFallbackTimerRef = useRef(null);
  const removeTimerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(shouldShowIntro);

  const removeIntro = useCallback(() => {
    const video = videoRef.current;

    markIntroPlayed();

    if (video) {
      video.pause();

      if (frameCallbackRef.current && 'cancelVideoFrameCallback' in video) {
        video.cancelVideoFrameCallback(frameCallbackRef.current);
      }
    }

    window.clearTimeout(removeTimerRef.current);
    window.clearTimeout(readyFallbackTimerRef.current);
    frameCallbackRef.current = null;
    removeTimerRef.current = null;
    readyFallbackTimerRef.current = null;
    setIsVisible(false);
  }, []);

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
    if (fadeStartedRef.current) {
      return;
    }

    startFade();
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

  const startPlayback = useCallback((force = false) => {
    const video = videoRef.current;
    const overlay = overlayRef.current;

    if (!video || playbackStartedRef.current) {
      return;
    }

    const hasDuration = Number.isFinite(video.duration) && video.duration > 0;
    const bufferedEnd = video.buffered.length > 0 ? video.buffered.end(video.buffered.length - 1) : 0;
    const bufferedAhead = bufferedEnd - video.currentTime;
    const preferredBuffer = hasDuration ? Math.min(START_BUFFER_SECONDS, video.duration * 0.2) : START_BUFFER_SECONDS;

    if (!force && video.readyState < 2) {
      return;
    }

    if (!force && video.readyState < 3 && bufferedAhead < preferredBuffer) {
      return;
    }

    playbackStartedRef.current = true;
    window.clearTimeout(readyFallbackTimerRef.current);
    readyFallbackTimerRef.current = null;

    // Reveal via DOM to avoid a React re-render on the critical play path.
    video.style.opacity = '1';
    if (overlay && window.matchMedia('(min-width: 1024px)').matches) {
      overlay.style.backgroundColor = 'transparent';
    }

    const playPromise = video.play();

    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.then(monitorVideoFrames).catch(removeIntro);
    } else {
      monitorVideoFrames();
    }
  }, [monitorVideoFrames, removeIntro]);

  const startPlaybackWhenReady = useCallback(() => {
    startPlayback();

    if (readyFallbackTimerRef.current || playbackStartedRef.current) {
      return;
    }

    readyFallbackTimerRef.current = window.setTimeout(() => {
      if (!playbackStartedRef.current && videoRef.current?.readyState >= 2) {
        startPlayback(true);
      }
    }, READY_FALLBACK_MS);
  }, [startPlayback]);

  useEffect(() => {
    if (!isVisible) {
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
      window.clearTimeout(removeTimerRef.current);
      window.clearTimeout(readyFallbackTimerRef.current);
    };
  }, [isVisible, removeIntro]);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    // Avoid video.load() — it aborts and restarts media fetch (especially costly under StrictMode).
    if (video.readyState === 0) {
      video.preload = 'auto';
    }

    startPlaybackWhenReady();
    return undefined;
  }, [isVisible, startPlaybackWhenReady]);

  useEffect(() => {
    const video = videoRef.current;

    return () => {
      if (video && frameCallbackRef.current && 'cancelVideoFrameCallback' in video) {
        video.cancelVideoFrameCallback(frameCallbackRef.current);
      }
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] transform-gpu bg-black opacity-100 transition-opacity duration-[850ms] ease-out will-change-[opacity]"
      role="dialog"
      aria-label="Project introduction video"
      aria-modal="true"
    >
      <video
        ref={videoRef}
        className="h-full w-full max-h-full max-w-full transform-gpu object-contain object-center opacity-0 will-change-[opacity] lg:object-cover"
        src={INTRO_VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onLoadedData={startPlaybackWhenReady}
        onCanPlay={startPlaybackWhenReady}
        onCanPlayThrough={startPlaybackWhenReady}
        onTimeUpdate={handleVideoProgress}
        onEnded={handleVideoEnd}
        onError={removeIntro}
      />
      <button
        type="button"
        onClick={removeIntro}
        autoFocus
        className="absolute right-4 top-4 rounded-full border border-white/30 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-slate-950 sm:right-6 sm:top-6"
      >
        Skip introduction
      </button>
    </div>,
    document.body,
  );
}
