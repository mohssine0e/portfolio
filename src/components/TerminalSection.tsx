import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import { useTypewriter } from '../hooks/useTypewriter';
import { Wrap } from './Wrap';

/**
 * Section shell that plays the terminal metaphor on entrance: the heading is a
 * shell command typed character by character the first time the section scrolls
 * into view, then the section body fades in as the command's "output". The
 * body keeps its layout space while hidden so nothing shifts.
 */
export function TerminalSection({
  id,
  label,
  command,
  title,
  tint = false,
  children,
}: {
  id: string;
  label: string;
  /** shell command shown as the heading, e.g. "tree ~/skills" */
  command: string;
  /** human-readable section name for assistive tech */
  title: string;
  tint?: boolean;
  children: ReactNode;
}) {
  // threshold 0 = type as soon as the section's first pixel (its heading)
  // enters; the big top rootMargin also catches sections already scrolled
  // past (e.g. anchor/End jumps) so nothing below stays blank
  const { ref, inView } = useInView<HTMLElement>(0, '2000px 0px 0px 0px');
  const { typed, done } = useTypewriter(command, 38, inView);

  return (
    <section ref={ref} id={id} className={`section ${tint ? 'bg-bg-tint' : ''}`}>
      <Wrap>
        <div className="mb-10">
          <p className="section-label">{label}</p>
          <h2 aria-label={title} className="mt-2 min-h-[1.5em] font-mono text-[1.25rem] font-medium sm:text-2xl">
            <span aria-hidden="true">
              <span className="text-accent">$ </span>
              {typed}
              {!done && <span className="cursor-blink text-accent">█</span>}
            </span>
          </h2>
        </div>
        {/* the "output": revealed only once the command finishes typing */}
        <div
          className={`transition-[opacity,transform] duration-500 ease-out ${
            done ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          {children}
        </div>
      </Wrap>
    </section>
  );
}
