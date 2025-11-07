import { useEffect } from 'react';
import { useThemeStore, themes } from '@/store/theme';

export const ThemeInitializer = () => {
  const { colorScheme } = useThemeStore();

  useEffect(() => {
    // Apply theme to document root on mount and when theme changes
    const root = document.documentElement;
    const theme = themes.find((t) => t.id === colorScheme);
    
    if (theme) {
      root.style.setProperty('--gradient-from', theme.gradient.from);
      root.style.setProperty('--gradient-via', theme.gradient.via || theme.gradient.to);
      root.style.setProperty('--gradient-to', theme.gradient.to);
      root.style.setProperty('--primary', theme.primary);
      root.style.setProperty('--accent', theme.accent);
      root.style.setProperty('--ring', theme.primary);
    }
  }, [colorScheme]);

  return null;
};

