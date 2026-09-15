import { ArrowRight, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCaseStudyBySlug } from '../data/caseStudies.js';
import {
  getCaseStudyImageSize,
  getCaseStudyThumbnailObjectPosition,
} from '../data/caseStudyImageSizes.js';
import { fadeUpTransition, viewportOnce } from '../utils/motion.js';
import SectionTitle from './SectionTitle.jsx';

const FEATURED_CASE_STUDY_SLUG = 'nishi';

export default function FeaturedCaseStudy() {
  const reduceMotion = useReducedMotion();
  const study = getCaseStudyBySlug(FEATURED_CASE_STUDY_SLUG);

  if (!study?.image?.src) {
    return null;
  }

  const imageSize = getCaseStudyImageSize(study.image.src);
  const objectPosition = getCaseStudyThumbnailObjectPosition(study.image.src);

  return (
    <section
      id="featured-case-study"
      aria-labelledby="featured-case-study-title"
      className="section scroll-mt-24 bg-white"
    >
      <div className="site-container">
        <SectionTitle
          align="center"
          eyebrow="Case Study"
          id="featured-case-study-title"
        >
          Featured Case Study
        </SectionTitle>

        <motion.article
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={reduceMotion ? { duration: 0 } : fadeUpTransition(0.06, 0.4)}
          className="mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
        >
          <div className="aspect-[4/3] overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-full">
            <img
              src={study.image.src}
              alt={study.image.alt || `${study.name} case study photograph`}
              width={imageSize?.width}
              height={imageSize?.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              style={{ objectPosition }}
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-800">
              {study.name}
            </p>

            <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-slate-950 md:text-[1.65rem]">
              {study.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-[0.95rem] md:leading-7">
              {study.teaser}
            </p>

            <div className="mt-5 space-y-2 text-sm text-slate-500">
              {study.location?.display ? (
                <p className="inline-flex items-start gap-1.5">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-red-800" aria-hidden="true" />
                  <span>{study.location.display}</span>
                </p>
              ) : null}
              {study.enterprise ? <p className="leading-6">{study.enterprise}</p> : null}
            </div>

            <p className="mt-5 inline-flex w-fit rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-red-900">
              PDF • Case Study
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link className="btn-primary w-full justify-center sm:w-auto" to={`/stories/${study.slug}`}>
                Read Case Study
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link className="btn-secondary w-full justify-center sm:w-auto" to="/resources#case-studies">
                Browse Case Studies
              </Link>
            </div>

            <div className="mt-5">
              <Link
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-900 transition hover:text-red-800"
                to="/resources"
              >
                View all Resources
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
