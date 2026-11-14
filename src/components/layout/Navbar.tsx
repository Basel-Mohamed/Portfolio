import React from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { LuMenu, LuX, LuMoon, LuSun } from 'react-icons/lu';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useUI } from '../../lib/ui-strings';
import { scrollToTop } from '../../lib/smoothScroll';

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'inline-flex size-10 items-center justify-center rounded-full bg-ink text-[13px] font-semibold tracking-tight text-bg',
        className,
      )}
    >
      BM
    </span>
  );
}

/** Floating pill navigation, centred at the top of every page. */
export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const ui = useUI();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => setIsOpen(false), [location.pathname]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const navLinks = [
    { name: t.nav.about, path: '/about' },
    { name: t.nav.experience, path: '/experience' },
    { name: t.nav.projects, path: '/projects' },
    { name: t.nav.certifications, path: '/certifications' },
    { name: t.nav.services, path: '/services' },
  ];

  // Already on the home page: the link has nowhere to go, so glide back to the top instead.
  const scrollHomeToTop = () => {
    if (location.pathname !== '/') return;
    scrollToTop(true);
  };

  const isDark = theme === 'dark';
  const iconBtn =
    'inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-surface-2';

  return (
    <nav aria-label="Primary" className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3">
      <div className="pointer-events-auto relative max-w-full">
        <div className="flex h-14 items-center gap-1 rounded-full border border-line bg-surface-raised/85 p-2 shadow-float backdrop-blur-xl">
          <Link to="/" onClick={scrollHomeToTop} className="rounded-full" aria-label={`${t.hero.name} — ${t.nav.home}`}>
            <Monogram />
          </Link>

          <ul className="hidden items-center lg:flex">
            {navLinks.map(link => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    clsx(
                      'relative inline-flex h-10 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-200',
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-surface-2"
                          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        />
                      )}
                      <span className="relative">{link.name}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-line lg:block" />

          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className={clsx(iconBtn, 'w-auto px-3 text-sm font-medium')}
            aria-label={ui.language.switchTo}
            lang={language === 'en' ? 'ar' : 'en'}
          >
            {ui.language.label}
          </button>

          <button type="button" onClick={toggleTheme} className={iconBtn} aria-label={isDark ? ui.theme.toLight : ui.theme.toDark}>
            {isDark ? <LuSun size={18} aria-hidden="true" /> : <LuMoon size={18} aria-hidden="true" />}
          </button>

          <Link
            to="/contact"
            className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm font-medium whitespace-nowrap text-bg transition-opacity duration-200 hover:opacity-85"
          >
            {ui.letsTalk}
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(o => !o)}
            className={clsx(iconBtn, 'lg:hidden')}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? ui.menu.close : ui.menu.open}
          >
            {isOpen ? <LuX size={20} aria-hidden="true" /> : <LuMenu size={20} aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              data-lenis-prevent
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-3xl border border-line bg-surface-raised p-2 shadow-float lg:hidden"
            >
              <ul className="flex flex-col">
                {[{ name: t.nav.home, path: '/' }, ...navLinks, { name: t.nav.contact, path: '/contact' }].map(link => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) =>
                        clsx(
                          'flex min-h-12 items-center rounded-2xl px-4 text-[1.0625rem] font-medium',
                          isActive ? 'bg-surface-2 text-ink' : 'text-ink-muted',
                        )
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
