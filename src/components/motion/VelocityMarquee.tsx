import { useRef } from 'react';
import { clsx } from 'clsx';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../../lib/motion';

/**
 * Scroll-velocity marquee: rows drift continuously and speed up / reverse
 * with the user's scroll, with a slight skew for momentum. Decorative only.
 */
export function VelocityMarquee({ rows }: { rows: string[][] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      const tracks = gsap.utils.toArray<HTMLElement>('[data-track]', root.current);

      const loops = tracks.map((track, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.set(track, { xPercent: dir === -1 ? 0 : -50 });
        const tl = gsap.to(track, { xPercent: dir === -1 ? -50 : 0, duration: 38 + i * 6, ease: 'none', repeat: -1 });
        return { tl, track, skewTo: gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3.out' }) };
      });

      let scrollDir = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: self => loops.forEach(l => (self.isActive ? l.tl.play() : l.tl.pause())),
        onUpdate: self => {
          const v = self.getVelocity();
          if (Math.abs(v) < 5) return;
          scrollDir = v > 0 ? 1 : -1;
          const boost = 1 + Math.min(Math.abs(v) / 220, 7);
          loops.forEach(({ tl, skewTo }) => {
            gsap.to(tl, { timeScale: scrollDir * boost, duration: 0.15, overwrite: true });
            gsap.to(tl, { timeScale: scrollDir, duration: 1.2, delay: 0.15, ease: 'power2.out' });
            skewTo(gsap.utils.clamp(-7, 7, -v / 260));
          });
          gsap.delayedCall(0.2, () => loops.forEach(l => l.skewTo(0)));
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden="true" dir="ltr" className="overflow-hidden border-b border-line py-8 select-none md:py-12">
      {rows.map((items, i) => {
        const content = [...items, ...items];
        return (
          <div key={i} className="flex overflow-hidden whitespace-nowrap">
            <div data-track className="flex shrink-0 will-change-transform">
              {[0, 1].map(copy => (
                <div key={copy} className="flex shrink-0 items-center">
                  {content.map((word, j) => (
                    <span key={`${copy}-${j}`} className="flex items-center">
                      <span
                        className={clsx(
                          'px-5 font-display text-5xl leading-[1.15] font-medium tracking-tight md:px-8 md:text-7xl',
                          i % 2 === 1 && 'text-transparent [-webkit-text-stroke:1.2px_var(--ink)]',
                        )}
                      >
                        {word}
                      </span>
                      <span className="size-2.5 shrink-0 rounded-full bg-coral md:size-3.5" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
