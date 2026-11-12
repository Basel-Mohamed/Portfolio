import { Link } from 'react-router';
import { LuCheck } from 'react-icons/lu';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { CtaBand } from '../components/ui/CtaBand';
import { useUI } from '../lib/ui-strings';
import { PageHeader, Reveal, buttonClass, ArrowForward } from '../components/ui/primitives';

export function Services() {
  const { t } = useLanguage();
  const ui = useUI();

  useSEO({
    title: 'Services - Basel Mohamed | AI Engineering & Development',
    description:
      'Freelance AI engineering and software development services by Basel Mohamed: NLP solutions, RAG pipelines, Generative AI integrations, and Full Stack web applications.',
    url: '/services',
  });

  return (
    <>
      <PageHeader eyebrow={t.nav.services} title={t.services.title} lede={ui.services.lede} />

      <section className="shell py-16 md:py-20">
        <ol className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {t.services.items.map((service, index) => (
            <Reveal
              as="li"
              key={service.id ?? service.title}
              delay={(index % 2) * 0.06}
              className="group flex flex-col rounded-3xl border border-line bg-surface p-8 transition-colors duration-300 hover:border-line-strong sm:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-coral-ink">{String(index + 1).padStart(2, '0')}</span>
                <span aria-hidden="true" className="h-px flex-1 mx-4 bg-line" />
              </div>
              <h2 className="mt-6 font-display text-3xl font-medium tracking-tight">{service.title}</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{service.description}</p>

              {service.features && service.features.length > 0 && (
                <ul className="mt-8 flex-grow space-y-3">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-coral text-on-coral">
                        <LuCheck size={12} strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                to={`/contact?service=${encodeURIComponent(service.title)}`}
                className={buttonClass('secondary', 'md', 'mt-10 w-full sm:w-auto sm:self-start')}
              >
                {t.services.cta}
                <ArrowForward />
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>
      <CtaBand />
    </>
  );
}
