import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle.jsx';
import { contactChannels, contactCtaContent } from '../data/homepage.js';
import { fadeUpTransition, staggerDelay, viewportOnce } from '../utils/motion.js';

export default function ContactCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="get-involved" aria-labelledby="contact-cta-title" className="section scroll-mt-24 bg-white">
      <div className="site-container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={reduceMotion ? { duration: 0 } : fadeUpTransition(0, 0.45)}
          className="rounded-[2rem] bg-red-900 p-8 text-white shadow-2xl shadow-red-950/20 md:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionTitle
              eyebrow={contactCtaContent.eyebrow}
              id="contact-cta-title"
              description={contactCtaContent.description}
            >
              {contactCtaContent.title}
            </SectionTitle>
            <div className="grid w-full gap-3 sm:grid-cols-2">
              {contactChannels.map((channel, index) => (
                <motion.div
                  key={channel}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={reduceMotion ? { duration: 0 } : fadeUpTransition(staggerDelay(index, 0.04), 0.35)}
                >
                  <Link
                    to={contactCtaContent.buttonTo}
                    aria-label={`Contact Project Bharti about ${channel}`}
                    className="block cursor-pointer rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium transition duration-300 ease-out hover:bg-white/15 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02]"
                  >
                    {channel}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
