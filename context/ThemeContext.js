import { useState, useContext, createContext } from 'react';

const themes = {
  light: {
    type: 'light',
    fontColor: '#2b2c38',
    background: '#f4f7f9',
    primary: '#8a2be2',
  },
  dark: {
    type: 'dark',
    fontColor: '#dcdcdc',
    background: '#181818',
    primary: '#8a2be2',
  },
};

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark);

  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
  };

  const themeAPI = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeAPI}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
