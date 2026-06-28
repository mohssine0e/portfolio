# Mohssine Frid - Backend Engineer Portfolio

A modern, interactive portfolio website featuring a Linux/security-themed design with terminal aesthetics, smooth animations, and dynamic command-line effects.

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling

### Animation & Effects
- **Framer Motion** - Smooth scroll-triggered animations
- **Canvas API** - Matrix rain background effect
- **CSS Animations** - Terminal typing, glow, and scan line effects

### UI Components
- **Lucide React** - Minimal icon library
- **shadcn/ui** - Accessible component library

### Development
- **pnpm** - Fast package manager
- **Vercel** - Deployment platform

## 🚀 Getting Started

### Installation

```bash
# Clone or navigate to project directory
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser
# Navigate to http://localhost:3000
```

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📝 Content Modification Guide

### Hero Section
**File:** `components/hero.tsx`
- **Heading:** Modify the `fullText` variable (line ~20) to change the typewriter title
- **Description:** Update the text starting at line ~90 to change the hero description
- **Boot Sequence:** Edit the `bootSequence` array to customize terminal messages
- **CTA Buttons:** Change button text and links in the JSX starting at line ~105

### About Section
**File:** `components/about.tsx`
- **System Info:** Modify the `sysInfo` array (line ~24) to update OS, Kernel, Education, Architecture details
- **Capabilities:** Update the `highlights` array (line ~38) to change the four main capability points
- **Philosophy:** Edit the philosophy section text (starting at line ~115)

### Skills Section
**File:** `components/skills.tsx`
- **Skill Categories:** Modify the `skillCategories` array (lines ~9-32) to add/remove/rename skill groups
- **Skills within categories:** Edit the `skills` array within each category object
- **Category colors:** Change the `color` property (currently green/cyan/orange) to adjust accent colors

### Projects Section
**File:** `components/projects.tsx`
- **Project Data:** Modify the `projects` array (lines ~9-49) to add/edit project information
- **Project fields:** 
  - `title` - Project name
  - `status` - Deployment status (SUCCESS/PENDING/FAILED)
  - `timestamp` - Date and time
  - `description` - Project overview
  - `technologies` - Tech stack used
  - `highlights` - Key achievements
  - `link` - Project link
  - `github` - GitHub repository link

### Experience Section
**File:** `components/experience.tsx`
- **Experience entries:** Modify the `experiences` array to add/edit internships and work experience
- **Education entries:** Modify the `education` array to update academic information
- **Timeline items:** Each entry should include:
  - `date` - Duration or date range
  - `title` - Role or degree
  - `company` - Company or institution
  - `description` - Details about the role/degree

### Contact Section
**File:** `components/contact.tsx`
- **Contact methods:** Update the `contactMethods` array to modify email, LinkedIn, and GitHub URLs
- **Form handling:** Integrate with your email service (currently email links)
- **Call-to-action:** Modify the "Get In Touch" section text and styling

### Header Navigation
**File:** `components/header.tsx`
- **Navigation items:** Modify the `navItems` array to add/remove navigation links
- **Process names:** Update the `process` property for each nav item (shown on hover)
- **Logo text:** Change "root@portfolio" to your preferred text

### Footer
**File:** `components/footer.tsx`
- **Social links:** Update the `socialLinks` array with your actual profile URLs
- **Copyright:** Modify the footer text starting at line ~85
- **Quick links:** Edit the footer navigation sections

### Global Styling
**File:** `app/globals.css`
- **Colors:** Customize theme colors in the `:root` CSS variables (lines ~58-99)
  - `--background` - Main background color
  - `--color-system-green` - Primary accent (green)
  - `--color-system-cyan` - Secondary accent (cyan)
  - `--color-system-orange` - Tertiary accent (orange)
- **Animations:** Adjust animation keyframes and durations (lines ~191-337)
- **Fonts:** Modify font imports and families at the top of the file

## 📸 Adding Your Photo

### Step 1: Prepare Your Photo
The face placeholder displays in the hero section and animates to the header as you scroll.

**File to modify:** `components/face-placeholder.tsx`

