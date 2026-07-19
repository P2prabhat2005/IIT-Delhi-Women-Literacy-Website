import { useCallback, useEffect, useRef, useState } from 'react';
import introVideoSrc from '../assets/hero/project-bharti-opening.mp4';

const INTRO_SESSION_KEY = 'project-bharti-opening-intro-played';
const FADE_SECONDS = 0.85;
const FADE_MS = 850;
const HERO_REVEAL_START_PROGRESS = 0.62;
const FINAL_DISSOLVE_SECONDS = 1;
const START_BUFFER_SECONDS = 1.5;
const READY_FALLBACK_MS = 2500;

function shouldShowIntro() {
  if (typeof window === 'undefined') {
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
  const videoRef = useRef(null);
  const fadeStartedRef = useRef(false);
  const playbackStartedRef = useRef(false);
  const frameCallbackRef = useRef(null);
  const readyFallbackTimerRef = useRef(null);
  const removeTimerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(shouldShowIntro);
  const [isFading, setIsFading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
    setIsFading(true);
    removeTimerRef.current = window.setTimeout(removeIntro, FADE_MS);
  }, [removeIntro]);

  const handleVideoProgress = useCallback(() => {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
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
      frameCallbackRef.current = video.requestVideoFrameCallback((_, metadata) => {
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

    if (!video || playbackStartedRef.current) {
      return;
    }

    const hasDuration = Number.isFinite(video.duration) && video.duration > 0;
    const bufferedEnd = video.buffered.length > 0 ? video.buffered.end(video.buffered.length - 1) : 0;
    const bufferedAhead = bufferedEnd - video.currentTime;
    const preferredBuffer = hasDuration ? Math.min(START_BUFFER_SECONDS, video.duration * 0.25) : START_BUFFER_SECONDS;

    if (!force && (video.readyState < 3 || (video.readyState < 4 && bufferedAhead < preferredBuffer))) {
      return;
    }

    if (force && video.readyState < 2) {
      return;
    }

    playbackStartedRef.current = true;
    window.clearTimeout(readyFallbackTimerRef.current);
    readyFallbackTimerRef.current = null;

    requestAnimationFrame(() => {
      const playPromise = video.play();

      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            setIsPlaying(true);
            monitorVideoFrames();
          })
          .catch(removeIntro);
      } else {
        setIsPlaying(true);
        monitorVideoFrames();
      }
    });
  }, [monitorVideoFrames, removeIntro]);

  const startPlaybackWhenReady = useCallback(() => {
    startPlayback();

    if (readyFallbackTimerRef.current) {
      return;
    }

    readyFallbackTimerRef.current = window.setTimeout(() => {
      const video = videoRef.current;

      if (video && video.readyState >= 2) {
        playbackStartedRef.current = false;
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

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
      window.clearTimeout(removeTimerRef.current);
      window.clearTimeout(readyFallbackTimerRef.current);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    video.load();
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

  return (
    <div
      className={`fixed inset-0 z-[100] transform-gpu transition-opacity duration-[850ms] ease-out will-change-[opacity] ${
        isPlaying ? 'bg-transparent' : 'bg-black'
      } ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className={`h-full w-full transform-gpu object-cover will-change-[opacity] ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        src={introVideoSrc}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onLoadedData={startPlaybackWhenReady}
        onLoadedMetadata={handleVideoProgress}
        onCanPlay={startPlaybackWhenReady}
        onCanPlayThrough={startPlaybackWhenReady}
        onTimeUpdate={frameCallbackRef.current ? undefined : handleVideoProgress}
        onEnded={handleVideoEnd}
        onError={removeIntro}
      />
    </div>
  );
}
