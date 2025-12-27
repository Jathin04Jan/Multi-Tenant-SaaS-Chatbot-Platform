import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

// Initialize theme synchronously before React renders to prevent flash
const initializeTheme = () => {
  if (typeof window === 'undefined') return 'light';
  
  const stored = localStorage.getItem('theme') as Theme | null;
  const theme = stored || 'light';
  
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    root.classList.add(systemTheme);
    return systemTheme;
  }

  root.classList.add(theme);
  return theme;
};

// Initialize immediately
let initialTheme: Theme = 'light';
if (typeof window !== 'undefined') {
  initialTheme = initializeTheme() as Theme;
}

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  return { theme, setTheme };
};
