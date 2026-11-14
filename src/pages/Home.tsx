import { useMemo, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { Link } from 'react-router';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { LuBrain, LuCpu, LuServer, LuCode, LuDownload } from 'react-icons/lu';
import { useLanguage } from '../context/LanguageContext';
import { ProjectStage } from '../components/features/ProjectStage';
import { ProofBento } from '../components/features/ProofBento';
import { ProjectRing } from '../components/features/ProjectRing';
import { CertCard } from '../components/features/CertCard';
import { CertificateModal } from '../components/layout/CertificateModal';
import { useSEO } from '../hooks/useSEO';
import { useUI } from '../lib/ui-strings';
import { SITE } from '../lib/site';
import { toCertView, uniqueIssuers } from '../lib/certs';
import { buttonClass, linkClass, Chevron, Reveal, SectionHeading, Chip, Eyebrow } from '../components/ui/primitives';
import { CtaBand } from '../components/ui/CtaBand';
import { SplitReveal } from '../components/motion/SplitReveal';
import { Magnet, SpotlightLayer } from '../components/motion/Effects';

const ease = [0.16, 1, 0.3, 1] as const;

export function Home() {
  const { t } = useLanguage();
  const ui = useUI();
  const [openCert, setOpenCert] = useState<number | null>(null);

  useSEO({
    title: 'Basel Mohamed | AI Engineer & Gen AI Specialist',
    description:
      'Portfolio of Basel Mohamed, an AI Engineer and Gen AI Specialist building RAG systems, multi-agent orchestration, and LLM serving, based in Cairo, Egypt.',
    url: '/',
  });

  const roles = t.experience.professional || t.experience.items || [];
  const certs = useMemo(() => t.about.certifications.map(toCertView), [t.about.certifications]);
  const issuers = useMemo(() => uniqueIssuers(certs), [certs]);

  const years = SITE.yearsInAi;

  // Proof tiles: the headline metric of each project that has numbers.
  // The lead tile is the first one with a measured improvement.
  const proof = useMemo(() => {
    const tiles = t.projects.items
      .filter(p => p.metrics && p.metrics.length > 0)
      .map(p => ({ metric: p.metrics![0], project: p.title }));
    const leadIndex = Math.max(0, tiles.findIndex(x => x.metric.change));
    return { lead: tiles[leadIndex], rest: tiles.filter((_, i) => i !== leadIndex).slice(0, 3) };
  }, [t.projects.items]);

  const capabilities = [
    { Icon: LuBrain, ...t.home.skills.genAi },
    { Icon: LuCpu, ...t.home.skills.ml },
    { Icon: LuServer, ...t.home.skills.deploy },
    { Icon: LuCode, ...t.home.skills.dev },
  ];

  // Flagged in data.ts (`featured: true`); falls back to the first three.
  const flagged = t.projects.items.filter(p => p.featured);
  const featured = (flagged.length ? flagged : t.projects.items).slice(0, 3);
  // The stage shows the first featured project; the rest are cards.
  const staged = featured[0];
  // The ring shows the other projects that have a visual: featured ones first, eight at most.
  const ringProjects = useMemo(() => {
    const rest = t.projects.items.filter(p => p !== staged && p.image);
    return [...rest.filter(p => p.featured), ...rest.filter(p => !p.featured)].slice(0, 8);
  }, [t.projects.items, staged]);
  const flaggedCerts = certs.filter(c => c.featured);
  const highlightCerts = (flaggedCerts.length ? flaggedCerts : certs).slice(0, 3);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <div className="overflow-x-clip">
      {/* ───────────── Hero (follows the theme, fills the first screen) ───────────── */}
      <section className="flex min-h-dvh flex-col justify-center bg-bg text-ink">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="shell flex flex-col items-center py-28 text-center md:py-32 short:pt-24! short:pb-12!"
        >
          <motion.img
            variants={item}
            src={t.hero.image || '/profile_pic.jpg'}
            alt={t.hero.name}
            width={192}
            height={192}
            className="size-24 rounded-full border border-line object-cover grayscale short:size-16"
          />

          <motion.p variants={item} className="eyebrow mt-8 text-ink-muted">
            {t.hero.title}
          </motion.p>

          <SplitReveal as="h1" text={t.hero.name} trigger="load" delay={0.2} className="mt-4 max-w-5xl text-display-xl" />

          <motion.p variants={item} className="mt-6 max-w-[52ch] text-body-l text-ink-muted">
            {t.hero.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <Magnet>
              <Link to="/projects" className={buttonClass('primary', 'lg')}>
                {t.hero.buttons.projects}
              </Link>
            </Magnet>
            <Link to="/contact" className={linkClass()}>
              {t.hero.buttons.contact}
              <Chevron />
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-2.5">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="animate-status-pulse absolute inset-0 rounded-full bg-positive" />
                <span className="relative size-2 rounded-full bg-positive" />
              </span>
              {ui.openToWork}
            </span>
            {[
              { href: SITE.github, label: 'GitHub', Icon: FaGithub },
              { href: SITE.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-ink"
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </a>
            ))}
            <a
              href={SITE.cv}
              download="Basel_Mohamed_CV.pdf"
              className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-ink"
            >
              <LuDownload size={16} aria-hidden="true" />
              {ui.downloadCv}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ───────────── Proof bento (alt) ───────────── */}
      {proof.lead && (
        <section className="bg-surface-2 section-y" aria-labelledby="proof">
          <div className="shell">
            <SectionHeading eyebrow={ui.sections.proof} id="proof" title={ui.sections.proofTitle} lede={ui.sections.selectedWorkLede} />
            <ProofBento
              lead={proof.lead}
              rest={proof.rest}
              years={years}
              yearsEyebrow={ui.sections.experience}
              yearsLabel={ui.stats.years}
            />
          </div>
        </section>
      )}

      {/* ───────────── Featured project (stage) ───────────── */}
      {staged && <ProjectStage project={staged} />}

      {/* ───────────── More work (page) ───────────── */}
      {ringProjects.length > 0 && (
        <section className="section-y" aria-labelledby="selected-work">
          <div className="shell">
            <SectionHeading eyebrow={ui.sections.selectedWork} id="selected-work" title={t.projects.title} lede={ui.sections.ringHint} />
          </div>
          <Reveal className="shell">
            <ProjectRing projects={ringProjects} />
          </Reveal>
        </section>
      )}

      {/* ───────────── Capabilities bento (alt) ───────────── */}
      <section className="bg-surface-2 section-y" aria-labelledby="what-i-do">
        <div className="shell">
          <SectionHeading eyebrow={ui.sections.whatIDo} id="what-i-do" title={ui.sections.whatIDoTitle} lede={ui.sections.whatIDoLede} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {capabilities.map(({ Icon, title, desc }, i) => (
              <Reveal as="li" key={title} delay={i * 0.08} className="group relative overflow-hidden rounded-3xl bg-surface p-8 lg:p-10">
                <SpotlightLayer />
                <div className="relative">
                  <Icon size={24} aria-hidden="true" className="text-ink-muted" />
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">{title}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2" dir="ltr">
                    {desc.split(',').map(s => (
                      <li key={s}>
                        <Chip>{s.trim()}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Experience (page) ───────────── */}
      <section className="shell section-y" aria-labelledby="experience-snapshot">
        <SectionHeading
          eyebrow={ui.sections.experience}
          id="experience-snapshot"
          title={t.experience.title}
          action={
            <Link to="/experience" className={linkClass()}>
              {ui.fullExperience}
              <Chevron />
            </Link>
          }
        />
        <ol className="mx-auto max-w-4xl border-t border-line">
          {roles.map((role, i) => (
            <Reveal as="li" key={role.id} delay={i * 0.05} className="border-b border-line">
              <Link to="/experience" className="group grid gap-1 py-6 sm:py-7 lg:grid-cols-12 lg:items-baseline lg:gap-6">
                <span className="font-mono text-sm text-ink-muted lg:col-span-3">{role.period}</span>
                <span className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent-text sm:text-2xl lg:col-span-6">
                  {role.title}
                </span>
                <span className="text-ink-muted lg:col-span-3 lg:text-end">{role.company}</span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ───────────── Credentials (alt) ───────────── */}
      <section className="bg-surface-2 section-y" aria-labelledby="credentials">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>{ui.sections.credentials}</Eyebrow>
            <SplitReveal as="h2" id="credentials" text={ui.sections.credentialsTitle} className="mt-4 text-display-m" />
            <p className="mt-5 text-ink-muted">{ui.sections.credentialsLede(certs.length, issuers.length)}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {issuers.map(name => (
                <li key={name}>
                  <Chip>{name}</Chip>
                </li>
              ))}
            </ul>
            <Link to="/certifications" className={linkClass('mt-8')}>
              {ui.sections.viewAllCerts}
              <Chevron />
            </Link>
          </div>
          <ul className="grid content-start gap-4 sm:grid-cols-3 lg:col-span-8">
            {highlightCerts.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.08}>
                <CertCard cert={c} onOpen={() => setOpenCert(i)} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand flush fullScreen />

      <CertificateModal certs={highlightCerts} index={openCert} onClose={() => setOpenCert(null)} onNavigate={setOpenCert} />
    </div>
  );
}
