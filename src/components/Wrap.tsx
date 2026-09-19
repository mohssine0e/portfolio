import type { ReactNode } from 'react';

/**
 * `default` is the structural width used by most sections; `prose` is the
 * narrower measure for running text, which stays readable instead of stretching
 * to the full column on wide screens.
 */
export function Wrap({
  children,
  className = '',
  width = 'default',
}: {
  children: ReactNode;
  className?: string;
  width?: 'default' | 'prose';
}) {
  return <div className={`${width === 'prose' ? 'wrap-prose' : 'wrap'} ${className}`}>{children}</div>;
}