1. Generate or obtain your professional photo
2. Save it to: `public/images/face.jpg` (or your preferred name)
3. Update the image path in `face-placeholder.tsx` line ~20:
   ```tsx
   <Image
     src="/images/face.jpg"  // Change this path
     alt="Mohssine Frid"
     width={200}
     height={200}
     className="w-full h-full object-cover rounded-full"
     priority
   />
   ```

### Step 2: Photo Styling
The component handles sizing automatically:
- Hero section: 200x200px with green glow
- Header: 50x50px as a sticky profile avatar
- Rotation effect on hero exit
- Smooth transitions as you scroll

## 🎨 Design Customization

### Color Scheme
The portfolio uses a Linux/security theme with three main accent colors:
- **Green (#10b981)** - System online, success
- **Cyan (#06b6d4)** - Security, info
- **Orange (#f97316)** - Open source, warning

### Typography
- **Headings:** Geist Sans with font-weight 600-700
- **Body:** Geist Sans with lighter weights
- **Terminal/Code:** Geist Mono for monospace styling

### Animation Timing
Terminal commands type at ~50ms per character. Adjust in `command-loader.tsx`:
```tsx
// Line ~35: Adjust CHAR_DELAY
const CHAR_DELAY = 50; // milliseconds per character
```

## 📱 Responsive Design

The portfolio is mobile-first responsive:
- **Mobile:** Single column layout, stacked sections
- **Tablet (md):** 2-column grids where appropriate
- **Desktop (lg):** 3-column grids and full layout

Modify breakpoints in Tailwind config (`tailwind.config.js`) if needed.

## 🔌 Integrations

### Current Features
- Matrix rain background effect (canvas-based, lightweight)
- Terminal command loaders for each section
- Smooth scroll animations
- Keyboard shortcuts (Cmd+K for command palette)

### Future Enhancements
- Email integration for contact form
- GitHub API for live project data
- Analytics integration
- Dark/light mode toggle

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
# Connect your GitHub repository
# Push to main branch
# Vercel auto-deploys

# Or use Vercel CLI
vercel
```

### Environment Variables
Create a `.env.local` file if needed:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🐛 Troubleshooting

### Animations not working
- Clear browser cache
- Ensure Framer Motion is installed: `pnpm list framer-motion`
- Check console for errors

### Images not loading
- Verify image path in `public/` directory
- Check Image component `src` prop
- Ensure `next.config.js` allows external images if needed

### Command loader typing effect not showing
- Check `command-loader.tsx` is imported in component
- Verify CommandLoader component is wrapping the section content
- Check console for React warnings

## 📚 File Structure

```
app/
├── page.tsx              # Main page
├── layout.tsx            # Root layout
└── globals.css           # Global styles

components/
├── hero.tsx              # Hero section
├── about.tsx             # About section
├── skills.tsx            # Skills section
├── projects.tsx          # Projects section
├── experience.tsx        # Experience section
├── contact.tsx           # Contact section
├── footer.tsx            # Footer
├── header.tsx            # Navigation header
├── face-placeholder.tsx  # Animated face avatar
├── command-loader.tsx    # Terminal typing effect
├── command-palette.tsx   # Cmd+K command palette
├── scroll-progress.tsx   # Scroll indicator
├── animated-section.tsx  # Animation wrapper
└── effects/
    └── matrix-rain.tsx   # Background effect

lib/
├── animations.ts         # Animation utilities
└── utils.ts              # Helper functions
```

## 💡 Tips for Best Results

1. **Keep content concise** - Terminal-style sections work best with focused text
2. **Use consistent formatting** - Maintain the tech aesthetic throughout
3. **Test on mobile** - Ensure smooth scrolling and animations on all devices
4. **Update regularly** - Keep projects and experience sections current
5. **Optimize images** - Compress images before adding to reduce load time

## 📄 License

This portfolio is your personal project. Feel free to customize and use as needed.

## 🔗 Quick Links

- **Development:** `pnpm dev` → http://localhost:3000
- **Build:** `pnpm build`
- **Main Content Files:** `components/*.tsx`
- **Styling:** `app/globals.css`
- **Configuration:** `next.config.mjs`, `tailwind.config.js`

---

**Last Updated:** 2024
**Portfolio Type:** Backend Engineer / Security Enthusiast
**Theme:** Linux/Open Source/Security
