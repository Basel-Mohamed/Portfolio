import { LuBriefcase, LuGraduationCap } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { useUI } from '../lib/ui-strings';
import { ExperienceItem } from '../types/portfolio';
import { PageHeader, Reveal, Eyebrow } from '../components/ui/primitives';

const isCurrent = (period: string) => /present|الحاضر|حالي/i.test(period);

function Timeline({ index, title, items, Icon }: { index: string; title: string; items: ExperienceItem[]; Icon: IconType }) {
  const ui = useUI();
  if (items.length === 0) return null;

  return (
    <section className="grid gap-10 py-16 md:py-20 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <Eyebrow index={index}>{title}</Eyebrow>
          <div className="mt-6 flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-bg">
              <Icon size={22} aria-hidden="true" />
            </span>
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">{title}</h2>
          </div>
        </div>
      </div>

      <ol className="relative lg:col-span-8">
        <span aria-hidden="true" className="absolute start-[7px] top-2 bottom-2 w-px bg-line-strong" />
        {items.map((role, i) => {
          const current = isCurrent(role.period);
          return (
            <Reveal as="li" key={role.id} delay={i * 0.05} className="relative ps-10 pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className={
                  current
                    ? 'absolute start-0 top-1.5 size-[15px] rounded-full border-[3px] border-bg bg-coral ring-1 ring-coral'
                    : 'absolute start-0 top-1.5 size-[15px] rounded-full border-[3px] border-bg bg-ink-muted ring-1 ring-line-strong'
                }
              />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-ink-muted">{role.period}</span>
                {current && (
                  <span className="rounded-full bg-coral px-2.5 py-0.5 text-xs font-medium text-on-coral">{ui.experience.current}</span>
                )}
              </div>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">{role.title}</h3>
              <p className="mt-1 font-medium text-coral-ink">{role.company}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{role.description}</p>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

export function Experience() {
  const { t } = useLanguage();
  const ui = useUI();

  useSEO({
    title: 'Experience - Basel Mohamed | AI Engineer',
    description:
      'Professional experience and internship history of Basel Mohamed — AI engineering roles, full stack development positions, and technical training.',
    url: '/experience',
  });

  return (
    <>
      <PageHeader eyebrow={t.nav.experience} title={t.experience.title} lede={ui.experience.lede} />
      <div className="shell divide-y divide-line">
        <Timeline index="01" title={t.experience.title} items={t.experience.professional || t.experience.items || []} Icon={LuBriefcase} />
        <Timeline
          index="02"
          title={t.experience.internshipsTitle || t.experience.title}
          items={t.experience.internships || []}
          Icon={LuGraduationCap}
        />
      </div>
    </>
  );
}
