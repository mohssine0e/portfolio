import { useEffect, useState } from 'react';
import type { PortfolioData } from '../types';

type DataState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; data: PortfolioData };

/** Fetches the single source of truth at runtime so content edits never require a rebuild. */
export function usePortfolioData(): DataState {
  const [state, setState] = useState<DataState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    fetch('/data/data.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load data.json (${res.status})`);
        return res.json() as Promise<PortfolioData>;
      })
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ status: 'error', error: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
