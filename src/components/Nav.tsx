import { useEffect, useRef, useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

const SECTIONS = [
  { id: 'about', label: 'About', num: '01' },
  { id: 'skills', label: 'Skills', num: '02' },
  { id: 'experience', label: 'Experience', num: '03' },
  { id: 'projects', label: 'Projects', num: '04' },
  { id: 'contact', label: 'Contact', num: '05' },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

export function Nav({ name }: { name: string }) {
  const activeId = useScrollSpy(SECTION_IDS);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    if (!activeId) return;
    const el = linkRefs.current[activeId];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeId]);

  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="wrap flex h-14 items-center justify-between">
        <a
          href="#top"
          aria-label={name}
          className="shrink-0 font-mono text-[1.05rem] font-semibold whitespace-nowrap text-ink no-underline transition-colors hover:text-accent"
        >
          <span className="text-accent">{'>_'}</span>
          {/* the name doesn't fit next to five links on small screens */}
          <span className="hidden md:inline"> {name}</span>
        </a>
        <ul className="relative flex list-none gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5">
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
      </div>
    </nav>
  );
}
