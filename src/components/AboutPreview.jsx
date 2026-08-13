import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aboutProjectContent } from '../data/homepage.js';
import { fadeUpTransition, staggerDelay, viewportOnce } from '../utils/motion.js';
import SectionTitle from './SectionTitle.jsx';

export default function AboutPreview() {
  const reduceMotion = useReducedMotion();
  const { aboutIntro, section } = aboutProjectContent;

  return (
    <section id="about" aria-labelledby="about-preview-title" className="section scroll-mt-24 bg-white">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionTitle
            eyebrow="About"
            id="about-preview-title"
            description={section.description}
          >
            About Project Bharti
          </SectionTitle>
          <Link className="link-pill" to="/about">
            Explore Project Bharti
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {aboutIntro.focusAreas.map(({ Icon, description, title }, index) => (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={reduceMotion ? { duration: 0 } : fadeUpTransition(staggerDelay(index), 0.4)}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60"
            >
              <div className="mb-3 inline-flex items-center rounded-full border border-red-100 bg-red-50 px-3 py-1 text-red-900">
                <Icon size={15} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
