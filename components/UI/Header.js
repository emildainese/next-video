import { useTheme } from '@/context/ThemeContext';
import React from 'react';

// #6a3093
const Header = ({ text, icon }) => {
  const { theme } = useTheme();
  return (
    <h2
      className={`text-center lead display-5 p-2 ${
        theme.type === 'light' && 'text-white'
      }`}
      style={{
        background: `linear-gradient(to right, ${theme.primary}, #a044ff)`,
      }}
    >
      {icon && <i className={`fas ${icon} me-2 text-white`}></i>}
      {text}
    </h2>
  );
};

export default Header;
