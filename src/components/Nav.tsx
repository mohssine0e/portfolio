import { useEffect, useRef, useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { OPEN_TERMINAL_EVENT, SECTIONS, SECTION_IDS } from '../sections';

function openTerminal(mode: 'ls' | 'help') {
  window.dispatchEvent(new CustomEvent(OPEN_TERMINAL_EVENT, { detail: { mode } }));
}

export function Nav({ name }: { name: string }) {
  const activeId = useScrollSpy(SECTION_IDS);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    if (!activeId) return;
    function measure() {
      const el = linkRefs.current[activeId!];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
    measure();
    // link positions shift when the viewport crosses the num-label breakpoint
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, [activeId]);

  return (
    <nav className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="wrap flex h-14 items-center justify-between gap-6">
        <a
          href="#top"
          aria-label={name}
          className="shrink-0 font-mono text-[1.05rem] font-semibold whitespace-nowrap text-ink no-underline transition-colors hover:text-accent"
        >
          <span className="text-accent">{'>_'}</span>
          {/* the name only fits alongside five numbered links from 1024px up;
              at 768px it pushed the row 10px past the viewport */}
          <span className="hidden lg:inline"> {name}</span>
        </a>

        <div className="flex items-center gap-5">
          <ul className="relative hidden list-none gap-2.5 sm:flex sm:gap-5">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  ref={(el) => {
                    linkRefs.current[s.id] = el;
                  }}
                  href={`#${s.id}`}
                  className={`relative font-mono text-[0.72rem] tracking-wide whitespace-nowrap no-underline transition-colors sm:text-[0.85rem] ${
                    activeId === s.id ? 'text-accent' : 'text-ink-soft hover:text-accent'
                  }`}
                >
                  <span className="max-[640px]:hidden">{s.num} </span>
                  {s.label}
                </a>
              </li>
            ))}
            {indicator && (
              <span
                className="absolute bottom-0 h-0.5 rounded-full bg-accent transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ left: indicator.left, width: indicator.width }}
              />
            )}
          </ul>

          {/* Below 640px five links overflow their row and clip "Contact", so the
              terminal takes over as the navigation there. From 1024px up there is
              room to also advertise the terminal, which is otherwise only
              reachable by typing "help" and so goes unfound. */}
          <button
            type="button"
            onClick={() => openTerminal(window.innerWidth < 640 ? 'ls' : 'help')}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-line bg-bg-tint px-2.5 py-1.5 font-mono text-xs text-ink-soft transition-colors hover:border-accent hover:text-accent sm:hidden lg:flex"
          >
            <span className="text-accent">{'>_'}</span>
            <span className="lg:hidden">menu</span>
            <span className="hidden lg:inline">help</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
