import type { Socials } from '../types';
import { Icon, type IconName } from './Icon';
import { Wrap } from './Wrap';

function FooterLink({ href, icon, label }: { href: string; icon: IconName; label: string }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={label}
      title={label}
      className="text-ink-mute transition-colors hover:text-accent"
    >
      <Icon name={icon} className="h-4.5 w-4.5" />
    </a>
  );
}

export function Footer({ name, socials }: { name: string; socials: Socials }) {
  return (
    <footer className="border-t border-line py-10 text-center">
      <Wrap>
        <div className="mb-4 flex items-center justify-center gap-5">
          <FooterLink href={socials.github} icon="github" label="GitHub" />
          <FooterLink href={socials.linkedin} icon="linkedin" label="LinkedIn" />
          <FooterLink href={socials.email} icon="mail" label="Email" />
        </div>
        <p className="font-mono text-xs text-ink-mute">
          &copy; {new Date().getFullYear()} {name}. Built with React, Vite &amp; Tailwind.
        </p>
        <p className="mt-1.5 font-mono text-xs text-ink-mute">
          <span className="text-accent">$</span> exit 0
        </p>
      </Wrap>
    </footer>
  );
}
