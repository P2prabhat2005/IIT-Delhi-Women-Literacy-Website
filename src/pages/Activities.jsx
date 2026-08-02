import { motion } from 'framer-motion';
import { MapPinned } from 'lucide-react';
import ActivitiesCTA from '../components/ActivitiesCTA.jsx';
import ActivityCard from '../components/ActivityCard.jsx';
import ActivityTimeline from '../components/ActivityTimeline.jsx';
import PersistentImageSlot from '../components/PersistentImageSlot.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { activitiesPageContent } from '../data/activities.js';
import { labelToImageKey } from '../data/siteImages.js';

const activityImages = import.meta.glob('../assets/images/activities/**/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});

function findActivityImage(key) {
  return Object.entries(activityImages)
    .sort(([left], [right]) => left.localeCompare(right))
    .find(([path]) => path.toLowerCase().includes(key))?.[1];
}

function FeaturedActivityImage({ className = '', image, imageClassName, title }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.45 }}
      className={`overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 ${className}`}
    >
      <PersistentImageSlot
        ownerId={`activity-card-${labelToImageKey(title)}`}
        image={image}
        title="Official Project Photograph"
        alt={`${title} activity photograph`}
        className={imageClassName || 'h-[20rem] w-full bg-slate-50 sm:h-[26rem] lg:h-[32rem]'}
      />
    </motion.figure>
  );
}

function LearningPathway({ steps }) {
  return (
    <ol className="relative mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          className="relative h-full rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-900 text-sm font-bold text-white">
              {index + 1}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-red-800">Step {index + 1}</span>
          </div>
          {index < steps.length - 1 ? (
            <span className="absolute left-[calc(100%+0.5rem)] top-9 hidden h-px w-4 bg-slate-200 xl:block" aria-hidden="true" />
          ) : null}
          <PersistentImageSlot
            ownerId={`activity-card-${labelToImageKey(step.title)}`}
            title={`${step.title} learning step`}
            alt={`${step.title} activity photograph`}
            compact
            className="mb-4 aspect-[16/10] w-full rounded-xl bg-slate-50"
          />
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-900">
            <step.Icon size={18} aria-hidden="true" />
          </div>
          <h3 className="mt-3 text-lg font-semibold text-slate-950">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export default function Activities() {
  const {
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
      <section className="relative overflow-hidden bg-white py-[clamp(3rem,6vw,5.25rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(153,27,27,0.10),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)]" />
        <div className="site-container relative">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <SectionTitle eyebrow={overview.eyebrow} id="activities-overview" description={overview.description}>
              {overview.title}
            </SectionTitle>
            <ActivityTimeline items={timeline} />
          </div>

          <div className="mt-9 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <FeaturedActivityImage
              title={overview.summaryTitle}
              image={findActivityImage(overview.imageKey)}
              imageClassName="aspect-[16/10] w-full bg-slate-50 sm:aspect-[21/10]"
            />
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="lg:py-2"
            >
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-800">{overview.summaryTitle}</p>
              <p className="mt-4 text-base leading-8 text-slate-600 md:text-[1.05rem] md:leading-8">
                {overview.summary}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-[clamp(3rem,6vw,5.25rem)]">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <FeaturedActivityImage
              title={inauguralProgramme.title}
              image={findActivityImage(inauguralProgramme.imageKey)}
            />
            <div className="lg:py-6">
              <SectionTitle
                eyebrow={inauguralProgramme.eyebrow}
                id="inaugural-programme"
                description={inauguralProgramme.description}
              >
                {inauguralProgramme.title}
              </SectionTitle>
              <motion.ul
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="mt-8 space-y-4"
              >
                {inauguralProgramme.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 leading-7 text-slate-700">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-red-800" />
                    {highlight}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[clamp(3rem,6vw,5.25rem)]">
        <div className="site-container">
          <SectionTitle
            eyebrow={focusGroupDiscussions.eyebrow}
            id="focus-group-discussions"
            description={focusGroupDiscussions.description}
          >
            {focusGroupDiscussions.title}
          </SectionTitle>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {focusGroupDiscussions.cards.map((card, index) => (
              <ActivityCard
                key={card.title}
                {...card}
                index={index}
                className="h-full"
                imageClassName="aspect-[4/3] w-full bg-slate-50"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-[clamp(3rem,6vw,5.25rem)] text-white">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <FeaturedActivityImage
              title={districtTrainingProgrammes.title}
              image={findActivityImage(districtTrainingProgrammes.imageKey) || findActivityImage('deliver')}
              imageClassName="h-64 w-full bg-slate-800 sm:h-80 lg:h-[30rem]"
              className="border-white/10 bg-slate-900 shadow-black/20"
            />
            <div>
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
                className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6"
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
        </div>
      </section>

      <section className="bg-white py-[clamp(3rem,6vw,5.25rem)]">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="lg:py-6">
              <SectionTitle eyebrow={methodology.eyebrow} id="training-methodology" description={methodology.description}>
                {methodology.title}
              </SectionTitle>
            </div>
            <FeaturedActivityImage
              title={methodology.title}
              image={findActivityImage('design')}
              imageClassName="h-64 w-full bg-slate-50 sm:h-80 lg:h-[28rem]"
            />
          </div>
          <LearningPathway steps={methodology.steps} />
        </div>
      </section>

      <section className="bg-slate-50 py-[clamp(3rem,6vw,5.25rem)]">
        <div className="site-container">
          <SectionTitle
            eyebrow={impactHighlights.eyebrow}
            id="impact-highlights"
            description={impactHighlights.description}
          >
            {impactHighlights.title}
          </SectionTitle>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {impactHighlights.cards.map((card, index) => (
              <ActivityCard
                key={card.title}
                {...card}
                index={index}
                className="h-full"
                imageClassName="aspect-[4/3] w-full bg-slate-50"
              />
            ))}
          </div>
        </div>
      </section>

      <ActivitiesCTA />
    </>
  );
}
