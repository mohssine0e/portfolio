import type { ReactNode } from 'react';
import type { Certification, Language, LeadershipRole } from '../types';
import { Icon } from './Icon';
import { TerminalSection } from './TerminalSection';

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-bg-raised p-5">
      <p className="mb-4 font-mono text-xs font-semibold tracking-widest text-ink-mute uppercase">
        <span className="text-accent"># </span>
        {title}
      </p>
      {children}
    </div>
  );
}

export function MoreBadges({
  certifications,
  leadership,
  languages,
  interests,
}: {
  certifications: Certification[];
  leadership: { roles: LeadershipRole[] };
  languages: Language[];
  interests: string[];
}) {
  return (
    <TerminalSection
      id="more"
      label="04.1 — Extras"
      title="Certifications, languages & leadership"
      command="cat extras.yml"
      tint
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Panel title="certifications">
          <div className="space-y-4">
            {certifications.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Icon name="award" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm leading-snug font-medium text-ink">{c.name}</p>
                  <p className="mt-0.5 text-xs text-ink-mute">
                    {c.issuer} · {c.status === 'in-progress' ? 'in progress' : c.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="languages">
          <ul className="space-y-2.5">
            {languages.map((l) => (
              <li key={l.language} className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5 font-mono text-sm last:border-0 last:pb-0">
                <span className="text-ink">{l.language}</span>
                <span className="text-xs text-ink-mute">{l.proficiency}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="leadership">
          {leadership.roles.map((r) => (
            <div key={r.title}>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Icon name="crown" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm leading-snug font-medium text-ink">{r.title}</p>
                  <p className="mt-0.5 text-xs text-ink-mute">{r.organization}</p>
                </div>
              </div>
              <ul className="mt-3 space-y-1 font-mono text-[0.8rem] text-ink-soft">
                {r.responsibilities.map((resp, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent">+</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Panel>

        <Panel title="interests">
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span key={interest} className="chip">
                {interest}
              </span>
            ))}
          </div>
        </Panel>
      </div>
    </TerminalSection>
  );
}
