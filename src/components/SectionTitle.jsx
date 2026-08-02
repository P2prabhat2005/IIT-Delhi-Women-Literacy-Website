import { motion, useReducedMotion } from 'framer-motion';
import { fadeUpTransition, viewportOnce } from '../utils/motion.js';

export default function SectionTitle({
  align = 'left',
  children,
  description,
  eyebrow,
  id,
}) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={`max-w-3xl ${alignment}`}>
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
        <h2 id={id} className="section-heading">
          {children}
        </h2>
        {description ? <p className="section-description">{description}</p> : null}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={fadeUpTransition(0, 0.4)}
      className={`max-w-3xl ${alignment}`}
    >
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="section-heading">
        {children}
      </h2>
      {description ? <p className="section-description">{description}</p> : null}
    </motion.div>
  );
}
