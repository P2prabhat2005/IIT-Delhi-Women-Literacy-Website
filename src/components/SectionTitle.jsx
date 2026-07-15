import { motion } from 'framer-motion';

export default function SectionTitle({
  align = 'left',
  children,
  description,
  eyebrow,
  id,
}) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
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
