import type { TechnicalSkills } from '../types';
import { Icon } from './Icon';
import { TerminalSection } from './TerminalSection';

function TreeList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2.5 space-y-1.5">
      {items.map((item, i) => (
        <li key={item} className="flex gap-2 font-mono text-[0.85rem] leading-snug text-ink-soft">
          <span className="shrink-0 text-ink-mute">{i === items.length - 1 ? '└──' : '├──'}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SkillDir({ dir, items }: { dir: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mb-5 break-inside-avoid rounded-lg border border-line bg-bg-raised p-4 sm:p-5">
      <p className="font-mono text-sm font-semibold text-accent">
        <Icon name="folder-open" className="mr-2 h-4 w-4 text-ink-mute" />
        {dir}/
      </p>
      <TreeList items={items} />
    </div>
  );
}

export function Skills({ skills }: { skills: TechnicalSkills }) {
  const dirs: [string, string[]][] = [
    ['programming', skills.programming],
    ['backend', skills.backend],
    ['frontend', skills.frontend],
    ['databases', skills.databases],
    ['devops-tools', skills.devops_tools],
    ['concepts', skills.concepts],
    ...(skills.other?.length ? [['other', skills.other] as [string, string[]]] : []),
  ];

  return (
    <TerminalSection id="skills" label="02 — Skills" title="Toolbox" command="tree ~/skills" tint>
      {/* CSS-columns masonry: cards keep their natural height instead of
          stretching to the tallest card in a grid row */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {dirs.map(([dir, items]) => (
          <SkillDir key={dir} dir={dir} items={items} />
        ))}
      </div>
    </TerminalSection>
  );
}
