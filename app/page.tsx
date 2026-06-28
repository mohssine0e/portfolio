import { Header } from '@/components/header'
import { ScrollProgress } from '@/components/scroll-progress'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { CommandPalette } from '@/components/command-palette'
import { MatrixRain } from '@/components/effects/matrix-rain'

export default function Page() {
  return (
    <main className="relative">
      <MatrixRain />
      <ScrollProgress />
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <CommandPalette />
    </main>
  )
}
