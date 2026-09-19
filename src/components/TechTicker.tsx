import type { TechnicalSkills } from '../types';

export function TechTicker({ skills }: { skills: TechnicalSkills }) {
  const items = Array.from(
    new Set([...skills.programming, ...skills.backend, ...skills.databases, ...skills.devops_tools]),
  );
  // 3 copies so the -33.33% loop never shows a gap, even with a short list
  const loop = [...items, ...items, ...items];

  return (
    <div aria-hidden="true" className="hero-fade hero-fade-3 mt-8 flex items-center gap-3">
      <span className="shrink-0 font-mono text-[0.7rem] tracking-widest text-ink-mute">stack:</span>
      <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[ticker_36s_linear_infinite] gap-10 hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <span key={i} className="font-mono text-[0.78rem] tracking-wide whitespace-nowrap text-ink-mute">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
