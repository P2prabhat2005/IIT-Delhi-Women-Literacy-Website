import { motion, useReducedMotion } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';
import { activities } from '../data/homepage.js';
import { fadeUpTransition, staggerDelay, viewportOnce } from '../utils/motion.js';

export default function ActivitiesPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="activities-preview-title" className="section bg-slate-950 text-white">
      <div className="site-container">
        <SectionTitle
          eyebrow="Activities"
          id="activities-preview-title"
          description="Programmes are structured for learning, practice, observation, and evidence generation."
        >
          Field activity designed with academic rigor.
        </SectionTitle>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {activities.map(({ description, Icon, title }, index) => (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={reduceMotion ? { duration: 0 } : fadeUpTransition(staggerDelay(index), 0.4)}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition duration-300 ease-out hover:bg-white/[0.1] motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-700 text-white transition duration-300 motion-safe:group-hover:scale-105">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
