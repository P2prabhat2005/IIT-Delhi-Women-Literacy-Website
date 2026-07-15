import { motion } from 'framer-motion';
import EditableImageSlot from './EditableImageSlot.jsx';

export default function ActivityCard({ description, Icon, image, items, title }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.45 }}
      className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <EditableImageSlot
        image={image}
        title="Official Project Photograph"
        alt={`${title} activity photograph`}
        className="h-44 w-full bg-slate-50"
      />
      <div className="p-6">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-900">
          <Icon size={22} aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
        <p className="mt-3 leading-7 text-slate-600">{description}</p>
        {items?.length ? (
          <ul className="mt-5 space-y-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-800" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.article>
  );
}
