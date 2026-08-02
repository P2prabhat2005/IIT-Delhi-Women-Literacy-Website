import { motion, useReducedMotion } from 'framer-motion';
import { FADE_UP, fadeUpTransition, viewportOnce } from '../utils/motion.js';

export default function FadeIn({
  as = 'div',
  children,
  className = '',
  delay = 0,
  duration = 0.4,
  y = 18,
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (reduceMotion) {
    const StaticTag = as === 'div' || as === 'section' || as === 'article' || as === 'li' ? as : 'div';
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <Component
      className={className}
      variants={{
        hidden: { ...FADE_UP.hidden, y },
        visible: FADE_UP.visible,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={fadeUpTransition(delay, duration)}
    >
      {children}
    </Component>
  );
}
