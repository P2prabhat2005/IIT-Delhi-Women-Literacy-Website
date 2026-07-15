import { motion } from 'framer-motion';
import { Handshake, Network, Sparkles } from 'lucide-react';
import { aboutProjectContent } from '../data/homepage.js';
import PersistentImageSlot from './PersistentImageSlot.jsx';
import SectionTitle from './SectionTitle.jsx';

function CollageTile({ index }) {
  const positions = [
    'left-0 top-8 h-48 w-40 rotate-[-4deg] md:h-56 md:w-48',
    'right-0 top-0 h-56 w-44 rotate-[4deg] md:h-64 md:w-52',
    'bottom-0 left-1/2 h-44 w-48 -translate-x-1/2 rotate-[1deg] md:h-52 md:w-60',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`absolute ${positions[index]}`}
    >
      <PersistentImageSlot
        ownerId={`about-collage-${index}`}
        title="Official Project Photograph"
        alt={`Research to field impact photograph ${index + 1}`}
        wrapperClassName="h-full w-full"
        className="h-full w-full rounded-[1.5rem] border border-[#E9E5DF] bg-slate-50 shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
      />
    </motion.div>
  );
}

export default function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-title" className="section relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(153,27,27,0.08),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(14,116,144,0.08),transparent_24%)]" />
      <div className="site-container relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionTitle
              eyebrow={aboutProjectContent.section.eyebrow}
              id="about-preview-title"
              description={aboutProjectContent.section.description}
            >
              {aboutProjectContent.section.title}
            </SectionTitle>

            <div className="relative mt-10 hidden min-h-[360px] sm:block">
              {[0, 1, 2].map((index) => (
                <CollageTile key={index} index={index} />
              ))}
              <motion.div
                aria-hidden="true"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-20 bottom-16 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl"
              >
                <Sparkles size={22} />
              </motion.div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {aboutProjectContent.institutions.map(({ Icon, accent, body, label, points, title }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-2xl"
              >
                <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${accent}`}>
                  <Icon size={15} aria-hidden="true" />
                  {label}
                </div>
                <h3 className="text-2xl font-semibold text-slate-950">{title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{body}</p>
                <ul className="mt-6 space-y-3">
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

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.55 }}
          className="mt-14 rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl shadow-slate-300/70 md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-100">
                <Handshake size={15} aria-hidden="true" />
                {aboutProjectContent.overview.eyebrow}
              </div>
              <h3 className="mt-5 text-3xl font-semibold">{aboutProjectContent.overview.title}</h3>
              <PersistentImageSlot
                ownerId="about-overview"
                title="Official Project Photograph"
                alt="Women participating in a Project Bharti activity"
                aspectRatio="aspect-[4/5] lg:aspect-auto"
                className="mt-8 w-full rounded-[1.5rem] border border-[#E9E5DF] bg-slate-50 shadow-[0_18px_45px_rgba(15,23,42,0.10)] lg:min-h-[430px]"
              />
            </div>

            <div>
              {aboutProjectContent.overview.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className={`${index > 0 ? 'mt-5' : ''} leading-8 text-slate-300`}>
                  {paragraph}
                </p>
              ))}

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {aboutProjectContent.visionMission.map(({ Icon, description, title }) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition duration-300 hover:bg-white/[0.09]"
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-100">
                      <Icon size={16} aria-hidden="true" />
                      {title}
                    </div>
                    <p className="text-sm leading-7 text-slate-300">{description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {aboutProjectContent.overview.highlights.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                    <Network size={15} aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
