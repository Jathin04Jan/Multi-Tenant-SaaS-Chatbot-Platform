import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useThemeStore, themes } from '@/store/theme';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

const Appearance = () => {
  const { colorScheme, setColorScheme } = useThemeStore();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    // Apply theme to document root with smooth transitions
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, themeId: string) => {
    const card = cardRefs.current[themeId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Available Themes</h2>
        <p className="text-muted-foreground">
          Click on any theme to apply it instantly. Changes are saved automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme, index) => {
          const isActive = colorScheme === theme.id;
          
          return (
            <motion.div
              key={theme.id}
              ref={(el) => (cardRefs.current[theme.id] = el)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setColorScheme(theme.id)}
              onMouseMove={(e) => handleMouseMove(e, theme.id)}
              onMouseEnter={() => setHoveredCard(theme.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={cn(
                'relative glass-card p-6 cursor-pointer transition-all duration-500',
                'hover:scale-[1.02] hover:shadow-2xl',
                'border-2 border-transparent',
                isActive && 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg',
                hoveredCard === theme.id && !isActive && 'border-primary/30 shadow-xl'
              )}
            >
              {/* Active Badge with glow effect */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg z-10"
                  style={{
                    boxShadow: `0 0 20px hsl(${theme.primary} / 0.5), 0 0 40px hsl(${theme.primary} / 0.3)`,
                  }}
                >
                  <Check className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              )}

              {/* Active Label */}
              {isActive && (
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-md">
                    Active
                  </span>
                </div>
              )}

              {/* Theme Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">{theme.name}</h3>
                  <p className="text-sm text-muted-foreground">{theme.description}</p>
                </div>

                {/* Color Swatches */}
                <div className="flex gap-2">
                  {theme.colors.map((color, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 + idx * 0.02 }}
                      className="w-8 h-8 rounded-full border-2 border-border/50"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Gradient Preview - bright and visible */}
                <div className="relative h-12 rounded-lg overflow-hidden border-2 border-border/50 shadow-lg">
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to right, 
                        hsl(${theme.gradient.from}), 
                        ${theme.gradient.via ? `hsl(${theme.gradient.via}), ` : ''}
                        hsl(${theme.gradient.to})
                      )`,
                    }}
                    animate={hoveredCard === theme.id ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/20 to-transparent" />
                </div>
              </div>

              {/* Hover Effect Overlay - brighter and more visible */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none overflow-hidden"
                animate={{ opacity: hoveredCard === theme.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: `radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                    hsl(${theme.primary} / 0.3), transparent 70%)`,
                }}
              />
              
              {/* Shimmer effect on hover - brighter */}
              {hoveredCard === theme.id && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: `linear-gradient(90deg, 
                      transparent, 
                      hsl(${theme.primary} / 0.4), 
                      transparent
                    )`,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Appearance;

