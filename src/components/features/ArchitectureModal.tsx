import { useId } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LuX, LuCheck } from 'react-icons/lu';
import { Project } from '../../types/portfolio';
import { useUI } from '../../lib/ui-strings';
import { useDialog } from '../../hooks/useDialog';
import { Chip, buttonClass } from '../ui/primitives';

interface ArchitectureModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureModal({ project, isOpen, onClose }: ArchitectureModalProps) {
  const ui = useUI();
  const titleId = useId();
  const open = isOpen && !!project?.architecture;
  const dialogRef = useDialog<HTMLDivElement>(open, onClose);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && project?.architecture && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-scrim backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-bg text-ink shadow-2xl outline-none sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
              <div className="min-w-0">
                <p className="eyebrow text-coral-ink">{project.architecture.diagramTitle || ui.arch.title}</p>
                <h2 id={titleId} className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">{ui.arch.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2"
                aria-label={ui.arch.close}
              >
                <LuX size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 space-y-10 overflow-y-auto overscroll-contain px-6 py-8 sm:px-8">
              <div className="rounded-2xl border-s-4 border-coral bg-surface-2 p-5">
                <p className="eyebrow text-ink-muted">{ui.arch.overview}</p>
                <p className="mt-2 leading-relaxed">{project.architecture.overview}</p>
              </div>

              <div>
                <p className="eyebrow mb-6 text-ink-muted">{ui.arch.steps}</p>
                <ol className="relative space-y-4">
                  {project.architecture.pipeline.map((step, idx) => {
                    const isLast = idx === project.architecture!.pipeline.length - 1;
                    return (
                      <li key={step.step} className="relative flex gap-4 sm:gap-5">
                        <div className="flex flex-col items-center">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-sm font-medium text-bg">
                            {step.step}
                          </span>
                          {!isLast && <span aria-hidden="true" className="mt-2 w-px flex-1 bg-line-strong" />}
                        </div>
                        <div className="mb-2 flex-1 rounded-2xl border border-line bg-surface p-5">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <h3 className="text-base font-semibold">{step.title}</h3>
                            {step.keyHighlight && (
                              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-coral px-2.5 py-1 text-xs font-medium text-on-coral">
                                <LuCheck size={12} aria-hidden="true" />
                                {step.keyHighlight}
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                          {step.technologies?.length > 0 && (
                            <ul className="mt-4 flex flex-wrap gap-1.5">
                              {step.technologies.map(tech => (
                                <li key={tech}>
                                  <Chip>{tech}</Chip>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <div className="flex justify-end border-t border-line px-6 py-4 sm:px-8">
              <button type="button" onClick={onClose} className={buttonClass('secondary')}>
                {ui.arch.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
