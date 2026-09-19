import { useEffect, useRef } from 'react';

/**
 * Page-wide ambient glow that trails the cursor (lerped, so it feels like a
 * light source rather than a sticker). One fixed element, transform-only,
 * screen-blended at ~4% alpha. Skipped entirely on touch devices and under
 * prefers-reduced-motion; the rAF loop only runs while the glow is catching up.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (
      !glow ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let seen = false;

    function tick() {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      glow!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!seen) {
        // first movement: appear at the cursor instead of sliding in from a corner
        seen = true;
        x = targetX;
        y = targetY;
        glow!.style.opacity = '1';
      }
      if (!raf) raf = requestAnimationFrame(tick);
    }

    document.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[5] opacity-0 transition-opacity duration-700 will-change-transform"
    >
      <div className="h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full [background:radial-gradient(closest-side,rgba(0,229,160,0.055),rgba(0,229,160,0.02)_45%,transparent_70%)] [mix-blend-mode:screen]" />
    </div>
  );
}
