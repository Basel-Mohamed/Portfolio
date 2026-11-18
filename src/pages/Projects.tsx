import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { ProjectCard } from '../components/features/ProjectCard';
import { Project } from '../types/portfolio';
import { useSEO } from '../hooks/useSEO';
import { useUI } from '../lib/ui-strings';
import { PageHeader, Eyebrow } from '../components/ui/primitives';
import Folder from '../components/reactbits/Folder';
import { useTheme } from '../context/ThemeContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CtaBand } from '../components/ui/CtaBand';
import { settleAt } from '../lib/smoothScroll';

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
  const navigate = useNavigate();
  const { theme } = useTheme();
  const phone = useMediaQuery('(max-width: 639px)');
  const { hash } = useLocation();

  // Arriving from the home page ring (/projects#project-<id>): open the page already
  // on that project's card, just below the navigation, and outline it for a moment.
  useEffect(() => {
    if (!hash.startsWith('#project-')) return;
    const id = decodeURIComponent(hash.slice(1));
    const stop = settleAt(() => {
      const card = document.getElementById(id);
      if (!card) return null;
      card.classList.add('project-flash');
      return card.getBoundingClientRect().top + window.scrollY - 112;
    });
    return () => {
      stop();
      document.getElementById(id)?.classList.remove('project-flash');
    };
  }, [hash]);

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
        {/* React Bits "Folder": one per category. Opening one shows only that category, closing it shows everything.
            Clicking a page inside an open folder jumps to that project's card. */}
        <div role="group" aria-label={t.projects.title} className="mt-10 flex flex-wrap items-end justify-center gap-x-6 gap-y-8 pt-28 sm:gap-x-16 sm:pt-36">
          {CATEGORIES.map(cat => {
            const list = byType(cat);
            return (
              <div key={cat} className="flex flex-col items-center gap-4">
                <Folder
                  label={ui.project.tabs[cat]}
                  color="#1668e3"
                  theme={theme === 'dark' ? 'dark' : 'light'}
                  size={phone ? 0.66 : 1}
                  items={list.filter(p => p.image).slice(0, 5).map(p => ({ image: p.image, alt: p.title, title: p.title }))}
                  open={active === cat}
                  onOpenChange={open => setActive(open ? cat : active === cat ? 'all' : active)}
                  closeOnOutsideClick={false}
                  zoomOnClick={false}
                  draggable={false}
                  onItemClick={(_item, index) => {
                    const project = list.filter(p => p.image)[index];
                    if (project) navigate(`/projects?type=${cat}#project-${project.id}`);
                  }}
                />
                <span className="font-mono text-sm text-ink-muted tabular-nums">{String(list.length).padStart(2, '0')}</span>
              </div>
            );
          })}
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
                    <h2 id={`group-${cat}`} className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
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
