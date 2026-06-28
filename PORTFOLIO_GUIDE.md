# Portfolio - Complete Guide

## Project Overview

This is a modern, tech-themed portfolio for **Mohssine Echlaihi**, a Software Engineering Student and Java Backend Developer. The portfolio is built with **Next.js 16**, **React 19**, **Tailwind CSS**, and **Framer Motion**.

---

## Key Features

### 1. **Static Face Placeholder**
- **Location:** `/public/images/my_face.png`
- **Header:** Small circular avatar (48px) next to "root@portfolio"
- **Hero Section:** Larger circular avatar (160px) on the left side
- **No animations:** Clean, simple, static positioning
- **Styling:** Cyan border with gradient background

### 2. **Unified Color Scheme**
Only **3 primary colors** used throughout:
- **Green (#10b981)**: Primary actions, success, system status
- **Cyan (#06b6d4)**: Security, information, secondary elements
- **Orange (#f97316)**: Highlights, warnings, accents

### 3. **Consistent Styling**
- All sections use the same border and spacing
- Cards have cyan borders (`border-[#10b981]/40`)
- Text opacity standardized to `/85` for main content, `/70` for secondary
- Terminal-style command loaders on each section

### 4. **Data-Driven Content**
All portfolio content comes from `/public/data/data.json`:
- Personal info, education, experience
- Technical skills (programming, backend, frontend, databases, devops)
- Projects with full descriptions and links
- Certifications, languages, interests

---

## File Structure

```
portfolio/
├── public/
│   ├── data/
│   │   └── data.json                 # All portfolio content
│   ├── images/
│   │   └── my_face.png               # Your profile photo (160x160+)
│   └── ...other assets
│
├── components/
│   ├── face-placeholder.tsx          # Profile image component
│   ├── hero.tsx                      # Hero section with face avatar
│   ├── header.tsx                    # Navigation + small face avatar
│   ├── about.tsx                     # About section
│   ├── skills.tsx                    # System modules/skills
│   ├── projects.tsx                  # Projects/deployment logs
│   ├── experience.tsx                # Timeline
│   ├── contact.tsx                   # Contact form
│   ├── footer.tsx                    # Footer
│   └── ...other components
│
├── app/
│   ├── page.tsx                      # Main page
│   ├── layout.tsx                    # Root layout with fonts
│   └── globals.css                   # Global styles and theme
│
├── lib/
│   ├── styling.ts                    # Unified styling constants
│   └── utils.ts                      # Utility functions
│
└── README.md                         # Project setup guide
```

---

## Content Modification Guide

### Update Your Profile Image

1. **Replace the image:**
   ```bash
   # Save your professional photo as:
   public/images/my_face.png
   # Recommended: 160x160px or larger
   ```

2. **The image will automatically appear in:**
   - Hero section (left side, larger)
   - Header navigation (next to "root@portfolio", smaller)

### Update Portfolio Content

All content is managed in `/public/data/data.json`. Sections include:

#### Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "email": "your.email@example.com",
  "phone": "+1 234 567 8900",
  "location": "Your Location",
  "headline": "Your headline"
}
```

#### Technical Skills
```json
"technical_skills": {
  "programming": ["Java", "Python", ...],
  "backend": ["Spring Boot", ...],
  "frontend": ["React.js", ...],
  ...
}
```

#### Experience
```json
"experience": [
  {
    "company": "Company Name",
    "position": "Your Position",
    "duration": "2024 (2 months)",
    "responsibilities": [...]
  }
]
```

#### Projects
```json
"projects": [
  {
    "name": "Project Name",
    "description": "Description",
    "technologies": [...],
    "features": [...],
    "github": "https://github.com/..."
  }
]
```

#### Education
```json
"education": [
  {
    "degree": "Degree Name",
    "institution": "University Name",
    "period": "2022 - Present"
  }
]
```

---

## Styling Guide

### Unified Constants
Located in `/lib/styling.ts`:

```typescript
export const colors = {
  primary: '#10b981',    // Green
  secondary: '#06b6d4',  // Cyan
  accent: '#f97316',     // Orange
}

export const spacing = {
  section: 'py-20',
  container: 'max-w-6xl mx-auto px-6',
}

export const borders = {
  default: 'border border-[#10b981]/40',
}
```

### How to Customize

1. **Colors:** Edit `/app/globals.css` root variables
   ```css
   --color-primary-green: #10b981;
   --color-primary-cyan: #06b6d4;
   --color-primary-orange: #f97316;
   ```

2. **Typography:** Update in `/app/layout.tsx` font imports

3. **Spacing:** Modify classes in components using Tailwind scale

4. **Theme:** All in dark theme via `bg-background` in globals.css

---

## Component Breakdown

### FacePlaceholder (`components/face-placeholder.tsx`)
- Props: `size` (hero | header)
- Static component - no animations
- Hero: 160x160px with 2px border
- Header: 48x48px with 1px border
- Both have gradient background and rounded-full style

### Hero Section (`components/hero.tsx`)
- Displays large face avatar on left
- Terminal boot sequence animation
- Main headline + description
- Status indicators (System Online, Security Focused, Open Source)
- Action buttons (Execute Projects, Initiate Contact)
- Command loader: `$ /boot_sequence`

### About Section (`components/about.tsx`)
- Command loader: `$ whoami && uname -a`
- Personal system info displayed
- Four capability highlight cards
- Philosophy/engineering principles box
- Command loader: `$ cat philosophy.md`

### Skills Section (`components/skills.tsx`)
- Command loader: `$ sys_modules --list`
- Multiple skill category cards
- Color-coded status [LOADED] indicators
- Technologies listed as tags

### Projects Section (`components/projects.tsx`)
- Command loader: `$ cat deployment_logs.txt`
- Project cards with timestamps
- Technologies and features displayed
- Links to GitHub and live demos

### Experience Section (`components/experience.tsx`)
- Command loader: `$ cat career_history.log`
- Timeline of work experience and education
- Smooth animations on scroll

### Contact Section (`components/contact.tsx`)
- Contact form with email/phone/message
- Social media links
- Command loader: `$ initiate_contact`

---

## Running Locally

### Prerequisites
- Node.js 18+ and npm/pnpm

### Setup

```bash
# 1. Clone or navigate to project directory
cd portfolio

# 2. Install dependencies
pnpm install
# or: npm install

# 3. Start development server
pnpm dev
# or: npm run dev

# 4. Open in browser
# Visit: http://localhost:3000
```

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Deployment

### Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "Update portfolio"
git push origin main

# 2. Go to vercel.com
# 3. Import your GitHub repository
# 4. Deploy (automatic on every push)
```

### Deploy to Other Platforms

- **Netlify:** Connect GitHub repo, set build command to `pnpm build`
- **AWS Amplify:** Similar GitHub integration
- **Self-hosted:** Run `pnpm build && pnpm start`

---

## Key Technologies

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library with latest features |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Smooth animations and transitions |
| **TypeScript** | Type safety for components |
| **Lucide Icons** | System icons for UI elements |
| **SWR** | Data fetching and caching |

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (works on phones and tablets)
- Dark theme optimized

---

## Troubleshooting

### Image not showing?
- Ensure `/public/images/my_face.png` exists
- File must be 160x160px or larger
- Supported formats: PNG, JPG, WEBP

### Styles not loading?
- Clear browser cache: `Ctrl+Shift+Delete`
- Restart dev server: `Ctrl+C` then `pnpm dev`
- Check `/app/globals.css` for CSS imports

### Build errors?
- Delete `node_modules` and `.next`
- Run `pnpm install` and `pnpm dev`
- Check console for specific error messages

---

## Tips & Best Practices

1. **Content:** Keep JSON data.json organized and up-to-date
2. **Images:** Use optimized images (160x160px minimum)
3. **Links:** Test all external links work correctly
4. **Mobile:** Test on mobile devices before deploying
5. **Performance:** Use Vercel's built-in analytics
6. **SEO:** Update meta tags in `/app/layout.tsx`

---

## Support & Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion
- **React:** https://react.dev

---

**Portfolio Version:** 1.0  
**Last Updated:** June 28, 2026  
**Author:** Mohssine Echlaihi
