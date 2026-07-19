import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { heroContent } from '../data/homepage.js';
import EditableDocumentControl from './EditableDocumentControl.jsx';
import { useEditableDocumentMap } from '../hooks/useEditableDocumentMap.js';
import { labelToDocumentKey } from '../utils/editableMediaStorage.js';

const HERO_CAPABILITY_DOCUMENTS_NAMESPACE = 'hero-capability-documents';

const logoAssets = import.meta.glob('../assets/logos/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const heroBackgroundAssets = import.meta.glob('../assets/hero/*.{png,jpg,jpeg,webp,avif}', {
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

const iitDelhiLogo = findAsset(logoAssets, ['iit']) || findAsset(logoAssets, ['delhi']);
const exlLogo = findAsset(logoAssets, ['exl']);
const heroArtworkImage = findAsset(heroBackgroundAssets, ['artwork']);
const heroBackgroundImage =
  findAsset(heroBackgroundAssets, ['background']) ||
  (heroArtworkImage ? null : findAsset(heroBackgroundAssets, ['hero'])) ||
  (heroArtworkImage ? null : firstAsset(heroBackgroundAssets));
const heroSectionBackgroundImage = heroBackgroundImage || heroArtworkImage;

export default function Hero() {
  const sectionRef = useRef(null);
  const capabilityDocumentKeys = useMemo(
    () => heroContent.pillars.map(({ label }) => labelToDocumentKey(label)),
    [],
  );
  const {
    validationMessage,
    getDocument,
    openDocument,
    attachDocument,
    removeDocument,
  } = useEditableDocumentMap(HERO_CAPABILITY_DOCUMENTS_NAMESPACE, capabilityDocumentKeys);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%']);

  return (
    <div className="bg-white px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6 lg:px-10 lg:pb-12 lg:pt-10">
      <section
        ref={sectionRef}
        aria-labelledby="hero-title"
        className="relative isolate mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] border border-slate-200/70 bg-[#fbfaf8] shadow-[0_24px_70px_rgba(15,23,42,0.12)] transition-shadow duration-300 md:rounded-[2.25rem]"
      >
      <motion.div className="absolute inset-0 -z-20" style={{ y: backgroundY }} aria-hidden="true">
        {heroSectionBackgroundImage ? (
          <img
            src={heroSectionBackgroundImage}
            alt=""
            className="h-full w-full object-cover object-center opacity-[0.36] saturate-75"
          />
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(153,27,27,0.11),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(15,118,110,0.08),transparent_28%),linear-gradient(135deg,rgba(255,250,247,0.75)_0%,rgba(255,255,255,0.67)_48%,rgba(246,248,251,0.72)_100%)]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -12, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[6%] top-28 -z-10 h-24 w-24 rounded-full border border-red-200/80 bg-white/30 blur-[1px]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[8%] top-36 -z-10 h-36 w-36 rounded-full border border-cyan-200/80 bg-cyan-50/40"
      />

      <div className="site-container relative grid min-h-[calc(100vh-88px)] items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <div className="mb-8 flex flex-wrap items-center gap-3" aria-label="Project collaborators">
            <div className="flex min-h-16 items-center gap-3 rounded-[16px] border border-[#E8E4DD] bg-[#F7F4EF] px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              {iitDelhiLogo ? (
                <img src={iitDelhiLogo} alt="IIT Delhi logo" className="h-9 w-auto object-contain" />
              ) : (
                <span className="text-sm font-bold text-red-900">IIT Delhi</span>
              )}
            </div>
            <div className="flex min-h-16 items-center gap-3 rounded-[16px] border border-[#E8E4DD] bg-[#F7F4EF] px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              {exlLogo ? (
                <img src={exlLogo} alt="EXL logo" className="h-8 w-auto object-contain" />
              ) : (
                <span className="text-sm font-bold text-orange-600">EXL</span>
              )}
            </div>
          </div>

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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 + index * 0.06 }}
                className="rounded-2xl border border-slate-200 bg-white/82 p-4 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{metric.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">{metric.value}</dd>
                <p className="mt-1 text-xs leading-5 text-slate-500">{metric.detail}</p>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          style={{ y: visualY }}
          className="relative flex min-h-[calc(100vh-88px)] w-full self-stretch items-center justify-center overflow-hidden"
          aria-label="Project Bharti research focus summary"
        >
          <div className="relative z-10">
            <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-200/70 backdrop-blur">
              <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white shadow-inner shadow-white/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-red-200">{heroContent.visual.eyebrow}</p>
                    <h2 className="mt-2 max-w-sm text-2xl font-semibold">
                      {heroContent.visual.title}
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-red-900">
                    <ShieldCheck size={24} aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-8 grid gap-4">
                  {heroContent.pillars.map(({ Icon, label }, index) => {
                    const documentKey = labelToDocumentKey(label);
                    const documentEntry = getDocument(documentKey);
                    const hasDocument = Boolean(documentEntry?.url);

                    return (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: 0.28 + index * 0.08 }}
                        role={hasDocument ? 'button' : undefined}
                        tabIndex={hasDocument ? 0 : undefined}
                        onClick={() => {
                          if (hasDocument) openDocument(documentKey);
                        }}
                        onKeyDown={(event) => {
                          if (!hasDocument) return;
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            openDocument(documentKey);
                          }
                        }}
                        className={`group flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition hover:bg-white/[0.16]${hasDocument ? ' cursor-pointer' : ''}`}
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-red-900 transition group-hover:scale-105">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="font-medium">{label}</span>
                        <EditableDocumentControl
                          documentEntry={documentEntry}
                          label={label}
                          onAttach={(file) => attachDocument(documentKey, file)}
                          onRemove={() => removeDocument(documentKey)}
                        />
                      </motion.div>
                    );
                  })}
                </div>
                {validationMessage ? (
                  <p role="alert" className="mt-3 text-xs font-medium text-red-200">
                    {validationMessage}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-emerald-200 bg-white p-4 shadow-xl shadow-slate-200/80 md:block">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-600" size={24} aria-hidden="true" />
                <p className="text-sm font-semibold text-slate-800">{heroContent.visual.footerNote}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </section>
    </div>
  );
}
