import { useSyncExternalStore } from 'react';

/** True while a CSS media query matches; updates when it changes. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    onChange => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
