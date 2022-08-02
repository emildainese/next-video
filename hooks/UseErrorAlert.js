import { useEffect, useState } from 'react';

export const useErrorAlert = (time) => {
  const [error, setError] = useState(null);

  const clearError = () => {
    const timer = setTimeout(() => {
      setError(null);
    }, time);
    return timer;
  };

  useEffect(() => {
    let timer = null;
    if (error) timer = clearError();
    return () => clearTimeout(timer);
  }, [error]);

  return [error, setError];
};
