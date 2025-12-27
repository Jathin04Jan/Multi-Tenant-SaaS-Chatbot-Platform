import { useEffect } from 'react';
import { useThemeStore, themes } from '@/store/theme';

// Initialize color scheme synchronously before React renders
const initializeColorScheme = () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Get persisted color scheme from localStorage (Zustand persist format)
    const stored = localStorage.getItem('theme-color-scheme');
    if (stored) {
      const parsed = JSON.parse(stored);
      const colorScheme = parsed?.state?.colorScheme || 'royal-gradient';
      const theme = themes.find((t) => t.id === colorScheme);
      
      if (theme) {
        const root = document.documentElement;
        root.style.setProperty('--gradient-from', theme.gradient.from);
        root.style.setProperty('--gradient-via', theme.gradient.via || theme.gradient.to);
        root.style.setProperty('--gradient-to', theme.gradient.to);
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--accent', theme.accent);
        root.style.setProperty('--ring', theme.primary);
      }
    }
  } catch (error) {
    // If parsing fails, use default
    console.warn('Failed to parse stored theme:', error);
  }
};

// Initialize immediately if in browser
if (typeof window !== 'undefined') {
  initializeColorScheme();
}

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

