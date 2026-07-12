import type { ReactNode } from 'react';

export function Wrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`wrap ${className}`}>{children}</div>;
}
