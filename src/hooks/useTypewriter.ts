import { useEffect, useState } from 'react';

/**
 * Types `text` one character at a time once `enabled` becomes true.
 * Purely decorative: respects prefers-reduced-motion by rendering instantly.
 */
export function useTypewriter(text: string, speed = 26, enabled = true) {
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setChars(text.length);
      setDone(true);
      return;
    }

    let i = 0;
    let doneTimeout: ReturnType<typeof setTimeout> | undefined;
    const typeInterval = setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= text.length) {
        clearInterval(typeInterval);
        doneTimeout = setTimeout(() => setDone(true), 220);
      }
    }, speed);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(doneTimeout);
      setChars(0);
      setDone(false);
    };
  }, [text, speed, enabled]);

  return { typed: text.slice(0, chars), done };
}
