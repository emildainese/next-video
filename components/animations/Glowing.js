import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const setColors = (variant) => {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: ['#0d6efd', '#3d8bfd', '#0d6efd'],
        boxShadow: ['0 0 5px #0d6efd', '0 0 20px #3d8bfd', '0 0 5px #0d6efd'],
      };
    case 'warning':
      return {
        backgroundColor: ['#ffc107', '#ffcd39', '#ffc107'],
        boxShadow: ['0 0 5px #ffc107', '0 0 20px #ffcd39', '0 0 5px #ffc107'],
      };
    case 'danger':
      return {
        backgroundColor: ['#dc3545', '#e35d6a', '#dc3545'],
        boxShadow: ['0 0 5px #dc3545', '0 0 20px #e35d6a', '0 0 5px #dc3545'],
      };
    case 'success':
      return {
        backgroundColor: ['#198754', '#479f76', '#198754'],
        boxShadow: ['0 0 5px #198754', '0 0 20px #479f76', '0 0 5px #198754'],
      };
    case 'teal':
      return {
        backgroundColor: ['#20c997', '#4dd4ac', '#20c997'],
        boxShadow: ['0 0 5px #20c997', '0 0 20px #4dd4ac', '0 0 5px #20c997'],
      };
    default:
      return {
        backgroundColor: ['#0d6efd', '#3d8bfd', '#0d6efd'],
        boxShadow: ['0 0 5px #0d6efd', '0 0 20px #3d8bfd', '0 0 5px #0d6efd'],
      };
  }
};

const transition = {
  duration: 1,
  repeat: Infinity,
  repeatType: 'reverse',
};

const Glowing = ({ children, variant, className, statusTextRef }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`${className ? className : ''} text-${
        theme.type === 'dark' ? 'light' : 'dark'
      }`}
      animate={{ ...setColors(variant) }}
      transition={transition}
      ref={statusTextRef}
    >
      {children}
    </motion.div>
  );
};

Glowing.defaultProps = {
  variant: 'primary',
};

export default Glowing;
