import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LuX, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { CertView } from '../../lib/certs';
import { useUI } from '../../lib/ui-strings';
import { useLanguage } from '../../context/LanguageContext';
import { useDialog } from '../../hooks/useDialog';

interface CertificateModalProps {
  /** The list the user is browsing, in display order. */
  certs: CertView[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function CertificateModal({ certs, index, onClose, onNavigate }: CertificateModalProps) {
  const ui = useUI();
  const { dir } = useLanguage();
  const titleId = useId();
  const cert = index !== null ? certs[index] : null;
  const dialogRef = useDialog<HTMLDivElement>(!!cert, onClose);
  const isPdf = cert?.image?.toLowerCase().endsWith('.pdf');
  const hasNav = certs.length > 1;

  const go = (delta: number) => {
    if (index === null) return;
    onNavigate((index + delta + certs.length) % certs.length);
  };

  // Arrow keys step through certificates (mirrored in RTL).
  useEffect(() => {
    if (!cert || !hasNav) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const forward = e.key === 'ArrowRight' ? dir === 'ltr' : dir === 'rtl';
      go(forward ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const navBtn =
    'inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg';

  return createPortal(
    <AnimatePresence>
      {cert && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-8 short:p-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-scrim backdrop-blur-sm"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-line bg-bg text-ink shadow-2xl outline-none"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6 short:py-1.5">
              <div className="min-w-0">
                <p className="eyebrow truncate text-accent-text">
                  {[cert.issuer, cert.date].filter(Boolean).join(' · ')}
                </p>
                <h2 id={titleId} className="mt-1 truncate font-display text-lg font-semibold sm:text-xl" title={cert.title}>
                  {cert.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-surface-2"
                aria-label={ui.certs.close}
              >
                <LuX size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center bg-surface-2 p-3 sm:p-6 short:p-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex size-full items-center justify-center"
                >
                  {isPdf ? (
                    <iframe src={`${cert.image}#toolbar=0`} title={cert.title} className="h-[70dvh] w-full rounded-xl bg-white short:h-[calc(100dvh-10.5rem)]" />
                  ) : (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="h-auto max-h-[70dvh] w-auto max-w-full rounded-xl object-contain shadow-lg short:max-h-[calc(100dvh-10.5rem)]"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {hasNav && index !== null && (
              <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-3 sm:px-6 short:py-1.5">
                <button type="button" onClick={() => go(-1)} className={navBtn} aria-label={ui.certs.prev}>
                  <LuChevronLeft size={20} aria-hidden="true" className="rtl:-scale-x-100" />
                </button>
                <p className="font-mono text-sm text-ink-muted tabular-nums" aria-live="polite">
                  {index + 1} {ui.certs.of} {certs.length}
                </p>
                <button type="button" onClick={() => go(1)} className={navBtn} aria-label={ui.certs.next}>
                  <LuChevronRight size={20} aria-hidden="true" className="rtl:-scale-x-100" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
