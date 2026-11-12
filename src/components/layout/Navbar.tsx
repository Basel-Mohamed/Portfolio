import React from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { LuMenu, LuX, LuMoon, LuSun } from 'react-icons/lu';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useUI } from '../../lib/ui-strings';
import { buttonClass, ArrowForward } from '../ui/primitives';

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'relative inline-flex size-9 items-center justify-center rounded-[10px] bg-ink font-display text-[15px] font-semibold text-bg',
        className,
      )}
    >
      BM
      <span className="absolute -end-1 -bottom-1 size-3 rounded-full border-2 border-bg bg-coral" />
    </span>
  );
}

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const ui = useUI();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => setIsOpen(false), [location.pathname]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.experience, path: '/experience' },
    { name: t.nav.projects, path: '/projects' },
    { name: t.nav.certifications, path: '/certifications' },
    { name: t.nav.services, path: '/services' },
  ];

  const isDark = theme === 'dark';
  const iconBtn =
    'inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-surface-2';

  return (
    <nav
      aria-label="Primary"
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300',
        scrolled || isOpen ? 'border-b border-line bg-bg/90 backdrop-blur-md' : 'border-b border-transparent bg-bg/0',
      )}
    >
      <div className="shell flex h-18 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 rounded-lg" aria-label={`${t.hero.name} — ${t.nav.home}`}>
          <Monogram />
          <span className="hidden font-display text-lg font-semibold tracking-tight sm:inline">
            {language === 'ar' ? 'باسل محمد' : 'Basel Mohamed'}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  clsx(
                    'relative inline-flex h-11 items-center px-3 text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-coral"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className={clsx(iconBtn, 'w-auto px-3 text-sm font-medium')}
            aria-label={ui.language.switchTo}
            lang={language === 'en' ? 'ar' : 'en'}
          >
            {ui.language.label}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className={iconBtn}
            aria-label={isDark ? ui.theme.toLight : ui.theme.toDark}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -60 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 60 }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                {isDark ? <LuSun size={19} aria-hidden="true" /> : <LuMoon size={19} aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <Link to="/contact" className={buttonClass('primary', 'md', 'ms-2 hidden sm:inline-flex')}>
            {ui.letsTalk}
            <ArrowForward />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(o => !o)}
            className={clsx(iconBtn, 'lg:hidden')}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? ui.menu.close : ui.menu.open}
          >
            {isOpen ? <LuX size={22} aria-hidden="true" /> : <LuMenu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-line bg-bg lg:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {[...navLinks, { name: t.nav.contact, path: '/contact' }].map((link, i) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      clsx(
                        'flex min-h-13 items-center justify-between border-b border-line py-3 font-display text-2xl tracking-tight',
                        isActive ? 'text-ink' : 'text-ink-muted',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{link.name}</span>
                        <span className={clsx('font-mono text-xs', isActive ? 'text-coral-ink' : 'text-ink-muted')}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
