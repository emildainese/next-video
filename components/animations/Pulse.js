import React from 'react';
import { motion } from 'framer-motion';
import { pulse } from './variants';

const Pulse = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pulse}
      transition={pulse.transition}
    >
      {children}
    </motion.div>
  );
};

export default Pulse;
