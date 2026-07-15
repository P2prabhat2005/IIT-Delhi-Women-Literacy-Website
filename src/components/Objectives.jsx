import { motion, useInView } from 'framer-motion';
import { Camera, ClipboardList, FileText, Newspaper } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { objectiveImpactHighlights, objectives } from '../data/homepage.js';
import SectionTitle from './SectionTitle.jsx';

function AnimatedCounter({ metric }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);
  const hasNumericValue = typeof metric.value === 'number';

  useEffect(() => {
    if (!isInView || !hasNumericValue) return;

    let frameId;
    const duration = 1100;
    const start = performance.now();

    const animate = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(metric.value * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasNumericValue, isInView, metric.value]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-white/10 bg-white/[0.07] p-5"
    >
      <p className="text-sm font-medium text-slate-300">{metric.label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">
        {hasNumericValue ? count.toLocaleString('en-IN') : metric.placeholder}
        {hasNumericValue ? metric.suffix : null}
      </p>
      <p className="mt-2 text-xs leading-5 text-slate-400">{metric.helper}</p>
    </motion.article>
  );
}

export default function Objectives() {
  return (
    <section aria-labelledby="objectives-title" className="section relative overflow-hidden bg-slate-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden overflow-hidden opacity-[0.07] lg:block">
        <div className="absolute left-[3%] top-20 h-44 w-64 rotate-[-8deg] rounded-[1.5rem] border border-slate-400 bg-white shadow-xl">
          <FileText className="absolute left-8 top-8 text-slate-700" size={38} />
          <span className="absolute inset-x-8 bottom-10 h-2 rounded-full bg-slate-300" />
          <span className="absolute inset-x-8 bottom-6 h-2 rounded-full bg-slate-300" />
        </div>
        <div className="absolute right-[4%] top-28 h-52 w-72 rotate-[7deg] rounded-[1.5rem] border border-slate-400 bg-white shadow-xl">
          <ClipboardList className="absolute left-8 top-8 text-slate-700" size={38} />
          <span className="absolute inset-x-8 bottom-12 h-2 rounded-full bg-slate-300" />
          <span className="absolute inset-x-8 bottom-8 h-2 rounded-full bg-slate-300" />
        </div>
        <div className="absolute bottom-20 left-[13%] h-40 w-56 rotate-[5deg] rounded-[1.5rem] border border-slate-400 bg-white shadow-xl">
          <Camera className="absolute left-8 top-8 text-slate-700" size={36} />
        </div>
        <div className="absolute bottom-14 right-[12%] h-44 w-60 rotate-[-6deg] rounded-[1.5rem] border border-slate-400 bg-white shadow-xl">
          <Newspaper className="absolute left-8 top-8 text-slate-700" size={38} />
          <span className="absolute inset-x-8 bottom-10 h-2 rounded-full bg-slate-300" />
          <span className="absolute inset-x-8 bottom-6 h-2 rounded-full bg-slate-300" />
        </div>
      </div>
      <div className="site-container relative">
        <SectionTitle
          align="center"
          eyebrow="Project Objectives"
          id="objectives-title"
          description="Project Bharti focuses on practical literacy, enterprise capability, and evidence-led community impact for women-led micro-enterprises."
        >
          Clear objectives for inclusive entrepreneurship.
        </SectionTitle>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {objectives.map(({ description, Icon, title, tone }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={`group rounded-[1.5rem] border bg-gradient-to-br p-6 shadow-sm shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/90 ${tone}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-current/10 bg-white/80 shadow-sm transition group-hover:scale-105">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.55 }}
          className="mt-14 rounded-[2rem] bg-slate-950 p-6 shadow-2xl shadow-slate-300/70 md:p-8"
        >
          <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-red-200">
                Impact Highlights
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Counter-ready metrics for project reporting.
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Values are centralized in the homepage data file and can be updated once
              field implementation numbers are finalized.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {objectiveImpactHighlights.map((metric) => (
              <AnimatedCounter key={metric.label} metric={metric} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
