export function PaaSArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 480 160"
      role="img"
      aria-label="MicroPaaS Pipeline: Git Push to RabbitMQ Queue to Virtual Thread Build Engine to Isolated Docker Containers and SSE Log Stream"
      className="block w-full max-w-[480px]"
    >
      {/* Git Source */}
      <rect x="10" y="20" width="90" height="36" rx="6" className="fill-bg-tint stroke-line" />
      <text x="55" y="42" fontSize="12" textAnchor="middle" className="fill-ink-soft font-mono">
        Git Webhook
      </text>

      {/* RabbitMQ */}
      <rect x="140" y="20" width="105" height="36" rx="6" className="fill-accent-soft stroke-accent" />
      <text x="192" y="42" fontSize="12" textAnchor="middle" className="fill-ink font-mono font-medium">
        RabbitMQ
      </text>

      {/* Java 21 Build Engine */}
      <rect x="285" y="20" width="185" height="36" rx="6" className="fill-accent-soft stroke-accent" />
      <text x="377" y="42" fontSize="11.5" textAnchor="middle" className="fill-ink font-mono font-medium">
        Java 21 Virtual Threads
      </text>

      {/* Arrow from Git to RabbitMQ */}
      <path d="M100 38 L140 38" className="fill-none stroke-ink-mute" strokeWidth={1.5} markerEnd="url(#arrow)" />

      {/* Arrow from RabbitMQ to Engine */}
      <path d="M245 38 L285 38" className="fill-none stroke-ink-mute" strokeWidth={1.5} markerEnd="url(#arrow)" />

      {/* Bottom Row: Docker Container Engine + SSE Logs */}
      <rect x="100" y="100" width="160" height="36" rx="6" className="fill-bg-tint stroke-line" />
      <text x="180" y="122" fontSize="11.5" textAnchor="middle" className="fill-ink-soft font-mono">
        Docker Engine API
      </text>

      <rect x="300" y="100" width="165" height="36" rx="6" className="fill-bg-tint stroke-line" />
      <text x="382" y="122" fontSize="11.5" textAnchor="middle" className="fill-ink-soft font-mono">
        SSE Real-Time Logs
      </text>

      {/* Downward links from Build Engine */}
      <path d="M335 56 L200 100" className="fill-none stroke-ink-mute" strokeWidth={1.5} />
      <path d="M415 56 L385 100" className="fill-none stroke-ink-mute" strokeWidth={1.5} />

      <text x="180" y="152" fontSize="10" textAnchor="middle" className="fill-ink-mute font-mono">
        Isolated Containers
      </text>
      <text x="382" y="152" fontSize="10" textAnchor="middle" className="fill-ink-mute font-mono">
        Replay Buffer (RAM)
      </text>
    </svg>
  );
}

