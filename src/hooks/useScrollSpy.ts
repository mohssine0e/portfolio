import { useEffect, useState } from 'react';

/** Tracks which section id is currently in the "reading zone" of the viewport. */
export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = ids.join(',');

  useEffect(() => {
    const idList = idsKey ? idsKey.split(',') : [];
    const targets = idList
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
