# Portfolio Tasks

Source: design/logic review of index.html + public/data/data.json against the real CV
(/home/mohssine/Desktop/carrier/cv_en_mohssine_echlaihi.pdf).

## Part 1 — Bug Fixes (accuracy & correctness, no visual redesign) ✅ DONE

- [x] Fix name everywhere: "Mohssine Frid" → "Mohssine Echlaihi" (hero, `<title>`, footer copyright)
- [x] Fix email typo: `mohssineechlahi85@gmail.com` → `mohssineechlaihi85@gmail.com` (data.json + all mailto links)
- [x] Fix LinkedIn slug typo: `mohssineechalahi` → `mohssineechalaihi` (data.json + link)
- [x] Remove fabricated Experience content not in the real CV:
  - "1000+ daily requests", "35% query time reduction", Redis caching claim
  - Fake "Engineering Degree" bullet with invented 3.8 GPA and capstone project
  - Fake "Student Developer / Open Source" timeline entry (15+ repos) — not in CV
  - Replaced with the real ShiftBricks internship (2024, 2 months, license management platform, Laravel/PostgreSQL/Docker/GitLab) exactly as in data.json
- [x] Add missing sections that exist in data.json but never render:
  - Certifications (Oracle OCI 2025 AI Foundations Associate, Java SE 17 in progress)
  - Languages (Arabic native, French B2, English B2)
  - Leadership (Chess Club President)
  - Baccalaureate / Mention Très Bien in Education
- [x] Remove false footer claim "Built with React, HTML, CSS & Tailwind CSS" (no React is used)
- [x] Remove/replace dead `text-foreground` utility classes (not defined anywhere, no Tailwind config) with real color classes
- [x] Make the page actually read from `public/data/data.json` at runtime (fetch + render) instead of hardcoded duplicate content, so data.json is the single source of truth

## Part 2 — Enhancements (visual identity & polish) ✅ DONE

Direction chosen: calm editorial identity (not the terminal theme) — warm paper background,
Fraunces/Inter type pairing, single rust accent, light/dark via `prefers-color-scheme`.

- [x] Dropped Tailwind CDN entirely; hand-written CSS system with variables (`:root`), matches
      the reality of a single static `index.html` with no build step
- [x] Committed to the calm editorial direction instead of the terminal theme
- [x] One accent color (`--accent`, rust/sienna) + neutral ink/paper palette, used with intent
- [x] Varied rhythm: asymmetric two-column hero, alternating tinted/plain section backgrounds,
      date-column entry layout for experience/education instead of repeated identical cards
- [x] Skills kept as grouped categories (not fake-weighted — there's no real proficiency data
      in the CV to weight against, and inventing levels would repeat the Part 1 fabrication
      problem), restyled as quiet outlined chips instead of loud filled pills
- [x] Added hand-drawn inline SVG diagrams for both projects (API gateway → 3 services diagram;
      role-hierarchy diagram) — accurate to the described architecture, not fabricated screenshots
- [x] Profile photo: rounded-rect frame, subtle grayscale+sepia duotone filter instead of the
      generic circle-avatar-with-neon-ring look
- [x] Added sticky top nav with section links + scroll-spy active state
- [x] Added IntersectionObserver-based scroll reveal per section, replacing the crude setTimeout
      stagger; kept motion restrained (fade + slight translate only)
- [x] New palette checked for contrast (near-black ink on warm paper / near-white ink on warm
      dark bg — both comfortably pass AA)
- [x] Responsive rules for hero/entries/nav at the narrow breakpoint

## Process

- After Part 1 is complete and verified in-browser → commit and push to GitHub.
- After Part 2 is complete and verified in-browser → commit and push to GitHub.
