import { useEffect, useRef, useState, type ComponentType } from 'react';
import type { Project } from '../types';
import { Icon } from './Icon';
import { TerminalSection } from './TerminalSection';
import { MicroservicesDiagram } from './diagrams/MicroservicesDiagram';
import { RolesDiagram } from './diagrams/RolesDiagram';

const DIAGRAMS: Record<string, ComponentType> = {
  'Student Enrollment System - Microservices Architecture': MicroservicesDiagram,
  'University Academic Management Platform': RolesDiagram,
};

const LANG_COLORS: Record<string, string> = {
  Java: '#f89820',
  'Spring Boot': '#6db33f',
  'React': '#61dafb',
  Laravel: '#ff2d20',
  PHP: '#777bb4',
  Python: '#3776ab',
};

function primaryLangColor(tech: string[]): string {
  for (const t of tech) {
    if (LANG_COLORS[t]) return LANG_COLORS[t];
  }
  return '#00e5a0';
}

/** "https://github.com/user/repo" -> "user/repo"; falls back to the project name */
function repoLabel(project: Project): string {
  if (project.github) {
    try {
      return new URL(project.github).pathname.replace(/^\/|\/$/g, '');
    } catch {
      /* fall through */
    }
  }
  return project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/** on-theme GitHub button: actually copies `git clone <url>` to the clipboard */
function GitCloneButton({ repoUrl }: { repoUrl: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`git clone ${repoUrl}.git`);
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(repoUrl, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <button type="button" onClick={copy} className="btn btn-ghost" aria-live="polite">
      {copied ? (
        <>
          <Icon name="check" className="h-4 w-4 text-accent" /> copied!
        </>
      ) : (
        <>
          <Icon name="copy" /> git clone
        </>
      )}
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Diagram = DIAGRAMS[project.name];
  const dotColor = primaryLangColor(project.technologies);
  const repo = repoLabel(project);

  return (
    <div className="project-card spotlight-parent flex flex-col">
      <span className="spotlight" />
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
        <span className="truncate font-mono text-sm text-ink-soft">{repo}</span>
      </div>
      <h3 className="text-[1.25rem] font-medium">{project.name}</h3>
      <p className="mt-1 mb-4 text-ink-soft">{project.description}</p>

      {/* preview slot: real screenshot when provided in data.json, else the
          architecture diagram, else an honest "coming soon" placeholder */}
      <div className="browser-window mb-5">
        <div className="browser-chrome">
          <span className="browser-dot bg-[#ff5f57]" />
          <span className="browser-dot bg-[#febc2e]" />
          <span className="browser-dot bg-[#28c840]" />
          <span className="browser-address">localhost:8080/{repo.split('/').pop()}</span>
        </div>
        {project.image ? (
          <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" className="block w-full" />
        ) : Diagram ? (
          <div className="p-4">
            <Diagram />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center">
            <p className="font-mono text-xs text-ink-mute">
              <span className="text-accent">$</span> screenshot --pending<span className="cursor-blink">_</span>
            </p>
          </div>
        )}
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.technologies.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <ul className="mb-5 space-y-1 font-mono text-[0.85rem] text-ink-soft">
        {project.features.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-accent">+</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3">
        {project.github && (
          <>
            <GitCloneButton repoUrl={project.github} />
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Icon name="github" /> View on GitHub
            </a>
          </>
        )}
        {project.live_demo && (
          <a href={project.live_demo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Icon name="external-link" /> Live demo
          </a>
        )}
      </div>
    </div>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <TerminalSection id="projects" label="04 — Projects" title="Selected work" command="ls ~/projects">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </TerminalSection>
  );
}
