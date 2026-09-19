import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { PortfolioData } from '../types';
import { useTypewriter } from '../hooks/useTypewriter';
import { Icon } from './Icon';
import { Wrap } from './Wrap';
import { TechTicker } from './TechTicker';

export function Hero({ data }: { data: PortfolioData }) {
  const avatarRef = useRef<HTMLImageElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const emailBtnRef = useRef<HTMLAnchorElement>(null);
  const [loaded, setLoaded] = useState(false);

  // whoami types (~0.6s), then the output choreography: name prints, title +
  // headline fade, buttons pop one by one — total under 1.2s
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

  // aurora blobs trail the scroll at ~12% for gentle depth (transform-only, rAF-throttled)
  useEffect(() => {
    const aurora = auroraRef.current;
    if (!aurora || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        // hero is at the top of the page, so only the first ~1000px matter
        const y = Math.min(window.scrollY, 1000);
        aurora!.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // "magnetic" pull on the primary CTA only: max ±2px, resets on leave
  useEffect(() => {
    const btn = emailBtnRef.current;
    if (!btn || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function onMove(e: MouseEvent) {
      const rect = btn!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      btn!.style.transform = `translate(${px * 4}px, ${py * 4 - 1}px)`;
    }
    function onLeave() {
      btn!.style.transform = '';
    }
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <header
      id="top"
      className={`hero relative flex min-h-[68svh] items-center overflow-hidden pt-16 pb-20 ${loaded ? 'is-loaded' : ''} ${done ? 'is-typed' : ''}`}
    >
      {/* the blobs are anchored to the content column, not the viewport: pinned
          to the viewport corner they drifted ~500px away from the text on wide
          screens and read as an unrelated smear in the corner */}
      <div ref={auroraRef} className="pointer-events-none absolute inset-0 will-change-transform">
        <div className="relative mx-auto h-full w-full max-w-[var(--col-w)]">
          <div className="aurora aurora-a opacity-20 sm:opacity-35" />
          <div className="aurora aurora-b opacity-10 sm:opacity-20" />
        </div>
      </div>
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
          {/* the name "prints" left-to-right once whoami finishes, like command output */}
          <h1 className="hero-print mt-1 text-[clamp(2.2rem,6vw,3.75rem)] leading-tight font-semibold tracking-tight">
            {data.personal.name}
          </h1>
          <p className="hero-fade hero-fade-1 mt-2 text-[1.05rem] font-medium text-accent">
            {data.personal.title}
            {done && <span className="cursor-blink text-accent">█</span>}
          </p>
          <p className="hero-fade hero-fade-2 mt-3 max-w-[42ch] text-ink-soft">{data.personal.headline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              ref={emailBtnRef}
              href={data.socials.email}
              className="btn btn-primary hero-pop"
              style={{ '--d': '0.1s' } as CSSProperties}
            >
              <Icon name="mail" /> Email me
            </a>
            <a
              href={data.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost hero-pop"
              style={{ '--d': '0.18s' } as CSSProperties}
            >
              <Icon name="github" /> GitHub
            </a>
            <a
              href={data.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost hero-pop"
              style={{ '--d': '0.26s' } as CSSProperties}
            >
              <Icon name="linkedin" /> LinkedIn
            </a>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
            {(data.socials.cv_en || data.socials.cv_fr) && (
              <div className="btn btn-ghost hero-pop p-0" style={{ '--d': '0.34s' } as CSSProperties}>
                <span className="flex items-center gap-2 py-2.5 pl-4">
                  <Icon name="file" /> CV
                </span>
                {data.socials.cv_en && (
                  <a
                    href={data.socials.cv_en}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 font-semibold text-accent no-underline transition-colors hover:bg-accent-soft"
                  >
                    EN
                  </a>
                )}
                {data.socials.cv_fr && (
                  <a
                    href={data.socials.cv_fr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-l border-line px-3 py-2.5 font-semibold text-accent no-underline transition-colors hover:bg-accent-soft"
                  >
                    FR
                  </a>
                )}
              </div>
            )}
            <p className="hero-pop flex items-center gap-2 font-mono text-xs text-ink-soft" style={{ '--d': '0.42s' } as CSSProperties}>
              <span className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              open to PFA internships · {data.personal.location}
            </p>
          </div>
          <TechTicker skills={data.technical_skills} />
        </div>

        <div className="hero-avatar relative z-0 max-[560px]:order-[-1] max-[560px]:justify-self-center">
          {/* backlight halo seats the cut-out portrait in the dark scene */}
          <div className="avatar-halo" aria-hidden="true" />
          <img
            ref={avatarRef}
            src="/images/my_face.webp"
            alt={data.personal.name}
            width={640}
            height={766}
            fetchPriority="high"
            className="avatar-photo h-auto w-[350px] will-change-transform max-[700px]:w-[260px] max-[560px]:w-[220px] min-[1280px]:w-[400px] min-[1600px]:w-[440px]"
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
