import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const Separator = () => {
  const { theme } = useTheme();
  return <hr style={{ border: `1px solid ${theme.primary}` }} />;
};

export default Separator;
