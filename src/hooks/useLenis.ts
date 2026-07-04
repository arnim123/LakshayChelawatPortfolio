import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Wire nav anchor clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[data-scroll]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          if (href === '#') {
            lenis.scrollTo(0);
            return;
          }

          const nav = document.querySelector('nav');
          const navHeight = nav?.getBoundingClientRect().height ?? 72;
          const section = document.querySelector(href);
          const paddingTop = section
            ? parseFloat(getComputedStyle(section).paddingTop)
            : 96;
          lenis.scrollTo(href, { offset: paddingTop - navHeight });
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return lenisRef;
}
