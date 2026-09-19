import { useEffect, useState } from 'react';
import { usePortfolioData } from './hooks/usePortfolioData';
import { useSpotlightTracking } from './hooks/useSpotlightTracking';
import { CursorGlow } from './components/CursorGlow';
import { HelpTerminal } from './components/HelpTerminal';
import { GutterRail } from './components/GutterRail';
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

const BOOT_LINES = ['[ ok ] fonts.woff2 self-hosted', '[ ok ] data.json parsed', '[ ok ] sections mounted'];

/** Fake boot log, played once per browser session on the first visit only. */
function shouldBoot() {
  try {
    // sessionStorage access can throw when storage is blocked (strict privacy modes)
    return (
      !sessionStorage.getItem('booted') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  } catch {
    return false;
  }
}

export default function App() {
  const state = usePortfolioData();
  const [booting, setBooting] = useState(shouldBoot);
  useSpotlightTracking();

  useEffect(() => {
    if (!booting) return;
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem('booted', '1');
      } catch {
        /* storage blocked: boot will just replay next load */
      }
      setBooting(false);
    }, 1200);
    return () => clearTimeout(t);
  }, [booting]);

  if (state.status === 'loading' || booting) {
    return (
      <Wrap className="pt-12 font-mono text-sm">
        <p className="text-ink-soft">
          <span className="text-accent">$</span> ./portfolio --load
        </p>
        {booting &&
          BOOT_LINES.map((line, i) => (
            <p
              key={line}
              className="boot-line text-ink-mute"
              style={{ animationDelay: `${0.2 + i * 0.25}s` }}
            >
              <span className="text-accent">{line.slice(0, 6)}</span>
              {line.slice(6)}
            </p>
          ))}
        <p className="boot-line" style={{ animationDelay: booting ? '1s' : '0s' }}>
          <span className="cursor-blink text-accent">█</span>
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
      <GutterRail />
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
      <HelpTerminal socials={data.socials} />
      <CursorGlow />
    </>
  );
}
