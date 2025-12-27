import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { themes } from "./store/theme";

// Initialize theme and dark mode synchronously before React renders
// This prevents flash of default theme
if (typeof window !== 'undefined') {
  const root = document.documentElement;
  
  // Initialize dark mode
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
  const theme = storedTheme || 'light';
  root.classList.remove('light', 'dark');
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }

  // Initialize color scheme
  try {
    const storedColorScheme = localStorage.getItem('theme-color-scheme');
    if (storedColorScheme) {
      const parsed = JSON.parse(storedColorScheme);
      const colorScheme = parsed?.state?.colorScheme;
      if (colorScheme) {
        const themeConfig = themes.find((t) => t.id === colorScheme);
        if (themeConfig) {
          root.style.setProperty('--gradient-from', themeConfig.gradient.from);
          root.style.setProperty('--gradient-via', themeConfig.gradient.via || themeConfig.gradient.to);
          root.style.setProperty('--gradient-to', themeConfig.gradient.to);
          root.style.setProperty('--primary', themeConfig.primary);
          root.style.setProperty('--accent', themeConfig.accent);
          root.style.setProperty('--ring', themeConfig.primary);
        }
      }
    } else {
      // Apply default theme if nothing stored
      const defaultTheme = themes.find((t) => t.id === 'royal-gradient');
      if (defaultTheme) {
        root.style.setProperty('--gradient-from', defaultTheme.gradient.from);
        root.style.setProperty('--gradient-via', defaultTheme.gradient.via || defaultTheme.gradient.to);
        root.style.setProperty('--gradient-to', defaultTheme.gradient.to);
        root.style.setProperty('--primary', defaultTheme.primary);
        root.style.setProperty('--accent', defaultTheme.accent);
        root.style.setProperty('--ring', defaultTheme.primary);
      }
    }
  } catch (error) {
    console.warn('Failed to initialize color scheme:', error);
    // Apply default theme on error
    const defaultTheme = themes.find((t) => t.id === 'royal-gradient');
    if (defaultTheme) {
      root.style.setProperty('--gradient-from', defaultTheme.gradient.from);
      root.style.setProperty('--gradient-via', defaultTheme.gradient.via || defaultTheme.gradient.to);
      root.style.setProperty('--gradient-to', defaultTheme.gradient.to);
      root.style.setProperty('--primary', defaultTheme.primary);
      root.style.setProperty('--accent', defaultTheme.accent);
      root.style.setProperty('--ring', defaultTheme.primary);
    }
  }
}

createRoot(document.getElementById("root")!).render(<App />);
