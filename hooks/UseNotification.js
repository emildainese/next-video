import { useState, useEffect } from 'react';

export const useNotification = (dependency, time) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer = null;
    if (dependency) {
      setShow(true);
      timer = setTimeout(() => {
        setShow(false);
      }, time);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [dependency]);

  return show;
};
