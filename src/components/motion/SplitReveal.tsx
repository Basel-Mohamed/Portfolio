import { useRef } from 'react';
import { clsx } from 'clsx';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../../lib/motion';
import { useLanguage } from '../../context/LanguageContext';

type Tag = 'h1' | 'h2' | 'h3' | 'p';

interface SplitRevealProps {
  text: string;
  as?: Tag;
  id?: string;
  className?: string;
  /** "load" plays immediately; "scroll" waits until the element enters the viewport. */
  trigger?: 'load' | 'scroll';
  /** "rise" = 3D flip up from the baseline, "blur" = soft focus-in. */
  variant?: 'rise' | 'blur';
  /** Split into characters (LTR only — Arabic always splits by word to keep letters joined). */
  by?: 'words' | 'chars';
  delay?: number;
}

/**
 * GSAP SplitText headline reveal. Screen readers get the plain text from a
 * visually hidden copy; the animated copy is aria-hidden.
 */
export function SplitReveal({
  text,
  as: Comp = 'h2',
  id,
  className,
  trigger = 'scroll',
  variant = 'rise',
  by = 'words',
  delay = 0,
}: SplitRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { dir } = useLanguage();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const chars = by === 'chars' && dir === 'ltr';

      SplitText.create(el, {
        type: chars ? 'words,chars' : 'words',
        tag: 'span',
        aria: 'none',
        autoSplit: true,
        onSplit(self) {
          const targets = chars ? self.chars : self.words;
          const from =
            variant === 'blur'
              ? { opacity: 0, filter: 'blur(10px)', y: 14 }
              : { opacity: 0, yPercent: 110, rotateX: -55, transformPerspective: 700, transformOrigin: '50% 100%' };
          return gsap.from(targets, {
            ...from,
            duration: variant === 'blur' ? 1 : 0.85,
            ease: 'expo.out',
            stagger: chars ? 0.022 : variant === 'blur' ? 0.04 : 0.06,
            delay,
            clearProps: 'filter',
            scrollTrigger: trigger === 'scroll' ? { trigger: el, start: 'top 88%', once: true } : undefined,
          });
        },
      });
    },
    { scope: ref, dependencies: [text, dir] },
  );

  return (
    // key forces a fresh DOM node when the text changes, so SplitText never fights React.
    <Comp key={text} id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" className={clsx(variant === 'rise' && '[&_span]:will-change-transform')}>
        {text}
      </span>
    </Comp>
  );
}
