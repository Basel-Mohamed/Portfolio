import { useRef } from 'react';
import { clsx } from 'clsx';
import { ProjectMetric } from '../../types/portfolio';
import { useLanguage } from '../../context/LanguageContext';
import { CountUp } from '../motion/Effects';
import { gsap, useGSAP } from '../../lib/motion';

interface ProofTile {
  metric: ProjectMetric;
  project: string;
}

interface ProofBentoProps {
  lead: ProofTile;
  rest: ProofTile[];
  years: string;
  yearsEyebrow: string;
  yearsLabel: string;
}

/** How much larger the lead tile starts before it settles into the grid. */
const LEAD_SCALE = 1.32;

const tile = 'flex min-h-44 flex-col justify-between rounded-3xl p-6 xl:p-8';
const smallNumber =
  'text-[clamp(1.75rem,3vw,3rem)] leading-[1.08] font-semibold tracking-[-0.025em] whitespace-nowrap tabular-nums';

/**
 * Results bento: one lead metric and four supporting tiles.
 *
 * Signature motion (large screens): as the grid scrolls into view the lead
 * tile starts oversized and settles into its place while the other tiles
 * slide in beside it. The motion is tied to the scrollbar, so the visitor
 * controls it. On phones the tiles simply fade up; with reduced motion
 * nothing moves. Without scripts every tile is visible.
 */
export function ProofBento({ lead, rest, years, yearsEyebrow, yearsLabel }: ProofBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const { dir } = useLanguage();

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const leadEl = grid.querySelector<HTMLElement>('[data-lead]');
      const others = gsap.utils.toArray<HTMLElement>('[data-tile]', grid);
      if (!leadEl) return;
      const rtl = dir === 'rtl';
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: grid, start: 'top 90%', end: 'top 28%', scrub: 0.6 },
          })
          .from(leadEl, { scale: LEAD_SCALE, transformOrigin: rtl ? '100% 50%' : '0% 50%', duration: 1 }, 0)
          // The side tiles start pushed out by exactly the lead tile's extra width and travel
          // back with it, so the lead never covers them while it settles.
          .from(others, { x: () => leadEl.offsetWidth * (LEAD_SCALE - 1) * (rtl ? -1 : 1), duration: 1 }, 0)
          .from(others, { opacity: 0, duration: 0.5, stagger: 0.08 }, 0.2);
      });

      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.from([leadEl, ...others], {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: grid, start: 'top 88%', once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: gridRef, dependencies: [dir, rest.length] },
  );

  return (
    <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div data-lead className={clsx(tile, 'relative z-10 bg-surface will-change-transform sm:col-span-2 lg:row-span-2 lg:p-10')}>
        <p className="eyebrow text-ink-muted">{lead.metric.label}</p>
        <div>
          <p className="text-metric-xl" dir="ltr">
            <CountUp value={lead.metric.value} />
          </p>
          <p className="mt-4 text-ink-muted">
            {lead.project}
            {lead.metric.change && (
              <span className="ms-2 font-semibold text-positive" dir="ltr">
                {lead.metric.change}
              </span>
            )}
          </p>
        </div>
      </div>

      {rest.map(x => (
        <div key={x.project} data-tile className={clsx(tile, 'bg-surface')}>
          <p className="eyebrow text-ink-muted">{x.metric.label}</p>
          <div>
            <p className={smallNumber} dir="ltr">
              <CountUp value={x.metric.value} />
            </p>
            <p className="mt-2 text-sm text-ink-muted">{x.project}</p>
          </div>
        </div>
      ))}

      <div data-tile className={clsx(tile, 'bg-ink text-bg')}>
        <p className="eyebrow opacity-70">{yearsEyebrow}</p>
        <div>
          <p className={smallNumber} dir="ltr">
            <CountUp value={years} />
          </p>
          <p className="mt-2 text-sm opacity-70">{yearsLabel}</p>
        </div>
      </div>
    </div>
  );
}
