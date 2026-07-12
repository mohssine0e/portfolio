import { useState, type FormEvent, type InputHTMLAttributes } from 'react';
import type { PortfolioData } from '../types';
import { Icon, type IconName } from './Icon';
import { TerminalSection } from './TerminalSection';

// Sign up at formspree.io, create a form, and paste its endpoint here to go live.
// Until then the form falls back to opening the visitor's email client pre-filled.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
const FORMSPREE_CONFIGURED = !FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID');

type Status = 'idle' | 'sending' | 'success' | 'error' | 'mailto';

const FIELD_CLASSES =
  'mt-1.5 w-full rounded-md border border-line bg-bg-raised px-3 py-2.5 font-mono text-sm text-ink placeholder:text-ink-mute outline-none transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)]';

function TerminalField({ label, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="font-mono text-sm text-accent">&gt; {label}:</span>
      <input {...props} className={FIELD_CLASSES} />
    </label>
  );
}

function ChannelLink({ href, icon, children }: { href: string; icon: IconName; children: string }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex items-center gap-3 rounded-md px-2 py-1.5 font-mono text-sm break-all text-ink no-underline transition-colors hover:bg-bg-raised hover:text-accent"
    >
      <Icon name={icon} className="h-4 w-4 shrink-0 text-accent" />
      {children}
    </a>
  );
}

export function Contact({ data }: { data: PortfolioData }) {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = new FormData(form);

    // no form backend configured: open the visitor's mail client pre-filled
    // instead of dead-ending them with an error
    if (!FORMSPREE_CONFIGURED) {
      const subject = `Portfolio contact from ${String(fields.get('name'))}`;
      const body = `${String(fields.get('message'))}\n\n— ${String(fields.get('name'))} <${String(fields.get('email'))}>`;
      window.location.href = `${data.socials.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fields,
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <TerminalSection id="contact" label="05 — Contact" title="Let's talk" command="./send_message.sh">
      <p className="mb-8 max-w-[62ch] text-ink-soft">
        Whether you have an interesting project, want to discuss backend architecture, or just want to say hello —
        I&rsquo;m open to internships and technical conversations.
      </p>

      <div className="grid items-stretch gap-5 md:grid-cols-[1.15fr_1fr]">
        <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-bg-tint p-5 sm:p-6">
          <div className="space-y-4">
            <TerminalField label="name" name="name" type="text" placeholder="Ada Lovelace" required />
            <TerminalField label="email" name="email" type="email" placeholder="ada@example.com" required />
            <label className="block">
              <span className="font-mono text-sm text-accent">&gt; message:</span>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Let's build something..."
                className={`resize-y ${FIELD_CLASSES}`}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn btn-primary mt-5 w-full justify-center disabled:opacity-60"
          >
            {status === 'sending' ? (
              <>
                running<span className="cursor-blink">_</span>
              </>
            ) : (
              <>$ ./send_message.sh --to={data.personal.name.split(' ')[0].toLowerCase()}</>
            )}
          </button>

          {/* always-mounted live region so screen readers announce status changes */}
          <p role="status" aria-live="polite" className="mt-3 min-h-[1rem] font-mono text-xs">
            {status === 'success' && <span className="text-accent">✓ message sent — exit code 0</span>}
            {status === 'mailto' && (
              <span className="text-ink-soft">✓ opening your email client — send the draft to finish</span>
            )}
            {status === 'error' && (
              <span className="text-amber-400">
                ✗ sending failed — email me directly at{' '}
                <a href={data.socials.email} className="text-accent hover:underline">
                  {data.personal.email}
                </a>
              </span>
            )}
          </p>
        </form>

        <div className="flex flex-col rounded-lg border border-line bg-bg-tint p-5 sm:p-6">
          <p className="mb-3 font-mono text-xs font-semibold tracking-widest text-ink-mute uppercase">
            <span className="text-accent"># </span>direct channels
          </p>
          <div className="-mx-2 flex flex-col gap-0.5">
            <ChannelLink href={data.socials.email} icon="mail">
              {data.personal.email}
            </ChannelLink>
            <ChannelLink href={data.socials.linkedin} icon="linkedin">
              {data.socials.linkedin.replace('https://', '')}
            </ChannelLink>
            <ChannelLink href={data.socials.github} icon="github">
              {data.socials.github.replace('https://', '')}
            </ChannelLink>
          </div>

          {(data.socials.cv_en || data.socials.cv_fr) && (
            <>
              <p className="mt-6 mb-3 font-mono text-xs font-semibold tracking-widest text-ink-mute uppercase">
                <span className="text-accent"># </span>curriculum vitae
              </p>
              <div className="flex flex-wrap gap-3">
                {data.socials.cv_en && (
                  <a href={data.socials.cv_en} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <Icon name="file" /> CV — English
                  </a>
                )}
                {data.socials.cv_fr && (
                  <a href={data.socials.cv_fr} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <Icon name="file" /> CV — Français
                  </a>
                )}
              </div>
            </>
          )}

          <p className="mt-auto pt-6 font-mono text-xs text-ink-mute">
            <Icon name="map-pin" className="mr-1.5 h-3.5 w-3.5 text-accent" />
            {data.personal.location} · open to PFA internships
          </p>
        </div>
      </div>
    </TerminalSection>
  );
}
