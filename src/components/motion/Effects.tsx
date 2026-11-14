import React, { useRef } from 'react';
import { clsx } from 'clsx';
import { gsap, useGSAP, prefersReducedMotion, hasFinePointer } from '../../lib/motion';

/* ───────────── CountUp ───────────── */

/** Counts the numeric part of a value like "18" or "5+" up from 0 when scrolled into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const m = value.match(/^(\D*)(\d+)(.*)$/);
      if (!el || !m || prefersReducedMotion()) return;
      const [, pre, num, post] = m;
      const state = { v: 0 };
      el.textContent = `${pre}0${post}`;
      gsap.to(state, {
        v: Number(num),
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => {
          el.textContent = `${pre}${Math.round(state.v)}${post}`;
        },
      });
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <>
      <span className="sr-only">{value}</span>
      <span key={value} ref={ref} aria-hidden="true" className={clsx('tabular-nums', className)}>
        {value}
      </span>
    </>
  );
}

/* ───────────── Magnet ───────────── */

/** Pulls its child gently toward the cursor (mouse only). Use on 1–2 focal buttons per screen. */
export function Magnet({ children, strength = 0.28, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !hasFinePointer() || prefersReducedMotion()) return;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={clsx('inline-flex will-change-transform', className)}>
      {children}
    </span>
  );
}

/* ───────────── Tilt ───────────── */

/** 3D perspective tilt with a soft light glare that follows the cursor (mouse only). */
export function Tilt({ children, max = 6, className }: { children: React.ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const glare = glareRef.current;
      if (!el || !glare || !hasFinePointer() || prefersReducedMotion()) return;
      gsap.set(el, { transformPerspective: 1100 });
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry((px - 0.5) * 2 * max);
        rx(-(py - 0.5) * 2 * max);
        gsap.to(glare, { opacity: 1, '--gx': `${px * 100}%`, '--gy': `${py * 100}%`, duration: 0.3, overwrite: 'auto' });
      };
      const leave = () => {
        rx(0);
        ry(0);
        gsap.to(glare, { opacity: 0, duration: 0.4, overwrite: 'auto' });
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    },
    { scope: ref, dependencies: [max] },
  );

  return (
    <div ref={ref} className={clsx('relative h-full rounded-3xl will-change-transform', className)}>
      {children}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 mix-blend-soft-light"
        style={{ background: 'radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgb(255 255 255 / 0.55), transparent 60%)' }}
      />
    </div>
  );
}

/* ───────────── Spotlight ───────────── */

/**
 * Pointer-tracking accent glow. Drop inside any `relative group` element; it
 * listens on its parent and only writes CSS variables (no React re-renders).
 */
export function SpotlightLayer() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const layer = ref.current;
    const parent = layer?.parentElement;
    if (!layer || !parent || !hasFinePointer()) return;
    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      layer.style.setProperty('--mx', `${e.clientX - r.left}px`);
      layer.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    parent.addEventListener('pointermove', move);
    return () => parent.removeEventListener('pointermove', move);
  });

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background: 'radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%)' }}
    />
  );
}
