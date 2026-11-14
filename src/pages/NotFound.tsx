import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { useUI } from '../lib/ui-strings';
import { buttonClass, ArrowForward } from '../components/ui/primitives';

export function NotFound() {
  const { t } = useLanguage();
  const ui = useUI();

  useSEO({ title: '404 - Basel Mohamed', description: 'Page not found.', url: '/404' });

  return (
    <section className="shell flex min-h-[70dvh] flex-col items-center justify-center pt-40 pb-24 text-center short:pt-24!">
      <p className="font-display text-[clamp(6rem,24vw,14rem)] leading-none font-semibold tracking-tight text-line" aria-hidden="true">
        404
      </p>
      <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">{ui.notFound.title}</h1>
      <p className="mt-4 max-w-xl text-lg text-ink-muted">{ui.notFound.lede}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/" className={buttonClass('primary', 'lg')}>
          {t.nav.home}
          <ArrowForward />
        </Link>
        <Link to="/projects" className={buttonClass('secondary', 'lg')}>
          {t.nav.projects}
        </Link>
      </div>
    </section>
  );
}
