import { useEffect } from 'react';

/** Cursor-tracked spotlight glow: sets --mx/--my on the hovered .spotlight-parent element. */
export function useSpotlightTracking() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    function handleMouseMove(e: MouseEvent) {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const target = e.target as HTMLElement;
        const spot = target.closest<HTMLElement>('.spotlight-parent');
        if (spot) {
          const rect = spot.getBoundingClientRect();
          spot.style.setProperty('--mx', `${e.clientX - rect.left}px`);
          spot.style.setProperty('--my', `${e.clientY - rect.top}px`);
        }
        ticking = false;
      });
    }
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
}
