import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ExternalLink, FileText } from 'lucide-react';
import { getPracticalGuideBySlug } from '../data/practicalGuides.js';
import { isSafeNavigationUrl, openSafeUrl } from '../utils/safeUrl.js';
import NotFound from './NotFound.jsx';

function ExampleTable({ example }) {
  if (!example?.rows?.length) return null;

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-[#f7f4ef]">
      {example.title ? (
        <p className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800">{example.title}</p>
      ) : null}
      <dl className="divide-y divide-slate-200">
        {example.rows.map((row) => (
          <div
            key={`${example.title}-${row.label}`}
            className={`flex items-start justify-between gap-4 px-4 py-3 text-sm ${
              row.emphasize ? 'bg-white font-semibold text-slate-950' : 'text-slate-700'
            }`}
          >
            <dt className="min-w-0">{row.label}</dt>
            <dd className="shrink-0 text-right tabular-nums">{row.amount}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function ResourceGuide() {
  const { slug } = useParams();
  const guide = getPracticalGuideBySlug(slug);

  if (!guide) {
    return <NotFound />;
  }

  const primaryOfficial = guide.officialLinks?.find((link) => isSafeNavigationUrl(link.url));

  return (
    <article className="bg-[#f7f4ef]">
      <div className="site-container py-10 md:py-14">
        <Link
          to="/resources#other-documents"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-900 transition hover:text-red-800"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Practical Resource Library
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-red-100 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-red-900">
              {guide.categoryLabel}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
              {guide.typeLabel}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">{guide.title}</h1>
          <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">{guide.description}</p>

          {guide.source?.label ? (
            <p className="mt-5 text-sm text-slate-500">
              Source:{' '}
              {isSafeNavigationUrl(guide.source.url) ? (
                <button
                  type="button"
                  onClick={() => openSafeUrl(guide.source.url)}
                  className="font-semibold text-red-900 underline-offset-2 hover:underline"
                >
                  {guide.source.label}
                </button>
              ) : (
                <span className="font-semibold text-slate-700">{guide.source.label}</span>
              )}
            </p>
          ) : (
            <p className="mt-5 text-sm text-slate-500">
              Prepared by Project Bharti as an educational learning resource.
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {primaryOfficial ? (
              <button
                type="button"
                onClick={() => openSafeUrl(primaryOfficial.url)}
                className="inline-flex items-center gap-2 rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                Open Official Resource
                <ExternalLink size={15} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </header>

        {guide.disclaimer ? (
          <div className="mt-8 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-950">
            {guide.disclaimer}
          </div>
        ) : null}

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
          <div className="space-y-6">
            {guide.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 md:p-8"
              >
                <h2 className="text-xl font-semibold text-slate-950">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-sm leading-7 text-slate-600 md:text-[0.95rem]">
                    {paragraph}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                <ExampleTable example={section.example} />
              </section>
            ))}
          </div>

          <aside className="space-y-4">
            {guide.takeaways?.length ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-red-900">
                  <FileText size={16} aria-hidden="true" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em]">Key takeaways</p>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  {guide.takeaways.map((item) => (
                    <li key={item} className="border-l-2 border-red-200 pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {guide.officialLinks?.length ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Official links</p>
                <ul className="mt-4 space-y-3">
                  {guide.officialLinks.map((link) =>
                    isSafeNavigationUrl(link.url) ? (
                      <li key={link.url}>
                        <button
                          type="button"
                          onClick={() => openSafeUrl(link.url)}
                          className="inline-flex items-start gap-2 text-left text-sm font-semibold text-red-900 transition hover:text-red-800"
                        >
                          <ArrowUpRight size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                          <span>{link.label}</span>
                        </button>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  );
}
