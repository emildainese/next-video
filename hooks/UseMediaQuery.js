import { useState, useEffect } from 'react';
import { useInBrowser } from './UseInBrowser';

export const useMediaQuery = (query) => {
  const inBrowser = useInBrowser();
  const media = inBrowser && window.matchMedia(`(${query})`);
  const [matches, setMatches] = useState(media.matches);
  useEffect(() => {
    if (!inBrowser) return;
    const handler = (e) => setMatches(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  return matches;
};
