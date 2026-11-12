import React from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu';

/* ---------- Buttons ---------- */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'outline-inverse';
type ButtonSize = 'md' | 'lg';

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra?: string) {
  return clsx(
    'group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap',
    'transition-[background-color,color,border-color,transform] duration-200 ease-out-soft active:scale-[0.98]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    size === 'md' ? 'h-11 px-5 text-sm' : 'h-13 px-7 text-base',
    variant === 'primary' && 'bg-coral text-on-coral hover:bg-ink hover:text-bg',
    variant === 'secondary' && 'border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-bg',
    variant === 'ghost' && 'text-ink hover:bg-surface-2 px-4',
    variant === 'inverse' && 'bg-coral text-on-coral hover:bg-cream hover:text-navy',
    variant === 'outline-inverse' && 'border border-cream/40 text-on-inverse hover:border-cream hover:bg-cream hover:text-navy',
    extra,
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
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Headings ---------- */

export function Eyebrow({ index, children, className }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={clsx('eyebrow flex items-center gap-3 text-ink-muted', className)}>
      {index && <span className="text-coral-ink">{index}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  action,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 className="mt-5 font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">{title}</h2>
        {lede && <p className="mt-5 text-lg text-ink-muted">{lede}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
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
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative border-b border-line">
      <div className="shell pt-16 pb-12 md:pt-24 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1] font-medium tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {lede && <p className="mt-6 max-w-2xl text-lg text-ink-muted sm:text-xl">{lede}</p>}
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
        'inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[0.75rem] leading-none text-ink-muted',
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
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
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
              active
                ? 'border-ink bg-ink text-bg'
                : 'border-line-strong text-ink-muted hover:border-ink hover:text-ink',
            )}
          >
            {opt.label}
            {typeof opt.count === 'number' && (
              <span className={clsx('font-mono text-xs', active ? 'text-coral' : 'text-ink-muted')}>{opt.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
