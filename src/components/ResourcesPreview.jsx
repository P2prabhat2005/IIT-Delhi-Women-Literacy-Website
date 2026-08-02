import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle.jsx';
import { resources } from '../data/homepage.js';
import { fadeUpTransition, staggerDelay, viewportOnce } from '../utils/motion.js';

export default function ResourcesPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="resources-preview-title" className="section bg-white">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionTitle
            eyebrow="Resources"
            id="resources-preview-title"
            description="Training assets, research briefs, and implementation materials for educators, partners, and field facilitators."
          >
            A knowledge base for partners and practitioners.
          </SectionTitle>
          <Link className="link-pill" to="/resources">
            View Resources
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {resources.map(({ description, Icon, title }, index) => (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={reduceMotion ? { duration: 0 } : fadeUpTransition(staggerDelay(index), 0.4)}
              className="resource-card"
            >
              <Icon className="text-red-800 transition duration-300" size={28} aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
