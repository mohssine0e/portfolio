import type { ReactNode } from 'react';
import type { Education, Experience as ExperienceItem } from '../types';
import { TerminalSection } from './TerminalSection';

function fakeHash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h.toString(16).padStart(7, '0').slice(0, 7);
}

function CommitEntry({
  hash,
  title,
  subtitle,
  meta,
  tech,
  bullets,
  isLast,
}: {
  hash: string;
  title: string;
  subtitle: string;
  meta?: string;
  tech?: string[];
  bullets?: ReactNode[];
  isLast: boolean;
}) {
  return (
    <div className="relative pb-8 pl-6 last:pb-0">
      {!isLast && <span className="absolute top-3 left-[5px] h-full w-px bg-line" aria-hidden="true" />}
      <span
        className="absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_3px_var(--color-accent-soft)]"
        aria-hidden="true"
      />
      <p className="font-mono text-xs text-ink-mute">
        commit <span className="text-ink-soft">{hash}</span>
        {meta ? <span> &middot; {meta}</span> : null}
      </p>
      <p className="mt-1 font-mono text-[0.95rem] font-semibold text-ink">{title}</p>
      <p className="mt-0.5 text-sm text-accent">{subtitle}</p>
      {tech && tech.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="mt-2.5 space-y-1 font-mono text-[0.85rem] text-ink-soft">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-accent">+</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ExperienceEducation({
  experience,
  education,
}: {
  experience: ExperienceItem[];
  education: Education[];
}) {
  return (
    <>
      <TerminalSection id="experience" label="03 — Experience" title="Experience" command="git log --author=mohssine">
          <div>
            {experience.map((e, i) => (
              <CommitEntry
                key={e.id}
                hash={fakeHash(`${e.company}${e.position}`)}
                title={e.position}
                subtitle={`${e.company}${e.location ? ` · ${e.location}` : ''}`}
                meta={e.duration}
                tech={e.technologies}
                bullets={e.responsibilities}
                isLast={i === experience.length - 1}
              />
            ))}
          </div>
      </TerminalSection>

      <TerminalSection id="education" label="03.1 — Education" title="Education" command="git log education" tint>
          <div>
            {education.map((ed, i) => (
              <CommitEntry
                key={ed.id}
                hash={fakeHash(`${ed.institution}${ed.degree}`)}
                title={ed.degree + (ed.honors ? ` — ${ed.honors}` : '')}
                subtitle={ed.institution}
                meta={ed.period}
                bullets={ed.coursework ? [`coursework: ${ed.coursework.join(', ')}`] : undefined}
                isLast={i === education.length - 1}
              />
            ))}
          </div>
      </TerminalSection>
    </>
  );
}
