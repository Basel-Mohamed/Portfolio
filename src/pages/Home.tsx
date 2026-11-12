import { useMemo, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { Link } from 'react-router';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { LuBrain, LuCpu, LuServer, LuCode, LuDownload } from 'react-icons/lu';
import { useLanguage } from '../context/LanguageContext';
import { ProjectCard } from '../components/features/ProjectCard';
import { CertCard } from '../components/features/CertCard';
import { CertificateModal } from '../components/layout/CertificateModal';
import { useSEO } from '../hooks/useSEO';
import { useUI } from '../lib/ui-strings';
import { SITE } from '../lib/site';
import { toCertView, uniqueIssuers } from '../lib/certs';
import { buttonClass, ArrowForward, Reveal, SectionHeading, Chip, Eyebrow } from '../components/ui/primitives';
import { CtaBand } from '../components/ui/CtaBand';

const ease = [0.22, 1, 0.36, 1] as const;

export function Home() {
  const { t } = useLanguage();
  const ui = useUI();
  const [openCert, setOpenCert] = useState<number | null>(null);

  useSEO({
    title: 'Basel Mohamed | Full Stack AI Engineer',
    description:
      'Portfolio of Basel Mohamed, an Associate AI Engineer specializing in NLP, Generative AI, RAG systems, and Full Stack Development based in Cairo, Egypt.',
    url: '/',
  });

  const roles = t.experience.professional || t.experience.items || [];
  const currentRole = roles[0];
  const certs = useMemo(() => t.about.certifications.map(toCertView), [t.about.certifications]);
  const issuers = useMemo(() => uniqueIssuers(certs), [certs]);

  // Derived, not hard-coded: stays correct as data.ts changes.
  const stats = useMemo(() => {
    const years = roles.map(r => Number((r.period.match(/\d{4}/) || [])[0])).filter(Boolean);
    const since = years.length ? Math.min(...years) : new Date().getFullYear();
    return [
      { value: `${new Date().getFullYear() - since}+`, label: ui.stats.years },
      { value: String(t.projects.items.length), label: ui.stats.projects },
      { value: String(certs.length), label: ui.stats.certs },
    ];
  }, [roles, t.projects.items.length, certs.length, ui]);

  const capabilities = [
    { Icon: LuBrain, ...t.home.skills.genAi },
    { Icon: LuCpu, ...t.home.skills.ml },
    { Icon: LuServer, ...t.home.skills.deploy },
    { Icon: LuCode, ...t.home.skills.dev },
  ];

  // Flagged in data.ts (`featured: true`); falls back to the first three.
  const flagged = t.projects.items.filter(p => p.featured);
  const featured = (flagged.length ? flagged : t.projects.items).slice(0, 3);
  const flaggedCerts = certs.filter(c => c.featured);
  const highlightCerts = (flaggedCerts.length ? flaggedCerts : certs).slice(0, 3);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  const [firstName, ...restName] = t.hero.name.split(' ');

  return (
    <div className="overflow-x-clip">
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative">
        <div aria-hidden="true" className="paper-grid pointer-events-none absolute inset-0 -top-18" />

        <div className="shell relative grid items-center gap-14 pt-12 pb-16 md:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-24">
          <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-7">
            <motion.p
              variants={item}
              className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-sm"
            >
              <span className="relative flex size-2.5" aria-hidden="true">
                <span className="animate-status-pulse absolute inset-0 rounded-full bg-coral" />
                <span className="relative size-2.5 rounded-full bg-coral" />
              </span>
              {ui.openToWork}
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-8 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.03em]"
            >
              <span className="relative inline-block">
                {firstName}
                <span aria-hidden="true" className="absolute inset-x-0 -bottom-[0.04em] h-[0.1em] rounded-full bg-coral" />
              </span>{' '}
              <span className="text-ink-muted italic rtl:not-italic">{restName.join(' ')}</span>
            </motion.h1>

            <motion.p variants={item} className="mt-8 font-mono text-sm tracking-wide text-coral-ink uppercase">
              {t.hero.title}
            </motion.p>

            <motion.p variants={item} className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
              {t.hero.tagline}
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/projects" className={buttonClass('primary', 'lg')}>
                {t.hero.buttons.projects}
                <ArrowForward />
              </Link>
              <Link to="/contact" className={buttonClass('secondary', 'lg')}>
                {t.hero.buttons.contact}
              </Link>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-2">
              {[
                { href: SITE.github, label: 'GitHub', Icon: FaGithub },
                { href: SITE.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
              <span aria-hidden="true" className="mx-2 h-6 w-px bg-line-strong" />
              <a
                href={SITE.cv}
                download="Basel_Mohamed_CV.pdf"
                className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink underline decoration-coral decoration-2 underline-offset-4 transition-colors hover:text-coral-ink"
              >
                <LuDownload size={16} aria-hidden="true" />
                {ui.downloadCv}
              </a>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mx-auto w-full max-w-sm md:max-w-xs lg:col-span-5 lg:max-w-none"
          >
            <div className="relative ms-auto w-[86%] lg:w-[88%]">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-[2rem] bg-coral rtl:-translate-x-4"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] border border-line bg-surface-2">
                <img
                  src={t.hero.image || '/profile_pic.png'}
                  alt={t.hero.name}
                  width={1024}
                  height={1024}
                  fetchPriority="high"
                  className="size-full object-cover"
                />
              </div>

              {currentRole && (
                <div className="absolute -start-8 bottom-8 max-w-[15rem] rounded-2xl border border-line bg-bg/95 p-4 shadow-xl shadow-navy/10 backdrop-blur-sm sm:-start-12">
                  <p className="eyebrow text-coral-ink">{ui.currently}</p>
                  <p className="mt-1.5 text-sm leading-snug font-semibold">{currentRole.title}</p>
                  <p className="text-sm text-ink-muted">{currentRole.company}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="border-y border-line bg-surface">
          <dl className="shell grid grid-cols-3 divide-x divide-line rtl:divide-x-reverse">
            {stats.map(s => (
              <div key={s.label} className="flex flex-col px-2 py-6 text-center sm:px-6 sm:py-8 sm:text-start">
                <dt className="order-2 mt-1 text-xs text-ink-muted sm:text-sm">{s.label}</dt>
                <dd className="order-1 font-display text-3xl font-medium tabular-nums sm:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────────────────── 01 Selected work ───────────────────────── */}
      <section className="shell py-24 md:py-32" aria-labelledby="selected-work">
        <SectionHeading
          index="01"
          eyebrow={ui.sections.selectedWork}
          title={<span id="selected-work">{t.projects.title}</span>}
          lede={ui.sections.selectedWorkLede}
          action={
            <Link to="/projects" className={buttonClass('secondary')}>
              {ui.viewAllProjects}
              <span className="font-mono text-xs text-ink-muted">{t.projects.items.length}</span>
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {featured.map((project, index) => (
            <div key={project.id} className={index === 0 ? 'md:col-span-2' : undefined}>
              <ProjectCard project={project} index={index} featured={index === 0} />
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── 02 Capabilities ───────────────────────── */}
      <section className="border-y border-line bg-surface-2/60 py-24 md:py-32" aria-labelledby="what-i-do">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow={ui.sections.whatIDo}
            title={<span id="what-i-do">{ui.sections.whatIDoTitle}</span>}
            lede={ui.sections.whatIDoLede}
          />
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {capabilities.map(({ Icon, title, desc }, i) => (
              <Reveal
                as="li"
                key={title}
                delay={i * 0.06}
                className="group relative bg-bg p-8 transition-colors duration-300 hover:bg-surface sm:p-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-coral transition-transform duration-500 ease-out-soft group-hover:scale-x-100 rtl:origin-right"
                />
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-bg transition-colors duration-300 group-hover:bg-coral group-hover:text-on-coral">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-sm text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-medium tracking-tight sm:text-3xl">{title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2" dir="ltr">
                  {desc.split(',').map(s => (
                    <li key={s}>
                      <Chip>{s.trim()}</Chip>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────────────── 03 Experience ───────────────────────── */}
      <section className="shell py-24 md:py-32" aria-labelledby="experience-snapshot">
        <SectionHeading
          index="03"
          eyebrow={ui.sections.experience}
          title={<span id="experience-snapshot">{t.experience.title}</span>}
          action={
            <Link to="/experience" className={buttonClass('secondary')}>
              {ui.fullExperience}
              <ArrowForward />
            </Link>
          }
        />
        <ol className="border-t border-line">
          {roles.map((role, i) => (
            <Reveal as="li" key={role.id} delay={i * 0.05} className="border-b border-line">
              <Link to="/experience" className="group grid gap-2 py-6 sm:py-8 lg:grid-cols-12 lg:items-baseline lg:gap-6">
                <span className="font-mono text-sm text-ink-muted lg:col-span-3">{role.period}</span>
                <span className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-coral-ink sm:text-3xl lg:col-span-6">
                  {role.title}
                </span>
                <span className="flex items-center justify-between gap-4 text-ink-muted lg:col-span-3 lg:justify-end">
                  {role.company}
                  <ArrowForward className="text-ink opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ───────────────────────── 04 Credentials ───────────────────────── */}
      <section className="border-t border-line bg-surface-2/60 py-24 md:py-32" aria-labelledby="credentials">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow index="04">{ui.sections.credentials}</Eyebrow>
            <h2 id="credentials" className="mt-5 font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
              {ui.sections.credentialsTitle}
            </h2>
            <p className="mt-5 text-lg text-ink-muted">{ui.sections.credentialsLede(certs.length, issuers.length)}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {issuers.map(name => (
                <li key={name}>
                  <Chip className="border-line-strong text-ink">{name}</Chip>
                </li>
              ))}
            </ul>
            <Link to="/certifications" className={buttonClass('secondary', 'md', 'mt-10')}>
              {ui.sections.viewAllCerts}
              <ArrowForward />
            </Link>
          </div>
          <ul className="grid content-start gap-5 sm:grid-cols-3 lg:col-span-8">
            {highlightCerts.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06}>
                <CertCard cert={c} onOpen={() => setOpenCert(i)} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand index="05" />

      <CertificateModal certs={highlightCerts} index={openCert} onClose={() => setOpenCert(null)} onNavigate={setOpenCert} />
    </div>
  );
}
