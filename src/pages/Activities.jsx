import { motion } from 'framer-motion';
import { ArrowRight, MapPinned } from 'lucide-react';
import { Link } from 'react-router-dom';
import ActivityCard from '../components/ActivityCard.jsx';
import ActivityTimeline from '../components/ActivityTimeline.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { activitiesPageContent } from '../data/activities.js';

const activityImages = import.meta.glob('../assets/activities/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});

function findActivityImage(key) {
  return Object.entries(activityImages)
    .sort(([left], [right]) => left.localeCompare(right))
    .find(([path]) => path.toLowerCase().includes(key))?.[1];
}

export default function Activities() {
  const {
    callToAction,
    districtTrainingProgrammes,
    focusGroupDiscussions,
    impactHighlights,
    inauguralProgramme,
    methodology,
    overview,
    timeline,
  } = activitiesPageContent;

  return (
    <>
      <section className="section relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(153,27,27,0.10),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)]" />
        <div className="site-container relative">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <SectionTitle eyebrow={overview.eyebrow} id="activities-overview" description={overview.description}>
              {overview.title}
            </SectionTitle>
            <ActivityTimeline items={timeline} />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {overview.cards.map((card) => (
              <ActivityCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <ActivityCard
              {...inauguralProgramme}
              image={findActivityImage(inauguralProgramme.imageKey)}
              items={inauguralProgramme.highlights}
            />
            <div>
              <SectionTitle
                eyebrow={inauguralProgramme.eyebrow}
                id="inaugural-programme"
                description={inauguralProgramme.description}
              >
                {inauguralProgramme.title}
              </SectionTitle>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle
              eyebrow={focusGroupDiscussions.eyebrow}
              id="focus-group-discussions"
              description={focusGroupDiscussions.description}
            >
              {focusGroupDiscussions.title}
            </SectionTitle>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {focusGroupDiscussions.cards.map((card) => (
              <ActivityCard
                key={card.title}
                {...card}
                image={findActivityImage(focusGroupDiscussions.imageKey)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-950 text-white">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <SectionTitle
              eyebrow={districtTrainingProgrammes.eyebrow}
              id="district-training"
              description={districtTrainingProgrammes.description}
            >
              {districtTrainingProgrammes.title}
            </SectionTitle>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.45 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-700 text-white">
                  <MapPinned size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-200">Current project states</p>
                  <h3 className="text-xl font-semibold">District programme foundation</h3>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {districtTrainingProgrammes.states.map((state) => (
                  <div key={state} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold">
                    {state}
                  </div>
                ))}
              </div>
              <ul className="mt-6 space-y-3">
                {districtTrainingProgrammes.trainingFocus.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="site-container">
          <SectionTitle eyebrow={methodology.eyebrow} id="training-methodology" description={methodology.description}>
            {methodology.title}
          </SectionTitle>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {methodology.steps.map((step) => (
              <ActivityCard key={step.title} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="site-container">
          <SectionTitle
            align="center"
            eyebrow={impactHighlights.eyebrow}
            id="impact-highlights"
            description={impactHighlights.description}
          >
            {impactHighlights.title}
          </SectionTitle>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {impactHighlights.cards.map((card) => (
              <ActivityCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="site-container">
          <div className="rounded-[2rem] bg-red-900 p-8 text-white shadow-2xl shadow-red-950/20 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-center">
              <SectionTitle eyebrow={callToAction.eyebrow} id="activities-cta" description={callToAction.description}>
                {callToAction.title}
              </SectionTitle>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-red-900 transition hover:bg-red-50" to={callToAction.primaryTo}>
                  {callToAction.primaryLabel}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10" to={callToAction.secondaryTo}>
                  {callToAction.secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
