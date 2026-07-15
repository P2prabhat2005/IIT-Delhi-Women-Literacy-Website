import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import { aboutProjectContent } from '../data/homepage.js';

export default function About() {
  return (
    <>
      <section className="section bg-white" aria-labelledby="about-page-title">
        <div className="site-container">
          <SectionTitle
            eyebrow={aboutProjectContent.section.eyebrow}
            id="about-page-title"
            description={aboutProjectContent.section.description}
          >
            {aboutProjectContent.section.title}
          </SectionTitle>

          <div className="mt-8 flex items-center justify-center gap-4 px-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-600">
              {aboutProjectContent.section.title}
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {aboutProjectContent.institutions.map(({ Icon, accent, body, points, title }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-2xl"
              >
                <div className={`mb-6 inline-flex items-center rounded-full border px-3 py-1 ${accent}`}>
                  <Icon size={15} aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{body}</p>
                <ul className="mt-6 space-y-3" aria-label={`${title} focus areas`}>
                  {points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-red-800" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-950 text-white" aria-labelledby="about-project-bharti-title">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionTitle
              eyebrow={aboutProjectContent.overview.eyebrow}
              id="about-project-bharti-title"
              description={aboutProjectContent.overview.paragraphs[0]}
            >
              {aboutProjectContent.overview.title}
            </SectionTitle>

            <div>
              {aboutProjectContent.overview.paragraphs.slice(1).map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className={`${index > 0 ? 'mt-5' : ''} leading-8 text-slate-300`}
                >
                  {paragraph}
                </motion.p>
              ))}

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {aboutProjectContent.visionMission.map(({ Icon, description, title }) => (
                  <motion.article
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{ duration: 0.45 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition duration-300 hover:bg-white/[0.09]"
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-100">
                      <Icon size={16} aria-hidden="true" />
                      {title}
                    </div>
                    <p className="text-sm leading-7 text-slate-300">{description}</p>
                  </motion.article>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {aboutProjectContent.overview.highlights.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                    <Network size={15} aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
