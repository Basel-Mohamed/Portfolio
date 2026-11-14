import React from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { LuArrowRight, LuArrowUpRight, LuChevronRight } from 'react-icons/lu';
import { SplitReveal } from '../motion/SplitReveal';

/* ---------- Buttons ---------- */

/**
 * primary    accent fill. One per screen.
 * secondary  quiet pill.
 * ghost      text-only.
 * inverse / outline-inverse  kept for older call sites; same as primary / secondary.
 *            On a stage band (a section with the `dark` class) tokens flip by themselves.
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'outline-inverse';
type ButtonSize = 'md' | 'lg';

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra?: string) {
  return clsx(
    'group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap',
    'transition-[background-color,color,border-color,transform] duration-200 ease-out-soft active:scale-[0.98]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    size === 'md' ? 'h-11 px-5 text-sm' : 'h-12 px-7 text-[1.0625rem]',
    (variant === 'primary' || variant === 'inverse') && 'bg-accent text-on-accent hover:bg-accent-hover',
    (variant === 'secondary' || variant === 'outline-inverse') &&
      'border border-line bg-surface text-ink hover:border-line-strong hover:bg-surface-raised',
    variant === 'ghost' && 'text-ink hover:bg-surface-2 px-4',
    extra,
  );
}

/** Chevron text link: the default secondary action. */
export function linkClass(extra?: string) {
  return clsx(
    'group/btn inline-flex min-h-11 items-center gap-1 text-[1.0625rem] font-medium text-accent-text underline-offset-4 hover:underline',
    extra,
  );
}

export function Chevron({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <LuChevronRight
      aria-hidden="true"
      size={size}
      className={clsx('rtl:-scale-x-100 transition-transform duration-200 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5', className)}
    />
  );
}

/** Forward arrow that points the reading direction (flips in RTL). */
export function ArrowForward({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <LuArrowRight
      aria-hidden="true"
      size={size}
      className={clsx('rtl:-scale-x-100 transition-transform duration-200 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5', className)}
    />
  );
}

export function ArrowOut({ className, size = 16 }: { className?: string; size?: number }) {
  return <LuArrowUpRight aria-hidden="true" size={size} className={clsx('rtl:-scale-x-100', className)} />;
}

/* ---------- Motion ---------- */

export function Reveal({
  children,
  className,
  id,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Headings ---------- */

/** Mono data label above a headline. `index` is accepted for older call sites and not shown. */
export function Eyebrow({ children, className }: { index?: string; children: React.ReactNode; className?: string }) {
  return <p className={clsx('eyebrow text-ink-muted', className)}>{children}</p>;
}

/** Centred section heading: label, one large headline, one line of supporting copy. */
export function SectionHeading({
  eyebrow,
  title,
  id,
  lede,
  action,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  /** id on the h2, for aria-labelledby on the surrounding section. */
  id?: string;
  lede?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center md:mb-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <SplitReveal as="h2" id={id} text={title} className="mt-4 text-display-l" />
      {lede && <p className="mt-6 max-w-[62ch] text-body-l text-ink-muted">{lede}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/** Top-of-page header used by every sub page. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative">
      <div className="shell pt-36 pb-12 md:pt-48 md:pb-20 short:pt-24!">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <SplitReveal as="h1" text={title} trigger="load" delay={0.1} className="mt-4 text-display-xl" />
          {lede && <p className="mt-6 max-w-[62ch] text-body-l text-ink-muted">{lede}</p>}
          {children}
        </motion.div>
      </div>
    </header>
  );
}

/* ---------- Small pieces ---------- */

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-lg border border-line px-2.5 py-1.5 font-mono text-[0.75rem] leading-none text-ink-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Segmented filter (projects + certifications). */
export function FilterBar<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string; count?: number }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-2">
      {options.map(opt => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={clsx(
              'inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors duration-200',
              active ? 'border-ink bg-ink text-bg' : 'border-line text-ink-muted hover:border-line-strong hover:text-ink',
            )}
          >
            {opt.label}
            {typeof opt.count === 'number' && <span className="font-mono text-xs">{opt.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
