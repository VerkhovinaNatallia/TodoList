
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);//используем контекст
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
