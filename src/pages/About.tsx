import { Link } from 'react-router';
import { LuBrain, LuSparkles, LuCode, LuCloud, LuAward, LuMapPin } from 'react-icons/lu';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { useUI } from '../lib/ui-strings';
import { SITE } from '../lib/site';
import { PageHeader, Reveal, SectionHeading, buttonClass, ArrowForward } from '../components/ui/primitives';

export function About() {
  const { t } = useLanguage();
  const ui = useUI();

  useSEO({
    title: 'About - Basel Mohamed | AI Engineer',
    description:
      'Learn about Basel Mohamed, an Associate AI Engineer based in Cairo, Egypt, specializing in NLP, Generative AI, RAG systems, and Full Stack Development.',
    url: '/about',
  });

  const toolkit = [
    { Icon: LuBrain, title: t.about.skills.ai_ml, items: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Predictive Analytics'] },
    { Icon: LuSparkles, title: t.about.skills.techniques, items: ['RAG Systems', 'RLHF', 'OCR', 'Prompt Engineering'] },
    { Icon: LuCode, title: t.about.skills.frameworks, items: ['PyTorch', 'LangChain', 'FastAPI', 'Qdrant / ChromaDB'] },
    { Icon: LuCloud, title: t.about.skills.cloud, items: ['Oracle OCI', 'Docker', 'Git / GitHub', 'Linux / Bash'] },
  ];

  return (
    <>
      <PageHeader eyebrow={t.nav.about} title={t.about.title}>
        <p className="mt-6 inline-flex items-center gap-2 text-ink-muted">
          <LuMapPin size={16} aria-hidden="true" className="text-coral-ink" />
          {ui.about.basedIn} {t.about.location}
        </p>
      </PageHeader>

      <section className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="relative mx-auto max-w-xs lg:mx-0">
            <div aria-hidden="true" className="absolute inset-0 -rotate-3 rounded-[2rem] bg-coral" />
            <img
              src={t.hero.image || '/profile_pic.png'}
              alt={t.hero.name}
              width={1024}
              height={1024}
              loading="lazy"
              className="relative aspect-square w-full rounded-[2rem] border border-line object-cover"
            />
          </div>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={0.08}>
          <p className="font-display text-2xl leading-[1.45] tracking-tight sm:text-3xl sm:leading-[1.4]">
            {t.about.summary}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/experience" className={buttonClass('primary')}>
              {t.nav.experience}
              <ArrowForward />
            </Link>
            <a href={SITE.cv} download="Basel_Mohamed_CV.pdf" className={buttonClass('secondary')}>
              {ui.downloadCv}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line bg-surface-2/60 py-20 md:py-28">
        <div className="shell">
          <SectionHeading index="01" eyebrow={ui.about.toolkit} title={ui.about.toolkit} />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {toolkit.map(({ Icon, title, items }, i) => (
              <Reveal key={title} delay={i * 0.06} className="bg-bg p-8">
                <span className="flex size-11 items-center justify-center rounded-xl bg-ink text-bg">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {items.map(it => (
                    <li key={it} className="flex items-center gap-2.5 text-ink-muted" dir="ltr">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-coral" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pt-20 md:pt-28">
        <Reveal className="flex flex-col items-start gap-8 rounded-[2rem] border border-line bg-surface p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-6">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-coral text-on-coral">
              <LuAward size={26} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-3xl font-medium tracking-tight">{t.about.learning.title}</h2>
              <p className="mt-2 max-w-xl text-ink-muted">{t.about.learning.desc}</p>
            </div>
          </div>
          <Link to="/certifications" className={buttonClass('secondary', 'md', 'shrink-0')}>
            {t.about.learning.cta}
            <ArrowForward />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
