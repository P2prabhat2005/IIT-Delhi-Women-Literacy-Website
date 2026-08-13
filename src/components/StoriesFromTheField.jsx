import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  getFeaturedCaseStudy,
  getHomepageSupportingCaseStudies,
  storiesFromTheFieldSection,
} from '../data/caseStudies.js';
import { getCaseStudyImageSize } from '../data/caseStudyImageSizes.js';
import { fadeUpTransition, staggerDelay, viewportOnce } from '../utils/motion.js';
import SectionTitle from './SectionTitle.jsx';

function StoryPortrait({ study, className = '' }) {
  if (study.image?.src) {
    const size = getCaseStudyImageSize(study.image.src);

    return (
      <img
        src={study.image.src}
        alt={study.image.alt}
        width={size?.width}
        height={size?.height}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const initials = study.name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-white to-red-50 px-6 text-center ${className}`}
      role="img"
      aria-label={`Portrait photograph not available in the source case study for ${study.name}`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-red-100 bg-white text-lg font-semibold text-red-900 shadow-sm">
        {initials}
      </span>
      <p className="mt-4 text-sm font-semibold text-slate-800">{study.name}</p>
      <p className="mt-1 max-w-[14rem] text-xs leading-5 text-slate-500">
        Portrait photograph not included in the source case-study PDF.
      </p>
    </div>
  );
}

function StoryCard({ study, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={reduceMotion ? { duration: 0 } : fadeUpTransition(staggerDelay(index), 0.4)}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <StoryPortrait study={study} className="transition duration-500 motion-safe:group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-800">{study.name}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-950">{study.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{study.teaser}</p>
        <div className="mt-4 space-y-2 text-xs font-medium text-slate-500">
          <p className="inline-flex items-start gap-1.5">
            <MapPin size={13} className="mt-0.5 shrink-0 text-red-800" aria-hidden="true" />
            <span>{study.location.display}</span>
          </p>
          <p>{study.enterprise}</p>
        </div>
        <div className="mt-5">
          <Link
            to={`/stories/${study.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-900 transition hover:text-red-800"
          >
            Read Story
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function StoriesFromTheField() {
  const reduceMotion = useReducedMotion();
  const featured = getFeaturedCaseStudy();
  const supporting = getHomepageSupportingCaseStudies();

  return (
    <section id="stories-from-the-field" aria-labelledby="stories-from-the-field-title" className="section scroll-mt-24 bg-[#f7f4ef]">
      <div className="site-container">
        <SectionTitle
          align="center"
          eyebrow={storiesFromTheFieldSection.eyebrow}
          id="stories-from-the-field-title"
          description={storiesFromTheFieldSection.description}
        >
          {storiesFromTheFieldSection.title}
        </SectionTitle>

        <motion.article
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={reduceMotion ? { duration: 0 } : fadeUpTransition(0, 0.45)}
          className="mt-12 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50"
        >
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="min-h-[18rem] bg-slate-100 lg:min-h-[28rem]">
              <StoryPortrait study={featured} />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">Featured case study</p>
              <p className="mt-4 text-sm font-semibold text-slate-500">{featured.name}</p>
              <h3 className="mt-2 text-2xl font-semibold leading-snug text-slate-950 md:text-3xl">{featured.title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-600">{featured.teaser}</p>
              <div className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-600">
                <p className="inline-flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-red-800" aria-hidden="true" />
                  <span>{featured.location.display}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Enterprise: </span>
                  {featured.enterprise}
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to={`/stories/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-red-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
                >
                  Read Story
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </motion.article>

        <div className="mt-12">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Other stories</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {supporting.map((study, index) => (
              <StoryCard key={study.id} study={study} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link className="link-pill" to="/stories">
            Explore all stories
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
