/**
 * Shared motion tokens for subtle, academic micro-interactions.
 * Keep durations in the 200–500ms range unless a counter needs slightly longer.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1];

export const FADE_UP = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -48px 0px',
};

export function fadeUpTransition(delay = 0, duration = 0.4) {
  return {
    duration,
    delay,
    ease: EASE_OUT,
  };
}

export function staggerDelay(index, step = 0.05, cap = 0.3) {
  return Math.min(index * step, cap);
}
