import { useEffect, useRef } from 'react';
import { lockScroll, unlockScroll } from '../lib/smoothScroll';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

/**
 * Modal behaviour: Escape to close, body scroll lock, focus moved into the
 * dialog on open, Tab kept inside it, and focus restored to the trigger on close.
 */
export function useDialog<T extends HTMLElement>(isOpen: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lockScroll();

    const focusFirst = window.setTimeout(() => {
      const node = ref.current;
      if (!node) return;
      const first = node.querySelector<HTMLElement>('[data-autofocus]') ?? node.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? node).focus();
    }, 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusFirst);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      unlockScroll();
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  return ref;
}
