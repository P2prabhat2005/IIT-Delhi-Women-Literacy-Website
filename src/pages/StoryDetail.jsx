import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, FileText, MapPin } from 'lucide-react';
import { getCaseStudyBySlug } from '../data/caseStudies.js';
import NotFound from './NotFound.jsx';

function StoryImage({ image, className = '' }) {
  if (!image?.src) {
    return (
      <div
        className={`flex min-h-[16rem] items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-6 text-center ${className}`}
      >
        <p className="max-w-sm text-sm leading-7 text-slate-500">
          A portrait photograph is not available in the source case-study PDF for this story.
        </p>
      </div>
    );
  }

  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 shadow-sm">
        <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
      </div>
      {image.alt ? <figcaption className="mt-3 text-sm leading-6 text-slate-500">{image.alt}</figcaption> : null}
    </figure>
  );
}

export default function StoryDetail() {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return <NotFound />;
  }

  return (
    <article className="bg-[#f7f4ef]">
      <div className="site-container py-10 md:py-14">
        <Link
          to={{ pathname: '/', hash: 'stories-from-the-field-title' }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-900 transition hover:text-red-800"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Stories from the Field
        </Link>

        <header className="mt-8 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">Case study</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">{study.name}</h1>
          <p className="mt-4 text-xl font-medium leading-snug text-slate-700 md:text-2xl">{study.title}</p>
          <div className="mt-6 space-y-2 text-sm leading-7 text-slate-600">
            <p className="inline-flex items-start gap-2">
              <MapPin size={15} className="mt-1 shrink-0 text-red-800" aria-hidden="true" />
              <span>{study.location.display}</span>
            </p>
            <p>
              <span className="font-semibold text-slate-800">Enterprise: </span>
              {study.enterprise}
            </p>
          </div>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <StoryImage image={study.image} />

            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-lg font-semibold text-slate-950">Story overview</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{study.summary}</p>
            </section>

            {study.quotes.length ? (
              <section className="space-y-4">
                {study.quotes.map((quote) => (
                  <blockquote
                    key={quote.text}
                    className="rounded-[1.5rem] border border-red-100 bg-white px-6 py-5 text-lg leading-8 text-slate-800 shadow-sm"
                  >
                    <p>“{quote.text}”</p>
                  </blockquote>
                ))}
              </section>
            ) : null}

            <div className="space-y-6">
              {study.sections.map((section) => (
                <section
                  key={section.label}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                >
                  <h2 className="text-lg font-semibold text-slate-950">{section.label}</h2>
                  <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            {study.gallery.length > 1 ? (
              <div className="space-y-4">
                {study.gallery.slice(1).map((image) => (
                  <StoryImage key={image.src} image={image} />
                ))}
              </div>
            ) : null}

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Key themes</p>
              <ul className="mt-4 space-y-2">
                {study.themes.map((theme) => (
                  <li key={theme} className="rounded-2xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                    {theme}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-red-200">
                <FileText size={18} aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">Read the Full Case Study</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Open the original Project Bharti case-study PDF for the complete formal document.
              </p>
              <a
                href={study.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-red-50"
              >
                Open PDF
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
