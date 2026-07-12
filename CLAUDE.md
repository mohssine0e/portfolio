# Portfolio Project

- personal developer portfolio(cybersecurity entotiaste), dark mode, terminal/code-editor aesthetic
- React + Vite + TypeScript + Tailwind CSS. See LOOKHERE.md before assuming this is still a
  zero-build static site — it isn't anymore.
- All personal content (bio, skills, experience, projects, certifications, links) lives in
  `public/data/data.json`, fetched at runtime — never hardcode it into components
- Keep dependencies minimal, no heavy animation libraries unless justified (motion is done with
  CSS + IntersectionObserver, not Framer Motion or similar)
- Mobile-first, responsive
- Accent color: terminal green `#00e5a0`
- Each section borrows a distinct developer-tool visual metaphor (hero = shell prompt + frameless
  cut-out portrait (edges CSS-masked into the bg — no box/border, owner's explicit choice), about =
  man page, skills = package manager output, experience = git log, projects = repo cards,
  contact = terminal form) — keep new sections in that spirit rather than reverting to plain cards
- Icons are inline SVGs in `src/components/Icon.tsx`, fonts self-hosted via @fontsource — no
  icon-font or font CDNs. Typing animations are decorative only: content must never be hidden
  or gated behind them (`useTypewriter` + `useInView`)
