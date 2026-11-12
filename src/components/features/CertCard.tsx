import { clsx } from 'clsx';
import { LuMaximize2 } from 'react-icons/lu';
import { CertView } from '../../lib/certs';
import { useUI } from '../../lib/ui-strings';

interface CertCardProps {
  cert: CertView;
  onOpen: () => void;
  /** Larger card with a taller preview, used for highlights. */
  large?: boolean;
}

export function CertCard({ cert, onOpen, large = false }: CertCardProps) {
  const ui = useUI();

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${ui.certs.view}: ${cert.title}`}
      className="group flex size-full flex-col overflow-hidden rounded-3xl border border-line bg-surface text-start transition-colors duration-300 hover:border-line-strong"
    >
      <span className={clsx('relative block w-full overflow-hidden border-b border-line bg-surface-2', large ? 'aspect-[4/3]' : 'aspect-[16/10]')}>
        <img
          loading="lazy"
          decoding="async"
          src={cert.image}
          alt=""
          className="size-full object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
        />
        <span className="absolute end-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-bg/90 text-ink opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <LuMaximize2 size={15} aria-hidden="true" />
        </span>
      </span>
      <span className={clsx('flex flex-grow flex-col', large ? 'p-6 sm:p-7' : 'p-5')}>
        <span className="flex items-start justify-between gap-3">
          <span className="eyebrow min-w-0 text-coral-ink">{cert.issuer || cert.category}</span>
          <span className="shrink-0 font-mono text-xs text-ink-muted">{cert.date}</span>
        </span>
        <span className={clsx('mt-3 line-clamp-3 leading-snug font-semibold', large ? 'font-display text-xl font-medium md:text-lg lg:text-2xl' : 'text-base')}>
          {cert.name}
        </span>
      </span>
    </button>
  );
}
