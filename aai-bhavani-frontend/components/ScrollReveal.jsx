'use client';

import { useEffect } from 'react';

/**
 * Two jobs:
 * 1. Adds `js-reveal` to <html> so the CSS can safely hide .reveal elements
 *    without causing a flash-of-invisible-content on first server render.
 * 2. Observes every .reveal element — adds .is-in on enter, removes on leave,
 *    so the animation replays every time the element scrolls into view.
 */
export default function ScrollReveal() {
  useEffect(() => {
    // Step 1: mark the document as JS-ready so hidden states activate
    document.documentElement.classList.add('js-reveal');

    // Step 2: wait one frame so layout is stable, then observe
    const raf = requestAnimationFrame(() => {
      const elements = document.querySelectorAll('.reveal');
      if (!elements.length) return;

      if (!window.IntersectionObserver) {
        elements.forEach((el) => el.classList.add('is-in'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
            } else {
              // Remove so animation replays on next scroll-in
              entry.target.classList.remove('is-in');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -48px 0px',
        }
      );

      elements.forEach((el) => observer.observe(el));

      // Store for cleanup
      return () => observer.disconnect();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
