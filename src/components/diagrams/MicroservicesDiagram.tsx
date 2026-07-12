export function MicroservicesDiagram() {
  return (
    <svg
      viewBox="0 0 480 180"
      role="img"
      aria-label="API gateway routing to Student, Course, and Enrollment services, each backed by its own database"
      className="block w-full max-w-[480px]"
    >
      <rect x="190" y="10" width="100" height="34" rx="6" className="fill-accent-soft stroke-accent" />
      <text x="240" y="31" fontSize="13.5" textAnchor="middle" className="fill-ink-soft font-sans">
        API Gateway
      </text>

      <rect x="10" y="110" width="140" height="34" rx="6" className="fill-bg-tint stroke-line" />
      <text x="80" y="131" fontSize="13.5" textAnchor="middle" className="fill-ink-soft font-sans">
        Student Service
      </text>

      <rect x="170" y="110" width="140" height="34" rx="6" className="fill-bg-tint stroke-line" />
      <text x="240" y="131" fontSize="13.5" textAnchor="middle" className="fill-ink-soft font-sans">
        Course Service
      </text>

      <rect x="330" y="110" width="140" height="34" rx="6" className="fill-bg-tint stroke-line" />
      <text x="400" y="131" fontSize="13.5" textAnchor="middle" className="fill-ink-soft font-sans">
        Enrollment Service
      </text>

      <text x="80" y="172" fontSize="12" textAnchor="middle" className="fill-ink-mute font-sans">
        MySQL
      </text>
      <text x="240" y="172" fontSize="12" textAnchor="middle" className="fill-ink-mute font-sans">
        MySQL
      </text>
      <text x="400" y="172" fontSize="12" textAnchor="middle" className="fill-ink-mute font-sans">
        MySQL
      </text>

      <path d="M220 44 L80 110" className="fill-none stroke-ink-mute" strokeWidth={1} />
      <path d="M240 44 L240 110" className="fill-none stroke-ink-mute" strokeWidth={1} />
      <path d="M260 44 L400 110" className="fill-none stroke-ink-mute" strokeWidth={1} />
    </svg>
  );
}
