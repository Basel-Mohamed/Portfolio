import { Link } from 'react-router';
import { clsx } from 'clsx';
import { useLanguage } from '../../context/LanguageContext';
import { buttonClass, linkClass, Chevron, Eyebrow } from './primitives';
import { SplitReveal } from '../motion/SplitReveal';
import { Magnet } from '../motion/Effects';

/**
 * Closing call-to-action: a full-width stage band with one headline and one button.
 * `fullScreen` makes it fill the screen height on laptops and larger; used on the home page only,
 * where it is the finale. On inner pages it stays compact.
 * `flush` removes the gap above it, for pages whose last section is not on the page ground.
 */
export function CtaBand({
  flush = false,
  fullScreen = false,
}: {
  index?: string;
  flush?: boolean;
  fullScreen?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <section
      className={clsx(
        'dark bg-bg text-ink section-y',
        fullScreen && 'lg:flex lg:min-h-dvh lg:flex-col lg:justify-center',
        !flush && 'mt-16 md:mt-24',
      )}
    >
      <div className="shell flex flex-col items-center text-center">
        <Eyebrow>{t.nav.contact}</Eyebrow>
        <SplitReveal as="h2" text={t.home.cta.title} className="mt-4 max-w-4xl text-display-l" />
        <p className="mt-6 max-w-[56ch] text-body-l text-ink-muted">{t.home.cta.subtitle}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <Magnet>
            <Link to="/contact" className={buttonClass('primary', 'lg')}>
              {t.home.cta.button}
            </Link>
          </Magnet>
          <Link to="/services" className={linkClass()}>
            {t.nav.services}
            <Chevron />
          </Link>
        </div>
      </div>
    </section>
  );
}
