import React, { useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import type {Theme} from '../ThemeContext/ThemeContext'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');//загружает тему при 1 рендере
    if (saved === 'dark') setTheme('dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);  // установили дата отрибут 
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
