import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

// Safari compatibility wrapper for motion components
// Safari can have issues with certain animation combinations, especially with backdrop-filter
interface SafariMotionProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

export const SafariMotion = ({ children, ...props }: SafariMotionProps) => {
  // Detect Safari
  const isSafari = typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  // For Safari, use simpler animations and force hardware acceleration
  if (isSafari) {
    const safariProps = {
      ...props,
      // Simplify animations for Safari compatibility
      initial: props.initial ? { opacity: 0 } : undefined,
      animate: props.animate ? { opacity: 1 } : props.animate,
      transition: props.transition ? { duration: 0.2 } : undefined,
      style: { 
        ...props.style, 
        transform: 'translateZ(0)',
        willChange: 'transform, opacity'
      },
    };
    
    return <motion.div {...safariProps}>{children}</motion.div>;
  }
  
  // For other browsers, use normal motion component
  return <motion.div {...props}>{children}</motion.div>;
};

