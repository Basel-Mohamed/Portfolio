import { Outlet, Link } from 'react-router';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { LuArrowUp, LuMail } from 'react-icons/lu';
import { Navbar, Monogram } from './Navbar';
import { useLanguage } from '../../context/LanguageContext';
import { useUI } from '../../lib/ui-strings';
import { SITE } from '../../lib/site';
import { AIChatbot } from '../features/AIChatbot';
import { ScrollToTop } from './ScrollToTop';
import { ArrowOut } from '../ui/primitives';

export function Layout() {
  const { t } = useLanguage();
  const ui = useUI();

  const pages = [
    { name: t.nav.about, path: '/about' },
    { name: t.nav.experience, path: '/experience' },
    { name: t.nav.projects, path: '/projects' },
    { name: t.nav.certifications, path: '/certifications' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.contact, path: '/contact' },
  ];

  const socials = [
    { name: 'GitHub', href: SITE.github, Icon: FaGithub },
    { name: 'LinkedIn', href: SITE.linkedin, Icon: FaLinkedin },
  ];

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      <a
        href="#main"
        className="fixed start-4 top-3 z-[100] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
      >
        {ui.skipToContent}
      </a>
      <ScrollToTop />
      <Navbar />

      <main id="main" tabIndex={-1} className="flex-grow pt-18 outline-none">
        <Outlet />
      </main>

      <footer className="mt-24 border-t border-line bg-surface-2">
        <div className="shell py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
                {ui.footer.title}
              </p>
              <p className="mt-4 max-w-md text-ink-muted">{ui.footer.lede}</p>
              <a
                href={`mailto:${SITE.email}`}
                className="group mt-8 inline-flex max-w-full items-center gap-3 font-display text-xl break-all underline decoration-coral decoration-2 underline-offset-[6px] transition-colors hover:text-coral-ink sm:text-2xl"
              >
                <LuMail aria-hidden="true" className="shrink-0" size={22} />
                {SITE.email}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:col-span-6 lg:justify-items-end">
              <div>
                <p className="eyebrow text-ink-muted">{ui.footer.pages}</p>
                <ul className="mt-5 space-y-1">
                  {pages.map(p => (
                    <li key={p.path}>
                      <Link to={p.path} className="inline-flex min-h-9 items-center text-ink transition-colors hover:text-coral-ink">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-ink-muted">{ui.footer.elsewhere}</p>
                <ul className="mt-5 space-y-1">
                  {socials.map(({ name, href, Icon }) => (
                    <li key={name}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-9 items-center gap-2 text-ink transition-colors hover:text-coral-ink"
                      >
                        <Icon aria-hidden="true" size={16} />
                        {name}
                        <ArrowOut size={14} className="text-ink-muted" />
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={SITE.cv}
                      className="inline-flex min-h-9 items-center gap-2 text-ink transition-colors hover:text-coral-ink"
                    >
                      {ui.downloadCv}
                      <ArrowOut size={14} className="text-ink-muted" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Monogram className="size-7 text-[11px]" />
              <span>
                © {new Date().getFullYear()} {t.hero.name}. {ui.footer.rights}
              </span>
            </div>
            <a href="#main" className="inline-flex min-h-9 items-center gap-2 transition-colors hover:text-ink">
              {ui.footer.backToTop}
              <LuArrowUp aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
      </footer>

      <AIChatbot />
    </div>
  );
}
