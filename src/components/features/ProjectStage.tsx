import { useRef } from 'react';
import { Link } from 'react-router';
import { Project } from '../../types/portfolio';
import { NdaBadge } from './ProjectCard';
import { useUI } from '../../lib/ui-strings';
import { Chip, Chevron, linkClass } from '../ui/primitives';
import { SplitReveal } from '../motion/SplitReveal';
import { gsap, useGSAP } from '../../lib/motion';

/**
 * A full-width stage band for one featured project: headline, one paragraph,
 * and its numbers set large. Always black, in both themes.
 *
 * Signature motion (every screen size): the band pins for a short scroll while
 * the metrics arrive one at a time, each counting up as it lands. The motion
 * is tied to the scrollbar. With reduced motion nothing moves.
 */
export function ProjectStage({ project }: { project: Project }) {
  const ui = useUI();
  const wrapRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const metrics = project.metrics ?? [];
  const metricsKey = metrics.map(m => m.value).join('|');

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const pin = pinRef.current;
      if (!wrap || !pin) return;
      const items = gsap.utils.toArray<HTMLElement>('[data-metric]', wrap);
      if (items.length === 0) return;

      // Each number is split into prefix, digits and suffix so only the digits count.
      const parts = items.map(el => {
        const numEl = el.querySelector<HTMLElement>('[data-num]');
        const full = numEl?.dataset.value ?? '';
        return { el, numEl, full, match: full.match(/^(\D*)(\d+)(.*)$/) };
      });
      type Part = (typeof parts)[number];
      const show = (p: Part, v: number) => {
        if (p.numEl && p.match) p.numEl.textContent = `${p.match[1]}${Math.round(v)}${p.match[3]}`;
      };
      const restore = () => parts.forEach(p => p.numEl && (p.numEl.textContent = p.full));

      const mm = gsap.matchMedia();
      const motionOk = '(prefers-reduced-motion: no-preference)';

      // Every screen size: pin and reveal the metrics in sequence. When the band is taller
      // than the window (phones, short windows) it pins once its bottom reaches the bottom
      // of the window, so the whole metric row is on screen while it plays.
      mm.add(motionOk, () => {
        const tall = () => pin.offsetHeight > window.innerHeight;
        const perItem = () => (window.innerWidth < 1024 ? 260 : 340);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: () => (tall() ? 'bottom bottom' : 'top top'),
            end: () => `+=${items.length * perItem()}`,
            pin,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
        parts.forEach((p, i) => {
          const state = { v: 0 };
          show(p, 0);
          tl.from(p.el, { opacity: 0, y: 48, duration: 1, ease: 'power2.out' }, i);
          if (p.match) {
            tl.to(state, { v: Number(p.match[2]), duration: 1, ease: 'power1.out', onUpdate: () => show(p, state.v) }, i);
          }
        });
        tl.to({}, { duration: 0.4 });
        return restore;
      });

      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [project.id, metricsKey] },
  );

  return (
    <section ref={wrapRef} className="dark bg-bg text-ink" aria-labelledby={`stage-${project.id}`}>
      <div ref={pinRef} className="flex min-h-dvh flex-col justify-center py-16 md:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow text-ink-muted">{project.category}</p>
            {project.nda && <NdaBadge>{ui.project.nda}</NdaBadge>}
          </div>
          <SplitReveal as="h2" id={`stage-${project.id}`} text={project.title} className="mt-4 max-w-4xl text-display-l" />
          <p className="mt-6 max-w-[62ch] text-body-l text-ink-muted">{project.description}</p>

          {metrics.length > 0 && (
            <dl className="mt-14 grid gap-x-12 gap-y-10 border-t border-line pt-10 sm:grid-cols-3">
              {metrics.map(m => (
                <div key={m.label} data-metric className="flex flex-col">
                  <dt className="order-2 mt-2 text-ink-muted">{m.label}</dt>
                  <dd className="order-1 flex items-baseline gap-3">
                    <span className="sr-only">{m.value}</span>
                    {/* key remounts the node when the value changes, so GSAP never fights React */}
                    <span key={m.value} data-num data-value={m.value} aria-hidden="true" className="text-display-l tabular-nums" dir="ltr">
                      {m.value}
                    </span>
                    {m.change && (
                      <span className="font-semibold text-positive" dir="ltr">
                        {m.change}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <ul className="flex flex-wrap gap-2" aria-label="Tech stack" dir="ltr">
              {project.tech.map(tech => (
                <li key={tech}>
                  <Chip>{tech}</Chip>
                </li>
              ))}
            </ul>
            <Link to="/projects" className={linkClass()}>
              {ui.viewAllProjects}
              <Chevron />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
