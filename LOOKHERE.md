# Look here first

This portfolio is a single static page. No framework, no build step, no `npm install`.
Read this before editing anything so you don't go looking for a React app that isn't there.

## What's actually in this repo

```
index.html            everything: HTML shell + all CSS + all JS, in one file
public/data/data.json  all page content (name, skills, experience, projects, ...)
public/images/my_face.png   profile photo
tasks.md               log of the bug-fix + redesign work done so far
CLAUDE.md              original transformation plan for this portfolio
```

That's the whole site. There used to be a Next.js/React/Tailwind/shadcn version
(app/, components/, lib/, package.json, etc.) — it was fully replaced and removed.
If you see references to that stack in old chat history or docs, ignore them.

## Technologies used

- **HTML5** — single page, `index.html`
- **Vanilla CSS** — hand-written, no framework. Uses CSS custom properties (`:root` variables
  for color/font) and `@media (prefers-color-scheme: dark)` for automatic light/dark mode
- **Vanilla JavaScript** — no framework, no bundler. Uses `fetch()` to load `data.json` and
  template-string functions to render each section, plus `IntersectionObserver` for scroll-reveal
  and nav scroll-spy
- **Google Fonts (CDN)** — Fraunces (headings) + Inter (body text)
- **Font Awesome (CDN)** — icons only (email/github/linkedin/phone glyphs)
- **JSON** — `public/data/data.json` acts as the CMS. It's the single source of truth for content

No React, no Next.js, no Tailwind, no npm packages, no build/compile step.

## How to edit things

- **Change content** (name, skills, jobs, projects, certifications, etc.) → edit
  `public/data/data.json` only. `index.html` reads it at page load and renders everything;
  you never need to touch HTML for a content change.
- **Change colors/fonts/spacing** → edit the CSS variables at the top of the `<style>` block in
  `index.html` (`--bg`, `--ink`, `--accent`, `--font-display`, `--font-body`, ...). Light and dark
  values are defined separately; keep both in sync when you change one.
- **Change layout/structure** → edit the `render*()` functions in the `<script>` block at the
  bottom of `index.html`. Each section (hero, about, skills, experience, projects, contact, ...)
  has its own function that returns an HTML template string.
- **Add a new content field** → add it to `data.json`, then read it in the relevant `render*()`
  function in `index.html`.

## Running it locally

`index.html` uses `fetch()` to load `data.json`, which browsers block over `file://` (CORS).
You need a tiny local server:

```
python3 -m http.server 8000
```

then open `http://localhost:8000/`.

## Deploying

Static hosting only — GitHub Pages, Netlify, Vercel (static), or any file server. Just needs to
serve `index.html` and the `public/` folder as-is.
