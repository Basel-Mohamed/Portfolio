import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { LuMail, LuPhone, LuMapPin, LuCopy, LuCheck, LuBot, LuDownload } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { useUI } from '../lib/ui-strings';
import { SITE, OPEN_CHAT_EVENT } from '../lib/site';
import { PageHeader, Reveal, buttonClass, ArrowOut } from '../components/ui/primitives';

interface Row {
  Icon: IconType;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

export function Contact() {
  const { t } = useLanguage();
  const ui = useUI();
  const [params] = useSearchParams();
  const service = params.get('service');
  const [copied, setCopied] = useState(false);

  useSEO({
    title: 'Contact - Basel Mohamed | Get In Touch',
    description:
      'Get in touch with Basel Mohamed for AI engineering collaborations, freelance projects, or any inquiries. Available via email, phone, and LinkedIn.',
    url: '/contact',
  });

  const mailto = `mailto:${SITE.email}${service ? `?subject=${encodeURIComponent(service)}` : ''}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = mailto;
    }
  };

  const rows: Row[] = [
    { Icon: LuMail, label: ui.contact.email, value: SITE.email, href: mailto },
    { Icon: LuPhone, label: ui.contact.phone, value: SITE.phoneDisplay, href: SITE.phoneHref },
    { Icon: FaLinkedin, label: 'LinkedIn', value: 'in/baselmohamed937', href: SITE.linkedin, external: true },
    { Icon: FaGithub, label: 'GitHub', value: 'Basel-Mohamed', href: SITE.github, external: true },
    { Icon: LuMapPin, label: ui.contact.location, value: t.about.location },
  ];

  return (
    <>
      <PageHeader eyebrow={t.nav.contact} title={t.contact.title} lede={t.contact.subtitle}>
        {service && (
          <p className="mt-8 inline-flex flex-wrap items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm">
            <span className="text-ink-muted">{ui.contact.regarding}:</span>
            <span className="font-semibold">{service}</span>
          </p>
        )}
      </PageHeader>

      <section className="shell grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <a
              href={mailto}
              className="block font-display text-3xl leading-tight font-medium tracking-tight [overflow-wrap:anywhere] underline decoration-coral decoration-[3px] underline-offset-8 transition-colors hover:text-coral-ink sm:text-4xl"
            >
              {SITE.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={mailto} className={buttonClass('primary', 'lg')}>
                <LuMail size={18} aria-hidden="true" />
                {t.hero.buttons.contact}
              </a>
              <button type="button" onClick={copyEmail} className={buttonClass('secondary', 'lg')}>
                {copied ? <LuCheck size={18} aria-hidden="true" /> : <LuCopy size={18} aria-hidden="true" />}
                {copied ? ui.contact.copied : ui.contact.copy}
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? ui.contact.copied : ''}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-14 border-t border-line">
              {rows.map(({ Icon, label, value, href, external }) => {
                const inner = (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors group-hover:border-coral group-hover:bg-coral group-hover:text-on-coral">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="eyebrow block text-ink-muted">{label}</span>
                      <span className="mt-1 block truncate text-lg" dir="ltr">
                        {value}
                      </span>
                    </span>
                    {href && <ArrowOut size={18} className="text-ink-muted transition-colors group-hover:text-ink" />}
                  </>
                );
                return (
                  <li key={label} className="border-b border-line">
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex items-center gap-5 py-5"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-5 py-5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <aside className="lg:col-span-5">
          <Reveal delay={0.12} className="relative overflow-hidden rounded-[2rem] bg-inverse p-8 text-on-inverse sm:p-10 lg:sticky lg:top-28">
            <div aria-hidden="true" className="absolute -end-16 -bottom-16 size-48 rounded-full bg-coral" />
            <div className="relative">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-cream text-navy">
                <LuBot size={22} aria-hidden="true" />
              </span>
              <h2 className="mt-8 font-display text-3xl font-medium tracking-tight">{ui.contact.chatTitle}</h2>
              <p className="mt-3 max-w-[22rem] text-on-inverse-muted">{ui.contact.chatDesc}</p>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
                className={buttonClass('inverse', 'md', 'mt-8')}
              >
                {ui.contact.chatCta}
              </button>
              <a
                href={SITE.cv}
                download="Basel_Mohamed_CV.pdf"
                className="mt-6 flex w-fit items-center gap-2 text-sm text-on-inverse underline decoration-cream/40 underline-offset-4 hover:decoration-cream"
              >
                <LuDownload size={15} aria-hidden="true" />
                {ui.downloadCv}
              </a>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  );
}
