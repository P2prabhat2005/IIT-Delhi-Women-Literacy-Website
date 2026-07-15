import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import EditableImageSlot from './EditableImageSlot.jsx';
import SectionTitle from './SectionTitle.jsx';

const leadership = [
  { name: 'Prof. Seema Sharma', role: 'Project Lead' },
  { name: 'Prof. Gourav Dwivedi', role: 'Co-Project Lead' },
];

const developmentTeam = [
  { name: 'Purari Sharma', role: 'Research Associate' },
  { name: 'Shashank Kumar', role: 'Research Associate' },
  { name: 'Placeholder', role: 'Project Associate' },
];

const leadershipDescription =
  'Providing academic leadership, research guidance, and strategic direction for Project Bharti.';

export default function ProjectLeadership() {
  return (
    <section aria-labelledby="project-leadership-title" className="section bg-white">
      <div className="site-container">
        <SectionTitle
          align="center"
          eyebrow="Project Bharti"
          id="project-leadership-title"
          description="Academic and implementation leadership guiding Project Bharti."
        >
          Project Leadership
        </SectionTitle>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {leadership.map(({ name, role }, index) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-2xl"
            >
              <EditableImageSlot
                title="Official Project Photograph"
                alt={`${name} profile photograph`}
                aspectRatio="aspect-[4/3]"
                className="w-full rounded-[1.25rem] border border-red-100 bg-red-50 shadow-sm"
              />
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-red-800">{role}</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">{name}</h3>
              <p className="mt-4 leading-7 text-slate-600">{leadershipDescription}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.55 }}
          className="mt-14 rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8"
        >
          <div className="flex flex-col gap-3">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-red-200">
              <Sparkles size={15} aria-hidden="true" />
              Project Bharti
            </p>
            <h3 className="text-3xl font-semibold">Meet the Development Team</h3>
            <p className="max-w-3xl leading-7 text-slate-300">
              A multidisciplinary team contributing to research, technology, documentation, and implementation of Project Bharti.
            </p>
          </div>

          <EditableImageSlot
            title="Official Project Photograph"
            alt="Development team group photograph"
            aspectRatio="aspect-[16/7]"
            emptyClassName="bg-white/[0.07]"
            emptyTextClassName="text-slate-200"
            className="mt-8 w-full rounded-[1.5rem] border border-white/15 bg-white/[0.07]"
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {developmentTeam.map(({ name, role }, index) => (
              <motion.article
                key={`${name}-${role}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 transition duration-300 hover:bg-white/[0.11]"
              >
                <EditableImageSlot
                  title="Official Project Photograph"
                  alt={`${name} profile photograph`}
                  aspectRatio="aspect-[4/3]"
                  emptyClassName="bg-white/[0.07]"
                  className="w-full rounded-[1.25rem] border border-white/15 bg-white/[0.07] shadow-sm"
                />
                <h4 className="mt-5 text-xl font-semibold text-white">{name}</h4>
                <p className="mt-2 text-sm font-semibold text-red-100">{role}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
