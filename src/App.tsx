import { usePortfolioData } from './hooks/usePortfolioData';
import { useSpotlightTracking } from './hooks/useSpotlightTracking';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ExperienceEducation } from './components/Experience';
import { Projects } from './components/Projects';
import { MoreBadges } from './components/MoreBadges';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Wrap } from './components/Wrap';

export default function App() {
  const state = usePortfolioData();
  useSpotlightTracking();

  if (state.status === 'loading') {
    return (
      <Wrap className="pt-12">
        <p className="font-mono text-sm text-ink-soft">
          <span className="text-accent">$</span> ./portfolio --load<span className="cursor-blink text-accent">█</span>
        </p>
      </Wrap>
    );
  }

  if (state.status === 'error') {
    return (
      <Wrap className="pt-12">
        <p className="font-mono text-sm text-amber-400">
          ✗ failed to load portfolio data — exit code 1. Refresh to retry.
        </p>
      </Wrap>
    );
  }

  const { data } = state;

  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Nav name={data.personal.name} />
      <Hero data={data} />
      <About personal={data.personal} />
      <Skills skills={data.technical_skills} />
      <ExperienceEducation experience={data.experience} education={data.education} />
      <Projects projects={data.projects} />
      <MoreBadges
        certifications={data.certifications}
        leadership={data.leadership}
        languages={data.languages}
        interests={data.interests}
      />
      <Contact data={data} />
      <Footer name={data.personal.name} socials={data.socials} />
    </>
  );
}
