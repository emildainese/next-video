import { useEffect, useRef, useState } from 'react';

export const useMesure = (dependency) => {
  const containerRef = useRef(null);
  const [boxSize, setBoxSize] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    setBoxSize(containerRef.current.getBoundingClientRect());
  }, [dependency]);

  return {
    containerRef,
    boxSize,
  };
};
