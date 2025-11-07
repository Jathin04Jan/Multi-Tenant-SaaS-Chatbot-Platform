import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ColorScheme = 
  | 'purple-gradient'
  | 'ocean-gradient'
  | 'sunset-gradient'
  | 'forest-gradient'
  | 'royal-gradient'
  | 'arctic-gradient';

export interface ThemeConfig {
  id: ColorScheme;
  name: string;
  description: string;
  colors: string[];
  gradient: {
    from: string;
    via?: string;
    to: string;
  };
  primary: string;
  accent: string;
}

export const themes: ThemeConfig[] = [
  {
    id: 'purple-gradient',
    name: 'Purple Gradient',
    description: 'Sophisticated purple-blue gradient theme',
    colors: ['#a855f7', '#ffffff', '#3b82f6', '#10b981'],
    gradient: {
      from: '270 85% 65% / 0.4',
      via: '240 90% 75% / 0.3',
      to: '200 95% 60% / 0.2',
    },
    primary: '270 85% 65%',
    accent: '240 90% 75%',
  },
  {
    id: 'ocean-gradient',
    name: 'Ocean Gradient',
    description: 'Deep blue to teal ocean-inspired theme',
    colors: ['#3b82f6', '#ffffff', '#14b8a6', '#10b981'],
    gradient: {
      from: '210 95% 60% / 0.4',
      via: '180 85% 55% / 0.3',
      to: '160 90% 50% / 0.2',
    },
    primary: '210 95% 60%',
    accent: '180 85% 55%',
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset Gradient',
    description: 'Warm orange to pink sunset theme',
    colors: ['#f97316', '#ffffff', '#fb7185', '#10b981'],
    gradient: {
      from: '20 95% 60% / 0.4',
      via: '350 90% 70% / 0.3',
      to: '340 85% 75% / 0.2',
    },
    primary: '20 95% 60%',
    accent: '350 90% 70%',
  },
  {
    id: 'forest-gradient',
    name: 'Forest Gradient',
    description: 'Rich green to emerald forest theme',
    colors: ['#059669', '#ffffff', '#10b981', '#10b981'],
    gradient: {
      from: '150 90% 45% / 0.4',
      via: '160 85% 50% / 0.3',
      to: '170 80% 55% / 0.2',
    },
    primary: '150 90% 45%',
    accent: '160 85% 50%',
  },
  {
    id: 'royal-gradient',
    name: 'Royal Gradient',
    description: 'Deep purple to gold royal theme',
    colors: ['#a855f7', '#ffffff', '#eab308', '#10b981'],
    gradient: {
      from: '270 85% 60% / 0.4',
      via: '280 80% 65% / 0.3',
      to: '45 95% 60% / 0.2',
    },
    primary: '270 85% 60%',
    accent: '45 95% 60%',
  },
  {
    id: 'arctic-gradient',
    name: 'Arctic Gradient',
    description: 'Cool blue to white arctic theme',
    colors: ['#60a5fa', '#ffffff', '#67e8f9', '#10b981'],
    gradient: {
      from: '210 90% 75% / 0.4',
      via: '190 85% 85% / 0.3',
      to: '0 0% 100% / 0.2',
    },
    primary: '210 90% 75%',
    accent: '190 85% 85%',
  },
];

interface ThemeState {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorScheme: 'royal-gradient',
      setColorScheme: (scheme) => set({ colorScheme: scheme }),
    }),
    {
      name: 'theme-color-scheme',
    }
  )
);

