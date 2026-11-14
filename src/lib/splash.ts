declare global {
  interface Window {
    /** Defined inline in index.html; fades out and removes the HTML splash. */
    __hideSplash?: () => void;
  }
}

/**
 * Hand over from the HTML splash to the app. Call it when the first screen is
 * on the page. Safe to call more than once.
 */
export function hideSplash() {
  window.__hideSplash?.();
}
