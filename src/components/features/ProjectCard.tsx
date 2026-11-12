import { useState } from 'react';
import { clsx } from 'clsx';
import { FaGithub } from 'react-icons/fa6';
import { LuLock, LuWorkflow, LuArrowUpRight } from 'react-icons/lu';
import { Project } from '../../types/portfolio';
import { ArchitectureModal } from './ArchitectureModal';
import { useUI } from '../../lib/ui-strings';
import { Chip, Reveal } from '../ui/primitives';
import { Tilt } from '../motion/Effects';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Large, side-by-side layout used for the lead project on the home page. */
  featured?: boolean;
}

const actionBtn =
  'inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-bg';

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const ui = useUI();
  const [isArchOpen, setIsArchOpen] = useState(false);
  const number = String(index + 1).padStart(2, '0');

  return (
    <>
      <Tilt max={featured ? 2.5 : 5}>
      <Reveal
        as="article"
        delay={Math.min(index, 3) * 0.06}
        className={clsx(
          'group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong',
          featured && 'lg:grid lg:grid-cols-2',
        )}
      >
        <div className={clsx('relative overflow-hidden bg-surface-2', featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-full' : 'aspect-[16/10]')}>
          <img
            loading="lazy"
            decoding="async"
            src={project.image}
            alt={project.title}
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
          />
        </div>

        <div className={clsx('flex flex-grow flex-col p-6 sm:p-8', featured && 'lg:p-10')}>
          <p className="eyebrow text-coral-ink">
            <span className="text-ink-muted">{number}</span>
            <span aria-hidden="true" className="mx-2 text-line-strong">/</span>
            {project.category}
          </p>
          <h3 className={clsx('mt-3 font-display font-medium tracking-tight', featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl')}>
            {project.title}
          </h3>

          {project.metrics && project.metrics.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {project.metrics.map(metric => (
                <div key={metric.label} className="min-w-0 flex-[1_1_7rem] bg-surface px-4 py-3">
                  <dt className="text-xs text-ink-muted">{metric.label}</dt>
                  <dd className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-mono text-base font-medium tabular-nums">{metric.value}</span>
                    {metric.change && <span className="font-mono text-xs text-coral-ink">{metric.change}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <p className="mt-6 flex-grow leading-relaxed text-ink-muted">{project.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.tech.map(tech => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-6">
            {project.architecture && (
              <button type="button" onClick={() => setIsArchOpen(true)} className={clsx(actionBtn, 'border-coral bg-coral text-on-coral hover:border-ink')}>
                <LuWorkflow size={16} aria-hidden="true" />
                {ui.project.architecture}
              </button>
            )}
            {project.nda ? (
              <span className="inline-flex h-10 items-center gap-2 rounded-full bg-surface-2 px-4 text-sm font-medium text-ink-muted">
                <LuLock size={15} aria-hidden="true" />
                {ui.project.nda}
              </span>
            ) : (
              <>
                {project.github && project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={actionBtn}>
                    <FaGithub size={15} aria-hidden="true" />
                    {ui.project.code}
                    <span className="sr-only"> — {project.title}</span>
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className={actionBtn}>
                    {ui.project.live}
                    <LuArrowUpRight size={15} aria-hidden="true" className="rtl:-scale-x-100" />
                    <span className="sr-only"> — {project.title}</span>
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </Reveal>
      </Tilt>

      <ArchitectureModal project={project} isOpen={isArchOpen} onClose={() => setIsArchOpen(false)} />
    </>
  );
}
