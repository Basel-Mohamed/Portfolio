import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { LuCalendar, LuMaximize2 } from 'react-icons/lu';
import { useLanguage } from '../context/LanguageContext';
import { CertificateModal } from '../components/layout/CertificateModal';
import { useSEO } from '../hooks/useSEO';
import { useUI } from '../lib/ui-strings';
import { CertificationItem } from '../types/portfolio';
import { PageHeader, FilterBar } from '../components/ui/primitives';

const ALL = '__all__';

export function Certifications() {
  const { t } = useLanguage();
  const ui = useUI();
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  useSEO({
    title: 'Certifications - Basel Mohamed | AI & Cloud Learning',
    description:
      'Professional certifications earned by Basel Mohamed in Artificial Intelligence, Machine Learning, Cloud Computing, and Full Stack Development.',
    url: '/certifications',
  });

  const certs = t.about.certifications;

  const options = useMemo(() => {
    const counts = new Map<string, number>();
    certs.forEach(c => counts.set(c.category || 'Other', (counts.get(c.category || 'Other') || 0) + 1));
    return [
      { value: ALL, label: ui.certs.all, count: certs.length },
      ...Array.from(counts, ([value, count]) => ({ value, label: value, count })),
    ];
  }, [certs, ui.certs.all]);

  const filtered = useMemo(
    () => (activeCategory === ALL ? certs : certs.filter(c => (c.category || 'Other') === activeCategory)),
    [activeCategory, certs],
  );

  return (
    <>
      <PageHeader eyebrow={t.nav.certifications} title={t.nav.certifications} lede={t.about.certifications_subtitle}>
        <div className="mt-10">
          <FilterBar label={t.nav.certifications} value={activeCategory} onChange={setActiveCategory} options={options} />
        </div>
      </PageHeader>

      <section className="shell py-16 md:py-20">
        {filtered.length > 0 ? (
          <ul key={activeCategory} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cert, index) => (
              <motion.li
                key={cert.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index, 8) * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="group flex size-full flex-col overflow-hidden rounded-3xl border border-line bg-surface text-start transition-colors duration-300 hover:border-line-strong"
                >
                  <span className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-2">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={cert.image}
                      alt=""
                      className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                    />
                    <span className="absolute end-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-bg/90 text-ink opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <LuMaximize2 size={15} aria-hidden="true" />
                    </span>
                  </span>
                  <span className="flex flex-grow flex-col p-6">
                    <span className="eyebrow text-coral-ink">{cert.category || 'Other'}</span>
                    <span className="mt-3 line-clamp-2 text-lg leading-snug font-semibold">{cert.title}</span>
                    <span className="mt-auto flex items-center justify-between pt-6 text-sm text-ink-muted">
                      <span className="inline-flex items-center gap-2">
                        <LuCalendar size={14} aria-hidden="true" />
                        {cert.date}
                      </span>
                      <span className="font-medium text-ink underline decoration-coral decoration-2 underline-offset-4">
                        {ui.certs.view}
                      </span>
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="rounded-3xl border border-dashed border-line-strong py-16 text-center text-ink-muted">{ui.certs.empty}</p>
        )}
      </section>

      <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </>
  );
}
