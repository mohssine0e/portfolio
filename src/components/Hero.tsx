import { useEffect, useRef, useState } from 'react';
import type { PortfolioData } from '../types';
import { useTypewriter } from '../hooks/useTypewriter';
import { Icon } from './Icon';
import { Wrap } from './Wrap';
import { TechTicker } from './TechTicker';

export function Hero({ data }: { data: PortfolioData }) {
  const avatarRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // only the command types; name, title and CTAs show immediately so the
  // first-visit call to action never hides behind an animation
  const { typed, done } = useTypewriter('whoami', 70);

  useEffect(() => setLoaded(true), []);

  // subtle 3D tilt on the hero photo
  useEffect(() => {
    const avatar = avatarRef.current;
    if (!avatar || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function onMove(e: MouseEvent) {
      const rect = avatar!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      avatar!.style.transform = `perspective(400px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
    }
    function onLeave() {
      avatar!.style.transform = '';
    }
    avatar.addEventListener('mousemove', onMove);
    avatar.addEventListener('mouseleave', onLeave);
    return () => {
      avatar.removeEventListener('mousemove', onMove);
      avatar.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <header
      id="top"
      className={`hero relative flex min-h-[68svh] items-center overflow-hidden pt-16 pb-20 ${loaded ? 'is-loaded' : ''}`}
    >
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <Wrap className="relative z-[1] grid w-full grid-cols-[1fr_auto] items-center gap-10 max-[560px]:grid-cols-1 max-[560px]:text-left">
        {/* min-w-0 lets the ticker's w-max marquee overflow-hide instead of
            blowing the 1fr column out to ~5000px and pushing the avatar off-screen */}
        <div className="min-w-0">
          <p className="terminal-line">
            <span className="text-accent">guest@portfolio:~$</span>{' '}
            <span aria-hidden="true">
              {typed}
              {!done && <span className="cursor-blink text-accent">█</span>}
            </span>
          </p>
          <h1 className="hero-fade hero-fade-1 text-[clamp(2rem,5vw,2.75rem)] font-medium tracking-tight">
            {data.personal.name}
          </h1>
          <p className="hero-fade hero-fade-1 mt-2 text-[1.05rem] font-medium text-accent">
            {data.personal.title}
            <span className="cursor-blink text-accent">█</span>
          </p>
          <p className="hero-fade hero-fade-2 mt-3 max-w-[42ch] text-ink-soft">{data.personal.headline}</p>
          <div className="hero-fade hero-fade-3 mt-6 flex flex-wrap gap-3">
            <a href={data.socials.email} className="btn btn-primary">
              <Icon name="mail" /> Email me
            </a>
            <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Icon name="github" /> GitHub
            </a>
            <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Icon name="linkedin" /> LinkedIn
            </a>
            {data.socials.cv_en && (
              <a href={data.socials.cv_en} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Icon name="file" /> CV <span className="text-accent">EN</span>
              </a>
            )}
            {data.socials.cv_fr && (
              <a href={data.socials.cv_fr} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Icon name="file" /> CV <span className="text-accent">FR</span>
              </a>
            )}
          </div>
          <TechTicker skills={data.technical_skills} />
        </div>

        <div className="hero-avatar max-[560px]:order-[-1] max-[560px]:justify-self-center">
          <img
            ref={avatarRef}
            src="/images/my_face.webp"
            alt={data.personal.name}
            width={640}
            height={766}
            fetchPriority="high"
            className="avatar-photo h-auto w-[300px] will-change-transform max-[700px]:w-[235px] max-[560px]:w-[190px]"
          />
        </div>
      </Wrap>

      {/* scroll cue keeps the hero's breathing room from reading as dead space */}
      <a
        href="#about"
        className="hero-fade hero-fade-3 absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-ink-mute no-underline transition-colors hover:text-accent max-[560px]:hidden"
      >
        $ cd ./about <span className="inline-block animate-[bounce-slow_2s_ease-in-out_infinite]">↓</span>
      </a>
    </header>
  );
}
