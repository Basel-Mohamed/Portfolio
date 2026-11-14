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

      <main id="main" tabIndex={-1} className="flex-grow outline-none">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-surface-2">
        <div className="shell pt-14 pb-24 md:pt-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Link to="/" className="inline-flex items-center gap-3 rounded-lg">
                <Monogram />
                <span className="text-lg font-semibold tracking-tight">{t.hero.name}</span>
              </Link>
              <p className="mt-5 max-w-sm text-ink-muted">{t.hero.tagline}</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-4 inline-flex min-h-11 max-w-full items-center gap-2.5 break-all text-ink underline decoration-line-strong underline-offset-[5px] transition-colors hover:text-accent-text"
              >
                <LuMail aria-hidden="true" className="shrink-0" size={18} />
                {SITE.email}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:col-span-6 lg:justify-items-end">
              <div>
                <p className="eyebrow text-ink-muted">{ui.footer.pages}</p>
                <ul className="mt-5 space-y-1">
                  {pages.map(p => (
                    <li key={p.path}>
                      <Link to={p.path} className="inline-flex min-h-11 items-center text-ink transition-colors hover:text-accent-text">
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
                        className="inline-flex min-h-11 items-center gap-2 text-ink transition-colors hover:text-accent-text"
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
                      className="inline-flex min-h-11 items-center gap-2 text-ink transition-colors hover:text-accent-text"
                    >
                      {ui.downloadCv}
                      <ArrowOut size={14} className="text-ink-muted" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span>
                © {new Date().getFullYear()} {t.hero.name}. {ui.footer.rights}
              </span>
            </div>
            <a href="#main" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-ink">
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
