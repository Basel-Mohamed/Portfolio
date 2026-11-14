import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { FaGithub } from 'react-icons/fa6';
import { LuArrowUpRight } from 'react-icons/lu';
import { Project } from '../../types/portfolio';
import { useUI } from '../../lib/ui-strings';
import { Chip, Reveal } from '../ui/primitives';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Large, side-by-side layout used for a lead project. */
  featured?: boolean;
}

const actionBtn =
  'inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink transition-colors duration-200 hover:border-line-strong hover:bg-surface-2';

/** NDA marker: a notice-coloured pill, always with the words, never colour alone. */
export function NdaBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center rounded-full border border-notice px-2.5 font-mono text-xs font-medium tracking-wide text-notice uppercase rtl:tracking-normal">
      {children}
    </span>
  );
}

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const ui = useUI();
  const hasLinks = !project.nda && ((project.github && project.github !== '#') || project.live);

  return (
    <Reveal
      as="article"
      id={`project-${project.id}`}
      delay={Math.min(index, 3) * 0.08}
      className={clsx(
        'group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-line bg-surface',
        featured && project.image && 'lg:grid lg:grid-cols-2',
      )}
    >
      {project.image && (
        <div className={clsx('relative overflow-hidden bg-surface-2', featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-full' : 'aspect-[16/10]')}>
          <img
            loading="lazy"
            decoding="async"
            src={project.image}
            alt={project.title}
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className={clsx('flex flex-grow flex-col p-6 sm:p-8', featured && 'lg:p-10')}>
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow text-ink-muted">{project.category}</p>
          {project.nda && <NdaBadge>{ui.project.nda}</NdaBadge>}
        </div>
        <h3 className={clsx('mt-3 font-semibold tracking-tight', featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-[1.75rem]')}>
          {project.title}
        </h3>

        {project.metrics && project.metrics.length > 0 && (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
            {project.metrics.map(metric => (
              <div key={metric.label} className="flex min-w-0 flex-col">
                <dt className="order-2 mt-1 text-sm text-ink-muted">{metric.label}</dt>
                <dd className="order-1 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold tracking-tight tabular-nums" dir="ltr">
                    {metric.value}
                  </span>
                  {metric.change && (
                    <span className="text-sm font-semibold text-positive" dir="ltr">
                      {metric.change}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-6 flex-grow text-ink-muted">{project.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack" dir="ltr">
          {project.tech.map(tech => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </ul>

        {hasLinks && (
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-6">
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
          </div>
        )}
      </div>
    </Reveal>
  );
}
