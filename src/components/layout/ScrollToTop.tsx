import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { startSmoothScroll, scrollToTop, settleAt, HOME_RETURN_KEY } from '../../lib/smoothScroll';

/**
 * Starts momentum smooth scrolling and places the page on every route change.
 *
 * Normally that means the top. The jump is instant on purpose: a glide gets cut
 * short when the next page mounts and its pinned section recalculates the layout.
 *
 * One exception: pressing Back to the home page after opening a project from
 * the ring returns to the ring, where the visitor left off.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => startSmoothScroll(), []);

  useLayoutEffect(() => {
    if (navigationType === 'POP' && pathname === '/') {
      let saved = 0;
      try {
        saved = Number(sessionStorage.getItem(HOME_RETURN_KEY)) || 0;
        sessionStorage.removeItem(HOME_RETURN_KEY);
      } catch {
        // storage unavailable
      }
      if (saved > 0) return settleAt(() => saved, 900);
    }
    scrollToTop(false);
    // Only a change of page should move the scroll position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
