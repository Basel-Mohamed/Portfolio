import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion, hasFinePointer } from './motion';

/**
 * Momentum smooth scrolling (Lenis), driven by the GSAP ticker so every
 * ScrollTrigger stays in step with it.
 *
 * Only runs for mouse and trackpad users who have not asked for reduced
 * motion. Touch devices keep their native scrolling.
 */
let lenis: Lenis | null = null;

export function startSmoothScroll(): () => void {
  if (lenis || prefersReducedMotion() || !hasFinePointer()) return () => {};

  const instance = new Lenis({ lerp: 0.1, anchors: true });
  lenis = instance;
  instance.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}

/** Go to the top of the page. `smooth` glides; otherwise it jumps. */
export function scrollToTop(smooth = false) {
  if (lenis) {
    lenis.scrollTo(0, { immediate: !smooth, force: true });
    return;
  }
  const glide = smooth && !prefersReducedMotion();
  window.scrollTo({ top: 0, left: 0, behavior: glide ? 'smooth' : 'instant' });
}

/** Where the home page was scrolled to when the visitor opened a project from the ring. */
export const HOME_RETURN_KEY = 'home-return-y';

/** Jump to a vertical position with no animation. */
export function jumpTo(top: number) {
  if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
  else window.scrollTo({ top, left: 0, behavior: 'instant' });
}

/**
 * Put the page at a target and keep it there for a moment while late layout
 * (lazy images, pinned sections, reveals) settles, so the visitor lands exactly
 * on it. Lets go the instant the visitor scrolls, clicks or types.
 * `getTop` returns the target position, or null while it does not exist yet.
 */
export function settleAt(getTop: () => number | null, durationMs = 1200): () => void {
  const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
  const started = performance.now();
  let stopped = false;
  let timer = 0;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    window.clearTimeout(timer);
    events.forEach(type => window.removeEventListener(type, stop));
  };
  events.forEach(type => window.addEventListener(type, stop, { passive: true }));
  const run = () => {
    if (stopped) return;
    const top = getTop();
    if (top !== null) jumpTo(Math.max(0, top));
    if (performance.now() - started < durationMs) timer = window.setTimeout(run, 100);
    else stop();
  };
  run();
  return stop;
}

/** Pause and resume page scrolling while a pop-up is open. */
export function lockScroll() {
  lenis?.stop();
}
export function unlockScroll() {
  lenis?.start();
}
