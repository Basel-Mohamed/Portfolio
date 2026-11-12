import { useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { ProjectCard } from '../components/features/ProjectCard';
import { Project } from '../types/portfolio';
import { useSEO } from '../hooks/useSEO';
import { useUI } from '../lib/ui-strings';
import { PageHeader, FilterBar, Eyebrow } from '../components/ui/primitives';
import { CtaBand } from '../components/ui/CtaBand';

type Filter = 'all' | 'ai' | 'fullstack';
const CATEGORIES: Exclude<Filter, 'all'>[] = ['ai', 'fullstack'];

function ProjectGrid({ items: raw }: { items: Project[] }) {
  // Featured projects lead each group; otherwise keep data order.
  const items = [...raw.filter(p => p.featured), ...raw.filter(p => !p.featured)];
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
      {items.map((project, index) => {
        // An odd last card gets the wide layout instead of leaving a hole.
        const wide = items.length % 2 === 1 && index === items.length - 1;
        return (
          <div key={project.id} className={wide ? 'md:col-span-2' : undefined}>
            <ProjectCard project={project} index={index} featured={wide} />
          </div>
        );
      })}
    </div>
  );
}

export function Projects() {
  const { t } = useLanguage();
  const ui = useUI();
  const [params, setParams] = useSearchParams();

  useSEO({
    title: 'Projects - Basel Mohamed | AI & Full Stack Portfolio',
    description:
      'Explore AI and Full Stack projects by Basel Mohamed, including NLP systems, RAG pipelines, Generative AI applications, and modern web applications.',
    url: '/projects',
  });

  const items: Project[] = t.projects?.items || [];
  const requested = params.get('type');
  const active: Filter = requested === 'ai' || requested === 'fullstack' ? requested : 'all';
  const setActive = (v: Filter) => setParams(v === 'all' ? {} : { type: v }, { replace: true, preventScrollReset: true });

  const byType = (c: Exclude<Filter, 'all'>) => items.filter(p => p.type === c);
  const visible = active === 'all' ? CATEGORIES : [active];

  return (
    <>
      <PageHeader eyebrow={t.nav.projects} title={t.projects.title} lede={t.projects.subtitle || ui.project.lede}>
        <div className="mt-10">
          <FilterBar<Filter>
            label={t.projects.title}
            value={active}
            onChange={setActive}
            options={[
              { value: 'all', label: ui.project.tabs.all, count: items.length },
              { value: 'ai', label: ui.project.tabs.ai, count: byType('ai').length },
              { value: 'fullstack', label: ui.project.tabs.fullstack, count: byType('fullstack').length },
            ]}
          />
        </div>
      </PageHeader>

      <div className="shell">
        {visible.map((cat, i) => {
          const list = byType(cat);
          return (
            <section
              key={`${active}-${cat}`}
              className="border-b border-line py-16 last:border-b-0 md:py-20"
              aria-labelledby={active === 'all' ? `group-${cat}` : undefined}
            >
              {active === 'all' && (
                <div className="mb-10 flex items-end justify-between gap-4">
                  <div>
                    <Eyebrow index={String(i + 1).padStart(2, '0')}>{t.nav.projects}</Eyebrow>
                    <h2 id={`group-${cat}`} className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                      {ui.project.tabs[cat]}
                    </h2>
                  </div>
                  <span className="font-mono text-sm text-ink-muted">{String(list.length).padStart(2, '0')}</span>
                </div>
              )}
              {list.length > 0 ? (
                <ProjectGrid items={list} />
              ) : (
                <p className="rounded-3xl border border-dashed border-line-strong py-16 text-center text-ink-muted">{ui.project.empty}</p>
              )}
            </section>
          );
        })}
      </div>

      <CtaBand />
    </>
  );
}
