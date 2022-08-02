export const fadeInOut = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.3,
  },
};

//-----------------------------------------------------
export const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    duration: 0.3,
  },
};

//-----------------------------------------------------
export const pulse = {
  initial: {
    scale: 0.75,
  },
  animate: {
    scale: [0.75, 1, 0.75, 1, 0.75, 0.75],
  },
  transition: {
    duration: 1,
    times: [0, 0.2, 0, 4, 0.6, 0.8, 1],
    repeat: Infinity,
  },
};
