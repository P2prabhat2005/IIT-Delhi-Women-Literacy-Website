import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import heroGroupPhotograph from '../assets/images/hero/hero-group-photograph.jpg';
import heroGroupPhotographWebp from '../assets/images/hero/hero-group-photograph.webp';
import exlLogo from '../assets/images/logos/exl-logo.png';
import iitDelhiLogo from '../assets/images/logos/iit-delhi-logo.png';
import { heroContent } from '../data/homepage.js';
import { useIntroSplashActive } from '../utils/introSplash.js';
import { fadeUpTransition } from '../utils/motion.js';

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

        <div className="site-container relative flex flex-col justify-center gap-10 pb-12 pt-20 md:gap-12 md:pb-16 md:pt-24 lg:gap-12 lg:pb-16 lg:pt-24">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-x-12 lg:gap-y-0 xl:gap-x-14">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : fadeUpTransition(0, 0.45)}
              className="min-w-0"
            >
              <div
                className="mb-5 flex flex-wrap items-center gap-3 md:mb-6"
                aria-label="Project Bharti institutional and partner logos"
              >
                <div className="flex min-h-14 items-center rounded-2xl border border-[#E8E4DD] bg-[#F7F4EF] px-4 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:min-h-16 sm:px-4 sm:py-3">
                  <img
                    src={iitDelhiLogo}
                    alt="IIT Delhi logo"
                    width="1024"
                    height="1024"
                    decoding="async"
                    className="h-8 w-auto object-contain sm:h-9"
                  />
                </div>
                <div className="flex min-h-14 items-center rounded-2xl border border-[#E8E4DD] bg-[#F7F4EF] px-4 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:min-h-16 sm:px-4 sm:py-3">
                  <img
                    src={exlLogo}
                    alt="EXL logo"
                    width="94"
                    height="56"
                    decoding="async"
                    className="h-7 w-auto object-contain sm:h-8"
                  />
                </div>
              </div>

              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-900/90 md:text-xs">
                  {heroContent.eyebrow}
                </p>

                <h1
                  id="hero-title"
                  className="scroll-mt-28 mt-4 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.02em] text-slate-950 md:mt-5 md:text-6xl lg:text-[4.25rem]"
                >
                  {heroContent.title}
                </h1>

                <p className="mt-4 border-l border-red-900/25 pl-4 text-lg font-medium leading-snug text-slate-800 md:mt-5 md:pl-5 md:text-xl md:leading-relaxed">
                  {heroContent.subtitle}
                </p>

                <p className="mt-5 text-base leading-8 text-slate-600 md:mt-5 md:text-[1.05rem] md:leading-8">
                  {heroContent.description}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-8">
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
              </div>
            </motion.div>

            <motion.aside
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : fadeUpTransition(0.08, 0.5)}
              className="mx-auto flex w-full min-w-0 max-w-md self-center lg:mx-0 lg:ml-auto lg:mt-[7.5rem] lg:max-w-[32rem] lg:self-start"
            >
              <figure className="w-full overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white shadow-sm shadow-slate-200/60 md:rounded-[2rem]">
                <picture>
                  <source srcSet={heroGroupPhotographWebp} type="image/webp" />
                  <img
                    src={heroGroupPhotograph}
                    alt="Project Bharti team and partners standing together at a formal meeting"
                    width="1024"
                    height="682"
                    decoding="async"
                    fetchPriority="high"
                    sizes="(min-width: 1024px) 32rem, (min-width: 640px) 28rem, calc(100vw - 2rem)"
                    className="block h-auto w-full max-w-full"
                  />
                </picture>
              </figure>
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
                  {metric.detail ? (
                    <p className="mt-2 max-w-[16rem] text-sm leading-6 text-slate-500">{metric.detail}</p>
                  ) : null}
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
