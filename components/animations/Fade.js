import React from 'react';
import { motion } from 'framer-motion';
import { fadeInOut } from './variants';

const Fade = ({ children, duration, delay, id }) => {
  return (
    <motion.div
      key={id ? id : ''}
      initial="initial"
      exit="exit"
      animate="animate"
      variants={fadeInOut}
      transition={
        duration || delay ? { duration, delay } : fadeInOut.transition
      }
    >
      {children}
    </motion.div>
  );
};

Fade.defaultProps = {
  duration: 0.3,
  delay: 0,
};

export default Fade;
