import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from './variants';

const FadeIn = ({ children, duration, id }) => {
  return (
    <motion.div
      key={id ? id : ''}
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={duration ? { duration } : fadeIn.transition}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
