import { SECTIONS, SECTION_IDS } from '../sections';
import { useScrollSpy } from '../hooks/useScrollSpy';

/**
 * Editor-gutter section index living in the left margin on very wide screens.
 *
 * Below 1600px it is hidden: the content column already fills the viewport, so
 * there is no margin to place it in. Its left offset is measured from the
 * column (--col-half) rather than the viewport edge, so it can never drift into
 * the content no matter how wide the screen gets.
 */
export function GutterRail() {
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <nav
      aria-label="Section index"
      className="fixed top-1/2 left-[calc(50%-var(--col-half)-12rem)] z-10 hidden w-40 -translate-y-1/2 min-[1600px]:block"
    >
      <ol className="m-0 list-none border-l border-line p-0 font-mono text-xs">
        {SECTIONS.map((s) => {
          const active = activeId === s.id;
          return (
            <li key={s.id} className="relative">
              {/* the active row's marker sits on the rule, like an editor's cursor line */}
              <span
                aria-hidden="true"
                className={`absolute top-1/2 -left-px h-4 w-0.5 -translate-y-1/2 bg-accent transition-opacity duration-300 ${
                  active ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <a
                href={`#${s.id}`}
                aria-current={active ? 'true' : undefined}
                className={`flex items-baseline gap-2 py-1.5 pl-4 no-underline transition-colors ${
                  active ? 'text-accent' : 'text-ink-mute hover:text-ink-soft'
                }`}
              >
                <span className={active ? 'text-accent/60' : 'text-line'}>{s.num}</span>
                <span>{s.label.toLowerCase()}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
