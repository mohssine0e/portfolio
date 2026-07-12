export function RolesDiagram() {
  return (
    <svg
      viewBox="0 0 480 130"
      role="img"
      aria-label="Role hierarchy: Admin above Department Head, Coordinator, and Professor"
      className="block w-full max-w-[480px]"
    >
      <rect x="190" y="10" width="100" height="34" rx="6" className="fill-accent-soft stroke-accent" />
      <text x="240" y="31" fontSize="13.5" textAnchor="middle" className="fill-ink-soft font-sans">
        Admin
      </text>

      <rect x="10" y="86" width="110" height="34" rx="6" className="fill-bg-tint stroke-line" />
      <text x="65" y="107" fontSize="13.5" textAnchor="middle" className="fill-ink-soft font-sans">
        Dept. Head
      </text>

      <rect x="185" y="86" width="110" height="34" rx="6" className="fill-bg-tint stroke-line" />
      <text x="240" y="107" fontSize="13.5" textAnchor="middle" className="fill-ink-soft font-sans">
        Coordinator
      </text>

      <rect x="360" y="86" width="110" height="34" rx="6" className="fill-bg-tint stroke-line" />
      <text x="415" y="107" fontSize="13.5" textAnchor="middle" className="fill-ink-soft font-sans">
        Professor
      </text>

      <path d="M220 44 L65 86" className="fill-none stroke-ink-mute" strokeWidth={1} />
      <path d="M240 44 L240 86" className="fill-none stroke-ink-mute" strokeWidth={1} />
      <path d="M260 44 L415 86" className="fill-none stroke-ink-mute" strokeWidth={1} />
    </svg>
  );
}
