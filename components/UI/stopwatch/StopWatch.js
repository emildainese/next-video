import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { ONE_SEC_MS } from '@/constants/time';

const StopWatch = ({ start }) => {
  const { theme } = useTheme();

  //Time elements refs
  const secRef = useRef(null);
  const minRef = useRef(null);
  const houreRef = useRef(null);

  //Time refs
  const sec = useRef(0);
  const min = useRef(0);
  const hour = useRef(0);

  // const setSec = () => {
  //   sec.current++;
  //   if (sec.current < 10) {
  //     secRef.current.textContent = '0' + sec.current;
  //   } else {
  //     secRef.current.textContent = sec.current;
  //   }
  // };

  // const setMin = () => {
  //   sec.current = 0;
  //   secRef.current.textContent = '0' + sec.current;
  //   min.current++;
  //   if (min.current < 10) {
  //     minRef.current.textContent = '0' + min.current;
  //   } else {
  //     minRef.current.textContent = min.current;
  //   }
  // };

  // const setHoure = () => {
  //   min.current = 0;
  //   minRef.current.textContent = '0' + min.current;
  //   hour.current++;
  //   if (hour.current < 10) {
  //     houreRef.current.textContent = '0' + hour.current;
  //   } else {
  //     houreRef.current.textContent = hour.current;
  //   }
  // };

  // const reset = () => {
  //   sec.current = 0;
  //   min.current = 0;
  //   hour.current = 0;
  //   if (secRef && secRef.current) {
  //     secRef.current.textContent = '00';
  //     minRef.current.textContent = '00';
  //     houreRef.current.textContent = '00';
  //   }
  // };

  useEffect(() => {
    let timer = null;
    if (start) {
      timer = setInterval(() => {
        if (sec.current < 60) {
          // setSec();
          setSec(sec, secRef);
        } else if (sec.current >= 60) {
          // setMin();
          setMin(sec, min, minRef, secRef);
        } else if (min.current >= 60) {
          // setHoure();
          setHoure(min, hour, minRef, houreRef);
        }
      }, ONE_SEC_MS);
    } else if (!start) {
      if (timer) {
        // reset();
        reset(sec, min, hour, secRef, minRef, houreRef);
        clearInterval(timer);
      }
    }
    return () => {
      if (timer) {
        // reset();
        reset(sec, min, hour, secRef, minRef, houreRef);
        clearInterval(timer);
      }
    };
  }, [start]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          gridColumn: '1 / 3',
          gridRow: '1 / 2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          border: `1px solid rgb(124, 124, 123)`,
          color: theme.primary,
        }}
      >
        <div ref={houreRef}>00</div>:<div ref={minRef}>00</div>:
        <div ref={secRef}>00</div>
      </div>
    </div>
  );
};

export default StopWatch;

const setSec = (sec, secRef) => {
  sec.current++;
  if (sec.current < 10) {
    secRef.current.textContent = '0' + sec.current;
  } else {
    secRef.current.textContent = sec.current;
  }
};

const setMin = (sec, min, minRef, secRef) => {
  sec.current = 0;
  secRef.current.textContent = '0' + sec.current;
  min.current++;
  if (min.current < 10) {
    minRef.current.textContent = '0' + min.current;
  } else {
    minRef.current.textContent = min.current;
  }
};

const setHoure = (min, hour, minRef, houreRef) => {
  min.current = 0;
  minRef.current.textContent = '0' + min.current;
  hour.current++;
  if (hour.current < 10) {
    houreRef.current.textContent = '0' + hour.current;
  } else {
    houreRef.current.textContent = hour.current;
  }
};

const reset = (sec, min, hour, secRef, minRef, houreRef) => {
  sec.current = 0;
  min.current = 0;
  hour.current = 0;
  if (secRef && secRef.current) {
    secRef.current.textContent = '00';
    minRef.current.textContent = '00';
    houreRef.current.textContent = '00';
  }
};
