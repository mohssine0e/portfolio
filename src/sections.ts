/** The page's section index, shared by the nav, the wide-screen gutter rail and
 *  the terminal's `ls`/`cd` commands so they can never drift apart. */
export const SECTIONS = [
  { id: 'about', label: 'About', num: '01' },
  { id: 'skills', label: 'Skills', num: '02' },
  { id: 'experience', label: 'Experience', num: '03' },
  { id: 'projects', label: 'Projects', num: '04' },
  { id: 'contact', label: 'Contact', num: '05' },
] as const;

export const SECTION_IDS = SECTIONS.map((s) => s.id);

/** Opened by the nav's `>_` chip; HelpTerminal listens for it. */
export const OPEN_TERMINAL_EVENT = 'portfolio:open-terminal';
