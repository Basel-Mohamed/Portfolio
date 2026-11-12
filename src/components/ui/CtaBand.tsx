import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { Reveal, buttonClass, ArrowForward } from './primitives';

/** Navy closing call-to-action used at the end of content pages. */
export function CtaBand({ index }: { index?: string }) {
  const { t } = useLanguage();

  return (
    <section className="shell pt-24 md:pt-32">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-inverse px-6 py-16 text-on-inverse sm:px-12 md:py-20">
        <div aria-hidden="true" className="absolute -end-24 -top-24 hidden size-96 rounded-full bg-coral lg:block" />
        <div
          aria-hidden="true"
          className="absolute -end-24 -top-24 hidden size-96 translate-x-10 translate-y-10 rounded-full border border-cream/25 lg:block rtl:-translate-x-10"
        />
        <div className="relative max-w-xl">
          <p className="eyebrow text-on-inverse-muted">
            {index ? `${index} — ` : ''}
            {t.nav.contact}
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">{t.home.cta.title}</h2>
          <p className="mt-6 text-lg text-on-inverse-muted">{t.home.cta.subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className={buttonClass('inverse', 'lg')}>
              {t.home.cta.button}
              <ArrowForward />
            </Link>
            <Link to="/services" className={buttonClass('outline-inverse', 'lg')}>
              {t.nav.services}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
