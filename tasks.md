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

## Part 2 — Enhancements (visual identity & polish)

- [ ] Replace CDN Tailwind v2 dev build with a proper build step (or a hand-written, purposeful CSS system) — drop the generic "hacker terminal" template look
- [ ] Commit to one coherent visual direction (calmer editorial identity: backend/distributed-systems focus, clean type, restrained accent color) instead of the half-finished terminal cosplay
- [ ] Reduce accent palette to one primary accent + one neutral secondary, used with intent (not repeated on every element)
- [ ] Vary section layout/rhythm instead of five identical cards (asymmetric hero, alternating project layout, distinct timeline treatment)
- [ ] Improve skill display beyond a flat tag cloud (group/weight by strength instead of 30+ identical pills)
- [ ] Add lightweight visuals to Projects (simple architecture diagram for the microservices project, or screenshots)
- [ ] Improve profile photo treatment (subtle duotone/gradient mask matching palette instead of default circle+ring)
- [ ] Add simple wayfinding (sticky minimal nav or section dots)
- [ ] Add restrained, purposeful micro-interactions (scroll reveal, refined hover states) — quality over quantity
- [ ] Check text color contrast (opacity-70/60 text on dark background) for accessibility
- [ ] Responsive pass on mobile/tablet after redesign

## Process

- After Part 1 is complete and verified in-browser → commit and push to GitHub.
- After Part 2 is complete and verified in-browser → commit and push to GitHub.
