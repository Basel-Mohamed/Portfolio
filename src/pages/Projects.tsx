import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProjectCard } from '../components/features/ProjectCard';
import { Project } from '../types/portfolio';
import { useSEO } from '../hooks/useSEO';
import { useUI } from '../lib/ui-strings';
import { PageHeader, FilterBar } from '../components/ui/primitives';

type Category = 'ai' | 'fullstack';

export function Projects() {
  const { t } = useLanguage();
  const ui = useUI();
  const [activeCategory, setActiveCategory] = useState<Category>('ai');

  useSEO({
    title: 'Projects - Basel Mohamed | AI & Full Stack Portfolio',
    description:
      'Explore AI and Full Stack projects by Basel Mohamed, including NLP systems, RAG pipelines, Generative AI applications, and modern web applications.',
    url: '/projects',
  });

  const items: Project[] = t.projects?.items || [];
  const filtered = items.filter(p => p.type === activeCategory);
  const count = (c: Category) => items.filter(p => p.type === c).length;

  return (
    <>
      <PageHeader eyebrow={t.nav.projects} title={t.projects.title} lede={t.projects.subtitle || ui.project.lede}>
        <div className="mt-10">
          <FilterBar<Category>
            label={t.projects.title}
            value={activeCategory}
            onChange={setActiveCategory}
            options={[
              { value: 'ai', label: ui.project.tabs.ai, count: count('ai') },
              { value: 'fullstack', label: ui.project.tabs.fullstack, count: count('fullstack') },
            ]}
          />
        </div>
      </PageHeader>

      <section className="shell py-16 md:py-20" aria-live="polite">
        {filtered.length > 0 ? (
          <div key={activeCategory} className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-line-strong py-16 text-center text-ink-muted">{ui.project.empty}</p>
        )}
      </section>
    </>
  );
}
