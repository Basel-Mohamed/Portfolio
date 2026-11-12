import { useId } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LuX } from 'react-icons/lu';
import { CertificationItem } from '../../types/portfolio';
import { useUI } from '../../lib/ui-strings';
import { useDialog } from '../../hooks/useDialog';

interface CertificateModalProps {
  cert: CertificationItem | null;
  onClose: () => void;
}

export function CertificateModal({ cert, onClose }: CertificateModalProps) {
  const ui = useUI();
  const titleId = useId();
  const dialogRef = useDialog<HTMLDivElement>(!!cert, onClose);
  const isPdf = cert?.image?.toLowerCase().endsWith('.pdf');

  return createPortal(
    <AnimatePresence>
      {cert && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8">
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
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-line bg-bg text-ink shadow-2xl outline-none"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="eyebrow text-coral-ink">{cert.category}</p>
                <h2 id={titleId} className="mt-1 truncate font-display text-lg font-medium sm:text-xl" title={cert.title}>
                  {cert.title}
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
            <div className="flex items-center justify-center bg-surface-2 p-4 sm:p-6">
              {isPdf ? (
                <iframe src={`${cert.image}#toolbar=0`} title={cert.title} className="h-[75dvh] w-full rounded-xl bg-white" />
              ) : (
                <img src={cert.image} alt={cert.title} className="h-auto max-h-[75dvh] w-auto max-w-full rounded-xl object-contain shadow-lg" />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
