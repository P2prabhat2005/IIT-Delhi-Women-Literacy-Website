import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import { caseStudies, storiesFromTheFieldSection } from '../data/caseStudies.js';
import { getCaseStudyImageSize } from '../data/caseStudyImageSizes.js';

function StoryPortrait({ study }) {
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
        className="h-full w-full object-cover"
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
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-white to-red-50 px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-red-100 bg-white text-lg font-semibold text-red-900 shadow-sm">
        {initials}
      </span>
      <p className="mt-4 text-sm font-semibold text-slate-800">{study.name}</p>
    </div>
  );
}

export default function Stories() {
  return (
    <section className="section bg-[#f7f4ef]" aria-labelledby="all-stories-title">
      <div className="site-container">
        <SectionTitle
          eyebrow={storiesFromTheFieldSection.eyebrow}
          id="all-stories-title"
          description={storiesFromTheFieldSection.description}
        >
          Explore all stories
        </SectionTitle>

        <p className="mt-6 text-sm text-slate-500">
          {caseStudies.length} field stories drawn from official Project Bharti case-study documents.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <StoryPortrait study={study} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-800">{study.name}</p>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-slate-950">{study.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{study.teaser}</p>
                <p className="mt-4 inline-flex items-start gap-1.5 text-xs font-medium text-slate-500">
                  <MapPin size={13} className="mt-0.5 shrink-0 text-red-800" aria-hidden="true" />
                  <span>{study.location.display}</span>
                </p>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
