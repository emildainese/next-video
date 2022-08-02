import { useState, useEffect } from 'react';

export const useInBrowser = () => {
  const [inBrowser, setInBrowser] = useState(false);

  useEffect(() => {
    if (window && typeof window !== undefined) {
      setInBrowser(true);
    }
  }, []);

  return inBrowser;
};
