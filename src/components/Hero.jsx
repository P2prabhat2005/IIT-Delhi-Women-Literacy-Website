import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import inauguralEventPhoto from '../assets/images/hero/inaugural-event.png';
import profGouravDwivediPhoto from '../assets/images/hero/prof-gourav-dwivedi.png';
import profSeemaSharmaPhoto from '../assets/images/hero/prof-seema-sharma.png';
import { heroContent } from '../data/homepage.js';
import { useIntroSplashActive } from '../utils/introSplash.js';
import { fadeUpTransition, staggerDelay } from '../utils/motion.js';

const heroBackgroundAssets = import.meta.glob('../assets/images/hero/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});

function findAsset(assets, keywords) {
  return Object.entries(assets)
    .sort(([left], [right]) => left.localeCompare(right))
    .find(([path]) => keywords.every((keyword) => path.toLowerCase().includes(keyword)))?.[1];
}

function firstAsset(assets) {
  return Object.entries(assets).sort(([left], [right]) => left.localeCompare(right))[0]?.[1];
}

const heroArtworkImage = findAsset(heroBackgroundAssets, ['artwork']);
const heroBackgroundImage =
  findAsset(heroBackgroundAssets, ['background']) ||
  (heroArtworkImage ? null : findAsset(heroBackgroundAssets, ['hero'])) ||
  (heroArtworkImage ? null : firstAsset(heroBackgroundAssets));
const heroSectionBackgroundImage = heroBackgroundImage || heroArtworkImage;

const heroShowcase = {
  professors: [
    {
      id: 'prof-seema-sharma',
      src: profSeemaSharmaPhoto,
      name: 'Prof. Seema Sharma',
      alt: 'Portrait of Prof. Seema Sharma, Project Lead, Project Bharti',
    },
    {
      id: 'prof-gourav-dwivedi',
      src: profGouravDwivediPhoto,
      name: 'Prof. Gourav Dwivedi',
      alt: 'Portrait of Prof. Gourav Dwivedi, Co-Project Lead, Project Bharti',
    },
  ],
  inaugural: {
    src: inauguralEventPhoto,
    alt: 'Project Bharti inaugural event group photograph at IIT Delhi',
  },
  sharedRole: 'Faculty Leadership',
};

export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotionPreference = useReducedMotion();
  const introActive = useIntroSplashActive();
  // Pause non-essential motion and defer heavy imagery while the intro owns the network/main thread.
  const deferHeavyVisuals = introActive;
  const reduceMotion = reduceMotionPreference || deferHeavyVisuals;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['0%', '12%']);
  const visualY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['0%', '8%']);

  return (
    <div className="bg-white px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6 lg:px-10 lg:pb-12 lg:pt-10">
      <section
        ref={sectionRef}
        aria-labelledby="hero-title"
        className="relative isolate mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] border border-slate-200/70 bg-[#fbfaf8] shadow-[0_24px_70px_rgba(15,23,42,0.12)] transition-shadow duration-300 md:rounded-[2.25rem]"
      >
      <motion.div className="absolute inset-0 -z-20" style={{ y: backgroundY }} aria-hidden="true">
        {heroSectionBackgroundImage && !deferHeavyVisuals ? (
          <img
            src={heroSectionBackgroundImage}
            alt=""
            width="1024"
            height="1536"
            decoding="async"
            fetchPriority="low"
            className="h-full w-full object-cover object-center opacity-[0.36] saturate-75"
          />
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12% 18%,rgba(153,27,27,0.11),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(15,118,110,0.08),transparent_28%),linear-gradient(135deg,rgba(255,250,247,0.75)_0%,rgba(255,255,255,0.67)_48%,rgba(246,248,251,0.72)_100%)]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, -12, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[6%] top-28 -z-10 h-24 w-24 rounded-full border border-red-200/80 bg-white/30 blur-[1px]"
      />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, 14, 0], x: [0, -8, 0] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[8%] top-36 -z-10 h-36 w-36 rounded-full border border-cyan-200/80 bg-cyan-50/40"
      />

      <div className="site-container relative grid min-h-[calc(100vh-88px)] items-center gap-10 py-16 md:gap-12 md:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : fadeUpTransition(0, 0.5)}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-red-900">
            {heroContent.eyebrow}
          </p>
          <h1 id="hero-title" className="text-5xl font-semibold leading-[1.02] text-slate-950 md:text-7xl">
            {heroContent.title}
          </h1>
          <p className="mt-5 max-w-3xl text-2xl font-medium leading-snug text-slate-800 md:text-3xl md:leading-tight">
            {heroContent.subtitle}
          </p>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl md:leading-9">
            {heroContent.description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary shadow-red-950/10" to={heroContent.primaryCta.to} aria-label={`${heroContent.primaryCta.label} about Project Bharti`}>
              {heroContent.primaryCta.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="btn-secondary" to={heroContent.secondaryCta.to} aria-label={`${heroContent.secondaryCta.label} for Project Bharti`}>
              {heroContent.secondaryCta.label}
            </Link>
          </div>

          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-3" aria-label="Project Bharti key statistics">
            {heroContent.stats.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? { duration: 0 } : fadeUpTransition(0.12 + staggerDelay(index, 0.06), 0.4)}
                className="rounded-2xl border border-slate-200 bg-white/82 p-4 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl motion-safe:hover:scale-[1.02]"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{metric.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">{metric.value}</dd>
                <p className="mt-1 text-xs leading-5 text-slate-500">{metric.detail}</p>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : fadeUpTransition(0.1, 0.5)}
          style={{ y: visualY }}
          className="w-full"
          aria-label="Project Bharti leadership and inaugural event"
        >
          <div className="grid gap-3 sm:gap-4">
            <div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {heroShowcase.professors.map((professor) => (
                  <figure key={professor.id} className="min-w-0">
                    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-200/60">
                      {deferHeavyVisuals ? (
                        <div className="aspect-square w-full bg-slate-100" aria-hidden="true" />
                      ) : (
                        <img
                          src={professor.src}
                          alt={professor.alt}
                          width="480"
                          height="480"
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          className="aspect-square w-full object-cover object-top transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <figcaption className="mt-3.5 px-1 text-center">
                      <p className="text-sm font-semibold leading-snug text-slate-950 sm:text-base">
                        {professor.name}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-2.5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 sm:mt-3 sm:text-xs">
                {heroShowcase.sharedRole}
              </p>
            </div>

            <figure className="min-w-0">
              <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-200/60">
                {deferHeavyVisuals ? (
                  <div className="aspect-[16/10] w-full bg-slate-100" aria-hidden="true" />
                ) : (
                  <img
                    src={heroShowcase.inaugural.src}
                    alt={heroShowcase.inaugural.alt}
                    width="1200"
                    height="800"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="aspect-[16/10] w-full object-cover object-center transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                )}
              </div>
            </figure>
          </div>
        </motion.div>
      </div>
      </section>
    </div>
  );
}
