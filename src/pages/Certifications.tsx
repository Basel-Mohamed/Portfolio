import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { CertificateModal } from '../components/layout/CertificateModal';
import { CertCard } from '../components/features/CertCard';
import { useSEO } from '../hooks/useSEO';
import { useUI } from '../lib/ui-strings';
import { toCertView, uniqueIssuers, CertView } from '../lib/certs';
import { PageHeader, FilterBar, Reveal, Eyebrow } from '../components/ui/primitives';
import { CtaBand } from '../components/ui/CtaBand';

const ALL = 'all';

export function Certifications() {
  const { t } = useLanguage();
  const ui = useUI();
  const [params, setParams] = useSearchParams();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useSEO({
    title: 'Certifications - Basel Mohamed | AI & Cloud Learning',
    description:
      'Professional certifications earned by Basel Mohamed in Artificial Intelligence, Machine Learning, Cloud Computing, and Full Stack Development.',
    url: '/certifications',
  });

  const certs = useMemo(() => t.about.certifications.map(toCertView), [t.about.certifications]);
  const categories = useMemo(() => Array.from(new Set(certs.map(c => c.category || 'Other'))), [certs]);

  // Filter lives in the URL so it can be shared and survives Back.
  const requested = params.get('category');
  const active = requested && categories.includes(requested) ? requested : ALL;
  const setActive = (v: string) => {
    setParams(v === ALL ? {} : { category: v }, { replace: true, preventScrollReset: true });
    setOpenIndex(null);
  };

  const options = [
    { value: ALL, label: ui.certs.all, count: certs.length },
    ...categories.map(c => ({ value: c, label: c, count: certs.filter(x => (x.category || 'Other') === c).length })),
  ];

  // Highlights only on the unfiltered view; the rest grouped by year.
  const { highlights, groups, ordered } = useMemo(() => {
    const filtered = active === ALL ? certs : certs.filter(c => (c.category || 'Other') === active);
    const highlights = active === ALL ? filtered.filter(c => c.featured) : [];
    const rest = filtered.filter(c => !highlights.includes(c));
    const byYear = new Map<number, CertView[]>();
    rest.forEach(c => byYear.set(c.year, [...(byYear.get(c.year) || []), c]));
    const groups = Array.from(byYear).sort((a, b) => b[0] - a[0]);
    const ordered = [...highlights, ...groups.flatMap(([, list]) => list)];
    return { highlights, groups, ordered };
  }, [certs, active]);

  const open = (c: CertView) => setOpenIndex(ordered.indexOf(c));
  const issuers = uniqueIssuers(certs);
  const latestYear = Math.max(...certs.map(c => c.year));

  const facts = [
    { value: certs.length, label: t.nav.certifications },
    { value: issuers.length, label: ui.certs.institutions },
    { value: latestYear, label: ui.certs.latest },
  ];

  return (
    <>
      <PageHeader eyebrow={t.nav.certifications} title={t.nav.certifications} lede={t.about.certifications_subtitle}>
        <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
          {facts.map(f => (
            <div key={f.label} className="flex flex-col">
              <dt className="order-2 text-sm text-ink-muted">{f.label}</dt>
              <dd className="order-1 font-display text-4xl font-medium tabular-nums">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <FilterBar label={t.nav.certifications} value={active} onChange={setActive} options={options} />
        </div>
      </PageHeader>

      <div className="shell">
        {highlights.length > 0 && (
          <section className="border-b border-line py-16 md:py-20" aria-labelledby="cert-highlights">
            <Eyebrow>{ui.sections.highlights}</Eyebrow>
            <h2 id="cert-highlights" className="mt-5 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              {ui.certs.highlightsLede}
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {highlights.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 0.06}>
                  <CertCard cert={c} large onOpen={() => open(c)} />
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {groups.length > 0 ? (
          groups.map(([year, list]) => (
            <section
              key={`${active}-${year}`}
              className="grid gap-8 border-b border-line py-14 last:border-b-0 md:py-16 lg:grid-cols-12"
              aria-labelledby={`year-${year}`}
            >
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-28">
                  <h2 id={`year-${year}`} className="font-display text-5xl font-medium tabular-nums tracking-tight sm:text-6xl">
                    {year || '—'}
                  </h2>
                  <p className="mt-2 font-mono text-sm text-ink-muted">
                    {ui.certs.count(list.length)}
                  </p>
                </div>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3">
                {list.map((c, i) => (
                  <Reveal as="li" key={c.title} delay={Math.min(i, 5) * 0.04}>
                    <CertCard cert={c} onOpen={() => open(c)} />
                  </Reveal>
                ))}
              </ul>
            </section>
          ))
        ) : (
          highlights.length === 0 && (
            <p className="my-16 rounded-3xl border border-dashed border-line-strong py-16 text-center text-ink-muted">{ui.certs.empty}</p>
          )
        )}
      </div>

      <CtaBand />

      <CertificateModal certs={ordered} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  );
}
