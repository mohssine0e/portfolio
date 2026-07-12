import type { ReactNode } from 'react';
import type { Personal } from '../types';
import { TerminalSection } from './TerminalSection';

function ManSection({ title, children, last = false }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <div className={last ? 'mb-4' : 'mb-5'}>
      <p className="text-xs font-bold tracking-widest text-ink">{title}</p>
      <div className="mt-1.5 pl-4">{children}</div>
    </div>
  );
}

export function About({ personal }: { personal: Personal }) {
  return (
    <TerminalSection id="about" label="01 — About" title="Profile" command="man mohssine">
        <div className="max-w-[760px] rounded-lg border border-line bg-bg-tint p-5 font-mono text-sm leading-relaxed sm:p-7">
          <ManSection title="NAME">
            <span className="text-ink">{personal.name}</span>
            <span className="text-ink-soft"> — {personal.title}</span>
          </ManSection>

          <ManSection title="SYNOPSIS">
            <span className="text-accent">whoami</span>
            <span className="text-ink-soft"> --focus=backend --os=arch --hobby=chess</span>
          </ManSection>

          <ManSection title="DESCRIPTION">
            <p className="max-w-[62ch] text-ink-soft">{personal.description}</p>
          </ManSection>

          <ManSection title="OPTIONS" last>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
              <dt className="text-ink-mute">--location</dt>
              <dd className="m-0 text-ink">{personal.location}</dd>
              <dt className="text-ink-mute">--focus</dt>
              <dd className="m-0 text-ink">Microservices &amp; distributed systems</dd>
              <dt className="text-ink-mute">--stack</dt>
              <dd className="m-0 text-ink">Java, Spring Boot</dd>
              <dt className="text-ink-mute">--seeking</dt>
              <dd className="m-0 text-ink">PFA internship (2&ndash;3 months)</dd>
            </dl>
          </ManSection>

          <p className="border-t border-line pt-4 text-xs text-ink-mute">
            SEE ALSO{' '}
            <a href="#skills" className="text-accent hover:underline">
              skills(1)
            </a>
            ,{' '}
            <a href="#experience" className="text-accent hover:underline">
              experience(1)
            </a>
            ,{' '}
            <a href="#projects" className="text-accent hover:underline">
              projects(1)
            </a>
          </p>
        </div>
    </TerminalSection>
  );
}
