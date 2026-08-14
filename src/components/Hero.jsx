import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { lazy, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { heroContent } from '../data/homepage.js';
import { useIntroSplashActive } from '../utils/introSplash.js';
import { fadeUpTransition } from '../utils/motion.js';

const InteractiveIndiaMap = lazy(() => import('./InteractiveIndiaMap.jsx'));

const heroBackgroundAssets = import.meta.glob('../assets/images/hero/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const formatRank = (path) => {
  const extension = path.split('.').pop()?.toLowerCase();
  if (extension === 'avif') return 0;
  if (extension === 'webp') return 1;
  if (extension === 'jpg' || extension === 'jpeg') return 2;
  return 3;
};

function findAsset(assets, keywords) {
  return Object.entries(assets)
    .filter(([path]) => keywords.every((keyword) => path.toLowerCase().includes(keyword)))
    .sort(([left], [right]) => formatRank(left) - formatRank(right) || left.localeCompare(right))[0]?.[1];
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

function ProjectReachFallback() {
  return (
    <div
      className="flex min-h-[420px] w-full animate-pulse flex-col lg:min-h-[480px]"
      aria-hidden="true"
    >
      <div className="min-h-[300px] flex-[0_0_72%] rounded-[28%] bg-slate-200/12 lg:min-h-[340px]" />
      <div className="mt-4 h-3 w-3/4 rounded-full bg-slate-200/15" />
      <div className="mt-3 h-2.5 w-1/2 rounded-full bg-slate-200/10" />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotionPreference = useReducedMotion();
  const introActive = useIntroSplashActive();
  const deferHeavyVisuals = introActive;
  const reduceMotion = reduceMotionPreference || deferHeavyVisuals;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['0%', '8%']);

  return (
    <div className="bg-white px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6 lg:px-10 lg:pb-10 lg:pt-10">
      <section
        id="hero"
        ref={sectionRef}
        aria-labelledby="hero-title"
        className="relative isolate mx-auto max-w-[1440px] scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[#fbfaf8] md:rounded-[2rem]"
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
              className="h-full w-full object-cover object-center opacity-[0.34] saturate-75"
            />
          ) : null}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(153,27,27,0.10),transparent_32%),radial-gradient(circle_at_82%_16%,rgba(15,118,110,0.06),transparent_30%),linear-gradient(135deg,rgba(255,250,247,0.72)_0%,rgba(255,255,255,0.58)_48%,rgba(246,248,251,0.68)_100%)]" />
        </motion.div>

        <div className="site-container relative flex flex-col justify-center gap-10 pb-12 pt-20 md:gap-12 md:pb-16 md:pt-24 lg:gap-14 lg:pb-16 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14 xl:gap-16">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : fadeUpTransition(0, 0.45)}
              className="min-w-0"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-900/90 md:text-xs">
                {heroContent.eyebrow}
              </p>

              <h1
                id="hero-title"
                className="scroll-mt-28 mt-5 max-w-xl text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.02em] text-slate-950 md:mt-6 md:text-6xl lg:text-[4.25rem]"
              >
                {heroContent.title}
              </h1>

              <p className="mt-5 max-w-xl border-l border-red-900/25 pl-4 text-lg font-medium leading-snug text-slate-800 md:mt-6 md:pl-5 md:text-xl md:leading-relaxed">
                {heroContent.subtitle}
              </p>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:mt-7 md:text-[1.05rem] md:leading-8">
                {heroContent.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  className="btn-primary"
                  to={heroContent.primaryCta.to}
                  aria-label={`${heroContent.primaryCta.label} about Project Bharti`}
                >
                  {heroContent.primaryCta.label}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  className="btn-secondary"
                  to={heroContent.secondaryCta.to}
                  aria-label={`${heroContent.secondaryCta.label} for Project Bharti`}
                >
                  {heroContent.secondaryCta.label}
                </Link>
              </div>
            </motion.div>

            <motion.aside
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : fadeUpTransition(0.08, 0.5)}
              className="mx-auto flex w-full min-w-0 max-w-md flex-col self-start lg:mx-0 lg:ml-auto lg:min-h-[min(52vh,500px)] lg:max-w-[34rem] lg:pt-0"
              aria-label="Project Bharti geographic reach"
            >
              {deferHeavyVisuals ? (
                <ProjectReachFallback />
              ) : (
                <Suspense fallback={<ProjectReachFallback />}>
                  <InteractiveIndiaMap variant="compact" />
                </Suspense>
              )}
            </motion.aside>
          </div>

          <motion.div
            id="impact-snapshot"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.15 }}
            className="scroll-mt-28 border-t border-slate-300/80 pt-8 md:pt-10"
          >
            <dl
              className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0"
              aria-label="Project Bharti key statistics"
            >
              {heroContent.stats.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`min-w-0 sm:px-6 lg:px-8 ${
                    index > 0 ? 'border-t border-slate-200 pt-8 sm:border-l sm:border-t-0 sm:pt-0' : 'sm:pl-0'
                  }`}
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {metric.label}
                  </dt>
                  <dd className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 md:text-4xl">
                    {metric.value}
                  </dd>
                  <p className="mt-2 max-w-[16rem] text-sm leading-6 text-slate-500">{metric.detail}</p>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
