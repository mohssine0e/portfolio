import { useEffect, useRef, useState } from 'react';
import type { Socials } from '../types';
import { OPEN_TERMINAL_EVENT, SECTIONS } from '../sections';

/** A line of terminal output; `href` makes it a tappable target. */
type Line = { text: string; href?: string };

const HELP_TEXT: Line[] = [
  { text: 'available commands:' },
  { text: '  ls         list sections' },
  { text: '  cd <name>  jump to a section' },
  { text: '  cv         open resume (EN)' },
  { text: '  contact    jump to the contact form' },
  { text: '  sudo hire-me' },
  { text: '  clear      clear this window' },
  { text: '  exit       close this window' },
];

/** `ls` output doubles as the small-screen navigation, so entries are tappable. */
const LS_LINES: Line[] = SECTIONS.map((s) => ({ text: `${s.id}/`, href: `#${s.id}` }));

/**
 * Interactive terminal. Opened by typing "help" anywhere on the page, or from
 * the nav's `>_` chip — which is also how it is reached on phones, where it
 * stands in for the link row that doesn't fit.
 */
export function HelpTerminal({ socials }: { socials: Socials }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // watch plain typing for the trigger word
  useEffect(() => {
    let buffer = '';
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === 'help') {
        buffer = '';
        // keep the triggering keystroke out of the freshly-focused prompt
        e.preventDefault();
        setLines([{ text: '$ help' }, ...HELP_TEXT]);
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // opened from the nav chip: as a menu on small screens, as help on large ones
  useEffect(() => {
    function onOpen(e: Event) {
      const mode = (e as CustomEvent<{ mode?: 'ls' | 'help' }>).detail?.mode ?? 'help';
      setLines(mode === 'ls' ? [{ text: '$ ls' }, ...LS_LINES] : [{ text: '$ help' }, ...HELP_TEXT]);
      setOpen(true);
    }
    window.addEventListener(OPEN_TERMINAL_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_TERMINAL_EVENT, onOpen);
  }, []);

  // close on Esc, keep output scrolled to bottom
  useEffect(() => {
    if (!open) return;
    // only steal focus where there's a real keyboard: on touch this would throw
    // up the on-screen keyboard over a window being used as a tap menu
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      inputRef.current?.focus();
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  }

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    const echo = { text: `$ ${raw}` };

    // `cd about`, `cd ~/about`, `cd projects/` all land on the section
    if (cmd.startsWith('cd ')) {
      const target = cmd.slice(3).replace(/[~/]/g, '').trim();
      const match = SECTIONS.find((s) => s.id === target);
      if (match) {
        setLines((l) => [...l, echo, { text: `cd ~/${match.id}` }]);
        goTo(match.id);
      } else {
        setLines((l) => [...l, echo, { text: `cd: no such section: ${target || '?'} — try \`ls\`` }]);
      }
      return;
    }

    switch (cmd) {
      case '':
        setLines((l) => [...l, { text: '$' }]);
        break;
      case 'help':
        setLines((l) => [...l, echo, ...HELP_TEXT]);
        break;
      case 'ls':
        setLines((l) => [...l, echo, ...LS_LINES]);
        break;
      case 'cv':
        setLines((l) => [...l, echo, { text: socials.cv_en ? 'opening cv…' : 'no cv found — try `contact`' }]);
        if (socials.cv_en) window.open(socials.cv_en, '_blank', 'noopener,noreferrer');
        break;
      case 'contact':
        setLines((l) => [...l, echo, { text: 'cd ~/contact' }]);
        goTo('contact');
        break;
      case 'sudo hire-me':
      case 'sudo hire me':
      case 'hire-me':
        setLines((l) => [...l, echo, { text: '[sudo] permission granted — opening contact form ;)' }]);
        setTimeout(() => goTo('contact'), 900);
        break;
      case 'clear':
        setLines([]);
        break;
      case 'exit':
      case 'quit':
      case 'q':
        setOpen(false);
        break;
      default:
        setLines((l) => [...l, echo, { text: `bash: ${cmd}: command not found — try \`help\`` }]);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Terminal"
      className="fixed right-4 bottom-4 z-50 w-[min(340px,calc(100vw-2rem))] animate-[overlay-in_0.2s_ease-out] overflow-hidden rounded-lg border border-line bg-bg-raised shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-bg-tint px-2.5 py-1.5">
        <button
          type="button"
          aria-label="Close terminal"
          onClick={() => setOpen(false)}
          className="h-2 w-2 cursor-pointer rounded-full border-0 bg-[#ff5f57] p-0"
        />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-auto font-mono text-[0.6rem] tracking-wide text-ink-mute">guest@portfolio: ~</span>
      </div>
      <div ref={bodyRef} className="max-h-52 overflow-y-auto px-3 py-2.5 font-mono text-xs leading-relaxed">
        {lines.map((line, i) =>
          line.href ? (
            <a
              key={i}
              href={line.href}
              onClick={(e) => {
                e.preventDefault();
                goTo(line.href!.slice(1));
              }}
              className="block py-1 text-accent no-underline hover:underline"
            >
              {line.text}
            </a>
          ) : (
            <p key={i} className={line.text.startsWith('$') ? 'text-ink' : 'text-ink-soft'}>
              {line.text}
            </p>
          ),
        )}
        <p className="flex items-center gap-1 text-ink">
          <span className="text-accent">$</span>
          <input
            ref={inputRef}
            type="text"
            aria-label="Terminal command"
            spellCheck={false}
            autoComplete="off"
            className="w-full border-0 bg-transparent font-mono text-xs text-ink outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                run(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </p>
      </div>
    </div>
  );
}
