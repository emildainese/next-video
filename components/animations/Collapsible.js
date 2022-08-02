import { motion } from 'framer-motion';

const Collapsible = ({ width, height, duration, id, children }) => {
  return (
    <motion.div
      key={id ? id : ''}
      animate={{ width, height }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
};

export default Collapsible;
