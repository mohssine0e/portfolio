# Look here first

This portfolio is a React + Vite + TypeScript + Tailwind app now. It was a zero-build single
`index.html` before that (see `tasks.md` Parts 1–3) — that version is gone. If you see references
to "everything is in one HTML file, no build step" in old chat history, that's stale.

## What's actually in this repo

```
index.html                  Vite entry shell — just mounts React into #root, no page content here
src/main.tsx                React root
src/App.tsx                 top-level layout: Nav + section components in order
src/index.css               Tailwind import + design tokens (@theme) + shared component classes
src/types.ts                TypeScript types for public/data/data.json
src/hooks/                  usePortfolioData, useInView, useScrollSpy, useSpotlightTracking
src/components/             one component per section (Hero, About, Skills, Experience,
                             Projects, MoreBadges, Contact, Footer, Nav) + small shared pieces
                             (Reveal, KineticHeading, Wrap, TechTicker) + diagrams/
public/data/data.json       all page content (name, skills, experience, projects, ...)
public/images/my_face.png   real profile photo
tasks.md                    log of the bug-fix + redesign + rewrite work done so far
CLAUDE.md                   working rules for this project
```

## Technologies used

- **React 19 + Vite + TypeScript** — component-based, `npm run dev` for a hot-reloading dev
  server, `npm run build` for a static `dist/` output
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/index.css` (no `tailwind.config.js`);
  custom colors (`bg`, `bg-tint`, `bg-raised`, `ink`, `ink-soft`, `ink-mute`, `accent`, `line`) and
  fonts (`font-mono` = JetBrains Mono, `font-sans` = Inter) are declared there and used as normal
  Tailwind utilities (`bg-bg`, `text-accent`, etc.) everywhere
- No animation library — motion is CSS transitions/keyframes + a couple of small custom hooks
  (`useInView` for scroll-reveal, a cursor-tracked spotlight hook). Keep it that way unless a
  specific interaction genuinely needs more.
- **Google Fonts (CDN)** — JetBrains Mono + Inter, linked in `index.html`
- **Font Awesome (CDN)** — icons only, linked in `index.html`
- **JSON** — `public/data/data.json` is still the single source of truth for content, fetched at
  runtime from `/data/data.json` (see `src/hooks/usePortfolioData.ts`), same as before — editing
  it does not require a rebuild, just a redeploy of the static file

## Design concept

Each section deliberately borrows a different real developer-tool's visual language instead of
reusing one generic card style everywhere — see `CLAUDE.md` for the list (hero = shell/webcam,
about = man page, skills = package-manager output, experience = git log, projects = repo cards
with a fake browser-chrome frame, contact = terminal form). Keep that thread when adding sections.

## How to edit things

- **Change content** (name, skills, jobs, projects, certifications, etc.) → edit
  `public/data/data.json` only. Nothing else needs to change.
- **Change colors/fonts** → edit the `@theme` block at the top of `src/index.css`.
- **Change a section's layout** → edit the matching component in `src/components/`.
- **Add a new content field** → add it to `data.json`, add it to the matching interface in
  `src/types.ts`, then read it in the relevant component.
- **Real project screenshots**: currently each project card frames a hand-drawn SVG architecture
  diagram (`src/components/diagrams/`) inside a fake browser window as a placeholder. Swap in a
  real `<img>` there once you have actual screenshots.
- **Contact form**: not wired to a real backend yet. `src/components/Contact.tsx` has a
  `FORMSPREE_ENDPOINT` constant — sign up at formspree.io, create a form, and paste the real
  endpoint in to go live. Until then, submitting shows a graceful fallback pointing at your email.

## Running it locally

```
npm install
npm run dev
```

then open the URL Vite prints (usually `http://localhost:5173`).

## Building / deploying

```
npm run build
```

outputs a static `dist/` folder (includes the `public/` assets as-is). Deploy `dist/` to any
static host — GitHub Pages, Netlify, Vercel, etc. `npm run preview` serves `dist/` locally to
sanity-check the production build before deploying.
